'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo-full.png" alt="CASER" width={88} height={44} />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
            <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
            <Link href="/download" className="text-sm font-medium hover:text-primary transition-colors">Download</Link>
          </div>
          
          <div className="hidden md:block">
            <Button variant="outline" size="sm" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <Link href="/" className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/features" className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Features</Link>
            <Link href="/pricing" className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Pricing</Link>
            <Link href="/download" className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Download</Link>
            <Link href="/contact" className="block py-2 text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
