import { useReducer, useEffect } from "react"
import axios from "axios"

const initialState = {
    loading: true,
    post: {},
    err: null,
}
const fetchDataReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                post: action.payload,
                err: null
            }

        case 'FETCH_ERROR':
            return {
                loading: false,
                post: {},
                err: action.payload
            }
        default:
            return state
    }
}
function FetchDataWithUseReducer() {
    const [state, dispatch] = useReducer(fetchDataReducer, initialState);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
            .then(res => {
                console.log(res);
                dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
            }).catch(err => {
                dispatch({ type: 'FETCH_ERROR', payload: err.message })
            })
    }, [])
    return (
        <div>{state.loading ? 'Loading...' : state.post.title}
            {state.err ? state.err : null}
        </div>
    )
}

export default FetchDataWithUseReducer