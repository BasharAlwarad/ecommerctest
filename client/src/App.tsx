import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

import Nav from './components/Nav';
import Products from './pages/Products';

export default function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Nav />
      <Routes>
        <Route path={`/`} element={<Home />} />

        <Route path={`/about`} element={<About />} />
        <Route path={`/products`} element={<Products />} />
      </Routes>
    </>
  );
}
