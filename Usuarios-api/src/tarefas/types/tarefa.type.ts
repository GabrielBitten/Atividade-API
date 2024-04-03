export interface TarefaType {
    _id: string;
    titulo: string;
    descricao: string;
    dataCriacao: Date;
    dataConclusao?: Date;
    tipo: string;
    categoria?: string;
    status: 'pendente' | 'em andamento' | 'concluída';
    usuario: Number
}
