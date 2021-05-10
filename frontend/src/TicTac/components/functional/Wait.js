import React, {useRef} from 'react';

const Wait = ({room, display}) => {
    const textArea = useRef(null)
    const onClick = () =>{
        textArea.current.select()
        document.execCommand('copy')
    }

    return (
        <div className='wait' style={{display:display?'flex':'none', maxWidth: '-webkit-fill-available', maxHeight: '-webkit-fill-available'}}>
            <h1 className="wait-message">En attente de la connexion du deuxieme joueur...</h1>
            <div className="copy">
                <h1 className='copy-message'>Donnez à votre ami l'identifiant de salle suivant pour se connecter</h1>
                <div className='copy-container'>
                    <input ref={textArea} readOnly={true} value={room} className='copy-area'/>
                    <button className='copy-button' onClick={onClick}>Copier</button>
                </div>
            </div>
        </div>
    );
}

export default Wait;
