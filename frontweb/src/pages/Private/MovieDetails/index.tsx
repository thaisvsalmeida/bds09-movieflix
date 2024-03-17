import { AxiosRequestConfig } from 'axios';
import ReviewListing from 'components/ReviewListing';
import ReviewForm from 'components/ReviewForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Review } from 'types/review';
import { hasAnyRole } from 'util/auth';
import { requestBackend } from 'util/requests';

import './styles.css';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(config).then((response) => {
      setReviews(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const copyReview = [...reviews];
    copyReview.push(review);
    setReviews(copyReview);
  };

  return (
    <div className="movie-container">
        <h1>Tela detalhes do filme id: {movieId}</h1>

      {hasAnyRole(['ROLE_MEMBER']) && (
        <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
      )}

      {reviews.length === 0 ? ' ' : <ReviewListing review={reviews} />}
    </div>
  );
};

export default MovieDetails;
