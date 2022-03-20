var express = require("express");
var router = express.Router();
var users = require("../public/json/users.json");
const crypto = require("crypto");
var tempUsers = users;
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json(users);
});

router.get("/:uid", (req, res) => {
  tempUsers = users.filter((user) => {
    if (user["uid"] == req.params.uid) return user;
  });
  // console.log(users.length);
  if (tempUsers.length == 1) {
    res.json(tempUsers);
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

module.exports = router;
