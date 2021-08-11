# graphql-map-deduplicator

`mapit()` will deduplicate graphql responses by generating a map of every entity that has `__typename` and `id` properties. It will pull those out and place them into a new root property `__map__` of the response. Entities without those properties are left in place.

`unmapit()` will remove the `__map__` property and place them back into data object.

Server example:

```javascript
formatResponse: (response, context) => {
  if (context.request.http?.headers.get('gql-map-dedupe') === 'true') {
    response.data = mapit(response.data || {})
    return response
  }
  return null
}
```

Client example:

```javascript
const data = unmapit(data)
```