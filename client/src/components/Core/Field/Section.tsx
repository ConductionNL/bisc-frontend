import classNames from 'classnames'
import React from 'react'
import SectionTitle from '../Text/SectionTitle'
import Paragraph from '../Typography/Paragraph'
import styles from './Section.module.scss'
import { SectionTitleWithBorder, SectionTitleWithBorderProps } from './SectionTitleWithBorder'

interface Props extends SectionTitleWithBorderProps {
    className?: string
}

const Section: React.FunctionComponent<Props> = props => {
    const { children, className, title, description } = props

    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            <SectionTitleWithBorder title={title} description={description} />

            <div className={styles.formContainer}>{children}</div>
        </div>
    )
}

export default Section
