import { Model, model, Schema } from "mongoose";
//
//
// ARMADO DE LA BASE DE DATOS DE LOS PRODUCTOS
//(SI SOBRA TIEMPO)
//
//
export interface IProduct{
    nombre: string;
    img: string;
    category: string;
    desc: string;
    price: number;
}
const UserSchema= new Schema<IProduct>({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    img:{
        type: String,
        required: [true, 'La imagen es obligatoria']
    },
    category:{
        type: String,
        required: [true, 'La categoria es obligatoria']
    },
    desc:{
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    price:{
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
})
UserSchema.methods.toJSON = function(){
    const{__v, _id, ...producto} =this.toObject()
    return producto
}
const Producto: Model<IProduct>= model<IProduct>(
    "Producto", UserSchema
)

export default Producto