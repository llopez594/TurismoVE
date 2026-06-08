import request from "supertest";
import app from "../src/app.js";

describe("TC-PERF — Pruebas de Rendimiento", () => {

    // TC-PERF-001: Tiempo de respuesta del endpoint de lugares menor a 2 segundos
    test("TC-PERF-001 — GET /api/places debe responder en menos de 2000ms", async () => {
        const start = Date.now();

        const res = await request(app)
            .get("/api/places");

        const duration = Date.now() - start;

        console.log(`Tiempo de respuesta GET /api/places: ${duration}ms`);

        expect(res.statusCode).toBe(200);
        expect(duration).toBeLessThan(2000);
    });

});
