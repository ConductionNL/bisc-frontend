import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import LabelTag, { LabelColor } from '../../../../../../components/Core/DataDisplay/LabelTag/LabelTag'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import Field from '../../../../../../components/Core/Field/Field'
import Section from '../../../../../../components/Core/Field/Section'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import Paragraph from '../../../../../../components/Core/Typography/Paragraph'
import { useMockQuery } from '../../../../../../components/hooks/useMockQuery'
import { routes } from '../../../../../../routes'
import { coworkerCreateResponse } from './coworkers'

interface Props {}
interface Params {
    id: string
    name: string
}

const TaalhuisCoworkersOverviewReadView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { id, name } = useParams<Params>()
    const { data, loading, error } = useMockQuery(coworkerCreateResponse)

    if (!id) {
        return null
    }

    return (
        <>
            <Headline
                title={i18n._(t`Medewerker ${name}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Test`)} to={routes.authorized.taalhuis.overview} />
                    </Breadcrumbs>
                }
            />
            {renderSection()}
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Button type={ButtonType.primary} icon={IconType.send} onClick={handleEdit}>
                        {i18n._(t`Bewerken`)}
                    </Button>
                }
            />
        </>
    )

    function renderSection() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (data) {
            return (
                <>
                    <Section title={i18n._(t`Gegevens`)}>
                        <Column spacing={4}>
                            <Field label={i18n._(t`Achternaam`)} horizontal={true}>
                                <Paragraph>{i18n._(t`${data.achternaam}, ${data.tussenvoegsel}`)}</Paragraph>
                            </Field>

                            <Field label={i18n._(t`Roepnaam`)} horizontal={true}>
                                <Paragraph>{i18n._(t`${data.roepnaam}`)}</Paragraph>
                            </Field>

                            <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                                <Paragraph>{i18n._(t`${data.telefoonnummer}`)}</Paragraph>
                            </Field>
                        </Column>
                    </Section>
                    <HorizontalRule />
                    <Section title={i18n._(t`Accountgegevens`)}>
                        <Column spacing={4}>
                            <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                                <Paragraph>{i18n._(t`${data.email}`)}</Paragraph>
                            </Field>
                            <Field label={'Rol'} horizontal={true}>
                                <LabelTag label={data.rol} color={LabelColor.blue} />
                            </Field>
                            <Field label={'Aangemaakt'} horizontal={true}>
                                <Paragraph>{i18n._(t`${data.aangemaakt}`)}</Paragraph>
                            </Field>
                            <Field label={'Bewerkt'} horizontal={true}>
                                <Paragraph>{i18n._(t`${data.bewerkt}`)}</Paragraph>
                            </Field>
                        </Column>
                    </Section>
                </>
            )
        }

        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }
    }

    function handleEdit() {
        history.push(routes.authorized.taalhuis.coworkers.update(data?.id, data?.roepnaam))
    }
}

export default TaalhuisCoworkersOverviewReadView
