"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const auth_1 = __importDefault(require("../middleware/auth"));
const zod_1 = __importDefault(require("zod"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const client = new client_1.PrismaClient();
const uploadPath = path_1.default.join(__dirname, "..", "uploads");
router.get("/upload", (req, res) => {
    res.render("upload.njk");
});
const UploadValidator = zod_1.default.object({
    private: zod_1.default
        .enum(["true", "false"])
        .transform((value) => value === "true")
        .optional(),
});
router.post("/upload", (0, express_fileupload_1.default)({
    limits: { fileSize: 2.5 * 1024 * 1024 },
}), async (req, res) => {
    if (!req.files || !req.files.file || Array.isArray(req.files.file)) {
        res.flash("error", "Please select a file to upload.");
        return res.redirect("/files/upload");
    }
    const file = req.files.file;
    if (file.truncated) {
        res.flash("error", "There seems to be an issue processing this specific file, please try again later, sorry!");
        return res.redirect("/files/upload");
    }
    const result = UploadValidator.safeParse(req.body);
    if (!result.success) {
        res.flash("error", "There seems to be an issue processing your upload options, please try again later.");
        return res.redirect("/files/upload");
    }
    const fileEntry = await client.file.create({
        data: {
            name: file.name,
            size: file.size,
            authorId: req.session?.user?.id,
            private: req.session?.user ? result.data.private : false,
        },
        select: {
            id: true,
        },
    });
    const filePath = path_1.default.join(uploadPath, fileEntry.id);
    await file.mv(filePath);
    res.flash("success", "Your file was successfully uploaded.");
    return res.redirect(`/files/view/${fileEntry.id}`);
});
router.get("/view/:fileId", async (req, res) => {
    const fileEntry = await client.file.findFirst({
        where: { id: req.params.fileId },
        select: {
            id: true,
            uploadedAt: true,
            size: true,
            name: true,
            private: true,
            authorId: true,
            author: {
                select: {
                    username: true,
                },
            },
        },
    });
    if (!fileEntry || (fileEntry.private && req.session?.user?.id !== fileEntry.authorId)) {
        res.flash("error", "We could not find this file. It may have been deleted or it has expired.");
        return res.redirect("/files/upload");
    }
    res.render("view.njk", { file: fileEntry });
});
router.get("/download/:fileId", async (req, res) => {
    const fileEntry = await client.file.findFirst({
        where: { id: req.params.fileId },
        select: {
            name: true,
            private: true,
            authorId: true,
        },
    });
    if (fileEntry?.private && req.session?.user?.id !== fileEntry.authorId) {
        return res.status(404);
    }
    return res.download(path_1.default.join(uploadPath, req.params.fileId), fileEntry?.name ?? "Unknown");
});
router.post("/delete/:fileId", auth_1.default, async (req, res) => {
    const fileEntry = await client.file.findFirst({
        where: { id: req.params.fileId },
        select: {
            name: true,
            id: true,
            authorId: true,
            author: {
                select: {
                    username: true,
                },
            },
        },
    });
    if (!fileEntry || fileEntry.authorId !== req.session.user.id) {
        res.flash("error", "We could not find this file. It may have been deleted or it has expired.");
        return res.redirect("/home/");
    }
    try {
        await promises_1.default.rm(path_1.default.join(uploadPath, fileEntry.id));
        await client.file.delete({
            where: {
                id: fileEntry.id,
            },
        });
        res.flash("success", "The file was successfully deleted.");
        return res.redirect("/home/");
    }
    catch (err) {
        res.flash("error", "Sorry, something went wrong trying to delete this file. Please try again later.");
        return res.redirect("/home/");
    }
});
exports.default = router;
