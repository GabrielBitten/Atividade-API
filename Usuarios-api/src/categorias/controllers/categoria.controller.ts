import { Request, Response } from 'express';
import CategoriaService from '../services/categoria.service';

class CategoriaController {
    async create(req: Request, res: Response) {
        try {
            const novaCategoria = await CategoriaService.create(req.body);
            res.status(201).json(novaCategoria);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const categorias = await CategoriaService.findAll(req.params.usuarioId);
            res.status(200).json(categorias);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const categoria = await CategoriaService.findById(req.params.id);
            if (!categoria) {
                res.status(404).json({ message: 'Categoria não encontrada' });
            } else {
                res.status(200).json(categoria);
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const categoriaAtualizada = await CategoriaService.update(req.params.id, req.body);
            res.status(200).json(categoriaAtualizada);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const mensagem = await CategoriaService.delete(req.params.id);
            res.status(200).json({ message: mensagem });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new CategoriaController();
