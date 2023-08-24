function ImagePopup({ card, isOpened, onClose }) {
  return (
    <div
      className={`popup popup_big-photo ${isOpened ? 'popup_opened' : ''}`}
      id='popupBigPhoto'
    >
      <div className='popup__container-big-photo'>
        <button
          className='popup__close popup__close-big-photo'
          type='button'
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className='popup__photo' />
        <p className='popup__photo-name'>{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
