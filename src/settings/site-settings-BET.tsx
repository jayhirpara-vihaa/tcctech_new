import Cookies from "js-cookie";
import { siteSettingsData } from "./site-settings-offline";
import { COMPANY_INFO } from "@utils/constants";

export interface companyInfo {
  company_name: string;
  company_email: string;
  company_phone: string;
  copy_right: string;
  sort_about: string;
  facebook_link: string;
  insta_link: string;
  youtube_link: string;
  linkdln_link: string;
  twitter_link: string;
  web_primary_color: string;
  web_secondary_color: string;
  announce_is_active: string;
  announce_color: string;
  announce_text: string;
  announce_text_color: string;
  light_id_image: number;
  dark_id_image: number;
}

export interface onlineImages {
  darakImage: string;
  lightImage: string;
}

let siteSetting = siteSettingsData;
if (typeof window !== "undefined") {
  siteSetting = {
    ...siteSettingsData,
  };
}
export const siteSettings = siteSetting;
