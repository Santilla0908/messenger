export default class MessengerMsgs extends Base {
	get css() {
		return `
			<style>
				.container {
					display: grid;
					grid-template-rows: auto 1fr auto;
					height: 100%;
					border-left: 1px solid #202225;
					background: #282A2E;
				
				}
				.header {
					height: 50px;
					border-bottom: 1px solid #202225;
				}
				.messages {
					padding: 16px;
					overflow-y: auto;
				}
				.footer {
				}
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
			<div class="container">
				<div class="header">Название чата</div>
				<div class="messages">Сообщения будут тут</div>
				<div class="footer">
					<input placeholder="Введите сообщение">
				</div>
			</div>
		`;
	}
	
	constructor() {
		super();
	}
}