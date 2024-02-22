const { User } = require("../models");
const bcrypt = require("bcryptjs");
class Controller {
  static async getRegister(req, res) {
    res.render("register");
  }

  static async postRegister(req, res) {
    let { username, email, password, role } = req.body;
    try {
      await User.create({ username, email, password, role });
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getLogin(req, res) {
    let { error } = req.query;
    res.render("login", { error });
  }

  static async postLogin(req, res) {
    let { username, password } = req.body;
    try {
      let data = await User.findOne({ where: { username } });
      if (data === null) {
        res.redirect(`/login?error=${"Username Tidak Ditemukan"}`);
      } else if (bcrypt.compareSync(password, data.password)) {
        res.send("Password Benar");
      } else {
        res.redirect(`/login?error=${"Password Salah"}`);
      }
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getHome(req, res) {
    try {
        
    } catch (error) {}
  }
}
module.exports = Controller;
