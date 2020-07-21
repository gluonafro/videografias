import React, {useEffect } from 'react'

export default props => {
    const {Carousel, carouselState, wheel, length, setActive, next, previous} = props
    console.log('/*********START**********/')
    console.log(props)

    useEffect(() => {
        if (wheel.move > 0) next()
        if (wheel.move < 0) previous()
    }, [wheel.on])

    useEffect(() => {
        let active = carouselState.currentSlide - 2
        let realActive = active < 0 ? active + length : active >= length ? active - length : active
        setActive(realActive)
    }, [carouselState.currentSlide])
    console.log('/*********END**********/')
    return null
}