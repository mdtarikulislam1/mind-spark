import React from "react";
import loadingStore from "../../Zustand-state/useLoading";

export default function FullScreenLoader() {
  const { globalLoader } = loadingStore();

  if (!globalLoader) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-b-blue-500 border-gray-200 rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}
