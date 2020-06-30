import React from 'react'
import Slider from '../components/Slider'
import ZoomButton from '../components/ZoomButton'

const ButtonGroup = props => {
    return (
        <React.Fragment>
            <Slider {...props} />
            <ZoomButton {...props}/>
        </React.Fragment>
    )
}

export default ButtonGroup;