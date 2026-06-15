export default class MessengerChatsBody extends Base {
	get css() {
		return `
			<style>
				:host {
					height: 100%;
				}
				.chat_name {
					display: flex;
					padding: 0 10px;
					height: 50px;
					align-items: center;
					cursor: pointer;
					transition: background 0.15s linear;
				}
				.chat_name:hover {
					background: #282A2E;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			<div class="chat_list"></div>
		`;
	}
	
	constructor() {
		super();
		this.chatListEl = this.shadowRoot.querySelector('.chat_list');
	}
	
	renderChats(chats) {
		this.chatListEl.innerHTML = '';
		chats.forEach(chat => {
			const div = document.createElement('div');
			div.classList.add('chat_name');
			div.innerText = chat.name;
			this.chatListEl.append(div);
		});
	}
}