import React from 'react'
import RootView from './views/RootView'
import { NotificationsManager } from './components/Core/Feedback/Notifications/NotificationsManager'

function App() {
    return (
        <>
            <RootView />
            <NotificationsManager />
        </>
    )
}

export default App
