import React from "react"
import { Button } from "./Button"

export const Game = ({play, state, buttonPress}:any) => {
    return(
        <div>
            <ul style={{listStyleType:"none"}}>
            {state && state.map((item:any, i:any) => 
            <div>
                {i%3 ===0 && <p>&nbsp;</p>}
                <li style={{float:"left"}}>
                <Button 
                    play={play} 
                    state={item}
                    buttonPress={buttonPress}
                    num = {i}
                    key={i}
                />
                </li>
            </div>
            )}
            </ul>
            <p> </p>
        </div>
    )
}