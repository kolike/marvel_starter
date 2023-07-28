import { useRef } from 'react';

const CharListItem = ({ src, alt, name, onCharSelected }) => {
  const ref = useRef();

  const isFocus = ref.current === document.activeElement;

  let classNameImg = '';
  if (src.indexOf('image_not_available') !== -1) {
    classNameImg = `char__item_img_not_found ${isFocus ? 'char__item_img_not_found_selected' : ''}`;
  } else {
    classNameImg = `char__item ${isFocus ? 'char__item_selected' : ''}`;
  }

  return (
    <li
      ref={ref}
      className={classNameImg}
      onClick={onCharSelected}
      onFocus={onCharSelected}
      tabIndex={0}
    >
      <img src={src} alt={alt} />
      <div className="char__name">{name}</div>
    </li>
  );
};
export default CharListItem;
