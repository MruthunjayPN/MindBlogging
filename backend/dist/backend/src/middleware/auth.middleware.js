"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const authenticate = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId }
        });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = { id: user.id, role: user.role };
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
const isAdmin = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'ADMIN') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=auth.middleware.js.map