import React from 'react'
import classNames from 'classnames'
import styles from './CourseCard.module.scss'
import Row from '../Layout/Row/Row'
import Paragraph from '../Typography/Paragraph'
import Spinner from '../Feedback/Spinner/Spinner'

interface Props {
    className?: string
    course: string
    chapter: string
    isLoading?: boolean
}

const CourseCard: React.FunctionComponent<Props> = props => {
    const { className, course, chapter, isLoading } = props
    const containerClassName = classNames(styles.container, className)

    return (
        <div className={containerClassName}>
            <Row>
                {isLoading && <Spinner small={true} />}
                <Paragraph bold={true}>{course}</Paragraph>
                <Paragraph bold={true} small={true}>
                    {chapter}
                </Paragraph>
            </Row>
        </div>
    )
}

export default CourseCard
