

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import LabelTag, { LabelColor } from '../../Core/DataDisplay/LabelTag/LabelTag'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {}

const AccountInformationFieldset: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    
    return (
        <Section title={i18n._(t`Accountgegevens`)}>
            <Column spacing={6}>
                <Field label={i18n._(t`Email`)} horizontal={true}>
                    <Input name="email" placeholder={i18n._(t`naam@aanbieder.nl`)} />
                </Field>
                <Field label={i18n._(t`Rol`)} horizontal={true}>
                    <Column spacing={3}>
                        <Row>
                            <RadioButton name={'role'} />
                            <LabelTag color={LabelColor.red} label={i18n._(t`Coördinator`)} />
                        </Row>
                        <Row>
                            <RadioButton name={'role'} />
                            <LabelTag color={LabelColor.purple} label={i18n._(t`Begeleider`)} />
                        </Row>
                        <Row>
                            <RadioButton name={'role'} />
                            <Row spacing={1}>
                                <LabelTag color={LabelColor.red} label={i18n._(t`Coördinator`)} />
                                <LabelTag color={LabelColor.purple} label={i18n._(t`Begeleider`)} />
                            </Row>
                        </Row>
                        <Row>
                            <RadioButton name={'role'} />
                            <LabelTag color={LabelColor.yellow} label={i18n._(t`Vrijwilliger`)} />
                        </Row>
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default AccountInformationFieldset
