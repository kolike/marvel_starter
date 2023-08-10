import { useContext, useRef } from 'react';
import dataContext from '../context';
const CharListItem = ({ src, alt, name, onCharSelected }) => {
  const ref = useRef();

  const isFocus = ref.current === document.activeElement;

  let classNameImg = '';
  if (src.indexOf('image_not_available') !== -1) {
    classNameImg = `char__item_img_not_found ${isFocus ? 'char__item_img_not_found_selected' : ''}`;
  } else {
    classNameImg = `char__item ${isFocus ? 'char__item_selected' : ''}`;
  }

  const context = useContext(dataContext);

  console.log('context: ', context);
  const buttonColor = context.isFlag ? 'green' : 'red';

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
      <button style={{ background: buttonColor }} onClick={context.changeColor}>
        Click me
      </button>
    </li>
  );
};
export default CharListItem;
