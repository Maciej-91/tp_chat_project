// import ApiBackEnd from '../config/ApiBackEnd';
import ApiBackEnd from '../config/ApiBackend';

const MessageService = {

	getAllLastPublication() {
		return ApiBackEnd({
			method: "get",
			url: "/annonces",
		});
	},

	authenticate(username, password) {
		return ApiBackEnd({
			method: "POST",
			url: `/user/${username}/${password}`
		})
	},

	postMessageGeneralChar(message) {
		return ApiBackEnd({
			method: "POST",
			url: `/publish`,
			data: {
				message: message
			}
		})
	}
};

export default MessageService;