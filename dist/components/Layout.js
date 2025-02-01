import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Layout as AntLayout, Button, Modal } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { LogoutOutlined } from "@ant-design/icons";
import CompanyForm from "./company/CompanyForm";
const { Header, Content } = AntLayout;
const Layout = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
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
    return (_jsxs(AntLayout, { children: [_jsx(Header, { style: {
                    position: "fixed",
                    width: "100%",
                    zIndex: 1000,
                    padding: "0 24px",
                    background: "#001529",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                }, children: _jsxs("div", { style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }, children: [_jsx("h1", { style: { color: "white", margin: 0, fontSize: "20px" }, children: "Companies" }), _jsxs("div", { style: { display: "flex", gap: "16px" }, children: [_jsx(Button, { ghost: true, icon: _jsx(LogoutOutlined, { rotate: 180 }), onClick: () => logoutMutation.mutate(), loading: logoutMutation.isPending, style: {
                                        color: "white",
                                        borderColor: "white",
                                    } }), _jsx(Button, { type: "primary", style: { backgroundColor: "#08979C" }, onClick: () => setIsModalVisible(true), children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F" })] })] }) }), _jsx(Content, { style: { marginTop: 64, padding: 24 }, children: _jsx(Outlet, {}) }), _jsx(Modal, { title: "Add Company", open: isModalVisible, onCancel: () => setIsModalVisible(false), footer: null, destroyOnClose: true, children: _jsx(CompanyForm, { onSuccess: () => {
                        setIsModalVisible(false);
                    } }) })] }));
};
export default Layout;
