import Modal from 'components/Core/Modal/Modal'
import { MutableItem } from 'components/Core/MutableItemsList.tsx/MutableItem'
import { MutableItemsList } from 'components/Core/MutableItemsList.tsx/MutableItemsList'
import React, { useEffect, useState } from 'react'
import { ProviderEmployeeType } from 'generated/graphql'
import { NameFormatters } from 'utils/formatters/name/Name'
import { GroupAddMentorModal } from '../Modals/GroupAddMentorModal'

interface Props {
    readOnly?: boolean
    defaultMentors?: ProviderEmployeeType[]
}
export interface GroupMentorsFieldsetFormModel {
    mentorIds: string
}

export const GroupMentorsFieldset: React.FunctionComponent<Props> = props => {
    const { readOnly, defaultMentors = [] } = props
    const [mentors, setMentors] = useState<ProviderEmployeeType[]>(defaultMentors)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        setMentors(defaultMentors)
    }, [defaultMentors])

    if (readOnly) {
        // TODO: implement readonly
        return null
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

    function handleOnSubmit(item: ProviderEmployeeType) {
        setMentors([...mentors, item])
    }

    function handleOnDelete(item: ProviderEmployeeType) {
        const newMentors = mentors.filter(mentor => mentor.userId !== item.userId)

        setMentors(newMentors)
    }
}
