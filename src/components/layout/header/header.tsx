import HeaderOne from "../header/header-one";
import HeaderTwo from "../header/header-two";
import HeaderThree from "../header/header-three";
import { siteSettings } from "../../../settings/site-settings";

const Header = () => {
  const showHeader = () => {
    if (siteSettings.headerType === "#TCC-hed-1") {
      return <HeaderOne />;
    } else if (siteSettings.headerType === "#TCC-hed-2") {
      return <HeaderTwo />;
    } else {
      return <HeaderThree />;
    }
  };

  return <>{showHeader()}</>;
};

export default Header;
