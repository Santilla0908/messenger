export default class MessengerChatHeader extends Base {
	get css() {
		return `
			<style>
				.title {
					height: 50px;
					border-bottom: 1px solid #202225;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			<div class="title">Название чата</div>
		`;
	}
	constructor() {
		super();
	}
}