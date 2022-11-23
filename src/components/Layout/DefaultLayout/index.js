import Header from "./Header";
import Sidebar from "./Sidebar";
import Banner from "./Banner"

function DefaultLayout({ children }) {

    return (
        <div style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif', }}>
            <header >
                <Header />
                <Sidebar />

            </header>
            <Banner />
            <div className="content">
                {children}
            </div>

        </div>
    )
}

export default DefaultLayout;