import { useEffect, useRef } from "react";

interface InstructionsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionsPopup = ({ isOpen, onClose }: InstructionsPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={popupRef}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === popupRef.current) {
          onClose();
        }
      }}
    >
      <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6 rounded-xl shadow-2xl transform  md:max-w-lg max-w-sm w-full">
        <h3 className="text-3xl font-bold text-white text-center mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Instructions
        </h3>
        <ul className="list-disc ml-5 text-lg text-white space-y-2 animate__animated animate__fadeIn animate__delay-2s">
          <li>
            Press and hold{" "}
            <strong>
              <code className="bg-blue-600 text-white p-1 rounded">W</code> or{" "}
              <code className="bg-blue-600 text-white p-1 rounded">
                Up Arrow
              </code>
            </strong>{" "}
            for moving forward
          </li>
          <li>
            Press and hold{" "}
            <strong>
              <code className="bg-blue-600 text-white p-1 rounded">S</code> or{" "}
              <code className="bg-blue-600 text-white p-1 rounded">
                Down Arrow
              </code>
            </strong>{" "}
            for moving downwards
          </li>
          <li>
            Press and hold{" "}
            <strong>
              <code className="bg-blue-600 text-white p-1 rounded">A</code> or{" "}
              <code className="bg-blue-600 text-white p-1 rounded">
                Left Arrow
              </code>
            </strong>{" "}
            for moving leftwards
          </li>
          <li>
            Press and hold{" "}
            <strong>
              <code className="bg-blue-600 text-white p-1 rounded">D</code> or{" "}
              <code className="bg-blue-600 text-white p-1 rounded">
                Right Arrow
              </code>
            </strong>{" "}
            for moving rightwards
          </li>
          <li>
            Press and hold{" "}
            <strong>
              <code className="bg-blue-600 text-white p-1 rounded">SHIFT</code>
            </strong>{" "}
            to run during any movement
          </li>
          <li>
            Press{" "}
            <strong>
              <code className="bg-blue-600 text-white p-1 rounded">Space</code>
            </strong>{" "}
            to jump
          </li>
          <li>
            Press and hold{" "}
            <strong>
              <code className="bg-blue-600 text-white p-1 rounded">CTRL</code>
            </strong>{" "}
            to crouch
          </li>
          <li>
            Press and hold{" "}
            <strong>
              <code className="bg-blue-600 text-white p-1 rounded">X</code>
            </strong>{" "}
            to dance
          </li>
          <li>
            Press and hold{" "}
            <strong>
              <code className="bg-blue-600 text-white p-1 rounded">R</code>
            </strong>{" "}
            to rotate the character clockwise
          </li>
          <li>
            Press and hold{" "}
            <strong>
              <code className="bg-blue-600 text-white p-1 rounded">Q</code>
            </strong>{" "}
            to rotate the character anti-clockwise
          </li>
          <li>
            <strong>
              <code className="bg-blue-600 text-white p-1 rounded">
                Left mouse click
              </code>
            </strong>{" "}
            and drag with mouse to rotate the camera
          </li>
          <li>
            Write something in the bottom text input and press speak to make it
            lipsync
          </li>
        </ul>

        <div className="mt-4 text-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPopup;
