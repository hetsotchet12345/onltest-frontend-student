import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useDispatch} from "react-redux";
import {logoutRequest} from "../../../redux/user/actions/auth.actions";
import {replace, capitalize} from 'lodash';

import {
    BellIcon,
    KeyIcon,
    LogoutIcon,
    SearchIcon,
    UserIcon
} from '@heroicons/react/outline';

import {NavItem, NavDropdown} from "../../base/nav";
import nav from "../../_nav";

const Header = () => {
    const dispatch = useDispatch();
    const [isShowAvatarDropdown, setShowAvatarDropdown] = useState(false);
    const [cookies] = useCookies(['user_info']);
    const [user, setUser] = useState({username: '', role: ''});

    useEffect(() => {
        const userInfo = cookies['user_info'];
        if (userInfo) {
            const {username, roles = []} = userInfo;
            const roleName = capitalize(replace(roles[0].name, 'ROLE_', ''));
            if (username && roles) {
                setUser({username, role: roleName});
            }
        }
    }, [cookies]);

    const handleClickAvatar = () => setShowAvatarDropdown(!isShowAvatarDropdown);

    const handleLogout = () => dispatch(logoutRequest());

    return (
        <div className="fixed w-full ml-0 mr-0 max-w-full min-w-max">
            <header className="flex bg-white border-b shadow">
                <div className="container mx-auto">
                    <div className="flex items-center h-full">
                        <Link className="whitespace-nowrap font-bold" to="/">TEST MAKER</Link>
                        <form className="flex items-center ml-14 mr-5">
                            <div className="flex items-center border-b-2 border-purple-600">
                                <SearchIcon width="20px" height="20px" color="#6E6B7B"/>
                                <input
                                    className="outline-none"
                                    type="text"
                                    id="fast-search"
                                    name="fast-search"
                                    placeholder="Search Here..."/>
                            </div>
                        </form>
                        <ul className="flex items-center ml-auto space-x-5">
                            <li className="relative ml-1.5 mr-1.5">
                                <Link className="block whitespace-nowrap text-purple-800"
                                      to="/">
                                    <BellIcon width={'26.4px'} height={'30.168px'} color={'#6E6B7B'}/>
                                    <div className="flex">
                                        <span
                                            className="animate-ping absolute top-1 right-1 inline-flex rounded-full w-2 h-2 bg-pink-500"/>
                                        <span
                                            className="absolute top-1 right-1 inline-flex rounded-full w-2 h-2 bg-pink-600"/>
                                    </div>
                                </Link>
                            </li>
                            <li className="relative">
                                <div className="flex items-center space-x-3">
                                    <Link to="#">
                                        <span className="whitespace-nowrap">{user.username}</span>
                                        <div className="flex items-center justify-end space-x-1.5">
                                            <span>{user.role}</span>
                                        </div>
                                    </Link>
                                    <div className="relative inline-block text-left object-contain h-9 w-9">
                                        <button className="block text-left w-screen"
                                                type="button"
                                                onClick={handleClickAvatar}>
                                            <img className="rounded-full h-9 w-9"
                                                 src={'images/dat-tran.jpg'}
                                                 alt="Dat Tran"/>
                                            <div className="absolute bottom-0 right-0">
                                                <div className="rounded-full w-2 h-2 bg-green-500 ring-2 ring-white"/>
                                            </div>
                                        </button>
                                        {isShowAvatarDropdown && (
                                            <div
                                                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                                            >
                                                <div className="py-1">
                                                    <Link className="nav-animation"
                                                          role="menuitem"
                                                          id="menu-item-0"
                                                          to="/">
                                                        <UserIcon className="h-5 w-5"/>
                                                        <span>Edit Profile</span>
                                                    </Link>
                                                    <Link className="nav-animation"
                                                          role="menuitem"
                                                          id="menu-item-1"
                                                          to="/">
                                                        <KeyIcon className="h-5 w-5"/>
                                                        <span>Change Password</span>
                                                    </Link>
                                                </div>
                                                <div className="py-1">
                                                    <Link className="nav-animation"
                                                          role="menuitem"
                                                          id="menu-item-2"
                                                          to={'/'}
                                                          onClick={handleLogout}>
                                                        <LogoutIcon className="h-5 w-5"/>
                                                        <span>Logout</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            <nav className="block bg-white border-b shadow">
                <div className="flex justify-center container mx-auto max-w-6xl min-w-max h-full">
                    <ul className="flex items-center text-base text-gray-700 pl-0 mb-0 list-none space-x-4">
                        {nav.map((value, index) => {
                            if (value._tag === 'NavItem') {
                                return (
                                    <NavItem key={index}
                                             id={index}
                                             name={value.name}
                                             to={value.to}
                                             icon={value.icon}/>
                                );
                            }
                            return (
                                <NavDropdown key={index}
                                             id={index}
                                             name={value.name}
                                             to={value.to}
                                             icon={value.icon}
                                             children={value._children}/>
                            );

                        })}

                    </ul>
                </div>
            </nav>
        </div>
    );
}


export default Header;