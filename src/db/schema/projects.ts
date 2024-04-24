import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { usersToProjects } from './users-to-projects'

export const projects = pgTable('projects', {
  id: text('id')
    .unique()
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').notNull(),
  advisorId: text('id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const projectsRelations = relations(projects, ({ one, many }) => ({
  advisor: one(users, {
    fields: [projects.advisorId],
    references: [users.id],
  }),
  usersToProjects: many(usersToProjects),
}))
