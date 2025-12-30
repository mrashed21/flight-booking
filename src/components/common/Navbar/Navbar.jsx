"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Container from "../Container/Container";
import MobileDrawer from "./MobileDrower";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const user = true;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navbarRef = useRef(null);
  const overlayRef = useRef(null);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Flight", link: "/flight" },
    { name: "Tour Package", link: "/tour-package" },
    { name: "Visa", link: "/visa" },
    { name: "About Us", link: "/about-us" },
    { name: "Contact Us", link: "/contact-us" },
  ];

  const [showOverlay, setShowOverlay] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (mobileOpen || profileOpen) {
      setShowOverlay(true);
      setIsClosing(false);
      document.body.style.overflow = "hidden";
    } else {
      setIsClosing(true);

      const timer = setTimeout(() => {
        setShowOverlay(false);
        setIsClosing(false);
      }, 500);
      document.body.style.overflow = "auto";

      return () => clearTimeout(timer);
    }
  }, [mobileOpen, profileOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        setMobileOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const toggleProfile = () => {
    setMobileOpen(false);
    setProfileOpen((p) => !p);
  };

  const toggleMenu = () => {
    setProfileOpen(false);
    setMobileOpen((m) => !m);
  };

  const navbarHeight = navbarRef.current?.offsetHeight || 64;

  return (
    <>
      {showOverlay && (
        <div
          ref={overlayRef}
          className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen || profileOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{
            pointerEvents: isClosing ? "none" : "auto",
          }}
        />
      )}

      <nav
        ref={navbarRef}
        className="relative z-50 bg-white/70 backdrop-blur-lg"
      >
        <Container>
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Image
              width={200}
              height={200}
              src="https://i.ibb.co.com/Q317RSjR/Group-1597883383.png"
              alt="logo"
            />

            {/* Desktop Nav */}
            <div className="hidden gap-6 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  className="hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {!user && (
                <div className="hidden gap-3 md:flex">
                  <Link href="/login" className="rounded-md border px-4 py-1.5">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-primary rounded-md px-4 py-1.5 text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {user && (
                <button onClick={toggleProfile}>
                  <Image
                    width={200}
                    height={200}
                    src="https://i.ibb.co.com/NZk0ctZ/cat.jpg"
                    className="h-10 w-10 cursor-pointer rounded-full border"
                    alt="user "
                  />
                </button>
              )}

              <button className="md:hidden" onClick={toggleMenu}>
                {mobileOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </Container>
      </nav>

      <ProfileMenu open={profileOpen} offsetTop={navbarHeight} />

      <MobileDrawer
        open={mobileOpen}
        navItems={navItems}
        offsetTop={navbarHeight}
        user={user}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
};

export default Navbar;
