import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { AuthResolver } from './AuthResolver'
import { AuthService } from './AuthService'
import { UserRepository } from './UserRepository'

@Module({
    providers: [UserRepository, AuthResolver, AuthService],
    exports: [UserRepository, AuthService],
    imports: [CommonGroundAPIModule],
})
export class UserModule {}
