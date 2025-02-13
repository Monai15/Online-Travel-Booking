import React from "react";
import { UserHeader } from "../Header/UserHeader";
import { useAuth } from "../../AuthContext";
import PackageCard from "./PackageCard";
import { Type } from "lucide-react";

// สมมติว่าคุณมีข้อมูล PackageCard เป็น Array ของ Object
const packageData = [
  { id: 1, name: "Package 1", Type: "A", type: "One_day_trip" },
  { id: 2, name: "Package 2", Type: "A", type: "One_day_trip" },
  ];

export default function Home() {
  const { isAuthenticated } = useAuth();
  console.log("Auth: ", isAuthenticated);

  // จัดกลุ่มข้อมูลตาม Type
  const groupedPackages = packageData.reduce((acc, item) => {
    if (!acc[item.Type]) {
      acc[item.Type] = [item.Type];
    }
    acc[item.Type].push(item);
    return acc;
  }, {});

  // ฟังก์ชันสำหรับกรองข้อมูลตาม type ที่กำหนด
  const filterPackagesByType = (packages, filterType) => {
    return packages.filter((item) => item.type === filterType);
  };

  return (
    <div>
      <UserHeader />
      <div style={{ marginTop: "100px" }}>
        {Object.keys(groupedPackages).length > 0 ? (
          Object.keys(groupedPackages).map((type) => (
            <div key={type}>
              <h2>Type: {type}</h2>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {type === "A"
                  ? filterPackagesByType(groupedPackages[type], "One_day_trip").map((item) => (
                      <PackageCard key={item.id} item={item} />
                    ))
                  : type === "B"
                  ? filterPackagesByType(groupedPackages[type], "Muti_day_trip").map((item) => (
                      <PackageCard key={item.id} item={item} />
                    ))
                  : null}
              </div>
            </div>
          ))
        ) : (
          <h1>No Package Data</h1>
        )}
      </div>
    </div>
  );
}