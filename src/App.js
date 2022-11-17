import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import { Fragment } from 'react';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            console.log(route.path);
            return <Route exact key={index} path={route.path} element={<Layout><Page /></Layout>} />

          })}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
