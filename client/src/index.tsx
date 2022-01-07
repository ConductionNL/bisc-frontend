import { SessionProvider } from 'components/Providers/SessionProvider/SessionProvider'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { I18nLoader } from './components/Providers/I18nLoader/I18nLoader'
import reportWebVitals from './reportWebVitals'
import './styles/index.scss'

ReactDOM.render(
    <React.StrictMode>
        <SessionProvider>
            <I18nLoader>
                <Router>
                    <App />
                </Router>
            </I18nLoader>
        </SessionProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
