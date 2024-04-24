import { Role } from './roles'

export interface IAuthUser {
  role: Role
  id: string
}

export interface IUserWithPassword extends IAuthUser {
  password: string
  firstAccess: boolean
}
