const chatSymbol = Symbol('value');

export default class MessengerChatsItem extends Base {
	get css() {
		return `
			<style>
				:host {
					display: flex;
                    padding: 0 10px;
                    height: 50px;
                    align-items: center;
                    cursor: pointer;
                    transition: background 0.15s linear;
				}
				:host(:hover) {
                    background: #282A2E;
                }
                :host(.active) {
					background: #3A3D42;
				}
			</style>
		`;
	}
	
	get html() {
		return `
			<div class="title"></div>
		`;
	}
	
	constructor() {
		super();
		this.titleEl = this.shadowRoot.querySelector('.title');
		
		this.addEventListener('click', () => {
			this.emit('chat-select', {
				chat: this.value
			});
		});
		
		
	}
	
	set value(value) {
		const {
			title
		} = value;
		this.titleEl.innerText  = title;
		this[chatSymbol] = value;
		console.log(this.value);
	}
	
	get value() {
		return this[chatSymbol];
	}
}