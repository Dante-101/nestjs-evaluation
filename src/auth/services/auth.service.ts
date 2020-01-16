import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User } from '../../users/user.interface'
import { UsersService } from '../../users/users.service'

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {
        console.log('AuthService Initialized')
    }

    async validateUser(username: string, pass: string): Promise<Omit<User, 'password'>> {
        const user = await this.usersService.findOne(username)
        if (user && user.password === pass) {
            const { password, ...result } = user
            return result
        }
        return null
    }

    async login(user: Omit<User, 'password'>) {
        const payload = { username: user.username, sub: user.userId }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}