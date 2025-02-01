import React, { useEffect, useState } from "react";
import { Layout as AntLayout, Button, Modal } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { PlusOutlined, LogoutOutlined } from "@ant-design/icons";
import CompanyForm from "./company/CompanyForm";

const { Header, Content } = AntLayout;

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      navigate("/signin");
    },
  });

  return (
    <AntLayout>
      <Header
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          padding: "0 24px",
          background: "#001529",
          height: "64px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h1 style={{ color: "white", margin: 0, fontSize: "20px" }}>
            Companies
          </h1>
          <div style={{ display: "flex", gap: "16px" }}>
            <Button
              ghost
              icon={<LogoutOutlined rotate={180} />}
              onClick={() => logoutMutation.mutate()}
              loading={logoutMutation.isPending}
              style={{
                color: "white",
                borderColor: "white",
              }}
            />
            <Button
              type="primary"
              style={{ backgroundColor: "#08979C" }}
              onClick={() => setIsModalVisible(true)}
            >
              Add Company
            </Button>
          </div>
        </div>
      </Header>
      <Content style={{ marginTop: 64, padding: 24 }}>
        <Outlet />
      </Content>

      <Modal
        title="Add Company"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <CompanyForm
          onSuccess={() => {
            setIsModalVisible(false);
          }}
        />
      </Modal>
    </AntLayout>
  );
};

export default Layout;
