"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_schema_1 = require("../../../common/validations/auth.schema");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post('/signup', async (req, res) => {
    try {
        const validatedData = auth_schema_1.userAuthSchema.signup.parse(req.body);
        const { email, password, name } = validatedData;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ token });
    }
    catch (error) {
        if (error.errors) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(400).json({ message: 'Invalid input' });
    }
});
router.post('/signin', async (req, res) => {
    try {
        const validatedData = auth_schema_1.userAuthSchema.signin.parse(req.body);
        const { email, password } = validatedData;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ token });
    }
    catch (error) {
        if (error.errors) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(400).json({ message: 'Invalid input' });
    }
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map