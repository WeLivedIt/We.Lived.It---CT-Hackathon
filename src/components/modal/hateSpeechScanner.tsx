import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarChart, AlertTriangle, CheckCircle } from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

const cleanClassificationString = (classificationStr: string) => {
  // Remove the outer quotes and convert it into an array-like structure
  const cleanedStr = classificationStr.replace(/(^"|"$)/g, "");

  // Now we can safely evaluate it to convert into an array
  const classificationArray = eval(cleanedStr); // Be cautious using eval, ensure input is sanitized

  return classificationArray;
};

const analyzeText = async (
  text: string
): Promise<{ classify: string; definition: string }> => {
  const response = await fetch("https://hs-server.onrender.com/classify-hs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: text }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze text");
  }

  const data = await response.json();

  const { classification } = data;

  const cleanedClassification = cleanClassificationString(classification);

  console.log(cleanedClassification[0], "223e3");

  return {
    classify: cleanedClassification[0],
    definition: cleanedClassification[1],
  };
};

type HateSpeechScannerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const HateSpeechScanner: FC<HateSpeechScannerProps> = ({
  isOpen,
  onClose,
}) => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{
    classify: string;
    definition: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze.");
      toast.error("Please enter some text to analyze.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const analysis = await analyzeText(text);
      setResult(analysis);
      toast.success("Text analyzed successfully!");
    } catch (err) {
      setError("An error occurred while analyzing the text. Please try again.");
      toast.error(
        "An error occurred while analyzing the text. Please try again."
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
            className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
            <div className="w-full max-w-2xl mx-auto p-4 ">
              <div className="bg-white shadow-md p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold flex items-center space-x-2">
                    <BarChart className="h-6 w-6 text-blue-500" />
                    <span>Hate Speech Scanner</span>
                  </h2>
                  <p className="text-sm text-gray-600">
                    Input text to analyze for potential hate speech. Our AI
                    model will provide an assessment.
                  </p>
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
                        className={`flex flex-col items-center p-4 rounded-md ${
                          result.classify === "hate speech"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {result.classify === "hate speech" ? (
                          <AlertTriangle className="h-4 w-4" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        <p className="ml-2">
                          This text has been classified as{" "}
                          <strong>{result.classify.toLowerCase()}</strong>{" "}
                          content.
                          ***<strong>{result.definition}</strong>***
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
