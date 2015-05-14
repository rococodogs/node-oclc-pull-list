# oclc-pull-list

## Example

```javascript
var PullList = require('oclc-pull-list')
  , key = { 'key': 'abc123', 'secret': 'secret'}
  ;

PullList(key, 128156)
  .startIndex(1)   // defaults to 1
  .itemsPerPage(5) // defaults to 10
  .fetch(function(err, items) {
    if (err) return console.warn(err);

    items.forEach(function(item) {
        console.log(item.bibliographicItem.title);
    })
  });
```

## License

MIT