# graphql-map-deduplicator

This will generate a map for every entity that has a __typename and id and place them under a property named `__map__`. Entities without those properties are left in place.

Example usage on an Apollo server would be:

```javascript
formatResponse: (response, context) => {
  if (context.request.http?.headers.get('gql-deduplication') === 'true') {
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