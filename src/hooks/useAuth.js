const { useSelector } = require('react-redux');

const useAuth = () => {
  const auth = useSelector((state) => state.auth);

  if (auth?.accessToken && auth?.user) return true;

  return false;
};

export default useAuth;
