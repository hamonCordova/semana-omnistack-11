const connection = require("./../database/connection");

module.exports = {
  async index(req, res) {
    const { page = 1, limit = 5 } = req.query;

    const count = await connection("incidents").count();

    const incidents = await connection("incidents")
      .select(
        "incidents.*",
        "ongs.login",
        "ongs.name",
        "ongs.email_contact",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      )
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .limit(limit)
      .offset((page - 1) * limit);

    res.header("X-Total-Count", count["count(*)"]);
    return res.status(200).json(incidents);
  },
  async getByOngId(req, res) {
    const ongId = req.params.ongId;
    if (!ongId) {
      return res.status(401).json({ message: "Ong Id Precisa ser informado" });
    }
    const incidents = await connection("incidents")
      .select("*")
      .where({ ong_id: ongId });

    return res.status(200).json(incidents);
  },
  async create(req, res) {
    const ong_id = req.headers.authorization;
    const { description, value } = req.body;

    const [id] = await connection("incidents").insert({
      description,
      value,
      ong_id
    });

    return res.status(200).json({ id });
  },
  async delete(req, res) {
    const id = req.params.incidentId;
    const ong_id = req.headers.authorization;

    const incidente = await connection("incidents")
      .select("ong_id")
      .where({ id })
      .first();

    if (!incidente) {
      return res.status(401).json({ message: "Nenhum incidente encontrado" });
    }

    if (incidente.ong_id !== ong_id) {
      return res
        .status(401)
        .json({ message: "Você não pode excluir esse incidente" });
    }

    await connection("incidents")
      .delete()
      .where({ id, ong_id });
    return res.status(200).json({ message: "Incidente Excluido com Sucesso" });
  },
  async update(req, res) {}
};
