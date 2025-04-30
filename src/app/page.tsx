import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/next.svg"
              alt="LegalConnect Logo"
              width={40}
              height={40}
            />
            <span className="ml-2 text-xl font-bold">LegalConnect</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#services" className="hover:text-blue-400">
              Services
            </a>
            <a href="#about" className="hover:text-blue-400">
              About
            </a>
            <a href="#contact" className="hover:text-blue-400">
              Contact
            </a>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Expert Legal Solutions for Your Peace of Mind
              </h1>
              <p className="text-xl mb-8">
                Connect with experienced attorneys and get the legal help you
                need, when you need it.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold">
                Get Started
              </button>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <Image
                src="/file.svg"
                alt="Justice illustration"
                width={500}
                height={400}
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-8">Schedule your free consultation today</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100">
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LegalConnect</h3>
              <p className="text-gray-400">
                Your trusted partner in legal solutions
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Corporate Law</li>
                <li>Family Law</li>
                <li>Real Estate</li>
                <li>Immigration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contact@legalconnect.com</li>
                <li>1-800-LEGAL-HELP</li>
                <li>123 Law Street</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {/* Add social media icons here */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const services = [
  {
    title: "Corporate Law",
    description: "Expert guidance for businesses of all sizes",
    icon: "/globe.svg",
  },
  {
    title: "Family Law",
    description: "Compassionate support for family matters",
    icon: "/next.svg",
  },
  {
    title: "Real Estate",
    description: "Professional assistance in property transactions",
    icon: "/vercel.svg",
  },
];
