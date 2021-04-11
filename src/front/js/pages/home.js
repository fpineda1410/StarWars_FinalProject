import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

import "antd/dist/antd.css";
import { Button, Layout, Menu, Breadcrumb, Row, Col, Divider } from "antd";

import { Card, Avatar } from "antd";

import {
	CaretLeftOutlined,
	UserSwitchOutlined,
	UserAddOutlined,
	CheckCircleFilled,
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const { Meta } = Card;

import "../../styles/home.css";

export const Home = () => {
	const [collapse, setCollapse] = useState(false);

	useEffect(() => {}, [collapse]);

	function onCollapse() {
		setCollapse(!collapse);
	}

	const CardGeneratorPlanets = ({ list }) => {};

	return (
		<>
			<Layout style={{ minHeight: "100vh" }}>
				<Sider collapsible collapsed={collapse} onCollapse={onCollapse}>
					<div className="logo" />
					<Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
						<Menu.Item key="1" icon={<UserAddOutlined />}>
							Sign In
						</Menu.Item>
						<Menu.Item key="2" icon={<UserSwitchOutlined />}>
							Login
						</Menu.Item>
						<SubMenu key="sub1" icon={<CheckCircleFilled />} title="Favorites">
							<Menu.Item key="3">Tom</Menu.Item>
							<Menu.Item key="4">Bill</Menu.Item>
							<Menu.Item key="5">Alex</Menu.Item>
						</SubMenu>
						<Menu.Item key="9" icon={<CaretLeftOutlined />} title="">
							Sign Out
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Header className="site-layout-background" style={{ padding: 0 }} />
					<Content style={{ margin: "5vh" }}>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<Col className="gutter-row" span={4} style={{ margin: "1vh" }}>
								<Card
									style={{ width: 300 }}
									cover={
										<img
											alt="example"
											src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
										/>
									}
									actions={[
										<SettingOutlined key="setting" />,
										<EditOutlined key="edit" />,
										<EllipsisOutlined key="ellipsis" />
									]}>
									<Meta
										avatar={
											<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
										}
										title="Card title"
										description="This is the description"
									/>
								</Card>
							</Col>
						</Row>
					</Content>
					<Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
				</Layout>
			</Layout>
		</>
	);
};
