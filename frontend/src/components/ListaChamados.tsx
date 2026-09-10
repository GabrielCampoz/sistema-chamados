import type { Chamado } from "../types/Chamado";

type ListaChamadosProps = {
    chamados: Chamado[]
}

function ListaChamado({ chamados }: ListaChamadosProps) {
    return (
        <section>
            <h2>Chamados</h2>

            {chamados.length === 0 ? (
                <p>Nenhum chamado cadastrado.</p>
            ) : (
                chamados.map((chamado) => (
                    <div key={chamado.id}>
                        <h3>{chamado.titulo}</h3>
                        <p>{chamado.descricao}</p>
                        <p>Categoria: {chamado.categoria}</p>
                        <p>Prioridade: {chamado.prioridade}</p>
                        <p>Status: {chamado.status}</p>
                    </div>
                ))
            )}
        </section>
    )
}

export default ListaChamado