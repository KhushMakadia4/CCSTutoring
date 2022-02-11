module.exports = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: [
      "tailwindui.com",
      "images.unsplash.com",
      "www.w3.org",
      "firebasestorage.googleapis.com",
    ],
    format: ["image/webp"],
  },
  env: {
    HOSTNAME: process.env.NEXT_PUBLIC_HOSTNAME,
    PORT: process.env.NEXT_PUBLIC_PORT,
    HOST: process.env.NEXT_PUBLIC_HOST,
    NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY:
      process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
};
