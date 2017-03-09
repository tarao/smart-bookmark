if (typeof SmartBookmark === 'undefined') var SmartBookmark = {};

(function() {
    var engines = [];
    SmartBookmark.addEngine = function(name, engine) {
        engines.push({ name: name, engine: engine });
    };
    SmartBookmark.query = function(name, query, options) {
        for (var e of engines) {
            if (e.name !== name) continue;
            var r = e.engine.accept(query, options);
            if (r) return r;
        }
    };

    var Jumper = function(destination) {
        this.destination = destination;
    };
    Jumper.prototype.go = function() {
        SmartBookmark.jump(this.destination);
    };

    var Engine = function() {
        this.destination = null;
    };
    Engine.prototype.accept = function(query, options) {
        this.argv = SmartBookmark.parseQuery(query);
        this.options = options || {};
        if (this.destination) return new Jumper(this.destination);
        return null;
    };
    SmartBookmark.Engine = Engine;
})();
