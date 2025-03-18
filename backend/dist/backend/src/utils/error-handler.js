"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = handleZodError;
const zod_1 = require("zod");
function handleZodError(error, res) {
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: 'Validation error',
            errors: error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }))
        });
    }
    return res.status(500).json({ message: 'Internal server error' });
}
//# sourceMappingURL=error-handler.js.map