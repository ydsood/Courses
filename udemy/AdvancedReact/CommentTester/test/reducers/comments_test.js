//test all actions that the reducer cares about
//test that the structure of the state array does not change
//test the action type that the reducer cares about

import { expect } from '../test_helper';
import commentReducer from '../../src/reducers/comments';
import { SAVE_COMMENT } from  '../../src/actions/types';

describe('Comments Reducer', () => {

	it('handles actions with unknown type', () => {
		//expect(commentReducer()).to.be.instanceof(Array);
		//eql does a deep compare
		expect(commentReducer(undefined, {})).to.eql([]);
	});

	it('handles action of type SAVE_COMMENT', () => {
		const action = {type : SAVE_COMMENT, payload : 'new comment'};
		expect (commentReducer([], action)).to.eql(['new comment']);
	});

});