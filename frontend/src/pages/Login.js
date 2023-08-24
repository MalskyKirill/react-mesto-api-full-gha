import SignForm from '../components/SignForm';

function Login({ handleLogin }) {

  return (
    <main className='content'>
      <section aria-label='Регистрация' className='sign'>
        <h2 className='sign__title'>Вход</h2>
        <SignForm handleRequest={handleLogin} buttonText={'Войти'}/>
      </section>
    </main>
  );
}

export default Login;
