import LayoutOne from "./layout-one";
import LayoutTwo from "./layout-two";
import Layout from "./layout-three";
import { siteSettings } from "@settings/site-settings";

const LayOut = ({ children }: React.PropsWithChildren<{}>) => {

    const showHeader = () => {
        if (siteSettings.layoutType === "#TCC-lay-1") {
            return <LayoutOne children={children} />
        } else if (siteSettings.layoutType === "#TCC-lay-2") {
            return <LayoutTwo children={children} />
        } else {
            return <Layout children={children} />
        }
    }

    return (
        <>
            { 
                 showHeader()
            }
        </>
    );
}

export default LayOut;

