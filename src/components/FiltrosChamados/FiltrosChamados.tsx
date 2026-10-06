import type { FiltroStatusChamado } from "../../types/Chamado"
import shared from "../../styles/shared.module.css"
import styles from "./FiltrosChamados.module.css"

type FiltrosChamadosProps = {
  filtroStatus: FiltroStatusChamado
  onAlterarFiltro: (status: FiltroStatusChamado) => void
}

export default function FiltrosChamados({ filtroStatus, onAlterarFiltro }: FiltrosChamadosProps) {
  return (
    <div className={`${styles.filter} ${shared.control}`}>
      <label htmlFor="filtro-status">Filtrar por status</label>
      <select
        id="filtro-status"
        value={filtroStatus}
        onChange={(event) => {
          const valor = event.target.value

          if (valor === "todos" || valor === "aberto" || valor === "resolvido") {
            onAlterarFiltro(valor)
          }
        }}
      >
        <option value="todos">Todos</option>
        <option value="aberto">Abertos</option>
        <option value="resolvido">Resolvidos</option>
      </select>
    </div>
  )
}
