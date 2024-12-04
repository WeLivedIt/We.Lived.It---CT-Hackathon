import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BarChart,
  AlertTriangle,
  CheckCircle,
  UploadCloud,
} from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { OrganizationParams } from "@/pages/organization";

const cleanClassificationString = (classificationStr: string) => {
  try {
    const cleanedStr = classificationStr.replace(/(^"|"$)/g, "");
    if (cleanedStr.startsWith("[") && cleanedStr.endsWith("]")) {
      return eval(cleanedStr);
    }
  } catch (error) {}

  if (classificationStr.includes("hate speech")) {
    const classification = "hate speech";
    const protectedCharacteristicMatch = classificationStr.match(
      /protected characteristic of (\w+)/i
    );
    const protectedCharacteristic = protectedCharacteristicMatch
      ? [protectedCharacteristicMatch[1]]
      : [];
    const probabilityMatch = classificationStr.match(
      /probability.*?(\d\.\d+)/i
    );
    const probability = probabilityMatch
      ? [parseFloat(probabilityMatch[1])]
      : [1.0]; 

    return [classification, protectedCharacteristic, probability];
  }

  return ["unknown", [], [0]];
};

const analyzeText = async (
  text: string,
  file: File | null,
  orgData: OrganizationParams
): Promise<{ classify: string; definition: string[] }> => {
  try {
    const safeOrgData = JSON.parse(
      JSON.stringify(orgData, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    const formData = new FormData();
    formData.append("message", text);
    if (file) {
      formData.append("file", file); 
    }
    formData.append("orgData", JSON.stringify(safeOrgData));

    // const baseUrl = "http://localhost:8000/classify-hs";
    const baseUrl = "https://hs-server-1.onrender.com/classify-hs";

    const response = await fetch(baseUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.log(response, "happy");
      throw new Error("Failed to analyze text");
    }

    const data = await response.json();
    const { classification } = data;
    const cleanedClassification = cleanClassificationString(classification);
    return {
      classify: cleanedClassification[0],
      definition: cleanedClassification[1],
    };
  } catch (error) {
    console.error("Error analyzing text:", error);
    throw new Error(
      "An error occurred while analyzing text. Please try again."
    );
  }
};

type HateSpeechScannerProps = {
  isOpen: boolean;
  onClose: () => void;
  orgData: OrganizationParams;
};

export const HateSpeechScanner: FC<HateSpeechScannerProps> = ({
  isOpen,
  onClose,
  orgData,
}) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{
    classify: string;
    definition: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (
      uploadedFile &&
      (uploadedFile.type === "application/pdf" ||
        uploadedFile.type === "application/msword" ||
        uploadedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(uploadedFile);
      setError(null);
      toast.success("File uploaded successfully!");
    } else {
      setError("Please upload a PDF or DOC/DOCX file.");
      toast.error("Invalid file type. Only PDF and DOC/DOCX are supported.");
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim() && !file) {
      setError("Please enter text or upload a file to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const analysis = await analyzeText(text, file, orgData);
      setResult(analysis);
      toast.success("Text analyzed successfully!");
    } catch (err) {
      setError("An error occurred while analyzing the text. Please try again.");
      toast.error(
        "An error occurred while analyzing the text. Please try again."
      );
    } finally {
      setIsLoading(false);
      setText("");
      setFile(null);
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
            className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
            <div className="w-full max-w-2xl mx-auto p-4 ">
              <div className="bg-white shadow-md p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold flex items-center space-x-2">
                    <BarChart className="h-6 w-6 text-blue-500" />
                    <span>Text Scanner</span>
                  </h2>
                  <p className="text-sm text-gray-600">
                    Our AI model will provide an assessment.’ to ‘Input the text
                    below. Our model will give you an assessment
                  </p>
                </div>

                <div className="mb-4 border border-dashed border-gray-400 p-4 rounded-md text-center">
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <UploadCloud className="h-12 w-12 mx-auto text-blue-500" />
                    <p className="text-gray-600">
                      Drag & Drop or Click to Upload (PDF, DOC, DOCX)
                    </p>
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <p className="text-green-700 w-full truncate">{file?.name}</p>
                </div>

                <div className="mb-4">
                  <textarea
                    placeholder="Enter text to analyze..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={5}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  />
                  {error && (
                    <div className="flex items-center bg-red-100 text-red-700 p-2 rounded-md mb-4">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <p>{error}</p>
                    </div>
                  )}
                  {result && (
                    <div className="space-y-4">
                      <div
                        className={`flex items-center p-4 rounded-md ${
                          result.classify === "hate speech"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {result.classify === "hate speech" ? (
                          <AlertTriangle className="h-5 w-5 mr-2" />
                        ) : (
                          <CheckCircle className="h-5 w-5 mr-2" />
                        )}
                        <p>
                          This text has been classified as{" "}
                          <strong>{result.classify.toLowerCase()}</strong>{" "}
                          content.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-100 border-l-4 border-gray-500 rounded-md">
                        <h3 className="font-semibold text-gray-800">
                          Definition:
                        </h3>
                        <p className="text-gray-700">
                          {result.definition[0]}, {result.definition[1]},{" "}
                          {result.definition[3]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isLoading ? "Analyzing..." : "Analyze Text"}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
