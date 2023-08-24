import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';

function AddPlacePopup({ isOpened, onClose, onAddNewCard }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handleTitleChange = (evt) => {
    setTitle(evt.target.value);
  };

  const handleLinkChange = (evt) => {
    setLink(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddNewCard({
      title,
      link,
    });
  }

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpened]);

  return (
    <PopupWithForm
      name={'popup-new-place'}
      title={'Новое место'}
      formId={'newPlaceField'}
      buttonText={'Создать'}
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup__field-wrap'>
        <input
          id='title'
          type='text'
          className='popup__field popup__field_next_title'
          placeholder='Название'
          name='title'
          minLength='2'
          maxLength='30'
          required
          onChange={handleTitleChange}
          value={title}
        />
        <span className='popup__field-error popup__field-error-title'>
          ошибка имени карточки
        </span>
      </label>
      <label className='popup__field-wrap'>
        <input
          id='link'
          type='url'
          className='popup__field popup__field_next_link'
          placeholder='Ссылка на картинку'
          name='link'
          required
          onChange={handleLinkChange}
          value={link}
        />
        <span className='popup__field-error popup__field-error-link'>
          ошибка юрл адреса
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
