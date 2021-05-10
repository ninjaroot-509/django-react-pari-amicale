import React from 'react';

const Input = (props) => {
    const {name, placeholder, value, onChange, large} = props
    return (
        <input className={`${large === 'true'? 'w-full' : '' } p-2 shadow rounded${large === 'true'? '' : '-l' } text-sm`} autoComplete='off' type="text" name={name} id={name} placeholder={placeholder} value={value} onChange={onChange}/>
    );
}

export default Input;
