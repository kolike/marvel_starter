import { useHttp } from '../components/hooks/http.hook';

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=9b43075eab8aa6697f9f4ccff9e2b743';

  const getAllCharacters = async (offset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getPaginatedComics = async (offset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return { items: res.data.results.map(_transformComicsItem), totalCount: res.data.total };
  };

  const _transformComicsItem = (comicsItem) => {
    return {
      id: comicsItem.id,
      title: comicsItem.title,
      description: comicsItem.description,
      thumbnail: comicsItem.thumbnail.path + '.' + comicsItem.thumbnail.extension,
      price: comicsItem.prices[0].price,
      pageCount: comicsItem.pageCount
        ? `${comicsItem.pageCount} p.`
        : `No information about the number of pages`,
      language: comicsItem.textObjects.language || 'en-us',
    };
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  return { loading, error, getAllCharacters, getCharacter, clearError, getPaginatedComics };
};

export default useMarvelService;
