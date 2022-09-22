import React from "react";
import './style.scss';


class InputComponent extends React.Component {

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
        return (<div className='hor-row input-type-container-main'
            style={this.props.style} >
                {this.props.label && <div className="hor-row label-text">
                    { this.props.label }
                </div>}
                <input type = { this.props.type } 
                placeholder = { this.props.placeholder}
                value={this.props.value}
                id = { this.props.inputID }
                onChange={(event) => this.props.onChange(event.target.value)}
                onKeyPress={(event) => {
                    if (this.props.onSave && event.key === 'Enter') {
                        this.props.onSave();
                    }
                }}
                />
                {this.props.error && <div className="hor-row error-text">
                    { this.props.error }
                </div>}


        </div>
        )
    }


}
export default InputComponent;
