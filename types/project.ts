import { Timestamp } from "firebase/firestore";

export type Project = {
  id: string | number;
  title: string | undefined;
  short_description: string;
  long_description: string;
  featured_Images: string[];
  device: string;
  bg_img: string;
  featured: boolean;
  order: number;
};

export type Message = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  date: Timestamp;
};

export type SentMessageType = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};
