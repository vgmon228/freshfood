const { User, Product, Order, OrderDetail, Categorie } = require("../models");
const bcrypt = require("bcryptjs");
const formatter = require("../helper");

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
        req.session.role = data.role;
        req.session.userid = data.id;
        res.redirect("/home");
      } else {
        res.redirect(`/login?error=${"Password Salah"}`);
      }
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getHome(req, res) {
    let role = req.session.role
    try {
      let data = await Product.findAll({
        order: [
          ["CategoryId", "ASC"],
          ["name", "ASC"],
        ],
      });
      // console.log(data[0].dataValues);
      res.render("home", { data, formatter, role });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async test(req, res) {
    try {
      let data = await Product.findAll({ include: Categorie });
      res.send(data);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getAddProduct(req, res) {
    let categorie = await Categorie.findAll();
    res.render("addProduct", { categorie });
  }

  static async postAddProduct(req, res) {
    let { name, description, price, CategoryId, imageUrl, stock } = req.body;
    try {
      await Product.create({
        name,
        description,
        price,
        CategoryId,
        imageUrl,
        stock,
      });
      res.redirect("/home");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getOrder(req,res){
    let data = await Order.findAll({include:Product})
    res.render('order',{data})
  }

  static async getOrderDetail(req,res){
    let{id} = req.params
    //console.log(req.session.role)
    try {
      const productId = req.params.productId;
      let data = await Product.findByPk(productId, {
        include: [Categorie],
      });
      //   console.log(data.dataValues);
      res.render("editProduct", { data, formatter });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async postProductEdit(req, res) {
    try {
      const productId = req.params.productId;
      const { name, description, CategoryId, price, stock } = req.body;
      await Product.update(
        {
          name: name,
          description: description,
          CategoryId: CategoryId,
          price: price,
          stock: stock,
        },
        {
          where: {
            id: productId,
          },
        }
      );

      res.redirect("/home");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getOrder(req, res) {
    let data = await Order.findAll({ include: Product });
    res.render("order", { data });
  }

  static async getOrderDetail(req, res) {
    let { id } = req.params;
    try {
      let data = await Order.findByPk(id, { include: Product });
      res.render("orderDetails", { data });
    } catch (error) {}
  }

  static async getLogOut(req, res) {
    try {
      req.session.destroy();
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async getBuy(req,res){
    let UserId = req.session.userid
    let{id}=req.params
    let data = await Product.findOne({where:{id}})
    data.increment('stock',{by: -1})
    Order.create({UserId})
    res.redirect('/home')
  }
}
module.exports = Controller;
