import React from "react"
import { Button } from "./Button"

export const Game = ({play, state, buttonPress, id}:any) => {
    return(
        <div className="gamesub">
            <div>
                <Button
                    play={play} 
                    state={state[0]}
                    buttonPress={buttonPress}
                    id = {id}
                    num = {0}
                />
                <Button 
                    play={play} 
                    state={state[1]}
                    buttonPress={buttonPress}
                    id = {id}
                    num = {1}
                />
                <Button 
                    play={play} 
                    state={state[2]}
                    buttonPress={buttonPress}
                    id = {id}
                    num = {2}
                />
            </div>
            
            <div>
                <Button 
                    play={play} 
                    state={state[3]}
                    buttonPress={buttonPress}
                    id = {id}
                    num = {3}
                />
                <Button 
                    play={play} 
                    state={state[4]}
                    buttonPress={buttonPress}
                    id = {id}
                    num = {4}
                />
                <Button 
                    play={play} 
                    state={state[5]}
                    buttonPress={buttonPress}
                    id = {id}
                    num = {5}
                />
            </div>  

            <div>
                <Button 
                    play={play} 
                    state={state[6]}
                    buttonPress={buttonPress}
                    id = {id}
                    num = {6}
                />
                <Button 
                    play={play} 
                    state={state[7]}
                    id = {id}
                    buttonPress={buttonPress}
                    num = {7}
                />
                <Button 
                    play={play} 
                    state={state[8]}
                    buttonPress={buttonPress}
                    id = {id}
                    num = {8}
                />
            </div>
        </div>
    )
}


            {/* <ul style={{listStyleType:"none"}}>
            {state && state.map((item:any, i:number) => {
                
                return(
                    <div key = {i}>
                        {i%3 ===0 && <p>&nbsp;</p>}
                        <li style={{float:"left"}}>
                        <Button 
                            play={play} 
                            state={item}
                            buttonPress={buttonPress}
                            num = {i}
                        />
                        </li>
                    </div> )
            }
            )}
            </ul>
            <br /> */}  