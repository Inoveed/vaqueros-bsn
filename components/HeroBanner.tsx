"use client";
import React from "react";

const HeroBanner = () => {
  return (
    <section
      className="relative w-full h-screen"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Fullscreen YouTube Video Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/-szq6YJOcIM?autoplay=1&mute=1&loop=1&playlist=-szq6YJOcIM"
          title="YouTube video"
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            objectFit: "cover",
            border: "none",
          }}
        ></iframe>
      </div>

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
          zIndex: 2,
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h4
          className="text-uppercase text-light"
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            margin: 0,
          }}
        >
          {/* "SOWING THE SEED OF INNOVATION FOR A NEW ERA" */}
        </h4>
      </div>
    </section>
  );
};

export default HeroBanner;
