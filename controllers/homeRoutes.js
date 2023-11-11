const router = require("express").Router();
const { User, Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage");
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
