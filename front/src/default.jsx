import { useNavigate } from "react-router-dom"



export default function Default() {
    const navigate = useNavigate()
    return (
        <>
            <article style={{ padding: "100px" }}>
                <h1>Default Page</h1>
                <p>default page</p>
                <div>cool brand information</div>
                <div>nice pictures</div>
                <button onClick={() => navigate("/signin")}>
                 Sign In
                </button>
            </article>
        </>
    )
}