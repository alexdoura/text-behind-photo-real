import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Palette, Layout, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6" />
          <span className="font-bold text-xl">TextLayer</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 font-inter rounded-full text-sm mb-6">
            <Zap className="h-4 w-4" />
            Now with AI-powered subject detection
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900">
            Text Behind Subject
            <br />
            Made Simple
          </h1>
          <p className="text-xl text-zinc-600 mb-8 max-w-2xl mx-auto">
            Create stunning visuals with text that flows naturally behind your subjects. Perfect for social media, marketing, and creative projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/app">
              <Button size="lg" className="bg-black rounded-full text-white hover:bg-zinc-800">
                Try It Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="bg-zinc-100">
              15,000+ designs created
            </Badge>
            <Badge variant="secondary" className="bg-zinc-100">
              4.8/5 user rating
            </Badge>
          </div>
        </div>
      </section>

{/* Gallery */}
<section id="gallery" className="container mx-auto px-4 py-16">
  <h2 className="text-3xl font-bold text-center mb-8">Inspiring Creations</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Left Column: Two Portrait Images */}
    <div className="grid grid-rows-2 gap-8 h-full">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
        <img
          src="car.png"
          alt="Text behind subject example 1"
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
      </div>
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
        <img
          src="lifes.png"
          alt="Text behind subject example 2"
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
      </div>
    </div>

    {/* Right Column: Small Landscape + Portrait */}
    <div className="flex flex-col gap-8 h-full">
      <div className="relative h-1/3 rounded-xl overflow-hidden">
        <img
          src="po.png"
          alt="Text behind subject example 3"
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
      </div>
      <div className="relative h-2/3 rounded-xl overflow-hidden">
        <img
          src="yamal.png"
          alt="Text behind subject example 4"
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
      </div>
    </div>
  </div>
</section>




      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose TextLayer?</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-50 p-6 rounded-xl">
            <Palette className="h-8 w-8 mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Easy Customization</h3>
            <p className="text-zinc-600">Adjust text, colors, and effects with our intuitive interface.</p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-xl">
            <Layout className="h-8 w-8 mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2">Smart Layout</h3>
            <p className="text-zinc-600">AI-powered subject detection ensures perfect text placement every time.</p>
          </div>
          <div className="bg-zinc-50 p-6 rounded-xl">
            <Sparkles className="h-8 w-8 mb-4 text-purple-500" />
            <h3 className="text-xl font-semibold mb-2">One-Click Export</h3>
            <p className="text-zinc-600">Export your designs in multiple formats optimized for different platforms.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Create?</h2>
        <p className="text-xl text-zinc-600 mb-8 max-w-2xl mx-auto">
          Join thousands of creators who are already using TextLayer to enhance their visual content.
        </p>
        <Link href="/app">
          <Button size="lg" className="bg-black rounded-full text-white hover:bg-zinc-800">
            Start Creating for Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-zinc-600">
        <p>© 2025 TextBehindPhoto. Crafted with care for creators worldwide.</p>
      </footer>
    </div>
  )
}

