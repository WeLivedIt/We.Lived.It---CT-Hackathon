"use client";

import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BarChart, AlertTriangle, CheckCircle } from "lucide-react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

const mockAnalyzeText = async (
  text: string
): Promise<{ score: number; category: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const score = Math.random();
  let category = "Neutral";
  if (score > 0.7) category = "Hate Speech";
  else if (score > 0.4) category = "Potentially Offensive";
  return { score, category };
};

type hateSpeechScannerprops = {
  isOpen: boolean;
  onClose: () => void;
};

export const HateSpeechScanner: FC<hateSpeechScannerprops> = ({
  isOpen,
  onClose,
}) => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{
    score: number;
    category: string;
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
      const analysis = await mockAnalyzeText(text);
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
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
          >
            <div className="w-full max-w-2xl mx-auto p-4">
              <div className="bg-white shadow-md rounded-lg p-6">
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
                        className={`flex items-center p-4 rounded-md ${
                          result.score > 0.7
                            ? "bg-red-100 text-red-700"
                            : result.score > 0.4
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {result.score > 0.7 ? (
                          <AlertTriangle className="h-4 w-4" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        <p className="ml-2">
                          This text has been classified as{" "}
                          {result.category.toLowerCase()} content.
                        </p>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Severity Score
                          </span>
                          <span className="text-sm font-medium">
                            {(result.score * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${result.score * 100}%` }}
                          ></div>
                        </div>
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
