import { useRef } from "react";

interface ProductMainImageProps {
  setImg: (file: File) => void;
  uploadedImg: File | null;
  labelImg: string;
}

const ProductMainImage: React.FC<ProductMainImageProps> = ({
  setImg,
  uploadedImg,
  labelImg,
}) => {
  const openImg = useRef<HTMLInputElement | null>(null);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImg(file);
    }
  };

  const handleRemoveImg = () => {
    setImg(null as unknown as File);
  };

  return (
    <div>
      <form>
        <input ref={openImg} hidden onChange={handleImgChange} type="file" />
      </form>
      <div className="w-[315px] mx-auto">
        <h2 className="pb-2">{labelImg}</h2>
        <div
          onClick={() => openImg.current?.click()}
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
            Select Image
          </p>
        </div>
      </div>

      {uploadedImg && (
        <div className="mt-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="relative group flex justify-center">
              <img
                src={URL.createObjectURL(uploadedImg)}
                alt="Uploaded"
                className="w-[100px] h-[90px] object-cover rounded-[12px] cursor-pointer transform transition-transform group-hover:scale-105"
              />
              <button
                type="button"
                onClick={handleRemoveImg}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-700"
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductMainImage;
