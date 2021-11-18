import adm from "../models/admin.js";

const admin = async (req, res, next) => {
  const adminValidation = await adm.findById(req.user._id);
  if (!adminValidation)
    return res.status(400).send({ message: "Unauthorized user"});

  next();
};

export default admin;
