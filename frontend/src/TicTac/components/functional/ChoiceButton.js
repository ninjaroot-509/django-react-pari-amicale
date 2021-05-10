import React from 'react';

const ChoiceButton = ({type, choice, label, onChoice, dimenssion}) => {
    return (
        <button className={`${dimenssion} bg-${type}-700 hover:bg-${type}-700 text-white uppercase shadow py-2 px-4 pr-10 tracking-wide text-sm rounded-r`} onClick={onChoice.bind(this, choice)}>{label}</button>
    );
}

export default ChoiceButton;