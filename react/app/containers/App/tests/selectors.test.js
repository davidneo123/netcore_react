import { makeSelectLocation } from 'containers/Students/selectors';

describe('makeSelectLocation', () => {
  it('should select the location', () => {
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      router,
    };
    expect(makeSelectLocation()(mockedState)).toEqual(router.location);
  });
});
