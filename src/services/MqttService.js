import mqtt from 'mqtt'

class MqttService {
  constructor() {
    this.client = null;
  }

  connect(username, password) {
    this.client = mqtt.connect('wss://31c1474781644cc99b02813714a2f9e6.s2.eu.hivemq.cloud:8884/mqtt', {
      rejectUnauthorized: false,
      username: username,
      password: password,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
    });
  }

  getClient() {
    return this.client;
  }
}

const mqttService = new MqttService();

export default mqttService;
