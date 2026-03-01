import hero from './optimized/hero.webp';
import logo from './optimized/photo_53_2026-02-28_04-10-57.webp';
import about from './optimized/photo_2026-02-28_01-34-01.webp';
import programs from './optimized/photo_83_2026-02-28_04-12-00.webp';
import news1 from './optimized/news1.webp';
import news2 from './optimized/news2.webp';
import news3 from './optimized/news3.webp';
import academicKg from './photos/KG/photo_30_2026-02-28_04-12-41.jpg';
import academicLab from './photos/labulatories/photo_22_2026-02-28_04-12-41.jpg';
import academicLibrary from './photos/library/photo_87_2026-02-28_04-12-00.jpg';
import academicExam from './photos/studentsAtExam/photo_31_2026-02-28_04-11-59.jpg';
import bgUnnamed from './photos/generalPhotos/unnamed.jpg';
import bg040850 from './photos/generalPhotos/photo_2026-02-28_04-08-50.jpg';
import bg040750 from './photos/generalPhotos/photo_3_2026-02-28_04-07-50.jpg';
import bg013401 from './photos/generalPhotos/photo_2026-02-28_01-34-01.jpg';
import bg041057 from './photos/generalPhotos/photo_53_2026-02-28_04-10-57.jpg';
import bg01057 from './photos/generalPhotos/photo_1_2026-02-28_04-10-57.jpg';

export const telegramUrl = 'https://t.me/merkezelburhanschool';

export const photos = {
  hero,
  logo,
  about,
  programs,
  news: [news1, news2, news3],
};

export const pageBackgrounds = {
  about: bgUnnamed,
  academics: bg040850,
  events: bg040750,
  news: bg013401,
  gallery: bg041057,
  contact: bg01057,
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
      'Child-centered classrooms focused on early literacy, numeracy, communication, and social growth.',
  },
  {
    title: 'Primary',
    description:
      'Strong foundational academics with structured guidance, discipline, and practical learning projects.',
  },
  {
    title: 'Secondary',
    description:
      'Rigorous preparation in sciences, humanities, and technology for national exams and university pathways.',
  },
];

export const academicsGallery = [
  {
    title: 'Kindergarten Learning Corners',
    description: 'Early years classrooms designed for guided play, language growth, and foundational numeracy.',
    image: academicKg,
  },
  {
    title: 'Science Practical Sessions',
    description: 'Lab-based activities that build observation, experimentation, and critical thinking skills.',
    image: academicLab,
  },
  {
    title: 'Library Reading Support',
    description: 'Structured reading time to strengthen comprehension, vocabulary, and independent study habits.',
    image: academicLibrary,
  },
  {
    title: 'Exam Readiness Environment',
    description: 'Focused assessment settings that prepare students for national and internal examinations.',
    image: academicExam,
  },
];

export const newsItems = [
  {
    title: 'Cluster Competition Recognition Ceremony Held',
    text: 'Students and staff received awards for outstanding academic and extracurricular performance.',
    image: news1,
  },
  {
    title: 'School Community Charity Drive Completed',
    text: 'Families, teachers, and students coordinated donations to support local households in need.',
    image: news2,
  },
  {
    title: 'Parent Engagement Forum Strengthened Partnerships',
    text: 'Parents and school leadership discussed progress tracking, discipline standards, and student wellbeing.',
    image: news3,
  },
];

export const downloadItems = [
  {
    title: 'Academic Calendar 2026',
    description: 'Term dates, exam windows, and major school events for the year.',
    file: '/downloads/academic-calendar-2026.pdf',
  },
  {
    title: 'School Uniform Guide',
    description: 'Approved uniform colors, weekly dress expectations, and PE guidelines.',
    file: '/downloads/uniform-guide.pdf',
  },
  {
    title: 'Parent Information Handbook',
    description: 'Communication channels, attendance policy, conduct expectations, and support contacts.',
    file: '/downloads/parent-handbook.pdf',
  },
];

export const eventsItems = [
  {
    title: 'Family Open Campus Day',
    date: 'April 12, 2026',
    type: 'upcoming',
    description: 'Families tour classrooms, labs, and activity spaces while meeting program coordinators.',
  },
  {
    title: 'National Exam Readiness Workshop',
    date: 'April 25, 2026',
    type: 'upcoming',
    description: 'Focused guidance for Grade 8 and Grade 12 students on revision strategy and exam discipline.',
  },
  {
    title: 'Science and Innovation Week',
    date: 'May 20, 2026',
    type: 'upcoming',
    description: 'Project exhibitions and practical demonstrations led by student innovation clubs.',
  },
  {
    title: 'Inter-School Sports Festival',
    date: 'January 18, 2026',
    type: 'past',
    description: 'Student teams represented the school in football, athletics, and teamwork competitions.',
  },
  {
    title: 'Charity and Community Service Campaign',
    date: 'December 3, 2025',
    type: 'past',
    description: 'Learners organized material support campaigns and volunteer outreach for nearby communities.',
  },
];

export const facilities = [
  {
    name: 'Science Laboratories',
    description: 'Practical biology, chemistry, and physics sessions aligned with national curriculum standards.',
  },
  {
    name: 'ICT & Digital Lab',
    description: 'Computer-based learning for digital literacy, coding basics, and guided research.',
  },
  {
    name: 'Library & Reading Spaces',
    description: 'Quiet, supervised reading areas supporting independent learning and group study.',
  },
  {
    name: 'School Transportation',
    description: 'Organized transport routes to support safe and reliable student movement.',
  },
  {
    name: 'Sports & Activity Grounds',
    description: 'Outdoor spaces for athletics, football, and student wellness programs.',
  },
  {
    name: 'Kindergarten Play Area',
    description: 'Safe and colorful environment designed for early years physical and social development.',
  },
];

export const testimonials = [
  {
    quote: 'The teachers monitor progress closely and communicate with parents quickly. My child has grown in confidence and discipline.',
    author: 'Parent of Grade 6 Student',
  },
  {
    quote: 'The school gives students both academic focus and opportunities in clubs, sports, and leadership.',
    author: 'Parent of Grade 10 Student',
  },
  {
    quote: 'We appreciate the regular updates and the supportive environment for both learning and character building.',
    author: 'Parent Representative',
  },
];

export const trustHighlights = [
  'Consistent exam preparation and structured academic follow-up',
  'Strong parent-school communication via Telegram and meetings',
  'Character formation rooted in discipline, respect, and service',
];
