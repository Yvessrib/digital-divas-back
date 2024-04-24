import { IAuthUser, IUserWithPassword } from '@/model/users'
import { UsersRepository } from '../users-repository'
import { db } from '@/db/connection'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { TUser } from '@/model/drizzle/users'

export class DrizzleUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<IAuthUser | null> {
    const user = await db
      .select({
        role: users.role,
        id: users.id,
      })
      .from(users)
      .where(eq(users.email, email))

    return user[0]
  }

  async findByEmailWithPassword(email: string): Promise<IUserWithPassword | null> {
    const user = await db
      .select({
        role: users.role,
        id: users.id,
        password: users.password,
        firstAccess: users.firstAccess,
      })
      .from(users)
      .where(eq(users.email, email))

    return user[0]
  }

  async findByUserId(userId: string): Promise<IAuthUser | null> {
    const user = await db
      .select({
        role: users.role,
        id: users.id,
      })
      .from(users)
      .where(eq(users.id, userId))

    return user[0]
  }

  async create(user: TUser) {
    await db.insert(users).values(user)
  }

  async updatePasswordFirstAccess(userId: string, password: string) {
    await db.update(users).set({ password, firstAccess: false }).where(eq(users.id, userId))
  }
}
