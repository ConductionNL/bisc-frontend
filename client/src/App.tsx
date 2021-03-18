import React from 'react'
import { default as ReactModal } from 'react-modal'
import RootView from './views/RootView'
ReactModal.setAppElement('#root')

function App() {
    return (
        <>
            <RootView />
        </>
    )
}

export default App
