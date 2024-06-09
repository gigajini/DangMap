import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { MapProvider } from "../../contexts/MapContext";

const Layout = ({ children }) => {
    return (
        <BrowserRouter>
            <Header />
            <MapProvider>
                <Main>{children}</Main>
                <Footer />
            </MapProvider>
        </BrowserRouter>
    );
};

export default Layout;
