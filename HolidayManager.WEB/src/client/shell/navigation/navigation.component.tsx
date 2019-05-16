import * as React from 'react';
import LayoutContainer from '../../layout';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../context/appContext';
import Logo from "../../../assets/icons/menu.svg";
import { Role } from '../../models/models';
import SvgIcon from '../../shared/svg-icon';

interface INavigationProps {
    mobile: boolean;
}

const Navigation: React.FunctionComponent<INavigationProps> = ({mobile}) => {
const { isAuth, logout, role} = React.useContext(AppContext);
const [ isMenuOpen, setIsMenuOpen ] = React.useState<boolean>(false);
const className = mobile ? "navigation--mobile" : "navigation";

const signOut = () => {
    logout();
    localStorage.removeItem("token");
}

const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
}

const Links = () => {
    if ( isAuth ) {
        return (
            <React.Fragment>
                <NavLink onClick={toggleMenu} exact={true} activeClassName="link--active" className={`${className}__link`} to="/">Home</NavLink>
                <NavLink onClick={toggleMenu} activeClassName="link--active" className={`${className}__link`} to="/holiday-request">My Requests</NavLink>
                <NavLink onClick={toggleMenu} activeClassName="link--active" className={`${className}__link`} to="/add-request">Add Request</NavLink>
                {role !== Role.developer && 
                    // <NavLink onClick={toggleMenu} activeClassName="link--active" className={`${className}__link`} to="/overview">Overview</NavLink>
                    <NavLink onClick={toggleMenu} activeClassName="link--active" className={`${className}__link`} to="/pending">Pending Requests</NavLink>
                }
                <div className={`${className}__link`} onClick={signOut} > Logout </div> 
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <NavLink onClick={toggleMenu} exact={true} activeClassName="link--active" className={`${className}__link`} to="/">Home</NavLink>
                <NavLink onClick={toggleMenu} activeClassName="link--active" className={`${className}__link`} to="/login">Login</NavLink>
            </React.Fragment>
        )
    }
}

    return (
        <LayoutContainer>
            { !mobile ?
                (
                <div className={className}>
                    <NavLink exact={true} className={`${className}__logo`} to="/">IMPACT</NavLink>
                    <div className={`${className}__links`}>
                        <Links />
                    </div>
                </div>
                ) : 
                (
                    <div className={`${className}`}>
                        <div onClick={toggleMenu}>
                            <SvgIcon className={`${className}__icon`} iconName="menu" />
                        </div>
                        <NavLink to="/" className={`${className}__logo`}>IMPACT</NavLink>
                        { isMenuOpen && (
                            <div className={`${className}__menu`}>
                                <div className={`${className}__close`} onClick={toggleMenu}>
                                    <SvgIcon iconName="back" />
                                    Luk
                                </div>
                                <div className={`${className}__links`}>
                                    <Links />
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        </LayoutContainer>
);
};

export default Navigation;