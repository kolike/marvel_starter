import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import CharListItem from '../charListItem/CharListItem';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = ({ onCharSelected }) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(220);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getPaginatedCharacters, clearError } = useMarvelService();

  const updateCharList = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getPaginatedCharacters(offset).then(onCharListLoaded);
  };

  useEffect(() => {
    clearError();
    updateCharList(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCharListLoaded = (newCharList) => {
    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(newCharList.length < 9);
  };

  const elements = charList.map((char) => {
    const { id, name, thumbnail } = char;
    return (
      <CharListItem
        key={id}
        src={thumbnail}
        alt={name}
        name={name}
        onCharSelected={() => onCharSelected(id)}
      />
    );
  });

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      <ul className="char__grid">{elements}</ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        onClick={() => updateCharList(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func,
};
export default CharList;
