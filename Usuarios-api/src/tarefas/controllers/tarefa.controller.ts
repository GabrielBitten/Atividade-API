import { Request, Response } from 'express';
import TarefaService from '../services/tarefa.service';

class TarefaController {
    async create(req: Request, res: Response) {
        try {
            const novaTarefa = await TarefaService.create(req.body);
            res.status(201).json(novaTarefa);
        } catch {
            res.status(500).json();
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const tarefas = await TarefaService.findAll();
            res.status(200).json(tarefas);
        } catch {
            res.status(500).json();
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const tarefa = await TarefaService.findById(req.params.id);
            if (!tarefa) {
                res.status(404).json({ message: 'Tarefa não encontrada' });
            } else {
                res.status(200).json(tarefa);
            }
        } catch {
            res.status(500).json();
        }
    }

    async update(req: Request, res: Response) {
        try {
            const updatedTarefa = await TarefaService.update(req.params.id, req.body);
            res.status(200).json(updatedTarefa);
        } catch {
            res.status(500).json();
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await TarefaService.delete(req.params.id);
            res.status(200).json({ message: 'Tarefa removida com sucesso' });
        } catch {
            res.status(500).json();
        }
    }
      
        async findByCategoria(req: Request, res: Response) {
            try {
                const tarefas = await TarefaService.findByCategoria(req.params.categoria);
                res.status(200).json(tarefas);
            } catch {
                res.status(500).json();
            }
        }
    
     
        async findConcluidas(req: Request, res: Response) {
            try {
                const tarefas = await TarefaService.findConcluidas();
                res.status(200).json(tarefas);
            } catch {
                res.status(500).json();
            }
        }
    
       
        async findPendentes(req: Request, res: Response) {
            try {
                const tarefas = await TarefaService.findPendentes();
                res.status(200).json(tarefas);
            } catch {
                res.status(500).json();
            }
        }
    
      
        async findByPeriodo(req: Request, res: Response) {
            try {
                const inicio = new Date(req.params.inicio);
                const fim = new Date(req.params.fim);
                const tarefas = await TarefaService.findByPeriodo(inicio, fim);
                res.status(200).json(tarefas);
            } catch {
                res.status(500).json();
            }
        }
    
      
        async countTarefas(req: Request, res: Response) {
            try {
                const count = await TarefaService.countTarefas(req.params.usuarioId);
                res.status(200).json({ count });
            } catch {
                res.status(500).json();
            }
        }
    
       
        async findRecente(req: Request, res: Response) {
            try {
                const tarefa = await TarefaService.findRecente(req.params.usuarioId);
                res.status(200).json(tarefa);
            } catch {
                res.status(500).json();
            }
        }
    
      
        async calcularMediaConclusao(req: Request, res: Response) {
            try {
                const media = await TarefaService.calcularMediaConclusao();
                res.status(200).json({ media });
            } catch {
                res.status(500).json();
            }
        }
    
      
        async findLongaDescricao(req: Request, res: Response) {
            try {
                const tarefa = await TarefaService.findLongaDescricao();
                res.status(200).json(tarefa);
            } catch {
                res.status(500).json();
            }
        }
    
      
        async agruparPorCategoria(req: Request, res: Response) {
            try {
                const agrupamento = await TarefaService.agruparPorCategoria();
                res.status(200).json(agrupamento);
            } catch {
                res.status(500).json();
            }
        }
    
        
        async findMaisAntiga(req: Request, res: Response) {
            try {
                const tarefa = await TarefaService.findMaisAntiga(req.params.usuarioId);
                res.status(200).json(tarefa);
            } catch {
                res.status(500).json();
            }
        }
}

export default new TarefaController();
