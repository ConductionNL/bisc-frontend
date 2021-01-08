import { Injectable } from '@nestjs/common'
import { BaseMailTemplate } from 'src/Mail/Templates/BaseMailTemplate'

interface EmailArgs {
    name: string
    token: string
}

@Injectable()
export class ForgetPasswordMailTemplate extends BaseMailTemplate<EmailArgs> {
    protected render(args: EmailArgs): string {
        return `
            <p>Dear ${args.name ? args.name : ''},</p>
            <p>Please reset your password by clicking the button underneath.</p>
            ${this.renderButton('Reset password', this.makeUrl(`/reset-password/${args.token}`))}
        `
    }
}
