import React from "react";
import './style.scss';


class TextAreaComponent extends React.Component {

    /**
     * 
     * @param {*
     *      style,
     *      label,
     *      value,
     *      onSave
     * } props 
     */

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        }
    }

    render() {
        return (<div className='hor-row textarea-type-container-main'
            style={this.props.style} >
                <textarea type = 'text' rows={5} placeholder = { this.props.placeholder}/>
        </div>
        )
    }
}
export default TextAreaComponent;