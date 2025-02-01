import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../../api/auth";

const SignUp: React.FC = () => {
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

  const onFinish = (values: {
    login: string;
    password: string;
    fullName: string;
  }) => {
    mutation.mutate(values);
  };

  return (
    <div className="flex items-center justify-center bg-center bg-cover bg-no-repeat bg-fixed bg-opacity-50 bg-black bg-[url(/src/assets/bgImage.jpg)] bg-blend-multiply h-screen w-screen">
      <Card className="w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            label="FullName"
            name="fullName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Login" name="login" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={mutation.isPending}
            >
              Sign Up
            </Button>
          </Form.Item>
          <div className="text-center">
            Already have an account? <Link to="/signin">Sign In</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
