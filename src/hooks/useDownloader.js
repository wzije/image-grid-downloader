import html2canvas from "html2canvas";

export const useDownloader = (
  captureRef,
  title,
  date,
  audioRef,
  selectedSong,
  setIsImageLoading,
  setIsVideoLoading
) => {
  const handleDownloadImage = async () => {
    if (!captureRef.current) {
      console.error("Capture area belum siap");
      return;
    }

    try {
      setIsImageLoading(true); // mulai loader
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
        scale: 7, // Tingkatkan ke 3 atau 4 untuk kualitas cetak (resolusi tinggi)
        logging: false,
        backgroundColor: "#ffffff", // Memastikan background tidak transparan/pecah
        windowWidth: captureRef.current.scrollWidth,
        windowHeight: captureRef.current.scrollHeight,
        onclone: (clonedDoc) => {
          // Opsional: Pastikan elemen terlihat di kloningan
          clonedDoc
            .getElementById("capture-area")
            ?.style.setProperty("display", "block");
        },
      });
      const dataUrl = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${title.replace(
        /\s+/g,
        "_"
      )}_pembangunan_sppg_${date}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download gagal:", error);
    } finally {
      setIsImageLoading(false); // hentikan loader
    }
  };

  const createVideo = async () => {
    if (!captureRef.current || !selectedSong) return;
    setIsVideoLoading(true);

    try {
      // Ambil snapshot statis capture area
      const canvasSnapshot = await html2canvas(captureRef.current, {
        scale: 4,
        backgroundColor: "#fff",
      });
      const width = canvasSnapshot.width;
      const height = canvasSnapshot.height;

      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const ctx = offscreen.getContext("2d");

      // Video stream
      const fps = 30;
      const videoStream = offscreen.captureStream(fps);

      // Audio stream via AudioContext
      const audio = new Audio(selectedSong);
      await audio.play(); // load audio
      audio.pause();
      audio.currentTime = 0;

      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaElementSource(audio);
      const dest = audioCtx.createMediaStreamDestination();
      source.connect(dest);
      // source.connect(audioCtx.destination); // optional untuk preview

      // Gabungkan video + audio
      const combinedStream = new MediaStream([
        ...videoStream.getVideoTracks(),
        ...dest.stream.getAudioTracks(),
      ]);

      const recorder = new MediaRecorder(combinedStream);
      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "progress-video.webm";
        a.click();
        URL.revokeObjectURL(url);
        setIsVideoLoading(false);
      };

      // Mulai rekaman
      recorder.start();

      // Mainkan audio sekarang
      audio.play();

      // Update video frame setiap fps sampai audio selesai
      const drawFrame = () => {
        ctx.drawImage(canvasSnapshot, 0, 0, width, height);
        if (!audio.paused && !audio.ended) {
          requestAnimationFrame(drawFrame);
        } else {
          recorder.stop();
        }
      };
      drawFrame();
    } catch (err) {
      console.error("Gagal buat video:", err);
      alert("Gagal buat video");
      setIsVideoLoading(false);
    }
  };

  return { handleDownloadImage, createVideo };
};
