import app from '../app';
import { describe, it, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import TarefaModel from '../src/tarefas/tarefa.schema';
import * as request from 'supertest';

describe('/tarefas endpoint', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Deve inserir uma tarefa no banco de dados', async () => {
        const tarefaMock = {
            titulo: 'Tarefa de Teste',
            descricao: 'Descrição da tarefa de teste',
            tipo: 'Tipo de Teste',
            usuario: 'id_do_usuario'
        };

        const response = await request.default(app).post('/tarefas').send(tarefaMock);
        const findedTarefa = await TarefaModel.findById(response.body._id);

        expect(response.status).toEqual(201);
        expect(response.body._id).toBeDefined();
        expect(tarefaMock.titulo).toBe(findedTarefa?.titulo);
        expect(tarefaMock.descricao).toBe(findedTarefa?.descricao);
        expect(tarefaMock.tipo).toBe(findedTarefa?.tipo);
        expect(tarefaMock.usuario).toBe(findedTarefa?.usuario);
    });

    it('Deve buscar todas as tarefas de um usuário no banco de dados', async () => {
        const usuarioId = 'id_do_usuario';
        const response = await request.default(app).get(`/tarefas/usuario/${usuarioId}`);
        const tarefasDoUsuario = await TarefaModel.find({ usuario: usuarioId });

        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(tarefasDoUsuario.length);
    });

    it('Deve buscar uma tarefa pelo ID no banco de dados', async () => {
        const tarefa = new TarefaModel({
            titulo: 'Tarefa de Teste',
            descricao: 'Descrição da tarefa de teste',
            tipo: 'Tipo de Teste',
            usuario: 'id_do_usuario'
        });
        await tarefa.save();

        const response = await request.default(app).get(`/tarefas/${tarefa._id}`);
        
        expect(response.status).toEqual(200);
        expect(response.body.titulo).toEqual(tarefa.titulo);
        expect(response.body.descricao).toEqual(tarefa.descricao);
        expect(response.body.tipo).toEqual(tarefa.tipo);
        expect(response.body.usuario).toEqual(tarefa.usuario);
    });

    it('Deve atualizar uma tarefa pelo ID no banco de dados', async () => {
        const tarefa = new TarefaModel({
            titulo: 'Tarefa de Teste',
            descricao: 'Descrição da tarefa de teste',
            tipo: 'Tipo de Teste',
            usuario: 'id_do_usuario'
        });
        await tarefa.save();

        const updatedTarefaMock = {
            titulo: 'Tarefa Atualizada',
            descricao: 'Descrição da tarefa atualizada',
            tipo: 'Tipo Atualizado'
        };

        const response = await request.default(app).put(`/tarefas/${tarefa._id}`).send(updatedTarefaMock);
        const updatedTarefa = await TarefaModel.findById(tarefa._id);

        expect(response.status).toEqual(200);
        expect(updatedTarefa?.titulo).toEqual(updatedTarefaMock.titulo);
        expect(updatedTarefa?.descricao).toEqual(updatedTarefaMock.descricao);
        expect(updatedTarefa?.tipo).toEqual(updatedTarefaMock.tipo);
    });

    it('Deve deletar uma tarefa pelo ID no banco de dados', async () => {
        const tarefa = new TarefaModel({
            titulo: 'Tarefa de Teste',
            descricao: 'Descrição da tarefa de teste',
            tipo: 'Tipo de Teste',
            usuario: 'id_do_usuario'
        });
        await tarefa.save();

        const response = await request.default(app).delete(`/tarefas/${tarefa._id}`);
        const deletedTarefa = await TarefaModel.findById(tarefa._id);

        expect(response.status).toEqual(200);
        expect(deletedTarefa).toBeNull();
    });

    it('Deve buscar todas as tarefas de uma categoria específica no banco de dados', async () => {
    
        const tarefa = new TarefaModel({
            titulo: 'Tarefa de Teste',
            descricao: 'Descrição da tarefa de teste',
            tipo: 'Tipo de Teste',
            categoria: 'Categoria de Teste',
            usuario: 'id_do_usuario'
        });
        await tarefa.save();

      
        const response = await request.default(app).get(`/tarefas/categoria/${tarefa.categoria}`);

       
        const tarefasPorCategoria = await TarefaModel.find({ categoria: tarefa.categoria });

      
        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(tarefasPorCategoria.length);
    });

    it('Deve buscar todas as tarefas concluídas no banco de dados', async () => {

        const tarefaConcluida = new TarefaModel({
            titulo: 'Tarefa Concluída',
            descricao: 'Descrição da tarefa concluída',
            tipo: 'Tipo de Teste',
            status: 'concluída',
            usuario: 'id_do_usuario'
        });
        await tarefaConcluida.save();

     
        const response = await request.default(app).get('/tarefas/concluidas');

        
        const tarefasConcluidas = await TarefaModel.find({ status: 'concluída' });

  
        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(tarefasConcluidas.length);
    });

    it('Deve buscar todas as tarefas pendentes no banco de dados', async () => {
  
        const tarefaPendente = new TarefaModel({
            titulo: 'Tarefa Pendente',
            descricao: 'Descrição da tarefa pendente',
            tipo: 'Tipo de Teste',
            status: 'pendente',
            usuario: 'id_do_usuario'
        });
        await tarefaPendente.save();

        const response = await request.default(app).get('/tarefas/pendentes');

     
        const tarefasPendentes = await TarefaModel.find({ status: 'pendente' });

       
        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(tarefasPendentes.length);
    });

    it('Deve buscar todas as tarefas dentro de um período específico no banco de dados', async () => {

        const dataAtual = new Date();
        const tarefa = new TarefaModel({
            titulo: 'Tarefa de Teste',
            descricao: 'Descrição da tarefa de teste',
            tipo: 'Tipo de Teste',
            dataCriacao: dataAtual,
            usuario: 'id_do_usuario'
        });
        await tarefa.save();

        const inicio = new Date();
        inicio.setDate(inicio.getDate() - 7);
        const response = await request.default(app).get(`/tarefas/periodo/${inicio.toISOString()}/${dataAtual.toISOString()}`);


        const tarefasNoPeriodo = await TarefaModel.find({ dataCriacao: { $gte: inicio, $lte: dataAtual } });

        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(tarefasNoPeriodo.length);
    });

    it('Deve contar todas as tarefas de um usuario no banco de dados', async () => {
      
        await TarefaModel.create([
            { titulo: 'Tarefa 1', descricao: 'Descrição da tarefa 1', tipo: 'Tipo de Teste', usuario: 'id_do_usuario' },
            { titulo: 'Tarefa 2', descricao: 'Descrição da tarefa 2', tipo: 'Tipo de Teste', usuario: 'id_do_usuario' },
            { titulo: 'Tarefa 3', descricao: 'Descrição da tarefa 3', tipo: 'Tipo de Teste', usuario: 'id_do_usuario' }
        ]);

      
        const response = await request.default(app).get('/tarefas/count/usuario/id_do_usuario');

       
        const countTarefas = await TarefaModel.countDocuments({ usuario: 'id_do_usuario' });

        expect(response.status).toEqual(200);
        expect(response.body.count).toEqual(countTarefas);
    });

    it('Deve buscar a tarefa mais recente de um usurio no banco de dados', async () => {
    
        await TarefaModel.create([
            { titulo: 'Tarefa 1', descricao: 'Descrição da tarefa 1', tipo: 'Tipo de Teste', usuario: 'id_do_usuario' },
            { titulo: 'Tarefa 2', descricao: 'Descrição da tarefa 2', tipo: 'Tipo de Teste', usuario: 'id_do_usuario' },
            { titulo: 'Tarefa 3', descricao: 'Descrição da tarefa 3', tipo: 'Tipo de Teste', usuario: 'id_do_usuario' }
        ]);

  
        const response = await request.default(app).get('/tarefas/recente/usuario/id_do_usuario');

        const tarefaMaisRecente = await TarefaModel.findOne({ usuario: 'id_do_usuario' }).sort({ dataCriacao: -1 });

        expect(response.status).toEqual(200);
        expect(response.body._id).toEqual(tarefaMaisRecente?._id.toString());
    });

    it('Deve calcular a média de conclusão de tarefas no banco de dados', async () => {
        await TarefaModel.create([
            { titulo: 'Tarefa 1', descricao: 'Descrição da tarefa 1', tipo: 'Tipo de Teste', status: 'concluída', usuario: 'id_do_usuario' },
            { titulo: 'Tarefa 2', descricao: 'Descrição da tarefa 2', tipo: 'Tipo de Teste', status: 'concluída', usuario: 'id_do_usuario' },
            { titulo: 'Tarefa 3', descricao: 'Descrição da tarefa 3', tipo: 'Tipo de Teste', status: 'concluída', usuario: 'id_do_usuario' }
        ]);

        const response = await request.default(app).get('/tarefas/media-conclusao');

        const tarefasConcluidas = await TarefaModel.countDocuments({ status: 'concluída', usuario: 'id_do_usuario' });

        const totalTarefas = await TarefaModel.countDocuments({ usuario: 'id_do_usuario' });

        const mediaConclusao = totalTarefas > 0 ? tarefasConcluidas / totalTarefas : 0;

        expect(response.status).toEqual(200);
        expect(response.body.media).toEqual(mediaConclusao);
    });
    it('Deve buscar uma tarefa com a descrição mais longa no banco de dados', async () => {
        const response = await request.default(app).get('/tarefas/longa-descricao');
        
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
   
    });

  
    it('Deve agrupar as tarefas por categoria no banco de dados', async () => {
        const response = await request.default(app).get('/tarefas/agrupar-por-categoria');
        
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
   
    });
    it('Deve buscar a tarefa mais antiga de um usuário no banco de dados', async () => {
        const usuarioId = 'id_do_usuario'; 
        const response = await request.default(app).get(`/tarefas/antiga/usuario/${usuarioId}`);
        
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
        expect(response.body.titulo).toBeDefined();
        expect(response.body.descricao).toBeDefined();
        expect(response.body.tipo).toBeDefined();
        expect(response.body.usuario).toBeDefined();
     
    });

});
