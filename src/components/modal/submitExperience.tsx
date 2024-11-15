"use client";

import React, { useState, FC } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

const mockSubmitExperience = async (
  experience: any
): Promise<{ success: boolean; message: string }> => {
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
    date: "",
    platform: "",
    type: "",
    dataSubmission: "",
    contextSimilarIncidents: "",
    contextCircumstances: "",
    impactPersonal: "",
    impactCommunity: "",
    impactSeverity: 1,
    identityFactors: [],
    responseActions: "",
    responseReport: "",
    responseOutcome: "",
    additionalInfo: "", // Added this field
    willingToContact: false,
    verification: "",
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 5));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const result = await mockSubmitExperience(experience);
      if (result.success) {
        setSuccess(result.message);
        setExperience({
          date: "",
          platform: "",
          type: "",
          dataSubmission: "",
          contextSimilarIncidents: "",
          contextCircumstances: "",
          impactPersonal: "",
          impactCommunity: "",
          impactSeverity: 1,
          identityFactors: [],
          responseActions: "",
          responseReport: "",
          responseOutcome: "",
          additionalInfo: "",
          willingToContact: false,
          verification: "",
        });
      } else {
        setError("Failed to submit experience. Please try again.");
      }
    } catch {
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
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity w-full"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="relative w-3/6 h-5/6 transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
            <div className="h-full w-full overflow-y-scroll p-4 border rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold">Submit Your Experience</h2>
              <p className="text-gray-600 mt-2">
                Submit your example of hate speech to help improve our model
                using data based on real-world lived experiences. Every
                submission helps to create more inclusive online spaces.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Insert your step logic here */}
                {/* Step content as per your requirements */}

                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Step 1: Basic Information
                    </h3>
                    <label className="block">
                      Date of Experience:
                      <input
                        type="date"
                        className="w-full mt-1 p-2 border rounded-lg"
                        value={experience.date}
                        onChange={(e) =>
                          setExperience({ ...experience, date: e.target.value })
                        }
                        required
                      />
                    </label>
                    <label className="block">
                      Location/Platform:
                      <input
                        type="text"
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="e.g., workplace name, website, app, institution"
                        value={experience.platform}
                        onChange={(e) =>
                          setExperience({
                            ...experience,
                            platform: e.target.value,
                          })
                        }
                        required
                      />
                    </label>
                    <label className="block">
                      Type:
                      <select
                        className="w-full mt-1 p-2 border rounded-lg"
                        value={experience.type}
                        onChange={(e) =>
                          setExperience({ ...experience, type: e.target.value })
                        }
                        required
                      >
                        <option value="">Select type</option>
                        <option>Email</option>
                        <option>Comment section</option>
                        <option>Social Media Post</option>
                      </select>
                    </label>
                    <label className="block">
                      Data Submission:
                      <textarea
                        className="w-full h-32 mt-1 p-2 border rounded-lg"
                        placeholder="Attach or paste relevant data, such as transcripts, or records"
                        value={experience.dataSubmission}
                        onChange={(e) =>
                          setExperience({
                            ...experience,
                            dataSubmission: e.target.value,
                          })
                        }
                        required
                      />
                    </label>
                  </div>
                )}
                {/* {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Step 2: Type & Data Submission
                    </h3>
                    <label className="block">
                      Type:
                      <select
                        className="w-full mt-1 p-2 border rounded-lg"
                        value={experience.type}
                        onChange={(e) =>
                          setExperience({ ...experience, type: e.target.value })
                        }
                        required
                      >
                        <option value="">Select type</option>
                        <option>Email</option>
                        <option>Comment section</option>
                        <option>Social Media Post</option>
                      </select>
                    </label>
                    <label className="block">
                      Data Submission:
                      <textarea
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="Attach or paste relevant data, such as screenshots, transcripts, or records"
                        value={experience.dataSubmission}
                        onChange={(e) =>
                          setExperience({
                            ...experience,
                            dataSubmission: e.target.value,
                          })
                        }
                        required
                      />
                    </label>
                  </div>
                )} */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Step 2: Context</h3>
                    <label className="block">
                      Have you experienced similar incidents before?
                      <textarea
                        className="w-full h-32 mt-1 p-2 border rounded-lg"
                        placeholder="If yes, how often?"
                        value={experience.contextSimilarIncidents}
                        onChange={(e) =>
                          setExperience({
                            ...experience,
                            contextSimilarIncidents: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="block">
                      Were there any specific circumstances that contributed to
                      this incident?
                      <textarea
                        className="w-full h-32 mt-1 p-2 border rounded-lg"
                        placeholder="e.g., posting or discussing specific topics"
                        value={experience.contextCircumstances}
                        onChange={(e) =>
                          setExperience({
                            ...experience,
                            contextCircumstances: e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Step 3: Impact</h3>
                    <label className="block">
                      How did this incident affect you personally?
                      <textarea
                        className="w-full h-32 mt-1 p-2 border rounded-lg"
                        value={experience.impactPersonal}
                        onChange={(e) =>
                          setExperience({
                            ...experience,
                            impactPersonal: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="block">
                      Did this incident have broader implications for your life
                      or community?
                      <textarea
                        className="w-full h-32 mt-1 p-2 border rounded-lg"
                        value={experience.impactCommunity}
                        onChange={(e) =>
                          setExperience({
                            ...experience,
                            impactCommunity: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label className="block">
                      Severity (1-10):
                      <input
                        type="range"
                        min="1"
                        max="10"
                        className="w-full mt-1"
                        value={experience.impactSeverity}
                        onChange={(e) =>
                          setExperience({
                            ...experience,
                            impactSeverity: +e.target.value,
                          })
                        }
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>1</span>
                        <span>10</span>
                      </div>
                      <div className="text-center mt-2 text-gray-700">
                        Selected Severity: {experience.impactSeverity}
                      </div>
                    </label>
                  </div>
                )}
                {step === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Step 4: Identity Factors
                    </h3>

                    {/* Identity Factors Checkboxes */}
                    <p className="text-gray-700">
                      Identity Factors (Optional: Select all that apply)
                    </p>
                    <div className="space-y-2">
                      {[
                        "Race/Ethnicity",
                        "Gender Identity",
                        "Sexual Orientation",
                        "Age",
                        "Disability",
                        "Religion",
                        "Socioeconomic Status",
                        "Language/Accent",
                      ].map((factor) => (
                        <label
                          key={factor}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                            checked={true}
                            onChange={(e) => {
                              const newFactors = e.target.checked
                                ? [...experience.identityFactors, factor]
                                : experience.identityFactors.filter(
                                    (f) => f !== factor
                                  );
                              setExperience({
                                ...experience,
                             
                              });
                            }}
                          />
                          <span className="text-gray-700">{factor}</span>
                        </label>
                      ))}

                      {/* Other Factor with Input Field */}
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded"
                          checked={true}
                          onChange={(e) => {
                            const newFactors = e.target.checked
                              ? [...experience.identityFactors, "Other"]
                              : experience.identityFactors.filter(
                                  (f) => f !== "Other"
                                );
                            setExperience({
                              ...experience,
                         
                            });
                          }}
                        />
                        <span className="text-gray-700">Other:</span>
                      </label>
                      {experience.identityFactors && (
                        <input
                          type="text"
                          placeholder="Specify other factor"
                          className="w-full mt-1 p-2 border rounded-lg"
                          value={""}
                          onChange={(e) =>
                            setExperience({
                              ...experience,
                  
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Step 5: Response and Additional Information
                    </h3>

                    {/* Response Section */}
                    <p className="text-gray-700 font-semibold">Response:</p>

                    <label className="block">
                      a. Did you take any action in response to this incident?
                      If yes, what?
                      <textarea
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="Describe any actions taken in response to the incident..."
                        value={""}
                        onChange={(e) =>
                          setExperience({
                            ...experience,
                            
                          })
                        }
                        rows={3}
                      />
                    </label>

                    <label className="block">
                      b. Was there an official channel to report this incident?
                      If yes, did you use it?
                      <textarea
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="Explain if there was a reporting channel and if you used it..."
                        value={""}
                        onChange={(e) =>
                          setExperience({
                            ...experience,
                         
                          })
                        }
                        rows={3}
                      />
                    </label>

                    <label className="block">
                      c. What was the outcome of any actions taken?
                      <textarea
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="Describe the outcome of any actions taken in response..."
                        value={""}
                        onChange={(e) =>
                          setExperience({
                            ...experience,
                   
                          })
                        }
                        rows={3}
                      />
                    </label>

                    {/* Additional Context Section */}
                    <label className="block">
                      Additional Context: Is there any additional information
                      that you think would help others understand your
                      experience?
                      <textarea
                        className="w-full mt-1 p-2 border rounded-lg"
                        placeholder="Provide any further context to help others understand your experience..."
                        value={experience.additionalInfo}
                        onChange={(e) =>
                          setExperience({
                            ...experience,
                            additionalInfo: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </label>

                    {/* Verification Section */}
                    <div className="flex items-center space-x-2">
                      <label className="text-gray-700 font-semibold">
                        Verification:
                      </label>
                      <p>
                        Are you willing to be contacted for further
                        clarification if needed?
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="verification"
                          className="form-radio text-blue-600"
                          value="Yes"
                          checked={experience.verification === "Yes"}
                          onChange={(e) =>
                            setExperience({
                              ...experience,
                              verification: e.target.value,
                            })
                          }
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="verification"
                          className="form-radio text-blue-600"
                          value="No"
                          checked={experience.verification === "No"}
                          onChange={(e) =>
                            setExperience({
                              ...experience,
                              verification: e.target.value,
                            })
                          }
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                      onClick={handleBack}
                    >
                      Back
                    </button>
                  )}
                  {step < 5 && (
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  )}
                  {step === 5 && (
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-lg ${
                        isLoading ? "bg-gray-400" : "bg-blue-600 text-white"
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                  )}
                </div>
              </form>

              {/* Error & Success Messages */}
              {error && <div className="text-red-500 mt-4">{error}</div>}
              {success && <div className="text-green-500 mt-4">{success}</div>}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
