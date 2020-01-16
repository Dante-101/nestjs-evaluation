import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request as ERequest } from 'express'

import { AuthService } from '../services/auth.service'

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
        console.log('AuthController Initialized')
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req: ERequest) {
        return { ...(req as any).user, token: req.headers.authorization }
    }
}