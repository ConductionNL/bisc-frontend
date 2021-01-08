import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { AuthResolver } from './AuthResolver'
import { AuthService } from './AuthService'
import { PasswordResetResolver } from './PasswordResetResolver'
import { PasswordResetService } from './services/PasswordResetService'
import { UserRepository } from './UserRepository'

@Module({
    providers: [UserRepository, AuthResolver, AuthService, PasswordResetService, PasswordResetResolver],
    exports: [UserRepository, AuthService],
    imports: [CommonGroundAPIModule],
})
export class UserModule {}
