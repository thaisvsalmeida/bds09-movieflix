import { Link } from 'react-router-dom';
import './styles.css';

const MovieCatalog = () => {
  return (
    <>
      <div className="catalog-container">
        <div>
          <h1>Tela listagem de filmes</h1>
        </div>
        <div className="catalog-list">
          <Link to={`/movies/1/reviews`}>Acessar /movies/1</Link>
          <Link to={`/movies/2/reviews`}>Acessar /movies/2</Link>
        </div>
      </div>
    </>
  );
};

export default MovieCatalog;
