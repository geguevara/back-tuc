"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["x-token"];
    if (!token) {
        res.status(401).json({
            msj: "No hay token en la petición"
        });
        return;
    }
    try {
        const secretPass = process.env.SECRETPASS;
        const payload = jsonwebtoken_1.default.verify(token, secretPass);
        const { id } = payload;
        const userConfirm = yield usuario_1.default.findById(id);
        if (!userConfirm) {
            res.status(401).json({
                msj: "El token no es válido"
            });
            return;
        }
        req.body.userConfirm = userConfirm;
        req.body.id = id;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msj: "Token inválido"
        });
    }
});
exports.default = validateJWT;