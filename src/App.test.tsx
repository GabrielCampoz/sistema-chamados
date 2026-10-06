// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import App from "./App"

const CHAMADOS_STORAGE_KEY = "sistema-chamados:chamados"

describe("App", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  const chamadoValido = {
    id: 1, titulo: "Computador não liga", descricao: "Sem energia",
    categoria: "hardware", prioridade: "alta", status: "aberto",
  }

  it.each([
    null, {}, "inválido", [],
    { ...chamadoValido, id: "1" },
    { ...chamadoValido, titulo: "   " },
    { ...chamadoValido, titulo: {} },
    { ...chamadoValido, descricao: null },
    { ...chamadoValido, descricao: "" },
    { ...chamadoValido, categoria: "outra" },
    { ...chamadoValido, prioridade: "urgente" },
    { ...chamadoValido, status: "outro" },
  ])("preserva o chamado válido ao ignorar um registro inválido: %j", (invalido) => {
    localStorage.setItem(CHAMADOS_STORAGE_KEY, JSON.stringify([invalido, chamadoValido]))

    render(<App />)

    expect(screen.getAllByRole("button", { name: "Marcar como resolvido" })).toHaveLength(1)
    expect(screen.getByText(chamadoValido.titulo)).not.toBeNull()
    expect(JSON.parse(localStorage.getItem(CHAMADOS_STORAGE_KEY)!)).toEqual([chamadoValido])
  })

  it("mantém os dados anteriores quando não consegue ler o armazenamento", () => {
    const dados = JSON.stringify([chamadoValido])
    localStorage.setItem(CHAMADOS_STORAGE_KEY, dados)
    const leitura = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("Acesso bloqueado", "SecurityError")
    })

    render(<App />)

    expect(screen.getByRole("alert").textContent).toContain("Não foi possível carregar")
    fireEvent.click(screen.getByRole("button", { name: "Novo chamado" }))
    fireEvent.change(screen.getByLabelText("Título"), { target: { value: "Novo" } })
    fireEvent.change(screen.getByLabelText("Descrição"), { target: { value: "Descrição" } })
    fireEvent.change(screen.getByLabelText("Categoria"), { target: { value: "rede" } })
    fireEvent.click(screen.getByRole("button", { name: "Criar chamado" }))
    expect(screen.getByText("Novo")).not.toBeNull()
    leitura.mockRestore()
    expect(localStorage.getItem(CHAMADOS_STORAGE_KEY)).toBe(dados)
  })

  it("avisa sobre falha ao salvar e remove o aviso após uma gravação bem-sucedida", () => {
    localStorage.setItem(CHAMADOS_STORAGE_KEY, JSON.stringify([chamadoValido]))
    const gravacao = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Sem espaço", "QuotaExceededError")
    })

    render(<App />)

    expect(screen.getByText(chamadoValido.titulo)).not.toBeNull()
    expect(screen.getByRole("alert").textContent).toContain("Não foi possível salvar")
    expect(JSON.parse(localStorage.getItem(CHAMADOS_STORAGE_KEY)!)).toEqual([chamadoValido])
    gravacao.mockRestore()
    fireEvent.click(screen.getByRole("button", { name: "Marcar como resolvido" }))
    expect(screen.queryByRole("alert")).toBeNull()
    expect(JSON.parse(localStorage.getItem(CHAMADOS_STORAGE_KEY)!)[0].status).toBe("resolvido")
  })

  it("exibe os chamados salvos ao iniciar", () => {
    localStorage.setItem(
      CHAMADOS_STORAGE_KEY,
      JSON.stringify([
        {
          id: 1,
          titulo: "Computador não liga",
          descricao: "A máquina não responde ao botão de energia.",
          categoria: "hardware",
          prioridade: "alta",
          status: "aberto",
        },
      ]),
    )

    render(<App />)

    expect(screen.getByText("Computador não liga")).not.toBeNull()
  })

  it("salva os chamados quando um novo chamado é criado", async () => {
    render(<App />)

    fireEvent.click(screen.getByRole("button", { name: "Novo chamado" }))
    fireEvent.change(screen.getByLabelText(/t.tulo/i), {
      target: { value: "Internet indisponível" },
    })
    fireEvent.change(screen.getByLabelText(/descri/i), {
      target: { value: "Não há conexão no setor financeiro." },
    })
    fireEvent.change(screen.getByLabelText("Categoria"), {
      target: { value: "rede" },
    })
    fireEvent.click(screen.getByRole("button", { name: "Criar chamado" }))

    await waitFor(() => {
      const chamadosSalvos = JSON.parse(
        localStorage.getItem(CHAMADOS_STORAGE_KEY) ?? "[]",
      ) as Array<{ titulo: string }>

      expect(chamadosSalvos[0]?.titulo).toBe("Internet indisponível")
    })
  })

  it("inicia com a lista vazia quando os dados salvos são inválidos", () => {
    localStorage.setItem(CHAMADOS_STORAGE_KEY, "dados corrompidos")

    render(<App />)

    expect(screen.getByText("Nenhum chamado cadastrado.")).not.toBeNull()
  })

  it("ignora dados salvos que não sejam uma lista", () => {
    localStorage.setItem(CHAMADOS_STORAGE_KEY, JSON.stringify({ titulo: "Inválido" }))

    render(<App />)

    expect(screen.getByText("Nenhum chamado cadastrado.")).not.toBeNull()
  })

  it("resume o total de chamados por status", () => {
    localStorage.setItem(
      CHAMADOS_STORAGE_KEY,
      JSON.stringify([
        { id: 1, titulo: "A", descricao: "A", categoria: "hardware", prioridade: "alta", status: "aberto" },
        { id: 2, titulo: "B", descricao: "B", categoria: "software", prioridade: "media", status: "aberto" },
        { id: 3, titulo: "C", descricao: "C", categoria: "rede", prioridade: "baixa", status: "resolvido" },
      ]),
    )

    render(<App />)

    const resumo = within(screen.getByRole("region", { name: "Resumo dos chamados" }))
    expect(resumo.getByText("3")).not.toBeNull()
    expect(resumo.getByText("2")).not.toBeNull()
    expect(resumo.getByText("1")).not.toBeNull()
  })
})
