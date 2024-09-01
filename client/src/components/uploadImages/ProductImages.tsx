/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

interface ProductImagesProps {
  uploadedImages: File[];
  setUploadedImages: (files: File[]) => void;
}

const ProductImages: React.FC<ProductImagesProps> = ({
  uploadedImages,
  setUploadedImages,
}) => {
  const openImage = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);

      const uniqueImages = new Set(uploadedImages.map((img) => img.name));

      const maxImages = 4;
      const newImages = [];

      for (let i = 0; i < fileList.length; i++) {
        if (uniqueImages.size < maxImages) {
          const file = fileList[i];
          if (!uniqueImages.has(file.name)) {
            newImages.push(file);
            uniqueImages.add(file.name);
          } else {
            console.log(`Image ${file.name} is already uploaded.`);
          }
        } else {
          console.log(`Maximum allowed images reached (${maxImages}).`);
          break;
        }
      }

      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };

  return (
    <>
      <div>
        <form>
          <input
            ref={openImage}
            hidden
            multiple
            onChange={handleImageChange}
            type="file"
          />
        </form>
        <div className="w-[315px] mx-auto">
          <h2 className="pb-2 dark:text-mainTextDark">
            Upload Additional Images
          </h2>
          <div
            onClick={() => openImage.current?.click()}
            style={{
              border: "2px dashed #ccc",
              marginBottom: "15px",
              cursor: "pointer",
              width: "315px",
              height: "125px",
              margin: "auto",
              borderRadius: "12px",
            }}
            className="flex items-center justify-center gap-2 py-2 w-100 flex-col"
          >
            <img
              style={{ filter: "grayscale(1)" }}
              src="/images/cam.png"
              alt="Upload"
            />
            <p
              style={{
                color: "#ccc",
                fontWeight: "bold",
                margin: "0",
              }}
            >
              Select Images
            </p>
          </div>
        </div>
        {uploadedImages.length > 0 && (
          <div className="mt-4">
            <div className="grid grid-cols-4 gap-4">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative group flex justify-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded ${index + 1}`}
                    className="w-[100px] h-[90px] object-cover rounded-[12px] cursor-pointer transform transition-transform group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductImages;
