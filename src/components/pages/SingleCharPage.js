import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './singleCharPage.scss';

const SingleCharPage = () => {
  const { charId } = useParams();
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charId]);

  const updateComic = async () => {
    if (!charId) {
      return;
    }

    clearError();
    setChar(await getCharacter(charId));
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ char }) => {
  const { title, description, thumbnail } = char;
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description ? description : 'Description stolen'}</p>
      </div>
      <Link to="/" className="single-comic__back">
        Back to main page
      </Link>
    </div>
  );
};

export default SingleCharPage;
