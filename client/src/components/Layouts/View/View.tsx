import React from 'react'
import BiSCLogo from '../../Generic/BiSCLogo'
import Column from '../Column/Column'
import styles from './View.module.scss'

interface Props {
    title?: string
}

const View: React.FunctionComponent<Props> = ({ title, children }) => {
    return (
        <div className={styles.container}>
            <BiSCLogo className={styles.biscLogo} />
            <h1 className={styles.title}>{title}</h1>
            <Column grow={true}>{children}</Column>
        </div>
    )
}

export default View
