import React, { useState } from "react";
import { Table, Button, Modal, message, Dropdown } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { companyApi } from "../../api/company";
import CompanyForm from "./CompanyForm";
import { Company } from "../../types";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const CompanyList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [deletingCompany, setDeletingCompany] = useState<Company | null>(null);
  const queryClient = useQueryClient();

  const { data: companies, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: companyApi.getCompanies,
  });

  const deleteMutation = useMutation({
    mutationFn: companyApi.deleteCompany,
    onSuccess: () => {
      message.success("Company deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      setIsDeleteModalVisible(false);
    },
  });

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingCompany(null);
  };

  const handleDelete = (record: Company) => {
    setDeletingCompany(record);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (deletingCompany) {
      deleteMutation.mutate(deletingCompany.id);
    }
  };

  const getDropdownItems = (record: Company): MenuProps["items"] => [
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "Edit",
      onClick: () => {
        setEditingCompany(record);
        setIsModalVisible(true);
      },
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "Delete",
      danger: true,
      onClick: () => handleDelete(record),
    },
  ];

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Stakeholders",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "",
      key: "actions",
      width: 50,
      render: (_: any, record: Company) => (
        <Dropdown
          menu={{ items: getDropdownItems(record) }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<MoreOutlined style={{ fontSize: "20px" }} />}
            className="border-none shadow-none"
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Table
        columns={columns}
        dataSource={companies}
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title={editingCompany ? "Edit Company" : "Add Company"}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        destroyOnClose={true}
      >
        <CompanyForm
          initialData={editingCompany}
          onSuccess={handleModalClose}
        />
      </Modal>

      <Modal
        title="Delete Company"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={confirmDelete}
        okText="Delete"
        okButtonProps={{
          danger: true,
          loading: deleteMutation.isPending,
        }}
      >
        <p>Are you sure you want to delete this company?</p>
      </Modal>
    </div>
  );
};

export default CompanyList;
