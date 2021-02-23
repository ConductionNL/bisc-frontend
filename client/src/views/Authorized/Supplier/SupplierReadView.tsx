import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Actionbar from '../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import ErrorBlock from '../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../components/Core/Feedback/Spinner/Spinner'
import Field from '../../../components/Core/Field/Field'
import Section from '../../../components/Core/Field/Section'
import HorizontalRule from '../../../components/Core/HorizontalRule/HorizontalRule'
import Center from '../../../components/Core/Layout/Center/Center'
import Column from '../../../components/Core/Layout/Column/Column'
import Row from '../../../components/Core/Layout/Row/Row'
import Space from '../../../components/Core/Layout/Space/Space'
import PageTitle, { PageTitleSize } from '../../../components/Core/Text/PageTitle'
import Paragraph from '../../../components/Core/Typography/Paragraph'
import { useMockQuery } from '../../../components/hooks/useMockQuery'
import { routes } from '../../../routes'
import { supplierCreateResponse } from './mocks/suppliers'

interface Props {}

interface Params {
    id: string
}

const SupplierReadView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { id } = useParams<Params>()
    const { data, loading, error } = useMockQuery(supplierCreateResponse)

    if (!id) {
        return null
    }

    return (
        <>
            {renderSections()}
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.primary}
                            onClick={() => history.push(routes.authorized.supplier.update(id))}
                        >
                            {i18n._(t`Bewerken`)}
                        </Button>
                    </Row>
                }
            />
        </>
    )

    function renderSections() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
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
        return (
            <>
                <Column spacing={12}>
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`test 1`)} to={routes.authorized.kitchensink} />
                    </Breadcrumbs>
                    <PageTitle title={i18n._(t`Nieuwe taalhuis`)} size={PageTitleSize.default} />
                    <Section title={i18n._(t`Vestiging`)}>
                        <Column spacing={4}>
                            <Field label={i18n._(t`Naam taalhuis`)} horizontal={true} required={true}>
                                <Paragraph>{data?.name}</Paragraph>
                            </Field>

                            <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                                <Paragraph>{data?.street}</Paragraph>
                            </Field>

                            <Field label={i18n._(t`Postcode`)} horizontal={true}>
                                <Paragraph>{data?.postalCode}</Paragraph>
                            </Field>

                            <Field label={i18n._(t`Plaats`)} horizontal={true}>
                                <Paragraph>{data?.city}</Paragraph>
                            </Field>
                        </Column>
                    </Section>
                </Column>
                <HorizontalRule />
                <Column spacing={12}>
                    <Section title={i18n._(t`Contactgegevens`)}>
                        <Column spacing={4}>
                            <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                                <Paragraph>{data?.phone}</Paragraph>
                            </Field>
                            <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                                <Paragraph>{data?.email}</Paragraph>
                            </Field>
                        </Column>
                    </Section>
                </Column>
            </>
        )
    }
}

export default SupplierReadView
