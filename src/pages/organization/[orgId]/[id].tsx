import { useEffect, useState } from "react";
import {
  BarChart,
  MessageSquare,
  Vote,
  FileText,
  ArrowLeft,
} from "lucide-react"; 
import { useAccount, useContractRead } from "wagmi";
import { HateSpeechScanner } from "../../../components/modal/hateSpeechScanner";
import { SubmitExperience } from "../../../components/modal/submitExperience";
import { CommunityConfiguration } from "../../../components/modal/CommunityConfiguration";
import { HomeLayout } from "@/components/Layout/HomeLayout";
import { useRouter } from "next/router";
import ABI from "../../../../contractFile.json";
import { OrganizationLoader } from "@/components/Loader/OrganizationLoader";
import { NoAccess } from "@/components/NoAccess";
export default function Dashboard() {
  const router = useRouter();

  const { orgId, id } = router.query;

  interface Organization {
    id: string; 
    communityType: string;
    context: string;
    hateCategories: string[];
    isPrivate: boolean;
  }

  const { address } = useAccount();
  const [openHTScanner, setOpenHTScanner] = useState<boolean>(false);
  const [openExperience, setOpenExperience] = useState<boolean>(false);
  const [openCommunityConfigurations, setCommunityConfiguration] =
    useState<boolean>(false);
  const [openCommunityVote, setCommunityVote] = useState<boolean>(false);
  const [openLiveExperience, setLiveExperience] = useState<boolean>(false);
  const [notAllowed, setNotAllowed] = useState<boolean>(false);
  const [organization, setOrganization] = useState<Organization>();

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
      title: "NFT Lived Experience",
      description: "Increase your voting power",
      buttonText: "Create NFT",
      icon: <FileText className="h-8 w-8 text-yellow-500" />,
      action: () => setLiveExperience(true),
    },
  ];


  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const {
    data: singleOrg,
    isError,
    isLoading,
    error,
  } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: ABI.abi,
    functionName: "getOrganizationById",
    args: [id, orgId],
  });

  useEffect(() => {
    if (organization?.id != address && organization?.isPrivate) {
      setNotAllowed(true);
    }
  }, [address, organization]);

  useEffect(() => {
    if (singleOrg && Array.isArray(singleOrg)) {
      console.log(singleOrg, "ewee>>>");
      const formattedOrgs = {
        id: id as string,
        orgId: singleOrg[0] as string,
        communityType: singleOrg[1] as string,
        context: singleOrg[2] as string,
        hateCategories: singleOrg[3] as string[],
        isPrivate: singleOrg[4] as boolean,
      };
      setOrganization(formattedOrgs);
    }
  }, [singleOrg, address]);

  if (isLoading) return <OrganizationLoader />;
  if (isError) return <div>Error: {error.shortMessage}</div>;

  return (
    <HomeLayout>
      <div className="mb-6 h-ful">
        <button
          className="flex items-center text-blue-500"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
      </div>
      {notAllowed && <NoAccess />}
      {!notAllowed && (
        <div>
          <div className="flex justify-between items-center gap-4 bg-white p-6 shadow-md rounded-2xl mb-8">
            <div className="bg-white p-6 shadow-md rounded-xl">
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                Organization Details
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="">
                  <span className="font-bold text-gray-700">
                    Community Type:{" "}
                  </span>
                  <span className="text-gray-600">
                    {organization?.communityType}
                  </span>
                </div>

                <div className="">
                  <span className="font-bold text-gray-700">Creator: </span>
                  <span className="text-gray-600">{organization?.id}</span>
                </div>

                <div className="">
                  <span className="font-bold text-gray-700">Context: </span>
                  <span className="text-gray-600">{organization?.context}</span>
                </div>

                <div className="">
                  <span className="font-bold text-gray-700">
                    Private Community:{" "}
                  </span>
                  <span className="text-gray-600">
                    {organization?.isPrivate}
                  </span>
                </div>

                <div className="">
                  <span className="font-bold text-gray-700">Created At: </span>
                  <span className="text-gray-600">N/A</span>
                </div>

                <div className="">
                  <span className="font-bold text-gray-700">Updated At: </span>
                  <span className="text-gray-600">N/A</span>
                </div>

                <div className="col-span-2 mt-4">
                  <span className="font-bold text-gray-700">
                    Community Values:{" "}
                  </span>
                  <ul className="list-disc mt-2 flex flex-wrap gap-2">
                    {organization?.hateCategories.map((category) => (
                      <li
                        key={category}
                        className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <section className="">
                <div className="bg-white shadow rounded-lg p-6">
                  {/* 2x2 grid with gaps */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                    <div className="text-center bg-white shadow-md rounded-lg p-6">
                      <p className="text-4xl font-bold text-gray-900">150+</p>
                      <p className="text-gray-600">Experiences Submitted</p>
                    </div>
                    <div className="text-center bg-white shadow-md rounded-lg p-6">
                      <p className="text-4xl font-bold text-gray-900">25+</p>
                      <p className="text-gray-600">Hate Speech Identified</p>
                    </div>
                    <div className="text-center bg-white shadow-md rounded-lg p-6">
                      <p className="text-4xl font-bold text-gray-900">500+</p>
                      <p className="text-gray-600">Community Members</p>
                    </div>
                    <div className="text-center bg-white shadow-md rounded-lg p-6">
                      <p className="text-4xl font-bold text-gray-900">100+</p>
                      <p className="text-gray-600">Projects Launched</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-md rounded-2xl cursor-pointer"
                onClick={card.action}
              >
                <div className="flex gap-2 items-center">
                  <div>{card.icon}</div>
                  <div className="text-xl font-bold">{card.title}</div>
                </div>
                <p className="text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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
