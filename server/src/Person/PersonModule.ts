import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { PersonRepository } from '../CommonGroundAPI/cc/PersonRepository'
import { PersonResolver } from './PersonResolver'

@Module({
    providers: [PersonRepository, PersonResolver],
    exports: [PersonRepository],
    imports: [CommonGroundAPIModule],
})
export class PersonModule {}
