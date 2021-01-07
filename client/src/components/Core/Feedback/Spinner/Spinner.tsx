import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import lottie, { AnimationItem } from 'lottie-web/build/player/lottie_light' // Using light version for lighter bundle

import styles from './Spinner.module.scss'
import useCountDown from '../../../../utils/useCountDown'
import pageSpinnerData from '../../../../assets/animations/pageSpinner.json'
import simpleSpinnerData from '../../../../assets/animations/simpleSpinner.json'

interface Props {
    uniqueKey: number
    className?: string
    delayed?: boolean
    small?: boolean
    large?: boolean
    slow?: boolean
    pageSpinner?: boolean
}

const Spinner: React.FunctionComponent<Props> = props => {
    const { delayed, uniqueKey, pageSpinner } = props
    const [animation, setAnimation] = useState<AnimationItem>()

    const spinnerClassName = getClassName()
    const animationData = pageSpinner ? pageSpinnerData : simpleSpinnerData
    const elementId = `animation-container-${uniqueKey}`

    const memoizedAnimation = useCallback(() => {
        const container = document.getElementById(elementId)
        if (!container) {
            return
        }

        const animation: AnimationItem = lottie.loadAnimation({
            container,
            loop: true,
            autoplay: true,
            animationData,
        })

        return animation
    }, [elementId, animationData])

    useEffect(() => {
        if (!animation) {
            setAnimation(memoizedAnimation())
        }
    }, [animation, memoizedAnimation])

    const countDownTime = delayed ? 10000 : 0
    useCountDown(countDownTime, timeoutCallback)

    return <div className={spinnerClassName} id={elementId} />

    function getClassName() {
        const { className, small, large } = props

        return classNames(styles.spinner, className, {
            [styles.isSmall]: small,
            [styles.isLarge]: large,
        })
    }

    function timeoutCallback() {
        const { slow } = props
        const speed = slow ? 0.6 : 1

        if (animation) {
            animation.setSpeed(speed)
            animation.play()
        }
    }
}

export default Spinner
