import CategoriaModel from '../schemas/categoria.schema';
import { CategoriaType } from '../types/categoria.types';

class CategoriaService {
    async create(categoria: CategoriaType) {
        try {
            const novaCategoria = await CategoriaModel.create(categoria);
            return novaCategoria;
        } catch (error) {
            throw new Error('Erro ao criar categoria');
        }
    }

    async findAll(usuarioId: string) {
        try {
            const categorias = await CategoriaModel.find({ usuario: usuarioId });
            return categorias;
        } catch (error) {
            throw new Error('Erro ao buscar categorias');
        }
    }

    async findById(id: string) {
        try {
            const categoria = await CategoriaModel.findById(id);
            return categoria;
        } catch (error) {
            throw new Error('Erro ao buscar categoria');
        }
    }

    async update(id: string, categoria: CategoriaType) {
        try {
            const categoriaAtualizada = await CategoriaModel.findByIdAndUpdate(id, categoria, { new: true });
            return categoriaAtualizada;
        } catch (error) {
            throw new Error('Erro ao atualizar categoria');
        }
    }

    async delete(id: string) {
        try {
            await CategoriaModel.findByIdAndDelete(id);
            return 'Categoria removida com sucesso';
        } catch (error) {
            throw new Error('Erro ao excluir categoria');
        }
    }
}

export default new CategoriaService();
