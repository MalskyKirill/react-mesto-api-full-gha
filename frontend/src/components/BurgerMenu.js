function BurgerMenu({ burgerOpen, userEmail, handleOut }) {

  return (
    <ul className={!burgerOpen ? 'burger' : 'burger burger_active'}>
      <li>
        <p className='header__email'>{userEmail}</p>
      </li>
      <li>
        <button onClick={handleOut} className='header__link-in'>
          Выйти
        </button>
      </li>
    </ul>
  );
}

export default BurgerMenu;
