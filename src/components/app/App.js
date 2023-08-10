import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';
import { lazy, Suspense, useState } from 'react';
import dataContext from '../context';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {
  const [flag, setFlag] = useState({
    isFlag: true,
    changeColor: changeColor,
  });

  function changeColor() {
    setFlag({ isFlag: !flag.isFlag, changeColor });
  }

  console.log('FLAG: ', flag);
  console.log('changeColor: ', flag.changeColor);

  const { Provider } = dataContext;

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />
              <Route
                path="/"
                element={
                  <Provider value={flag}>
                    <MainPage />
                  </Provider>
                }
              />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};
export default App;
