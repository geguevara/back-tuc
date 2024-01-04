import { Model, Schema, Types, model } from "mongoose";
import { Type } from "typescript";

export interface IIssue {
    title: string,
    desc: string,
    priority: number,
    user: Types.ObjectId,
    createdAt: Date,
}

const IssuesSchema = new Schema<IIssue>({
    title: {
        type: String,
        required: [ true, "El título es obligatorio"]
    },
    desc: {
        type: String,
        required: [true, "La descripción es obligatoria"]
    },
    priority: {
        type: Number,
        required: [true, "La prioridad es obligatoria"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Issue: Model<IIssue> = model<IIssue>("Issue", IssuesSchema);

export default Issue