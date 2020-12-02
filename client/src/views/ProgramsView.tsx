import React from 'react'
import Button from '../components/Generic/Button/Button'
import Paragraph from '../components/Generic/Typography/Paragraph'
import Space from '../components/Layout/Space/Space'
import View from '../components/Layout/View/View'
import { useProgramsQuery } from '../generated/graphql'

export default function ProgramsView() {
    const { data, loading, error } = useProgramsQuery()

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
        <View title={'Programs'}>
            {data.programs.map(program => (
                <Paragraph centered={true}>
                    {program.node.id} - {program.node.name}
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
