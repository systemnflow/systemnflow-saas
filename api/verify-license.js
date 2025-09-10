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
        "Authorization": `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`, // 🔑 your secret key from Lemon
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ license_key })
    });

    const data = await response.json();

    if (data && data.valid) {
      // You can add more checks here (e.g., product_id match, activation limit)
      return res.status(200).json({ valid: true });
    } else {
      return res.status(200).json({ valid: false });
    }

  } catch (error) {
    console.error("License validation failed:", error);
    return res.status(500).json({ valid: false, error: "Server error" });
  }
}
