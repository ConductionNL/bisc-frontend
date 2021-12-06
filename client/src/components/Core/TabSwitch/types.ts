export interface TabSwitchContext {
    onChange: (props: TabProps) => void
    activeKey: string | number
}

export interface TabProps {
    indicatorCount?: number
    label: string
    tabid: string | number
}
