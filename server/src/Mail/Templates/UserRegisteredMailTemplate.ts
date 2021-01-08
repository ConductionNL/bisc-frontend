import { BaseMailTemplate } from 'src/Mail/Templates/BaseMailTemplate'

interface EmailArgs {
    name: string
    token: string
}

export class UserRegisteredMailTemplate extends BaseMailTemplate<EmailArgs> {
    protected render(args: EmailArgs): string {
        return `
            <p>Dear ${args.name},</p>
            <p>
                Please verify your account.<br/>
                When you complete the verification you will be redirected to the Alfen app to login with your Alfen verified account.
            </p>
            ${this.renderButton('Verify', this.makeUrl(`/verify-account/${args.token}`))}
        `
    }
}
