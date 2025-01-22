"use client";
import Link from "next/link";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    import("bootstrap/js/dist/scrollspy"); // Import only the dropdown module
  }, []);
  const currentYear = new Date().getFullYear();
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 px-4 absolute bottom-0 w-full z-10">
      <div className="col-md-4 d-flex align-items-center">
        <Link
          href="/"
          className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
        >
          <img
            className="bi"
            src="https://upload.wikimedia.org/wikipedia/en/a/a0/BayamonVaquerosBSN.png"
            width="80"
            height="80"
            alt="..."
          />
        </Link>
        <span className="mb-3 mb-md-0 text-gray-400">© {currentYear}</span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex items-center">
        <li className="ms-3">
          <Link
            className="text-body-secondary"
            href="https://www.facebook.com/VaquerosBSN/?locale=es_LA"
            target="blank"
          >
            <img
              className="bi"
              src="https://cdn.icon-icons.com/icons2/2657/PNG/256/facebook_icon_161067.png"
              width="43"
              height="10"
              alt="..."
            />
          </Link>
        </li>
        <li className="ms-3">
          <Link
            className="text-body-secondary"
            href="https://www.instagram.com/vaquerosbsn/?hl=en"
            target="blank"
          >
            <img
              className="bi"
              src="https://cdn-icons-png.flaticon.com/256/2111/2111463.png"
              width="30"
              height="10"
              alt="..."
            />
          </Link>
        </li>
        <li className="ms-3">
          <Link
            className="text-body-secondary"
            href="https://x.com/vaquerosbsn?s=11&t=D_U4VbHXm2m6BoOwHI01-w"
            target="blank"
          >
            <img
              className="bi"
              src="https://static.vecteezy.com/system/resources/thumbnails/042/148/611/small/new-twitter-x-logo-twitter-icon-x-social-media-icon-free-png.png"
              width="50"
              height="24"
              alt="..."
            />
          </Link>
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
