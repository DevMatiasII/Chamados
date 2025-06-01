const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// Troque pela sua string de conexão do MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI);

// Schemas
const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  cpf: String,        // <-- adicionado
  telefone: String,   // <-- adicionado
  role: { type: String, default: "user" } // "user" ou "admin"
});

const RequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  nome: String,
  cpf: String,
  telefone: String,
  solicitacao: String,
  resposta: String,
  status: { type: String, default: "Aberto" } // <-- Adicionado
});

const User = mongoose.model("User", UserSchema);
const Request = mongoose.model("Request", RequestSchema);

// Middleware de autenticação
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send("Token não fornecido");
  try {
    const decoded = jwt.verify(token, "segredo");
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Token inválido");
  }
}

// Rotas
app.post("/api/register", async (req, res) => {
  const { nome, email, senha, cpf, telefone, role } = req.body; // inclua cpf e telefone
  const hash = await bcrypt.hash(senha, 10);
  const user = new User({ nome, email, senha: hash, cpf, telefone, role }); // inclua cpf e telefone
  await user.save();
  res.sendStatus(201);
});

app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Usuário não encontrado");
  const valid = await bcrypt.compare(senha, user.senha);
  if (!valid) return res.status(400).send("Senha inválida");
  const token = jwt.sign({ id: user._id, role: user.role, nome: user.nome }, "segredo");
  res.json({
    token,
    role: user.role,
    nome: user.nome,
    email: user.email,
    cpf: user.cpf,
    telefone: user.telefone
  });
});

app.post("/api/requests", auth, async (req, res) => {
  const { solicitacao } = req.body;
  const user = await User.findById(req.user.id);
  const request = new Request({
    userId: user._id,
    nome: user.nome,
    cpf: user.cpf,
    telefone: user.telefone,
    solicitacao
  });
  await request.save();
  res.sendStatus(201);
});

app.get("/api/requests", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Acesso negado");
  const requests = await Request.find();
  res.json(requests);
});

app.post("/api/requests/:id/responder", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Acesso negado");
  const { resposta } = req.body;
  await Request.findByIdAndUpdate(req.params.id, { resposta });
  res.sendStatus(200);
});

app.post("/api/requests/:id/status", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Acesso negado");
  const { status } = req.body;
  await Request.findByIdAndUpdate(req.params.id, { status });
  res.sendStatus(200);
});

app.get("/api/my-requests", auth, async (req, res) => {
  // Busca pelo nome, cpf e telefone do usuário autenticado
  const user = await User.findById(req.user.id);
  const requests = await Request.find({
    nome: user.nome,
    cpf: user.cpf,
    telefone: user.telefone
  });
  res.json(requests);
});

app.get("/", (req, res) => {
  res.send("API de Chamados rodando!");
});

app.listen(process.env.PORT || 5000, () => console.log("Backend rodando"));