import request = require('request')
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from 'src/config'

interface loginReturnType {
    username: string
    userId: number
    res: { valid: boolean; body: string }
}

@Injectable()
export class CommonGroundLoginService {
    public constructor(private configService: ConfigService<Config>) {}

    public async login(username: string, password: string): Promise<loginReturnType> {
        const body = JSON.stringify({
            username,
            password,
        })

        const res: { valid: boolean; body: string } = await new Promise(resolve => {
            return request(
                'https://taalhuizen-bisc.commonground.nu/api/v1/uc/login',
                {
                    method: 'POST',
                    body,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: this.configService.get('API_KEY'),
                    },
                },
                async (err, res) => {
                    console.log(res.statusCode)
                    console.log(res.body)
                    console.log(body)

                    // if (err) {
                    //     reject(err)
                    //     return
                    // }

                    if (res.statusCode === 404) {
                        // 404 means invalid
                        resolve({ valid: true, body: res.body })
                    }
                    resolve({ valid: true, body: res.body })
                }
            )
        })

        return {
            username,
            userId: 0,
            res,
        }
    }
}
