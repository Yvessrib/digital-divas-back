import { createId } from '@paralleldrive/cuid2'
import { sql } from 'drizzle-orm'
import { numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const forgotPassword = pgTable('forgot_password', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  email: text('email').notNull(),
  token: numeric('token').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  expiresAt: timestamp('expires_at').default(sql`CURRENT_TIMESTAMP + INTERVAL '6 minutes'`),
})
