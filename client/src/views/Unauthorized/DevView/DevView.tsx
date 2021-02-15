import React from 'react'
import { Link } from 'react-router-dom'

import { routes } from '../../../routes'
import Icon from '../../../components/Core/Icon/Icon'
import { IconType } from '../../../components/Core/Icon/IconType'
import Column from '../../../components/Core/Layout/Column/Column'
import styles from './DevView.module.scss'

interface Props {
    title?: string
}

const View: React.FunctionComponent<Props> = ({ title, children }) => {
    return (
        <div className={styles.container}>
            <Icon className={styles.biscLogo} type={IconType.biscLogo} />
            <h1 className={styles.title}>{title}</h1>
            <Column>
                <nav>
                    <ul>
                        <li>
                            <Link to={routes.index}>Home</Link>
                        </li>
                        <li>
                            <Link to={routes.login}>Login</Link>
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

                        {/* TODO: delete - for design review/check only */}
                        <li>
                            <Link to={routes.translationsExample}>Translations example</Link>
                        </li>
                        <li>
                            <Link to={routes.kitchensink}>Kitchensink</Link>
                        </li>
                    </ul>
                </nav>
            </Column>
            <Column>{children}</Column>
        </div>
    )
}

export default View
