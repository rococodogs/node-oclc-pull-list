# oclc-pull-list

## Example

```javascript
var PullList = require('oclc-pull-list')
  , key = { 'key': 'abc123', 'secret': 'secret'}
  ;

PullList(key, 128156, function(err, items) {
    if (err) return console.warn(err);

    items.forEach(function(item) {
        console.log(item.bibliographicItem.title);
    })
});
```

## License

MIT