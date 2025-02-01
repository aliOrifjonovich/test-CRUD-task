import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../../api/auth";
import bgimage from "../../assets/bgimage.jpg";
const SignUp = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: authApi.signup,
        onSuccess: () => {
            message.success("Successfully signed up!");
            navigate("/signin");
        },
        onError: () => {
            message.error("Failed to sign up");
        },
    });
    const onFinish = (values) => {
        mutation.mutate(values);
    };
    return (_jsx("div", { style: {
            backgroundImage: `url(${bgimage})`,
        }, className: "flex items-center justify-center bg-center bg-cover bg-no-repeat bg-fixed bg-opacity-70 bg-black  bg-blend-multiply h-screen w-screen", children: _jsxs("div", { className: "bg-white p-8 w-[400px]", children: [_jsx("h1", { className: "text-2xl mb-6", children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" }), _jsxs(Form, { layout: "vertical", onFinish: onFinish, className: "space-y-4", requiredMark: false, children: [_jsx(Form.Item, { label: "\u0424\u0418\u041E", name: "fullName", rules: [{ required: true, message: "Введите ФИО" }], children: _jsx(Input, { placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0424\u0418\u041E", className: "h-10 hover:border-gray-300 focus:border-gray-300 focus:shadow-none" }) }), _jsx(Form.Item, { label: "\u041B\u043E\u0433\u0438\u043D", name: "login", rules: [{ required: true, message: "Введите логин" }], children: _jsx(Input, { placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043B\u043E\u0433\u0438\u043D", className: "h-10 hover:border-gray-300 focus:border-gray-300 focus:shadow-none" }) }), _jsx(Form.Item, { label: "\u041F\u0430\u0440\u043E\u043B\u044C", name: "password", rules: [{ required: true, message: "Введите пароль" }], children: _jsx(Input.Password, { placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C", className: "h-10 hover:border-gray-300 focus:border-gray-300 focus:shadow-none" }) }), _jsxs("div", { className: "flex justify-between items-center mt-2", children: [_jsx(Link, { to: "/signin", className: "text-blue-500 hover:text-blue-700", children: "\u0412\u043E\u0439\u0442\u0438" }), _jsx(Button, { type: "primary", htmlType: "submit", loading: mutation.isPending, className: "!bg-[#87d068] hover:!bg-[#87d068]/80 border-none", children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" })] })] })] }) }));
};
export default SignUp;
