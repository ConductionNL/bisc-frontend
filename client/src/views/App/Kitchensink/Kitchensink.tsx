import React from 'react'
import classNames from 'classnames'

import styles from './Kitchensink.module.scss'
import Column from '../../../components/Core/Layout/Column/Column'
import Row from '../../../components/Core/Layout/Row/Row'

export default function Kitchensink() {
    return (
        <Column spacing={8} className={styles.container}>
            <div>colors</div>
            <Row>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.biscOrange)} />
                    <div>bisc orange</div>
                </Column>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.biscIce)} />
                    <div>bisc ice</div>
                </Column>
            </Row>
            <Row>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.yellow)} />
                    <div>yellow</div>
                </Column>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.salmon)} />
                    <div>salmon</div>
                </Column>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.purple)} />
                    <div>purple</div>
                </Column>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.darkBlue)} />
                    <div>dark blue</div>
                </Column>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.polar)} />
                    <div>polar</div>
                </Column>
            </Row>
            <Row>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.dark99)} />
                    <div>dark 99</div>
                </Column>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.grey80)} />
                    <div>grey 80</div>
                </Column>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.grey60)} />
                    <div>grey 60</div>
                </Column>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.grey20)} />
                    <div>grey 20</div>
                </Column>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.grey10)} />
                    <div>grey 10</div>
                </Column>
            </Row>
            <Row>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.uiSuccess)} />
                    <div>ui success</div>
                </Column>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.uiWarning)} />
                    <div>ui warning</div>
                </Column>
                <Column spacing={2}>
                    <div className={classNames(styles.colorContainer, styles.uiDanger)} />
                    <div>ui danger</div>
                </Column>
            </Row>
        </Column>
    )
}
