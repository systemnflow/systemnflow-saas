// File: /api/verify-license.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { license_key } = req.body;

  if (!license_key) {
    return res.status(400).json({ valid: false, error: "No license key provided" });
  }

  try {
    const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.LEMON_API_KEY}`, // ✅ matches your env var
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ license_key })
    });

    const data = await response.json();

    if (!response.ok || !data) {
      return res.status(200).json({ valid: false, error: "License validation failed" });
    }

    // ✅ Ensure license is valid
    if (data.valid !== true) {
      return res.status(200).json({ valid: false, error: "Invalid license" });
    }

    // ✅ Check product ID matches your Pro product
    if (String(data.meta?.product_id) !== "632598") {
      return res.status(200).json({ valid: false, error: "Wrong product" });
    }

    // ✅ Enforce activation limit (<= 5 activations)
    const usedActivations = data.meta?.activations || 0;
    const limit = data.meta?.activation_limit || 5;

    if (usedActivations > limit) {
      return res.status(200).json({ valid: false, error: "Activation limit exceeded" });
    }

    return res.status(200).json({
      valid: true,
      activations: usedActivations,
      limit,
      message: "License verified successfully!"
    });

  } catch (error) {
    console.error("License validation failed:", error);
    return res.status(500).json({ valid: false, error: "Server error" });
  }
}
