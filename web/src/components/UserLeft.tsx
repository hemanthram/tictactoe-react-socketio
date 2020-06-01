import React from "react"
import { Link } from "react-router-dom"

export const UserLeft = () => {
    return (
        <div>
            <p>Your Opponent Left</p>
            <Link to='/'>Login Again</Link>
        </div>
    )
}