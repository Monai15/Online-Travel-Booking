import React from "react";
import { Layout, Table, Typography, Avatar, Button, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const columns = [
    {
        title: "ชื่อทัวร์",
        dataIndex: "name",
        key: "name",
        align: "center",
    },
    {
        title: "ประเภท",
        dataIndex: "type",
        key: "type",
        align: "center",
        render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
        title: "จัดการ",
        key: "manage",
        align: "center",
        render: () => (
            <>
                <Button type="primary" style={{ marginRight: 8 }}>Approval</Button>
                <Button type="default">ดูรายชื่อ</Button>
            </>
        ),
    },
    {
        title: "Actions",
        key: "actions",
        align: "center",
        render: () => (
            <>
                <Button type="link">Edit</Button>
                <Button type="link" danger>Delete</Button>
            </>
        ),
    },
];

const data = [
    {
        key: "1",
        name: "ทัวร์หาดสมิลา",
        type: "One Day Trip",
    },
    {
        key: "2",
        name: "ทัวร์ลุง",
        type: "Multi Day Trip",
    },
];

const AdminDashboard = () => {
    return (
        <Layout className="admin-layout">
            <Header className="admin-header">
                <div className="header-left">
                    <img src="/southtex_logo.png" alt="SOUTHEX" className="admin-logo" />
                    <Title level={3} className="header-title">SOUTHEX</Title>
                </div>
                <div className="header-right">
                    <Avatar icon={<UserOutlined />} className="admin-avatar" />
                    <Text className="admin-name">Admin A</Text>
                </div>
            </Header>

            {/* Content */}
            <Content className="admin-content">
                <Title level={2} className="admin-welcome-title">ยินดีต้อนรับสู่ระบบการจัดการทัวร์ของ Southex</Title>
                <Text>
                    คุณสามารถจัดการทัวร์ ตรวจสอบการจอง และทำให้การดำเนินงานเป็นไปอย่างราบรื่นได้ง่ายๆ<br />
                    ลองใช้ตัวเลือกด้านล่างเพื่ออัปเดตรายละเอียดทัวร์, ยืนยันการชำระเงิน และอนุมัติการจองอย่างมีประสิทธิภาพ
                </Text>

                {/* Tour List Table */}
                <div className="table-container">
                    <Table columns={columns} dataSource={data} pagination={false} />
                </div>

                <Button type="dashed" className="add-package-btn">เพิ่มแพ็คเกจ</Button>
            </Content>
        </Layout>
    );
};

export default AdminDashboard;
