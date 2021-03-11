import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { AanbiederEmployeeResolver } from './AanbiederEmployeeResolver'
import { AanbiederEmployeeService } from './AanbiederEmployeeService'
import { AanbiederResolver } from './AanbiederResolver'
import { CreateAanbiederService } from './CreateAanbiederService'
import { DeleteAanbiederService } from './DeleteAanbiederService'
import { UpdateAanbiederService } from './UpdateAanbiederService'

@Module({
    imports: [CommonGroundAPIModule],
    providers: [
        AanbiederResolver,
        CreateAanbiederService,
        DeleteAanbiederService,
        UpdateAanbiederService,
        AanbiederEmployeeResolver,
        AanbiederEmployeeService,
    ],
})
export class AanbiederModule {}
