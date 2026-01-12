export default function SongSelectorSliding({
  songs,
  selectedSong,
  setSelectedSong,
  audioRef,
}) {
  const handlePlay = (song) => {
    if (!audioRef.current) return;
    audioRef.current.src = song;
    audioRef.current.play();
  };

  const handleStop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between">
        <h2 className="mb-2 font-semibold">Pilih Musik</h2>
        <button
          onClick={handleStop}
          className="px-1 py-1 text-xs border rounded hover:bg-gray-100"
        >
        🟥 Stop
        </button>
      </div>
      {/* Tombol STOP global */}

      <div className="flex px-1 py-2 space-x-2 overflow-x-auto">
        {songs.map((song, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 w-16 flex flex-col items-center ${
              selectedSong === song ? "bg-blue-400 text-white" : "bg-gray-100"
            }`}
          >
            <button
              onClick={() => setSelectedSong(song)}
              className="w-full text-xs font-medium text-white bg-green-500 hover:bg-green-600"
            >
              Pilih
            </button>
            <button
              onClick={() => handlePlay(song)}
              className="w-full py-1 text-xs hover:bg-gray-200"
            >
              ▶
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
