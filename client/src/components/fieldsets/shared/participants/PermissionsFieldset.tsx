import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
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
    signed?: boolean
    sharingLearningPathway?: boolean
    sharingBasicData?: boolean
    permissionInformationFromLibrary?: boolean
}

type Fields = 'signed' | 'sharingLearningPathway' | 'sharingBasicData' | 'permissionInformationFromLibrary'

export const PermissionsFieldset: React.FC<Props> = props => {
    const { readOnly, prefillData, fieldNaming } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            signed: {
                label: i18n._(t`Het toestemmingsformulier is getekend.`),
            },
            sharingLearningPathway: {
                label: i18n._(
                    t`Deelnemer geeft toestemming voor het delen van zijn/haar gegevens met aanbieders van leertrajecten waarvoor deelnemer is aangemeld.`
                ),
            },
            sharingBasicData: {
                label: i18n._(
                    t`Deelnemer geeft toestemming voor het delen van mijn basisgegevens (NAW gegevens, deelname aan Taalhuis, deelname aan leertrajecten) met bibliotheken.`
                ),
            },
            permissionInformationFromLibrary: {
                label: i18n._(t`Deelnemer geeft toestemming voor het toesturen van informatie van Bibliotheek.`),
            },
        },
        fieldNaming
    )

    if (readOnly) {
        return (
            <>
                <SectionTitleWithBorder title={'Toestemmingen'} />
                <Column spacing={8}>
                    <Row>
                        <PermissionContainer
                            readOnly={readOnly}
                            text={content.signed?.label}
                            fontWeight={FontWeight.bold}
                            checked={prefillData?.signed}
                        />
                    </Row>
                    <Column spacing={2}>
                        <Label text={'Het formulier bevat de volgende toestemmingen'} />
                        <Row>
                            <PermissionContainer
                                readOnly={readOnly}
                                text={content.sharingLearningPathway?.label}
                                fontWeight={FontWeight.normal}
                                checked={prefillData?.sharingLearningPathway}
                            />
                        </Row>
                        <Row>
                            <PermissionContainer
                                readOnly={readOnly}
                                text={content.sharingBasicData?.label}
                                fontWeight={FontWeight.normal}
                                checked={prefillData?.sharingBasicData}
                            />
                        </Row>
                        <Row>
                            <PermissionContainer
                                readOnly={readOnly}
                                text={content.permissionInformationFromLibrary?.label}
                                fontWeight={FontWeight.normal}
                                checked={prefillData?.permissionInformationFromLibrary}
                            />
                        </Row>
                    </Column>
                </Column>
            </>
        )
    }
    return (
        <>
            <SectionTitleWithBorder title={'Toestemmingen'} />
            <Column spacing={4}>
                <Row>
                    <PermissionContainer
                        checkboxColor={CheckboxColor.green}
                        name={'permission'}
                        text={content.signed?.label}
                        fontWeight={FontWeight.bold}
                        checked={prefillData?.signed}
                    />
                </Row>
                <Column spacing={2}>
                    <Label text={'Het formulier bevat de volgende toestemmingen'} />
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            name={'permission'}
                            text={content.sharingLearningPathway?.label}
                            fontWeight={FontWeight.normal}
                            checked={prefillData?.sharingLearningPathway}
                        />
                    </Row>
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            name={'permission'}
                            text={content.sharingBasicData?.label}
                            fontWeight={FontWeight.normal}
                            checked={prefillData?.sharingBasicData}
                        />
                    </Row>
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            name={'permission'}
                            text={content.permissionInformationFromLibrary?.label}
                            fontWeight={FontWeight.normal}
                            checked={prefillData?.permissionInformationFromLibrary}
                        />
                    </Row>
                </Column>
            </Column>
        </>
    )
}
