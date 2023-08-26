import { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import { Link } from 'react-router-dom';
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
      {/* {meta.touched && meta.error ? <div className={className}>{meta.error}</div> : null} */}
    </>
  );
};

const CharForm = () => {
  const [charId, setCharId] = useState(null);
  const [className, setClassName] = useState(null);

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

        const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
        const _apiKey = 'apikey=9b43075eab8aa6697f9f4ccff9e2b743';
        const res = await fetch(`${_apiBase}characters?name=${values.name}&${_apiKey}`, {
          method: 'GET',
          body: null,
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        const charId = data?.data?.results[0]?.id;

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
              <div className="textInput">
                <TextInput
                  className={className}
                  status={status}
                  id="name"
                  name="name"
                  type="text"
                />
              </div>
              <div className="buttonFind">
                <button type="submit" className="button button__main">
                  <div className="inner">FIND</div>
                </button>
              </div>

              {charId !== null ? (
                <Link to={`/char/${charId}`}>
                  <button className="button button__secondary">
                    <div className="inner">TO PAGE</div>
                  </button>
                </Link>
              ) : null}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CharForm;
