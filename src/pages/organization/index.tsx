import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HomeLayout } from "@/components/Layout/HomeLayout";
import { useWriteContract, useAccount } from "wagmi";
import ABI from "../../../contractFile.json";
import { useContractRead } from "wagmi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { OrganizationLoader } from "@/components/Loader/OrganizationLoader";

export type Organization = {
  id?: string;
  orgId?: string;
  communityType: string;
  context: string;
  hateCategories: string[];
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
  const {
    data: hash,
    writeContract,
    isPending,
    isSuccess,
    isError: creationIsError,
    error: creationError,
  } = useWriteContract();
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [userOrganizations, setUserOrganizations] = useState<Organization[]>(
    []
  );
  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);
  const [newOrg, setNewOrg] = useState<Organization>({
    id: "",
    orgId: "",
    communityType: "",
    context: "",
    hateCategories: [...defaultHateCategories],
    isPrivate: false,
  });
  const [selectedTab, setSelectedTab] = useState<"all" | "yours">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);

  const [additionalCategory, setAdditionalCategory] = useState<string>("");

  const {
    data: orgData,
    isError,
    isLoading,
    error,
    refetch,
  } = useContractRead({
    address: contractAddress as `0x${string}`,
    abi: ABI.abi,
    functionName: "getAllOrganizationsGlobal",
  });

  const {
    data: userOrgData,
    isError: userIsError,
    isLoading: userIsLoading,
    error: userError,
  } = useContractRead({
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
        isPrivate: org.isPrivate,
      }));
      setUserOrganizations(formattedOrgs);
    }
  }, [orgData, userOrgData, address]);

  const handleCreateOrg = async () => {
    if (
      newOrg.communityType &&
      newOrg.context &&
      newOrg.hateCategories.length > 0
    ) {
      const createdOrg: Organization = {
        ...newOrg,
      };

      try {
        await writeContract({
          address: contractAddress as `0x${string}`,
          abi: ABI.abi,
          functionName: "createOrganization",
          args: [
            newOrg.communityType,
            newOrg.context,
            newOrg.hateCategories,
            newOrg.isPrivate,
          ],
        });

        if (isSuccess) {
          toast.success("Organization successfully saved to the blockchain!");
          refetch();

        } else if (creationIsError) {
          toast.error(`Error: ${creationError}`);
        }

        setIsCreateOrgOpen(false);
        setNewOrg({
          communityType: "",
          context: "",
          hateCategories: [...defaultHateCategories],
          isPrivate: false,
        });
        setAdditionalCategory("");
      } catch (error) {
        console.error("Transaction failed", error);
        toast.error("Failed to create the organization. Please try again.");
      }
    } else {
      toast.error(
        "Please fill in all fields and select at least one hate category."
      );
    }
  };

  const filteredOrganizations = (
    selectedTab === "all" ? organizations : userOrganizations
  )

  const totalPages = Math.ceil(
    filteredOrganizations.length / ORGANIZATIONS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ORGANIZATIONS_PER_PAGE;
  const paginatedOrgs = filteredOrganizations.slice(
    startIndex,
    startIndex + ORGANIZATIONS_PER_PAGE
  );

  const handleClick = (orgId: string, id: string) => {
    router.push({
      pathname: `/organization/${orgId}/${id}`,
    });
  };

  if (isLoading || isPending)
    return (
      <div>
        <OrganizationLoader />
      </div>
    );
  if (isError) return <div>Error: {error.shortMessage}</div>;
  if (userIsLoading) return <OrganizationLoader />;

  return (
    <HomeLayout>
      <div className="flex w-full h-16 justify-between items-center">
        <h1 className="text-3xl font-bold mb-8">Organization Dashboard</h1>
        <button
          onClick={() => setIsCreateOrgOpen(true)}
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

      {paginatedOrgs.length === 0 ? (
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          No available organizations. Please create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedOrgs
            .slice()
            .reverse()
            .map((org) => (
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl p-8 w-96">
            <h2 className="text-xl font-bold mb-4">Create New Organization</h2>
            <p className="text-gray-600 mb-4">
              Set up a new organization and configure its AI model for hate
              speech detection.
            </p>
            <div className="mb-4">
              <label
                htmlFor="community-type"
                className="block text-sm font-medium text-gray-700"
              >
                Organization Name
              </label>
              <input
                id="community-type"
                value={newOrg.communityType}
                onChange={(e) =>
                  setNewOrg({ ...newOrg, communityType: e.target.value })
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="context"
                className="block text-sm font-medium text-gray-700"
              >
                Context
              </label>
              <input
                id="context"
                value={newOrg.context}
                onChange={(e) =>
                  setNewOrg({ ...newOrg, context: e.target.value })
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                type="text"
              />
            </div>
            <div className="mb-4 h-1/2 overflow-y-auto">
              <label className="block text-sm font-medium text-gray-700">
                Community Values
              </label>
              <div className="flex flex-col space-y-2 mt-2 max-h-48 overflow-y-auto">
                {newOrg.hateCategories
                  .slice()
                  .reverse()
                  .map((category, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newOrg.hateCategories.includes(category)}
                        onChange={() => {
                          const updatedCategories =
                            newOrg.hateCategories.includes(category)
                              ? newOrg.hateCategories.filter(
                                  (c) => c !== category
                                )
                              : [...newOrg.hateCategories, category];

                          setNewOrg({
                            ...newOrg,
                            hateCategories: updatedCategories,
                          });
                        }}
                      />
                      <span className="ml-2">{category}</span>
                    </div>
                  ))}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Add new category"
                  value={additionalCategory}
                  onChange={(e) => setAdditionalCategory(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
                <button
                  className="ml-2 bg-blue-500 text-white py-1 px-3 rounded"
                  onClick={() => {
                    if (additionalCategory.trim()) {
                      setNewOrg((prev) => ({
                        ...prev,
                        hateCategories: [
                          ...prev.hateCategories,
                          additionalCategory.trim(),
                        ],
                      }));
                      setAdditionalCategory("");
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="is-private"
                checked={newOrg.isPrivate}
                onChange={(e) =>
                  setNewOrg({ ...newOrg, isPrivate: e.target.checked })
                }
              />
              <label
                htmlFor="is-private"
                className="ml-2 text-sm font-medium text-gray-700"
              >
                Private Organization
              </label>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setIsCreateOrgOpen(false)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrg}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}
