import React, { useEffect, useState } from "react"
import queryString from "query-string"
import io from "socket.io-client"
import { Game } from "./Game";
import { Link } from "react-router-dom";
// const ENDPOINT = "http://localhost:8080/"
const ENDPOINT = "https://calm-peak-18206.herokuapp.com/"

let socket:any;

export const Messages = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [id, setId] = useState(-1)
    const [game, setGame] = useState(false)
    const [play, setPlay] = useState(false)
    const [state, setState] = useState(['_','_','_','_','_','_','_','_','_'])
    const [gameOver, setgameOver] = useState(false)
    const [winner, setWinner] = useState(0)
    const [users, setUsers] = useState([''])
    const [userLeft, setUserLeft] = useState(false)

    useEffect(() => {
        socket = io(ENDPOINT)
        const { name, room }:any = queryString.parse(window.location.search);
        setName(name); setRoom(room)
        socket.emit('join', name, room, (error:any) => {
            console.log(error)
            alert(error)
            window.location.pathname = '/'
        })
    },[ENDPOINT,window.location.search])

    useEffect(() => {
        socket.on('assignPlayer', ( {assign}:any) => { setId(assign) })
        socket.on('game', (usersinroom:string[]) => {
            setGame(true)
            setUsers(usersinroom)
        })
        socket.on('turnChange', ( {turn}:any ) => {
            if((turn+1) === id) setPlay(true)
            else setPlay(false)
        })
        socket.on('stateChange', ( tmp:number[] ) => {
            setState(tmp.map((item) => {
                if(item === -1) return '_'
                else if(item === 0 ) return 'x'
                else return 'o'
            }))
        })
        socket.on('userLeft', () => {
            socket.disconnect()
            setGame(false)
            setgameOver(false)
            setUserLeft(true)   
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
            <h2>Room : {room}</h2>
            {(id === -1 && !userLeft) ? <p>Loading</p> : <p>Your are player : {id===1 ? "X" : "O"}</p>}
            {game && 
                <div>
                    <h3>Players in Room</h3>
                    <p>You - {users[id-1]} - Player {id-1 ? 'O' : 'X'}</p>
                    <p>Opponent - {users[(id-1)^1]} - Player {(id-1)^1 ? 'O' : 'X'} </p>
                </div>}
            {game  ? <Game play={play} state={state} buttonPress ={buttonPress}/> : !userLeft && <p>Waiting for Opponent to Join</p>}
            {(game && !gameOver) && (play ? <p>Your Turn</p> : <p>Opponent's turn</p>)}
            {gameOver &&
            (<div>
                <p>Game Over</p>
                <div>{
                    (winner===2)?<p>Game Draw</p> : (winner!==(id-1))? <p>You Lose</p> : <p>You Win</p>
                }</div>
                <button onClick={Login}>Login Again</button>
            </div>)}
            {userLeft && 
            <div>
                <p>Your Opponent Left</p>
                <Link to='/'>Login Again</Link>
            </div> }
        </div>
    )
}