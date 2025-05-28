import React, { useState, useContext } from 'react'
import '../css/Navbar.css'
import search_icon from '../assets/search_icon.png'
import basket_icon from '../assets/basket_icon.png'
import profile_icon from '../assets/profile_icon.png'
import logout_icon from '../assets/logout_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import { toast } from 'react-toastify'

const Navbar = ({setShowLogin}) => {

	const [ menu, setMenu ] = useState('home')
	const { token, setToken } = useContext(StoreContext)
	const navigate = useNavigate()
	
	const logout = () => {
		localStorage.removeItem('token')
		setToken("")
		navigate('/')
		toast.error('User Logged Out Successfully')
	}

  return (
    <div className="navbar">
			<Link to='/'><img src="/logo.png" alt="" className='logo' /></Link>
			<ul className="navbar-menu">
				<Link to='/' onClick={() => setMenu('home')} className={menu==='home'?'active':""}>home</Link>
				<a href="#explore-packages" onClick={() => setMenu('packages')} className={menu==='packages'?'active':""}>packages</a>
				<a href="#app-download" onClick={() => setMenu('mobile-app')} className={menu==='mobile-app'?'active':""}>mobile-app</a>
				<a href="#footer" onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ""}>contact-us</a>
			</ul>
			<div className="navbar-right">
				<img src={search_icon} alt="" className='search-icon' />
				<div className="navbar-search-icon">
					<Link to='/cart'><img src="basker_icon.png" alt="" /></Link>
				</div>
				{!token ? <button onClick={() => setShowLogin(true)}>register</button>
				: <div className='navbar-profile'>
					<img src={profile_icon}></img>
					<ul className="nav-profile-dropdown">
						<li onClick={() => navigate('/myorders')}><img src={basket_icon} /><p>Orders</p></li>
						<hr />
						<li onClick={logout}><img src={logout_icon} alt="" /><p>Logout</p></li>
					</ul>
					</div>}
			</div>
    </div>
  )
}

export default Navbar
