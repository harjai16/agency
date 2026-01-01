import { Metadata } from "next";

export const metadata = {
  title: "Job Post Management | Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function JobPostLayout({ children }) {
  return children;
}

