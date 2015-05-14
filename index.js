module.exports = PullList;

var WSKey = require('oclc-wskey')
  , request = require('request')
  ;

function PullList(wskey, branch) {
    if ( !(this instanceof PullList) ) return new PullList(wskey, branch);

    if ( !(wskey instanceof WSKey) ) {
        if ( (!wskey.key || !wskey.wskey) || !wskey.secret ) {
            throw Error('WSKey field must be either a WSKey or object with `key` and `secret` fields ');
        } else {
            this.wskey = new WSKey(wskey.key, wskey.secret);
        }
    } else {
        this.wskey = wskey;
    }

    this.branch = branch;
    
    // oclc defaults
    this._startIndex = 1;
    this._itemsPerPage = 10;

    return this;
}

PullList.prototype.fetch = function(callback) {
    var url = 'https://circ.sd00.worldcat.org/pulllist/' 
            + this.branch
            + '?startIndex=' + this._startIndex
            + '&itemsPerPage=' + this._itemsPerPage
      , head = {
            'Authorization': this.wskey.HMACSignature('GET', url),
            'Accept': 'application/json'
        }
      ;

    request.get(url, { headers: head }, function(err, resp, body) {
        if ( resp.statusCode === 500 ) {
            callback && callback(body, null);
        } else if (resp.statusCode === 401 ) {
            callback && callback(
                {
                    'code': {
                        'value': 401, 
                        'type': null 
                    },
                    'message': 'Requires WsKey Authentication',
                    'detail': 'This request requires HTTP authentication (Requires WsKey Authentication)'
                },
                null
            );
        } else if ( resp.statusCode === 200 ) {
            callback && callback(null, JSON.parse(body).entry);
        } else {
            callback && callback(null, JSON.parse(body));
        }
    });
}

PullList.prototype.itemsPerPage = function(itm) {
    if ( !itm && typeof itm !== 'number') return this._itemsPerPage;

    this._itemsPerPage = +itm;

    return this;
}

PullList.prototype.startIndex = function(idx) {
    if ( !idx && typeof idx !== 'number' ) return this._startIndex;

    this._startIndex = +idx;

    return this;
}
