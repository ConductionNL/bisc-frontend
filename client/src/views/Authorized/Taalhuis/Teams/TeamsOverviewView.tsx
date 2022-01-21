import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import { useHistory } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

export const TeamsOverviewView = () => {
    const { i18n } = useLingui()
    const history = useHistory()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(`Teams`)} />

            <Column spacing={6}>
                <Row justifyContent="flex-end">
                    <Button icon={IconType.add} onClick={() => history.push(taalhuisRoutes.teams.create)}>
                        {i18n._(`Nieuwe team`)}
                    </Button>
                </Row>
                {renderTable()}
            </Column>
        </>
    )

    function renderTable() {
        return (
            <Table flex={1} headers={[i18n._('TEAM'), i18n._('MEDEWERKERS'), i18n._('POSTCODEGEBIED(EN)')]} rows={[]} />
        )
    }
}
