import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function Home() {
    const { logout } = useContext(AuthContext);

    return (
        <div>
            <button className="px-2 border-1 border-black rounded-md cursor-pointer" onClick={logout}>Log out</button>
            <p>Home</p>
        </div>
    )
}

export default Home