// src/App.jsx
import React, { useState, useRef } from "react";
import { useDownloader } from "./hooks/useDownloader";
import ActionButtons from "./components/ActionButton";
import CaptureArea from "./components/CaptureArea";
import Footer from "./components/Footer";

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
  const [isImageDownloading, setIsImageDownloading] = useState(false);
  const [isVideoCreating, setIsVideoCreating] = useState(false);

  const captureRef = useRef(null);

  // song / audio
  const [songs] = useState(
    Array.from({ length: 6 }, (_, i) => `/sounds/audio_00${i}.mp3`)
  );
  const [selectedSong, setSelectedSong] = useState(songs[0]);
  const audioRef = useRef(null);

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

  const { handleDownloadImage, createVideo } = useDownloader(
    captureRef,
    title,
    date,
    audioRef,
    selectedSong,
    setIsImageDownloading,
    setIsVideoCreating
  );

  return (
    <div className="min-h-screen p-4 bg-gray-100 sm:p-8">
      <div>
        <h1 className="text-2xl font-bold text-center ">
          Progress Report Generator
        </h1>
        <p className="pb-5 text-sm text-center text-gray-500">
          Isi form, upload gambar, dan download hasilnya.
        </p>
      </div>
      {/* Form Section */}
      <div className="max-w-3xl p-4 mx-auto mt-4 bg-white rounded-lg shadow-xl sm:p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Masukkan Informasi & Gambar
        </h2>

        <div className="mb-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Judul
            </label>
            <input
              type="text"
              placeholder="Judul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full p-2 border"
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
              className="block w-full p-2 border"
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
              className="block w-full p-2 border"
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
              className="block w-full p-2 border"
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
          <div>
            <ActionButtons
              onDownload={handleDownloadImage}
              onVideo={createVideo}
              isImageLoading={isImageDownloading}
              isVideoLoading={isVideoCreating}
              songs={songs}
              selectedSong={selectedSong}
              setSelectedSong={setSelectedSong}
              audioRef={audioRef}
            />
          </div>
        )}
      </div>

      {/* Capture Area */}
      <CaptureArea
        ref={captureRef}
        title={title}
        date={date}
        address={address}
        description={description}
        images={images}
      />

      {/* Audio */}
      <audio ref={audioRef} preload="auto" crossOrigin="anonymous" />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
