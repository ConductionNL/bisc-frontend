import React, { useState } from 'react'
import classNames from 'classnames'
import { TabProps } from './types'
import styles from './TabSwitch.module.scss'
import { TabSwitchContext } from './context'

interface Props {
    className?: string
    activeTabId?: string | number
    onChange?: (key: TabProps) => void
}

const TabSwitch: React.FunctionComponent<Props> = props => {
    const { className, children, onChange, activeTabId } = props
    const containerClassNames = classNames(styles.container, className)
    // const [activeKey, setActiveKey] = useState(activeTabId || '')

    const handleOnChange = (tabProps: TabProps) => {
        // setActiveKey(tabProps.tabid)
        if (onChange) {
            onChange(tabProps)
        }
    }

    return (
        <TabSwitchContext.Provider
            value={{
                onChange: handleOnChange,
                activeKey: activeTabId,
            }}
        >
            <div className={containerClassNames}>{children}</div>
        </TabSwitchContext.Provider>
    )
}

export default TabSwitch
