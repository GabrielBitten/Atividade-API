import { Schema, model } from 'mongoose'

const usuarioSchema = new Schema({
    id: Number, // String is shorthand for {type: String}
    nome: { type: String, required: true },
    email: { type: String, required: true },
    peso: { type: Number, required: true },
    senha: { type: String, required: true }
}, {
    timestamps: true
});

export default model("Usuario", usuarioSchema)