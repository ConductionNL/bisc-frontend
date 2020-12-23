import { Module } from '@nestjs/common'
import { CommonGroundAPIService } from './CommonGroundAPIService'
import { CommonGroundLoginService } from './CommonGroundLoginService'

@Module({
    providers: [CommonGroundAPIService, CommonGroundLoginService],
    exports: [CommonGroundAPIService, CommonGroundLoginService],
    imports: [],
})
export class CommonGroundAPIModule {}
