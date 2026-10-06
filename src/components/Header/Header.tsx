import shared from "../../styles/shared.module.css"
import styles from "./Header.module.css"

type HeaderProps = {
  mostrarFormulario: boolean
  onNovoChamado: () => void
}

export default function Header({ mostrarFormulario, onNovoChamado }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <span className={shared.eyebrow}>Central de suporte</span>
        <h1>Sistema de Chamados</h1>
        <p>Registre solicitações, acompanhe prioridades e mantenha tudo sob controle.</p>
      </div>

      {!mostrarFormulario && (
        <button className={`${shared.button} ${shared.primary} ${styles.newTicket}`} type="button" onClick={onNovoChamado}>
          <span aria-hidden="true">+</span>
          Novo chamado
        </button>
      )}
    </header>
  )
}
