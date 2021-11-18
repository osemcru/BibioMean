import customer from "../models/customer.js";
import admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const customerLogin = await customer.findOne({ email: req.body.email });
  const adminLogin = await admin.findOne({ email: req.body.email });
  if (!customerLogin && adminLogin) {
    const hash = await bcrypt.compare(req.body.password, adminLogin.password);
    if (!hash)
      return res.status(400).send({ message: "Wrong email or password" });
    try {
      return res.status(200).json({
        token: jwt.sign(
          {
            _id: adminLogin._id,
            name: adminLogin.name,
            iat: moment().unix(),
          },
          process.env.SECRET_KEY_JWT
        ),
      });
    } catch (e) {
      return res.status(400).send({ message: "Login error" }, e);
    }
  } else if (customerLogin && !adminLogin) {
    const hash = await bcrypt.compare(
      req.body.password,
      customerLogin.password
    );
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
  } else {
    return res.status(400).send({ message: "Wrong email or password" });
  }
};

export default { login };
