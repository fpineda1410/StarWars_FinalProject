import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

import "antd/dist/antd.css";
import { Layout, Menu, Row, Col, Typography, Card, Avatar } from "antd";

import { v4 as uuidv4 } from "uuid";

import { Link } from "react-router-dom";

import {
	CaretLeftOutlined,
	UserSwitchOutlined,
	UserAddOutlined,
	CheckCircleFilled,
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
	HeartFilled,
	DeleteFilled
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Meta } = Card;
const { Title } = Typography;

import "../../styles/home.css";

export const Home = () => {
	const [collapse, setCollapse] = useState(false);
	const { store, actions } = useContext(Context);

	useEffect(() => {}, [collapse, store.main_information]);

	function onCollapse() {
		setCollapse(!collapse);
	}

	const CardGeneratorPlanets = ({ list }) => {
		return list.map((item, index) => (
			<Col className="gutter-row" span={4} style={{ margin: "1vh" }} key={index}>
				<Card
					key={index}
					style={{ width: 250 }}
					cover={<img alt="example" src={store.image_storage_planets[index]} />}
					actions={[
						<HeartFilled
							key={index}
							onClick={() =>
								actions.pushDataPlanets({ title: store.planet_data[index].name, id: index + 1 })
							}
						/>,
						<Link key={index} to={"/detail/1/" + index}>
							<EllipsisOutlined key="ellipsis" />
						</Link>
					]}>
					<Meta
						avatar={<Avatar src={store.image_storage_planets[index]} />}
						title={store.planet_data[index].name}
						description="Planet"
					/>
				</Card>
			</Col>
		));
	};

	const CardGeneratorCharacters = ({ list }) => {
		return list.map((item, index) => (
			<Col className="gutter-row" span={4} style={{ margin: "1vh" }} key={index}>
				<Card
					key={index}
					style={{ width: 250 }}
					cover={<img alt="example" src={store.image_storage_characters[index]} />}
					actions={[
						<HeartFilled
							key={index}
							onClick={() => actions.pushData({ title: store.character_data[index].name, id: index + 1 })}
						/>,
						<Link key={index} to={"/detail/0/" + index}>
							<EllipsisOutlined
								key="ellipsis"
								onClick={() => {
									actions.publishData(index);
								}}
							/>
						</Link>
					]}>
					<Meta
						avatar={<Avatar src={store.image_storage_characters[index]} />}
						title={item.name}
						description="Character"
					/>
				</Card>
			</Col>
		));
	};

	return (
		<>
			<Layout style={{ minHeight: "100vh" }}>
				<Sider collapsible collapsed={collapse} onCollapse={onCollapse}>
					<div className="logo" />
					<Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
						<Menu.Item key="1" icon={<UserAddOutlined />}>
							<Link to={"/register"}>Register</Link>
						</Menu.Item>
						<Menu.Item key="2" icon={<UserSwitchOutlined />}>
							<Link to={"/login"}>Login</Link>
						</Menu.Item>
						<SubMenu key="sub1" icon={<CheckCircleFilled />} title="Favorites">
							{store.login ? (
								store.characters.map((item, index) => {
									let unique_key = uuidv4();
									return (
										<Menu.Item key={unique_key}>
											<DeleteFilled
												key="delete"
												onClick={() => {
													actions.deleteData(item.id);
												}}
											/>
											{item.title}
										</Menu.Item>
									);
								})
							) : (
								<Menu.Item key="0"></Menu.Item>
							)}
							{store.login ? (
								store.planets.map((item, index) => {
									let unique_key = uuidv4();
									return (
										<Menu.Item key={unique_key}>
											<DeleteFilled
												key="delete"
												onClick={() => {
													actions.deleteData(item.id);
												}}
											/>
											{item.title}
										</Menu.Item>
									);
								})
							) : (
								<Menu.Item key="0"></Menu.Item>
							)}
						</SubMenu>
						<Menu.Item
							key="9"
							onClick={() => {
								actions.sign_out();
							}}
							icon={<CaretLeftOutlined />}
							title="">
							Sign Out
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Header className="site-layout-background" style={{ padding: 0 }} />
					<Content style={{ margin: "5vh" }}>
						<Title style={{ color: "#3D444D" }}>StarWars Characters</Title>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<CardGeneratorCharacters list={store.character_data} />
						</Row>
						<Title style={{ color: "#3D444D" }}>StarWars Planets</Title>
						<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
							<CardGeneratorPlanets list={store.planet_data} />
						</Row>
					</Content>
					<Footer style={{ textAlign: "center" }}>Star Wars Fan Page ©2021 Created by Felipe Pineda</Footer>
				</Layout>
			</Layout>
		</>
	);
};
