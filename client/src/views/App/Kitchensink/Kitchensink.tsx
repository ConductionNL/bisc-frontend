import React from 'react'
import classNames from 'classnames'

import styles from './Kitchensink.module.scss'
import Column from '../../../components/Core/Layout/Column/Column'
import Row from '../../../components/Core/Layout/Row/Row'
import PageTitle from '../../../components/Core/Text/PageTitle'
import SectionTitle from '../../../components/Core/Text/SectionTitle'

export default function Kitchensink() {
    return (
        <Column spacing={8} className={styles.container}>
            {renderColors()}
            {renderTypography()}
        </Column>
    )

    function renderColors() {
        return (
            <>
                <PageTitle title="Colors" />
                <Column spacing={8}>
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
            </>
        )
    }

    function renderTypography() {
        return (
            <>
                <PageTitle title="Typography" />
                <Column>
                    <PageTitle title="H1 | Page Title" />
                    <SectionTitle title="H2 | Section Title" />
                    <SectionTitle size="H3" title="H3 |" />
                    <SectionTitle size="H4" title="H4 |" />
                    <SectionTitle size="H5" title="H5 |" />
                    <SectionTitle size="H6" title="H6 |" />
                    <SectionTitle size="H7" title="H7 | Small Title" />
                    <SectionTitle size="H8" title="H8 | Ant Title" />
                </Column>
            </>
        )
    }
}
