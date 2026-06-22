class Base extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open' });

		this.shadowRoot.innerHTML = `
			<style>
    			*,
    			*::before,
				*::after {
				   box-sizing: border-box;
				}
			
				:host,
				:host::before,
				:host::after {
				   display: block;
				}
			
				.hidden,
				:host([hidden]),
				:host(.hidden) {
				   display: none !important;
				}
			</style>
		`;
		
		this.shadowRoot.innerHTML += this.css + this.html;
	}
	
	emit(eventTitle, data = {}) {
		this.dispatchEvent(new CustomEvent(eventTitle, {
			bubbles: true,
			composed: true,
			detail: data
		}));
	}
}