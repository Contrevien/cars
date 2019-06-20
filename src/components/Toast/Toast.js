import React from 'react';
import './Toast.css';

const Toast = (props) => {
    return (
        <div className="Backdrop" onClick={props.close}>
            <div className="Toast">
            <span 
                className="AddCar-close" 
                title="Remove"
                onClick={props.close}>
                    &#10006;
                </span>
            <p>{props.message}</p>
            </div>
        </div>
    )
}

export default Toast;