let tmp: number | undefined;
let room:{
    name:string
    users:string[]
    board:number[]
    turn:number
}[] = []

export const addUser = (user:string, name:string ) => {
    tmp = room.findIndex((item) => {return item.name === name})
    if(tmp === -1) { 
        room.push({
            name,
            users:[user],
            board: [-1,-1,-1,-1,-1,-1,-1,-1,-1],
            turn:0
        })
        return 1;
    }
    if(room[tmp].users.length === 2) return 0;
    room[tmp].users.push(user);
    return 2;
    
}

export const setState = (name:string, id:number, pos:number) => {
    tmp = room.findIndex((item) => {return item.name === name})
    room[tmp].board[pos] = id==1 ? 0 : 1;
    // console.log(name,room[tmp].board)
    room[tmp].turn ^= 1;
    return { board: room[tmp].board, turn: room[tmp].turn};
}

export const removeRoom = (name:string) => {
    tmp = room.findIndex((item) => {return item.name === name})
    if(tmp !== -1)
    room.splice(tmp,1)
}

export const isGameOver = (board:number[]) => {
    if((board[0] !== -1) && (board[0] === board[1]) && (board[1] === board[2])) return board[0]
    if((board[3] !== -1) && (board[3] === board[4]) && (board[4] === board[5])) return board[3]
    if((board[6] !== -1) && (board[6] === board[7]) && (board[7] === board[8])) return board[6]
    if((board[0] !== -1) && (board[3] === board[0]) && (board[3] === board[6])) return board[0]
    if((board[1] !== -1) && (board[1] === board[4]) && (board[4] === board[7])) return board[1]
    if((board[2] !== -1) && (board[2] === board[5]) && (board[5] === board[8])) return board[2]
    if((board[2] !== -1) && (board[2] === board[4]) && (board[4] === board[6])) return board[2]
    if((board[0] !== -1) && (board[0] === board[4]) && (board[4] === board[8])) return board[0]
    for(let i=0; i<9; ++i) if(board[i] === -1) return -1;
    return 2;
}
