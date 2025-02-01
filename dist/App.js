import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CompanyList from "./components/company/CompanyList";
import Layout from "./components/Layout";
const queryClient = new QueryClient();
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return _jsx(Navigate, { to: "/signin" });
    }
    return _jsx(_Fragment, { children: children });
};
const App = () => {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/signin", element: _jsx(SignIn, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignUp, {}) }), _jsxs(Route, { path: "/", element: _jsx(ProtectedRoute, { children: _jsx(Layout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(Navigate, { to: "/companies", replace: true }) }), _jsx(Route, { path: "companies", element: _jsx(CompanyList, {}) })] })] }) }) }));
};
export default App;
