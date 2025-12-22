/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Stock photo services (8)
      { protocol: 'https', hostname: 'media.istockphoto.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.shutterstock.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.gettyimages.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.adobe.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.depositphotos.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.alamy.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.dreamstime.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.freeimages.com', pathname: '/**' },
      
      // Free image services (6)
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'source.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.pexels.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.pixabay.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.flickr.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.staticflickr.com', pathname: '/**' },
      
      // Image hosting services (5)
      { protocol: 'https', hostname: '**.imgur.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.ibb.co', pathname: '/**' },
      { protocol: 'https', hostname: '**.postimg.cc', pathname: '/**' },
      { protocol: 'https', hostname: '**.imgbox.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.photobucket.com', pathname: '/**' },
      
      // Social media platforms (8)
      { protocol: 'https', hostname: '**.instagram.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.cdninstagram.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.fbcdn.net', pathname: '/**' },
      { protocol: 'https', hostname: '**.twimg.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.pinimg.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.pinterest.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.redd.it', pathname: '/**' },
      { protocol: 'https', hostname: '**.licdn.com', pathname: '/**' },
      
      // Creative platforms (5)
      { protocol: 'https', hostname: '**.deviantart.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.deviantart.net', pathname: '/**' },
      { protocol: 'https', hostname: '**.artstation.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.behance.net', pathname: '/**' },
      { protocol: 'https', hostname: '**.dribbble.com', pathname: '/**' },
      
      // Video platforms (2)
      { protocol: 'https', hostname: '**.ytimg.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.vimeocdn.com', pathname: '/**' },
      
      // GIF platforms (2)
      { protocol: 'https', hostname: '**.giphy.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.tenor.com', pathname: '/**' },
      
      // CDN and optimization services (9)
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.ctfassets.net', pathname: '/**' },
      { protocol: 'https', hostname: '**.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.cloudfront.net', pathname: '/**' },
      { protocol: 'https', hostname: '**.googleusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.googleapis.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.githubusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.wordpress.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.imagekit.io', pathname: '/**' },
      
      // Let's Enhance (the one causing the error) (2)
      { protocol: 'https', hostname: 'letsenhance.io', pathname: '/**' },
      { protocol: 'https', hostname: '**.letsenhance.io', pathname: '/**' },
      
      // Placeholder services (2)
      { protocol: 'https', hostname: 'via.placeholder.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      
      // Localhost for development (1)
      { protocol: 'http', hostname: 'localhost', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
