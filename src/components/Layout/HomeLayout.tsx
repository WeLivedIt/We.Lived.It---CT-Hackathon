// components/Layout.tsx
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import WLT from "../../Assets/Images/WeLivedIt_Logo.jpg";

interface LayoutProps {
  children: ReactNode;
}

export const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      <header className="w-full bg-white shadow-sm">
        <div className="flex justify-between mx-6 px-4 py-4 items-center">
          <div className="flex items-center space-x-4">
            <Image src={WLT} width={48} height={48} alt="WelivedItBg" />
            <h1 className="text-xl font-bold text-gray-900">WeLivedIt.AI</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-grow px-12 py-8 overflow-scroll">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About Us</h4>
              <p className="text-gray-300">
                Empowering marginalized voices in AI governance through
                community-driven hate speech detection and mitigation.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
