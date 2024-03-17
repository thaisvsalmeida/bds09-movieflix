import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { requestBackend } from 'util/requests';
import { Review } from 'types/review';
import ButtonIcon from 'components/ButtonIcon';

import './styles.css';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    console.log(formData);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      withCredentials: true,
      data: formData,
    };

    requestBackend(config)
      .then((response) => {
        setValue('text', '');
        onInsertReview(response.data);
        console.log('SUCESSO AO SALVAR', response);
      })
      .catch((error) => {
        console.log('ERRO AO SALVAR', error);
      });
  };

  return (
    <div>
      <div className="container-review">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('text', {
              required: 'Campo obrigatório',
            })}
            type="text"
            placeholder="Deixe sua avaliação aqui"
            name="text"
          />
          <div>{errors.text?.message}</div>
          <div className="button">
            <ButtonIcon text="SALVAR AVALIAÇÃO" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
