import admin from "../models/admin.js";
import bcrypt from "bcrypt";

const registerAdmin = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const existingAdmin = await admin.findOne({ email: req.body.email });
  if (existingAdmin)
    return res.status(400).send({ message: "The admin is already registered" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const adminRegister = new admin({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
    dbStatus: true,
  });

  const result = await adminRegister.save();
  return !result
    ? res.status(400).send({ message: "Failed to register admin" })
    : res.status(200).send({ result });
};

export default {registerAdmin};