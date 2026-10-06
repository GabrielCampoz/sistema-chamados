import { useState } from "react"
import type { Chamado, FiltroStatusChamado } from "../../types/Chamado"
import ChamadoCard from "../ChamadoCard/ChamadoCard"
import FiltrosChamados from "../FiltrosChamados/FiltrosChamados"
import shared from "../../styles/shared.module.css"
import styles from "./ListaChamados.module.css"

type ListaChamadosProps = {
  chamados: Chamado[]
  onResolverChamado: (id: number) => void
}

function ListaChamados({ chamados, onResolverChamado }: ListaChamadosProps) {
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatusChamado>("todos")
  const chamadosFiltrados = chamados.filter(
    (chamado) => filtroStatus === "todos" || chamado.status === filtroStatus
  )

  return (
    <section className={shared.panel}>
      <div className={`${styles.toolbar} ${shared.heading}`}>
        <div>
          <span className={`${shared.eyebrow} ${shared.eyebrowDark}`}>Acompanhamento</span>
          <h2>Chamados</h2>
        </div>

        <FiltrosChamados filtroStatus={filtroStatus} onAlterarFiltro={setFiltroStatus} />
      </div>

      {chamados.length === 0 ? (
        <div className={styles.empty}>
          <span aria-hidden="true">✓</span>
          <h3>Tudo em ordem por aqui</h3>
          <p>Nenhum chamado cadastrado.</p>
        </div>
      ) : chamadosFiltrados.length === 0 ? (
        <div className={styles.empty}>
          <h3>Nenhum resultado</h3>
          <p>Nenhum chamado com o status selecionado.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {chamadosFiltrados.map((chamado) => (
            <ChamadoCard key={chamado.id} chamado={chamado} onResolverChamado={onResolverChamado} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ListaChamados
