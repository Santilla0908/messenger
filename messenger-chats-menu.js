export default class MessengerChatsMenu extends Base {
	get css() {
		return `
			<style>
				.menu {
					display: flex;
					justify-content: flex-start;
					position: absolute;
					left: 0;
					top: 0;
					width: 50%;
					height: 100%;
					z-index: 100;
					background: #282A2E;
					opacity: 0;
					pointer-events: none;
					transition: opacity 0.3s ease;
				}
				.menu.open {
					opacity: 1;
					pointer-events: auto;
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
			<div class="menu">
				<div class="create_chat">Создать чат</div>
			</div>
		`;
	}
	constructor() {
		super();
		this.menuEl = this.shadowRoot.querySelector('.menu');
		this.createChatEl = this.shadowRoot.querySelector('.create_chat');
		this.createChatEl.addEventListener('click', () => {
			this.close();
			const chatsComponent = this.getRootNode().host;
			const appComponent = chatsComponent.getRootNode().host;
			appComponent.openModal();
		});
	}
	open() {
		this.menuEl.classList.add('open');
	}
	close() {
		this.menuEl.classList.remove('open');
	}
}