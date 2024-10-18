// pages/dashboard.tsx
import { useEffect, useState } from "react";
import { BarChart, MessageSquare, Vote, FileText, PenTool } from "lucide-react";
import { useAccount } from "wagmi";
import { PassportReader } from "@gitcoinco/passport-sdk-reader";
import { HateSpeechScanner } from "../components/modal/hateSpeechScanner";
import { SubmitExperience } from "../components/modal/submitExperience";
import { CommunityConfiguration } from "../components/modal/CommunityConfiguration";
// import { Layout } from "../components/Layout"; // Import Layout
import { HomeLayout } from "@/components/Layout/HomeLayout";

export default function Dashboard() {
  const { address, chainId } = useAccount();
  const [openHTScanner, setOpenHTScanner] = useState<boolean>(false);
  const [openExperience, setOpenExperience] = useState<boolean>(false);
  const [openCommunityConfigurations, setCommunityConfiguration] =
    useState<boolean>(false);
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
      title: "Community Settings",
      description: "Configure Ai Model",
      buttonText: "Scan Text",
      icon: <BarChart className="h-8 w-8 text-blue-500" />,
      action: () => setCommunityConfiguration(true),
    },
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
    <HomeLayout>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center space-x-2 text-3xl font-bold text-gray-900">
                  {card.icon}
                  <span>{card.title}</span>
                </div>
                <p className="text-lg text-gray-500 mt-1">{card.description}</p>
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
              <p className="text-4xl font-bold text-gray-900">150+</p>
              <p className="text-gray-600">Experiences Submitted</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">25+</p>
              <p className="text-gray-600">Hate Speech Identified</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900">500+</p>
              <p className="text-gray-600">Community Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
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
      {openCommunityConfigurations && (
        <CommunityConfiguration
          isOpen={openCommunityConfigurations}
          onClose={() => setCommunityConfiguration(false)}
        />
      )}
    </HomeLayout>
  );
}
