import request from "supertest";
import app from "../src/app.js";

describe("TC-SEC — Pruebas de Seguridad", () => {

    // TC-SEC-001: Acceso a endpoint protegido sin token JWT
    test("TC-SEC-001 — Acceso sin token debe retornar 401", async () => {
        const res = await request(app)
            .get("/api/auth/me");

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toMatch(/token no enviado/i);
    });

    // TC-SEC-002: Inyección SQL en campo email del login
    test("TC-SEC-002 — SQL injection en email debe retornar 401", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "' OR '1'='1",
                password: "cualquier"
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toMatch(/credenciales inválidas/i);
    });

});
