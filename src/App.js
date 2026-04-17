
import { Routes, Route,  } from 'react-router-dom';

import AuthForm from './components/AuthForm';
import Header from './components/Header';
import PostList from './components/PostList';
import Detail from './components/Detail';
import Categories from './components/Categories';
import './Assets/style/style.css';

function App() {
  return (
    <div> 
      <Header />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<AuthForm mode="login" />} />
        <Route path="/register" element={<AuthForm mode="register" />} />
      </Routes>
    </div>
  );
}



export default App;