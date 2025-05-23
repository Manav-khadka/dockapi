"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronUp, Github, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Docs", href: "/docs" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Pricing", href: "/pricing" },
  {
    name: "Features",
    href: "#features",
    submenu: [
      { name: "Docker Deployments", href: "#docker-deployments" },
      { name: "API Gateway", href: "#api-gateway" },
      { name: "AI Optimization", href: "#ai-optimization" },
      { name: "Analytics", href: "#analytics" },
    ],
  },
  { name: "Enterprise", href: "#enterprise" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<string[]>([]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdowns(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const navbarVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: 10, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: "auto",
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      }
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
  };

  if (!mounted) return null;

  return (
    <motion.nav
      initial="initial"
      animate="animate"
      variants={navbarVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm border-b"
          : "bg-background/0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 overflow-hidden transition-all duration-300 group-hover:scale-110">
              <Image 
                src="/dockapilogo.svg" 
                alt="DockAPI Logo" 
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl tracking-tight">DockAPI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative group px-1"
                onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="py-2 px-3 text-sm rounded-md font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all flex items-center"
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.submenu && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-background border overflow-hidden"
                      >
                        <div className="py-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-md hover:bg-foreground/5"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Link href="https://github.com/Manav-khadka/dockapi-backend" target="_blank">
              <Button variant="ghost" size="icon" className="rounded-md hover:bg-foreground/5">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#contact">
              <Button variant="outline" className="rounded-md border-foreground/10 hover:border-foreground/20">
                Contact
              </Button>
            </Link>
            <Link href="/deploy">
              <Button className="rounded-md bg-foreground text-background hover:bg-foreground/90">
                Start Free
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-md"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-md"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="fixed inset-0 z-40 md:hidden bg-background pt-16"
          >
            <div className="p-4 space-y-2 overflow-y-auto max-h-screen pb-20">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div className="border-b border-foreground/10 pb-2">
                      <button
                        className="w-full py-3 px-4 flex items-center justify-between text-base font-medium rounded-md hover:bg-foreground/5"
                        onClick={() => toggleMobileDropdown(item.name)}
                      >
                        {item.name}
                        {mobileDropdowns.includes(item.name) ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                      <AnimatePresence>
                        {mobileDropdowns.includes(item.name) && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={dropdownVariants}
                            className="ml-4 mt-1 space-y-1"
                          >
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block py-2.5 px-4 text-sm rounded-md hover:bg-foreground/5"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-3 px-4 text-base font-medium border-b border-foreground/10 hover:bg-foreground/5 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-6 space-y-4">
                <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-md">
                    Contact Us
                  </Button>
                </Link>
                <Link href="https://github.com/Manav-khadka/dockapi-backend" target="_blank" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-md flex items-center justify-center">
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </Button>
                </Link>
                <Link href="/deploy" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-md bg-foreground text-background">
                    Start Free
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}