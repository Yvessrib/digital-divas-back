import { makeRegisterUseCase } from '@/factories/users/make-register-use-case'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    registration: z.number(),
    course: z.string(),
    period: z.number(),
    university: z.string(),
    country: z.string(),
  })

  const { email, password, name, registration, course, period, university, country } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      email,
      password,
      name,
      registration,
      course,
      period,
      university,
      country,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
