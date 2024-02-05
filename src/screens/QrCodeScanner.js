import React, { useEffect, useRef, useState } from "react";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import { Html5QrcodeScanner } from "html5-qrcode";
import "../styles/App.css";
import { Link , useNavigate } from "react-router-dom";

const QRCodeVerifier = () => {
  const scannerRef = useRef(null);
  const [scannerActive, setScannerActive] = useState(true);
  const loggedInUserID = localStorage.getItem("loggedInUserID");

  const BackButton = ({ loggedInUserID }) => {
    return (
      <div>
        {loggedInUserID !== null && (
          <>
            <button
              className={`text-white bg-[#4B558A] font-medium rounded-md font-medium rounded-md text-sm px-5 py-2.5 mx-5 hover:bg-[#3A426C] hover:drop-shadow-xl`}
            >
              Back
            </button>
          </>
        )}
      </div>
    );
  };

  useEffect(() => {
    const docReady = (fn) => {
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        setTimeout(fn, 1);
      } else {
        document.addEventListener("DOMContentLoaded", fn);
      }
    };
    const navigate = useNavigate();
    const onScanSuccess = (decodedText, decodedResult) => {
      navigate(decodedText, "_blank");
      // Set scannerActive to false after successful scan to allow reactivation later
      setScannerActive(false);
    };

    const qrboxFunction = (viewfinderWidth, viewfinderHeight) => {
      const minEdgeSizeThreshold = 250;
      const edgeSizePercentage = 0.75;
      const minEdgeSize =
        viewfinderWidth > viewfinderHeight ? viewfinderHeight : viewfinderWidth;
      const qrboxEdgeSize = Math.floor(minEdgeSize * edgeSizePercentage);

      if (qrboxEdgeSize < minEdgeSizeThreshold) {
        if (minEdgeSize < minEdgeSizeThreshold) {
          return { width: minEdgeSize, height: minEdgeSize };
        } else {
          return {
            width: minEdgeSizeThreshold,
            height: minEdgeSizeThreshold,
          };
        }
      }

      return { width: qrboxEdgeSize, height: qrboxEdgeSize };
    };

    const startScanner = () => {
      if (!scannerRef.current) {
        setScannerActive(true);
        scannerRef.current = new Html5QrcodeScanner("reader", {
          fps: 144,
          qrbox: qrboxFunction,
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true,
          },
          rememberLastUsedCamera: true,
          showTorchButtonIfSupported: true,
        });

        scannerRef.current.render(onScanSuccess);
      }
    };

    const stopScanner = () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
      // Set scannerActive to false when stopping the scanner
      setScannerActive(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopScanner();
      } else {
        startScanner();
      }
    };

    startScanner();

    docReady(() => {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    });

    return () => {
      stopScanner();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []); // Pass an empty dependency array

  return (
    <>
      <div className="container mx-auto my-8 text-center">
        <h1 className="text-2xl font-bold">Scan a LinkedIn Qr Code</h1>
      </div>
      <div className="flex justify-center items-center mb-2">
        <p>
          To use the QR Code Scanner, please press on "Request Camera
          Permissions" and press "Allow"
        </p>
      </div>

      <section className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="w-full md:w-1/3">
            <main>
              <div id="reader"></div>
            </main>
          </div>
        </div>
        <>
          {loggedInUserID !== null && (
            <div className="flex justify-center mt-4">
              <Link to={`/connect`}>
                <BackButton />
              </Link>
            </div>
          )}
        </>
      </section>
    </>
  );
};

export default QRCodeVerifier;
