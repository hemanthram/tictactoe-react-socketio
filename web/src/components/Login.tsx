import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const Login = () => {
    const [name, setName] = useState('')
    const [room, setRoom ] = useState('')

    useEffect(() => {
    if( window.localStorage )
    {
        if( !localStorage.getItem('firstLoad') )
        {
        localStorage['firstLoad'] = true;
        window.location.reload();
        }
        else
        localStorage.removeItem('firstLoad');
    }
    },[])

    return (
        <div>
            <h1>#TicTacToe</h1>
            <form>
              <p><span className="head1">Instructions</span><br/>Please provide your player name and the room name, and share the room name with your friend. <br/>Once they log in with the same room name, you can start playing !</p>
              <br></br>
              <div className="row">
                <div className="col 50">
                  <input type = 'text' placeholder = 'Name' value = {name} onChange = { ({target}) => setName(target.value) }  />
                </div>
                <div className="col 50">
                  <input type = 'text' placeholder = "Room Name" value = {room} onChange = { ({target}) => setRoom(target.value) } />
                </div>
                <div className="col 50">
                  <Link onClick={(e) => (!name || !room) ? e.preventDefault():null } to={`/game?name=${name}&room=${room}`}>
                      <button type='submit'>Login</button>
                  </Link>
                </div>
              </div>
            </form>
        </div>
    )
}
