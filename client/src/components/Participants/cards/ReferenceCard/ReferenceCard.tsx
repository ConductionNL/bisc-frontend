import classNames from 'classnames'
import Button, { ButtonType } from 'components/Core/Button/Button'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import React from 'react'
import styles from './ReferenceCard.module.scss'

interface Props {
    TopComponent?: JSX.Element
    BottomComponent?: JSX.Element
    readOnly?: boolean
    onClickEdit?: () => void
}

// TODO: Section component should be refactored for this component, the fieldsets ar enot perfectly aligned right now
const ReferenceCard: React.FunctionComponent<Props> = props => {
    const { TopComponent, BottomComponent, readOnly, onClickEdit } = props
    const containerClassNames = classNames(styles.container, { [styles['isReadOnly']]: readOnly })

    return (
        <div className={containerClassNames}>
            {TopComponent && (
                <div className={styles.content}>
                    {!readOnly && (
                        <Button
                            className={styles.editIcon}
                            round={true}
                            type={ButtonType.tertiary}
                            icon={IconType.edit}
                            onClick={onClickEdit}
                        />
                    )}
                    {TopComponent}
                </div>
            )}
            {BottomComponent && <HorizontalRule spacingDisabled={true} />}
            {BottomComponent && (
                <div className={styles.bottom}>
                    {!readOnly && (
                        <Button
                            className={styles.editIcon}
                            round={true}
                            type={ButtonType.tertiary}
                            icon={IconType.edit}
                        />
                    )}
                    {BottomComponent}
                </div>
            )}
        </div>
    )
}

export default ReferenceCard
