var express = require("express");
var router = express.Router();
var users = require("../public/json/users.json");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json(users);
});

router.get("/:uid", (req, res) => {
  users = users.filter((user) => {
    if (user["uid"] == req.params.uid) return user;
  });
  res.json(users);
});

module.exports = router;
