const express = require('express');
const router = require('express').Router();
const User = require('../model/user')

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, picture } = await req.body;
    console.log(req.body);
    const user = await User.create({ name, email, password, picture })
    res.status(201).json(user);
  } catch (e) {
    let msg;
    if (e.code === 11000) {
      msg = "user already exist"
    } else {
      msg = e.message;
    }
    console.log(e)
    res.status(400).json({
      message: "error :" + e
    })
  }
})

router.get("/test", async (req, res) => {
  res.send('hello word')
})

router.post('login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = "online";
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(e.message)
  }
})

module.exports = router
