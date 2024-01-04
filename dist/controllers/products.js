"use strict";
//
//
// ARMADO DE LA BASE DE DATOS DE LOS PRODUCTOS
//(SI SOBRA TIEMPO)
//
//
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
exports.createOrder = exports.getOrders = void 0;
const products_1 = __importDefault(require("../models/products"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.body.prodConf._id;
    const consultProd = { user: itemId };
    const orders = yield products_1.default.find(consultProd);
    res.json({
        data: [...orders]
    });
});
exports.getOrders = getOrders;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body;
    const data = Object.assign(Object.assign({}, orderData), { createdAt: new Date(), status: "pending" });
    const producto = new products_1.default(data);
    yield producto.save();
    res.status(201).json({
        producto
    });
});
exports.createOrder = createOrder;
