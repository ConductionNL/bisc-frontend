import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Paragraph from 'components/Core/Typography/Paragraph'
import styles from './PermissionsFieldset.module.scss'

export interface PermissionFieldsetModel {
    registeringParty: string | null
    registratorLastName: string | null
    registratorAddition?: string | null
    registratorNickName: string | null
    registratorEmail: string | null
    registratorPhone: string | null
}

const PermissionFieldset: React.FunctionComponent = () => {
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Toestemmingen`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Toestemmingen`)} horizontal={true}>
                    <Row>
                        <Checkbox name={'permission'} />
                        <Paragraph className={styles.permissions}>
                            {i18n._(t`Ik ga akkoord met de voorwaarden`)}
                        </Paragraph>
                    </Row>
                </Field>
            </Column>
        </Section>
    )
}

export default PermissionFieldset
