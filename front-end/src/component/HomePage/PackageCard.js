import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { GET_PACKAGES } from "../../Graphql";
import { useQuery } from "@apollo/client";
import Title from "antd/es/skeleton/Title";

const { Meta } = Card;

export default function PackageCard() {
  const { loading, error, data } = useQuery(GET_PACKAGES);
  const [dataSource, setDataSource] = useState([]);
  console.log("data: ", data);
  useEffect(() => {
    if (data && data.packages) {
      const mapData = data.packages.map((item) => ({
        documentId: item.documentId,
        Price: item.Price,
        Title: item.Title,
        Type: item.Type,
        urlImage: item.Image[0].url,
      }));
      setDataSource(mapData);
    }
  }, [data]);

  console.log("dataSource: ", dataSource);
  return (
    <Row gutter={[16, 16]} style={{ padding: "24px" }}>
      {dataSource.map((item) => (
        <Col xs={24} sm={12} md={8} lg={6} key={item.documentId}>
          <Card
            hoverable
            style={{
              width: "100%",
              height: "100%",
            }}
            cover={
              <img
                alt={item.Title}
                src={`http://localhost:1337${item.urlImage}`}
                style={{
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            }
          >
            <Meta
              title={item.Title}
              description={
                <>
                  <div>{item.Type}</div>
                  <div style={{ color: "#FF0000" }}>${item.Price}</div>
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
