// const MQTT = require("async-mqtt")

// async function Start() {
// 	try {
// 		const mqtt = await MQTT.connect("mqtt://localhost:1883");

// 		mqtt.on("connect", () => {
// 			console.log("Connected");
// 		})

// 		mqtt.on("message", (topic, message) => {
// 			console.log(`New Message from ${topic} : ${message}`);
// 			mqtt.publish("received", "message received");
// 		});
// 		mqtt.subscribe("example/#");
// 		mqtt.subscribe("exaple2");
// 	} catch(error) {
// 		console.log(error.message);
// 	}
// }

// Start();

import mqtt from 'mqtt'

export const client = mqtt.connect('wss://31c1474781644cc99b02813714a2f9e6.s2.eu.hivemq.cloud:8884/mqtt',
		{
			rejectUnauthorized: false,
			username: 'Maciej',
			password: 'toto123456',
			clientId: "maciej",
			protocolId: 'MQTT',
			protocolVersion: 4,
			clean: true,
			reconnectPeriod: 1000,
			connectTimeout: 30 * 1000,
		}
	);