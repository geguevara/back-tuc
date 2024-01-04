"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVerified = void 0;
const isVerified = (req, res, next) => {
    const { verified } = req.body.userConfirm;
    if (!verified) {
        res.status(401).json({
            msj: "El usuario no ha sido verificado correctamente"
        });
        return;
    }
    next();
};
exports.isVerified = isVerified;
