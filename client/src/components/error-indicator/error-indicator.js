import React from "react";

import './error-indicator.scss';
import icon from './pngegg.png';

const ErrorIndicator = ({error }) => {
    return (
        <div className="error-indicator">
            <img src={icon} alt="error icon"/>
            <span className="boom">ОШИБКА!</span>
            {/*<span>что-то пошло не так ...</span>*/}
            <span>{error?.data?.message ?? 'что-то пошло не так ...'}</span>
            {/*<span>(сообщите об этом.)</span>*/}
        </div>
    );
};

export default ErrorIndicator;