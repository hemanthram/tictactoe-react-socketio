import React, { useState, useEffect } from "react"
import { faHome, faCheck, faClock, faTimes, faCircle, faDotCircle, faCircleNotch, faGenderless } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fun = (st:any) => {
    if(st === 1) return <FontAwesomeIcon icon={faTimes}/>
    else return <FontAwesomeIcon icon={faGenderless}/>
}

const fun1 = (st:any) => {
    if(st === '_') return " "
    else if(st === 'x') return <FontAwesomeIcon icon={faTimes}/>
    else return <FontAwesomeIcon icon={faGenderless}/>
}

export const Button = ({num, play, state, buttonPress, id} : any) => {
    const [buttonClass, setButtonClass] = useState("tic")

    useEffect(() => {
        if(!play) setButtonClass("tac") // not turn disabled
        if(play && state !== '_') setButtonClass("toe") // turn but disabled because already x/o
        if(play && state === '_') setButtonClass("tic") //enabled
    })

    return(
        <button className={buttonClass}
            disabled={!play || (state !== '_')}
            onClick = {(e) => {buttonPress(e,num);}}>
                <span className="whenHover">{fun(id)}</span>
                <span className="whenNotHover">{fun1(state)}</span>
        </button>
    )
}
// {(!play || (state!=='_')) ? "tuc" : "tic"}