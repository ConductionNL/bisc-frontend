import React, { useContext } from 'react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import styles from './FilesEventsDetailReadHeader.module.scss'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { FilesEventsFieldsetContextState } from '../../../Context/FilesEventsFieldsetContextState'
import classNames from 'classnames'
import { StudentDossierEventEnum } from 'temp/TEMPORARYgraphql'

interface Props {
    type: StudentDossierEventEnum
    metaData: MetaData
}

interface MetaData {
    date: string
    name: string
}

export const FilesEventsDetailReadHeader: React.FC<Props> = ({ type, metaData }) => {
    const { i18n } = useLingui()
    const { showReadOnly } = useContext(FilesEventsFieldsetContextState)

    const containerClassNames = classNames(styles.headerContainer, {
        [styles.finalInterview]: type === StudentDossierEventEnum.FINAL_TALK,
        [styles.comment]: type === StudentDossierEventEnum.REMARK,
        [styles.followUp]: type === StudentDossierEventEnum.FOLLOW_UP_TALK,
        [styles.storytelling]: type === StudentDossierEventEnum.INFO_FOR_STORYTELLING,
        [styles.intake]: type === StudentDossierEventEnum.INTAKE,
        [styles.default]: !type,
    })

    const EventDetailTypesTranslations = {
        [StudentDossierEventEnum.FINAL_TALK]: i18n._(t`Eindgesprek`),
        [StudentDossierEventEnum.REMARK]: i18n._(t`Opmerking`),
        [StudentDossierEventEnum.FOLLOW_UP_TALK]: i18n._(t`Vervolggesprek`),
        [StudentDossierEventEnum.INFO_FOR_STORYTELLING]: i18n._(t`Informatie voor storytelling`),
        [StudentDossierEventEnum.INTAKE]: i18n._(t`Intake`),
    }

    return (
        <div className={containerClassNames}>
            <div className={styles.titleContainer}>
                <SectionTitle title={EventDetailTypesTranslations[type]} />
                <Paragraph className={styles.subtitle}>{`${metaData.date} • ${metaData.name}`}</Paragraph>
            </div>
            <Button
                className={styles.editIcon}
                round={true}
                type={ButtonType.tertiary}
                icon={IconType.edit}
                onClick={() => showReadOnly(false)}
            />
        </div>
    )
}
