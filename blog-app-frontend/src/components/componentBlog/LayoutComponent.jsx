
import { Outlet } from 'react-router-dom'; // Outlet akan me-render komponen berdasarkan route aktif
import Header from './header';
import Sidebar from './Sidebar';

const LayoutComponent = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Outlet /> 
          </main>
        </div>
      </div>
    </>
  );
};

export default LayoutComponent;
