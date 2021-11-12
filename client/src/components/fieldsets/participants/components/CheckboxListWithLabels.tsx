import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import Checkbox from 'components/Core/DataEntry/Checkbox'
import Label from 'components/Core/Label/Label'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'

interface Props {
    prefillData?: string[]
    readOnly?: boolean
    list: ListType[]
    name: string
}

interface ListType {
    label: string
    value: string
    text: string
}

//TODO: This component should be splitted up to different functions
export const CheckboxListWithLabels: React.FC<Props> = props => {
    const { name, prefillData, readOnly, list } = props

    return <Column spacing={8}>{renderCheckboxes()}</Column>

    function renderCheckboxes() {
        const prefillDataLabels = list.map(skill => {
            if (!prefillData?.includes(skill.value)) {
                return null
            }
            return skill.label
        })

        const labels = Array.from(new Set(list.map(skill => skill.label)))

        const readOnlyLabels = labels.map(label => {
            let labelValue = ''
            prefillDataLabels.forEach(prefillDataLabel => {
                if (prefillDataLabel === label) {
                    labelValue = prefillDataLabel
                }
            })

            if (!labelValue) {
                return null
            }

            return labelValue
        })

        if (readOnly && prefillData) {
            return readOnlyLabels.map((label, index) => {
                if (!label) {
                    return null
                }
                return (
                    <Column spacing={1} key={index}>
                        <Label text={label} />
                        {list.map((skill, index) => {
                            if (skill.label !== label || !prefillData?.includes(skill.value)) {
                                return null
                            }

                            return (
                                <React.Fragment key={index}>
                                    <Paragraph>{skill.text}</Paragraph>
                                </React.Fragment>
                            )
                        })}
                    </Column>
                )
            })
        }

        return labels.map((label, index) => {
            return (
                <Column spacing={4} key={index}>
                    <Label text={label} />
                    {list.map((skill, index) => {
                        if (skill.label !== label) {
                            return null
                        }

                        return (
                            <React.Fragment key={index}>
                                <Checkbox
                                    label={skill.text}
                                    name={name}
                                    value={skill.value}
                                    defaultChecked={prefillData?.includes(skill.value)}
                                />
                            </React.Fragment>
                        )
                    })}
                </Column>
            )
        })
    }
}
