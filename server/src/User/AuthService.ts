import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CommonGroundLoginService } from 'src/CommonGroundAPI/CommonGroundLoginService'

@Injectable()
export class AuthService {
    public constructor(private jwtService: JwtService, private commonGroundLoginService: CommonGroundLoginService) {}

    public async login(username: string, password: string): Promise<{ accessToken: string }> {
        const login = await this.commonGroundLoginService.login(username, password)

        if (!login) {
            throw new Error(`Unauthorized`)
        }

        return { accessToken: this.jwtService.sign(login) }
    }
}
