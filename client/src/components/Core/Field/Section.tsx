import classNames from 'classnames'
import React from 'react'
import SectionTitle from '../Text/SectionTitle'
import styles from './Section.module.scss'

interface Props {
    title: string
    className?: string
}

const Section: React.FunctionComponent<Props> = props => {
    const { children, className, title } = props

    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            <div className={styles.titleContainer}>
                <SectionTitle title={title} heading="H4" />
            </div>

            <div className={styles.formContainer}>{children}</div>
        </div>
    )
}

export default Section
