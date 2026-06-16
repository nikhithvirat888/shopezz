const express = require("express");
const router = express.Router();

// SAMPLE PRODUCTS (temporary)
router.get("/", (req, res) => {
  res.json([
    {
      _id: "1",
      name: "iPhone 15",
      price: 79999,
      description: "Apple smartphone",
      image:
        "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-model-unselect-gallery-1-202309?wid=500",
    },
  ]);
});

module.exports = router;