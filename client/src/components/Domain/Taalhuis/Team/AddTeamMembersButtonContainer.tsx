import { useLingui } from '@lingui/react'
import { GetEmployeeField, useGetOrganizationEmployees } from 'api/employee/employee'
import { OrganizationEmployee, OrganizationTypeEnum } from 'api/types/types'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconToggle } from 'components/Core/Button/IconToggle'
import { IconType } from 'components/Core/Icon/IconType'
import { InfiniteScrollPageQuery } from 'components/Core/InfiniteScrollPageQuery/InfiniteScrollPageQuery'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import ModalView from 'components/Core/Modal/ModalView'
import { Table } from 'components/Core/Table/Table'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import { UserContext } from 'components/Providers/UserProvider/context'
import { useContext, useState } from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'

interface Props {
    existingMembers?: OrganizationEmployee[] | null
    onAdd: (employees: OrganizationEmployee[], closeModal: () => void) => void
    loading?: boolean
}

export const AddTeamMembersButtonContainer: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const context = useContext(UserContext)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedEmployees, setSelectedEmployees] = useState<OrganizationEmployee[]>([])

    return (
        <>
            <Button type={ButtonType.primary} icon={IconType.add} onClick={() => setModalOpen(true)}>
                {i18n._('Nieuw teamlid')}
            </Button>
            <Modal isOpen={modalOpen} big={true}>
                <ModalView
                    onClose={() => setModalOpen(false)}
                    ContentComponent={renderContent()}
                    BottomComponent={renderActions()}
                />
            </Modal>
        </>
    )

    function renderContent() {
        return (
            <Column spacing={6}>
                <SectionTitle title={i18n._('Teamlid toevoegen')} heading="H4" />
                <InfiniteScrollPageQuery
                    queryHook={() =>
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useGetOrganizationEmployees({
                            organizationId: context.user?.organization.id!,
                            fields: [
                                GetEmployeeField.Id,
                                GetEmployeeField.Role,
                                GetEmployeeField.PersonGivenName,
                                GetEmployeeField.PersonAdditionalName,
                                GetEmployeeField.PersonFamilyName,
                            ],
                        })
                    }
                >
                    {renderTable}
                </InfiniteScrollPageQuery>
            </Column>
        )
    }

    function renderActions() {
        const { loading, onAdd } = props

        return (
            <Row>
                <Button type={ButtonType.secondary} disabled={loading} onClick={() => setModalOpen(false)}>
                    {i18n._('Annuleren')}
                </Button>
                <Button
                    type={ButtonType.primary}
                    loading={loading}
                    onClick={() => onAdd(selectedEmployees, () => setModalOpen(false))}
                >
                    {i18n._('Teamleden toevoegen')}
                </Button>
            </Row>
        )
    }

    function renderTable(employees: OrganizationEmployee[]) {
        const nonMemberEmployees = employees.filter(e => !props.existingMembers?.some(m => e.id === m.id))

        return (
            <Table
                rows={nonMemberEmployees.map(renderEmployee)}
                lastItemIsIcon={true}
                flex={1}
                headers={[
                    i18n._('ACHTERNAAM'),
                    i18n._('ROEPNAAM'),
                    i18n._('ROL'),
                    i18n._('AANGEMAAKT'),
                    i18n._('BEWERKT'),
                    '',
                ]}
            />
        )
    }

    function renderEmployee(employee: OrganizationEmployee) {
        return [
            <Paragraph>{employee.person.givenName}</Paragraph>,
            <Paragraph>{employee.person.familyName}</Paragraph>,
            <RoleLabelTag organizationType={OrganizationTypeEnum.Taalhuis} role={employee.role} />,
            <Paragraph>{DateFormatters.formattedDate(employee['@dateCreated'])}</Paragraph>,
            <Paragraph>{DateFormatters.formattedDate(employee['@dateModified'])}</Paragraph>,
            <IconToggle icon={IconType.addPerson} onToggle={toggled => handleToggle(toggled, employee)} />,
        ]
    }

    function handleToggle(toggled: boolean, employee: OrganizationEmployee) {
        const newSelecteds = toggled
            ? [...selectedEmployees, employee]
            : selectedEmployees.filter(e => e.id !== employee.id)

        setSelectedEmployees(newSelecteds)
    }
}
