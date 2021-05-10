import React from 'react';
import ChoiceButton from './ChoiceButton'

const Choice = ({onChoice}) => {
    return (
        <>
        <div className="w-full absolute h-screen flex items-center justify-center">
            <div className="max-w-sm mx-4 p-6 shadow-lg rounded-md">
            <h1 className="font-hairline mb-2 text-4xl">QuizaPay</h1>
            <ChoiceButton onChoice={onChoice} type='purple' choice='new' label='créer un nouveau jeu'/> 
            <hr className="my-2" />
            <div className="font-bold mx-2">Lancer une partie:</div>
            <ChoiceButton onChoice={onChoice} type='teal' choice='join' label='rejoindre une partie'/> 
            </div>
        </div>
        </>
    );
}

export default Choice;
