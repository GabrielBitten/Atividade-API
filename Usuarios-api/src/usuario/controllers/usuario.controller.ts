import { Request, Response } from 'express';
import usuarioService from '../services/usuario.service';

class UsuarioController {
    async create(req: Request, res: Response) {
        try {
            const createdUsuario = await usuarioService.create(req.body);
            res.status(201).json(createdUsuario);
        } catch {
            res.status(500).json();
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const findedUsuarios = await usuarioService.findAll();
            res.status(200).json(findedUsuarios);
        } catch {
            res.status(500).json();
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const findedUsuario = await usuarioService.findById(req.params.id);
            res.status(200).json(findedUsuario);
        } catch {
            res.status(500).json();
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedUsuario = await usuarioService.update(req.params.id, req.body);
            res.status(200).json(updatedUsuario);
        } catch {
            res.status(500).json();
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const deleted = await usuarioService.delete(req.params.id);
            res.status(200).json(deleted);
        } catch {
            res.status(500).json();
        }
    }
}

export default new UsuarioController();
