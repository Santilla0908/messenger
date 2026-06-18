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
		this.shadowRoot.innerHTML = '';
		chats.forEach(chat => {
			const item = document.createElement('messenger-chats-item');
			item.name = chat.name;
			this.shadowRoot.append(item);
		});
	}
}