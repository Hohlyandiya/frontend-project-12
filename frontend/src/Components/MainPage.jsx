import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/login'>Page login</Link>
          </li>
          <li>
            <Link to='/notFound'>Page not found</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </>
  )
};

export default MainPage;