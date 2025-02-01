import React from "react";
import { Form, Input, Button, InputNumber, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { companyApi } from "../../api/company";
import { Company } from "../../types";

interface CompanyFormProps {
  initialData?: Company | null;
  onSuccess: () => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  initialData,
  onSuccess,
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: (values: Omit<Company, "id">) => {
      if (initialData) {
        return companyApi.updateCompany(initialData.id, values);
      }
      return companyApi.addCompany(values);
    },
    onSuccess: () => {
      message.success(
        `Company ${initialData ? "updated" : "added"} successfully`
      );
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      form.resetFields();
      onSuccess();
    },
  });

  const onFinish = (values: Omit<Company, "id">) => {
    mutation.mutate(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialData || {}}
      requiredMark={false}
    >
      <Form.Item
        label="Company Name"
        name="name"
        rules={[{ required: true, message: "Please input company name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Number of Stakeholders"
        name="count"
        rules={[
          { required: true, message: "Please input number of stakeholders!" },
        ]}
      >
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={mutation.isPending}
        >
          {initialData ? "Update" : "Add"} Company
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CompanyForm;
