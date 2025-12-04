export type Language = 'en' | 'hi';

export interface Translation {
  nav: {
    home: string;
    about: string;
    services: string;
    festivals: string;
    gallery: string;
    donate: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  sections: {
    live_darshan: string;
    upcoming_festivals: string;
    services_title: string;
    ai_priest_title: string;
    ai_priest_desc: string;
  };
  actions: {
    book_now: string;
    read_more: string;
    donate_now: string;
    send_message: string;
    chat_start: string;
  };
}

export interface PoojaService {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
}

export interface Festival {
  id: string;
  title: string;
  date: string; // ISO Date string YYYY-MM-DD
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}