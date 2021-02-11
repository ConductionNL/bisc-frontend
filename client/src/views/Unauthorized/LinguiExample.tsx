import { i18n, I18n } from '@lingui/core'
import { Plural, plural, t, Trans } from '@lingui/macro'
import { withI18n, withI18nProps } from '@lingui/react'
import React from 'react'
import Button from '../../components/Core/Button/Button'

interface Props {}

interface State {
    email: string | null
}

export class TranslationsExample extends React.Component<Props, State> {
    public render() {
        return (
            <div>
                <div>
                    {/* when working inside react, use macro components */}
                    <h1>
                        <Trans id={'TranslationsExamle.title'}>LinguiJS best practises example</Trans>
                    </h1>

                    {/*
                        You can also use components inside the Trans component,
                        this will look like: <0>this is a link test:<1>link</1></0> in the po files
                    */}
                    <Trans id={'TranslationsExamle.text'}>
                        <p>
                            this is a link test:
                            <a style={{ color: 'red' }}>link</a>
                        </p>
                    </Trans>

                    {/*
                        You can also pass values inside the translations
                        this will look like: <0>this is a link test:<1>{0}</1></0> in the po files
                    */}
                    <Trans id={'TranslationsExamle.value'}>
                        <p>
                            there are:
                            <span style={{ color: 'red' }}>{100}</span>
                            bananas
                        </p>
                    </Trans>

                    {/*
                        Using translation strings.
                    */}

                    {/* When you want to pass a translation string you could use */}
                    <I18n>
                        {({ i18n }) => (
                            <Button
                                onPress={() => Alert.alert('marked')}
                                title={i18n._(t('TranslationsExamle.consumed')`mark messages as read`)}
                            />
                        )}
                    </I18n>
                    {/* NOTE: in functional components you can use useLingui */}

                    {/*
                        Another possibility would be wrapping your component or function with a withI18n function
                    */}
                    <ComponentWithTranslations onPress={this.handleSubmit} />

                    {/*
                        When you want to use Plurals in your translations you can use the React component
                    */}
                    <Plural
                        id="TranslationsExamle.plurals"
                        value={1}
                        one={
                            <p>
                                Only <p style={{ fontSize: 20 }}>one</p> user is using this library!
                            </p>
                        }
                        other={
                            <p>
                                <p style={{ fontSize: 20 }}>{1}</p> users are using this library!
                            </p>
                        }
                    />
                </div>
            </div>
        )
    }

    private handleSubmit = () => {
        const oopsiefailed = false
        const name = 'Lifely'
        // when you are outside react and you want to use a string. We should use the i18n onbject

        if (oopsiefailed) {
            NotificationsManager.error(i18n._(t('TranslationsExamle.oopsie')`example-failed`))
            return
        }

        // TODO: this is not working right now, fix this when needed
        toaster.error(
            i18n._(
                plural('TranslationsExamle.noReactPlural', {
                    value: 1,
                    one: `${name} has # friend`,
                    other: `${name} has # friends`,
                })
            )
        )
    }
}

// When you are using oop and you want to use i18n through props you can use it like this
const ComponentWithTranslations = withI18n()(
    class ComponentWithTranslations extends React.Component<{ onPress: () => void } & withI18nProps, State> {
        public render() {
            const { i18n, onPress } = this.props

            return <Button onPress={onPress} title={i18n._(t('TranslationsExamle.withI18n')`component with i18n`)} />
        }
    }
)
