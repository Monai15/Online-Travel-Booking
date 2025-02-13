import React, { useEffect, useState } from "react";
import { Menu, Layout } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import southtexLogo from "../southtex_logo.png";
import {
  FormOutlined,
  FileTextOutlined,
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

export const UserHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, data } = useAuth();
  const [fullName, setFullName] = useState("User");

  // ดึงชื่อผู้ใช้จาก sessionStorage
  useEffect(() => {
    if (data) {
      try {
        if (data.Fname && data.Lname) {
          setFullName(`${data.Fname} ${data.Lname}`);
        }
      } catch (error) {
        console.error("Error parsing userData from sessionStorage:", error);
      }
    }
  }, [data]);

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
        {/* โลโก้และชื่อ */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={southtexLogo}
            alt="SOUTHEX Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <span style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>SOUTHEX</span>
        </div>

        {/* เมนู */}
        <Menu theme="dark" mode="horizontal" style={{ flex: 1, justifyContent: "flex-end" }}>
          {!isAuthenticated ? (
            <>
              <Menu.Item key="login" onClick={() => navigate("/login")}>
                <UserOutlined /> เข้าสู่ระบบ
              </Menu.Item>
              <Menu.Item key="register" onClick={() => navigate("/login")}>
                <FormOutlined /> ลงทะเบียน
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item
                key="status"
                onClick={() => navigate(location.pathname === "/status" ? "/" : "/status")}
              >
                {location.pathname === "/status" ? (
                  <>
                    <HomeOutlined /> Home
                  </>
                ) : (
                  <>
                    <FileTextOutlined /> ตรวจสอบสถานะการจองทัวร์
                  </>
                )}
              </Menu.Item>
              <Menu.SubMenu
                key="user"
                title={
                  <span>
                    <UserOutlined /> {fullName}
                  </span>
                }
              >
                <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
                  ออกจากระบบ
                </Menu.Item>
              </Menu.SubMenu>
            </>
          )}
        </Menu>
      </Header>
    </Layout>
  );
};