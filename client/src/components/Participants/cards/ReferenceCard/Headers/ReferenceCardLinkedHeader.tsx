import classNames from 'classnames'
import Button from 'components/Core/Button/Button'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import SectionTitle from 'components/Core/Text/SectionTitle'
import React, { useState } from 'react'
import styles from './ReferenceCard.module.scss'

interface Props {
    MoreInformationComponent?: JSX.Element
}

const ReferenceCardLinkedHeader: React.FunctionComponent<Props> = props => {
    const { MoreInformationComponent } = props
    const containerClassNames = classNames(styles.container)
    const [moreInformationActive, setMoreInformationActive] = useState(false)

    return (
        <div className={containerClassNames}>
            <div className={styles.metaContainer}>
                <div className={styles.statusContainer}>
                    <SectionTitle title={'test'} />
                </div>
                <div className={styles.information}>
                    <SectionTitle title={'test'} />
                </div>
            </div>
            <div className={styles.moreInformation}>
                <Button
                    icon={getMoreInformationIconType()}
                    onClick={() => setMoreInformationActive(!moreInformationActive)}
                />
                <div>{MoreInformationComponent}</div>
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
