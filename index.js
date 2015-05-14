var WSKey = require('oclc-wskey')
  , request = require('request')
  ;

module.exports = function PullList(wskey, branch, callback) {
    if ( arguments.length < 4 ) {
        
    }

    // wskey can be a WSKey instance or an object with `key` and `secret` fields
    if ( !(wskey instanceof WSKey) ) {
        if ( (!wskey.key || !wskey.wskey) || !wskey.secret ) {
            throw Error('WSKey field must be WSKey or object with `key` and `secret` fields ');
        } else {
            wskey = new WSKey(wskey.key, wskey.secret);
        }
    }

    var url = 'https://circ.sd00.worldcat.org/pulllist/' + branch
      , head = {
            'Authorization': wskey.HMACSignature('GET', url),
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