import app from '../app';
import { describe, it, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import UserModel from '../src/usuarios/usuario.schema';
import * as request from 'supertest';

describe('/usuarios endpoint', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Deve inserir um usuário no banco de dados', async () => {
        const usuarioMock = {
            nome: 'Usuário de Teste',
            email: 'teste@gmail.com',
            peso: 70,
            senha: 'senha123'
        };

        const response = await request.default(app).post('/usuarios').send(usuarioMock);
        const findedUsuario = await UserModel.findById(response.body._id);

        expect(response.status).toEqual(201);
        expect(response.body._id).toBeDefined();
        expect(usuarioMock.nome).toBe(findedUsuario?.nome);
        expect(usuarioMock.email).toBe(findedUsuario?.email);
        expect(usuarioMock.peso).toBe(findedUsuario?.peso);
    });

    it('Deve buscar todos os usuários no banco de dados', async () => {
        const response = await request.default(app).get('/usuarios');
        const usuarios = await UserModel.find();

        expect(response.status).toEqual(200);
        expect(response.body.length).toEqual(usuarios.length);
    });

    it('Deve buscar um usuário pelo ID no banco de dados', async () => {
        const usuario = await UserModel.findOne();
        const response = await request.default(app).get(`/usuarios/${usuario._id}`);

        expect(response.status).toEqual(200);
        expect(response.body._id).toEqual(String(usuario._id));
    });

    it('Deve atualizar um usuário no banco de dados', async () => {
        const usuario = await UserModel.findOne();
        const novoNome = 'Novo Nome';

        const response = await request.default(app).put(`/usuarios/${usuario._id}`).send({ nome: novoNome });
        const updatedUsuario = await UserModel.findById(usuario._id);

        expect(response.status).toEqual(200);
        expect(updatedUsuario?.nome).toEqual(novoNome);
    });

    it('Deve excluir um usuário do banco de dados', async () => {
        const usuario = await UserModel.findOne();
        const response = await request.default(app).delete(`/usuarios/${usuario._id}`);

        const deletedUsuario = await UserModel.findById(usuario._id);

        expect(response.status).toEqual(200);
        expect(deletedUsuario).toBeNull();
    });
});
