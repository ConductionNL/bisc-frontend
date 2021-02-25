import { Module } from '@nestjs/common'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'
import { EmailRepository } from './EmailRepository'
import { TelephoneRepository } from './TelephoneRepository'

@Module({
    providers: [EmailRepository, TelephoneRepository],
    exports: [EmailRepository, TelephoneRepository],
    imports: [CCRepository],
})
export class EmailModule {}
