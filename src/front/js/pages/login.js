import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "antd/dist/antd.css";
import "../../styles/login.css";
import { Form, Input, Button, Checkbox, Row, Col, Typography, Image } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title } = Typography;

export const NormalLoginForm = () => {
	const { store, actions } = useContext(Context);

	const onFinish = values => {
		console.log("Received values of form: ", values);
		actions.login_user(values.username, values.password);
	};

	return (
		<Row type="flex" justify="center" align="middle" style={{ minHeight: "100vh" }}>
			<Col span={6}>
				<Title style={{ color: "#001E3D" }}>StarWars User Login</Title>
				<Form
					name="normal_login"
					className="login-form"
					initialValues={{
						remember: true
					}}
					onFinish={onFinish}>
					<Form.Item
						name="username"
						rules={[
							{
								required: true,
								message: "Please input your Username!"
							}
						]}>
						<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your Password!"
							}
						]}>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Log in
						</Button>
						Or{" "}
						<Link key={"register"} to={"/register"}>
							<a href="">register now!</a>
						</Link>
					</Form.Item>
				</Form>
			</Col>
			<Col sm={4}>
				<Image
					width={500}
					src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ralph-mcquarrie-star-wars-concept-art-1537270911.png"
				/>
			</Col>
		</Row>
	);
};
