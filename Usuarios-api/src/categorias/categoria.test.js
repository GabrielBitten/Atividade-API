import app from '../app';
import { describe, it, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import CategoriaModel from '../src/categorias/categoria.schema';
import * as request from 'supertest';

describe('/categorias endpoint', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Deve inserir uma categoria no banco de dados', async () => {
        const categoriaMock = {
            nome: 'Categoria de Teste',
            cor: '#FF0',
            usuario: 'id_do_usuario'
        };

        const response = await request.default(app).post('/categorias').send(categoriaMock);
        const findedCategoria = await CategoriaModel.findById(response.body._id);

        expect(response.status).toEqual(201);
        expect(response.body._id).toBeDefined();
        expect(categoriaMock.nome).toBe(findedCategoria?.nome);
        expect(categoriaMock.cor).toBe(findedCategoria?.cor);
        expect(categoriaMock.usuario).toBe(findedCategoria?.usuario);
    });

    it('Deve buscar todas as categorias de um usuário no banco de dados', async () => {
        const usuarioId = 'id_do_usuario';
        const response = await request.default(app).get(`/categorias/usuario/${usuarioId}`);
        const categoriasDoUsuario = await CategoriaModel.find({ usuario: usuarioId });

        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(categoriasDoUsuario.length);
    });

    it('Deve buscar uma categoria pelo ID no banco de dados', async () => {
        const categoriaMock = {
            nome: 'Categoria de Teste',
            cor: '#FF0',
            usuario: 'id_do_usuario'
        };

        const createdCategoria = await CategoriaModel.create(categoriaMock);

        const response = await request.default(app).get(`/categorias/${createdCategoria._id}`);
        expect(response.status).toEqual(200);
        expect(response.body._id).toEqual(createdCategoria._id.toString());
    });

    it('Deve atualizar uma categoria pelo ID no banco de dados', async () => {
        const categoriaMock = {
            nome: 'Categoria de Teste',
            cor: '#FF0',
            usuario: 'id_do_usuario'
        };

        const createdCategoria = await CategoriaModel.create(categoriaMock);
        const updatedData = {
            nome: 'Categoria Atualizada',
            cor: '#F00'
        };

        const response = await request.default(app).put(`/categorias/${createdCategoria._id}`).send(updatedData);
        const updatedCategoria = await CategoriaModel.findById(createdCategoria._id);

        expect(response.status).toEqual(200);
        expect(updatedCategoria?.nome).toEqual(updatedData.nome);
        expect(updatedCategoria?.cor).toEqual(updatedData.cor);
    });

    it('Deve excluir uma categoria pelo ID no banco de dados', async () => {
        const categoriaMock = {
            nome: 'Categoria de Teste',
            cor: '#FF0',
            usuario: 'id_do_usuario'
        };

        const createdCategoria = await CategoriaModel.create(categoriaMock);
        const response = await request.default(app).delete(`/categorias/${createdCategoria._id}`);

        const deletedCategoria = await CategoriaModel.findById(createdCategoria._id);
        expect(response.status).toEqual(200);
        expect(deletedCategoria).toBeNull();
    });
});
