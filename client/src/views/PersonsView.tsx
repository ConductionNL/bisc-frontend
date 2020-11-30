import React from 'react'
import Button from '../components/Generic/Button/Button'
import Paragraph from '../components/Generic/Typography/Paragraph'
import Space from '../components/Layout/Space/Space'
import View from '../components/Layout/View/View'
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
                <Button stretch={true} onClick={() => window.location.reload()}>
                    Refresh
                </Button>
            </Space>
        </View>
    )
}
