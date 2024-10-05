import { savePageData } from "@/lib/db";

export interface HowItWorks {
  title: string;
  description: string;
}

export interface Offers {
  title: string;
  description: string;
  conditoins: string;
}

export interface Prices {
  title: string;
  price: string | number;
  offeredPrice: string | number;
  percentage: string | number;
  description: string;
}

export interface AboutPage {
  title: string;
  images: string[];
  prices: Prices;
  offers: Offers;
  howItWorks: HowItWorks;
}

const aboutPageData: AboutPage = {
  title: "Checkout",
  images: [
    "/images/Click Area.png",
    "/images/Frame 3927.png",
    "/images/Rectangle 2812.png",
    "/images/Rectangle 2812 (1).png",
    "/images/Discount Badge.png",
    "/images/Ellipse 203.png",
  ],
  prices: {
    title: "1 Month Premium - Weight Management",
    price: "₹ 3499",
    offeredPrice: "₹ 6499",
    percentage: "-30%",
    description:
      "Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis mol",
  },
  offers: {
    title: "Offers",
    description: "Only Today  | Additional  500 off applied.",
    conditoins: "T&C",
  },
  howItWorks: {
    title: "How it works",
    description:
      " Live workouts: Choose from the wide variety of online workouts and join in from anywhere",
  },
};

savePageData("checkout", aboutPageData);
