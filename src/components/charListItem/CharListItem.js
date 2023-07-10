const CharListItem = ({ src, alt, name }) => {
  return (
    <li className="char__item">
      <img src={src} alt={alt} />
      <div className="char__name">{name}</div>
    </li>
  );
};
export default CharListItem;
