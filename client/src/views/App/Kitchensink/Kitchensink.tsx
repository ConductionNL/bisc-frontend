import React from 'react'
import classNames from 'classnames'

import styles from './Kitchensink.module.scss'
import Column from '../../../components/Core/Layout/Column/Column'
import Row from '../../../components/Core/Layout/Row/Row'
import PageTitle from '../../../components/Core/Text/PageTitle'
import SectionTitle from '../../../components/Core/Text/SectionTitle'
import Paragraph from '../../../components/Core/Typography/Paragraph'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import Space from '../../../components/Core/Layout/Space/Space'
import LayoutItem from '../../../components/Core/Layout/LayoutItem/LayoutItem'

export default function Kitchensink() {
    return (
        <Column spacing={8} className={styles.container}>
            {renderColors()}
            <Space />
            <Space />
            {renderTypography()}
            <Space />
            <Space />
            {renderButtons()}
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
                    <SectionTitle heading="H3" title="H3 |" />
                    <SectionTitle heading="H4" title="H4 |" />
                    <SectionTitle heading="H5" title="H5 |" />
                    <SectionTitle heading="H6" title="H6 |" />
                    <SectionTitle heading="H7" title="H7 | Small Title" />
                    <SectionTitle heading="H8" title="H8 | Ant Title" />
                </Column>
                <Column spacing={4}>
                    <Paragraph bold={true}>Lorem ipsum dolor sit amet</Paragraph>
                    <Row>
                        <Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </Paragraph>
                        <Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </Paragraph>
                    </Row>
                    <Row>
                        <Paragraph italic={true}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </Paragraph>
                        <Paragraph italic={true}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
                        </Paragraph>
                    </Row>
                </Column>
            </>
        )
    }

    function renderButtons() {
        return (
            <>
                <PageTitle title="Buttons & Links" />
                <Row>
                    <Column className={styles.buttonColumnContainer}>
                        <Paragraph small={true}> </Paragraph>
                        <Paragraph>Primary</Paragraph>
                        <Paragraph>Secondary</Paragraph>
                        <Paragraph>Tertiary</Paragraph>
                        <Paragraph>Arrow + Link</Paragraph>
                        <Paragraph>Round With Icon: primary</Paragraph>
                        <Paragraph>Round With Icon: secondary</Paragraph>
                        <Paragraph>With Icon: primary</Paragraph>
                        <Paragraph>With Icon: secondary</Paragraph>
                        <Paragraph>With Icon: tertiary</Paragraph>
                        <Paragraph>Big</Paragraph>
                    </Column>
                    {/* default */}
                    <Column className={styles.buttonColumnContainer}>
                        <Paragraph subtle={true} small={true}>
                            Default
                        </Paragraph>
                        <LayoutItem>
                            <Button type={ButtonType.primary}>Button</Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button type={ButtonType.secondary}>Button</Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button type={ButtonType.tertiary}>Button</Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button type={ButtonType.arrowLink} href="/">
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button round={true} type={ButtonType.primary} />
                        </LayoutItem>
                        <Paragraph> </Paragraph>
                        <LayoutItem>
                            <Button type={ButtonType.primary}>Button</Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button type={ButtonType.secondary}>Button</Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button type={ButtonType.tertiary}>Button</Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button big={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                    </Column>
                    {/* disabled */}
                    <Column className={styles.buttonColumnContainer}>
                        <Paragraph subtle={true} small={true}>
                            Disabled
                        </Paragraph>
                        <LayoutItem>
                            <Button disabled={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button disabled={true} type={ButtonType.secondary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button disabled={true} type={ButtonType.tertiary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button disabled={true} type={ButtonType.arrowLink} href="/">
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button disabled={true} round={true} type={ButtonType.primary} />
                        </LayoutItem>
                        <Paragraph> </Paragraph>
                        <LayoutItem>
                            <Button disabled={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <Paragraph> </Paragraph>
                        <Paragraph> </Paragraph>
                        <LayoutItem>
                            <Button big={true} disabled={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                    </Column>
                    {/* loading */}
                    <Column className={styles.buttonColumnContainer}>
                        <Paragraph subtle={true} small={true}>
                            Loading
                        </Paragraph>
                        <LayoutItem>
                            <Button loading={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button loading={true} type={ButtonType.secondary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button loading={true} type={ButtonType.tertiary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <Paragraph> </Paragraph>
                        <LayoutItem>
                            <Button loading={true} round={true} type={ButtonType.primary} />
                        </LayoutItem>
                        <Paragraph> </Paragraph>
                        <LayoutItem>
                            <Button loading={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button loading={true} type={ButtonType.secondary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button loading={true} type={ButtonType.tertiary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button big={true} loading={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                    </Column>
                    {/* danger */}
                    <Column className={styles.buttonColumnContainer}>
                        <Paragraph subtle={true} small={true}>
                            Danger
                        </Paragraph>
                        <LayoutItem>
                            <Button danger={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button danger={true} type={ButtonType.secondary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <Paragraph> </Paragraph>
                        <Paragraph> </Paragraph>
                        <LayoutItem>
                            <Button danger={true} round={true} type={ButtonType.primary} />
                        </LayoutItem>
                        <LayoutItem>
                            <Button danger={true} round={true} type={ButtonType.secondary} />
                        </LayoutItem>
                        <LayoutItem>
                            <Button danger={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button danger={true} type={ButtonType.secondary}>
                                Button
                            </Button>
                        </LayoutItem>
                        <Paragraph> </Paragraph>
                        <LayoutItem>
                            <Button big={true} danger={true} type={ButtonType.primary}>
                                Button
                            </Button>
                        </LayoutItem>
                    </Column>
                </Row>
            </>
        )
    }
}
