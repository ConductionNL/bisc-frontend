import { Inject } from '@nestjs/common'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { isEmail } from 'class-validator'
import { Config } from 'src/config'
import { Mailer, MailService } from 'src/Mail/MailService'
import { ForgetPasswordMailTemplate } from 'src/Mail/Templates/ForgetPasswordMailTemplate'
import { PasswordChangedMailTemplate } from 'src/Mail/Templates/PasswordChangedMailTemplate'
import { UserEntity, UserEnvironment } from '../entities/UserEntity'
import { UserRepository } from '../UserRepository'
import { PasswordHashingService } from './PasswordHashingService'

type PasswordResetTokenPayload = {
    userId: string
}

@Injectable()
export class PasswordResetService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private configService: ConfigService<Config>,
        private forgetPasswordMailTemplate: ForgetPasswordMailTemplate,
        private passwordChangedMailTemplate: PasswordChangedMailTemplate,
        private passwordHashingService: PasswordHashingService,
        @Inject(MailService) private mailService: Mailer
    ) {}

    public async requestPasswordReset(username: string) {
        const user = await this.userRepository.findUserByUsername(username)
        if (!user) {
            this.logger.log(`Password reset was requested by ${username} but no user found`)
            return false
        }

        const passwordResetToken = await this.generatePasswordResetToken(user)

        await this.sendPasswordResetTokenEmail(user, passwordResetToken)

        return true
    }

    public async resetPasswordByToken(username: string, passwordResetToken: string, plainTextPassword: string) {
        const user = await this.userRepository.findUserByUsername(username)
        if (!user) {
            this.logger.log(`Trying to reset password for user with email ${username} but no user found`)
            return false
        }

        // This will throw when verification fails
        await this.jwtService.verifyAsync<PasswordResetTokenPayload>(passwordResetToken, {
            secret: this.generatePasswordResetTokenSecret(user),
        })

        await this.updateUserPassword(user, plainTextPassword)

        return true
    }

    private generatePasswordResetToken(user: UserEntity) {
        const payload: PasswordResetTokenPayload = {
            userId: user.id,
        }
        const options: JwtSignOptions = {
            secret: this.generatePasswordResetTokenSecret(user),
            expiresIn: '4 hours',
        }

        return this.jwtService.signAsync(payload, options)
    }

    private generatePasswordResetTokenSecret(user: UserEntity) {
        return this.configService.get('APP_SECRET') + user.dateModified.toString()
    }

    private async sendPasswordResetTokenEmail(user: UserEntity, passwordResetToken: string) {
        // Sanity check
        if (!user.username || !isEmail(user.username)) {
            throw new Error(`Username value of User ${user.id} is not an emailaddress: "${user.username}"`)
        }

        await this.mailService.send({
            html: this.forgetPasswordMailTemplate.make({
                subject: this.forgetPasswordMailTemplate.getSubject(),
                name: user.username,
                username: user.username,
                environment: UserEnvironment.BISC,
                token: passwordResetToken,
            }),
            subject: this.forgetPasswordMailTemplate.getSubject(),
            to: user.username,
        })
    }

    private async updateUserPassword(user: UserEntity, newPlainTextPassword: string) {
        // Sanity check
        if (!user.username || !isEmail(user.username)) {
            throw new Error(`Username value of User ${user.id} is not an emailaddress: "${user.username}"`)
        }

        const newPasswordHash = await this.passwordHashingService.hash(newPlainTextPassword)

        await this.userRepository.updateUserPassword(user.id, newPasswordHash)

        await this.mailService.send({
            html: this.passwordChangedMailTemplate.make({
                subject: this.passwordChangedMailTemplate.getSubject(),
                name: user.username,
            }),
            subject: this.passwordChangedMailTemplate.getSubject(),
            to: user.username,
        })
    }
}
