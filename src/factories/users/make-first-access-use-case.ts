import { DrizzleUsersRepository } from '@/repositories/drizzle/drizzle-users-repository'
import { FirstAccessUseCase } from '@/use-cases/users/first-access.service'

export function makeFirstAccessUseCase() {
  const usersRepository = new DrizzleUsersRepository()
  const firstAccessUseCase = new FirstAccessUseCase(usersRepository)

  return firstAccessUseCase
}
