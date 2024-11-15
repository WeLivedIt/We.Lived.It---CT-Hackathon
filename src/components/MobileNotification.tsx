import React from "react";
import Image from "next/image";

export const MobileNotification: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg max-w-xs mx-auto text-center">
      <div className="mb-4">
        <Image
          src="/mobile-restriction-icon.png"
          alt="Mobile Restriction"
          width={80}
          height={80}
          className="rounded-full"
        />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800">WeLivedIt</h2>
      <p className="mt-2 text-gray-600">
        WeLivedIt is not supported on mobile at the moment. Please use a larger
        screen for the best experience. Stay tuned for updates on mobile support.
        Thank you!
      </p>
    </div>
  );
};
