import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { AuthResolver } from './AuthResolver'
import { UserRepository } from './UserRepository'

@Module({
    providers: [UserRepository, AuthResolver],
    exports: [UserRepository],
    imports: [CommonGroundAPIModule],
})
export class UserModule {}
