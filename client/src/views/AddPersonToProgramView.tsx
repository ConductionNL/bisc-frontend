import React, { useState } from 'react'
import FormField from '../components/Core/DataEntry/FormField'
import Input from '../components/Core/DataEntry/Input'
import Button from '../components/Core/Button/Button'
import Paragraph from '../components/Core/Typography/Paragraph'
import Column from '../components/Core/Layout/Column/Column'
import Space from '../components/Core/Layout/Space/Space'
import View from '../components/Core/Layout/View/View'
import { useEnrollPersonInProgramMutation, useProgramsQuery } from '../generated/graphql'
import {
    FormattedInputValidationError,
    getErrorForField,
    getInputValidationErrors,
    hasInputValidationError,
} from '../utils/errors'

export default function AddPersonToProgramView() {
    const { data: programsData, loading: programsLoading, error: programsError } = useProgramsQuery()
    const [mutate, { loading }] = useEnrollPersonInProgramMutation()
    const [program, setProgram] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const [inputErrors, setInputErrors] = useState<FormattedInputValidationError[]>([])

    if (programsLoading) {
        return <View title={'Loading'} />
    }

    if (programsError || !programsData) {
        return (
            <View title={'Error'}>
                <Paragraph centered={true}>{programsError ? programsError.message : 'No data'}</Paragraph>
            </View>
        )
    }

    const buttonDisabled = canBeSubmitted() !== true

    return (
        <View title={'Enroll in program'}>
            <form style={{ flex: 1, display: 'flex' }} onSubmit={handleSubmit}>
                <Column grow={true} spacing={5}>
                    {error && (
                        <Paragraph centered={true} error={true}>
                            {error}
                        </Paragraph>
                    )}
                    {success && <Paragraph centered={true}>{success}</Paragraph>}

                    <Paragraph centered={true}>Choose a program to enroll in</Paragraph>
                    <Column spacing={3}>
                        <FormField label={'Program'}>
                            {programsData.programs.map(program => (
                                <>
                                    <label>
                                        <Input
                                            type={'radio'}
                                            value={program.node.id}
                                            onChange={() => setProgram(program.node.id)}
                                            errorMessage={getErrorForField('name', inputErrors)}
                                        />
                                        {program.node.name}
                                    </label>
                                </>
                            ))}
                        </FormField>
                    </Column>
                    <Space pushTop={true}>
                        <Button stretch={true} submit={true} disabled={buttonDisabled} loading={loading}>
                            Enroll
                        </Button>
                    </Space>
                </Column>
            </form>
        </View>
    )

    function canBeSubmitted() {
        if (program) {
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
                personId: '/people/1db5d8ee-fe16-4303-b2bb-577621068c75',
                programId: program!,
            },
        })

        if (response.data?.enrollPersonInProgram) {
            setSuccess(`You are enrolled in program ${program}`)
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
        setProgram('')
    }
}
