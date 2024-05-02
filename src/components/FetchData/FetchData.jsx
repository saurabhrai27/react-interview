import { useEffect, useState } from "react"
import axios from "axios"

function FetchData() {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts/1')
            .then((res) => {
                setLoading(false);
                setPost(res.data);
                setError('')
            }).catch((err) => {
                setLoading(false);
                setPost({})
                setError(err.message);
            })
    }, [])
    return (
        <div>
            {loading ? "Loading..." : post.title}
            {error ? error : null}
        </div>
    )
}

export default FetchData;