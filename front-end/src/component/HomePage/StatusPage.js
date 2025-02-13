import React, { useState, useEffect } from "react";
import { Card, Row, Col, Tag, Timeline, Layout, message } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { UserHeader } from "../Header/UserHeader";
import { useAuth } from "../../AuthContext";
import { BOOKING } from "../../Graphql";
import { useQuery } from "@apollo/client";
import { ALL_IMAGES_PACKAGE } from "../../Graphql";
import "antd/dist/reset.css";

export default function StatusPage() {
  // ใช้ useQuery เพื่อดึงข้อมูล booking และรูปภาพจาก GraphQL API
  const { loading, error, data: data_booking } = useQuery(BOOKING);
  const { data: data_image } = useQuery(ALL_IMAGES_PACKAGE);

  // ใช้ useAuth เพื่อดึงข้อมูลผู้ใช้ปัจจุบัน
  const { data } = useAuth();

  // สร้าง state เพื่อเก็บข้อมูล booking และรูปภาพ
  const [bookings, setBookings] = useState([]);
  const [image, setImage] = useState([]);

  // ฟังก์ชันสำหรับแสดงสถานะ booking ในรูปแบบ Tag
  const getStatusTag = (status) => {
    switch (status) {
      case "approved":
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Approved
          </Tag>
        );
      case "pending":
        return (
          <Tag icon={<ClockCircleOutlined />} color="processing">
            Pending
          </Tag>
        );
      case "rejected":
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Rejected
          </Tag>
        );
      default:
        return <Tag color="default">Unknown</Tag>;
    }
  };

  // แสดงข้อมูล booking และรูปภาพใน console เพื่อตรวจสอบ
  console.log(data_booking);
  console.log("image", data_image);

  // ใช้ useEffect เพื่อจัดรูปแบบข้อมูล booking และรูปภาพเมื่อข้อมูลเปลี่ยนแปลง
  useEffect(() => {
    if (data_booking && data_image) {
      // จัดรูปแบบข้อมูล booking โดยเชื่อมโยงกับรูปภาพ
      const mapData = data_booking.bookings.map((booking, index) => {
        const packageImage = data_image.packages.find(
          (item) => item.documentId === booking.package.documentId
        );
        return {
          id: index,
          seats: booking.HowManyPeople,
          status: booking.Status_booking,
          price: booking.TotalPrice,
          documentId: booking.documentId,
          packageName: booking.package.Title,
          Type: booking.package.Type,
          Start: booking.Start,
          End: booking.End,
          image: `http://localhost:1337${packageImage.Image[0].url}`,
        };
      });
      // อัปเดต state bookings ด้วยข้อมูลที่จัดรูปแบบแล้ว
      setBookings(mapData);
    }
  }, [data_booking, data_image]);

  // แสดง Loading หากข้อมูลยังไม่โหลดเสร็จ
  if (loading) return <div>Loading...</div>;
  // แสดงข้อผิดพลาดหากเกิด error ในการดึงข้อมูล
  if (error) return <div>Error: {error.message}</div>;
  // แสดงข้อความหากไม่มีข้อมูล booking
  if (!data_booking) return <div>No data available</div>;

  return (
    <Layout>
      {/* ส่วน Header ของหน้าเว็บ */}
      <Header>
        <UserHeader />
      </Header>

      {/* ส่วน Content ของหน้าเว็บ */}
      <Content>
        <div style={{ padding: "24px" }}>
          <h1 style={{ marginBottom: "24px" }}>Booking Status</h1>
          {/* ใช้ Row และ Col เพื่อจัดรูปแบบการแสดงผล booking ในรูปแบบกริด */}
          <Row gutter={[16, 16]}>
            {bookings.map((item) => (
              <Col key={item.id} xs={24} sm={12} lg={8}>
                {/* การ์ดสำหรับแสดงข้อมูล booking แต่ละรายการ */}
                <Card
                  cover={
                    <img
                      alt={item.packageName}
                      src={item.image}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  }
                  hoverable
                >
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      {/* แสดงชื่อแพ็กเกจ */}
                      <h2>{item.packageName}</h2>
                      {/* แสดงวันที่เริ่มและสิ้นสุด */}
                      <p>
                        Date: {new Date(item.Start).toLocaleDateString()}{" "}
                        {item.End &&
                          ` - ${new Date(item.End).toLocaleDateString()}`}
                      </p>
                      {/* แสดงราคา */}
                      <p>Price: ${item.price}</p>
                      {/* แสดงจำนวนที่นั่ง */}
                      <p>Seats: {item.seats}</p>
                      {/* แสดงสถานะ booking */}
                      <div style={{ marginTop: "16px" }}>
                        {getStatusTag(item.status)}
                      </div>
                    </Col>
                    <Col span={24}>
                      {/* Timeline สำหรับแสดงขั้นตอนการจอง */}
                      <Timeline>
                        <Timeline.Item color="green">Booked</Timeline.Item>
                        <Timeline.Item
                          color={
                            item.status === "approved" ||
                            item.status === "rejected"
                              ? "green"
                              : "gray"
                          }
                        >
                          Payment Completed
                        </Timeline.Item>
                        <Timeline.Item
                          color={
                            item.status === "approved"
                              ? "green"
                              : item.status === "rejected"
                              ? "red"
                              : "gray"
                          }
                        >
                          {item.status === "approved"
                            ? "Approved"
                            : item.status === "rejected"
                            ? "Rejected"
                            : "Pending Approval"}
                        </Timeline.Item>
                        <Timeline.Item color="gray">
                          Trip Completion
                        </Timeline.Item>
                      </Timeline>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
}