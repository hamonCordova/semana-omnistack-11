const crypto = require("crypto");
const connection = require("./../database/connection");

module.exports = {
  async index(req, res) {
    const ongs = await connection("ongs").select("*");
    return res.status(200).json(ongs);
  },
  async create(req, res) {
    let { login, password, name, email_contact, whatsapp, city, uf } = req.body;

    password = crypto
      .createHmac("sha256", password)
      .update("Update to Digest :)")
      .digest("hex");

    const [id] = await connection("ongs").insert({
      password,
      login,
      name,
      email_contact,
      whatsapp,
      uf,
      city
    });

    return res.status(200).json({ id });
  },
  async deleteAll(req, res) {
    await connection("ongs").delete();
    return res.status(200).json({ message: "Deletado com sucesso" });
  }
};
