import db from "../db.js";

export const getLocation = (req, res) => {
  const id = req.params.id;

  const q = "SELECT * FROM User WHERE `id` = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);

    // const address = {
    //   city: data.city,
    //   street: data.street,
    //   neighborhood: data.neighborhood,
    //   number: data.number,
    //   zipCode: data.zipCode,
    // };

    return res.status(200).json(data);
  });
};
export const updateLocation = (req, res) => {
  const { id } = req.params;
  const { city, street, neighborhood, number, zipCode } = req.body;

  console.log(req);
  console.log(city);

  if (!city && !street && !neighborhood && !number && !zipCode) {
    return res
      .status(400)
      .json("Pelo menos um campo deve ser preenchido para atualizar.");
  }

  const checkDuplicateQuery = `
    SELECT * FROM User WHERE (city = ? OR street = ? OR neighborhood = ? OR number = ? OR zipCode = ?) AND id != ?
  `;
  const checkDuplicateValues = [
    city,
    street,
    neighborhood,
    number,
    zipCode,
    id,
  ];

  db.query(checkDuplicateQuery, checkDuplicateValues, (err, results) => {
    if (err) return res.status(500).json(err);

    const fields = [];
    const values = [];

    if (city) {
      fields.push("city = ?");
      values.push(city);
    }
    if (street) {
      fields.push("street = ?");
      values.push(street);
    }
    if (neighborhood) {
      fields.push("neighborhood = ?");
      values.push(neighborhood);
    }
    if (number) {
      fields.push("number = ?");
      values.push(number);
    }
    if (zipCode) {
      fields.push("zipCode = ?");
      values.push(zipCode);
    }

    if (fields.length === 0) {
      return res.status(400).json("Nada para atualizar.");
    }

    const q = `UPDATE User SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(q, values, (err) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Localização atualizada com sucesso.");
    });
  });
};
