import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Maybe, OrganizationTypeEnum, TaalhuisEmployeeRole } from 'api/types/types'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Row from 'components/Core/Layout/Row/Row'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import React from 'react'
import Input from '../../Core/DataEntry/Input'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import HorizontalRule from '../../Core/HorizontalRule/HorizontalRule'
import Column from '../../Core/Layout/Column/Column'
import Space from '../../Core/Layout/Space/Space'
import Paragraph from '../../Core/Typography/Paragraph'

interface Props {
    prefillData?: TaalhuisCoworkersInformationFieldsetModel
    readOnly?: true
}

export interface TaalhuisCoworkersInformationFieldsetModel {
    'person.givenName'?: Maybe<string>
    'person.additionalName'?: Maybe<string>
    'person.familyName'?: Maybe<string>
    'person.emails[0].email'?: Maybe<string>
    'person.telephones[0].telephone'?: Maybe<string>
    role?: Maybe<TaalhuisEmployeeRole>
}

// NOTE: Don't use these fieldset for new screens, these should be split up into existing shared InformationFieldset and AccountInformationFieldset
const TaalhuisCoworkersInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <>
                <Section title={i18n._(t`Gegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Roepnaam`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.['person.givenName']}`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Achternaam`)} horizontal={true}>
                            <Paragraph>
                                {i18n._(
                                    t`${prefillData?.['person.familyName']}, ${prefillData?.['person.additionalName']}`
                                )}
                            </Paragraph>
                        </Field>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.['person.telephones[0].telephone']}`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>
                <HorizontalRule />
                <Section title={i18n._(t`Accountgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.['person.emails[0].email']}`)}</Paragraph>
                        </Field>
                        <Field label={'Rol'} horizontal={true}>
                            {prefillData?.['role'] && (
                                <RoleLabelTag
                                    organizationType={OrganizationTypeEnum.Taalhuis}
                                    role={prefillData.role}
                                />
                            )}
                        </Field>
                        {/* <Field label={'Aangemaakt'} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.createdAt}`)}</Paragraph>
                        </Field>
                        <Field label={'Bewerkt'} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.updatedAt}`)}</Paragraph>
                        </Field> */}
                    </Column>
                </Section>
                <Space pushTop={true} />
            </>
        )
    }

    return (
        <>
            <Section title={i18n._(t`Gegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Roepnaam`)} horizontal={true} required={true}>
                        <Input
                            name="person.givenName"
                            placeholder={i18n._(t`Peter`)}
                            defaultValue={prefillData?.['person.givenName'] ?? undefined}
                        />
                    </Field>

                    <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                        <Input
                            name="person.additionalName"
                            placeholder={i18n._(t`de`)}
                            defaultValue={prefillData?.['person.additionalName'] ?? undefined}
                        />
                    </Field>

                    <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                        <Input
                            name="person.familyName"
                            placeholder={i18n._(t`Wit`)}
                            defaultValue={prefillData?.['person.familyName'] ?? undefined}
                        />
                    </Field>

                    <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                        <Input
                            name="person.telephones[0].telephone"
                            placeholder={i18n._(t`030 - 123 45 67`)}
                            defaultValue={prefillData?.['person.telephones[0].telephone'] ?? undefined}
                        />
                    </Field>
                </Column>
            </Section>
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={i18n._(t`Accountgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true} required={true}>
                            <Input
                                name="person.emails[0].email"
                                placeholder={i18n._(t`taalhuis@email.nl`)}
                                defaultValue={prefillData?.['person.emails[0].email'] ?? undefined}
                            />
                        </Field>
                        <Field label={i18n._(t`Rol`)} horizontal={true} required={true}>
                            <Column spacing={4}>
                                {[TaalhuisEmployeeRole.Coordinator, TaalhuisEmployeeRole.Employee].map(
                                    (role, index) => (
                                        <Row key={index}>
                                            <RadioButton
                                                name="role"
                                                value={role}
                                                defaultChecked={role === prefillData?.role}
                                                label={
                                                    <RoleLabelTag
                                                        organizationType={OrganizationTypeEnum.Taalhuis}
                                                        role={role}
                                                    />
                                                }
                                            />
                                        </Row>
                                    )
                                )}
                            </Column>
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
        </>
    )
}

export default TaalhuisCoworkersInformationFieldset
