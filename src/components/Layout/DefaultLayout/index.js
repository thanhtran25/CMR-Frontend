import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Banner from "./Banner"

function DefaultLayout({ children }) {
    const mystyle = {
        border: '0px',
        width: '100%',
        position: 'fixed',
        display: 'block',
        zIndex: '15',
    }
    return (
        <div>
            <header style={mystyle}>
                <Header />
                <Sidebar />

            </header>
            <Banner />
            <div className="content">
                {children}
            </div>
            <Footer />

        </div>
    )
}

export default DefaultLayout;