import React from "react";
import { Button } from "@/components/Button";
import Link from "next/link";
import { BarChart, MessageSquare, Vote, FileText, PenTool } from "lucide-react";

const cardData = [
  {
    title: "Hate Speech Scanner",
    description: "Analyze text for potential hate speech",
    buttonText: "Scan Text",
    icon: <BarChart className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Submit Experience",
    description: "Share your lived experience with hate speech",
    buttonText: "Submit",
    icon: <MessageSquare className="h-8 w-8 text-green-500" />,
  },
  {
    title: "Community Voting",
    description: "Vote on submissions for model fine-tuning",
    buttonText: "Vote Now",
    icon: <Vote className="h-8 w-8 text-purple-500" />,
  },
  {
    title: "Create Lived Experience NFT",
    description: "Increase your voting power",
    buttonText: "Create NFT",
    icon: <FileText className="h-8 w-8 text-yellow-500" />,
  },
];

export default function Dashboard() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      <header className="w-full  bg-white shadow-sm">
        <div className="flex justify-between  mx-6 px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h1 className="text-xl font-bold text-gray-900">PeaceKeeper.AI</h1>
          </div>
          <nav className="flex self-center space-x-4 text-lg">
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              Home
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              About
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <span className="text-lg text-gray-500">
              Connected: 0x1234...5678
            </span>

            <Button>Disconnect</Button>
          </div>
        </div>
      </header>

      <main className="w-full flex-grow px-12 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center space-x-2 text-3xl font-bold text-gray-900">
                    {card.icon}
                    <span>{card.title}</span>
                  </div>
                  <p className="text-lg text-gray-500 mt-1">
                    {card.description}
                  </p>
                </div>
                <button className="w-full mt-12 bg-blue-600 text-white text-lg text-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Community Impact
          </h3>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">10,234</p>
                <p className="text-gray-500">Texts Analyzed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">1,567</p>
                <p className="text-gray-500">Experiences Submitted</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">8,901</p>
                <p className="text-gray-500">Community Votes Cast</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Language Impact Across Regions
          </h3>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <PenTool className="h-12 w-12 text-gray-400" />
              <span className="ml-2 text-gray-500">
                Interactive Language Impact Map
              </span>
            </div>
          </div>
        </section>
      </main>

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
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
