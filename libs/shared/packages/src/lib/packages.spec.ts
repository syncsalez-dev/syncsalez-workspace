import { packages } from './packages'

describe('nest', () => {
	it('should work', () => {
		expect(packages()).toEqual('packages')
	})
})
