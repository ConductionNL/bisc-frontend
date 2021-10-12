import React from 'react'
import classNames from 'classnames'
import styles from './CourseCard.module.scss'
import Row from '../Layout/Row/Row'
import Paragraph from '../Typography/Paragraph'

interface Props {
    className?: string
    course: string
    chapter: string
}

const CourseCard: React.FunctionComponent<Props> = props => {
    const { className, course, chapter } = props
    const containerClassName = classNames(styles.container, className)

    return (
        <div className={containerClassName}>
            <Row>
                <Paragraph bold={true}>{course}</Paragraph>
                <Paragraph bold={true} small={true}>
                    {chapter}
                </Paragraph>
            </Row>
        </div>
    )
}

export default CourseCard
