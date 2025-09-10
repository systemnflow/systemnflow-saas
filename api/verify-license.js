export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { licenseKey } = req.body;

  if (!licenseKey) {
    return res.status(400).json({ valid: false, error: "License key required" });
  }

  try {
    // Call LemonSqueezy API to validate license
    const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LEMON_API_KEY}`,
        Accept: "application/json"
      },
      body: JSON.stringify({
        license_key: licenseKey
      })
    });

    const data = await response.json();

    if (data.valid) {
      // ✅ License key is good
      return res.status(200).json({ valid: true, data });
    } else {
      // ❌ License not valid
      return res.status(200).json({ valid: false });
    }
  } catch (error) {
    console.error("License validation failed:", error);
    return res.status(500).json({ valid: false, error: "Server error" });
  }
}
