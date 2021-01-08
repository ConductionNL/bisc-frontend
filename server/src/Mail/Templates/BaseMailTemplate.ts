import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as juice from 'juice'
import { Config } from 'src/config'
import { resolve } from 'url'

interface EmailArgs {
    subject: string
}

@Injectable()
export abstract class BaseMailTemplate<TEmailArgs> {
    private subject!: string

    public constructor(protected configService: ConfigService<Config>) {}

    public make(args: TEmailArgs & EmailArgs): string {
        this.subject = args.subject
        const template = this.baseTemplate(this.render(args))
        return juice(template)
    }

    protected makeUrl(path: string) {
        const baseUrl = this.configService.get('APP_CLIENT_URL')

        if (!baseUrl) {
            throw new Error('No base client url found in config settings')
        }

        return resolve(baseUrl, path)
    }

    protected renderFooter(): string {
        return ''
    }

    protected styles(): string {
        return ''
    }

    protected abstract render(args: TEmailArgs & EmailArgs): string

    protected renderButton(label: string, link: string) {
        return `
            <table class="body-action" align="left" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="left">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                        <td align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td>
                                    <a href="${link}" class="button" target="_blank">${label}</a>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>
            </table>
        `
    }

    protected renderLinkHelp(link: string) {
        return `
            <p class="sub">Mocht de knop hierboven niet werken, gebruikt dan de link hieronder.<br/><a href="${link}">${link}</a></p>
        `
    }

    private baseTemplate(template: string): string {
        const footerText = this.renderFooter()
        const hasFooter = !!footerText

        return `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <title>${this.subject}</title>

                    <link href="https://fonts.googleapis.com/css?family=Barlow:400,600" rel="stylesheet" type="text/css" />

                    <style type="text/css" rel="stylesheet" media="all">
                        /* Base ------------------------------ */

                        *:not(br):not(tr):not(html) {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
                                sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                            box-sizing: border-box;
                        }

                        body {
                            width: 100% !important;
                            height: 100%;
                            margin: 0;
                            mso-line-height-rule: exactly;
                            line-height: 1.4;
                            background-color: #ffffff;
                            color: #74787e;
                            -webkit-text-size-adjust: none;
                        }

                        p,
                        ul,
                        ol,
                        blockquote {
                            mso-line-height-rule: exactly;
                            line-height: 1.4;
                            text-align: left;
                        }

                        a {
                            color: #1d55ff;
                            text-decoration: none;
                        }

                        a:hover {
                            text-decoration: underline;
                        }

                        p a {
                            text-decoration: underline;
                        }

                        a img {
                            border: none;
                        }

                        td {
                            word-break: break-word;
                        }
                        /* Layout ------------------------------ */

                        .header {
                            background: #1d55ff;
                            width: 100%;
                            height: 236px;
                            background-repeat: no-repeat;
                            background-position: center;
                        }

                        .header-cell {
                            padding: 16px 24px;
                        }

                        .email-wrapper {
                            width: 100%;
                            margin: 0;
                            padding: 0;
                            -premailer-width: 100%;
                            -premailer-cellpadding: 0;
                            -premailer-cellspacing: 0;
                            background-color: #ffffff;
                        }

                        .email-content {
                            width: 100%;
                            margin: 0;
                            padding: 0;
                            -premailer-width: 100%;
                            -premailer-cellpadding: 0;
                            -premailer-cellspacing: 0;
                        }
                        /* Masthead ----------------------- */

                        .email-masthead {
                            padding: 25px 0;
                            text-align: center;
                        }

                        .email-masthead_logo {
                            width: 94px;
                        }

                        .email-masthead_name {
                            font-size: 16px;
                            font-weight: 600;
                            color: #bbbfc3;
                            text-decoration: none;
                            text-shadow: 0 1px 0 white;
                        }
                        /* Body ------------------------------ */

                        .email-body {
                            width: 100%;
                            margin: 0;
                            padding: 0;
                            -premailer-width: 100%;
                            -premailer-cellpadding: 0;
                            -premailer-cellspacing: 0;
                            background: none;
                        }

                        .email-body_inner {
                            width: 640px;
                            margin: 0 auto;
                            padding: 0;
                            -premailer-width: 570px;
                            -premailer-cellpadding: 0;
                            -premailer-cellspacing: 0;
                            background-color: #ffffff;
                        }

                        .email-footer {
                            width: 640px;
                            margin: 0 auto;
                            padding: 0;
                            -premailer-width: 570px;
                            -premailer-cellpadding: 0;
                            -premailer-cellspacing: 0;
                            text-align: center;
                        }

                        .email-footer p {
                            color: #aeaeae;
                        }

                        .body-action {
                            width: 100%;
                            margin: 40px auto;
                            padding: 0;
                            -premailer-width: 100%;
                            -premailer-cellpadding: 0;
                            -premailer-cellspacing: 0;
                            text-align: center;
                        }

                        .body-sub {
                            margin-top: 25px;
                            padding-top: 25px;
                            border-top: 1px solid #edeff2;
                        }

                        .content-cell {
                            padding: 36px 16px;
                        }

                        .preheader {
                            display: none !important;
                            visibility: hidden;
                            mso-hide: all;
                            font-size: 1px;
                            mso-line-height-rule: exactly;
                            line-height: 1px;
                            max-height: 0;
                            max-width: 0;
                            opacity: 0;
                            overflow: hidden;
                        }
                        /* Attribute list ------------------------------ */

                        .attributes {
                            margin: 0 0 21px;
                        }

                        .attributes_content {
                            background-color: #edeff2;
                            padding: 16px;
                        }

                        .attributes_item {
                            padding: 0;
                        }
                        /* Related Items ------------------------------ */

                        .related {
                            width: 100%;
                            margin: 0;
                            padding: 25px 0 0 0;
                            -premailer-width: 100%;
                            -premailer-cellpadding: 0;
                            -premailer-cellspacing: 0;
                        }

                        .related_item {
                            padding: 10px 0;
                            color: #74787e;
                            font-size: 15px;
                            mso-line-height-rule: exactly;
                            line-height: 18px;
                        }

                        .related_item-title {
                            display: block;
                            margin: 0.5em 0 0;
                        }

                        .related_item-thumb {
                            display: block;
                            padding-bottom: 10px;
                        }

                        .related_heading {
                            border-top: 1px solid #edeff2;
                            text-align: center;
                            padding: 25px 0 10px;
                        }

                        /* Utilities ------------------------------ */

                        .no-margin {
                            margin: 0;
                        }

                        .margin-top {
                            margin-top: 8px;
                        }

                        .align-right {
                            text-align: right;
                        }

                        .align-left {
                            text-align: left;
                        }

                        .align-center {
                            text-align: center;
                        }
                        /*Media Queries ------------------------------ */

                        @media only screen and (max-width: 600px) {
                            .email-body_inner,
                            .email-footer {
                                width: 100% !important;
                            }
                        }

                        @media only screen and (max-width: 500px) {
                            .button {
                                width: 100% !important;
                            }
                        }

                        /* Cards ------------------------------ */
                        .card {
                            background-color: #fff;
                            border-top: 1px solid #e0e1e5;
                            border-right: 1px solid #e0e1e5;
                            border-bottom: 1px solid #e0e1e5;
                            border-left: 1px solid #e0e1e5;
                            padding: 24px;
                            display: inline-block;
                            color: #39393a;
                            text-decoration: none;
                            width: 100%;
                            border-radius: 3px;
                            box-shadow: 0 4px 3px -3px rgba(0, 0, 0, 0.08);
                            -webkit-text-size-adjust: none;
                            mso-line-height-rule: exactly;
                            line-height: 1.75;
                            letter-spacing: 0.8px;
                        }

                        /* Buttons ------------------------------ */

                        .button {
                            background-color: #1db4ed;
                            border-top: 10px solid #1db4ed;
                            border-right: 18px solid #1db4ed;
                            border-bottom: 10px solid #1db4ed;
                            border-left: 18px solid #1db4ed;
                            display: inline-block;
                            color: #fff;
                            text-decoration: none;
                            border-radius: 4px;
                            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
                            -webkit-text-size-adjust: none;
                            mso-line-height-rule: exactly;
                            width: 100%;
                            text-align: center;
                            font-size: 14px;
                            font-weight: 600;
                        }

                        .button--purple {
                            background-color: #7c31f2;
                            border-top: 10px solid #7c31f2;
                            border-right: 18px solid #7c31f2;
                            border-bottom: 10px solid #7c31f2;
                            border-left: 18px solid #7c31f2;
                        }

                        .button--red {
                            background-color: #ff6136;
                            border-top: 10px solid #ff6136;
                            border-right: 18px solid #ff6136;
                            border-bottom: 10px solid #ff6136;
                            border-left: 18px solid #ff6136;
                        }

                        .small-logo {
                            width: 24px;
                            height: 24px;
                        }

                        .inline {
                            display: inline;
                        }
                        /* Type ------------------------------ */

                        p {
                            margin: 0;
                            color: #39393a;
                            font-size: 15px;
                            mso-line-height-rule: exactly;
                            letter-spacing: normal;
                            text-align: left;
                            line-height: 20px;
                        }

                        p + p {
                            margin-top: 20px;
                        }

                        p.suffix {
                            font-size: 14px;
                        }

                        p.sub {
                            font-size: 12px;
                        }

                        p.center {
                            text-align: center;
                        }

                        .subtle {
                            color: #b1b1b1;
                        }

                        /* Footer ------------------------------ */

                        .logo-label {
                            vertical-align: top;
                            font-size: 14px;
                            margin-left: 4px;
                        }

                        .footer-cell {
                            padding: 8px 24px;
                        }

                        .footer-nav {
                            margin-left: 8px;
                            font-size: 14px;
                            color: #39393a;
                            text-decoration: none;
                        }

                        .header-link {
                            text-decoration: none;
                            font-size: 14px;
                            color: #1d55ff;
                            font-weight: 500;
                        }

                        .margin-top {
                            margin-top: 16px;
                        }

                        .logo-container {
                            width: 100%;
                            margin-bottom: 56px;
                        }

                        .alfen-logo {
                            display: block;
                            margin: 0 auto;
                        }

                        /* Custom styles ------------------------------ */
                        ${this.styles()}
                    </style>
                </head>
                <body>
                    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td align="center">
                                <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="email-masthead"></td>
                                    </tr>
                                    <!-- Email Body -->
                                    <tr>
                                        <td class="email-body" width="100%" cellpadding="0" cellspacing="0">
                                            <table
                                                class="email-body_inner"
                                                align="center"
                                                width="100%"
                                                background-color="#edeff2"
                                                cellpadding="0"
                                                cellspacing="0"
                                            >
                                                <!-- Body content -->
                                                <tr>
                                                    </tr>
                                                    <tr>
                                                    <td class="content-cell"  width="100%">
                                                        <div class="logo-container">
                                                            <img class="alfen-logo" src="https://i.imgur.com/98pSPgA.png" alt="img" />
                                                        </div>
                                                        ${template}
                                                    </td>
                                                </tr>
                                                <tr>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ${
                                        hasFooter
                                            ? `
                                                <tr>
                                                    <td>
                                                        <table class="email-footer" align="center" width="640" cellpadding="0" cellspacing="0">
                                                            <tr>
                                                                <td class="content-cell" align="center">
                                                                    ${footerText}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            `
                                            : ''
                                    }
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
        `
    }
}
