import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import classNames from 'classnames'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import SectionTitle from 'components/Core/Text/SectionTitle'
import React, { useState } from 'react'
import styles from './ReferenceCardLinkedHeader.module.scss'

interface Props {
    StatusComponent: JSX.Element
    InformationComponent: JSX.Element
    MoreInformationComponent?: JSX.Element
}

const ReferenceCardLinkedHeader: React.FunctionComponent<Props> = props => {
    const { MoreInformationComponent, StatusComponent, InformationComponent } = props
    const containerClassNames = classNames(styles.container)
    const [moreInformationActive, setMoreInformationActive] = useState(false)

    return (
        <div className={containerClassNames}>
            <div className={styles.metaContainer}>
                <div className={styles.statusContainer}>{StatusComponent}</div>
                <div className={styles.information}>{InformationComponent}</div>
            </div>
            <div className={styles.moreInformation}>
                <Button
                    icon={getMoreInformationIconType()}
                    onClick={() => setMoreInformationActive(!moreInformationActive)}
                    type={ButtonType.quaternary}
                >
                    {i18n._(t`Toon alle informatie`)}
                </Button>
                {MoreInformationComponent && (
                    <div className={styles.moreInformationContent}>{MoreInformationComponent}</div>
                )}
            </div>
        </div>
    )

    function getMoreInformationIconType() {
        if (moreInformationActive) {
            return IconType.arrowUp
        }
        return IconType.arrowDown
    }
}

export default ReferenceCardLinkedHeader
