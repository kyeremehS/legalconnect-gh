'use client';

import Image from "next/image";
import Link from "next/link";
import ChatButton from "./components/ChatButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-[#1A237E] via-[#1A237E]/95 to-[#1A237E]/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/next.svg')] opacity-5"></div>
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
          <div className="flex items-center hover:scale-105 transition-transform">
            <Image
              src="/next.svg"
              alt="LegalConnect Logo"
              width={40}
              height={40}
              className="animate-pulse"
            />
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-white to-[#F9A825] bg-clip-text text-transparent">
              LegalConnect
            </span>
          </div>
          <div className="hidden md:flex space-x-10">
            {["Services", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-200 hover:text-[#F9A825] hover:scale-105 transition-all font-medium"
              >
                {item}
              </a>
            ))}
            
            <button className="bg-[#F9A825] hover:bg-[#F9A825]/90 px-6 py-2 rounded-full text-[#1A237E] text-sm font-semibold transition-all hover:scale-105 cursor-pointer shadow-lg hover:shadow-[#F9A825]/20"
            >
              <Link href='/get-started'>Login</Link>
            </button>
            <button className="bg-[#F9A825] hover:bg-[#F9A825]/90 px-6 py-2 rounded-full text-[#1A237E] text-sm font-semibold transition-all hover:scale-105 cursor-pointer shadow-lg hover:shadow-[#F9A825]/20"
            >
              <Link href="/consultant">For Consultants</Link>
            </button>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-32">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-[#F9A825] to-white bg-clip-text text-transparent">
                Expert Legal Solutions
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Connect with experienced attorneys and get the legal help you
                need, when you need it. Professional guidance at your fingertips.
              </p>
              <div className="flex gap-4 pt-4">
                <button className="bg-[#F9A825] hover:bg-[#F9A825]/90 text-[#1A237E] px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-[#F9A825]/20">
                  Get Started
                </button>
                <button className="border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold transition-all backdrop-blur-sm">
                  Learn More →
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-4 bg-[#F9A825]/20 rounded-full blur-3xl"></div>
              <Image
                src="/file.svg"
                alt="Justice illustration"
                width={500}
                height={400}
                priority
                className="relative hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1000+", label: "Clients Served" },
              { number: "95%", label: "Success Rate" },
              { number: "20+", label: "Expert Attorneys" },
              { number: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#1A237E]">{stat.number}</div>
                <div className="text-[#212121] mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-white to-[#F7F9FC]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-[#212121]">Our Legal Services</h2>
            <p className="text-[#212121]/70 text-lg">
              Comprehensive legal solutions tailored to your specific needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-[#1A237E]/5 rounded-2xl flex items-center justify-center mb-6">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={32}
                    height={32}
                    className="text-[#1A237E]"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-[#212121]">{service.title}</h3>
                <p className="text-[#212121]/70 leading-relaxed">{service.description}</p>
                <button className="mt-6 text-[#1A237E] font-medium hover:text-[#F9A825] transition-colors">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1A237E] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/next.svg')] opacity-5"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Take the first step towards resolving your legal matters. Schedule your free consultation today.
          </p>
          <button className="bg-[#F9A825] text-[#1A237E] px-10 py-4 rounded-full font-semibold hover:bg-[#F9A825]/90 transition-all hover:scale-105 shadow-xl">
            Contact Us Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#212121] text-white py-16">
        {/* ... existing footer code ... */}
      </footer>
      
      {/* Chat Button */}
      <ChatButton />
    </div>
  );
}

const services = [
  {
    title: "Corporate Law",
    description: "Expert guidance for businesses of all sizes, from startups to enterprises. We handle incorporation, contracts, and compliance.",
    icon: "/globe.svg",
  },
  {
    title: "Family Law",
    description: "Compassionate support for family matters including divorce, custody, and estate planning with a focus on your needs.",
    icon: "/next.svg",
  },
  {
    title: "Real Estate",
    description: "Professional assistance in property transactions, ensuring smooth closings and protecting your interests.",
    icon: "/vercel.svg",
  },
];
