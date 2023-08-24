import { useContext } from 'react';
import Card from '../components/Card';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { CardsContext } from '../context/CardsContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {

  //подписка на CurrentUserContext
  const {
    avatar,
    name,
    about,
  } = useContext(CurrentUserContext);

  //подписка на CardsContext
  const cards = useContext(CardsContext);

  const cardList = cards.map(({ link, name, likes, _id, owner }) => {
    return (
      <Card
        link={link}
        name={name}
        likes={likes}
        key={_id}
        _id={_id}
        onCardClick={onCardClick}
        owner={owner}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    );
  });

  return (
    <main className='content'>
      <section aria-label='Профиль' className='profile'>
        <img
          className='profile__avatar'
          src={avatar}
          alt='аватар'
          onClick={onEditAvatar}
        />
        <div className='profile__info'>
          <div className='profile__wrap'>
            <h1 className='profile__name'>{name}</h1>
            <button
              className='profile__edit-button'
              type='button'
              onClick={onEditProfile}
            ></button>
          </div>
          <p className='profile__job'>{about}</p>
        </div>
        <button
          className='profile__add-button'
          type='button'
          onClick={onAddPlace}
        ></button>
      </section>
      <section className='elements' aria-label='Фоточки'>
        <ul className='cards'>{cardList}</ul>
      </section>
    </main>
  );
}

export default Main;
