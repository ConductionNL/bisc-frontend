import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { PersonRepository } from './PersonRepository'
import { PersonResolver } from './PersonResolver'

@Module({
    providers: [PersonRepository, PersonResolver],
    exports: [PersonRepository],
    imports: [CommonGroundAPIModule],
})
export class PersonModule {}
