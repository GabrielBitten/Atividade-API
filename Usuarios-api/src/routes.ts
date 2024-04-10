import { Router } from 'express'
import usuarioController from './usuario/controllers/usuario.controller'
import TarefaController from './tarefas/controllers/tarefa.controller'
import CategoriaController from './categorias/controllers/categoria.controller';

const routes = Router()
//Rotas de Usuario
routes.post('/usuarios', usuarioController.create)
routes.get('/usuarios', usuarioController.findAll)
routes.get('/usuarios/:id', usuarioController.findById)
routes.put('/usuarios/:id', usuarioController.update)
routes.delete('/usuarios/:id', usuarioController.delete)

//Rotas de tarefas
routes.post('/tarefas', TarefaController.create);
routes.get('/tarefas/usuario/:usuarioId', TarefaController.findAll);
routes.get('/tarefas/:id', TarefaController.findById);
routes.put('/tarefas/:id', TarefaController.update);
routes.delete('/tarefas/:id', TarefaController.delete);

routes.get('/tarefas/categoria/:categoria', TarefaController.findByCategoria);
routes.get('/tarefas/concluidas', TarefaController.findConcluidas);
routes.get('/tarefas/pendentes', TarefaController.findPendentes);
routes.get('/tarefas/periodo/:inicio/:fim', TarefaController.findByPeriodo);
routes.get('/tarefas/count/usuario/:usuarioId', TarefaController.countTarefas);
routes.get('/tarefas/recente/usuario/:usuarioId', TarefaController.findRecente);
routes.get('/tarefas/media-conclusao', TarefaController.calcularMediaConclusao);
routes.get('/tarefas/longa-descricao', TarefaController.findLongaDescricao);
routes.get('/tarefas/agrupar-por-categoria', TarefaController.agruparPorCategoria);
routes.get('/tarefas/antiga/usuario/:usuarioId', TarefaController.findMaisAntiga);

//rotas de categorias
routes.post('/categorias', CategoriaController.create);
routes.get('/categorias/usuario/:usuarioId', CategoriaController.findAll);
routes.get('/categorias/:id', CategoriaController.findById);
routes.put('/categorias/:id', CategoriaController.update);
routes.delete('/categorias/:id', CategoriaController.delete);
export {
    routes
}