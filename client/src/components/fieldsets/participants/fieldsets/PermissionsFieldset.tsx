import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Scalars } from 'generated/graphql'
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

export interface PermissionsFieldsetPrefillData {
    didSignPermissionForm?: Scalars['Boolean']
    hasPermissionToShareDataWithProviders?: Scalars['Boolean']
    hasPermissionToShareDataWithLibraries?: Scalars['Boolean']
    hasPermissionToSendInformationAboutLibraries?: Scalars['Boolean']
}

export interface PermissionsFieldsetFormModel {
    didSignPermissionForm: Scalars['Boolean']
    hasPermissionToShareDataWithProviders: Scalars['Boolean']
    hasPermissionToShareDataWithLibraries: Scalars['Boolean']
    hasPermissionToSendInformationAboutLibraries: Scalars['Boolean']
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
                            checked={prefillData?.didSignPermissionForm}
                        />
                    </Row>
                    <Column spacing={2}>
                        <Label text={i18n._(t`Het formulier bevat de volgende toestemmingen`)} />
                        <Row>
                            <PermissionContainer
                                readOnly={readOnly}
                                text={content.hasPermissionToShareDataWithProviders?.label}
                                fontWeight={FontWeight.normal}
                                checked={prefillData?.hasPermissionToShareDataWithProviders}
                            />
                        </Row>
                        <Row>
                            <PermissionContainer
                                readOnly={readOnly}
                                text={content.hasPermissionToShareDataWithLibraries?.label}
                                fontWeight={FontWeight.normal}
                                checked={prefillData?.hasPermissionToShareDataWithLibraries}
                            />
                        </Row>
                        <Row>
                            <PermissionContainer
                                readOnly={readOnly}
                                text={content.hasPermissionToSendInformationAboutLibraries?.label}
                                fontWeight={FontWeight.normal}
                                checked={prefillData?.hasPermissionToSendInformationAboutLibraries}
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
                        name={'didSignPermissionForm'}
                        text={content.didSignPermissionForm?.label}
                        fontWeight={FontWeight.bold}
                        checked={prefillData?.didSignPermissionForm}
                    />
                </Row>
                <Column spacing={2}>
                    <Label text={i18n._(t`Het formulier bevat de volgende toestemmingen`)} />
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            name={'hasPermissionToShareDataWithProviders'}
                            text={content.hasPermissionToShareDataWithProviders?.label}
                            fontWeight={FontWeight.normal}
                            checked={prefillData?.hasPermissionToShareDataWithProviders}
                        />
                    </Row>
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            name={'hasPermissionToShareDataWithLibraries'}
                            text={content.hasPermissionToShareDataWithLibraries?.label}
                            fontWeight={FontWeight.normal}
                            checked={prefillData?.hasPermissionToShareDataWithLibraries}
                        />
                    </Row>
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            name={'hasPermissionToSendInformationAboutLibraries'}
                            text={content.hasPermissionToSendInformationAboutLibraries?.label}
                            fontWeight={FontWeight.normal}
                            checked={prefillData?.hasPermissionToSendInformationAboutLibraries}
                        />
                    </Row>
                </Column>
            </Column>
        </>
    )
}
