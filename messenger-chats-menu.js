export default class MessengerChatsMenu extends Base {
	get css() {
		return `
			<style>
				:host {
					display: flex;
					justify-content: flex-start;
					position: absolute;
					left: 0;
					top: 0;
					width: 50%;
					height: 100%;
					z-index: 100;
					background: #282A2E;
					opacity: 1;
					pointer-events: auto;
					transition: opacity 0.3s ease;
				}
				:host(.menu_hidden) {
					opacity: 0;
					pointer-events: none;
            	}
				.create_chat {
					display: flex;
					flex-direction: column;
					justify-content: center;
					width: 100%;
					height: 50px;
					padding: 0 10px;
					border-bottom: 1px solid #202225;
					cursor: pointer;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			<div class="create_chat">Создать чат</div>
		`;
	}
	constructor() {
		super();
		this.classList.add('menu_hidden');
		this.createChatEl = this.shadowRoot.querySelector('.create_chat');
		this.createChatEl.addEventListener('click', () => {
			this.close();
			this.dispatchEvent(
				new CustomEvent('create-chat', {
					bubbles: true,
					composed: true
				})
			);
		});
	}
	open() {
		this.classList.remove('menu_hidden');
	}
	close() {
		this.classList.add('menu_hidden');
	}
}