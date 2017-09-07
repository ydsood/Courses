import {renderComponent, expect} from '../test_helper';
import App from '../../src/components/app';


//use `describe` to group together similar tests.

describe('App', () => {

	/*
	//use `it` to test a single attribute of a target
	//the string is only used to reprent contents in the test report
	it('shows the correct text', ()=> {

		//create an instance of App
		//renderComponent
		const component = renderComponent(App);

		//use 'expect' tp make an 'assertion' about a target
		expect(component).to.contain('React simple starter');

	});
	*/
	let component;
	beforeEach(()=>{
		component = renderComponent(App);
	});

	it('shows a comment box', ()=> {
		expect(component.find('.comment-box')).to.exist;
	})

	it('shows a comment list', () => {
		expect(component.find('.comment-list')).to.exist;
	});


});

