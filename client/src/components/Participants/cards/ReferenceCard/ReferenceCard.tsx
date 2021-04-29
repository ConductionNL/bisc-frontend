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
    onClickEditTopComponent?: () => void
    onClickEditBottomComponent?: () => void
}

// TODO: Section component should be refactored for this component, the fieldsets ar enot perfectly aligned right now
const ReferenceCard: React.FunctionComponent<Props> = props => {
    const { TopComponent, BottomComponent, readOnly, onClickEditTopComponent, onClickEditBottomComponent } = props
    const containerClassNames = classNames(styles.container, { [styles['isReadOnly']]: readOnly })

    return (
        <div className={containerClassNames}>
            {TopComponent && (
                <div className={styles.content}>
                    {!readOnly && onClickEditTopComponent && (
                        <Button
                            className={styles.editIcon}
                            round={true}
                            type={ButtonType.tertiary}
                            icon={IconType.edit}
                            onClick={onClickEditTopComponent}
                        />
                    )}
                    {TopComponent}
                </div>
            )}
            {BottomComponent && <HorizontalRule spacingDisabled={true} />}
            {BottomComponent && (
                <div className={styles.bottom}>
                    {!readOnly && onClickEditBottomComponent && (
                        <Button
                            className={styles.editIcon}
                            round={true}
                            type={ButtonType.tertiary}
                            icon={IconType.edit}
                            onClick={onClickEditBottomComponent}
                        />
                    )}
                    {BottomComponent}
                </div>
            )}
        </div>
    )
}

export default ReferenceCard
