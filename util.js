if (typeof SmartBookmark === 'undefined') var SmartBookmark = {};

(function() {
    SmartBookmark.jump = function(url) {
        var refresh = [
            '<html><head><meta http-equiv="refresh" content="0;url=',
            url,
            '" /></head></html>',
        ].join('');
        setTimeout(function() {
            document.location.href = [
                'data:text/html;charset=utf-8,',
                encodeURIComponent(refresh),
            ].join('');
        }, 0);
    };

    SmartBookmark.parseQuery = (function() {
        var unescape = function(s) {
            return s.replace(/\\"/,'"').replace(/\\'/,"'").replace(/\\\\/,"\\");
        };
        var isQuoted = /(?:^".*"$|^'.*'$)/;
        var r = new RegExp('((?:^"|(?=[^\\\\])")[^"]*?(?:(?=[^\\\\])"|"$)|' +
                           "(?:^'|(?=[^\\\\])')[^']*?(?:(?=[^\\\\])'|'$))");

        return function(query) {
            return query.split(r).map(function(x) {
                return isQuoted.test(x) ? [x] : x.split(/\s+/);
            }).reduce(function(v, x) {
                return v.concat(x);
            }, []).map(function(s) {
                return isQuoted.test(s) ? s : unescape(s);
            }).filter(function(x) { return x.length > 0; });
        };
    })();
    var override = function(obj, by) {
        by = by||{};
        for (prop in by) {
            if (obj[prop] === null
                || typeof by[prop] != 'object'
                || typeof obj[prop] != 'object') {
                obj[prop] = by[prop];
            } else {
                override(obj[prop], by[prop]);
            }
        }
        return obj;
    };
    SmartBookmark.override = override;
})();
