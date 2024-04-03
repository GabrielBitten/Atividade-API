import { Schema, model } from 'mongoose';

const tarefaSchema = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now },
    dataConclusao: { type: Date },
    tipo: { type: String, required: true },
    categoria: { type: String },
    status: { type: String, enum: ['pendente', 'em andamento', 'concluída'], default: 'pendente' },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, {
    timestamps: true
});

export default model("Tarefa", tarefaSchema);
