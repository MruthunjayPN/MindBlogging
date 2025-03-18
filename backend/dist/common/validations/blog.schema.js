"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogSchema = void 0;
const zod_1 = require("zod");
exports.blogSchema = {
    create: zod_1.z.object({
        title: zod_1.z.string().min(3, 'Title must be at least 3 characters'),
        content: zod_1.z.string().min(10, 'Content must be at least 10 characters'),
        published: zod_1.z.boolean().optional().default(false)
    }),
    update: zod_1.z.object({
        title: zod_1.z.string().min(3, 'Title must be at least 3 characters').optional(),
        content: zod_1.z.string().min(10, 'Content must be at least 10 characters').optional(),
        published: zod_1.z.boolean().optional()
    })
};
//# sourceMappingURL=blog.schema.js.map