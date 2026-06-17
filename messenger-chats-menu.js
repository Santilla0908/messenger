class MessengerChatsMenu extends Base {
	get css() {
		return `
			<style>
				:host{
					position: absolute;
                    inset: 0;
                    width: 50%;
                    height: 100%;
                    z-index: 100;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.2s ease;
                    background: #282A2E;
				}
				:host(.opened) {
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
			<div class="create_chat">Создать чат</div>
		`;
	}
	constructor() {
		super();
		this.createChatEl = this.shadowRoot.querySelector('.create_chat');
		this.createChatEl.addEventListener('click', () => {
			this.close();
			this.dispatchEvent(new CustomEvent('create-chat', {
					bubbles: true,
					composed: true
				}));
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