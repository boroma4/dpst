export type lang = 'javascript' | 'python';

export type FunctionData = {
    name?: string
    params: Variable[]
    body: string
    variables?: Variable[] // variáveis que o escopo da função precisa conseguir acessar
}

export type Variable = { name: string; value: string }

