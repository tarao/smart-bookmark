SmartBookmark.Engine.Vhost.Hatena = new SmartBookmark.Engine.Vhost({
    domain: 'hatena.ne.jp',
    default: {
        0: 'www',
    },
    alias: {
        1: {
            tag: 't',
        },
        b: {
            1: {
                hot: 'hotentry',
                list: 'entrylist',
                get new(){ return this.list; },
                e: 'entry',
            },
            2: {
                fav: 'favorite',
            },
            hotentry: {
                2: {
                    soc: 'social',
                    eco: 'economics',
                    get politics(){ return this.eco; },
                    get pol(){ return this.eco; },
                    ent: 'entertainment',
                    get sports(){ return this.ent; },
                    get star(){ return this.ent; },
                    science: 'knowledge',
                    get sci(){ return this.science; },
                    get academic(){ return this.science; },
                    get ac(){ return this.science; },
                    web: 'it',
                    anime: 'game',
                    neta: 'fun',
                },
            },
            get entrylist(){ return this.hotentry; },
        },
        d: {
            2: {
                profile: 'about',
            },
        },
        f: {
            2: {
                fav: 'follow',
            },
        },
    },
});
