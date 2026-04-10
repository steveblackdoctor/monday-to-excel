export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.MONDAY_API_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "Missing MONDAY_API_TOKEN environment variable"
    });
  }

  try {
    const mondayRes = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(req.body)
    });

    const data = await mondayRes.json();

    return res.status(mondayRes.status).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Proxy request failed",
      message: error.message || String(error)
    });
  }
}