export default class MessengerChatsItems extends Base {
	get css() {
		return `
			<style>
				:host {
					height: 100%;
				}
				:host(.disabled) {
					pointer-events: none;
				}
			</style>
		`;
	}
	
	get html() {
		return `
		
		`;
	}
	
	constructor() {
		super();
	}
	
	renderChats(chats) {
		this.innerHTML = '';
		chats.forEach(chat => {
			const item = document.createElement('messenger-chats-item');
			const chatName = document.createElement('p');
			chatName.classList.add('chat_name');
			chatName.innerText = chat.name;
			item.shadowRoot.append(chatName);
			this.shadowRoot.append(item);
		});
	}
}