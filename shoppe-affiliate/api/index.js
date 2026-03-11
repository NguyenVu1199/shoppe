const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (HTML/JS/CSS)
app.use(express.static(path.join(__dirname, "../public")));

// API Shopee redirect
app.post("/api/original/shoppe-link", async (req, res) => {
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
});

// Serve index.html as default
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(3002, () => {
  console.log("Shopee Affiliate backend running on http://localhost:3002");
});
