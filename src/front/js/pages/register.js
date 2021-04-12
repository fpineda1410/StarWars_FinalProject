import React, { useState, useContext } from "react";
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Image, Typography } from "antd";
import { Context } from "../store/appContext";
const { Option } = Select;

const { Title } = Typography;

const formItemLayout = {
	labelCol: {
		xs: {
			span: 24
		},
		sm: {
			span: 8
		}
	},
	wrapperCol: {
		xs: {
			span: 24
		},
		sm: {
			span: 16
		}
	}
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0
		},
		sm: {
			span: 16,
			offset: 8
		}
	}
};

export const RegistrationForm = () => {
	const [form] = Form.useForm();
	const { store, actions } = useContext(Context);

	const onFinish = values => {
		console.log("Received values of form: ", values);
		actions.register_user(values.nickname, values.password, values.email);
	};

	const prefixSelector = (
		<Form.Item name="prefix" noStyle>
			<Select
				style={{
					width: 70
				}}>
				<Option value="86">+86</Option>
				<Option value="87">+87</Option>
			</Select>
		</Form.Item>
	);
	const [autoCompleteResult, setAutoCompleteResult] = useState([]);

	const onWebsiteChange = value => {
		if (!value) {
			setAutoCompleteResult([]);
		} else {
			setAutoCompleteResult([".com", ".org", ".net"].map(domain => `${value}${domain}`));
		}
	};

	const websiteOptions = autoCompleteResult.map(website => ({
		label: website,
		value: website
	}));
	return (
		<Row type="flex" justify="right" align="middle" style={{ minHeight: "100vh" }}>
			<Col span={12}>
				<Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
					<Form.Item
						name="email"
						label="E-mail"
						rules={[
							{
								type: "email",
								message: "The input is not valid E-mail!"
							},
							{
								required: true,
								message: "Please input your E-mail!"
							}
						]}>
						<Input />
					</Form.Item>

					<Form.Item
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: "Please input your password!"
							}
						]}
						hasFeedback>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name="confirm"
						label="Confirm Password"
						dependencies={["password"]}
						hasFeedback
						rules={[
							{
								required: true,
								message: "Please confirm your password!"
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve();
									}

									return Promise.reject(
										new Error("The two passwords that you entered do not match!")
									);
								}
							})
						]}>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name="nickname"
						label="Nickname"
						tooltip="What do you want others to call you?"
						rules={[
							{
								required: true,
								message: "Please input your nickname!",
								whitespace: true
							}
						]}>
						<Input />
					</Form.Item>

					<Form.Item
						name="agreement"
						valuePropName="checked"
						rules={[
							{
								validator: (_, value) =>
									value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement"))
							}
						]}
						{...tailFormItemLayout}>
						<Checkbox>
							I have read the <a href="">agreement</a>
						</Checkbox>
					</Form.Item>

					<Form.Item {...tailFormItemLayout}>
						<Button type="primary" htmlType="submit">
							Register
						</Button>
					</Form.Item>
				</Form>
			</Col>
			<Col sm={4} style={{ margin: "10vh" }}>
				<Image width={400} src="https://i.pinimg.com/736x/73/b3/23/73b32317cb1b93bc58f978d87279957c.jpg" />
			</Col>
		</Row>
	);
};
