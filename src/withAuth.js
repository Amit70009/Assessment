import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export const withAuth = (Component) => {
  const isAuthenticated = localStorage.getItem("user-details");

  return class extends React.Component {
    render() {
        console.log(isAuthenticated);
      if (!isAuthenticated) {
        return <Link to="/login" />;
      }

      return <Component {...this.props} />;
    }
  }
}


