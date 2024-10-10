"use client";

import React, { useState, FC } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

const mockSubmitExperience = async (experience: {
  text: string;
  context: string;
  category: string;
  location: string;
}): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1500)); 
  return {
    success: true,
    message: "Your experience has been successfully submitted.",
  };
};

type SubmitExperienceProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SubmitExperience: FC<SubmitExperienceProps> = ({
  isOpen,
  onClose,
}) => {
  const [experience, setExperience] = useState({
    text: "",
    context: "",
    category: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !experience.text.trim() ||
      !experience.category ||
      !experience.location
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const result = await mockSubmitExperience(experience);
      if (result.success) {
        setSuccess(result.message);
        setExperience({ text: "", context: "", category: "", location: "" });
      } else {
        setError("Failed to submit experience. Please try again.");
      }
    } catch (err) {
      setError(
        "An error occurred while submitting your experience. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
            <div className="max-w-2xl mx-auto p-4 border rounded-lg shadow-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Submit Experience</h2>
                <p className="text-gray-600">
                  Share your lived experience with hate speech to help improve
                  our AI model and create a more inclusive online environment.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="experience-text"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Experience (required)
                    </label>
                    <textarea
                      id="experience-text"
                      className="w-full mt-1 p-2 border rounded-lg"
                      placeholder="Describe the hate speech incident you experienced..."
                      value={experience.text}
                      onChange={(e) =>
                        setExperience({ ...experience, text: e.target.value })
                      }
                      rows={5}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="experience-context"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Context (optional)
                    </label>
                    <textarea
                      id="experience-context"
                      className="w-full mt-1 p-2 border rounded-lg"
                      placeholder="Provide any relevant context about the incident..."
                      value={experience.context}
                      onChange={(e) =>
                        setExperience({
                          ...experience,
                          context: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="experience-category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category (required)
                    </label>
                    <select
                      id="experience-category"
                      className="w-full mt-1 p-2 border rounded-lg"
                      value={experience.category}
                      onChange={(e) =>
                        setExperience({
                          ...experience,
                          category: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option value="racial">Racial</option>
                      <option value="gender">Gender-based</option>
                      <option value="religious">Religious</option>
                      <option value="sexual-orientation">
                        Sexual Orientation
                      </option>
                      <option value="disability">Disability-related</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="experience-location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location (required)
                    </label>
                    <input
                      type="text"
                      id="experience-location"
                      className="w-full mt-1 p-2 border rounded-lg"
                      placeholder="City, Country"
                      value={experience.location}
                      onChange={(e) =>
                        setExperience({
                          ...experience,
                          location: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {error && (
                    <div
                      className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                      role="alert"
                    >
                      <strong>Error:</strong> {error}
                    </div>
                  )}

                  {success && (
                    <div
                      className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
                      role="alert"
                    >
                      <strong>Success:</strong> {success}
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Experience"}
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
