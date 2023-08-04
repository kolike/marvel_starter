import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={{ textAlign: 'center', fontSize: '40px' }}> Page doesn't exist</p>
      <Link
        style={{ display: 'block', textAlign: 'center', color: 'blue', fontSize: '30px' }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};
export default Page404;
