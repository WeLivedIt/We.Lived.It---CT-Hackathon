import { useState, FC, useEffect, Dispatch, SetStateAction } from "react";
import { useWriteContract } from "wagmi";
import ABI from "../../../contractFile.json";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai";
import { OrganizationParams } from "@/pages/organization";
import { OrganizationLoader } from "@/components/Loader/OrganizationLoader";
import { HomeLayout } from "@/components/Layout/HomeLayout";

const defaultHateCategories = [
  "race",
  "gender",
  "religion",
  "nationality",
  "sexual orientation",
  "disability",
];

type CreateOrganizationParams = {
  orgData: OrganizationParams[];
  handleModalState: (state: boolean) => void;
  setStatus: Dispatch<SetStateAction<string>>;
  status: string;
};

export const CreateOrganizationModal: FC<CreateOrganizationParams> = ({
  orgData,
  handleModalState,
  setStatus,
  status,
}) => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const {
    writeContract,
    isSuccess,
    isError: creationIsError,
    error: creationError,
    isPending,
  } = useWriteContract();

  const [additionalCategory, setAdditionalCategory] = useState<string>("");
  const [isClonedOrg, setIsClonedOrg] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<OrganizationParams | null>(
    null
  );
  const [isAddValueModalOpen, setIsAddValueModalOpen] = useState(false);

  const [newOrg, setNewOrg] = useState<OrganizationParams>({
    id: "",
    orgId: BigInt(""),
    communityType: "",
    context: (selectedOrg && selectedOrg?.context) || "",
    hateCategories: [...defaultHateCategories],
    model: "",
    isPrivate: false,
  });

  console.log(newOrg, "e2q");
  const handleCreateOrg = async () => {
    let orgName = newOrg.communityType;

    if (!orgName.toUpperCase().endsWith(".AI")) {
      orgName = `${newOrg.communityType}.AI`.toUpperCase();
    }

    if (
      newOrg.communityType &&
      newOrg.context &&
      newOrg.model &&
      newOrg.hateCategories.length > 0
    ) {
      setStatus("pending");

      try {
        writeContract({
          address: contractAddress as `0x${string}`,
          abi: ABI.abi,
          functionName: "createOrganization",
          args: [
            newOrg.communityType || orgName,
            newOrg.context,
            newOrg.hateCategories,
            newOrg.model,
            newOrg.isPrivate,
          ],
        });

        setStatus("success");

        handleModalState(false);

        if (isSuccess) {
          toast.success("Organization successfully saved to the blockchain!");
          resetForm();
        } else if (creationIsError) {
          setStatus("error");
          toast.error(`Error: ${creationError}`);
        }
      } catch (error) {
        console.error("Transaction failed", error);
        setStatus("error");
        toast.error("Failed to create the organization. Please try again.");
      }
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  const resetForm = () => {
    setNewOrg({
      id: "",
      orgId: BigInt(""),
      communityType: "",
      context: "",
      hateCategories: [...defaultHateCategories],
      model: "",
      isPrivate: false,
    });
    setAdditionalCategory("");
    setSelectedOrg(null);
    setIsClonedOrg(false);
  };

  const handleOrgSelection = (orgId: any) => {
    const org = orgData.find((org) => org.orgId === BigInt(orgId));
    setSelectedOrg(org || null);
  };

  const handleAddCommunityValue = () => {
    if (additionalCategory.trim()) {
      setNewOrg((prev) => ({
        ...prev,
        hateCategories: [...prev.hateCategories, additionalCategory.trim()],
      }));
      setAdditionalCategory("");
      setIsAddValueModalOpen(false);
    } else {
      toast.error("Please enter a community value.");
    }
  };

  const countWords = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word).length;
  };

  const handleContextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const wordCount = countWords(text);
    if (wordCount <= 50) {
      setNewOrg({ ...newOrg, context: text });
    } else {
      toast.error("You have exceeded the maximum word limit of 1000 words.");
    }
  };

  useEffect(() => {
    if (selectedOrg && !newOrg.model) {
      setNewOrg((prevOrg) => ({
        ...prevOrg,
        model: selectedOrg.model,
        context: selectedOrg.context,
        hateCategories: selectedOrg.hateCategories,
      }));
    }
  }, [selectedOrg]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl p-8 w-3/4 md:w-2/3 lg:w-1/2">
        <h2 className="text-xl font-bold mb-4">Create New Organization</h2>
        <p className="text-gray-600 mb-4">
          Set up a new organization and configure its AI model for hate speech
          detection.
        </p>
        <div className="flex gap-12">
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
              Private
            </label>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="cloned-organization"
              checked={isClonedOrg}
              onChange={(e) => setIsClonedOrg(e.target.checked)}
            />
            <label
              htmlFor="cloned-organization"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Cloned Organization Model
            </label>
          </div>
        </div>

        {isClonedOrg && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select an Organization
            </label>
            <select
              onChange={(e) => handleOrgSelection(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="">--Select an Organization--</option>
              {orgData
                .filter((org) => !org.isPrivate)
                .map((org) => {
                  const id = Number(org.orgId);
                  return (
                    <option key={id} value={id}>
                      {`${org.communityType}`}
                    </option>
                  );
                })}
            </select>
          </div>
        )}

        <div className="flex w-full mb-4 gap-4">
          <div className="w-1/2">
            <label
              htmlFor="organization-name"
              className="block text-sm font-medium text-gray-700"
            >
              Organization Name
            </label>
            <input
              id="organization-name"
              value={newOrg.communityType}
              onChange={(e) =>
                setNewOrg({ ...newOrg, communityType: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              type="text"
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="organization-type"
              className="block text-sm font-medium text-gray-700"
            >
              Model
            </label>
            <select
              id="organization-type"
              value={newOrg.model || selectedOrg?.model}
              onChange={(e) => setNewOrg({ ...newOrg, model: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Choose model</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
              <option value="gpt-3.5-turbo">GPT-3.5</option>
              <option value="gpt-3.0">GPT-3.0</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="context"
            className="block text-sm font-medium text-gray-700"
          >
            Context
          </label>
          <textarea
            id="context"
            value={newOrg.context || selectedOrg?.context}
            onChange={handleContextChange}
            className="mt-1 block w-full h-32 p-2 border border-gray-300 rounded"
            disabled={!!selectedOrg?.context}
          />
          <p className="text-sm text-gray-500 mt-1">
            {countWords(newOrg.context)} / 50 words
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            Community Values
            <button
              onClick={() => setIsAddValueModalOpen(true)}
              className="ml-4 flex text-blue-500 items-center border border-grey-600 px-2 rounded-lg"
            >
              <div className="font-bold">Add</div>
              <AiOutlinePlus />
            </button>
          </label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {selectedOrg?.hateCategories
              ? selectedOrg?.hateCategories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedOrg.hateCategories.includes(category)}
                      onChange={() => {
                        const updatedCategories =
                          selectedOrg?.hateCategories.includes(category)
                            ? selectedOrg?.hateCategories.filter(
                                (c) => c !== category
                              )
                            : [...selectedOrg?.hateCategories, category];
                        setNewOrg({
                          ...newOrg,
                          hateCategories: updatedCategories,
                        });
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {category}
                    </span>
                  </div>
                ))
              : newOrg.hateCategories.map((category, index) => (
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
                    <span className="ml-2 text-sm text-gray-700">
                      {category}
                    </span>
                  </div>
                ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => handleModalState(false)}
            className="px-4 py-2 bg-gray-300 rounded text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateOrg}
            className="px-4 py-2 bg-blue-500 rounded text-white"
            disabled={status === "pending"}
          >
            Save Organization
          </button>
        </div>
      </div>

      {isAddValueModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-lg font-semibold mb-4">
              Add New Community Value
            </h2>
            <input
              value={additionalCategory}
              onChange={(e) => setAdditionalCategory(e.target.value)}
              className="border border-gray-300 rounded w-full p-2 mb-4"
              placeholder="Enter community value"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAddValueModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCommunityValue}
                className="px-4 py-2 bg-blue-500 rounded text-white"
              >
                Add Value
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
