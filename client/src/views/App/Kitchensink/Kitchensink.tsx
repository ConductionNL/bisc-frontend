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
import { IconType } from '../../../components/Core/Icon/IconType'
import Icon from '../../../components/Core/Icon/Icon'
import Spinner, { Animation } from '../../../components/Core/Feedback/Spinner/Spinner'
import FormField from '../../../components/Core/DataEntry/FormField'
import Input from '../../../components/Core/DataEntry/Input'
import Checkbox, { BackgroundColor } from '../../../components/Core/DataEntry/Checkbox'

export default function Kitchensink() {
    return (
        <Column spacing={8} className={styles.container}>
            {renderColors()}
            <Space />
            <Space />
            {renderTypography()}
            <Space />
            <Space />
            {renderIcons()}
            <Space />
            <Space />
            {renderButtons()}
            <Space />
            <Space />
            {renderSpinners()}
            <Space />
            <Space />
            {renderForms()}
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

    function renderIcons() {
        return (
            <>
                <PageTitle title="Icons" />
                <Row wrap={true}>
                    {Object.entries(IconType).map(([key, type], i) => (
                        <Column key={`icon-${i}`}>
                            <Paragraph subtle={true} small={true}>
                                {key}
                            </Paragraph>
                            <Icon type={type} />
                        </Column>
                    ))}
                </Row>
            </>
        )
    }

    function renderButtons() {
        return (
            <>
                <PageTitle title="Buttons" />
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
                            <Button type={ButtonType.arrowLink} icon={IconType.arrowRight} href="/">
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button round={true} icon={IconType.arrowLeft} type={ButtonType.primary} />
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
                            <Button disabled={true} type={ButtonType.arrowLink} icon={IconType.arrowRight} href="/">
                                Button
                            </Button>
                        </LayoutItem>
                        <LayoutItem>
                            <Button disabled={true} round={true} icon={IconType.arrowLeft} type={ButtonType.primary} />
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
                            <Button loading={true} round={true} icon={IconType.arrowLeft} type={ButtonType.primary} />
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
                            <Button danger={true} round={true} icon={IconType.arrowLeft} type={ButtonType.primary} />
                        </LayoutItem>
                        <LayoutItem>
                            <Button danger={true} round={true} icon={IconType.arrowLeft} type={ButtonType.secondary} />
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

    function renderSpinners() {
        return (
            <>
                <PageTitle title="Spinners" />
                <Row>
                    <Spinner small={true} delayed={true} />
                    <Spinner />
                    <Spinner large={true} slow={true} />
                    <Spinner small={true} type={Animation.pageSpinner} />
                    <Spinner type={Animation.pageSpinner} />
                    <Spinner large={true} type={Animation.pageSpinner} slow={true} delayed={true} />
                </Row>
            </>
        )
    }

    function renderForms() {
        return (
            <>
                <PageTitle title="Forms" />
                <Row>
                    <Paragraph subtle={true} small={true}>
                        InputField
                    </Paragraph>
                    <FormField label={'New Person name'}>
                        <Input placeholder={'Placeholder'} onChange={undefined} />
                    </FormField>
                    <FormField label={'New Person name'}>
                        <Input placeholder={'Placeholder'} value="name" onChange={undefined} />
                    </FormField>
                    <FormField label={'New Person name'}>
                        <Input
                            placeholder={'Placeholder'}
                            value={'name'}
                            onChange={undefined}
                            errorMessage={'Dit veld is verplicht'}
                        />
                    </FormField>
                    <FormField label={'New Person name'}>
                        <Input placeholder={'Placeholder'} value={'name'} onChange={undefined} disabled={true} />
                    </FormField>
                    <FormField label={'New Person name'} loading={true}>
                        <Input placeholder={'Placeholder'} value={'name'} onChange={undefined} />
                    </FormField>
                </Row>
                <Row>
                    <Paragraph subtle={true} small={true}>
                        Input + link
                    </Paragraph>
                    <FormField label={'Label'} link="www.google.com">
                        <Input placeholder={'Placeholder'} value={'name'} onChange={undefined} />
                    </FormField>
                </Row>
                <Row>
                    <Paragraph subtle={true} small={true}>
                        Input + link
                    </Paragraph>
                    <FormField>
                        <Checkbox background={BackgroundColor.orange} />
                    </FormField>
                    <FormField>
                        <Checkbox background={BackgroundColor.orange} disabled={true} checked={true} />
                    </FormField>
                    <FormField>
                        <Checkbox background={BackgroundColor.white} />
                    </FormField>
                    <FormField>
                        <Checkbox background={BackgroundColor.white} disabled={true} checked={true} />
                    </FormField>
                </Row>
            </>
        )
    }
}
