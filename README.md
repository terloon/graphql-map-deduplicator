# graphql-map-deduplicator

`mapit()` will deduplicate graphql responses by generating a map of every entity that has `__typename` and `id` properties. It will pull those out and place them into a new root property `__map__` of the response. Entities without those properties are left in place.

`unmapit()` will remove the `__map__` property and place them back into data object. It has an optional parameter `{inMemory: true}` to unmap the object back in memory. This makes use of getters on the object to define a function that returns the mapped entity itself. This allows for a smaller memory footprint on really large responses.

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
const data = unmapit(mappedResponseData)
```

In memory example:
```javascript
const data = unmapit(mappedResponseData, { inMemory: true })
```

---

<a href="https://www.buymeacoffee.com/terloon" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>