import Modal from 'components/Core/Modal/Modal'
import { MutableItem } from 'components/Core/MutableItemsList.tsx/MutableItem'
import { MutableItemsList } from 'components/Core/MutableItemsList.tsx/MutableItemsList'
import React, { useEffect, useState } from 'react'
import { ProviderEmployeeType } from 'generated/graphql'
import { NameFormatters } from 'utils/formatters/name/Name'
import { GroupAddMentorModal } from '../Modals/GroupAddMentorModal'
import { GroupMentorDetailModalGroup } from '../Modals/GroupMentorDetailModalSectionView'

interface Props {
    readOnly?: boolean
    defaultMentors?: ProviderEmployeeType[]
    group?: GroupMentorDetailModalGroup
}
export interface GroupMentorsFieldsetFormModel {
    mentorIds: string
}

export const GroupMentorsFieldset: React.FunctionComponent<Props> = props => {
    const { readOnly, defaultMentors = [], group } = props
    const [mentors, setMentors] = useState<ProviderEmployeeType[]>(defaultMentors)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        setMentors(defaultMentors)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (readOnly) {
        // TODO: implement readonly
        return null
    }

    return (
        <>
            <MutableItemsList onAddItem={() => setIsModalOpen(true)}>{renderItems()}</MutableItemsList>
            <Modal big={true} isOpen={isModalOpen}>
                <GroupAddMentorModal onSubmit={handleOnSubmit} onClose={() => setIsModalOpen(false)} group={group} />
            </Modal>
            <input
                readOnly={true}
                id={'groupMentors'}
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
        // document.getElementById('groupMentors')..trigger('change')
    }

    function handleOnDelete(item: ProviderEmployeeType) {
        const newMentors = mentors.filter(mentor => mentor.userId !== item.userId)

        setMentors(newMentors)
    }
}
