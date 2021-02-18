import React from 'react'
import Paragraph from '../../../components/Core/Typography/Paragraph'
import Space from '../../../components/Core/Layout/Space/Space'
import View from '../../Unauthorized/Dev/DevView'
import { useProgramsQuery } from '../../../generated/graphql'
import Button, { ButtonType } from '../../../components/Core/Button/Button'

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
                <Button type={ButtonType.primary} stretch={true} onClick={() => window.location.reload()}>
                    Refresh
                </Button>
            </Space>
        </View>
    )
}
