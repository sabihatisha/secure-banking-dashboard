import React, { useState, useEffect } from 'react'
import './style.scss'
import axios from 'axios'
import Icon from 'react-icons-kit'
import { api } from '../../utils/api'
import { NavLink, useHistory } from 'react-router-dom'
import {
    ic_dashboard,
    ic_people,
    ic_keyboard_arrow_right,

} from 'react-icons-kit/md'
import { standby } from 'react-icons-kit/iconic'
import {userTie} from 'react-icons-kit/icomoon/userTie'


import Navbar from '../navbar/Index'
import { handleError } from '../../utils/Error'


const Layout = () => {
    const history = useHistory()
    const [show, setShow] = useState(false)
    const [isMenu, setMenu] = useState(false)
    const [loggingOut, setLoggingOut] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [messages, setMessages] = useState([])

    useEffect(() => {
        // Fetch Notifications
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${api}users`)
                if (response.status === 200) {
                    setNotifications(response.data)
                    setMessages(response.data)
                }
            } catch (error) {
                if (error) {
                    handleError(error)
                }
            }
        }

        fetchNotifications()
    }, [])

    // Toggle menu
    const toggleMenu = event => {
        let current = event.target.getAttribute("data-value")

        if (isMenu === current) {
            setMenu(false)
        } else {
            setMenu(current)
        }
    }

    // Logout
    const doLogout = () => {
        setLoggingOut(true)
        setTimeout(() => {
            setLoggingOut(false)
            localStorage.clear()
            history.push('/')
        }, 2000)
    }

    return (
        <div className="layout">

            {/* Navbar */}
            <div className="navbar-container shadow-sm">
                {notifications && messages ?
                    <Navbar notifications={notifications} messages={messages} toggle={() => setShow(!show)} />
                    : null}
            </div>

            {/* Sidebar */}
            <div className="sidebar-container">
                <div className={show ? "sidebar shadow open-sidebar" : "sidebar shadow"}>
                    <ul>
                        <li>
                            <NavLink
                                exact
                                to="/admin/"
                                activeClassName="isActive"
                                type="button"
                                className="btn shadow-none"
                            ><Icon icon={ic_dashboard} size={20} />Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink
                                exact
                                to="/admin/users"
                                activeClassName="isActive"
                                type="button"
                                className="btn shadow-none"
                            ><Icon icon={ic_people} size={20} />App Users</NavLink>
                        </li>
                        {/* client Links */}
                        <li>
                            <div className="sidebar-dropdown-container">
                                <button
                                    type="button"
                                    className="btn shadow-none"
                                    onClick={toggleMenu}
                                    data-value="client"
                                >
                                    <Icon icon={userTie} size={20} />Client
                                <Icon icon={ic_keyboard_arrow_right} size={25} className={isMenu === 'client' ? "arrow down" : "arrow"} />
                                </button>

                                <div className={isMenu === 'client' ? "sidebar-dropdown-menu" : "sidebar-dropdown-menu menu-hide"}>
                                    <NavLink
                                        exact
                                        to="/admin/client/create"
                                        activeClassName="isActive"
                                        type="button"
                                        className="btn shadow-none"
                                    >Create Client</NavLink>
                                    <NavLink
                                        exact
                                        to="/admin/client"
                                        activeClassName="isActive"
                                        type="button"
                                        className="btn shadow-none"
                                    >Show Client</NavLink>
                                </div>
                            </div>
                        </li>



                        <li>
                            <button
                                type="button"
                                className="btn shadow-none"
                                onClick={doLogout}
                                disabled={loggingOut}
                            >
                                <Icon icon={standby} size={18} />
                                {loggingOut ? <span>Logging out...</span> : <span>Logout</span>}
                            </button>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Layout;