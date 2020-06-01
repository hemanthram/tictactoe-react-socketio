import React, { useState } from "react"
import { Link } from "react-router-dom"

export const Login = () => {
    const [name, setName] = useState('')
    const [room, setRoom ] = useState('')
    return (
        <div>
            <h1>LOGIN</h1>
            <input
                type = 'text'
                placeholder = 'Enter Name'
                value = {name}
                onChange = { ({target}) => setName(target.value) }  /> 
            <input
                type = 'text'
                placeholder = "Enter Room"
                value = {room}
                onChange = { ({target}) => setRoom(target.value) } />
            <Link onClick={(e) => (!name || !room) ? e.preventDefault():null } to={`/game?name=${name}&room=${room}`}>
                <button type='submit'>Login</button>
            </Link>
        </div>
    )
}