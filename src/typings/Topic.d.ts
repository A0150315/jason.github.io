declare namespace Topic {
  export interface Data {
    title: string
    id: number
    answer: number
    options: { id: number; name: string }[]
    code?: string
  }
}
