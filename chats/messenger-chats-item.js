const valueSymbol = Symbol('value');

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
	}
	
	set value(value) {
		const {
			title
		} = value;
		const titleEl = this.shadowRoot.querySelector('.title');
		titleEl.innerText = title;
		this[valueSymbol] = value;
		console.log(`this.value`, this.value);
	}
	
	get value() {
		return this[valueSymbol];
	}
}