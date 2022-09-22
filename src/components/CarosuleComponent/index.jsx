import React from 'react';
import Carousel from 'react-material-ui-carousel';
import './style.scss';

export default function CarosuleComponent(props) {

    /**
     * 
     * @param {*
     *      children: ReactNode 
     *      style,
     *      navButtonsAlwaysVisible,
     *      cycleNavigation,
     *      hideIndicatorIcon,
     *      stopAutoPlay,
     *      navButtonsProps,
     * } props 
     */


    const CustomeIndicator = () => {
        return (
            <div className='custome-indicator-main'></div>
        )
    }
    
    return (
        <div className={'carosule-component-container-main hor-row' + ( props.hideIndicatorIcon ? ' hide-carosule-indicator-icon' : '')}
            style={props.style}>
                <Carousel
                    // autoPlay = { false }
                    // autoPlay = { true }
                    autoPlay = { !props.stopAutoPlay }
                    style={props.style}
                    navButtonsAlwaysVisible = { props.navButtonsAlwaysVisible }
                    cycleNavigation = { props.cycleNavigation }
                    stopAutoPlayOnHover = { true }
                    animation = 'slide'
                    navButtonsProps = {{
                            style: props.navButtonsProps,
                            className: 'nav-button-class'
                        }
                    }
                    IndicatorIcon = {<CustomeIndicator/>}
                    activeIndicatorIconButtonProps={{
                        style: {
                            width: '15px',
                            borderRadius: '10px'
                        },
                        className: 'active-indicator-icon-button'
                    }}
                >
                    {
                        props.children
                    }
                </Carousel>
        </div>
    )
}