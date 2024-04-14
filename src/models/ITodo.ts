export interface ITodo {
   date: Date | string | Date[] | string[]
   title?: string
   description?: string
   status: TStatus
   creator: string
}

export type TStatus = 'ongoing' | 'done' | 'expired' | 'todo'