import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { boolean, integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { projects } from './projects'
import { usersToProjects } from './users-to-projects'

export const userRoleEnum = pgEnum('user_role', ['admin', 'user', 'evaluator', 'advisor'])

export const users = pgTable('user', {
  id: text('id')
    .unique()
    .$defaultFn(() => createId())
    .primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  registration: integer('registration').notNull(),
  course: text('course').notNull(),
  period: integer('period').notNull(),
  firstAccess: boolean('first_access').notNull().default(true),
  university: text('university').notNull(),
  country: text('country').notNull(),
  role: userRoleEnum('role').notNull().default('user'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  usersToProjects: many(usersToProjects),
}))
