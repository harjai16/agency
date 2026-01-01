/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect non-www to www (301 permanent redirect)
      // This works as a fallback if middleware doesn't catch it
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'swagatamtech.com',
          },
        ],
        destination: 'https://www.swagatamtech.com/:path*',
        permanent: true, // 301 redirect
      },
    ];
  },
  images: {
    remotePatterns: [
      // Stock photo services (6) - removed freeimages.com, dreamstime.com
      { protocol: 'https', hostname: 'media.istockphoto.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.shutterstock.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.gettyimages.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.adobe.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.depositphotos.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.alamy.com', pathname: '/**' },
      
      // Free image services (5) - removed staticflickr.com
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'source.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.pexels.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.pixabay.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.flickr.com', pathname: '/**' },
      
      // Image hosting services (3) - removed imgbox.com, photobucket.com
      { protocol: 'https', hostname: '**.imgur.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.ibb.co', pathname: '/**' },
      { protocol: 'https', hostname: '**.postimg.cc', pathname: '/**' },
      
      // Social media platforms (6) - removed redd.it, licdn.com
      { protocol: 'https', hostname: '**.instagram.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.cdninstagram.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.fbcdn.net', pathname: '/**' },
      { protocol: 'https', hostname: '**.twimg.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.pinimg.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.pinterest.com', pathname: '/**' },
      
      // Creative platforms (4) - removed deviantart.net
      { protocol: 'https', hostname: '**.deviantart.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.artstation.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.behance.net', pathname: '/**' },
      { protocol: 'https', hostname: '**.dribbble.com', pathname: '/**' },
      
      // Video platforms (2)
      { protocol: 'https', hostname: '**.ytimg.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.vimeocdn.com', pathname: '/**' },
      
      // GIF platforms (2)
      { protocol: 'https', hostname: '**.giphy.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.tenor.com', pathname: '/**' },
      
      // CDN and optimization services (9) - removed letsenhance.io patterns
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.ctfassets.net', pathname: '/**' },
      { protocol: 'https', hostname: '**.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.cloudfront.net', pathname: '/**' },
      { protocol: 'https', hostname: '**.googleusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.googleapis.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.githubusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.wordpress.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.imagekit.io', pathname: '/**' },
      
      // Google Drive (2) - essential for blog images
      { protocol: 'https', hostname: 'drive.google.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.drive.google.com', pathname: '/**' },
      
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
