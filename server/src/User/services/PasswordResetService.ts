import { Inject } from '@nestjs/common'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { Config } from 'src/config'
import { Mailer, MailService } from 'src/Mail/MailService'
import { ForgetPasswordMailTemplate } from 'src/Mail/Templates/ForgetPasswordMailTemplate'
import { PasswordChangedMailTemplate } from 'src/Mail/Templates/PasswordChangedMailTemplate'
import { UserEntity } from '../entities/UserEntity'
import { UserRepository } from '../UserRepository'

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
        @Inject(MailService) private mailService: Mailer
    ) {}
    // private passwordHashingService: PasswordHashingService,
    // private forgetPasswordMailTemplate: ForgetPasswordMailTemplate,
    // private passwordChangedMailTemplate: PasswordChangedMailTemplate,
    // @Inject(MailService) private mailService: Mailer

    public async requestPasswordReset(username: string) {
        const user = await this.findUserByUsername(username)
        if (!user) {
            return false
        }

        const passwordResetToken = await this.generatePasswordResetToken(user)

        return this.sendPasswordResetTokenEmail(user, passwordResetToken)
    }

    public async resetPasswordByToken(username: string, passwordResetToken: string, plainTextPassword: string) {
        const user = await this.findUserByUsername(username)
        if (!user) {
            return false
        }

        const tokenPayload = await this.jwtService.verifyAsync<PasswordResetTokenPayload>(passwordResetToken, {
            secret: this.generatePasswordResetTokenSecret(user),
        })

        console.log(`Token userId: ${tokenPayload.userId}`)

        await this.updateUserPassword(user, plainTextPassword)

        return true
    }

    private async findUserByUsername(username: string) {
        const userEdges = await this.userRepository.findUsersByUsername(username)

        if (userEdges.length === 0) {
            this.logger.log(`Password reset was requested for username '${username}' but no user found`)
            return null
        }

        if (userEdges.length > 1) {
            const error = `Password reset was requested for username '${username}' but multiple Users with that username were found`
            this.logger.error(error)
            throw new Error(error)

            // TODO: Maybe log error to Sentry and just return null, instead of throwing here
            // return null
        }

        const user = userEdges.pop().node

        return user
    }

    private generatePasswordResetToken(user: UserEntity) {
        const payload: PasswordResetTokenPayload = {
            userId: user.id,
        }
        const options: JwtSignOptions = {
            secret: this.generatePasswordResetTokenSecret(user),
            expiresIn: '10 minutes',
        }

        return this.jwtService.signAsync(payload, options)
    }

    private generatePasswordResetTokenSecret(user: UserEntity) {
        return this.configService.get('APP_SECRET') + user.dateModified.toString()
    }

    private async sendPasswordResetTokenEmail(user: UserEntity, passwordResetToken: string) {
        // TODO: Use UserEntity emailaddress instead of test email
        const subject = 'Your BiSC Taalhuizen password reset token'

        await this.mailService.send({
            html: this.forgetPasswordMailTemplate.make({
                subject,
                token: passwordResetToken,
                name: user.username,
            }),
            subject,
            to: 'dirk@lifely.nl',
        })

        this.logger.log(`PasswordResetToken for ${user.username}: ${passwordResetToken}`)
    }

    private async updateUserPassword(user: UserEntity, newPlainTextPassword: string) {
        // TODO: Update user password, user dateModified and send email to user

        const subject = 'Your BiSC Taalhuizen password was changed'

        await this.mailService.send({
            html: this.passwordChangedMailTemplate.make({
                subject,
                name: user.username,
            }),
            subject,
            to: 'dirk@lifely.nl',
        })
        return
    }

    // public async resetPasswordByToken(email: string, passwordResetToken: string, plainTextPassword: string) {
    //     const user = await this.userRepository.findByEmailAndPasswordResetToken(email, passwordResetToken)

    //     if (!user) {
    //         this.logger.log(`Trying to reset password for user with email ${email} but no user found`)
    //         return false
    //     }

    //     if (!user.passwordResetRequestedAt) {
    //         this.logger.log(`Trying to reset password for user "${user.id}" but password reset was not requested`)
    //         return false
    //     }

    //     // check if reset was expired, tokens last for 1 hour
    //     const tokenExpiry = 1000 * 60 * 60 // 1 hour
    //     const tokenExpiresAt = user.passwordResetRequestedAt.getTime() + tokenExpiry
    //     const timeNow = new Date().getTime()
    //     if (timeNow >= tokenExpiresAt) {
    //         this.logger.log(`Trying to reset password for user "${user.id}" but password reset token expired`)
    //         return false
    //     }

    //     return this.sequelize.transaction(async () => {
    //         user.passwordResetRequestedAt = null
    //         user.passwordResetToken = null
    //         user.password = await this.passwordHashingService.hash(plainTextPassword)

    //         // this also implicitly verifies the email
    //         user.emailVerificationToken = null
    //         user.emailVerified = true

    //         await this.userRepository.save(user)

    //         const subject = 'Your Alfen password was changed'

    //         await this.mailService.send({
    //             html: this.passwordChangedMailTemplate.make({
    //                 subject,
    //                 name: user.profileInformation.firstName,
    //             }),
    //             subject,
    //             to: user.email,
    //         })

    //         return true
    //     })
    // }

    // private generateSecureRandomToken() {
    //     return crypto.randomBytes(36).toString('hex')
    // }
}
