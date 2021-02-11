import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { messages } from './locales/en/messages.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './apollo'

i18n.load('en', messages)
i18n.activate('en')

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <I18nProvider i18n={i18n}>
                <Router>
                    <App />
                </Router>
            </I18nProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
