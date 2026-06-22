export default class MessengerMsgs extends Base {
	get css() {
		return `
			<style>
				.messages {
					padding: 16px;
					overflow-y: auto;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			<div class="messages">Сообщения будут тут</div>
		`;
	}
	
	constructor() {
		super();
	}
}