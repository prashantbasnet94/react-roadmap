import {useEffect, useState} from "react"

function PureCounter(intialCount = 0) {
    const [ count, setCount ] = useState(intialCount)
    return <div>
        {count}
        <button onClick={() => setCount(count + 1 )}></button>
    </div>
}

function PureRandomColor({color}) {
    return <div style={{backgroundColor: color}}>Color Box</div>
}
function App() {
    const [ color, setColor ] = useState('#ffff')
    const generateColor = () => {
        setColor(`#${Math.floor(Math.random()  * 12345).toString(16)}`)
    }
    return <div>
        <PureRandomColor color={color} />
        <button onClick={generateColor}>Generate New Color </button>
    </div>
}



function PureClock({time}) {
    return <div> {time}</div>
}

function App2() {
    const [ time, setTime ] = useState(new Date().toLocaleTimeString())
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])

    return <PureClock time ={time} />
}

function PureUserName  (userName)  {
    return <div> {userName}</div>
}


function App3({userId}) {
    const [ user, setUser ] = useState({userName : null})
    useEffect(() => {
        fetch('api/user'+ userId).then(res => res.json()).then(setUser)
    }, [])
    return <PureUserName userName = {user.userName}/>
}