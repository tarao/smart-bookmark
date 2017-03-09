(function() {
    var message = document.querySelector('#message');
    function error(msg, data) {
        message.appendChild(document.createTextNode(msg));
        message.className += ' error';
        var dl = document.createElement('dl');
        for (var prop in data) {
            var dt = document.createElement('dt');
            var dd = document.createElement('dd');
            dt.appendChild(document.createTextNode(prop));
            var pre = document.createElement('pre');
            var code = document.createElement('code');
            var text = JSON.stringify(data[prop]);
            code.appendChild(document.createTextNode(text));
            pre.appendChild(code);
            dd.appendChild(pre);
            dl.appendChild(dt);
            dl.appendChild(dd);
        }
        message.appendChild(dl);
    }
    function ok(msg) {
        message.appendChild(document.createTextNode(msg));
        message.className += ' ok';
    }

    var options =
        location.search.substring(1).split('&').reduce(function(params, bind) {
            var [name, value] = bind.split('=', 2);
            params[decodeURIComponent(name)] = decodeURIComponent(value);
            return params;
        }, {});
    var name = options.engine;
    var query = options.q || '';
    if (!name) {
        error('No engine specified');
        return;
    }

    var engine = SmartBookmark.query(name, query, options);
    if (!engine) {
        error('No engine found for \'' + name + '\'', {
            parameters: options
        });
        return;
    }

    ok(engine.destination);
    if (!options.debug) engine.go();
})();
