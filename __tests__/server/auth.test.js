const request = require("supertest");
const app = require("../../app")
const { sequelize,User } = require('../../models');
require('dotenv').config({ path: '../../.env' })

describe("auth routes", () => {

    beforeAll(async() => {
       await sequelize.sync({ force: true });
    });
    test("/register",async () => {
        await request(app)
            .post("/auth/register")
            .send({
                user: "user",pwd: "pwd",email: "email@email.com"
            }).then(response => {
                expect(response.statusCode).toBe(201);
            });
        await request(app)
            .post("/auth/register")
            .send({
                pwd: "pwd",email: "email@email.com"
            }).then(response => {
                expect(response.statusCode).toBe(500);
            });    
    });
    let refreshCookie;
    test("/login",async () => {
        await request(app)
            .post("/auth/login")
            .send({
                user: "user",pwd: "pwd"
            }).then(response => {
                expect(response.body.token).toBeDefined();
                refreshCookie = response.headers['set-cookie'][0].split(';')[0];
            });
        await request(app)
            .post("/auth/login")
            .send({
                user: "notexisting",pwd: "fakepwd"
            }).then(response => {
                expect(response.status).toBe(401); 
            });
    });
    test("/refresh", async () => {
        await request(app)
            .get("/auth/refresh")
            .set('Cookie', refreshCookie)
            .then(response => {
                expect(response.body.accessToken).toBeDefined();
            });
        await request(app)
            .get("/auth/refresh")
            .then(response => {
                expect(response.status).toBe(401);
            });
        await request(app)
            .get("/auth/refresh")
            .set('Cookie', "jwt=notexistingcookie")
            .then(response => {
                expect(response.status).toBe(403);
            });
    })
    test("/logout", async() => {
        await request(app)
            .post("/auth/logout")
            .set('Cookie', refreshCookie)
            .then(response => {
                expect(response.statusCode).toBe(204);
                expect(response.headers['set-cookie'][0].split(';')[0]).toBe("jwt=")
            });
        await request(app)
            .post("/auth/logout")
            .set('Cookie', refreshCookie)
            .then(response => {
                expect(response.statusCode).toBe(204);
                expect(response.headers['set-cookie'][0].split(';')[0]).toBe("jwt=")         
            });
    })
})