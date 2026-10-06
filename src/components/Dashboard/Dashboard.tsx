import type { Chamado } from "../../types/Chamado"
import styles from "./Dashboard.module.css"

type DashboardProps = { chamados: Chamado[] }

export default function Dashboard({ chamados }: DashboardProps) {
  const totalAbertos = chamados.filter((chamado) => chamado.status === "aberto").length
  const totalResolvidos = chamados.filter((chamado) => chamado.status === "resolvido").length

  return (
    <section className={styles.grid} aria-label="Resumo dos chamados">
      <article className={styles.card}>
        <span>Total de chamados</span>
        <strong>{chamados.length}</strong>
      </article>
      <article className={`${styles.card} ${styles.open}`}>
        <span>Em aberto</span>
        <strong>{totalAbertos}</strong>
      </article>
      <article className={`${styles.card} ${styles.resolved}`}>
        <span>Resolvidos</span>
        <strong>{totalResolvidos}</strong>
      </article>
    </section>
  )
}
