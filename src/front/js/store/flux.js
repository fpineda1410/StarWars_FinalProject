let temporal_list;
let temporal_list_planets = [];

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			index: 0,
			character_data: [],
			planet_data: [],
			main_information: [],
			characters: [],
			planets: [],
			bearer_token:
				"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6Z…2NzN9.0lcyYTt-cHQFJdMAz7mbKHgJr4jbPTICniqiwZhKF2s",
			image_storage_characters: [
				"https://lrmonline.com/wp-content/uploads/2020/02/llyly.jpeg", //luke
				"https://www.starwars-holonet.com/news/2017/2017-12-31-c3po-retour-2017.jpg", //C3Po
				"https://cdnb.artstation.com/p/assets/images/images/000/679/053/large/anton-jurkov-r2d2-starwars.jpg?1430602701", //R2D2
				"https://sm.ign.com/ign_latam/screenshot/default/darth-vader-1-0_7cxx.jpg", //DarthV
				"https://townsquare.media/site/442/files/2017/08/Star-Wars-Princess-Leia.jpg?w=980&q=75", //Leia
				"https://cdnb.artstation.com/p/assets/images/images/003/420/677/large/darren-pattenden-ilm-challenge-the-moment-1.jpg?1541176032", //Owen
				"https://i.pinimg.com/originals/2b/bb/71/2bbb712405c574c6ce78730e00464a8e.jpg", //Beru White
				"https://pbs.twimg.com/media/Eks5wMTXgAclnn5.jpg", //R5d4
				"https://cdnb.artstation.com/p/assets/images/images/027/723/547/large/adam-lane-biggsdarklighter-adamlane.jpg?1592360596", //Biggs Darklig
				"https://pbs.twimg.com/media/ELHMAugXkBAySWf.jpg" //Obiwan
			],
			image_storage_planets: [
				"https://img.unocero.com/2020/01/nasa-descubre-planeta-tatooine.jpg", //tatoinne
				"https://fauxthentichistory.files.wordpress.com/2016/09/alderaan.jpg", //Alderaan
				"https://lumiere-a.akamaihd.net/v1/images/databank_yavin4_01_169_b6945e20.jpeg?region=0%2C0%2C1560%2C878&width=960", //yavin4
				"https://lumiere-a.akamaihd.net/v1/images/Hoth_d074d307.jpeg?region=0%2C38%2C1200%2C600", //hoth
				"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0ab74cdc-17bd-4d44-94b7-cd5d9e030ba0/ddpao25-872b5986-6353-4a44-9614-d6e085ea8e5e.jpg/v1/fill/w_1920,h_1013,q_75,strp/dagobah_swamp_by_holboldoart_ddpao25-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMDEzIiwicGF0aCI6IlwvZlwvMGFiNzRjZGMtMTdiZC00ZDQ0LTk0YjctY2Q1ZDllMDMwYmEwXC9kZHBhbzI1LTg3MmI1OTg2LTYzNTMtNGE0NC05NjE0LWQ2ZTA4NWVhOGU1ZS5qcGciLCJ3aWR0aCI6Ijw9MTkyMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.tfkYqkUYx05Y00yqV5AcUNxtb8hwPLNF_Fv1XzgL90w", //dagobah
				"https://i.pinimg.com/originals/92/5d/c1/925dc1e0634804aab35eadf928b5400c.png", //bespin
				"https://media.contentapi.ea.com/content/dam/walrus/common/swbf2-grid-tile-exploring-endor-16x9.jpg.adapt.crop191x100.628p.jpg", //endor
				"https://lumiere-a.akamaihd.net/v1/images/databank_naboo_01_169_6cd7e1e0.jpeg?region=0%2C49%2C1560%2C780", //naboo
				"https://lumiere-a.akamaihd.net/v1/images/Coruscant_03db43b4.jpeg?region=0%2C96%2C1536%2C768", //corsucant
				"https://lumiere-a.akamaihd.net/v1/images/databank_kamino_01_169_f9027822.jpeg?region=0%2C49%2C1560%2C780" //kamino
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			pushData: element => {
				const store = getStore();
				//console.log(element);
				let newCharacters = [];
				let id_tester = [];
				store.characters.map((elm, i) => {
					newCharacters.push(elm);
				});
				if (newCharacters.length == 0) {
					newCharacters.push(element);
				} else {
					newCharacters.map(elm => {
						id_tester.push(elm.id);
					});
					if (!id_tester.includes(element.id)) {
						//todo the element I receive is a complete data set, divide element into element.name, element.local_id
						//todo change to local id
						newCharacters.push(element); // todo elemen.name
					}
				}

				//console.log(id_tester);
				setStore({ characters: newCharacters }); //edit this in order to be category: CHARACTER id: local_id
			},

			deleteData: id => {
				//todo the element I receive is a complete data set, divide element into element.name, element.local_id
				//todo change to local id
				const store = getStore();
				let newProtagonists = [];

				store.characters.map((elm, i) => {
					if (elm.id !== id) {
						newProtagonists.push(elm);
					}
				});
				//console.log(id);

				setStore({ characters: newProtagonists });
			},
			pushDataPlanets: element => {
				const store = getStore();
				let newPlanets = [];
				let id_tester = [];
				store.planets.map((elm, i) => {
					newPlanets.push(elm);
				});

				if (newPlanets.length == 0) {
					newPlanets.push(element);
				} else {
					newPlanets.map(elm => {
						id_tester.push(elm.id);
					});
					if (!id_tester.includes(element.id)) {
						newPlanets.push(element);
					}
				}
				//console.log(id_tester);
				setStore({ planets: newPlanets });
			},
			deleteDataPlanets: id => {
				const store = getStore();
				let newPlanets = [];
				store.planets.map((elm, i) => {
					if (elm.id !== id) {
						newPlanets.push(elm);
					}
				});
				//console.log(id);
				setStore({ planets: newPlanets });
			},

			publishData: index => {
				const store = getStore();
				//console.log(index);
				setStore({ main_information: store.character_data[index] });
				setStore({ index: index });
			},
			getRequest_protagonists_props: async () => {
				const urlAPI = "http://127.0.0.1:3001/api/characters";
				const result = await fetch(urlAPI)
					.then(res => res.json())
					.then(data => (temporal_list = data));
				//temporal_list = result.results;

				console.log(temporal_list);
				setStore({ character_data: temporal_list });
				//setStore({ boolean_protagonists: true });
			},

			getRequest_planets_props: async () => {
				const urlAPI = "http://127.0.0.1:3001/api/planets";
				const result = await fetch(urlAPI)
					.then(res => res.json())
					.then(data => (temporal_list_planets = data));
				console.log(temporal_list_planets);
				setStore({ planet_data: temporal_list_planets });
			},
			register_user: async (username, password, email) => {
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username: username, password: password, email: email })
				};
				fetch("http://127.0.0.1:3001/api/create-account", requestOptions)
					.then(response => response.json())
					.then(data => console.log(data));
			},
			login_user: async (username, password) => {
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username: username, password: password })
				};
				fetch("http://127.0.0.1:3001/api/login", requestOptions)
					.then(response => response.json())
					.then(data => console.log(data));
			},
			//todo implement fetchs
			debugger: async () => {
				const store = getStore();
				console.log(store.bearer_token);
				const requestOptions = {
					method: "GET",
					headers: { "Content-Type": "application/json", Authorization: store.bearer_token }
				};
				fetch("http://127.0.0.1:3001/api/user_identity", requestOptions)
					.then(response => response.json())
					.then(data => console.log(data));
			}
		}
	};
};

export default getState;

//todo implement fetch, login y update favorites con la condicion que ya este logeado
//todo subir gitpod