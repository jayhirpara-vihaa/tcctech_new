import { useRouter } from "next/router";
import { checkIsLoggedIn, getUserDetails } from "@store/authorization";
import PageLoader from "@components/ui/loaders/page-loader/page-loader";

const PrivateRoute: React.FC<any> = ({ children }) => {
  const isAuthorized = checkIsLoggedIn();
  const me: any = getUserDetails();
  const isUser = Object.keys(me).length > 0;
  if (!isUser && !isAuthorized) {
  }
  if (isUser && isAuthorized) {
    return <>{children}</>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <PageLoader />;
  // return logout();
};

export default PrivateRoute;
