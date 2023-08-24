function PopupWithForm({
  name,
  title,
  formId,
  buttonText,
  children,
  isOpened,
  onClose,
  onSubmit
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpened ? 'popup_opened' : ''}`}
    >
      <div className='popup__container'>
        <h2 className='popup__title'>{title}</h2>
        <button className='popup__close' type='button' onClick={onClose} />
        <form className='popup__form' name={name} id={formId} onSubmit={onSubmit}>
          {children}
          <button className='popup__save' type='submit' form={formId}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
