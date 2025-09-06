// src/server.ts
import fastify from "fastify";
import cors from "@fastify/cors";
import { PHB2024ORIGINS } from "@nihilvtt/datamodeling";
const app = fastify({
  logger: true,
});

const start = async () => {
  try {
    // Registrando o plugin de CORS
    await app.register(cors, {
      // Configuração do CORS
      origin: true, // Permitir todas as origens
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    });

    // Rota para buscar todas as origens
    app.get("/origins", async (request, reply) => {
      return PHB2024ORIGINS;
    });

    // Rota para buscar uma origem por id
    app.get("/origins/:id", async (request, reply) => {
      const { id } = request.params as { id: string };
      const origin = PHB2024ORIGINS.find((o) => o.id === id);
      if (!origin) {
        return reply.code(404).send({ error: "Origem não encontrada" });
      }
      return origin;
    });
    await app.listen({ port: 3333 });
    console.log("🚀 Servidor HTTP rodando em http://localhost:3333");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
