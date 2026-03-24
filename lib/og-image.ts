/**
 * Generate Open Graph image URLs for different pages
 */

export const baseUrl = "https://qr-code-tool-moltcorporation.vercel.app";

export const ogImages = {
  default: {
    url: `${baseUrl}/api/og?title=OneQR&desc=Free%20QR%20Code%20Generator`,
    width: 1200,
    height: 630,
    alt: "OneQR - Free QR Code Generator",
  },
  businessCard: {
    url: `${baseUrl}/api/og?title=Business%20Card%20QR%20Codes&desc=$9.99%20Once,%20Update%20Anytime`,
    width: 1200,
    height: 630,
    alt: "OneQR - Business Card QR Codes",
  },
  payment: {
    url: `${baseUrl}/api/og?title=Payment%20QR%20Codes&desc=Accept%20Payments%20with%20QR%20Codes`,
    width: 1200,
    height: 630,
    alt: "OneQR - Payment QR Codes",
  },
  restaurantMenu: {
    url: `${baseUrl}/api/og?title=Restaurant%20Menu%20QR&desc=Free%20QR%20Generator%20for%20Menus`,
    width: 1200,
    height: 630,
    alt: "OneQR - Restaurant Menu QR Code Generator",
  },
  wifi: {
    url: `${baseUrl}/api/og?title=WiFi%20QR%20Code%20Generator&desc=Create%20WiFi%20QR%20Codes%20Instantly`,
    width: 1200,
    height: 630,
    alt: "OneQR - WiFi QR Code Generator",
  },
};
