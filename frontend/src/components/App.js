import Header from './Header';
import Main from '../pages/Main';
import Registration from '../pages/Registration';
import Login from '../pages/Login';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import { useEffect, useState } from 'react';
import { api } from '../utils/Api';
import { register, authorize } from '../utils/authMesto';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { CardsContext } from '../context/CardsContext';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';
import { getContent } from '../utils/authMesto';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  //статус попапа infoTooltip
  const [status, setStatus] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  //стейты пользователя и карточек
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  //открытия попапов
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handelCardClick = ({ name, link }) => {
    setSelectedCard({ name, link });
    setIsImagePopupOpen(true);
  };

  //получение данных  с сервера
  useEffect(() => {
    Promise.all([api.getUser(), api.getCards()])
      .then(([resUserData, resCardData]) => {
        setCurrentUser(resUserData);
        setCards(resCardData.reverse());
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  //проверка токена
  useEffect(() => {
    tokenCheck();
  }, []);

  //закрытие всех попапов
  const closeAllPopup = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  //лайк карточки
  const handleCardLike = ({ likes, _id }) => {

    const isLiked = likes.some((like) => like === currentUser._id);
    api
      .changeLikeCardStatus(_id, isLiked)
      .then((newCard) =>
        setCards((state) => state.map((c) => (c._id === _id ? newCard : c)))
      )
      .catch((err) => console.log(err));
  };

  //удаление карточки
  const handleCardDelete = ({ _id }) => {
    api
      .deleteCard(_id)
      .then(() => setCards((state) => state.filter((card) => card._id !== _id)))
      .catch((err) => console.log(err));
  };

  //обнавление профайла
  const handleUpdateUser = ({ name, about }) => {
    api
      .edingProfile({ name, about })
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopup();
      })
      .catch((err) => console.log(err));
  };

  //обновление аватара
  const handleUpdateAvatar = ({ avatar }) => {
    api
      .changeAvatar(avatar)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar: avatar });
        closeAllPopup();
      })
      .catch((err) => console.log(err));
  };

  //создание новой карточки
  const handleAddPlaceSubmit = ({ title, link }) => {
    api
      .addCard({ title, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) => console.log(err));
  };

  //регистрация
  const handleRegistration = (email, password) => {
    register(email, password)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        setStatus(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setStatus(false);
        console.log(err);
      });
  };

  //авторизация
  const handleLogin = (email, password) => {
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);

          setUserEmail(email);
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setStatus(false);
        console.log(err);
      });
  };

  // выход из профайла
  const handleSingOut = () => {
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
    setLoggedIn(false);
  };

  const tokenCheck = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');

      if (token) {
        getContent(token)
          .then((res) => {
            if (res) {
              console.log(res)
              setUserEmail(res.email);
              setLoggedIn(true);
              navigate('/', { replace: true });
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <CardsContext.Provider value={cards}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='body'>
          <div className='page'>
            <Header
              loggedIn={loggedIn}
              userEmail={userEmail}
              handleSingOut={handleSingOut}
            />
            <Routes>
              <Route
                path='/*'
                element={
                  <ProtectedRouteElement
                    element={Main}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handelCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    loggedIn={loggedIn}
                  />
                }
              />
              <Route
                path='/sign-up'
                element={
                  <Registration handleRegistration={handleRegistration} />
                }
              />
              <Route
                path='/sign-in'
                element={<Login handleLogin={handleLogin} />}
              />
            </Routes>
            <Footer />
          </div>
          {/* <!-- попап редактирования профайла --> */}
          <EditProfilePopup
            isOpened={isEditProfilePopupOpen}
            onClose={closeAllPopup}
            onUpdateUser={handleUpdateUser}
          />
          {/* <!-- попап добавления новой карточки --> */}
          <AddPlacePopup
            isOpened={isAddPlacePopupOpen}
            onClose={closeAllPopup}
            onAddNewCard={handleAddPlaceSubmit}
          />
          {/* <!-- попап смены аватара --> */}
          <EditAvatarPopup
            isOpened={isEditAvatarPopupOpen}
            onClose={closeAllPopup}
            onUpdateAvatar={handleUpdateAvatar}
          />
          {/* <!-- попап подтверждения удаления карточка --> */}
          <PopupWithForm
            name={'popup-confurm-delite'}
            title={'Вы уверены?'}
            formId={'ConfurmDeliteField'}
            buttonText={'Да'}
          />
          {/* <!-- попап увеличенной картики --> */}
          <ImagePopup
            card={selectedCard}
            isOpened={isImagePopupOpen}
            onClose={closeAllPopup}
          />
          <InfoTooltip
            isOpened={isInfoTooltipOpen}
            onClose={closeAllPopup}
            status={status}
          />
        </div>
      </CurrentUserContext.Provider>
    </CardsContext.Provider>
  );
}

export default App;
