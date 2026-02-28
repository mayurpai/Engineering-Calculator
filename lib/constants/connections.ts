import { Social } from "@/lib/constants/social";
import { library, type IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

library.add(faInstagram, faLinkedin, faGithub, faFacebook, faWhatsapp, faYoutube, faEnvelope);

export interface Connection {
  icon: IconDefinition;
  heading: string;
  username: string;
  link: string;
}

export const Connections: Connection[] = [
  {
    icon: faLinkedin,
    heading: "LinkedIn",
    username: "@mayur-pai5",
    link: Social.LinkedIn,
  },
  {
    icon: faGithub,
    heading: "GitHub",
    username: "@mayurpai",
    link: Social.GitHub,
  },
  {
    icon: faInstagram,
    heading: "Instagram",
    username: "@sou1_unmatch9d.af",
    link: Social.Instagram,
  },
  {
    icon: faEnvelope,
    heading: "Email",
    username: "mayur5pai@gmail.com",
    link: Social.Email,
  },
  {
    icon: faYoutube,
    heading: "YouTube",
    username: "@mayurpai19",
    link: Social.YouTube,
  },
  {
    icon: faWhatsapp,
    heading: "WhatsApp",
    username: "मयूर पै",
    link: Social.WhatsApp,
  },
  {
    icon: faFacebook,
    heading: "Facebook",
    username: "Mayur Pai",
    link: Social.Facebook,
  },
];
