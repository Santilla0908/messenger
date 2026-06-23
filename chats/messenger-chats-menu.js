class MessengerChatsMenu extends Base {
	get css() {
		return `
			<style>
				:host{
					position: absolute;
					inset: 0;
					z-index: 100;
					opacity: 0;
					pointer-events: none;
					transition: opacity 0.3s ease;
					background: rgba(0, 0, 0, 0.5);
					overflow: hidden;
				}
				:host(.opened) {
					opacity: 1;
                    pointer-events: auto;
				}
				.menu_panel {
					position: absolute;
					left: 0;
					top: 0;
					width: 25%;
					height: 100%;
					background: #282A2E;
					border-right: 1px solid #202225;
					transform: translateX(-100%);
					transition: transform 0.3s ease;
				}
				:host(.opened) .menu_panel {
					transform: translateX(0);
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
			<div class="menu_panel">
				<div class="create_chat">Создать чат</div>
			</div>
		`;
	}
	constructor() {
		super();
		this.createChatEl = this.shadowRoot.querySelector('.create_chat');
		this.menuPanelEl = this.shadowRoot.querySelector('.menu_panel');
		this.createChatEl.addEventListener('click', () => {
			this.close();
			this.emit('create-chat');
		});
		
		this.addEventListener('click', e => {
			if (!this.menuPanelEl.contains(e.target)) {
				this.close();
			}
		});
	}
	open() {
		this.classList.add('opened');
	}
	close() {
		this.classList.remove('opened');
	}
}

customElements.define('messenger-chats-menu', MessengerChatsMenu);