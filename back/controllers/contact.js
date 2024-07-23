import db from "../db.js";

export const getContacts = (req, res) => {
  const userId = req.params.userId;

  const q = "SELECT * FROM Contact WHERE `userId` = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.json(err);

    console.log(data);

    return res.status(200).json(data);
  });
};

export const addContact = (req, res) => {
  const { userId, name, email, phone, status } = req.body;

  const checkQuery = `
    SELECT COUNT(*) AS count 
    FROM Contact 
    WHERE email = ? OR phone = ?
  `;

  db.query(checkQuery, [email, phone], (err, results) => {
    if (err) return res.json(err);

    const contactExists = results[0].count > 0;

    if (contactExists) {
      return res
        .status(400)
        .json("Já existe um contato com esse email ou telefone.");
    }

    const insertQuery =
      "INSERT INTO Contact(userId, name, email, phone, status) VALUES(?)";
    const values = [
      userId,
      name,
      email,
      phone,
      status === false ? "1" : status,
    ];

    db.query(insertQuery, [values], (err) => {
      if (err) return res.json(err);

      return res.status(200).json("Contato criado com sucesso.");
    });
  });
};

export const updateContact = (req, res) => {
  const { userId, id } = req.params;
  const { name, email, phone, status } = req.body;

  // Verificar se os campos não estão vazios
  if (!name && !email && !phone && !status) {
    return res
      .status(400)
      .json("Pelo menos um campo deve ser preenchido para atualizar.");
  }

  // Verificar se já existe um contato com os mesmos dados
  const checkDuplicateQuery = `
    SELECT * FROM Contact WHERE (name = ? OR email = ? OR phone = ? OR status = ?) AND userId = ? AND id != ?
  `;
  const checkDuplicateValues = [name, email, phone, status, userId, id];

  db.query(checkDuplicateQuery, checkDuplicateValues, (err) => {
    if (err) return res.status(500).json(err);

    // Atualizar somente os campos que não são nulos
    const fields = [];
    const values = [];

    if (name) {
      fields.push("name = ?");
      values.push(name);
    }
    if (email) {
      fields.push("email = ?");
      values.push(email);
    }
    if (phone) {
      fields.push("phone = ?");
      values.push(phone);
    }
    if (status) {
      fields.push("status = ?");
      values.push(status);
    }

    if (fields.length === 0) {
      return res.status(400).json("Nada para atualizar.");
    }

    const q = `UPDATE Contact SET ${fields.join(
      ", "
    )} WHERE id = ? AND userId = ?`;
    values.push(id, userId);

    db.query(q, values, (err) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Contato atualizado com sucesso.");
    });
  });
};

export const deleteContact = (req, res) => {
  const { userId, id } = req.params;
  console.log(userId, id);
  const q = "DELETE FROM Contact WHERE `userId` = ? AND `id` = ?";

  db.query(q, [userId, id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Contato deletado com sucesso.");
  });
};
