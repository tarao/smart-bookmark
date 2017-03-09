(function() {
    var Engine = SmartBookmark.Engine;

    var Vhost = function(definition) {
        Engine.call(this);
        this.definition = definition || {};
    };
    Object.setPrototypeOf(Vhost.prototype, Engine.prototype);
    Object.defineProperty(Vhost.prototype, 'destination', {
        get: function() {
            var domain = this.definition.domain || this.options.domain;
            if (domain !== this.options.domain) return;

            var def = SmartBookmark.override(this.definition, this.options);
            var arr = this.argv.reduce(function(p, c, i) {
                var [ path, alias, defau ] = p;
                c = c || defau[i];
                c = (alias[i]||{})[c] || (alias._||{})[c] || c || '';
                c = (c != '/') && c;
                path.push(c);
                alias = SmartBookmark.override(alias, alias[c]||{});
                defau = SmartBookmark.override(defau, defau[c]||{});
                return [ path, alias, defau ];
            }, [ [], def.alias||{}, def.default||{} ])[0];

            var sub = arr.shift();
            var domain = [
                sub,
                domain
            ].filter(function(x) { return !!x; }).join('.');
            var path = arr.filter(function(x) { return !!x; });
            if (!path.length) path.push('');

            return [
                (def.scheme || 'http') + ':/',
                domain,
            ].concat(path).join('/');
        }
    });
    SmartBookmark.Engine.Vhost = Vhost;
})();
