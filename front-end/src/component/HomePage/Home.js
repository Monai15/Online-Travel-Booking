import React, { useState } from "react";
import { UserHeader } from "../Header/UserHeader";
import { useAuth } from "../../AuthContext";
import PackageCard from "./PackageCard";
import { ChevronLeft, ChevronRight } from "lucide-react"; // นำเข้าไอคอนสำหรับปุ่มเลื่อน

const packageData = [
  { id: 1, name: "Package 1", Type: "One_day_trip", type: "One_day_trip" },
  { id: 2, name: "Package 2", Type: "Muti_day_trip", type: "Muti_day_trip" },
  { id: 3, name: "Package 3", Type: "One_day_trip", type: "One_day_trip" },
  { id: 4, name: "Package 4", Type: "Muti_day_trip", type: "Muti_day_trip" },
  { id: 5, name: "Package 5", Type: "One_day_trip", type: "One_day_trip" },
  { id: 6, name: "Package 6", Type: "Muti_day_trip", type: "Muti_day_trip" },
  { id: 7, name: "Package 7", Type: "One_day_trip", type: "One_day_trip" },
  { id: 8, name: "Package 8", Type: "Muti_day_trip", type: "Muti_day_trip" },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  console.log("Auth: ", isAuthenticated);

  // จัดกลุ่มข้อมูลตาม Type
  const groupedPackages = packageData.reduce((acc, item) => {
    if (!acc[item.Type]) {
      acc[item.Type] = [];
    }
    acc[item.Type].push(item);
    return acc;
  }, {});

  // สร้างคอมโพเนนต์สำหรับแสดงข้อมูลและปุ่มเลื่อน
  const PackageSlider = ({ packages }) => {
    const [startIndex, setStartIndex] = useState(0); // สถานะสำหรับเก็บตำแหน่งเริ่มต้นของข้อมูลที่แสดง

    // ฟังก์ชันสำหรับเลื่อนไปทางซ้าย
    const handlePrev = () => {
      setStartIndex((prev) => Math.max(prev - 3, 0));
    };

    // ฟังก์ชันสำหรับเลื่อนไปทางขวา
    const handleNext = () => {
      setStartIndex((prev) => Math.min(prev + 3, packages.length - 3));
    };

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* ปุ่มเลื่อนไปทางซ้าย */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            visibility: startIndex === 0 ? "hidden" : "visible",
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* แสดงข้อมูล 3 รายการ */}
        <div style={{ display: "flex", gap: "16px", overflow: "hidden", width: "100%" }}>
          {packages.slice(startIndex, startIndex + 3).map((item) => (
            <div key={item.id} style={{ flex: "0 0 30%", minWidth: "30%" }}>
              <PackageCard item={item} />
            </div>
          ))}
        </div>

        {/* ปุ่มเลื่อนไปทางขวา */}
        <button
          onClick={handleNext}
          disabled={startIndex >= packages.length - 3}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            visibility: startIndex >= packages.length - 3 ? "hidden" : "visible",
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    );
  };

  return (
    <div>
      <UserHeader />
      <div style={{ marginTop: "100px" }}>
        {Object.keys(groupedPackages).length > 0 ? (
          Object.keys(groupedPackages).map((type) => (
            <div key={type} style={{ marginBottom: "32px" }}>
              <h2>Type: {type}</h2>
              <PackageSlider packages={groupedPackages[type]} />
            </div>
          ))
        ) : (
          <h1>No Package Data</h1>
        )}
      </div>
    </div>
  );
}