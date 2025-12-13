
function TransitionExample() {
    const [ input, setInput ] = useState('')
    const [ list, setList ] = useState([])
    const [ isPending, startTransition ] = useTransition()


    const handleChange = (e) => {
        setInput(e.target.value)
        startTransition(() => {
            const newList = Array.from({length: 20000}, (_, i) => ({id: i}))
            setList(newList)
        })
    }
}