const MQTT = require("async-mqtt")

async function Start() {
	try {
		const mqtt = await MQTT.connect("mqtt://localhost:1883");

		mqtt.on("connect", () => {
			console.log("Connected");
		})

		mqtt.on("message", (topic, message) => {
			console.log(`New Message from ${topic} : ${message}`);
			mqtt.publish("received", "message received");
		});
		mqtt.subscribe("example/#");
		mqtt.subscribe("exaple2");
	} catch(error) {
		console.log(error.message);
	}
}

Start();