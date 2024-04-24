import { TUser } from '@/model/drizzle/users'
import { IAuthUser, IUserWithPassword } from '@/model/users'

export interface UsersRepository {
  findByEmail(email: string): Promise<IAuthUser | null>
  findByEmailWithPassword(email: string): Promise<IUserWithPassword | null>
  findByUserId(userId: string): Promise<IAuthUser | null>
  create(user: TUser): void
  updatePasswordFirstAccess(userId: string, password: string): void
}
