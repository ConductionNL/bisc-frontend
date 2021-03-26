import { ObjectType } from '@nestjs/graphql'
import { TaalhuisUserRoleType } from 'src/Taalhuis/types/TaalhuisUserRoleType'

@ObjectType()
export class AanbiederUserRoleType extends TaalhuisUserRoleType {}
