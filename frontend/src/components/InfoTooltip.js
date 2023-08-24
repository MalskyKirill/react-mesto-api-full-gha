import ok from '../images/Union.jpg'
import fail from '../images/Union2.png'

function InfoTooltip ({isOpened, onClose, status}) {

  return (
    <div
      className={`popup ${isOpened ? 'popup_opened' : ''}`}
    >
      <div className='popup__container popup__container_img'>
        <img className="popup__sing-up-img" src={status ? ok : fail} alt={status ? 'успешно' : 'ошибка'} />
        <h2 className='popup__title popup__title_img'>{status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        <button className='popup__close' type='button' onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;
