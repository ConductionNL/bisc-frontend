import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import { CheckboxColor } from '../../../../../components/Core/DataEntry/Checkbox'
import Field from '../../../../../components/Core/Field/Field'
import Section from '../../../../../components/Core/Field/Section'
import { SectionTitleWithBorder } from '../../../../../components/Core/Field/SectionTitleWithBorder'
import Form from '../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../components/Core/Layout/Space/Space'
import {
    FontWeight,
    PermissionCheckboxContainer,
    PermissionCheckboxBackgroundColor,
} from '../../../../../components/Core/PermissionCheckbox/PermissionCheckboxContainer'
import DutchNTFieldset from '../../../../../components/fieldsets/shared/ DutchNTInformationFieldset'
import AvailabillityFieldset from '../../../../../components/fieldsets/shared/AvailabillityFieldset'
import BackgroundInformationFieldset from '../../../../../components/fieldsets/shared/BackgroundInformationFieldset'
import CivicIntegrationFieldset from '../../../../../components/fieldsets/shared/CivicIntegrationInformationFieldset'
import ContactPersonInformationFieldset from '../../../../../components/fieldsets/shared/ContactPersonInformationFieldset'
import CourseInformationFieldset from '../../../../../components/fieldsets/shared/CourseInformationFieldset'
import GeneralInformationFieldset from '../../../../../components/fieldsets/shared/GeneralInformationFieldset'
import LevelInformationFieldset from '../../../../../components/fieldsets/shared/LevelInformationFieldset'
import MotivationInformationFieldset from '../../../../../components/fieldsets/shared/MotivationInformationFieldset'
import ReadingTestInformationFieldset from '../../../../../components/fieldsets/shared/ReadingTestInformationFieldset'
import RefererInformationFieldset from '../../../../../components/fieldsets/shared/ReferrerInformationFieldset'
import TemporaryPersonInformationFieldset from '../../../../../components/fieldsets/shared/TemporaryPersonsInformationFieldset'
import WorkInformationFieldset from '../../../../../components/fieldsets/shared/WorkInformationFieldset'
import WritingInformationFieldset from '../../../../../components/fieldsets/shared/WritingInformationFieldset'
import { useMockMutation } from '../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../routes/routes'

interface Props {}

export interface FormModel {
    id: number
}

export const ParticipantsCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createParticipant, { loading }] = useMockMutation<FormModel, FormModel>({ id: 123 }, false)

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe Deelnemer `)}
                spacingType={SpacingType.default}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb
                            text={i18n._(t`Deelnemers`)}
                            to={routes.authorized.participants.taalhuis.participants.overview}
                        />
                    </Breadcrumbs>
                }
            />
            <CivicIntegrationFieldset />
            <HorizontalRule />
            <TemporaryPersonInformationFieldset />
            <HorizontalRule />
            {/* ContactPersonIformationField Still needs email field */}
            <ContactPersonInformationFieldset />
            <HorizontalRule />
            <GeneralInformationFieldset />
            <HorizontalRule />
            <RefererInformationFieldset />
            <HorizontalRule />
            <BackgroundInformationFieldset />
            <HorizontalRule />
            <DutchNTFieldset />
            <HorizontalRule />
            <LevelInformationFieldset />
            <HorizontalRule />
            <CourseInformationFieldset />
            <HorizontalRule />
            <WorkInformationFieldset />
            <HorizontalRule />
            <MotivationInformationFieldset />
            <HorizontalRule />
            <AvailabillityFieldset />
            <HorizontalRule />
            <ReadingTestInformationFieldset />
            <HorizontalRule />
            <WritingInformationFieldset />
            <HorizontalRule />
            <SectionTitleWithBorder title={'Toestemmingen'} />
            <Column spacing={8}>
                <Row>
                    <PermissionCheckboxContainer
                        backgroundColor={PermissionCheckboxBackgroundColor.green}
                        checkboxColor={CheckboxColor.green}
                        text="Het toestemmingsformulier is getekend."
                        fontWeight={FontWeight.bold}
                    />
                </Row>
                <Field label={i18n._(t`Het formulier bevat de volgende toestemmingen`)}>
                    <Column spacing={2}>
                        <Row>
                            <PermissionCheckboxContainer
                                backgroundColor={PermissionCheckboxBackgroundColor.grey}
                                checkboxColor={CheckboxColor.green}
                                text="test"
                                fontWeight={FontWeight.normal}
                            />
                        </Row>
                        <Row>
                            <PermissionCheckboxContainer
                                backgroundColor={PermissionCheckboxBackgroundColor.green}
                                checkboxColor={CheckboxColor.green}
                                text="test"
                                fontWeight={FontWeight.normal}
                            />
                        </Row>
                        <Row>
                            <PermissionCheckboxContainer
                                backgroundColor={PermissionCheckboxBackgroundColor.green}
                                checkboxColor={CheckboxColor.green}
                                text="test"
                                fontWeight={FontWeight.normal}
                            />
                        </Row>
                    </Column>
                </Field>
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {}
}
