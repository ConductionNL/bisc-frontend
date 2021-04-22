import Modal from 'components/Core/Modal/Modal'
import { MutableItem } from 'components/Core/MutableItemsList.tsx/MutableItem'
import { MutableItemsList } from 'components/Core/MutableItemsList.tsx/MutableItemsList'
import React, { useState } from 'react'
import { AanbiederEmployeeType } from 'temp/TEMPORARYgraphql'
import { NameFormatters } from 'utils/formatters/name/Name'
import { GroupAddMentorModal } from '../Modals/GroupAddMentorModal'

interface Props {
    readOnly?: boolean
    defaultMentors?: AanbiederEmployeeType[]
}
export interface GroupMentorsFieldsetFormModel {
    mentorIds: string
}

export const GroupMentorsFieldset: React.FunctionComponent<Props> = props => {
    const { readOnly, defaultMentors = [] } = props
    const [mentors, setMentors] = useState<AanbiederEmployeeType[]>(defaultMentors)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    if (readOnly) {
        return <div />
    }

    return (
        <>
            <MutableItemsList onAddItem={() => setIsModalOpen(true)}>{renderItems()}</MutableItemsList>
            <Modal big={true} isOpen={isModalOpen}>
                <GroupAddMentorModal onSubmit={handleOnSubmit} onClose={() => setIsModalOpen(false)} />
            </Modal>
            <input
                hidden={true}
                readOnly={true}
                name={'groupMentors'}
                value={mentors.map(mentors => mentors.userId).join(',')}
            />
        </>
    )

    function renderItems() {
        return mentors.map((item, index, array) => (
            <MutableItem key={`${index}-${array.length}`} onDelete={() => handleOnDelete(item)}>
                {NameFormatters.formattedFullname({
                    givenName: item.givenName,
                    additionalName: item.additionalName,
                    familyName: item.familyName,
                })}
            </MutableItem>
        ))
    }

    function handleOnSubmit(item: AanbiederEmployeeType) {
        setMentors([...mentors, item])
    }

    function handleOnDelete(item: AanbiederEmployeeType) {
        const newMentors = mentors.filter(mentor => mentor.userId !== item.userId)

        setMentors(newMentors)
    }
}
