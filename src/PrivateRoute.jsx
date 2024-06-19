import PropTypes from 'prop-types';
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
        <div className="loader" />
        <div className="lds-ellipsis"><div /><div /><div /><div /></div>
      </div>
    </>
  }

  if (user) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
