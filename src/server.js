const express = require("express");
const app = express();

app.use(express.json());

app.post("/api", (req, res) => {
  const { metodo, tipo, historico, texto } = req.body;

  console.log("Recebido:", { metodo, tipo, historico, texto });

  res.json({
    status: "success",
    message: `Recebido com sucesso o método ${metodo}, tipo ${tipo}`,
    historicoAtualizado: [...historico, `Texto enviado: ${texto}`],
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
