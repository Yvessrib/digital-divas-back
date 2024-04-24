import { DrizzleUsersRepository } from '@/repositories/drizzle/drizzle-users-repository'
import { AuthenticateUseCase } from '@/use-cases/users/authenticate.service'

export function makeAuthenticateUseCase() {
  const usersRepository = new DrizzleUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
