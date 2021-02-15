import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import zxcvbn from 'zxcvbn'
import styles from './PasswordStrengthBar.module.scss'
interface Props {
    value: string | undefined
    className?: string
}

const PasswordStrengthBar: React.FunctionComponent<Props> = ({ value, className }) => {
    const [passwordScore, setPasswordScore] = useState<number>()

    useEffect(() => {
        handleSecureness()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return <div className={classNames(styles.container, className)}>{displaySecureText(passwordScore)}</div>

    function handleSecureness() {
        if (!value) {
            return null
        }

        const response = zxcvbn(value)

        if (!value) {
            setPasswordScore(undefined)
            return
        }

        setPasswordScore(response.score + 1)
    }

    function displaySecureText(score: number | undefined) {
        if (!score) {
            return undefined
        }

        if (score <= 2) {
            return (
                <div className={classNames(styles.secureContainer, styles.weak)}>
                    <p className={styles.secureTitle}>Zwak wachtwoord</p>
                    <p className={styles.secureParagraph}>Maak gebruik van speciale tekens, hoofdletters en cijfers</p>
                    <div className={styles.secureBarContainer}>
                        <div className={styles.secureBar} style={{ width: `${(score / 6) * 100}%` }} />
                    </div>
                </div>
            )
        } else if (score <= 3) {
            return (
                <div className={classNames(styles.secureContainer, styles.mediocre)}>
                    <p className={styles.secureTitle}>Matig wachtwoord</p>
                    <p className={styles.secureParagraph}>Maak gebruik van speciale tekens, hoofdletters en cijfers</p>
                    <div className={styles.secureBarContainer}>
                        <div className={styles.secureBar} style={{ width: `${(score / 6) * 100}%` }} />
                    </div>
                </div>
            )
        }

        return (
            <div className={classNames(styles.secureContainer, styles.strong)}>
                <p className={styles.secureTitle}>Sterk wachtwoord</p>
                <p className={styles.secureParagraph}>Maak gebruik van speciale tekens, hoofdletters en cijfers</p>
                <div className={styles.secureBarContainer}>
                    <div className={styles.secureBar} style={{ width: `${(score / 6) * 100}%` }} />
                </div>
            </div>
        )
    }
}

export default PasswordStrengthBar
