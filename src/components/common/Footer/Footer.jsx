import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import Container from "../Container/Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "Tour Package", href: "#" },
    { name: "Visa", href: "#" },
  ];

  const moreLinks = [
    { name: "About Us", href: "#" },
    { name: "Destinations", href: "#" },
    { name: "Blogs", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  const services = [
    { name: "Customer Support", href: "#" },
    { name: "Visa Information", href: "#" },
    { name: "Flight service", href: "#" },
    { name: "Tour Booking", href: "#" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-surface border-t border-gray-200 py-8 md:py-12 lg:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="mb-4 flex items-center gap-2 md:mb-6">
              <div>
                <Image
                  width={200}
                  height={200}
                  src="https://i.ibb.co.com/Q317RSjR/Group-1597883383.png"
                  alt="logo"
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-muted max-w-sm text-sm leading-relaxed md:text-base md:leading-relaxed">
              Plan your next adventure with curated tours designed for comfort,
              culture, and unforgettable memories. Plan your next.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary-dark mb-3 text-base font-bold md:mb-4 md:text-lg">
              Quick Links
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-primary text-sm transition-colors md:text-base"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-primary-dark mb-3 text-base font-bold md:mb-4 md:text-lg">
              More links
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {moreLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-primary text-sm transition-colors md:text-base"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-primary-dark mb-3 text-base font-bold md:mb-4 md:text-lg">
              Services
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-primary text-sm transition-colors md:text-base"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-5 md:mt-6">
              <div className="flex gap-2.5 md:gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-warning hover:bg-primary group flex h-9 w-9 items-center justify-center rounded-full transition-colors md:h-10 md:w-10"
                  >
                    <social.icon className="h-4 w-4 text-white md:h-5 md:w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-200 pt-6 md:mt-12 md:pt-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="bg-warning flex h-5 w-5 items-center justify-center rounded-full">
                <span className="text-xs text-white">©</span>
              </div>
              <p className="text-muted text-xs md:text-sm">
                {currentYear} Classic It and Sky Mart Ltd. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
