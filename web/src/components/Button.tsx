import React from "react"

export const Button = ({num, play, state, buttonPress} : any) => {
    return(
        <button
            disabled={!play || (state !== 'n')}
            onClick = {(e) => buttonPress(e,num)}>
        {state}</button>
    )
}