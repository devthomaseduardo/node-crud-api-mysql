import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 8800;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => {
  return res.status(200).json({ status: "ok" });
});

app.use("/api/usuarios", userRoutes);

app.use((_, res) => {
  return res.status(404).json({ message: "Rota não encontrada." });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
