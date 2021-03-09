import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../../../components/Core/Feedback/Spinner/Spinner'
import { IconType } from '../../../../../../../components/Core/Icon/IconType'
import Center from '../../../../../../../components/Core/Layout/Center/Center'
import Space from '../../../../../../../components/Core/Layout/Space/Space'
import TaalhuisCoworkersInformationFieldset from '../../../../../../../components/fieldsets/shared/TaalhuisCoworkersInformationFieldset'
import { useMockQuery } from '../../../../../../../components/hooks/useMockQuery'
import { routes } from '../../../../../../../routes'
import { coworkerCreateResponse } from '../mocks/coworkers'

interface Props {}
interface Params {
    id: string
    name: string
}

const TaalhuisCoworkerDetailView: React.FunctionComponent<Props> = () => {
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
                title={i18n._(t`Peter De Wit`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                        <Breadcrumb text={i18n._(t`${name}`)} to={routes.authorized.taalhuis.read.data(id, name)} />
                        <Breadcrumb
                            text={i18n._(t`Medewerkers`)}
                            to={routes.authorized.taalhuis.read.detail.overview(id, name)}
                        />
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
                <TaalhuisCoworkersInformationFieldset
                    readOnly={true}
                    prefillData={{
                        lastName: 'Wit',
                        insertion: 'De',
                        nickName: 'Peter',
                        phoneNumber: 'string',
                        rol: 'string',
                        email: 'string',
                        createdAt: 'string',
                        updatedAt: 'string',
                    }}
                />
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
        if (data) {
            history.push(routes.authorized.taalhuis.read.detail.update(id, name, data.id))
        }
    }
}

export default TaalhuisCoworkerDetailView
