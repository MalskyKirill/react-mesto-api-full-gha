import { Link } from 'react-router-dom';
import SignForm from '../components/SignForm';

function Registration({ handleRegistration }) {

  return (
    <main className='content'>
      <section aria-label='Регистрация' className='sign'>
        <h2 className='sign__title'>Регистрация</h2>
        <SignForm handleRequest={handleRegistration} buttonText={'Зарегистрироваться'}/>
        <p className='sign__subtitle'>
          Уже зарегистрированы?{' '}
          <Link to='/sign-in' className='sign__link'>
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Registration;
