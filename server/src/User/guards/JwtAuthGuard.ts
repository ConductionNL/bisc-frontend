import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {
    // TODO: Try to use the standard AuthGuard('jwt') instead of our custom logic
    // export class JwtAuthGuard extends AuthGuard('jwt') {
    public constructor(private jwtService: JwtService) {}

    public canActivate(context: ExecutionContext) {
        // Relevant doc: https://docs.nestjs.com/graphql/other-features#execution-context
        const ctx = GqlExecutionContext.create(context)
        const request = ctx.getContext().request
        const Authorization = request.get('Authorization')

        if (Authorization) {
            // TODO: As far as I know we never add 'Bearer ' to the token so this might not be necessary
            const token = Authorization.replace('Bearer ', '')

            // TODO: Add application-wide typing for token content
            const { userId } = this.jwtService.verify(token) as { userId: string }
            return !!userId
        }

        return false
    }

    // TODO: I think this is not needed anymore, can be removed later
    // public handleRequest(err, user) {
    //     // You can throw an exception based on either "info" or "err" arguments
    //     if (err || !user) {
    //         throw err || new UnauthorizedException()
    //     }
    //     return user
    // }
}
