import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Maybe } from 'api/types/types'
import React from 'react'
import { CheckboxColor } from '../../../Core/DataEntry/Checkbox'
import { SectionTitleWithBorder } from '../../../Core/Field/SectionTitleWithBorder'
import Label from '../../../Core/Label/Label'
import Column from '../../../Core/Layout/Column/Column'
import Row from '../../../Core/Layout/Row/Row'
import { FontWeight, PermissionContainer } from '../../../Core/PermissionContainer/PermissionContainer'
import { ConnectedFieldsetProps } from '../../../hooks/fieldsets/types'
import { useFieldsetContent } from '../../../hooks/fieldsets/useFieldsetContent'

interface Props extends ConnectedFieldsetProps<Fields> {
    readOnly?: boolean
    prefillData?: PermissionsFieldsetPrefillData
}
export interface PermissionsFieldsetFormModel {
    'intake.didSignPermissionForm'?: Maybe<'on'>
    'intake.hasPermissionToShareDataWithProviders'?: Maybe<'on'>
    'intake.hasPermissionToShareDataWithLibraries'?: Maybe<'on'>
    'intake.hasPermissionToSendInformationAboutLibraries'?: Maybe<'on'>
}

export interface PermissionsFieldsetPrefillData {
    'intake.didSignPermissionForm'?: Maybe<boolean>
    'intake.hasPermissionToShareDataWithProviders'?: Maybe<boolean>
    'intake.hasPermissionToShareDataWithLibraries'?: Maybe<boolean>
    'intake.hasPermissionToSendInformationAboutLibraries'?: Maybe<boolean>
}

type Fields =
    | 'didSignPermissionForm'
    | 'hasPermissionToShareDataWithProviders'
    | 'hasPermissionToShareDataWithLibraries'
    | 'hasPermissionToSendInformationAboutLibraries'

export const PermissionsFieldset: React.FC<Props> = props => {
    const { readOnly, prefillData, fieldNaming } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Toestemmingen`),
            didSignPermissionForm: {
                label: i18n._(t`Het toestemmingsformulier is getekend.`),
            },
            hasPermissionToShareDataWithProviders: {
                label: i18n._(
                    t`Deelnemer geeft toestemming voor het delen van zijn/haar gegevens met aanbieders van leertrajecten waarvoor deelnemer is aangemeld.`
                ),
            },
            hasPermissionToShareDataWithLibraries: {
                label: i18n._(
                    t`Deelnemer geeft toestemming voor het delen van mijn basisgegevens (NAW gegevens, deelname aan Taalhuis, deelname aan leertrajecten) met bibliotheken.`
                ),
            },
            hasPermissionToSendInformationAboutLibraries: {
                label: i18n._(t`Deelnemer geeft toestemming voor het toesturen van informatie van Bibliotheek.`),
            },
        },
        fieldNaming
    )

    if (readOnly) {
        return (
            <>
                <SectionTitleWithBorder title={content.title} />
                <Column spacing={8}>
                    <Row>
                        <PermissionContainer
                            readOnly={readOnly}
                            text={content.didSignPermissionForm?.label}
                            fontWeight={FontWeight.bold}
                            defaultChecked={!!prefillData?.['intake.didSignPermissionForm']}
                        />
                    </Row>
                    <Column spacing={2}>
                        <Label text={i18n._(t`Het formulier bevat de volgende toestemmingen`)} />
                        <Row>
                            <PermissionContainer
                                readOnly={readOnly}
                                text={content.hasPermissionToShareDataWithProviders?.label}
                                fontWeight={FontWeight.normal}
                                defaultChecked={!!prefillData?.['intake.hasPermissionToShareDataWithProviders']}
                            />
                        </Row>
                        <Row>
                            <PermissionContainer
                                readOnly={readOnly}
                                text={content.hasPermissionToShareDataWithLibraries?.label}
                                fontWeight={FontWeight.normal}
                                defaultChecked={!!prefillData?.['intake.hasPermissionToShareDataWithLibraries']}
                            />
                        </Row>
                        <Row>
                            <PermissionContainer
                                readOnly={readOnly}
                                text={content.hasPermissionToSendInformationAboutLibraries?.label}
                                fontWeight={FontWeight.normal}
                                defaultChecked={!!prefillData?.['intake.hasPermissionToSendInformationAboutLibraries']}
                            />
                        </Row>
                    </Column>
                </Column>
            </>
        )
    }
    return (
        <>
            <SectionTitleWithBorder title={i18n._(t`Toestemmingen`)} />
            <Column spacing={4}>
                <Row>
                    <PermissionContainer
                        checkboxColor={CheckboxColor.green}
                        name={'intake.didSignPermissionForm'}
                        text={content.didSignPermissionForm?.label}
                        fontWeight={FontWeight.bold}
                        defaultChecked={!!prefillData?.['intake.didSignPermissionForm']}
                    />
                </Row>
                <Column spacing={2}>
                    <Label text={i18n._(t`Het formulier bevat de volgende toestemmingen`)} />
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            name={'intake.hasPermissionToShareDataWithProviders'}
                            text={content.hasPermissionToShareDataWithProviders?.label}
                            fontWeight={FontWeight.normal}
                            defaultChecked={!!prefillData?.['intake.hasPermissionToShareDataWithProviders']}
                        />
                    </Row>
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            name={'intake.hasPermissionToShareDataWithLibraries'}
                            text={content.hasPermissionToShareDataWithLibraries?.label}
                            fontWeight={FontWeight.normal}
                            defaultChecked={!!prefillData?.['intake.hasPermissionToShareDataWithLibraries']}
                        />
                    </Row>
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            name={'intake.hasPermissionToSendInformationAboutLibraries'}
                            text={content.hasPermissionToSendInformationAboutLibraries?.label}
                            fontWeight={FontWeight.normal}
                            defaultChecked={!!prefillData?.['intake.hasPermissionToSendInformationAboutLibraries']}
                        />
                    </Row>
                </Column>
            </Column>
        </>
    )
}
