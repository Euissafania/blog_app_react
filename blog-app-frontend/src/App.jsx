import 'bootstrap/dist/css/bootstrap.min.css';
import "./components/stayle/dashboard.css"
import { Routes, Route } from 'react-router-dom';
import Blogs from './components/Blogs';
import CreateBlog from './components/CreateBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetail from './components/BlogDetail';
import EditBlog from './components/EditBlog';
import Register from './components/Register';
import Login from './components/Login';
import HeaderBlog from './components/componentBlog/HeaderBlog';
import LayoutComponent from './components/componentBlog/LayoutComponent';

import Category from './components/Category'
import BlogAuthor from './components/BlogAuthor';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <Routes>
        {/* Route untuk HeaderBlog */}
        <Route path='/' element={<HeaderBlog />}>
          {/* Rute default */}
          <Route index element={<Blogs />} />
          <Route path='/create' element={<CreateBlog />} />
          <Route path='blog/:id' element={<BlogDetail />} />
          <Route path='blog/edit/:id' element={<EditBlog />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>

        {/* Route untuk LayoutComponent */}
        <Route path='/dashboard' element={<LayoutComponent />}>
          <Route index  element={<Dashboard />} />
          <Route path='categories' element={<Category />} />
          <Route path='blogAuthor' element={<BlogAuthor />} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
