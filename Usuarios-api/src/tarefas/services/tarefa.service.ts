import TarefaModel from '../schemas/tarefa.schema';
import { TarefaType } from '../types/tarefa.type';

class TarefaService {
    async create(tarefa: TarefaType) {
        try {
            const novaTarefa = await TarefaModel.create(tarefa);
            return novaTarefa;
        } catch {
            throw new Error();
        }
    }

    async findAll() {
        try {
            const tarefas = await TarefaModel.find();
            return tarefas;
        } catch {
            throw new Error();
        }
    }

    async findById(id: string) {
        try {
            const tarefa = await TarefaModel.findById(id);
            return tarefa;
        } catch {
            throw new Error();
        }
    }

    async update(id: string, tarefa: TarefaType) {
        try {
            const updatedTarefa = await TarefaModel.findByIdAndUpdate(id, tarefa, { new: true });
            return updatedTarefa;
        } catch {
            throw new Error();
        }
    }

    async delete(id: string) {
        try {
            await TarefaModel.findByIdAndDelete(id);
        } catch {
            throw new Error();
        }
    }
    async findByCategoria(categoria: string) {
        try {
            const tarefas = await TarefaModel.find({ categoria });
            return tarefas;
        } catch {
            throw new Error();
        }
    }

    async findConcluidas() {
        try {
            const tarefas = await TarefaModel.find({ status: 'concluída' });
            return tarefas;
        } catch {
            throw new Error();
        }
    }

    async findPendentes() {
        try {
            const tarefas = await TarefaModel.find({ status: 'pendente' });
            return tarefas;
        } catch {
            throw new Error();
        }
    }

    async findByPeriodo(inicio: Date, fim: Date) {
        try {
            const tarefas = await TarefaModel.find({ dataCriacao: { $gte: inicio, $lte: fim } });
            return tarefas;
        } catch {
            throw new Error();
        }
    }

    async countTarefas(usuarioId: string) {
        try {
            const count = await TarefaModel.countDocuments({ usuario: usuarioId });
            return count;
        } catch {
            throw new Error();
        }
    }

    async findRecente(usuarioId: string) {
        try {
            const tarefa = await TarefaModel.findOne({ usuario: usuarioId }).sort({ dataCriacao: -1 });
            return tarefa;
        } catch {
            throw new Error();
        }
    }

    async calcularMediaConclusao() {
        try {
            const totalTarefas = await TarefaModel.countDocuments();
            const concluidas = await TarefaModel.countDocuments({ status: 'concluída' });
            const media = (concluidas / totalTarefas) * 100;
            return media;
        } catch {
            throw new Error();
        }
    }

    async findLongaDescricao() {
        try {
            const tarefa = await TarefaModel.findOne().sort({ descricao: -1 });
            return tarefa;
        } catch {
            throw new Error();
        }
    }

    async agruparPorCategoria() {
        try {
            const agrupamento = await TarefaModel.aggregate([
                { $group: { _id: "$categoria", count: { $sum: 1 } } }
            ]);
            return agrupamento;
        } catch {
            throw new Error();
        }
    }

    async findMaisAntiga(usuarioId: string) {
        try {
            const tarefa = await TarefaModel.findOne({ usuario: usuarioId }).sort({ dataCriacao: 1 });
            return tarefa;
        } catch {
            throw new Error();
        }
    }
}

export default new TarefaService();
