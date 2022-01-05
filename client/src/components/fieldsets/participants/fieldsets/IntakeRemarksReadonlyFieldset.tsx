import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'

import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import styles from './RefererInformationFieldset.module.scss'
import Paragraph from 'components/Core/Typography/Paragraph'
import { Maybe } from 'api/types/types'

import nl2br from 'react-nl2br'

interface Props {
    prefillData?: IntakeRemarksData
    className?: string
}

export interface IntakeRemarksData {
    'intake.remarks'?: Maybe<string>
}

export const IntakeRemarksReadonlyFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, className } = props
    const { i18n } = useLingui()
    const containerClassName = classNames(styles, className)

    return (
        <Section className={containerClassName} title={i18n._(t`Toelichting`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Notitie`)} horizontal={true}>
                    <Paragraph>
                        <p>{nl2br(prefillData?.['intake.remarks'])}</p>
                    </Paragraph>
                </Field>
            </Column>
        </Section>
    )
}
