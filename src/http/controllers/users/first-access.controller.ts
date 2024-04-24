import { makeFirstAccessUseCase } from '@/factories/users/make-first-access-use-case'
import { UserNotFoundError } from '@/use-cases/errors/user-not-found-error'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function firstAccess(request: FastifyRequest, reply: FastifyReply) {
  const firstAccessBodySchema = z.object({
    password: z.string().min(6),
  })

  const { password } = firstAccessBodySchema.parse(request.body)

  try {
    const firstAccessUseCase = makeFirstAccessUseCase()

    await firstAccessUseCase.execute({
      userId: request.user.sub,
      password,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
