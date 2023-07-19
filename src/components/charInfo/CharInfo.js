import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import './charInfo.scss';


class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
      };
    
      marvelService = new MarvelService();

      componentDidMount(){
        this.updateChar();
      }

      componentDidUpdate(prevProps){
         if (this.props.charId !== prevProps.charId){   
            this.updateChar();
            this.setState({
                loading: true
              });
        }
      }

    updateChar = ()=>{
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.marvelService
        .getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError)
       }

    
       onCharLoaded = (char) => {
        this.setState({
          char,
          loading: false,
          error: false,
        });
      };
    
      onError = () => {
        this.setState({
          loading: false,
          error: true,
        });
      };
    


render() {
    const {char, loading, error} = this.state;
    const skeleton= char||loading||error?null:<Skeleton/>
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}
}
const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let classNameImg = 'char__basics';
    if (thumbnail.indexOf('image_not_available') !== -1) {
        classNameImg = "char__basics_img_not_found";
    } else {
        classNameImg = 'char__basics'
    }

    const items = comics.filter((_, i) => i <=9 )
    .map((item,i)=> (
                      <li key = {i} className="char__comics-item">
                     {item.name}
                     </li>
                   )
    )

    return(
        
    <>
    <div className={classNameImg}>
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description || 'Ultron ruined the description, ha-ha-ha'}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 ? 'No comics have been made about this sucker yet' : items} 
                    
                
                              
            </ul>
    
    </>
    );
}
export default CharInfo;