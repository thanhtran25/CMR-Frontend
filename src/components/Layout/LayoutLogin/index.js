import Header from "./Header";
import Sidebar from "./Sidebar";

function LayoutLogin({ children }) {

    return (
        <div style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif', }}>
            <header >
                <Header />
                <Sidebar />

            </header>
            <div className="content">
                {children}
            </div>

        </div>
    )
}

export default LayoutLogin;