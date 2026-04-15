import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import nav from '../Assets/image/menu-btn.svg';

function Header() {
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const update = () => {
      const favs = JSON.parse(localStorage.getItem('favs')) || [];
      setFavCount(favs.length);
    };
    update();
    window.addEventListener('storage', update);
  }, []);

  return (
    <div className='header'>
      <div className="header-left">
        <nav className='header-nav'>
          <Link to="/"><img src={nav} alt="menu" /></Link>
        </nav>
        <Link to='/categories' className="all-news-btn">Все новости</Link>
      </div>
      <div className="header-right">
        <Link to="/login" className="auth-link">Войти</Link>
        <Link to="/register" className="auth-btn">Регистрация</Link>
        <div className="header-divider"></div>
        <Link to="/?category=favorites" className="fav-counter">
          ⭐ <span className="badge">{favCount}</span>
        </Link>
      </div>
    </div>
  );
}
export default Header;