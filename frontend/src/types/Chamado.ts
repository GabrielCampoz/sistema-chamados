export type CategoriaChamado = "hardware" | "software" | "rede" | "acesso"
export type PrioridadeChamado = "baixa" | "media" | "alta"
export type StatusChamado = "aberto" | "resolvido"

export type Chamado = {
    id: number 
    titulo: string 
    descricao: string
    categoria: CategoriaChamado
    prioridade: PrioridadeChamado
    status: StatusChamado
}
