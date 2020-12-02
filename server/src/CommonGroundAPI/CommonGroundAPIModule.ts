import { Module } from '@nestjs/common'
import { CommonGroundAPIService } from './CommonGroundAPIService'

@Module({
    providers: [CommonGroundAPIService],
    exports: [CommonGroundAPIService],
    imports: [],
})
export class CommonGroundAPIModule {}
