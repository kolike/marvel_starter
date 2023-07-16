const CharListItem = ({ src, alt, name, onCharSelected, key }) => {
  return (
    <li className="char__item"
    onClick={()=> {onCharSelected({key})}}>
      
      <img src={src} alt={alt} />
      <div className="char__name">{name}</div>
    </li>
  );
};
export default CharListItem;
