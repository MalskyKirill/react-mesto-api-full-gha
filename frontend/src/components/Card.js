import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({
  link,
  name,
  likes,
  _id,
  onCardClick,
  owner,
  onCardLike,
  onCardDelete,
}) {

  const {_id: currentUserId} = useContext(CurrentUserContext)

  const isOwn = owner === currentUserId; //проверка на то что каточку создали мы
  const isLiked = likes.some((like) => like === currentUserId); // проверка что мы лайкнули карточку

  function handleClick() {
    onCardClick({ link, name });
  }

  function handleLikeClick() {
    onCardLike({ likes, _id });
  }

  function handleDeleteClick() {
    onCardDelete({ _id });
  }

  const cardLikeButtonClassName = `card__like ${
    isLiked && 'card__like_active'
  }`;

  return (
    <li className='card'>
      <img
        src={link}
        alt={name}
        className='card__photo'
        onClick={handleClick}
      />
      {isOwn && <button className='card__trash' onClick={handleDeleteClick}/>}
      <div className='card__wrap'>
        <h2 className='card__name'>{name}</h2>
        <div className='card__like-wrap'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            onClick={handleLikeClick}
          />
          <span className='card__like-count'>{likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
