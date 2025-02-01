import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Table, Button, Modal, message, Dropdown } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { companyApi } from "../../api/company";
import CompanyForm from "./CompanyForm";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
const CompanyList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);
    const [deletingCompany, setDeletingCompany] = useState(null);
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
    const handleDelete = (record) => {
        setDeletingCompany(record);
        setIsDeleteModalVisible(true);
    };
    const confirmDelete = () => {
        if (deletingCompany) {
            deleteMutation.mutate(deletingCompany.id);
        }
    };
    const getDropdownItems = (record) => [
        {
            key: "edit",
            icon: _jsx(EditOutlined, {}),
            label: "Edit",
            onClick: () => {
                setEditingCompany(record);
                setIsModalVisible(true);
            },
        },
        {
            key: "delete",
            icon: _jsx(DeleteOutlined, {}),
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
            render: (_, record) => (_jsx(Dropdown, { menu: { items: getDropdownItems(record) }, trigger: ["click"], placement: "bottomRight", children: _jsx(Button, { type: "text", icon: _jsx(MoreOutlined, { style: { fontSize: "20px" } }), className: "border-none shadow-none" }) })),
        },
    ];
    return (_jsxs("div", { className: "p-6", children: [_jsx(Table, { columns: columns, dataSource: companies, loading: isLoading, rowKey: "id" }), _jsx(Modal, { title: editingCompany ? "Edit Company" : "Add Company", open: isModalVisible, onCancel: handleModalClose, footer: null, destroyOnClose: true, children: _jsx(CompanyForm, { initialData: editingCompany, onSuccess: handleModalClose }) }), _jsx(Modal, { title: "Delete Company", open: isDeleteModalVisible, onCancel: () => setIsDeleteModalVisible(false), onOk: confirmDelete, okText: "Delete", okButtonProps: {
                    danger: true,
                    loading: deleteMutation.isPending,
                }, children: _jsx("p", { children: "Are you sure you want to delete this company?" }) })] }));
};
export default CompanyList;
