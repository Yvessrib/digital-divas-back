import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate.controller'
import { register } from './register.controller'
import { firstAccess } from './first-access.controller'
import { verifyJwt } from '../middleware/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/auth', authenticate)
  app.post('/register', register)
  app.post('/auth/firstAccess', { onRequest: [verifyJwt] }, firstAccess)
}
