import { Component } from "react";
import PropTypes from 'prop-types'
import "./charList.scss";
import MarvelService from "../../services/MarvelService";
import CharListItem from "../charListItem/CharListItem";

class CharList extends Component {
  state = {
    charList: [],
    loading: false,
    error:false,
    newItemLoading: false,
    offset : 210,
    charEnded:false
  };


  marvelService = new MarvelService();

  componentDidMount() {
    this.updateCharList();
  }

  updateCharList = (offset) => {
    
    this.marvelService.getAllCharacters(offset)
    .then(this.onCharListLoaded)
    .catch(this.onError);
    this.onCharListLoading();
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading:true
    })
  }


  onCharListLoaded = (newCharList) => {
    let ended = false;
    if(newCharList.length<9) {
      ended = true;
    }


    this.setState(({offset, charList})=> ({
        charList: [...charList, ...newCharList],
        loading:false,
        newItemLoading:false,
        offset: offset +9,
        charEnded: ended
      }))
  }
  render() {
    const {offset, newItemLoading, charEnded} = this.state;
    const elements = this.state.charList.map((char) => {
      const { id, name, thumbnail } = char;
      return <CharListItem key={id} src={thumbnail} alt={name} name={name} onCharSelected={()=>this.props.onCharSelected(id)}  />;
    });

    return (
      <div className="char__list">
        <ul className="char__grid">{elements}</ul>
        <button 
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{'display': charEnded? 'none' :'block'}}
        onClick={()=> this.updateCharList(offset)}>
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}
CharList.propTypes = {
  onCharSelected: PropTypes.func
}
export default CharList;