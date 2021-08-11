# graphql map deduplicator

This will generate a map for every entity that has a __typename and id.

For example:

    {
        "__typename": "thing",
        "id": "a",
        "data": [
            {
                "__typename": "foo",
                "id": "a",
                "propertyA": 123,
                "propertyB": "hello",
                "bar": {
                    "__typename": "bar",
                    "id": "a",
                    "propertyA": 1,
                    "propertyB": 2,
                    "propertyC": 3,
                    "propertyD": 4
                }
            },
            {
                "__typename": "foo",
                "id": "b",
                "propertyA": 234,
                "propertyB": "world",
                "bar": {
                    "__typename": "bar",
                    "id": "a",
                    "propertyA": 1,
                    "propertyB": 2,
                    "propertyC": 3,
                    "propertyD": 4
                }
            },
            {
                "__typename": "foo",
                "id": "c",
                "propertyA": 456,
                "propertyB": "!",
                "bar": {
                    "__typename": "bar",
                    "id": "a",
                    "propertyA": 1,
                    "propertyB": 2,
                    "propertyC": 3,
                    "propertyD": 4
                }
            }
        ]
    }    

Will become:

    {
        "__typename": "thing",
        "id": "a",
        "__map__": {
            "bar": {
                "a": {
                    "propertyA": 1,
                    "propertyB": 2,
                    "propertyC": 3,
                    "propertyD": 4
                }
            },
            "foo": {
                "a": {
                    "propertyA": 123,
                    "propertyB": "hello",
                    "bar": {
                        "__typename": "bar",
                        "id": "a"
                    }
                },
                "b": {
                    "propertyA": 234,
                    "propertyB": "world",
                    "bar": {
                        "__typename": "bar",
                        "id": "a"
                    }
                },
                "c": {
                    "propertyA": 456,
                    "propertyB": "!",
                    "bar": {
                        "__typename": "bar",
                        "id": "a"
                    }
                }
            },
            "thing": {
                "a": {
                    "data": [
                        {
                            "__typename": "foo",
                            "id": "a"
                        },
                        {
                            "__typename": "foo",
                            "id": "b"
                        },
                        {
                            "__typename": "foo",
                            "id": "c"
                        }
                    ]
                }
            }
        }
    }