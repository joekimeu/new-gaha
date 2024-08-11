import { Outlet } from "react-router-dom"
import Header from "./header"
import Footer from "./footer"

const Layout = () => {
    return (
        <main className="App">
            <Header />
            <Outlet />
            <Footer />
        </main>
    )
}

export default Layout