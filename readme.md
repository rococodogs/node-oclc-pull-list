# oclc-pull-list

Module wrapper to access [OCLC's WMS Pull List Resource API](http://www.oclc.org/developer/develop/web-services/wms-circulation-api/pull-list-resource.en.html). 

## `PullList(wskey, branchID)` or
## `var pl = new PullList(wskey, branchID)`

Instantiates a new PullList. `branchID` is a number.

## `pl.itemsPerPage(num)`

Set the number of items per page returned. Defaults to `10`.

## `pl.startIndex(num)`

Set what number to start at. Defaults to `1`.

## `pl.fetch(callback(err, response, items))`

Makes the connection to OCLC and returns the full response from OCLC:

```javascript
{
  "entry": [
    {
      "bibliographicItem": {
         "oclcNumber": "213467876",
         "title": "Brewing battles a history of American beer /",
         "author": "Mittelman, Amy.",
         "materialFormat": "E_BOOK",
         "publisher": "New York :  Algora Pub.,",
         "publicationYear": "2008",
         "language": "eng",
         "edition": null
      },
      "pieceDesignation": "78198319013191310",
      "callNumber": {
         "shelvingScheme": null,
         "shelvingInformation": null,
         "itemParts": null,
         "prefixes": null,
         "suffixes": null,
         "description": "123 131"
      },
      "recordType": "SINGLE_PART",
      "holdingInformation": null,
      "numberOfPieces": 1,
      "physicalDescription": null,
      "cost": null,
      "homeHoldingLocation": "MAIN",
      "permanentShelvingLocation": {
         "element": [
            "MAIN-STACKS"
         ]
      },
      "previousShelvingLocation": null,
      "temporaryShelvingLocation": null,
      "publicNotes": [],
      "staffNotes": [],
      "useRestrictions": [],
      "requestDate": "2013-08-27T09:51:03.000-0400",
      "patronName": "Coombs, Karen",
      "enumeration": "",
      "freeText": null
    },
  ],
  "startIndex": 1,
  "totalResults": 1,
  "itemsPerPage": 10,
  "id": "urn:oclc:circulation/pulllist/128807/128156",
  "title": "Pull List",
  "links": [],
  "updated": {
    "offset": {
      "id": "Z",
      "amountSeconds": 0,
      "secondsField": 0,
      "hoursField": 0,
      "minutesField": 0
    },
    "year": 2015,
    "dayOfMonth": 14,
    "dayOfWeek": "THURSDAY",
    "dayOfYear": 134,
    "nanoOfSecond": 778000000,
    "chronology": {
      "name": "ISO"
    },
    "hourOfDay": 1,
    "minuteOfHour": 54,
    "secondOfMinute": 29,
    "monthOfYear": "MAY"
  },
  "errors": {}
}

```

**NOTE:** the actual schema differs from the [one linked in the documentation](http://www.oclc.org/content/dam/developer-network/web-services/wms-circulation-api/pull-list-atom.json).

The third field of the callback, `items`, is the array of items in case you didn't want to remember `"entry"` as the field name.

If a failure, `err` is an object:

```javascript
{
  "code": {
      "value": number, // HTTP status code
      "type": null
  },
  "message": string, // Short status message
  "detail": string // Longer status message
}
```

## Example

```javascript
var PullList = require('oclc-pull-list')
  , wskey = { 'key': 'abc123', 'secret': 'secret'}
  , branchID = 128156
  ;

PullList(wskey, branchID)
  .startIndex(1)   // defaults to 1
  .itemsPerPage(5) // defaults to 10
  .fetch(function(err, response, items) {
    if (err) return console.warn(err);

    items.forEach(function(item) {
        console.log(item.bibliographicItem.title);
    })
  });
```

## License

MIT