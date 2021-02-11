import React from 'react'
import Button, { ButtonType } from '../components/Core/Button/Button'
import Paragraph from '../components/Core/Typography/Paragraph'
import Space from '../components/Core/Layout/Space/Space'
import View from './Unauthorized/DevView/DevView'
import { usePersonsQuery } from '../generated/graphql'

export default function PersonsView() {
    const { data, loading, error } = usePersonsQuery()

    if (loading) {
        return <View title={'Loading'} />
    }

    if (error || !data) {
        return (
            <View title={'Error'}>
                <Paragraph centered={true}>{error ? error.message : 'No data'}</Paragraph>
            </View>
        )
    }

    return (
        <View title={'Persons'}>
            {data.persons.map(person => (
                <Paragraph centered={true}>
                    {person.node.id} - {person.node.name}
                </Paragraph>
            ))}

            <Space pushTop={true}>
                <Button type={ButtonType.primary} stretch={true} onClick={() => window.location.reload()}>
                    Refresh
                </Button>
            </Space>
        </View>
    )
}
