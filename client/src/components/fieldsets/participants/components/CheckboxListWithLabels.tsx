import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import Checkbox from '../../../Core/DataEntry/Checkbox'
import Label from '../../../Core/Label/Label'
import Column from '../../../Core/Layout/Column/Column'
import Row from '../../../Core/Layout/Row/Row'

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

    return <>{renderCheckboxes()}</>

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
                    <Column spacing={2} key={index}>
                        <Label text={label} />
                        {list.map((skill, index) => {
                            if (skill.label !== label || !prefillData?.includes(skill.value)) {
                                return null
                            }

                            return (
                                <Row key={index}>
                                    <Paragraph>{skill.text}</Paragraph>
                                </Row>
                            )
                        })}
                    </Column>
                )
            })
        }

        return labels.map((label, index) => {
            return (
                <Column spacing={2} key={index}>
                    <Label text={label} />
                    {list.map((skill, index) => {
                        if (skill.label !== label) {
                            return null
                        }

                        return (
                            <Row key={index}>
                                <Checkbox
                                    label={skill.text}
                                    name={name}
                                    value={skill.value}
                                    defaultChecked={prefillData?.includes(skill.value)}
                                />
                            </Row>
                        )
                    })}
                </Column>
            )
        })
    }
}
