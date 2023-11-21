"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const router = express_1.default.Router();
const client = new client_1.PrismaClient();
const hashPassword = (password) => {
    return node_crypto_1.default.createHash("md5").update(password).digest("hex");
};
const LoginValidator = zod_1.default.object({
    username: zod_1.default.string().min(6).max(64),
    password: zod_1.default.string().min(6).max(64),
});
router.get("/login", (req, res) => {
    res.render("login.njk");
});
router.post("/login", async (req, res) => {
    const result = LoginValidator.safeParse(req.body);
    if (!result.success) {
        res.flash("error", "Your login details were invalid, please try again.");
        return res.redirect("/auth/login");
    }
    const data = result.data;
    const user = await client.user.findFirst({
        where: { username: data.username, password: hashPassword(data.password) },
    });
    if (!user) {
        res.flash("error", "That username / password combination did not exist.");
        return res.redirect("/auth/register");
    }
    req.session.user = {
        id: user.id,
        username: user.username,
    };
    res.flash("success", "You are now logged in.");
    return res.redirect("/home/");
});
router.get("/register", (req, res) => {
    res.render("register.njk");
});
const RegisterValidator = zod_1.default.object({
    username: zod_1.default.string().min(6).max(64),
    password: zod_1.default.string().min(6).max(64),
});
router.post("/register", async (req, res) => {
    const result = RegisterValidator.safeParse(req.body);
    if (!result.success) {
        res.flash("error", "Your registration details were invalid, please try again.");
        return res.redirect("/auth/register");
    }
    const data = result.data;
    const existingUser = await client.user.findFirst({
        where: { username: data.username },
    });
    if (existingUser) {
        res.flash("error", "There is already a user with that email address or username.");
        return res.redirect("/auth/register");
    }
    await client.user.create({
        data: {
            username: data.username,
            password: hashPassword(data.password),
        },
    });
    res.flash("success", "Your account has been registered.");
    return res.redirect("/auth/login");
});
router.get("/logout", (req, res) => {
    if (req.session)
        req.session.user = null;
    res.flash("success", "You have been successfully logged out.");
    return res.redirect("/auth/login");
});
exports.default = router;
