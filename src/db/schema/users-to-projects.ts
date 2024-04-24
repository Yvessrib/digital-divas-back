import { pgTable, primaryKey, text } from 'drizzle-orm/pg-core'
import { users } from './users'
import { projects } from './projects'
import { relations } from 'drizzle-orm'

export const usersToProjects = pgTable(
  'users_to_projects',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    projectId: text('project_id')
      .notNull()
      .references(() => projects.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.projectId] }),
  }),
)

export const usersToProjectsRelations = relations(usersToProjects, ({ one }) => ({
  project: one(projects, {
    fields: [usersToProjects.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [usersToProjects.userId],
    references: [users.id],
  }),
}))
