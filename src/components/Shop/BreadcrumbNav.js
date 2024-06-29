import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BreadcrumbNav.css';

const BreadcrumbNav = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter((part) => part && part !== 'shop');

  return (
    <div className="breadcrumb-container">
      <Link to="/shop" className="breadcrumb-link">Home</Link>
      {pathParts.length > 0 && <span className="breadcrumb-separator">|</span>}
      {pathParts.map((part, index) => {
        const path = `/shop/${pathParts.slice(0, index + 1).join('/')}`;
        const isLast = index === pathParts.length - 1;
        return (
          <React.Fragment key={index}>
            {index !== 0 && <span className="breadcrumb-separator">|</span>}
            {isLast ? (
              <span className="breadcrumb-current">{decodeURIComponent(part)}</span>
            ) : (
              <Link to={path} className="breadcrumb-link">
                {decodeURIComponent(part)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BreadcrumbNav;
