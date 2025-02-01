import React from "react";
import { Form, Input, Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../../api/auth";
import bgimage from "../../assets/bgimage.jpg";

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
    <div
      style={{
        backgroundImage: `url(${bgimage})`,
      }}
      className="flex items-center justify-center bg-center bg-cover bg-no-repeat bg-fixed bg-opacity-70 bg-black  bg-blend-multiply h-screen w-screen"
    >
      <div className="bg-white p-8 w-[400px]">
        <h1 className="text-2xl mb-6">Регистрация</h1>
        <Form
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
          requiredMark={false}
        >
          <Form.Item
            label="ФИО"
            name="fullName"
            rules={[{ required: true, message: "Введите ФИО" }]}
          >
            <Input
              placeholder="Введите ФИО"
              className="h-10 hover:border-gray-300 focus:border-gray-300 focus:shadow-none"
            />
          </Form.Item>
          <Form.Item
            label="Логин"
            name="login"
            rules={[{ required: true, message: "Введите логин" }]}
          >
            <Input
              placeholder="Введите логин"
              className="h-10 hover:border-gray-300 focus:border-gray-300 focus:shadow-none"
            />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password
              placeholder="Введите пароль"
              className="h-10 hover:border-gray-300 focus:border-gray-300 focus:shadow-none"
            />
          </Form.Item>
          <div className="flex justify-between items-center mt-2">
            <Link to="/signin" className="text-blue-500 hover:text-blue-700">
              Войти
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isPending}
              className="!bg-[#87d068] hover:!bg-[#87d068]/80 border-none"
            >
              Регистрация
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
