import { useLingui } from '@lingui/react'
import { OrganizationTypeEnum, TaalhuisEmployeeRole, Team } from 'api/types/types'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconToggle } from 'components/Core/Button/IconToggle'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import ModalView from 'components/Core/Modal/ModalView'
// import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import { Table } from 'components/Core/Table/Table'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import { useState } from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'

interface Props {
    existingMembers?: Team['members']
    onAdd: (memberIds: string[], closeModal: () => void) => void
    loading?: boolean
}

export const AddTeamMembersButtonContainer: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([])

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

    // TODO: BISC-314
    function renderContent() {
        return (
            <Column spacing={6}>
                <SectionTitle title={i18n._('Teamlid toevoegen')} heading="H4" />
                {/* <PageQuery queryHook={useGetTeamMembers}>
                    {teamMembers => ( */}
                <Table
                    // rows={teamMembers.map(renderTeamMember)}
                    rows={[...new Array(5)].map((_, n) => renderTeamMember({ id: n.toString() }))}
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
                {/* )}
                </PageQuery> */}
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
                    onClick={() => onAdd(selectedMemberIds, () => setModalOpen(false))}
                >
                    {i18n._('Teamleden toevoegen')}
                </Button>
            </Row>
        )
    }

    // TODO: BISC-314
    function renderTeamMember(member: any) {
        return [
            <Paragraph>TODO: Aaa</Paragraph>,
            <Paragraph>TODO: Bsss</Paragraph>,
            <RoleLabelTag organizationType={OrganizationTypeEnum.Taalhuis} role={TaalhuisEmployeeRole.Employee} />,
            <Paragraph>{DateFormatters.formattedDate(new Date())}</Paragraph>,
            <Paragraph>{DateFormatters.formattedDate(new Date())}</Paragraph>,
            <IconToggle icon={IconType.addPerson} onToggle={toggled => handleToggle(toggled, member.id)} />,
        ]
    }

    function handleToggle(toggled: boolean, memberId: string) {
        const newSelectedIds = toggled
            ? [...selectedMemberIds, memberId]
            : selectedMemberIds.filter(id => id !== memberId)

        setSelectedMemberIds(newSelectedIds)
    }
}
