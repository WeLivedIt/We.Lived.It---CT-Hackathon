import React, { useState, useEffect } from "react";
import pinataSDK from "@pinata/sdk";
import VotePage from "./VotePage";

// Initialize Pinata SDK with your API keys
const pinata = pinataSDK(process.env.REACT_APP_PINATA_API_KEY, process.env.REACT_APP_PINATA_SECRET_KEY);

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPinnedData = async () => {
    try {
      const pinListResponse = await pinata.pinList({
        status: "pinned", // Fetch only pinned content
        metadata: {
          name: "Experience Submission", // Filter by metadata name
        },
      });

      if (pinListResponse.count === 0) {
        setData([]);
        setIsLoading(false);
        return;
      }

      const formattedData = pinListResponse.rows.map((item) => ({
        cid: item.ipfs_pin_hash,
        metadata: item.metadata.keyvalues,
      }));

      setData(formattedData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPinnedData();
  }, []);

  if (isLoading) {
    return <div className="text-center p-6">Loading data from Pinata...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div className="text-center p-6 text-gray-600">No data found.</div>;
  }

  return <VotePage data={data} />;
};

export default App;
