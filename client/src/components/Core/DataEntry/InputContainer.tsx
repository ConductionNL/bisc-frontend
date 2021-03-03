import classNames from 'classnames'
import styles from './InputContainer.module.scss'

interface Props {
    className?: string
}

const InputContainer: React.FunctionComponent<Props> = ({ className, children }) => {
    const containerClassNames = classNames(styles.container, className)

    return <div className={containerClassNames}>{children}</div>
}

export default InputContainer
