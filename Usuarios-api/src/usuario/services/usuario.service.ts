import usuarioModel from '../schemas/usuario.schema';
import { usuarioType } from '../types/usuario.type';

class UsuarioService {
    async create(usuario: usuarioType) {
        try {
            const createdUsuario = await usuarioModel.create(usuario);
            return createdUsuario;
        } catch {
            throw new Error();
        }
    }

    async findAll() {
        try {
            const findedUsuarios = await usuarioModel.find();
            return findedUsuarios;
        } catch {
            throw new Error();
        }
    }

    async findById(id: string) {
        try {
            const findedUsuario = await usuarioModel.findById(id);
            return findedUsuario;
        } catch {
            throw new Error();
        }
    }

    async update(id: string, usuario: usuarioType) {
        try {
            const updatedUsuario = await usuarioModel.findByIdAndUpdate(id, {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                peso: usuario.peso,
                senha: usuario.senha
            }, { new: true });

            return updatedUsuario;
        } catch {
            throw new Error();
        }
    }

    async delete(id: string) {
        try {
            await usuarioModel.findByIdAndDelete(id)
            return "Usuario removido com sucesso"
        } catch (error) {
            throw new Error(`Ocorreu um erro ao remover o Usuario: ${error}`)
        }
    }
}

export default new UsuarioService();
