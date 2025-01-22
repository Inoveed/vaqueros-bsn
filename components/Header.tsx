// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useEffect } from "react";

// const Header = () => {
//   useEffect(() => {
//     import("bootstrap/js/dist/offcanvas");
//   }, []);

//   return (
//     <nav
//       className="navbar fixed-top"
//       style={{
//         backgroundColor: "transparent",
//         boxShadow: "none",
//       }}
//     >
//       <div className="container-fluid">
//         <a className="navbar-brand" href="/">
//           <Image
//             src={
//               "https://upload.wikimedia.org/wikipedia/en/a/a0/BayamonVaquerosBSN.png"
//             }
//             alt="Logo"
//             height={130}
//             width={130}
//           />
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="offcanvas"============
//           data-bs-target="#offcanvasNavbar"
//           aria-controls="offcanvasNavbar"
//           aria-label="Toggle navigation"
//           style={{
//             filter: "invert(1)",
//           }}
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div
//           className="offcanvas offcanvas-end"
//           tabIndex={-1}
//           id="offcanvasNavbar"
//           aria-labelledby="offcanvasNavbarLabel"
//           style={{
//             backgroundColor: "rgba(0, 0, 0, 0.7)",
//             color: "#fff",
//           }}
//         >
//           <div className="offcanvas-header">
//             {/* <Link href="/auth" className="btn btn-primary btn-md">
//               Login
//             </Link> */}
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="offcanvas"
//               aria-label="Close"
//               style={{
//                 filter: "invert(1)",
//               }}
//             ></button>
//           </div>
//           <div className="offcanvas-body">
//             <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
//               <li className="btn btn-outline-primary">
//                 <Link
//                   className="nav-link"
//                   href="/desdeElApp"
//                   style={{
//                     color: "white",
//                   }}
//                 >
//                   CANTINA
//                 </Link>
//               </li>
//               <li className="btn btn-outline-primary">
//                 <Link
//                   className="nav-link"
//                   href="https://shopvaquerosbsn.net/collections/all"
//                   target="blank"
//                   style={{
//                     color: "white",
//                   }}
//                 >
//                   TIENDA
//                 </Link>
//               </li>
//               <li className="btn btn-outline-primary">
//                 <Link
//                   className="nav-link"
//                   href="https://www.bsnpr.com/team/vaqueros/"
//                   target="blank"
//                   style={{
//                     color: "white",
//                   }}
//                 >
//                   ESTADÍSTICAS
//                 </Link>
//               </li>
//             </ul>
//             {/* <form className="d-flex mt-3" role="search">
//               <input
//                 className="form-control me-2"
//                 type="search"
//                 placeholder="Ticket ID"
//                 aria-label="Search"
//               />
//               <button className="btn btn-outline-primary" type="submit">
//                 Seat
//               </button>
//             </form> */}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;

//TODO: con el lector del QR code pero tengo que ver como hago pa bypass para las pruebas.

"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const Header = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Dynamically import Bootstrap's JavaScript to enable sidebar functionality
    (async () => {
      try {
        await import("bootstrap/dist/js/bootstrap.bundle.min.js" as any);
      } catch (err) {
        console.error("Failed to load Bootstrap:", err);
      }
    })();
  }, []);

  const handleCantinaClick = async () => {
    setIsScanning(true);
    const codeReader = new BrowserMultiFormatReader();
    try {
      const videoInputDevices =
        await BrowserMultiFormatReader.listVideoInputDevices();
      if (videoInputDevices.length === 0) {
        throw new Error("No camera devices found");
      }

      const selectedDeviceId = videoInputDevices[0].deviceId;

      const videoElement = document.getElementById(
        "video-preview"
      ) as HTMLVideoElement;
      if (!videoElement) {
        throw new Error("Video preview element not found");
      }

      const result = await codeReader.decodeOnceFromVideoDevice(
        selectedDeviceId,
        videoElement
      );

      const scannedText = result.getText();
      if (
        scannedText.startsWith("http://") ||
        scannedText.startsWith("https://")
      ) {
        window.location.href = scannedText; // Redirect to scanned URL
      } else {
        alert(`Invalid QR Code content: ${scannedText}`);
      }
      setIsScanning(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      setIsScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      BrowserMultiFormatReader.releaseAllStreams();
    };
  }, []);

  return (
    <nav
      className="navbar fixed-top"
      style={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <Image
            src={
              "https://upload.wikimedia.org/wikipedia/en/a/a0/BayamonVaquerosBSN.png"
            }
            alt="Logo"
            height={130}
            width={130}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
          style={{
            filter: "invert(1)",
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
          }}
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{
                filter: "invert(1)",
              }}
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="btn btn-outline-primary">
                <button
                  className="nav-link m-auto h-full w-full"
                  onClick={handleCantinaClick}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  CANTINA
                </button>
              </li>
              <li className="btn btn-outline-primary">
                <Link
                  className="nav-link"
                  href="https://shopvaquerosbsn.net/collections/all"
                  target="blank"
                  style={{
                    color: "white",
                  }}
                >
                  TIENDA
                </Link>
              </li>
              <li className="btn btn-outline-primary">
                <Link
                  className="nav-link"
                  href="https://www.bsnpr.com/team/vaqueros/"
                  target="blank"
                  style={{
                    color: "white",
                  }}
                >
                  ESTADÍSTICAS
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Camera Preview */}
      {isScanning && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <video
            id="video-preview"
            style={{
              width: "80%",
              maxWidth: "600px",
              borderRadius: "8px",
            }}
          ></video>
          <button
            onClick={() => setIsScanning(false)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "white",
              color: "black",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            X
          </button>
        </div>
      )}
      {error && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "1.5rem",
            padding: "20px",
          }}
        >
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "white",
              color: "black",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Close
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
