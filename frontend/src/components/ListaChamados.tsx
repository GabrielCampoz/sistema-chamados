import { useState } from "react"
import type { Chamado, StatusChamado } from "../types/Chamado"

type FiltroStatus = "todos" | StatusChamado

type ListaChamadosProps = {
    chamados: Chamado[]
    onResolverChamado: (id: number) => void
}

const categoriaLabel = {
    hardware: "Hardware",
    software: "Software",
    rede: "Rede",
    acesso: "Acesso",
}

const prioridadeLabel = {
    baixa: "Baixa",
    media: "Média",
    alta: "Alta",
}

function ListaChamado({ chamados, onResolverChamado }: ListaChamadosProps) {
    const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos")
    const chamadosFiltrados = chamados.filter(
        (chamado) => filtroStatus === "todos" || chamado.status === filtroStatus
    )

    return (
        <section className="tickets-section">
            <div className="tickets-toolbar">
                <div>
                    <span className="eyebrow eyebrow--dark">Acompanhamento</span>
                    <h2>Chamados</h2>
                </div>

                <div className="filter-control">
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
                </div>
            </div>

            {chamados.length === 0 ? (
                <div className="empty-state">
                    <span aria-hidden="true">✓</span>
                    <h3>Tudo em ordem por aqui</h3>
                    <p>Nenhum chamado cadastrado.</p>
                </div>
            ) : chamadosFiltrados.length === 0 ? (
                <div className="empty-state">
                    <h3>Nenhum resultado</h3>
                    <p>Nenhum chamado com o status selecionado.</p>
                </div>
            ) : (
                <div className="tickets-grid">
                    {chamadosFiltrados.map((chamado) => (
                        <article className={`ticket-card ticket-card--${chamado.status}`} key={chamado.id}>
                            <div className="ticket-card__topline">
                                <span className={`status-badge status-badge--${chamado.status}`}>
                                    {chamado.status === "aberto" ? "Em aberto" : "Resolvido"}
                                </span>
                                <span className={`priority-badge priority-badge--${chamado.prioridade}`}>
                                    {prioridadeLabel[chamado.prioridade]}
                                </span>
                            </div>

                            <div className="ticket-card__body">
                                <span className="category-label">{categoriaLabel[chamado.categoria]}</span>
                                <h3>{chamado.titulo}</h3>
                                <p>{chamado.descricao}</p>
                            </div>

                            {chamado.status === "aberto" && (
                                <div className="ticket-card__footer">
                                    <button
                                        className="button button--resolve"
                                        type="button"
                                        onClick={() => onResolverChamado(chamado.id)}
                                    >
                                        Marcar como resolvido
                                    </button>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}

export default ListaChamado
