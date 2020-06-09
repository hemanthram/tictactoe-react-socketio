import React, { useState, useEffect } from "react"
import { faHome, faCheck, faClock, faTimes, faCircle, faDotCircle, faCircleNotch, faGenderless } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fun = (st:any) => {
    if(st === 'x') return  
    else if(st === 'o') return 
    else return 
}

export const Button = ({num, play, state, buttonPress, id} : any) => {
    const [buttonClass, setButtonClass] = useState("tic"+" "+id)

    useEffect(() => {
        if(!play) setButtonClass("tic not_turn_disabled") // not turn disabled
        if(play && state !== '_') setButtonClass("tic turn_but_disabled") // turn but disabled because already x/o
        if(play && state === '_') setButtonClass("tic") //enabled
    })

    return(
        <button className={buttonClass}
            disabled={!play || (state !== '_')}
            onClick = {(e) => {buttonPress(e,num);}}>
                {id===2?<FontAwesomeIcon icon={faGenderless}/>
                :<FontAwesomeIcon icon={faTimes}/>}
        </button>
    )
}
// {(!play || (state!=='_')) ? "tuc" : "tic"}