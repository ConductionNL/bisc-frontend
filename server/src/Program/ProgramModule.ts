import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { ProgramRepository } from './ProgramRepository'
import { ProgramResolver } from './ProgramResolver'

@Module({
    providers: [ProgramRepository, ProgramResolver],
    exports: [ProgramRepository],
    imports: [CommonGroundAPIModule],
})
export class ProgramModule {}
