import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // WiFi QR: consolidate to /qr-codes/wifi
      {
        source: "/use-cases/wifi",
        destination: "/qr-codes/wifi",
        permanent: true,
      },
      // Wedding QR: consolidate to /qr-codes/wedding
      {
        source: "/wedding",
        destination: "/qr-codes/wedding",
        permanent: true,
      },
      // Restaurant QR: consolidate to /restaurant-menu-qr
      {
        source: "/use-cases/restaurant-menu",
        destination: "/restaurant-menu-qr",
        permanent: true,
      },
      // Business card QR: consolidate to /business-card-qr
      {
        source: "/use-cases/business-cards",
        destination: "/business-card-qr",
        permanent: true,
      },
      // Payment QR: consolidate to /payment-qr-code
      {
        source: "/qr-codes/payment",
        destination: "/payment-qr-code",
        permanent: true,
      },
      // Event QR: consolidate to /use-cases/event-qr-code
      {
        source: "/use-cases/event-tickets",
        destination: "/use-cases/event-qr-code",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
