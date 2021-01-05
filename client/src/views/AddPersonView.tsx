import React, { useState } from 'react'
import FormField from '../components/Core/DataEntry/FormField'
import Input from '../components/Core/DataEntry/Input'
import Button from '../components/Core/Generic/Button/Button'
import Paragraph from '../components/Core/Generic/Typography/Paragraph'
import Column from '../components/Core/Layout/Column/Column'
import Space from '../components/Core/Layout/Space/Space'
import View from '../components/Core/Layout/View/View'
import { useAddPersonMutation } from '../generated/graphql'
import {
    FormattedInputValidationError,
    getErrorForField,
    getInputValidationErrors,
    hasInputValidationError,
} from '../utils/errors'

export default function AddPersonView() {
    const [mutate, { loading }] = useAddPersonMutation()
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [inputErrors, setInputErrors] = useState<FormattedInputValidationError[]>([])

    const buttonDisabled = canBeSubmitted() !== true

    return (
        <View title={'Add new Person'}>
            <form style={{ flex: 1, display: 'flex' }} onSubmit={handleSubmit}>
                <Column grow={true} spacing={5}>
                    {error && (
                        <Paragraph centered={true} error={true}>
                            {error}
                        </Paragraph>
                    )}
                    {success && <Paragraph centered={true}>{success}</Paragraph>}

                    <Paragraph centered={true}>Enter a name and add new Person</Paragraph>
                    <Column spacing={3}>
                        <FormField label={'New Person name'}>
                            <Input
                                placeholder={'John Allan Doe'}
                                value={name}
                                onChange={setName}
                                errorMessage={getErrorForField('name', inputErrors)}
                            />
                        </FormField>
                    </Column>
                    <Space pushTop={true}>
                        <Button stretch={true} submit={true} disabled={buttonDisabled} loading={loading}>
                            Add new Person
                        </Button>
                    </Space>
                </Column>
            </form>
        </View>
    )

    function canBeSubmitted() {
        if (name) {
            return true
        }

        return false
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setInputErrors([])
        setError('')
        setSuccess('')

        const response = await mutate({
            variables: {
                name: name!,
            },
        })

        if (response.data?.addPerson) {
            setSuccess(`Person "${response.data?.addPerson.node.name}" was added`)
            resetFields()

            return
        }

        if (hasInputValidationError(response.errors)) {
            const errors = getInputValidationErrors(response.errors)
            setInputErrors(errors)

            return
        }

        setError('Could not add Person')
        return
    }

    function resetFields() {
        setName('')
    }
}
