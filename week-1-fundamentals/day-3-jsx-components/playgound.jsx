function Example() {
    return <div>
        Hello
    </div>
}


/*


=> turned into an object which is a react element object


 Under the hood:
{
  type: 'h1',
  props: {
    children: 'Hello'
  },
  key: null,
  ref: null
}

How is useRef useful here?
1. useRef is handy in engaging dom element directly.
2. Any mutable values that don't trigger re-renders.
3. returns an object with current property
4. changing ref.current doesn't trigger re-render
5. ref persist across component re-renders.
6. perfect for dom manipulation, storing interval/timeout IDS or keeping tack of previosu values.


*/




//deterministic
function Pure1({name}) {
    return <div>{name}</div>
}

//same props same result
function Price({amount, taxRate}) {
    const total = amount + (amount * taxRate)
    return <div>{total}</div>
}

//React.memo makes component only re-render when props change

import {memo, useEffect, useState} from 'react'
const PureUserCard = memo((name, email) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>{email}</p>
        </div>
    )
})




/*



Impure components:

Impure component has side effects or produces differnt outputs with the same inputs

*/

function CurrentTime() {
    const now = new Date()

    return <div>{now.toLocaleDateString()}</div>
}

//impure has side effects api call
function UserProfile({userId}) {
    const [ user, setUser ] = useState(null)

    useEffect(() => {
        fetch(`/api/users/${userId}`).then(res => res.json()).then(setUser)
    }, [ userId ])

    return <div> {user.username}</div>
}

let count = 0
function ClickCounter() {
    count++
    return <div>{count}</div>
}