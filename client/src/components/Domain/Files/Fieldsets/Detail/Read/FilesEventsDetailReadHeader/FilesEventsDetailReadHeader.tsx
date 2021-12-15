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
import { ContactType } from 'api/types/types'

interface Props {
    type: ContactType
    metaData: MetaData
}

interface MetaData {
    date: string
    name: string
}

export const FilesEventsDetailReadHeader: React.FC<Props> = ({ type, metaData }) => {
    const { i18n } = useLingui()
    const { showReadOnly, environment } = useContext(FilesEventsFieldsetContextState)

    const containerClassNames = classNames(styles.headerContainer, {
        [styles.finalInterview]: type === ContactType.FinalTalk,
        [styles.comment]: type === ContactType.Remark,
        [styles.followUp]: type === ContactType.FollowUp,
        [styles.storytelling]: type === ContactType.StoryTelling,
        [styles.intake]: type === ContactType.Intake,
        [styles.default]: !type,
    })

    const EventDetailTypesTranslations = {
        [ContactType.FinalTalk]: i18n._(t`Eindgesprek`),
        [ContactType.Remark]: i18n._(t`Opmerking`),
        [ContactType.FollowUp]: i18n._(t`Vervolggesprek`),
        [ContactType.StoryTelling]: i18n._(t`Informatie voor storytelling`),
        [ContactType.Intake]: i18n._(t`Intake`),
    }

    return (
        <div className={containerClassNames}>
            <div className={styles.titleContainer}>
                <SectionTitle title={EventDetailTypesTranslations[type as ContactType]} />
                <Paragraph subtle={true} className={styles.subtitle}>{`${metaData.date} • ${
                    metaData.name || ''
                }`}</Paragraph>
            </div>
            {renderEditButton()}
        </div>
    )

    function renderEditButton() {
        if (environment === 'aanbieder') {
            return null
        }

        return (
            <Button
                className={styles.editIcon}
                round={true}
                type={ButtonType.tertiary}
                icon={IconType.edit}
                onClick={() => showReadOnly(false)}
            />
        )
    }
}
