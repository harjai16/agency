import { Metadata } from 'next';

export const metadata = {
  title: 'Blog | Swagatam Tech',
  description: 'Insights, guides and updates on web design, development, SEO, and digital marketing strategies that help businesses grow online.',
  openGraph: {
    title: 'Blog | Swagatam Tech',
    description: 'Insights, guides and updates on web design, development, SEO, and digital marketing strategies.',
    type: 'website',
  },
};

export default function BlogsLayout({ children }) {
  return children;
}

