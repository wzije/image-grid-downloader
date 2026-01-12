import SongSelectorSliding from "./SongSelectorSliding";

export default function ActionButtons({
  onDownload,
  onVideo,
  isImageLoading,
  isVideoLoading,
  songs,
  selectedSong,
  setSelectedSong,
  audioRef,
}) {
  return (
    <div className="space-y-2">
      <button
        onClick={onDownload}
        disabled={isImageLoading}
        className={`w-full text-white font-bold py-2 px-4 rounded ${
          isImageLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isImageLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 text-white animate-spin"
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
          "Unduh Gambar PNG"
        )}
      </button>

      <br />
      <SongSelectorSliding
        songs={songs}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
        audioRef={audioRef}
      />

      <button
        onClick={onVideo}
        disabled={isVideoLoading}
        className="w-full py-2 font-bold text-white bg-green-600 rounded"
      >
        {isVideoLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 text-white animate-spin"
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
            Video sedang dibuat ...
          </span>
        ) : (
          "Buat Video"
        )}
      </button>
    </div>
  );
}
