import { Html, useProgress } from "@react-three/drei";

export const LoaderScene = () => {
  const { progress } = useProgress();
  return (
    <Html className="flex items-center justify-center w-full h-full">
      <div className="bg-gradient-to-br from-pink-200 to-purple-300 p-6 rounded-lg shadow-lg text-gray-800 w-lg text-center">
        <div className="mb-4 text-lg font-semibold tracking-wide">
          Loading... {Math.round(progress)}%
        </div>
        <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-3 text-sm text-gray-600 italic">
          Please wait, your experience is loading...
        </div>
      </div>
    </Html>
  );
};
