import {useEffect, useState} from "react"

let count = 0
function Counter() {
    count++
    return <div>{count}</div>
}



function RandomColor() {
    const color = `#${Math.floor(Math.random() * 12345).toString(16)}`
    return <div style={{backgroundColor:color}}> Random Color</div>
}





function Clock() {
    const time = new Date().toLocaleTimeString()
    return <div> Current time: {time}</div>
}



function UserProfile({userId}) {
    const [ user, setUser ] = useState(null)
    useEffect(() => {
        fetch('/api/user' + userId).then(res => res.json()).then(setUser)
    }, [])
    return <div> {user?.name}</div>
}