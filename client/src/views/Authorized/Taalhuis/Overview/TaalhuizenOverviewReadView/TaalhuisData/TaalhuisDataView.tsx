import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import Field from '../../../../../../components/Core/Field/Field'
import Section from '../../../../../../components/Core/Field/Section'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import Paragraph from '../../../../../../components/Core/Typography/Paragraph'
import { routes } from '../../../../../../routes'

interface Props {}

const TaalhuisDataView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()

    return (
        <div style={{ height: '100%' }}>
            <Section title={i18n._(t`Vestiging`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Naam Taalhuis`)} horizontal={true}>
                        <Paragraph>{i18n._(t`Naam Taalhuis`)}</Paragraph>
                    </Field>

                    <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                        <Paragraph>{i18n._(t`Straat`)}</Paragraph>
                    </Field>

                    <Field label={i18n._(t`Postcode`)} horizontal={true}>
                        <Paragraph>{i18n._(t`Postcode`)}</Paragraph>
                    </Field>

                    <Field label={i18n._(t`Plaats`)} horizontal={true}>
                        <Paragraph>{i18n._(t`Plaats`)}</Paragraph>
                    </Field>
                </Column>
            </Section>

            <HorizontalRule />

            <Section title={i18n._(t`Contactgegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                        <Paragraph>{i18n._(t`030 - 123 45 67`)}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                        <Paragraph>{i18n._(t`taalhuis@email.nl`)}</Paragraph>
                    </Field>
                </Column>
            </Section>

            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.primary}
                            onClick={() => history.push(routes.authorized.taalhuis.update)}
                        >
                            {i18n._(t`Bewerken`)}
                        </Button>
                    </Row>
                }
            />
        </div>
    )
}

export default TaalhuisDataView
