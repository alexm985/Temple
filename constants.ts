import { Translation, PoojaService, Festival } from './types';

export const TRANSLATIONS: Record<'en' | 'hi', Translation> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      festivals: 'Festivals',
      gallery: 'Gallery',
      donate: 'Donate',
      contact: 'Contact',
    },
    hero: {
      title: 'A Sanctuary of Bhakti, Seva, and Community',
      subtitle: 'Lakshmi Narayan Temple is a sacred space where ancient traditions and heartfelt devotion come together.',
      cta: 'Explore Our Offerings',
    },
    sections: {
      live_darshan: 'Live Darshan',
      upcoming_festivals: 'Upcoming Highlights',
      services_title: 'Our Spiritual Services',
      ai_priest_title: 'Ask the Pandit (AI)',
      ai_priest_desc: 'Have questions about rituals, mythology, or spirituality? Ask our AI spiritual guide.',
    },
    actions: {
      book_now: 'Book Now',
      read_more: 'Read More',
      donate_now: 'Donate Now',
      send_message: 'Send Message',
      chat_start: 'Chat with Pandit',
    },
  },
  hi: {
    nav: {
      home: 'मुख्य पृष्ठ',
      about: 'हमारे बारे में',
      services: 'सेवाएँ',
      festivals: 'त्यौहार',
      gallery: 'दीर्घा',
      donate: 'दान करें',
      contact: 'संपर्क करें',
    },
    hero: {
      title: 'भक्ति, सेवा और समुदाय का अभयारण्य',
      subtitle: 'लक्ष्मी नारायण मंदिर एक पवित्र स्थान है जहाँ प्राचीन परंपराएँ और हार्दिक भक्ति एक साथ मिलती हैं।',
      cta: 'हमारी पेशकश देखें',
    },
    sections: {
      live_darshan: 'लाईव दर्शन',
      upcoming_festivals: 'आगामी मुख्य अंश',
      services_title: 'हमारी आध्यात्मिक सेवाएँ',
      ai_priest_title: 'पंडित जी से पूछें (AI)',
      ai_priest_desc: 'क्या आपके पास अनुष्ठानों, पौराणिक कथाओं या आध्यात्मिकता के बारे में प्रश्न हैं?',
    },
    actions: {
      book_now: 'बुक करें',
      read_more: 'और पढ़ें',
      donate_now: 'दान करें',
      send_message: 'संदेश भेजें',
      chat_start: 'पंडित जी से बात करें',
    },
  },
};

export const SERVICES: PoojaService[] = [
  {
    id: '1',
    title: 'Ganesh Abhishek',
    description: 'A ritual bathing of Lord Ganesha to remove obstacles and seek wisdom.',
    duration: '45 Mins',
    price: 51,
    image: 'https://picsum.photos/seed/ganesh/400/300',
  },
  {
    id: '2',
    title: 'Satyanarayan Katha',
    description: 'A storytelling ritual performed for general well-being and prosperity.',
    duration: '2 Hours',
    price: 101,
    image: 'https://picsum.photos/seed/fire/400/300',
  },
  {
    id: '3',
    title: 'Navagraha Shanti',
    description: 'Pacify the nine planets to bring harmony and reduce negative influences.',
    duration: '1.5 Hours',
    price: 151,
    image: 'https://picsum.photos/seed/planets/400/300',
  },
  {
    id: '4',
    title: 'Vahan Pooja',
    description: 'Blessing ceremony for a new vehicle to ensure safety and longevity.',
    duration: '30 Mins',
    price: 31,
    image: 'https://picsum.photos/seed/car/400/300',
  },
];

export const FESTIVALS: Festival[] = [
  {
    id: '1',
    title: 'Janmashtami Festival',
    date: '2024-08-26',
    description: 'Honouring the birth of Lord Krishna with bhajans, fasting, and midnight celebrations.',
  },
  {
    id: '2',
    title: 'Navaratri Celebrations',
    date: '2024-10-03',
    description: 'Nine nights of devotion to the Goddess. Garba, Dandiya, and daily special aartis.',
  },
  {
    id: '3',
    title: 'Deepavali Charity Program',
    date: '2024-11-01',
    description: 'The festival of lights. Spreading light through service and community anna daan.',
  },
  {
    id: '4',
    title: 'Maha Shivratri',
    date: '2024-03-08',
    description: 'All-night vigil and prayers dedicated to Lord Shiva.',
  },
  {
    id: '5',
    title: 'Holi Celebration',
    date: '2024-03-25',
    description: 'Festival of colors, community gathering, and bhajans.',
  },
  {
    id: '6',
    title: 'Ram Navami',
    date: '2024-04-17',
    description: 'Celebrating the birth of Lord Rama with recitals and procession.',
  },
  {
    id: '7',
    title: 'Dussehra',
    date: '2024-10-12',
    description: 'Victory of good over evil, celebrated with Ravan Dahan.',
  }
];

// Fallback audio for the player
export const AUDIO_SRC = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Placeholder