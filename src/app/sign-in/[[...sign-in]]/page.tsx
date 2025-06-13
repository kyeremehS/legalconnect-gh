"use client";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <div>
      
      <div className="flex flex-col bg-gradient-to-br from-[#e7daa5] via-[#ebeacf] to-[#eeeef2] md:flex-row py-36 md:gap-10 bg-gray-200 justify-center items-center h-auto">
        <SignIn 
          afterSignInUrl="/user-page"
          redirectUrl="/user-page"
          appearance={{
            elements: {
              formButtonPrimary: 'bg-[#d4a017] hover:bg-[#b38a15] text-sm normal-case',
              footerActionLink: 'text-[#d4a017] hover:text-[#b38a15]'
            }
          }}
        />
        <div className="text-white relative block">
          <div className="absolute inset-0 bg-[url('/Legalhammer.webp')] opacity-5"></div>
          <div className="relative z-10">
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
      </div>
    </div>
  );
}
