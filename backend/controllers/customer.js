import customer from "../models/customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerCustomer = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete data");

  const existingCustomer = await customer.findOne({ email: req.body.email });
  if (existingCustomer)
    return res.status(400).send("The customer is already registered");

    const hash = await bcrypt.hash(req.body.password, 10);

  const customerSchema = new customer({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    dbStatus: true,
  });

  const result = await customerSchema.save();
  if (!result) return res.status(400).send("Failed to register customer");
  return res.status(200).send({ result });
};

const listCustomer = async (req, res) => {
  const customerSchema = await customer.find();
  if (!customerSchema || customerSchema.length == 0)
    return res.status(400).send("Empty customer list");
  return res.status(200).send({ customerSchema });
};

const updateCustomer = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete data");

  const existingCustomer = await customer.findOne({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  if (existingCustomer)
    return res.status(400).send("The customer already exist");

  const customerUpdate = await customer.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  return !customerUpdate
    ? res.status(400).send("Error editing customer")
    : res.status(200).send({ customerUpdate });
};

const deleteCustomer = async (req, res) => {
  const customerDelete = await customer.findByIdAndDelete({
    _id: req.params["_id"],
  });
  return !customerDelete
    ? res.status(400).send("Customer no found")
    : res.status(200).send("Customer deleted");
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const customerLogin = await customer.findOne({ email: req.body.email });
  if (!customerLogin)
    return res.status(400).send({ message: "Wrong email or password" });
  const hash = await bcrypt.compare(req.body.password, customerLogin.password);
  if (!hash)
    return res.status(400).send({ message: "Wrong email or password" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: customerLogin._id,
          name: customerLogin.name,
          iat: moment().unix(),
        },
        process.env.SECRET_KEY_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Login error" }, e);
  }
};

export default {
  registerCustomer,
  listCustomer,
  updateCustomer,
  deleteCustomer,
  login,
};
