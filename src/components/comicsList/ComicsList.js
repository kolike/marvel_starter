import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics, clearError } = useMarvelService();

  useEffect(() => {
    clearError();
    updateComicsList(offset, true);
  }, []);

  const updateComicsList = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComicsList) => {
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 4);
    setComicsEnded(newComicsList.length < 4);
  };

  const comicsRender = (arr) => {
    const items = arr.map((item, i) => {
      let imgObjectFit = { objectFit: 'cover' };
      if (
        item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
      ) {
        imgObjectFit = { objectFit: 'unset' };
      }
      return (
        <li className="comics__item" tabIndex={0} key={item.id}>
          <a href="#">
            <img
              src={item.thumbnail}
              alt={item.alt}
              className="comics__item-img"
              style={imgObjectFit}
            />
            <div className="comics__item-name">{item.name}</div>
            <div className="comics__item-price">{item.price}$</div>
          </a>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  };

  const elements = comicsRender(comicsList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {elements}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: comicsEnded ? 'none' : 'block' }}
        onClick={() => updateComicsList(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
