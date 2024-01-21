const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/userModel");

router.get("/getAll", async (req, res) => {
  const userFind = await User.find();
  try {
    if (!userFind) {
      return res.status(404).json({ msg: "users data not found" });
    }
    res.status(200).json(userFind);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/newUser", async (req, res) => {
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
  });
  try {
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const userData = await user.save();
    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/updateUser/:id", async (req, res) => {
  const { fname,lname, email } = req.body;
  const userUpdate = await User.findOneAndUpdate(
    { _id: req.params.id },
    { fname,lname, email },
    { new: true }
  );
  //   const userUpdate = await User.findOneAndUpdate(
  //     { name: req.params.nm },
  //     { $set: { name: name, email: email, password: password } }
  //   );
  try {
    if (!userUpdate) {
      return res.status(404).json({ msg: "user not found" });
    }
    res.status(200).json(userUpdate);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  const userDel = await User.findOneAndDelete({ _id: req.params.id });
  try {
    if (!userDel) {
      return res.status(404).json({ msg: "user not found" });
    }
    res.status(200).json({ msg: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
