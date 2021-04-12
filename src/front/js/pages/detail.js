import React, { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";

import { Context } from "../store/appContext";

import "antd/dist/antd.css";
import { Descriptions, Badge, Row, Col, Image } from "antd";

const gen_content = {
	descrip:
		"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
};

let local_info = [];

export const DetailPage = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	if (params.indicator == 0) {
		console.log(params.index);
		return (
			<Row type="flex" justify="left" align="middle" style={{ minHeight: "100vh", margin: "5vh" }}>
				<Col span={6}>
					<Image width={500} src={store.image_storage_characters[params.index]} />
				</Col>
				<Col span={12}>
					<Descriptions title="Character Info" bordered style={{ margin: "10vh" }}>
						<Descriptions.Item label="Name">{store.character_data[params.index].name}</Descriptions.Item>
						<Descriptions.Item label="Birthday">
							{store.character_data[params.index].birth_day}
						</Descriptions.Item>
						<Descriptions.Item label="Eye Color">
							{store.character_data[params.index].eye_color}
						</Descriptions.Item>
						<Descriptions.Item label="Gender">
							{store.character_data[params.index].gender}
						</Descriptions.Item>
						<Descriptions.Item label="Hair Color" span={2}>
							{store.character_data[params.index].hair_color}
						</Descriptions.Item>

						<Descriptions.Item label="Height" span={2}>
							{store.character_data[params.index].height}
						</Descriptions.Item>
					</Descriptions>
				</Col>
			</Row>
		);
	}

	if (params.indicator == 1) {
		return (
			<Row type="flex" justify="left" align="middle" style={{ minHeight: "100vh", margin: "5vh" }}>
				<Col span={6}>
					<Image width={500} src={store.image_storage_planets[params.index]} />
				</Col>
				<Col span={12}>
					<Descriptions title="Character Info" bordered style={{ margin: "10vh" }}>
						<Descriptions.Item label="Name">{store.planet_data[params.index].name}</Descriptions.Item>
						<Descriptions.Item label="Diameter">
							{store.planet_data[params.index].diameter}
						</Descriptions.Item>
						<Descriptions.Item label="Orbital Period">
							{store.planet_data[params.index].orbital_period}
						</Descriptions.Item>
						<Descriptions.Item label="Rotation Period">
							{store.planet_data[params.index].rotation_period}
						</Descriptions.Item>
						<Descriptions.Item label="Terrain" span={2}>
							{store.planet_data[params.index].terrain}
						</Descriptions.Item>
					</Descriptions>
				</Col>
			</Row>
		);
	}
};
