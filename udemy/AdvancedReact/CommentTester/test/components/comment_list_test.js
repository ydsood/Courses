import { renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/comment_list';

describe('comment list', () => {
	let component;

	beforeEach(() => {
		const props = {comments : ['New Comment', 'Other new Commnet']};
		component = renderComponent(CommentList, null, props);
	});

	it('it shows an LI for each commment', () => {
		expect(component.find('li').length).to.equal(2);
	});

	it('shows each comment that is provided', () => {
		
		expect(component).to.contain('New Comment');
		expect(component).to.contain('Other new Commnet');


		//expect(component.find('li')[0]).to.have.text('New Comment');
		//expect(component.find('li')[1]).to.have.text('New Comment');
	});
});