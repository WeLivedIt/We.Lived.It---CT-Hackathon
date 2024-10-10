import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { BarChart, MessageSquare, Vote, FileText, PenTool } from "lucide-react";
import { useAccount } from "wagmi";
import { PassportReader } from "@gitcoinco/passport-sdk-reader";
import { HateSpeechScanner } from "../components/modal/hateSpeechScanner";
import { SubmitExperience } from "../components/modal/submitExperience";

export default function Dashboard() {
  const { address, chainId } = useAccount();
  const [openHTScanner, setOpenHTScanner] = useState<boolean>(false);
  const [openExperience, setOpenExperience] = useState<boolean>(false);
  const [openCommunityVote, setCommunityVote] = useState<boolean>(false);
  const [openLiveExperience, setLiveExperience] = useState<boolean>(false);

  const reader = new PassportReader(
    "https://ceramic-clay.3boxlabs.com",
    chainId?.toString()
  );

  console.log(reader, "reader");

  useEffect(() => {
    const getPassport = async () => {
      if (address) {
        const passport = await reader.getPassport(address.toString());
        console.log(passport, "passport");
      }
    };

    getPassport();
  }, [address]);

  const cardData = [
    {
      title: "Hate Speech Scanner",
      description: "Analyze text for potential hate speech",
      buttonText: "Scan Text",
      icon: <BarChart className="h-8 w-8 text-blue-500" />,
      action: () => setOpenHTScanner(true),
    },
    {
      title: "Submit Experience",
      description: "Share your lived experience with hate speech",
      buttonText: "Submit",
      icon: <MessageSquare className="h-8 w-8 text-green-500" />,
      action: () => setOpenExperience(true),
    },
    {
      title: "Community Voting",
      description: "Vote on submissions for model fine-tuning",
      buttonText: "Vote Now",
      icon: <Vote className="h-8 w-8 text-purple-500" />,
      action: () => setCommunityVote(true),
    },
    {
      title: "Create Lived Experience NFT",
      description: "Increase your voting power",
      buttonText: "Create NFT",
      icon: <FileText className="h-8 w-8 text-yellow-500" />,
      action: () => setLiveExperience(true),
    },
  ];

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      <header className="w-full bg-white shadow-sm">
        <div className="flex justify-between mx-6 px-4 py-4 items-center">
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
            <h1 className="text-xl font-bold text-gray-900">LivedIt.AI</h1>
          </div>
          <nav className="flex space-x-4 text-lg">
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
            <ConnectButton />
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
                <button
                  className="w-full mt-12 bg-blue-600 text-white text-lg text-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                  onClick={card.action}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Community Impact Section */}
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

        {/* Language Impact Section */}
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
                <a href="#" className="text-gray-300 hover:text-white"></a>
                <a href="#" className="text-gray-300 hover:text-white"></a>
                <a href="#" className="text-gray-300 hover:text-white"></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {openHTScanner && (
        <HateSpeechScanner
          isOpen={openHTScanner}
          onClose={() => setOpenHTScanner(false)}
        />
      )}
      {openExperience && (
        <SubmitExperience
          isOpen={openExperience}
          onClose={() => setOpenExperience(false)}
        />
      )}
    </div>
  );
}
