import React from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import predefinedImages from "@/mock/predefinedImages.json";
import BannerPreview from "./BannerPreview";

interface BannerData {
  title: string;
  description: string;
  callToAction: string;
  image: string;
  bgTemplate: string;
}

interface EditBannerTemplateProps {
  formData: BannerData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSave: () => void;
  handleClose: () => void;
}

const EditBannerTemplate: React.FC<EditBannerTemplateProps> = ({
  formData,
  handleChange,
  handleSave,
  handleClose,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        handleChange({
          target: {
            name: "image",
            value: reader.result as string,
          },
        } as React.ChangeEvent<HTMLInputElement>);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 overflow-y-scroll">
      <div className="flex justify-center items-center w-full p-4">
        <div className="relative flex flex-col justify-center items-start gap-2 bg-white rounded-md shadow-md p-2 lg:p-6 w-full lg:w-1/2 overflow-scroll">
          <div>
            <h2 className="text-lg font-semibold">Edit Banner</h2>
          </div>
          <div className="absolute top-2 lg:top-4 right-2 lg:right-4 hover:text-red-500">
            <button onClick={handleClose} className="text-3xl">
              <IoClose />
            </button>
          </div>
          <BannerPreview formData={formData} id={formData.title} />
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
            <div className="lg:col-span-2 space-y-2">
              <label>Select from predefined images:</label>
              <div className="flex space-x-2">
                {predefinedImages.map((image, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 border border-gray-300 rounded-full overflow-hidden cursor-pointer"
                    onClick={() =>
                      handleChange({
                        target: { name: "image", value: image },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                  >
                    <Image
                      src={image}
                      alt={`Predefined ${index}`}
                      width={100}
                      height={100}
                      quality={100}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label>Upload Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full px-2 py-1.5 border border-gray-300 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </section>
          <div className="w-full space-y-2">
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full mt-2 mb-4 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full space-y-2">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="block w-full mt-2 mb-4 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full space-y-2">
            <label>Call to Action:</label>
            <input
              type="text"
              name="callToAction"
              value={formData.callToAction}
              onChange={handleChange}
              className="block w-full mt-2 mb-4 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end mt-2 w-full">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBannerTemplate;
