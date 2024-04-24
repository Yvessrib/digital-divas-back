import { users } from '@/db/schema'

export type TUser = typeof users.$inferInsert
