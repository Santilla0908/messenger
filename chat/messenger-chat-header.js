const activeChatSymbol = Symbol('activeChat');
export default class MessengerChatHeader extends Base {
	get css() {
		return `
			<style>
				.title {
					height: 50px;
					border-bottom: 1px solid #202225;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			<div class="title">Название чата</div>
		`;
	}
	constructor() {
		super();
		this.titleEl = this.shadowRoot.querySelector('.title');
	}
	
	set activeChat(selectedChat) {
		console.log('4. MessengerChatHeader -> set activeChat');
		console.log(selectedChat);
		this[activeChatSymbol] = selectedChat;
		this.titleEl.innerText = selectedChat.title;
	}
	get activeChat() {
		return this[activeChatSymbol];
	}
}