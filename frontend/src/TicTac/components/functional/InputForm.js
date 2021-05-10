import React from 'react';
import Input from './Input.js'
import ChoiceButton from './ChoiceButton'

const InputForm = (props) => {
    const {stepBack, onSubmit, onTyping, newGame, name, room} = props
    

    if (newGame){
        return (
            <div className="w-full absolute h-screen flex items-center justify-center">
                <div className="max-w-sm mx-4 p-6 shadow-lg rounded-md">
                <h1 className="font-hairline mb-2 text-4xl">QuizaPay</h1>
                    <Input 
                    name='name'
                    placeholder='Your Name...'
                    onChange = {onTyping}
                    value = {name}
                    />
                    <ChoiceButton type='purple' choice='submit' onChoice={onSubmit} label="Let's Go"/>
                    <hr className="my-2" />
                    <ChoiceButton dimenssion="w-full" type='teal' choice='back' onChoice={stepBack} label='Back'/>
                </div>
            </div>
        );
    }else{
        return (
            <div className="w-full absolute h-screen flex items-center justify-center">
                <div className="max-w-sm mx-4 p-6 shadow-lg rounded-md">
                    <h1 className="font-hairline mb-2 text-4xl">QuizaPay</h1>
                    <Input
                    large="true" 
                    name='name'
                    placeholder='Your Name...'
                    onChange = {onTyping}
                    value = {name}
                    />
                    <hr className="my-1" />
                    <Input
                    large="true" 
                    name='room'
                    placeholder='Room ID...'
                    onChange = {onTyping}
                    value = {room}
                    />
                        <ChoiceButton dimenssion="w-full" type='purple' choice='submit' onChoice={onSubmit} label="Let's Go"/>
                        <hr className="my-2" />
                        <ChoiceButton dimenssion="w-full" type='teal' choice='back' onChoice={stepBack} label='Back'/>
                </div>
            </div>
        );
    }
    
}

export default InputForm;
