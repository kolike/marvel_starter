import { Component } from "react";
import "./charList.scss";
import MarvelService from "../../services/MarvelService";
import CharListItem from "../charListItem/CharListItem";

class CharList extends Component {
  state = {
    charList: [],
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateCharList();
  }

  updateCharList = () => {
    this.marvelService.getAllCharacters().then(this.onCharListLoaded);
  };

  onCharListLoaded = (charList) => {
    console.log(this, "this");
    this.setState({
      charList,
    });
  };

  render() {
    console.log(this.state.charList, "this.state.charList");
    const elements = this.state.charList.map((char) => {
      const { id, name, thumbnail } = char;
      return <CharListItem key={id} src={thumbnail} alt={name} name={name} />;
    });

    return (
      <div className="char__list">
        <ul className="char__grid">{elements}</ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
