import React from 'react'
import { CheckboxColor } from '../../../Core/DataEntry/Checkbox'
import { SectionTitleWithBorder } from '../../../Core/Field/SectionTitleWithBorder'
import Label from '../../../Core/Label/Label'
import Column from '../../../Core/Layout/Column/Column'
import Row from '../../../Core/Layout/Row/Row'
import { FontWeight, PermissionContainer } from '../../../Core/PermissionContainer/PermissionContainer'

interface Props {
    readOnly?: boolean
}

export const PermissionsFieldset: React.FC<Props> = ({ readOnly }) => {
    if (readOnly) {
        return (
            <>
                <SectionTitleWithBorder title={'Toestemmingen'} />
                <Column spacing={4}>
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            text="Het toestemmingsformulier is getekend."
                            fontWeight={FontWeight.bold}
                        />
                    </Row>
                    <Label text={'Het formulier bevat de volgende toestemmingen'} />
                    <Column spacing={2}>
                        <Row>
                            <PermissionContainer
                                checkboxColor={CheckboxColor.green}
                                text="Deelnemer geeft toestemming voor het delen van zijn/haar gegevens met aanbieders van leertrajecten waarvoor deelnemer is aangemeld."
                                fontWeight={FontWeight.normal}
                            />
                        </Row>
                        <Row>
                            <PermissionContainer
                                checkboxColor={CheckboxColor.green}
                                text="Deelnemer geeft toestemming voor het delen van mijn basisgegevens (NAW gegevens, deelname aan Taalhuis, deelname aan leertrajecten) met bibliotheken."
                                fontWeight={FontWeight.normal}
                            />
                        </Row>
                        <Row>
                            <PermissionContainer
                                checkboxColor={CheckboxColor.green}
                                text="Deelnemer geeft toestemming voor het toesturen van informatie van Bibliotheek."
                                fontWeight={FontWeight.normal}
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
                        text="Het toestemmingsformulier is getekend."
                        fontWeight={FontWeight.bold}
                    />
                </Row>
                <Label text={'Het formulier bevat de volgende toestemmingen'} />
                <Column spacing={2}>
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            text="Deelnemer geeft toestemming voor het delen van zijn/haar gegevens met aanbieders van leertrajecten waarvoor deelnemer is aangemeld."
                            fontWeight={FontWeight.normal}
                        />
                    </Row>
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            text="Deelnemer geeft toestemming voor het delen van mijn basisgegevens (NAW gegevens, deelname aan Taalhuis, deelname aan leertrajecten) met bibliotheken."
                            fontWeight={FontWeight.normal}
                        />
                    </Row>
                    <Row>
                        <PermissionContainer
                            checkboxColor={CheckboxColor.green}
                            text="Deelnemer geeft toestemming voor het toesturen van informatie van Bibliotheek."
                            fontWeight={FontWeight.normal}
                        />
                    </Row>
                </Column>
            </Column>
        </>
    )
}
