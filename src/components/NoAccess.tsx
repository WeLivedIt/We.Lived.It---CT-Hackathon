import { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";

export const NoAccess = () =>  {
  const [showAccessKeyInput, setShowAccessKeyInput] = useState(false);
  const [accessKey, setAccessKey] = useState("");

  const handleRequestAccess = () => {
    console.log("Requesting access...");
  };

  const handleSubmitAccessKey = () => {
    console.log("Submitting access key:", accessKey);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 flex flex-col justify-center">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-6">
            <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600">
              You are not allowed to access this page.
            </p>
          </div>

          {!showAccessKeyInput ? (
            <div className="space-y-4">
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => setShowAccessKeyInput(true)}
              >
                Enter Access Key
              </button>
              <button
                className="w-full border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-100 transition"
                onClick={handleRequestAccess}
              >
                Request Access
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter 8-digit access key"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  maxLength={8}
                  className="flex-grow border border-gray-300 rounded-md p-2"
                />
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                  onClick={handleSubmitAccessKey}
                >
                  Submit
                </button>
              </div>
              <button
                className="w-full flex items-center justify-center text-gray-600 hover:text-gray-800"
                onClick={() => setShowAccessKeyInput(false)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
