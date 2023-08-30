import { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import './charForm.scss';

const TextInput = ({ status, className, label, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <label htmlFor={props.name} className="char__search-label">
        {label}
      </label>
      <div className="char__search-wrapper">
        <input {...props} {...field} />
      </div>
      <div>{!!status && !!status.message && <div className={className}>{status.message}</div>}</div>
    </>
  );
};

const CharForm = () => {
  const [charId, setCharId] = useState(null);
  const [className, setClassName] = useState(null);
  const { searchCharacter } = useMarvelService();
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      onSubmit={async (values, actions) => {
        setCharId(null);

        if (!values.name) {
          actions.setStatus({
            message: `This field is required`,
          });
          setClassName('char__search-error');
          return;
        }

        const charId = await searchCharacter(values.name);

        if (charId) {
          setCharId(charId);
          actions.setStatus({
            message: `There it is! Visit ${values.name} page?`,
          });
          setClassName('char__search-success');
        } else {
          actions.setStatus({
            message: 'The character was not found. Check the name and try again',
          });
          setClassName('char__search-error');
        }
      }}
    >
      {({ status }) => {
        return (
          <Form>
            <div className="char__search-form">
              <h2>Or find character by name</h2>
              <TextInput className={className} status={status} id="name" name="name" type="text" />
              <div className="buttons-container">
                <button type="submit" className="button button__main">
                  <div className="inner">FIND</div>
                </button>

                {charId !== null ? (
                  <Link to={`/char/${charId}`}>
                    <button className="button button__secondary">
                      <div className="inner">TO PAGE</div>
                    </button>
                  </Link>
                ) : null}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CharForm;
