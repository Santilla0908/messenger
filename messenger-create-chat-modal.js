export default class MessengerCreateChatModal extends Base {
	get css() {
		return `
			<style>
				:host {
					position: absolute;
					inset: 0;
					display: none;
					background: rgba(0,0,0,.5);
				}
				:host(.open) {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.modal {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 10px;
					width: 250px;
					height: 130px;
					background: #282A2E;
					border: 1px solid #202225;
					border-radius: 8px;
					padding: 10px;
				}
				.title {
					font-size: 18px;
					font-weight: bold;
				}
				.chat_name {
					height: 36px;
					padding: 0 10px;
					background: #313438;
					border: 1px solid #202225;
					color: #E8E6E1;
				}
				.chat_name:focus {
					outline: none;
				}
				.buttons {
					display: flex;
					justify-content: flex-end;
					gap: 10px;
					width: 100%;
				}
				button {
					height: 36px;
					padding: 0 16px;
					border: none;
					cursor: pointer;
					background: none;
					color: white;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			<div class="modal">
				<div class="title">Создание чата</div>
				<input class="chat_name" type="text" placeholder="Введите название чата">
				<div class="buttons">
					<button class="cancel">Отмена</button>
					<button class="ok">ОК</button>
				</div>
			</div>
		`;
	}
	
	constructor() {
		super();
		
		this.inputEl = this.shadowRoot.querySelector('.chat_name');
		this.cancelEl = this.shadowRoot.querySelector('.cancel');
		this.okEl = this.shadowRoot.querySelector('.ok');
		
		this.cancelEl.addEventListener('click', () => {
			this.close();
		});
		
		this.okEl.addEventListener('click', () => {
			const chatName = this.inputEl.value.trim();
			if (!chatName) return;
			const app = this.getRootNode().host;
			app.createChat(chatName);
		});
	}
	
	open() {
		this.classList.add('open');
	}
	
	close() {
		this.classList.remove('open');
	}
}