import React from "react";
import { siteSettings } from "@settings/site-settings";
import CloseIcon from "@components/icons/close-icon";

type IProps = {
  announceIsClose: () => void;
};
const NewsAnnouncement = (props: IProps) => {
  const { announceIsClose } = props;
  const announceTextColor = siteSettings?.companyInfo?.announce_text_color;
  const announceText = siteSettings.companyInfo?.announce_text;
  const announceBodyColor = siteSettings?.companyInfo?.announce_color;
  const closeAnnounce = () => {
    announceIsClose();
  };

  if (announceText === null) {
    announceIsClose();
  }
  
  return (
      <div style={{backgroundColor:`${announceBodyColor}`}} className={`flex px-4 md:px-8 2xl:px-2 justify-between`}>
        <div className={`shadow-lg shadow-black news-container`}>
          <ul className="list-none ">
            <li style={{color:`${announceTextColor}`}} className={`py-2 w-full ]`}>
              {announceText}
            </li>
          </ul>
        </div>
        <div className="flex justify-end">
          <button className="py-1.5 px-2" onClick={closeAnnounce}>
            <CloseIcon color={siteSettings?.companyInfo?.web_primary_color} />
          </button>
        </div>
      </div>
  );
};

export default NewsAnnouncement;
// className='fixed top-0 left-0 right-0'
