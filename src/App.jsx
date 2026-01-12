// src/App.jsx
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

// Helper function untuk memformat tanggal
const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const dateObj = new Date(dateString + "T00:00:00");
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("id-ID", options).format(dateObj);
};

function App() {
  const [title, setTitle] = useState(
    "Progress Pembangunan SPPG Hans Satya Dharma"
  );
  const [address, setAddress] = useState(
    "Pulutan, Watukumpul, Parakan, Temanggung"
  );
  const currentDate = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(currentDate);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const captureRef = useRef(null);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [
          ...prevImages,
          { id: Date.now() + Math.random(), url: reader.result },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDownloadImage = async () => {
    if (!captureRef.current) return;

    try {
      setIsDownloading(true); // mulai loader
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
        scale: 2,
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${title.replace(/\s+/g, "_")}_memories.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download gagal:", error);
    } finally {
      setIsDownloading(false); // hentikan loader
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
      <div>
        <h1 className="text-center text-2xl font-bold  ">
          Progress Report Downloader
        </h1>
        <p className="text-center pb-5 text-gray-500 text-sm">
          *Untuk hasil maksimal, gunakan mode desktop (Desktop Site)
        </p>
      </div>
      {/* Form Section */}
      <div className="max-w-3xl mx-auto mt-4 p-4 sm:p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Masukkan Informasi & Gambar
        </h2>

        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Judul
            </label>
            <input
              type="text"
              placeholder="Judul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full border p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Alamat
            </label>
            <input
              type="text"
              placeholder="Alamat"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full border p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tanggal
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full border p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Keterangan
            </label>
            <textarea
              placeholder="Keterangan (Opsional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="block w-full border p-2"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Gambar
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500"
            />
          </div>
        </div>

        {images.length > 0 && (
          <button
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className={`w-full text-white font-bold py-2 px-4 rounded ${
              isDownloading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isDownloading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Mengunduh...
              </span>
            ) : (
              "Download Grid as PNG Image"
            )}
          </button>
        )}
      </div>

      {/* Capture Area */}
      <div
        className="max-w-3xl mx-auto mt-4 bg-white shadow-xl p-4 sm:p-6 rounded-lg"
        ref={captureRef}
      >
        <div className="mb-4 flex justify-between items-baseline text-sm text-gray-600">
          <p>
            <strong>Alamat:</strong> {address}
          </p>
          <p>
            <strong>Tanggal:</strong> {formatDisplayDate(date)}
          </p>
        </div>

        <header className="mb-5 pt-4">
          <h1 className="text-3xl text-center font-extrabold text-gray-800 uppercase tracking-wider">
            {title}
          </h1>
        </header>

        {description && (
          <p className="mb-5 text-gray-700 italic">{description}</p>
        )}

        {images.length > 0 ? (
          <div className="grid grid-cols-4 gap-1">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`relative overflow-hidden ${
                  index === 0 || index === 3 || index === 8
                    ? "col-span-2 row-span-2"
                    : "col-span-1 row-span-1"
                }`}
              >
                <img
                  src={image.url}
                  alt={`Uploaded memory ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-black opacity-10 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">
            Belum ada gambar yang diupload.
          </p>
        )}
      </div>
      {/* Footer */}
      <footer className="mt-auto text-center text-gray-500 text-sm pt-6">
        Copyright © 2026. All rights reserved. Developed by{" "}
        <a
          target="_blank"
          className="text-blue-600"
          href="https://wzije.pages.dev"
        >
          Jehan{" "}
        </a>
      </footer>
    </div>
  );
}

export default App;
