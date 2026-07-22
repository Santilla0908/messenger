export default class MessengerChatInputs extends Base {
	get css() {
		return `
			<style>
				:host {
					position: relative;
					display: flex;
					align-items: center;
					background: #1F2124;
					border-top: 1px solid #202225;
				}
				input {
					width: 100%;
					background: #313438;
					border: none;
					color: #E8E6E1;
					padding: 0 46px 0 10px;
					height: 40px;
					border-radius: 4px;
				}
				input:focus {
					outline: none;
				}
				.send_btn {
					position: absolute;
					right: 15px;
					height: 28px;
					width: 28px;
					border: none;
					cursor: pointer;
					background: #5865F2;
					color: white;
					border-radius: 50%;
					opacity: 1;
					pointer-events: auto;
					transition: opacity 0.15s ease;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			<input class="input" type="text" placeholder="Введите сообщение...">
			<button class="send_btn">→</button>
		`;
	}
	constructor() {
		super();
		
		this.inputEl = this.shadowRoot.querySelector('.input');
		this.sendBtnEl = this.shadowRoot.querySelector('.send_btn');
		
		this.sendBtnEl.addEventListener('click', () => {
			this.sendMessage();
		});
		
		this.inputEl.addEventListener('keydown', e => {
			if (e.key === 'Enter') {
				this.sendMessage();
			}
		});
	}
	
	sendMessage() {
		const text = this.inputEl.value.trim();
		if (!text) return;
		this.emit('message-send', {
			text
		});
		this.inputEl.value = '';
	}
}