import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { boolean, date, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { deliveries } from './deliveries'

export const stages = pgTable('stages', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  dateOfStart: date('date_of_start').notNull(),
  dateOfEnd: date('date_of_end').notNull(),
  status: boolean('status').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const stagesRelations = relations(stages, ({ many }) => ({
  deliveries: many(deliveries),
}))
