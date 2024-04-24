import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { TUser } from '@/model/drizzle/users'

type RegisterUseCaseRequest = TUser

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(user: RegisterUseCaseRequest) {
    const hashedPassword = await hash(user.password, 8)

    user.password = hashedPassword

    const doesUserWithSameEmailExists = await this.usersRepository.findByEmail(user.email)

    if (doesUserWithSameEmailExists) {
      throw new UserAlreadyExistsError()
    }

    this.usersRepository.create(user)
  }
}
