import PopupWithForm from './PopupWithForm';
import { useEffect, useRef } from 'react';

function EditAvatarPopup({ isOpened, onClose, onUpdateAvatar }) {
  //реф для получения дынных из инпута
  const valueAvatarLinkInputRef = useRef('');

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: valueAvatarLinkInputRef.current.value,
    });
  }

  useEffect(() => {
    valueAvatarLinkInputRef.current.value = '';
  }, [isOpened]);

  return (
    <PopupWithForm
      name={'popup-new-avatar'}
      title={'Обновить аватар'}
      formId={'newAvatarField'}
      buttonText={'Сохранить'}
      isOpened={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup__field-wrap'>
        <input
          id='linkAvatar'
          type='url'
          className='popup__field popup__field_next_link'
          placeholder='Ссылка на картинку'
          name='link'
          ref={valueAvatarLinkInputRef}
          required
        />
        <span className='popup__field-error popup__field-error-linkAvatar'>
          ошибка юрл адреса
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
