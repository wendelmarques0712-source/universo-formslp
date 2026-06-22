export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhookURL = process.env.MAKE_WEBHOOK_URL;
  if (!webhookURL) {
    return res.status(500).json({ error: "Webhook not configured" });
  }

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    return res.status(response.ok ? 200 : 502).json({ ok: response.ok });
  } catch {
    return res.status(502).json({ error: "Upstream error" });
  }
}
