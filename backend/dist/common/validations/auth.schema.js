"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthSchema = void 0;
const zod_1 = require("zod");
exports.userAuthSchema = {
    signup: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email format'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters')
    }),
    signin: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email format'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters')
    })
};
//# sourceMappingURL=auth.schema.js.map