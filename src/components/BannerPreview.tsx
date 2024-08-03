import React from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { BiSolidFilePng, BiSolidFileJpg } from "react-icons/bi";

interface BannerData {
  title: string;
  description: string;
  callToAction: string;
  image: string;
  bgTemplate: string;
}

interface BannerPreviewProps {
  formData: BannerData;
  id: string;
}

const BannerPreview: React.FC<BannerPreviewProps> = ({ formData, id }) => {
  const handleDownload = async (format: "png" | "jpg") => {
    const element = document.getElementById(id);
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL(`image/${format}`);
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `banner.${format}`;
      link.click();
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative w-full rounded-md bg-transparent" id={id}>
        <div className="w-full h-72 lg:h-96">
          <Image
            src={formData.bgTemplate}
            alt="Background Template"
            width={400}
            height={300}
            quality={100}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        <section className="absolute top-0 w-full h-full">
          <div className="relative w-full h-full px-6 py-4">
            <section className="h-full">
              <div className="space-y-2">
                <h1 className="font-semibold text-2xl lg:text-3xl">
                  {formData.title}
                </h1>
                <p className="font-medium lg:text-lg">{formData.description}</p>
              </div>
              <div className="absolute bottom-8">
                <button className="flex justify-center items-center border border-black rounded-lg shadow px-4 py-2 bg-black/5 font-semibold text-sm">
                  {formData.callToAction}
                </button>
              </div>
            </section>
            <section className="absolute bottom-4 right-4 w-36 lg:w-48 max-h-56 max-h-80 border-[1.6px] border-black p-1.5 rounded-tl-2xl rounded-br-3xl shadow-xl">
              <div className="rounded-tl-3xl rounded-br-3xl overflow-hidden">
                <Image
                  src={formData.image}
                  alt={formData.title}
                  width={400}
                  height={300}
                  quality={100}
                  className="object-cover w-full"
                />
              </div>
            </section>
          </div>
        </section>
      </div>
      <div className="absolute top-1 lg:top-3 right-1 lg:right-4 flex justify-center items-center gap-1 lg:gap-2">
        <button
          onClick={() => handleDownload("png")}
          className="text-2xl lg:text-3xl"
        >
          <BiSolidFilePng />
        </button>
        <button
          onClick={() => handleDownload("jpg")}
          className="text-2xl lg:text-3xl"
        >
          <BiSolidFileJpg />
        </button>
      </div>
    </div>
  );
};

export default BannerPreview;
