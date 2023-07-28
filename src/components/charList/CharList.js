import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import CharListItem from '../charListItem/CharListItem';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = ({ onCharSelected }) => {
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(220);
  const [charEnded, setCharEnded] = useState(false);

  const marvelService = useMemo(() => new MarvelService(), []);

  useEffect(() => {
    updateCharList();
  }, []);

  const updateCharList = (offset) => {
    onCharListLoading();
    marvelService.getAllCharacters(offset).then(onCharListLoaded).catch(onError);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
    setCharList([]);
    setNewItemLoading(false);
  };

  const onCharListLoading = () => {
    setNewItemLoading(true);
  };

  const onCharListLoaded = (newCharList) => {
    setCharList((charList) => [...charList, ...newCharList]);
    setLoading(false);
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
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <ul className="char__grid">{elements}</ul> : null;
  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {content}
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
