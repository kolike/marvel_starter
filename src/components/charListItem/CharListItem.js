const CharListItem = ({ src, alt, name, onCharSelected }) => {
  let classNameImg = "";
  if (src.indexOf("image_not_available") !== -1) {
    classNameImg = "char__item_img_not_found";
  } else {
    classNameImg = "char__item";
  }

  return (
    <li className={classNameImg} onClick={onCharSelected}>
      <img src={src} alt={alt} />
      <div className="char__name">{name}</div>
    </li>
  );
};
export default CharListItem;
