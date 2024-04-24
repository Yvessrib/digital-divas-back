import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { stages } from './stages'

export const deliveries = pgTable('deliveries', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  stageId: text('stage_id').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export const deliveriesRelations = relations(deliveries, ({ one }) => ({
  stage: one(stages, {
    fields: [deliveries.stageId],
    references: [stages.id],
  }),
}))
