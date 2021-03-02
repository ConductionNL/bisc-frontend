import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { OldProgramRepository } from './OldProgramRepository'
import { ProgramRepository } from '../CommonGroundAPI/edu/ProgramRepository'
import { ProgramResolver } from './ProgramResolver'

@Module({
    providers: [OldProgramRepository, ProgramResolver, ProgramRepository],
    exports: [OldProgramRepository, ProgramRepository],
    imports: [CommonGroundAPIModule],
})
export class ProgramModule {}
