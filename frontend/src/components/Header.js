import { Link, useLocation } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import BurgerMenu from './BurgerMenu';

function Header({ loggedIn, userEmail, handleSingOut }) {
  const [burgerOpen, setBurgerOpen] = useState(false);

  const location = useLocation();

  const title = location.pathname === '/sign-up' ? 'Вход' : 'Регистрация';
  const path = location.pathname === '/sign-up' ? '/sign-in' : '/sign-up';

  const handleOut = () => {
    setBurgerOpen(false);
    handleSingOut();
  };

  return (
    <>
      <BurgerMenu
        burgerOpen={burgerOpen}
        userEmail={userEmail}
        handleOut={handleOut}
      />
      <header className='header'>
        <div className='header__logo'></div>
        {loggedIn ? (
          <>
            <div className='header__wrap'>
              <p className='header__email'>{userEmail}</p>
              <button onClick={handleOut} className='header__link-in'>
                Выйти
              </button>
            </div>
            <div
              onClick={() => setBurgerOpen(!burgerOpen)}
              className='header__mobile-btn'
            >
              {burgerOpen ? (
                <AiOutlineClose size={25} />
              ) : (
                <AiOutlineMenu size={25} />
              )}
            </div>
          </>
        ) : (
          <Link className='header__link' to={path}>
            {title}
          </Link>
        )}
      </header>
    </>
  );
}

export default Header;
