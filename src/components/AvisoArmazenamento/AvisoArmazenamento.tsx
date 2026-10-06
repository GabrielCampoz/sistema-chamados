import styles from "./AvisoArmazenamento.module.css"

type AvisoArmazenamentoProps = {
  leituraFalhou: boolean
  erroAoSalvar: boolean
}

export default function AvisoArmazenamento({ leituraFalhou, erroAoSalvar }: AvisoArmazenamentoProps) {
  if (!leituraFalhou && !erroAoSalvar) return null

  return (
    <p className={styles.warning} role="alert">
      {leituraFalhou
        ? "Não foi possível carregar os chamados salvos. Para proteger seus dados anteriores, as alterações desta sessão não serão salvas. Verifique as permissões de armazenamento do navegador."
        : "Não foi possível salvar os chamados no navegador. As alterações estão apenas nesta página e podem ser perdidas ao sair. Verifique o espaço disponível e as permissões de armazenamento; tentaremos salvar novamente na próxima alteração."}
    </p>
  )
}
