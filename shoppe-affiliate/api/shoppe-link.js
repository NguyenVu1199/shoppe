// Serverless function for Shopee link processing
const axios = require("axios");

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );
  try {
    const { shortUrl } = req.body;
    const response = await axios.get(shortUrl, {
      maxRedirects: 0,
      validateStatus: null,
    });

    const redirectUrl = response.headers.location;
    const { pathname } = new URL(redirectUrl);
    console.log("redirectUrl", redirectUrl);
    const parts = pathname.split("/").filter(Boolean);
    console.log("parts", parts);
    let shopId;
    let productId;
    let shopName;
    shopName = parts[0];
    shopId = parts[1];
    productId = parts[2];
    res.json({
      shopName,
      shopId,
      productId,
    });
  } catch (error) {
    console.error("Error processing Shopee link:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
