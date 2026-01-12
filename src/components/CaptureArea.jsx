import { forwardRef } from "react";
import { formatDisplayDate } from "../utils/dateFormat";

const CaptureArea = forwardRef(
  ({ title, date, address, description, images = [] }, captureRef) => {
    return (
      <div
        ref={captureRef}
        className="max-w-3xl p-2 mx-auto mt-4 bg-white rounded-md"
      >
        <header className="mb-3">
          <h1 className="text-lg font-extrabold tracking-wider text-center text-gray-800 uppercase md:text-3xl">
            {title}
          </h1>
        </header>
        <div className="mx-auto mb-5 text-xs text-gray-600 md:text-sm">
          <p>
            <strong>Tanggal:</strong> {formatDisplayDate(date)}
          </p>
          <p>
            <strong>Alamat:</strong> {address}
          </p>
          {description && (
            <div>
              <strong>Keterangan:</strong>
              <p
                className="italic text-gray-700 "
                style={{ whiteSpace: "pre-wrap" }}
              >
                {description}
              </p>
            </div>
          )}
        </div>

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
                  className="object-cover w-full h-full rounded-md"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-black rounded-md opacity-10"></div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-gray-500">
            Belum ada gambar yang diupload.
          </p>
        )}
      </div>
    );
  }
);

export default CaptureArea;
