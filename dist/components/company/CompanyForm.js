import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Button, InputNumber, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { companyApi } from "../../api/company";
const CompanyForm = ({ initialData, onSuccess, }) => {
    const queryClient = useQueryClient();
    const [form] = Form.useForm();
    const mutation = useMutation({
        mutationFn: (values) => {
            if (initialData) {
                return companyApi.updateCompany(initialData.id, values);
            }
            return companyApi.addCompany(values);
        },
        onSuccess: () => {
            message.success(`Company ${initialData ? "updated" : "added"} successfully`);
            queryClient.invalidateQueries({ queryKey: ["companies"] });
            form.resetFields();
            onSuccess();
        },
    });
    const onFinish = (values) => {
        mutation.mutate(values);
    };
    return (_jsxs(Form, { form: form, layout: "vertical", onFinish: onFinish, initialValues: initialData || {}, requiredMark: false, children: [_jsx(Form.Item, { label: "Company Name", name: "name", rules: [{ required: true, message: "Please input company name!" }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Number of Stakeholders", name: "count", rules: [
                    { required: true, message: "Please input number of stakeholders!" },
                ], children: _jsx(InputNumber, { min: 1, style: { width: "100%" } }) }), _jsx(Form.Item, { children: _jsxs(Button, { type: "primary", htmlType: "submit", block: true, loading: mutation.isPending, children: [initialData ? "Update" : "Add", " Company"] }) })] }));
};
export default CompanyForm;
