import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

export default function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Routes>
        <Route path={`/`} element={<Home />} />
      </Routes>
    </>
  );
}
