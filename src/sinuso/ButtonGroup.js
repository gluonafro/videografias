import React from 'react'
import Slider from '../components/Slider'
import ZoomButton from '../components/ZoomButton'
import Scroll from '../components/Scroll'

const ButtonGroup = props => {
    return (
        <React.Fragment>
            {/* <Slider {...props} /> */}
            <ZoomButton {...props}/>
            <Scroll {...props} />
        </React.Fragment>
    )
}

export default ButtonGroup;