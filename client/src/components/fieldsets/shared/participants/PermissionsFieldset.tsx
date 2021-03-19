import React from 'react'
import { CheckboxColor } from '../../../Core/DataEntry/Checkbox'
import { SectionTitleWithBorder } from '../../../Core/Field/SectionTitleWithBorder'
import Label from '../../../Core/Label/Label'
import Column from '../../../Core/Layout/Column/Column'
import Row from '../../../Core/Layout/Row/Row'
import { FontWeight, PermissionContainer } from '../../../Core/PermissionContainer/PermissionContainer'

interface Props {
    readOnly?: boolean
    prefillData?: PermissionsFieldsetPrefillData
}

export interface PermissionsFieldsetPrefillData {
    signed?: boolean
    sharingLearningPathway?: boolean
    sharingBasicData?: boolean
    permissionInformationFromLibrary?: boolean
}

export const PermissionsFieldset: React.FC<Props> = ({ readOnly, prefillData }) => {
    if (readOnly) {
        return (
            <>
                <SectionTitleWithBorder title={'Toestemmingen'} />
                <Column spacing={8}>
                    <Row>
                        <PermissionContainer
                            readOnly={readOnly}
                            text="Het toestemmingsformulier is getekend."
                            fontWeight={FontWeight.bold}
                            checked={prefillData?.signed}
                        />
                    </Row>
                    <Column spacing={2}>
                        <Label text={'Het formulier bevat de volgende toestemmingen'} />
                        <Row>
                            <PermissionContainer
                                readOnly={readOnly}
                                text="Deelnemer geeft toestemming voor het delen van zijn/haar gegevens met aanbieders van leertrajecten waarvoor deelnemer is aangemeld."
                                fontWeight={FontWeight.normal}
                                checked={prefillData?.sharingLearningPathway}
                            />
                        </Row>
                        <Row>
                            <PermissionContainer
                                readOnly={readOnly}
                                text="Deelnemer geeft toestemming voor het delen van mijn basisgegevens (NAW gegevens, deelname aan Taalhuis, deelname aan leertrajecten) met bibliotheken."
                                fontWeight={FontWeight.normal}
                                checked={prefillData?.sharingBasicData}
                            />
                        </Row>
                        <Row>
                            <PermissionContainer
                                readOnly={readOnly}
                                text="Deelnemer geeft toestemming voor het toesturen van informatie van Bibliotheek."
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
                        text="Het toestemmingsformulier is getekend."
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
                            text="Deelnemer geeft toestemming voor het delen van zijn/haar gegevens met aanbieders van leertrajecten waarvoor deelnemer is aangemeld."
                            fontWeight={FontWeight.normal}
                            checked={prefillData?.sharingLearningPathway}
                        />
                    </Row>
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            name={'permission'}
                            text="Deelnemer geeft toestemming voor het delen van mijn basisgegevens (NAW gegevens, deelname aan Taalhuis, deelname aan leertrajecten) met bibliotheken."
                            fontWeight={FontWeight.normal}
                            checked={prefillData?.sharingBasicData}
                        />
                    </Row>
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            name={'permission'}
                            text="Deelnemer geeft toestemming voor het toesturen van informatie van Bibliotheek."
                            fontWeight={FontWeight.normal}
                            checked={prefillData?.permissionInformationFromLibrary}
                        />
                    </Row>
                </Column>
            </Column>
        </>
    )
}
