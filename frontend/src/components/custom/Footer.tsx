"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Youtube, Mail, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "API Hub", href: "#apihub" },
    { name: "Security", href: "#security" },
    { name: "Enterprise", href: "#enterprise" },
    { name: "Pricing", href: "#pricing" },
  ],
  resources: [
    { name: "Documentation", href: "#documentation" },
    { name: "API Reference", href: "#api-reference" },
    { name: "Tutorials", href: "#tutorials" },
    { name: "Blog", href: "#blog" },
  ],
  company: [
    { name: "About", href: "#about" },
    { name: "Careers", href: "#careers" },
    { name: "Contact", href: "#contact" },
    { name: "Terms", href: "#terms" },
    { name: "Privacy", href: "#privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          {/* Newsletter Section */}
          <div className="mb-16 pb-10 border-b">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="max-w-md">
                <h3 className="text-xl font-semibold mb-2">Stay up to date</h3>
                <p className="text-foreground/70 text-sm">
                  Get updates on new features, API improvements, and best practices for cloud deployments.
                </p>
              </div>
              <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full sm:w-64 px-4 py-2.5 rounded-lg border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20 bg-background"
                  />
                </div>
                <Button className="rounded-lg bg-foreground text-background hover:bg-foreground/90 whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Main footer content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Image src="/dockapilogo.svg" alt="DockAPI Logo" width={32} height={32} />
                <span className="font-bold text-lg">DockAPI</span>
              </div>
              <p className="text-sm text-foreground/70 mb-4 max-w-xs">
                The AI-powered unified cloud platform for deploying and managing Docker applications with ease.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <Link
                  href="https://github.com/manav-khadka"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  target="_blank"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://twitter.com/themanavkhadka"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  target="_blank"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/manav-khadka/"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  target="_blank"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.youtube.com/@manav-khadka"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  target="_blank"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-foreground/60">
                © {new Date().getFullYear()} DockAPI, Inc. All rights reserved.
              </p>
              
              <div className="flex items-center space-x-6">
                <Link href="mailto:info@dockapi.com" className="text-sm text-foreground/70 hover:text-foreground flex items-center gap-1.5 transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>Contact us</span>
                </Link>
                <Link href="#status" className="text-sm text-foreground/70 hover:text-foreground flex items-center gap-1.5 transition-colors">
                  <span>Status</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}