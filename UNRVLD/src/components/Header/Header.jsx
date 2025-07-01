
import logo from "../../assets/img/Logo.png"
import arrow from "../../assets/img/Arrow.png"
import './header.scss'

const Header = ({ children }) => {
    return (
        <header>

            <div className="row">
                <div className="col-8">
                    <img src={logo} className="logo" alt="logo" />
                    {children}
                </div>
                <div className="col-4 justify-right">
                    <img src={arrow} alt="down-arrow" />
                </div>
            </div>
        </header>
    );
}

export default Header