import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { MailModule } from 'src/Mail/MailModule'
import { AuthResolver } from './AuthResolver'
import { AuthService } from './AuthService'
import { PasswordResetResolver } from './PasswordResetResolver'
import { PasswordHashingService } from './services/PasswordHashingService'
import { PasswordResetService } from './services/PasswordResetService'
import { UserRepository } from './UserRepository'

@Module({
    providers: [
        UserRepository,
        AuthResolver,
        AuthService,
        PasswordResetService,
        PasswordResetResolver,
        PasswordHashingService,
    ],
    exports: [UserRepository, AuthService],
    imports: [CommonGroundAPIModule, MailModule],
})
export class UserModule {}
