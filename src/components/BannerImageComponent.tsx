"use client";

import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import bannerData from "@/mock/database.json";
import BannerPreview from "./BannerPreview";
import EditBannerTemplate from "./EditBannerTemplate";

interface BannerData {
  title: string;
  description: string;
  callToAction: string;
  image: string;
  bgTemplate: string;
}

const BannerImageComponent: React.FC = () => {
  const [data, setData] = useState<BannerData[]>(bannerData);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<BannerData>({
    title: "",
    description: "",
    callToAction: "",
    image: "",
    bgTemplate: "",
  });

  const handleEdit = (index: number) => {
    setCurrentEditIndex(index);
    setFormData(data[index]);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (currentEditIndex !== null) {
      const newData = [...data];
      newData[currentEditIndex] = formData;
      setData(newData);
      setIsEditing(false);
    }
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 m-2 lg:m-4 gap-6 lg:gap-8">
      {data.map((item, index) => (
        <div key={index} className="relative">
          <BannerPreview formData={item} id={item.title} />
          <div className="absolute top-1.5 lg:top-4 right-16 lg:right-24">
            <button
              onClick={() => handleEdit(index)}
              className="text-xl lg:text-2xl"
            >
              <FaEdit />
            </button>
          </div>
        </div>
      ))}
      {isEditing && (
        <EditBannerTemplate
          formData={formData}
          handleChange={handleChange}
          handleSave={handleSave}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default BannerImageComponent;
