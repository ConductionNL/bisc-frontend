import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../../../routes'
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
            <Column grow={true}>
                <nav>
                    <ul>
                        <li>
                            <Link to={routes.index}>Home</Link>
                        </li>
                        {/* <li>
                            <Link to={routes.persons}>Persons</Link>
                        </li>
                        <li>
                            <Link to={routes.addPerson}>Add Person</Link>
                        </li> */}
                        <li>
                            <Link to={routes.programs}>All Programs</Link>
                        </li>
                        <li>
                            <Link to={routes.myPrograms}>My Programs</Link>
                        </li>
                        <li>
                            <Link to={routes.addPersonToProgram}>Enroll in Program</Link>
                        </li>
                    </ul>
                </nav>
            </Column>
            <Column grow={true}>{children}</Column>
        </div>
    )
}

export default View
