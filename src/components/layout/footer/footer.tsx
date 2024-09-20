import FooterOne from "../footer/footer-one";
import FooterTwo from "../footer/footer-two";
import { siteSettings } from "../../../settings/site-settings";

const Header = () => {

    const showFooter = () => {
        if (siteSettings.footerType === "#TCC-foo-1") {
            return <FooterOne />
        } else {
            return <FooterTwo />
        }
    }

    return (
        <>
            {
                showFooter()
            }
        </>
    );
}

export default Header;

