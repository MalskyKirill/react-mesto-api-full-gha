import { useState } from 'react';

function SignForm({ handleRequest, buttonText }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = formValue;
    handleRequest(email, password);
    setFormValue({ email: '', password: '' });
  };

  return (
    <form className='sign__form' name='signForm' onSubmit={handleSubmit}>
      <label className='sign__field-wrap'>
        <input
          className='sign__field'
          name='email'
          type='email'
          placeholder='Email'
          minLength='2'
          maxLength='30'
          required
          onChange={handleChange}
          value={formValue.email}
        />
      </label>
      <label className='sign__field-wrap'>
        <input
          className='sign__field'
          name='password'
          type='password'
          placeholder='Пароль'
          minLength='2'
          maxLength='30'
          required
          onChange={handleChange}
          value={formValue.password}
        />
      </label>
      <button className='sign__submit' type='submit'>
        {buttonText}
      </button>
    </form>
  );
}

export default SignForm;
