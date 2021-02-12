import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { I18nLoaderContext } from './context'
import { Languages } from './types'
import 'intl'
import 'intl/locale-data/jsonp/en'
import 'intl/locale-data/jsonp/nl'

interface Props {}

async function dynamicActivate(locale: string) {
    const { messages } = await import(`./../../../locales/${locale}/messages`)
    i18n.load(locale, messages)
    i18n.activate(locale)
}

export const I18nLoader: FunctionComponent<Props> = props => {
    const { children } = props
    const [language, setLanguage] = useState(Languages.en)

    useEffect(() => {
        dynamicActivate('en')
    }, [])

    const handleLanguageSwitch = (language: Languages) => {
        setLanguage(language)
        dynamicActivate(language)
    }

    return (
        <I18nProvider i18n={i18n}>
            <I18nLoaderContext.Provider
                value={{
                    language,
                    toggleLanguage: handleLanguageSwitch,
                }}
            >
                {children}
            </I18nLoaderContext.Provider>
        </I18nProvider>
    )
}
