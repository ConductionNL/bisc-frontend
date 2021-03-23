import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import React from 'react'
import Checkbox from '../../../Core/DataEntry/Checkbox'
import Label from '../../../Core/Label/Label'
import Column from '../../../Core/Layout/Column/Column'
import Row from '../../../Core/Layout/Row/Row'

interface Props {
    prefillData?: string[]
    readOnly?: boolean
    list: ListType[]
}

interface ListType {
    name: string
    label: string
    value: string
    text: string
}

export const CheckboxesListWithLabels: React.FC<Props> = ({ prefillData, readOnly, list }) => {
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
                                    <p>{i18n._(t`${skill.value}`)}</p>
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
                                    name={skill.name}
                                    value={skill.value}
                                    defaultChecked={prefillData?.includes(skill.value)}
                                />
                                <p>{i18n._(t`${skill.text}`)}</p>
                            </Row>
                        )
                    })}
                </Column>
            )
        })
    }
}
