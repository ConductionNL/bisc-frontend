import request = require('request')
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from 'src/config'

@Injectable()
export class CommonGroundLoginService {
    public constructor(private configService: ConfigService<Config>) {}

    public async login(username: string, password: string) {
        const body = JSON.stringify({
            username,
            password,
        })

        const res = await new Promise((resolve, reject) => {
            request(
                'https://taalhuizen-bisc.commonground.nu/api/v1/uc/login',
                {
                    method: 'POST',
                    body,
                    headers: {
                        'content-Type': 'application/json',
                        Authorization: this.configService.get('API_KEY'),
                    },
                },
                async (err, res, body) => {
                    if (err) {
                        reject(err)
                        return
                    }

                    if (res.statusCode === 404) {
                        // 404 is invalid
                        throw new Error(`Invalid credentials`)
                    }
                    resolve(body)
                }
            )
        })

        return res
    }
}
