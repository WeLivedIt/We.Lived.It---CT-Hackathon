import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HomeLayout } from "@/components/Layout/HomeLayout";
import { useAccount } from "wagmi";
import ABI from "../../../contractFile.json";
import { useContractRead } from "wagmi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { OrganizationLoader } from "@/components/Loader/OrganizationLoader";
import { CreateOrganizationModal } from "@/components/modal/createOrganizationModal";

export type OrganizationParams = {
  id?: string;
  orgId?: BigInt;
  communityType: string;
  context: string;
  hateCategories: string[];
  model: string;
  isPrivate: boolean;
};

const defaultHateCategories = [
  "race",
  "gender",
  "religion",
  "nationality",
  "sexual orientation",
  "disability",
];

const ORGANIZATIONS_PER_PAGE = 6;

export default function OrganizationDashboard() {
  const router = useRouter();
  const { address } = useAccount();
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const [organizations, setOrganizations] = useState<OrganizationParams[]>([]);
  const [userOrganizations, setUserOrganizations] = useState<
    OrganizationParams[]
  >([]);
  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);
  const [newOrg, setNewOrg] = useState<OrganizationParams>({
    id: "",
    orgId: BigInt(""),
    communityType: "",
    context: "",
    hateCategories: [...defaultHateCategories],
    model: "",
    isPrivate: false,
  });
  const [selectedTab, setSelectedTab] = useState<"all" | "yours">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<string>("idle");

  const handleModalState = (state: boolean) => {
    setIsCreateOrgOpen(state);
  };

  const {
    data: orgData,
    isError,
    isLoading,
    error,
    refetch: fetchOrganization,
  } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: ABI.abi,
    functionName: "getAllOrganizationsGlobal",
  });

  const { data: userOrgData, isLoading: userIsLoading } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: ABI.abi,
    functionName: "getAllOrganizations",
    args: [address],
  });

  useEffect(() => {
    if (orgData && Array.isArray(orgData)) {
      const formattedOrgs = orgData.map((org) => ({
        id: org.admin,
        orgId: org.orgId,
        communityType: org.communityType,
        context: org.context,
        hateCategories: org.hateSpeechCategories,
        model: org.model,
        isPrivate: org.isPrivate,
      }));
      setOrganizations(formattedOrgs);
    }
    if (userOrgData && Array.isArray(userOrgData)) {
      const formattedOrgs = userOrgData.map((org) => ({
        id: org.admin,
        orgId: org.orgId,
        communityType: org.communityType,
        context: org.context,
        hateCategories: org.hateSpeechCategories,
        model: org.model,
        isPrivate: org.isPrivate,
      }));
      setUserOrganizations(formattedOrgs);
    }
  }, [orgData, userOrgData, address]);

  const filteredOrganizations =
    selectedTab === "all" ? organizations : userOrganizations;

  const searchedOrganizations = filteredOrganizations.filter(
    (org) =>
      org.communityType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.context.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(
    searchedOrganizations.length / ORGANIZATIONS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ORGANIZATIONS_PER_PAGE;
  const paginatedOrgs = searchedOrganizations.slice(
    startIndex,
    startIndex + ORGANIZATIONS_PER_PAGE
  );

  const handleClick = (orgId: BigInt, id: string) => {
    router.push({
      pathname: `/organization/${orgId}/${id}`,
    });
  };

  if (isLoading || status === "pending")
    return (
      <div>
        <OrganizationLoader />
      </div>
    );

  if (isError) return <div>Error: {error.shortMessage}</div>;
  if (userIsLoading) return <OrganizationLoader />;

  const reversedOrgs = paginatedOrgs.slice().reverse();

  return (
    <HomeLayout>
      <div className="flex w-full h-16 justify-between items-center">
        <h1 className="text-3xl font-bold mb-8">Organization Dashboard</h1>
        <button
          onClick={() => handleModalState(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14m-7-7h14" />
          </svg>
          <span>Create New Organization</span>
        </button>
      </div>

      <div className="w-full flex justify-between items-center mb-8">
        <div className="flex justify-start w-1/2">
          <input
            type="text"
            placeholder="Search organizations by type or context..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 rounded w-1/2 h-12"
          />
        </div>
        <div>
          <button
            className={`mr-4 ${selectedTab === "all" ? "font-bold" : ""}`}
            onClick={() => {
              setSelectedTab("all");
              setCurrentPage(1);
            }}
          >
            All Organizations
          </button>
          <button
            className={`${selectedTab === "yours" ? "font-bold" : ""}`}
            onClick={() => {
              setSelectedTab("yours");
              setCurrentPage(1);
            }}
          >
            Your Organizations
          </button>
        </div>
      </div>

      {reversedOrgs.length === 0 ? (
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          No available organizations. Please create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reversedOrgs.map((org) => (
            <div
              key={org.id}
              className="bg-white p-6 shadow-md cursor-pointer rounded-2xl"
              onClick={() => handleClick(org.orgId!, org.id!)}
            >
              <div className="mb-4">
                <div className="w-full flex justify-between">
                  <h2 className="text-xl font-bold">{org.communityType}</h2>
                  <p
                    className={`text-white px-2 py-1 rounded-2xl ${
                      org.isPrivate ? "bg-yellow-600" : "bg-green-600"
                    }`}
                  >
                    {org.isPrivate ? "private" : "public"}
                  </p>
                </div>
                <p className="text-gray-600">Context: {org.context}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Community Values:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {org.hateCategories.map((category) => (
                    <span
                      key={category}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex  w-full justify-end mt-6">
          <div className="flex w-1/6 items-center justify-end">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className=" text-black py-2 px-4 rounded flex items-center"
            >
              <FaChevronLeft />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="text-black py-2 px-4 rounded flex items-center"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}

      {isCreateOrgOpen && (
        <CreateOrganizationModal
          orgData={organizations}
          handleModalState={handleModalState}
          setStatus={setStatus}
          status={status}
        />
      )}
    </HomeLayout>
  );
}
