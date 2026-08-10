import { db } from "../db.js";

const fields = ["nome", "email", "fone", "data_nascimento"];

const getValues = (body) => fields.map((field) => body[field]?.toString().trim());

const validateUser = (values) => values.every(Boolean);

export const getUsers = (_, res) => {
  const query = "SELECT * FROM usuarios ORDER BY nome ASC";

  db.query(query, (err, data) => {
    if (err) return res.status(500).json({ message: "Erro ao buscar usuários." });
    return res.status(200).json(data);
  });
};

export const getUserById = (req, res) => {
  const query = "SELECT * FROM usuarios WHERE id = ? LIMIT 1";

  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ message: "Erro ao buscar usuário." });
    if (!data.length) return res.status(404).json({ message: "Usuário não encontrado." });
    return res.status(200).json(data[0]);
  });
};

export const addUser = (req, res) => {
  const values = getValues(req.body);

  if (!validateUser(values)) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  const query = "INSERT INTO usuarios (`nome`, `email`, `fone`, `data_nascimento`) VALUES (?)";

  db.query(query, [values], (err, data) => {
    if (err) return res.status(500).json({ message: "Erro ao criar usuário." });
    return res.status(201).json({ message: "Usuário criado com sucesso.", id: data.insertId });
  });
};

export const updateUser = (req, res) => {
  const values = getValues(req.body);

  if (!validateUser(values)) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  const query = "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?";

  db.query(query, [...values, req.params.id], (err, data) => {
    if (err) return res.status(500).json({ message: "Erro ao atualizar usuário." });
    if (!data.affectedRows) return res.status(404).json({ message: "Usuário não encontrado." });
    return res.status(200).json({ message: "Usuário atualizado com sucesso." });
  });
};

export const deleteUser = (req, res) => {
  const query = "DELETE FROM usuarios WHERE `id` = ?";

  db.query(query, [req.params.id], (err, data) => {
    if (err) return res.status(500).json({ message: "Erro ao excluir usuário." });
    if (!data.affectedRows) return res.status(404).json({ message: "Usuário não encontrado." });
    return res.status(200).json({ message: "Usuário excluído com sucesso." });
  });
};
