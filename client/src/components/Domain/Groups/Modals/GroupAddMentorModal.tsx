import ModalView from 'components/Core/Modal/ModalView'
import { AanbiederEmployeeType } from 'generated/graphql'
import React from 'react'
import { GroupMentorsList } from '../Lists/GroupsMentorsList'

interface Props {
    onClose: () => void
}

export const GroupAddMentorModal: React.FunctionComponent<Props> = props => {
    const { onClose } = props
    const mockData: AanbiederEmployeeType[] = []

    return <ModalView onClose={onClose} ContentComponent={<GroupMentorsList data={mockData} />} />
}
