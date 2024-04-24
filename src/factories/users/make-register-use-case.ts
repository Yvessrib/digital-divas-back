import { DrizzleUsersRepository } from '@/repositories/drizzle/drizzle-users-repository'
import { RegisterUseCase } from '@/use-cases/users/register.service'

export function makeRegisterUseCase() {
  const usersRepository = new DrizzleUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
