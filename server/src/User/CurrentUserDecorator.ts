import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ContextUser } from './entities/UserEntity'

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const user = ctx.getContext()?.req?.user

    if (user) {
        return user as ContextUser
    }

    throw new Error(`Can't get user from context`)
})
