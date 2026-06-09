import request from "supertest";
import app from "../src/app.js";

describe("TC-IA — Pruebas de Inteligencia Artificial", () => {

    // TC-IA-001: Chatbot responde a una consulta turística válida
    test("TC-IA-001 — Chatbot debe responder con texto a una consulta turística", async () => {
        const res = await request(app)
            .post("/api/ai/chat")
            .send({
                message: "¿Qué playas recomiendas en Venezuela?"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("reply");
        expect(typeof res.body.reply).toBe("string");
        expect(res.body.reply.length).toBeGreaterThan(10);
    }, 15000); // timeout 15s por latencia de OpenAI

});
