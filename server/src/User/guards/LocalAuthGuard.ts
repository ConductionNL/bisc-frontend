import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

// used for public stuff, like login
// can be used to verify an API key or whatever
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
