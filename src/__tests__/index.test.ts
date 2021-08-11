import { mapit, unmapit } from '../index'

test('mapit', () => {
  const thing = {
    __typename: 'thing',
    id: 'a',
    data: [
      {
        __typename: 'foo',
        id: 'a',
        propertyA: 123,
        propertyB: 'hello',
        bar: {
          __typename: 'bar',
          id: 'a',
          propertyA: 1,
          propertyB: 2,
          propertyC: 3,
          propertyD: 4,
        },
      },
      {
        __typename: 'foo',
        id: 'b',
        propertyA: 234,
        propertyB: 'world',
        bar: {
          __typename: 'bar',
          id: 'a',
          propertyA: 1,
          propertyB: 2,
          propertyC: 3,
          propertyD: 4,
        },
      },
      {
        __typename: 'foo',
        id: 'c',
        propertyA: 456,
        propertyB: '!',
        bar: {
          __typename: 'bar',
          id: 'a',
          propertyA: 1,
          propertyB: 2,
          propertyC: 3,
          propertyD: 4,
        },
      },
    ],
  }

  const resultA = mapit(thing)
  expect(resultA).toBeDefined()
  const jsonA = JSON.stringify(resultA)

  const resultB = unmapit(resultA)
  expect(resultB).toBeDefined()
  const jsonB = JSON.stringify(resultB)

  expect(resultB).toEqual(thing)
})
