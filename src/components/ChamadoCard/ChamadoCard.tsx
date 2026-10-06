import type { Chamado } from "../../types/Chamado"
import shared from "../../styles/shared.module.css"
import styles from "./ChamadoCard.module.css"

type ChamadoCardProps = {
  chamado: Chamado
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

export default function ChamadoCard({ chamado, onResolverChamado }: ChamadoCardProps) {
  return (
    <article className={`${styles.card} ${chamado.status === "resolvido" ? styles.resolved : ""}`}>
      <div className={styles.topline}>
        <span className={`${styles.status} ${styles[chamado.status]}`}>
          {chamado.status === "aberto" ? "Em aberto" : "Resolvido"}
        </span>
        <span className={`${styles.priority} ${styles[chamado.prioridade]}`}>
          {prioridadeLabel[chamado.prioridade]}
        </span>
      </div>

      <div className={styles.body}>
        <span className={styles.category}>{categoriaLabel[chamado.categoria]}</span>
        <h3>{chamado.titulo}</h3>
        <p>{chamado.descricao}</p>
      </div>

      {chamado.status === "aberto" && (
        <div className={styles.footer}>
          <button
            className={`${shared.button} ${styles.resolve}`}
            type="button"
            onClick={() => onResolverChamado(chamado.id)}
          >
            Marcar como resolvido
          </button>
        </div>
      )}
    </article>
  )
}
