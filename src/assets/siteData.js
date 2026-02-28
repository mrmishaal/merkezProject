import hero from './photos/hero.jpg';
import about from './photos/about.jpg';
import programs from './photos/programs.jpg';
import news1 from './photos/news1.jpg';
import news2 from './photos/news2.jpg';
import news3 from './photos/news3.jpg';
import gallery1 from './photos/gallery1.jpg';
import gallery2 from './photos/gallery2.jpg';
import gallery3 from './photos/gallery3.jpg';
import gallery4 from './photos/gallery4.jpg';
import gallery5 from './photos/gallery5.jpg';
import gallery6 from './photos/gallery6.jpg';

export const photos = {
  hero,
  about,
  programs,
  news: [news1, news2, news3],
  gallery: [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6],
};

export const stats = [
  { value: '800+', label: 'Students' },
  { value: '40+', label: 'Teachers' },
  { value: '10+', label: 'Years Excellence' },
  { value: 'Modern', label: 'Curriculum' },
];

export const programsList = [
  {
    title: 'Kindergarten',
    description:
      'A nurturing and joyful start where children build confidence, curiosity, and foundational reading and numeracy skills.',
  },
  {
    title: 'Primary',
    description:
      'A balanced program that strengthens core academics, communication, discipline, and collaborative problem-solving.',
  },
  {
    title: 'Secondary',
    description:
      'Rigorous preparation in sciences, humanities, and technology to support university readiness and future careers.',
  },
];

export const newsItems = [
  {
    title: 'Science Fair 2026 Highlighted Student Innovation',
    text: 'Learners presented practical projects on clean energy, agriculture, and community problem solving.',
    image: news1,
  },
  {
    title: 'New ICT Lab Expanded Digital Learning',
    text: 'Secondary students now access modern computing resources for coding, research, and digital literacy.',
    image: news2,
  },
  {
    title: 'Parent Partnership Week Strengthened Support',
    text: 'Families and teachers held structured meetings to align on academic goals and student wellbeing.',
    image: news3,
  },
];
