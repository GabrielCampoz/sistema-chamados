import { useState } from "react"
import type { Chamado, StatusChamado } from "../types/Chamado"

type FiltroStatus = "todos" | StatusChamado

type ListaChamadosProps = {
    chamados: Chamado[]
    onResolverChamado: (id: number) => void
}

function ListaChamado({ chamados, onResolverChamado }: ListaChamadosProps) {
    const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos")
    const chamadosFiltrados = chamados.filter(
        (chamado) => filtroStatus === "todos" || chamado.status === filtroStatus
    )

    return (
        <section>
            <h2>Chamados</h2>

            <label htmlFor="filtro-status">Filtrar por status</label>
            <select
                id="filtro-status"
                value={filtroStatus}
                onChange={(event) => {
                    const valor = event.target.value

                    if (valor === "todos" || valor === "aberto" || valor === "resolvido") {
                        setFiltroStatus(valor)
                    }
                }}
            >
                <option value="todos">Todos</option>
                <option value="aberto">Abertos</option>
                <option value="resolvido">Resolvidos</option>
            </select>

            {chamados.length === 0 ? (
                <p>Nenhum chamado cadastrado.</p>
            ) : chamadosFiltrados.length === 0 ? (
                <p>Nenhum chamado com o status selecionado.</p>
            ) : (
                chamadosFiltrados.map((chamado) => (
                    <div key={chamado.id}>
                        <h3>{chamado.titulo}</h3>
                        <p>{chamado.descricao}</p>
                        <p>Categoria: {chamado.categoria}</p>
                        <p>Prioridade: {chamado.prioridade}</p>
                        <p>Status: {chamado.status}</p>
                        {chamado.status === "aberto" && (
                            <button type="button" onClick={() => onResolverChamado(chamado.id)}>
                                Resolver
                            </button>
                        )}
                    </div>
                ))
            )}
        </section>
    )
}

export default ListaChamado
