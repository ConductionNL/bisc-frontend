import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import classNames from 'classnames'
import Icon from 'components/Core/Icon/Icon'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Link from 'components/Core/Link/Link'
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
            <div className={styles.moreInformation}>{renderMoreInformation()}</div>
        </div>
    )

    function renderMoreInformation() {
        if (!MoreInformationComponent) {
            return null
        }

        return (
            <>
                {moreInformationActive && (
                    <div className={styles.moreInformationContentContaier}>
                        <div className={styles.moreInformationContent}>{MoreInformationComponent}</div>
                    </div>
                )}
                <Link
                    className={styles.moreInformationLink}
                    onClick={() => setMoreInformationActive(!moreInformationActive)}
                >
                    <Row spacing={2}>
                        <span>{i18n._(t`Toon alle informatie`)}</span>
                        <Icon type={getMoreInformationIconType()} />
                    </Row>
                </Link>
            </>
        )
    }

    function getMoreInformationIconType() {
        if (moreInformationActive) {
            return IconType.arrowUp
        }
        return IconType.arrowDown
    }
}

export default ReferenceCardLinkedHeader
