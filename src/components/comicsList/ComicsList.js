import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newComicsLoading, setNewComicsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getPaginatedComics, clearError } = useMarvelService();

  useEffect(() => {
    clearError();
    updateComicsList(offset, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateComicsList = async (offset, initial) => {
    setNewComicsLoading(!initial);
    const { items, totalCount } = await getPaginatedComics(offset);
    onComicsListLoaded(items, totalCount);
  };

  const onComicsListLoaded = (newComicsList, totalCount) => {
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewComicsLoading(false);
    setOffset((offset) => offset + 8);
    setComicsEnded(offset + 8 >= totalCount);
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
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.alt}
              className="comics__item-img"
              style={imgObjectFit}
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}$</div>
          </Link>
        </li>
      );
    });
    return <ul className="comics__grid">{items}</ul>;
  };

  const elements = comicsRender(comicsList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newComicsLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {elements}
      <button
        className="button button__main button__long"
        disabled={newComicsLoading}
        style={{ display: comicsEnded ? 'none' : 'block' }}
        onClick={() => updateComicsList(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
