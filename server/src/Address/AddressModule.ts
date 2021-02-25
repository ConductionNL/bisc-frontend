import { Module } from '@nestjs/common'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'
import { AddressRepository } from './AddressRepository'

@Module({
    providers: [AddressRepository],
    exports: [AddressRepository],
    imports: [CCRepository],
})
export class AddressModule {}
