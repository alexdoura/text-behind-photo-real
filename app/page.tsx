'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import Image from 'next/image';

const steps = [
  { title: 'Upload Photo', description: 'Upload any image from your device' },
  { title: 'Add Text', description: 'Add and style your text layers' },
  { title: 'Position Text', description: 'Place text behind image elements' },
  { title: 'Download', description: 'Export in high quality PNG format' }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
     

      {/* Hero Section */}
      <section className="container px-4 pt-20 pb-20 text-center flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Create and edit <span className="underline underline-offset-4">text-behind-image</span> designs easily
          <br />
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-xl max-w-2xl mx-auto"
        >
          Turn any image into a professional text-behind-image design.
          No prior experience needed.
        </motion.p>

        <div className="mt-12 flex justify-center">
          <Link href="/app">
            <HoverBorderGradient 
              containerClassName="rounded-full" 
              className="bg-background text-foreground px-8 py-3 text-lg font-medium"
            >
              Open the app
            </HoverBorderGradient>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-all"
            >
              <div className="mb-2 text-sm font-medium text-muted-foreground">
                Step {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <div className="w-full h-full mt-2">
      <div className="h-screen w-full">
        <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
          <div className="md:col-span-2">
            <div className="relative overflow-hidden bg-white rounded-xl h-full w-full">
              <img
                alt="thumbnail"
                className="object-cover object-top inset-0 h-full w-full transition duration-200 md:absolute"
                src="car.png" // Replace with your local file
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="relative overflow-hidden bg-white rounded-xl h-full w-full">
              <img
                alt="thumbnail"
                className="object-cover object-top inset-0 h-full w-full transition duration-200 md:absolute"
                src="nature.png" // Replace with your local file
              />
            </div>
          </div>
          <div className="col-span-1">
            <div className="relative overflow-hidden bg-white rounded-xl h-full w-full">
              <img
                alt="thumbnail"
                className="object-cover object-top inset-0 h-full w-full transition duration-200 md:absolute"
                src="life.png" // Replace with your local file
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="relative overflow-hidden bg-white rounded-xl h-full w-full">
              <img
                alt="thumbnail"
                className="object-cover object-top inset-0 h-full w-full transition duration-200 md:absolute"
                src="po.png" // Replace with your local file
              />
            </div>
          </div>
        </div>
      </div>
      
    </div>

      {/* Footer */}
      <footer className="border-t">
        <div className="container px-4 py-6 text-center text-sm text-muted-foreground">
          © 2024 <Link href="https://www.alexdoura.com" target="_blank" className="hover:text-foreground">
            alexdoura.com
          </Link> - All rights reserved
        </div>
      </footer>
    </div>
  );
}