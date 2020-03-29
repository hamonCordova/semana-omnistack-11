const crypto = require("crypto");
const connection = require("./../database/connection");

module.exports = {
  async login(req, res) {
    let { login, password } = req.body;

    password = crypto
      .createHmac("sha256", password)
      .update("Update to Digest :)")
      .digest("hex");

    const ong = await connection("ongs")
      .select("login", "name", "email_contact", "whatsapp", "city", "uf")
      .where("login", login)
      .where("password", password)
      .first();

    if (!ong) {
      return res.status(401).json({ message: "Login ou senha não conhecidem" });
    }

    return res.status(200).json(ong);
  }
};
