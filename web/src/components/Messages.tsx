import React, { useEffect, useState } from "react"
import queryString from "query-string"
import io from "socket.io-client"
import { Game } from "./Game";
const ENDPOINT = "http://localhost:8080/"
let socket:any;

export const Messages = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [id, setId] = useState(0)
    const [game, setGame] = useState(false)
    const [play, setPlay] = useState(false)
    const [state, setState] = useState(['n','n','n','n','n','n','n','n','n'])
    const [gameOver, setgameOver] = useState(false)
    const [winner, setWinner] = useState(0)

    useEffect(() => {
        socket = io(ENDPOINT)
        const { name, room }:any = queryString.parse(window.location.search);
        setName(name); setRoom(room)
        socket.emit('join', name, room, (error:any) => {
            console.log(error)
            alert(error)
            window.location.pathname = '/'
        })
    },[ENDPOINT])

    useEffect(() => {
        socket.on('assignPlayer', ( {assign}:any) => { setId(assign) })
        socket.on('game', () => setGame(true))
        socket.on('turnChange', ( {turn}:any ) => {
            if((turn+1) === id) setPlay(true)
            else setPlay(false)
        })
        socket.on('stateChange', ( tmp:number[] ) => {
            setState(tmp.map((item) => {
                if(item === -1) return 'n'
                else if(item === 0 ) return 'x'
                else return 'o'
            }))
        })
        socket.on('userLeft', () => {
            window.location.pathname = 'left'
        })
        socket.on('gameOver', (winner:number) => {
            setPlay(false)
            setgameOver(true)
            setWinner(winner)
        })
    })
    
    const Login = () => {
        window.location.pathname = '/'
    }

    const buttonPress = (e:any,x:number) => {
        e.preventDefault();
        socket.emit('play', {room, id, pos:x})
    }

    return(
        <div>
            <h1>Hi {name}</h1>
            <h4>Room : {room}</h4>
            <p>Your ID : {id}</p>
            {game && <Game play={play} state={state} buttonPress ={buttonPress}/>}
            {gameOver &&
            (<div>
                <p>Game Over</p>
                <p>Winner is {winner}</p>
                <button onClick={Login}>Login Again</button>
            </div>)}
        </div>
    )
}