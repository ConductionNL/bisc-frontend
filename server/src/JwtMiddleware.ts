import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
import { UserService } from './User/services/UserService'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(private jwtService: JwtService, private userService: UserService) {}

    public async use(req: Request, res: Response, next: () => void) {
        const authorizationHeader = req.headers.authorization
        if (authorizationHeader) {
            try {
                const sanitizedAuthHeader = authorizationHeader.replace(/^Bearer\s?/i, '')
                const { userId } = this.jwtService.verify(sanitizedAuthHeader) as {
                    userId: string
                }
                const user = await this.userService.findContextUserById(
                    `https://taalhuizen-bisc.commonground.nu/api/v1/uc/users/${userId}`
                )
                if (user) {
                    req.user = user
                }
            } catch (error) {
                // We don't want this to either crash the application or leak any information. So we fail silently
                this.logger.warn(`Failed to resolve user from authorization header:\n${error.stack}`)
            }
        }

        next()
    }
}
