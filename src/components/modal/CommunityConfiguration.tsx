"use client";

import React, { useState } from "react";

type AgentConfigurationProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CommunityConfiguration = ({
  isOpen,
  onClose,
}: AgentConfigurationProps) => {
  const [modelName, setModelName] = useState("gpt-3.5-turbo");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0);

  const handleSave = () => {
    // Here you would typically save the configuration to your state management system or backend
    alert(
      `Model: ${modelName}, Temperature: ${temperature}, Max Tokens: ${maxTokens}, Top P: ${topP}, Frequency Penalty: ${frequencyPenalty}, Presence Penalty: ${presencePenalty}`
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Agent Configuration</h2>
        <p className="text-gray-600 mb-6">
          Set up your AI agent parameters. Adjust these settings to fine-tune
          the agent's behavior.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Model Name
            </label>
            <input
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Temperature
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-right text-sm text-gray-500">
              {temperature.toFixed(1)}
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Max Tokens
            </label>
            <input
              type="number"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Top P
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={topP}
              onChange={(e) => setTopP(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-right text-sm text-gray-500">
              {topP.toFixed(1)}
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Frequency Penalty
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={frequencyPenalty}
              onChange={(e) => setFrequencyPenalty(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-right text-sm text-gray-500">
              {frequencyPenalty.toFixed(1)}
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Presence Penalty
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={presencePenalty}
              onChange={(e) => setPresencePenalty(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-right text-sm text-gray-500">
              {presencePenalty.toFixed(1)}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
