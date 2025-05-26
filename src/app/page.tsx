import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-[#1A237E] via-[#1A237E]/95 to-[#1A237E]/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Legalhammer.webp')] opacity-5"></div>
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
          <div className="flex items-center hover:scale-105 transition-transform">
            <Image
              src="/legalb.jpg"
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
            {["Services", "About", "Contact", "Lawyer Dashboard", "User Dashboard"].map((item) => (
              <Link
                key={item}
                href={
                  item === "Lawyer Dashboard"
                    ? "/Lawyer"
                    : item === "User Dashboard"
                    ? "/User-landing" // <-- Update this to your actual route
                    : `#${item.toLowerCase()}`
                }
                className="text-gray-200 hover:text-white hover:scale-105 transition-all font-medium"
              >
                {item}
              </Link>
            ))}
            <Link
              href="/sign-in"
              className="bg-[#F9A825] hover:bg-[#F9A825]/90 px-6 py-2 rounded-full text-[#1A237E] text-sm font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-[#F9A825]/20"
            >
              Login
            </Link>
            <Link
              href="/consultant"
              className="bg-[#F9A825] hover:bg-[#F9A825]/90 px-6 py-2 rounded-full text-[#1A237E] text-sm font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-[#F9A825]/20"
            >
              For Consultants
            </Link>
            <Link
              href="/get-started"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
            >
              Get Started
            </Link>
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
                <Link
                  href="/get-started"
                  className="bg-[#F9A825] hover:bg-[#F9A825]/90 text-[#1A237E] px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 shadow-lg hover:shadow-[#F9A825]/20"
                >
                  Get Started
                </Link>
                <Link
                  href="/learn-more"
                  className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold transition-all"
                >
                  Learn More →
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative flex items-center justify-center">
              {/* Blurred background image */}
              <Image
                src="/lawyer-in-ghana-legal-empire-hs3.jpg"
                alt=""
                width={650}
                height={750}
                aria-hidden="true"
                className="absolute inset-0 w-[650px] h-[750px] blur-3xl scale-110 opacity-60 z-0"
                style={{ objectFit: "cover" }}
                priority
              />
              {/* Main sharp image */}
              <Image
                src="/lawyer-in-ghana-legal-empire-hs3.jpg"
                alt="Justice illustration"
                width={600}
                height={700}
                priority
                className="relative hover:scale-105 transition-transform duration-500 z-10"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Explore Legal Resources Section (moved up) */}
      <section className="py-16 bg-white text-[#212121]">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-8 text-[#1A237E]">Explore Legal Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Watch Legal Content Card */}
            <Link href="/legal-content" className="block bg-blue-50 rounded-xl shadow hover:shadow-lg p-8 text-center transition">
              <Image src="/video.png" alt="Watch Legal Content" width={60} height={60} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#1A237E]">Watch Legal Content</h3>
              <p className="text-gray-600">Browse and watch legal education videos for free.</p>
            </Link>
            {/* Legal AI Card */}
            <Link href="/legal-chatbot" className="block bg-indigo-50 rounded-xl shadow hover:shadow-lg p-8 text-center transition">
              <Image src="/chat-bot.png" alt="Legal AI Chatbot" width={60} height={60} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#1A237E]">Legal AI</h3>
              <p className="text-gray-600">Ask legal questions and get instant answers from our AI chatbot.</p>
            </Link>
          </div>
        </div>
      </section>

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
                <Link
                  href="/learn-more"
                  className="mt-6 text-[#1A237E] font-medium hover:text-[#F9A825] transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1A237E] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Legalhammer.webp')] opacity-5"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Take the first step towards resolving your legal matters. Schedule your free consultation today.
          </p>
          <Link
            href="/contact"
            className="bg-[#F9A825] text-[#1A237E] px-10 py-4 rounded-full font-semibold hover:bg-[#F9A825]/90 transition-all hover:scale-105 shadow-xl"
          >
            Contact Us Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#212121] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6">LegalConnect</h3>
              <p className="text-gray-400 leading-relaxed">
                Your trusted partner in legal solutions, providing expert guidance
                when you need it most.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6">Services</h4>
              <ul className="space-y-3 text-gray-400">
                {["Corporate Law", "Family Law", "Real Estate", "Immigration"].map(
                  (item) => (
                    <li
                      key={item}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <span>📧</span> contact@legalconnect.com
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span> 1-800-LEGAL-HELP
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span> 123 Law Street, NY 10001
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-6">Follow Us</h4>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "Facebook"].map((social) => (
                  <div
                    key={social}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    <span className="text-sm">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© 2024 LegalConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const services = [
  {
    title: "Corporate Law",
    description:
      "Expert guidance for businesses of all sizes, from startups to enterprises. We handle incorporation, contracts, and compliance.",
    icon: "/globe.svg",
  },
  {
    title: "Family Law",
    description:
      "Compassionate support for family matters including divorce, custody, and estate planning with a focus on your needs.",
    icon: "/legalb.jpg",
  },
  {
    title: "Real Estate",
    description:
      "Professional assistance in property transactions, ensuring smooth closings and protecting your interests.",
    icon: "/vercel.svg",
  },
];