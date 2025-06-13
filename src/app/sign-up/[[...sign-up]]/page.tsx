import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row bg-gray-200 justify-center items-center h-screen">
      <div className="bg-gradient-to-br from-[#1A237E] via-[#1A237E]/95 to-[#1A237E]/90 p-12 text-white relative hidden md:block">
        <div className="absolute inset-0 bg-[url('/Legalhammer.webp')] opacity-5"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-16">
            <Image
              src="/legalb.jpg"
              alt="LegalConnect Logo"
              width={40}
              height={40}
              className="mr-3 animate-pulse"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-[#F9A825] bg-clip-text text-transparent">
              LegalConnect
            </span>
          </div>

          {/* <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#F9A825] to-white bg-clip-text text-transparent">
            Hello Captain 👋
          </h1> */}
          <p className="text-xl text-gray-200 mb-8 text-center">
            The platform where clients and legal consultants succeed together.
          </p>

          <div className="mt-12">
            <Image
              src="/Coat_of_arms_of_Ghana.svg"
              alt="Legal Illustration"
              width={400}
              height={300}
              className="mx-auto hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -inset-4 bg-[#F9A825]/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      <SignUp />
    </div>
  );
}
