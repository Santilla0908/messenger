export default class MessengerChatComposer extends Base {
	get css() {
		return `
			<style>
				input {
					width: 100%;
					height: 50px;
					background: #313438;
					border: none;
					color: #E8E6E1;
				}
				input:focus {
					outline: none;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			<input placeholder="Введите сообщение">
		`;
	}
	constructor() {
		super();
	}
}