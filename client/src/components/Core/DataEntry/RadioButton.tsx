import React from 'react'
import styles from './RadioButton.module.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
}

const RadioButton: React.FunctionComponent<Props> = props => {
    return (
        <div className={styles.container}>
            <input type="radio" {...props}/>
            <div className={styles.radio} />
        </div>
    )
}

export default RadioButton
