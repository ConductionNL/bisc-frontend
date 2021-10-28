import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Space from 'components/Core/Layout/Space/Space'
import TaalhuizenCoworkersDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenCoworkersDetailBreadcrumbs'
import AccountInformationFieldset from 'components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset from 'components/fieldsets/shared/InformationFieldset'
import { Employee, LanguageHouse } from 'generated/graphql'
import React from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscTaalhuizenDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailCoworkersDetailRouteParams> {
    languageHouse: LanguageHouse
    languageHouseEmployee: Employee
    languageHouseEmployeeFullName: string
}

const CoworkersDetailReadView: React.FunctionComponent<Props> = props => {
    const { languageHouseEmployee, languageHouseEmployeeFullName, languageHouse } = props
    const { languageHouseId, languageHouseEmployeeId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()

    return (
        <>
            <Headline
                title={languageHouseEmployeeFullName}
                TopComponent={
                    <TaalhuizenCoworkersDetailBreadcrumbs
                        languageHouseId={languageHouseId}
                        languageHouseName={languageHouse.name}
                    />
                }
            />
            {renderSection()}
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Button
                        type={ButtonType.primary}
                        icon={IconType.send}
                        onClick={() =>
                            history.push(
                                routes.authorized.bisc.taalhuizen
                                    .detail(languageHouseId)
                                    .coworkers.detail(languageHouseEmployeeId).data.update
                            )
                        }
                    >
                        {i18n._(t`Bewerken`)}
                    </Button>
                }
            />
        </>
    )

    function renderSection() {
        return (
            <>
                <InformationFieldset
                    readOnly={true}
                    prefillData={{
                        familyName: languageHouseEmployee.familyName,
                        additionalName: languageHouseEmployee.additionalName ?? '',
                        callSign: languageHouseEmployee.givenName,
                        phonenumber: languageHouseEmployee.telephone ?? '',
                    }}
                />
                <HorizontalRule />
                <AccountInformationFieldset
                    readOnly={true}
                    prefillData={{
                        // roles: languageHouseEmployee.userRoles.map(role => role.name),
                        email: languageHouseEmployee.email,
                        // createdAt: languageHouseEmployee.dateCreated,
                        // updatedAt: languageHouseEmployee.dateModified,
                    }}
                />
            </>
        )
    }
}

export default CoworkersDetailReadView
