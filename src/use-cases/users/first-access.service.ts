import { UsersRepository } from '@/repositories/users-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { hash } from 'bcryptjs'

interface FirstAccessUseCaseRequest {
  userId: string
  password: string
}

export class FirstAccessUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId, password }: FirstAccessUseCaseRequest) {
    const user = await this.usersRepository.findByUserId(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const hashedPassword = await hash(password, 8)

    this.usersRepository.updatePasswordFirstAccess(userId, hashedPassword)
  }
}
