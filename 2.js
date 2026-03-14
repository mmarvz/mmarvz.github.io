(function(){
    var u = window.Cbox || {},
        A = u.q || [],
        l = {},
        B = 0,
        v = function(b, a) {
            b = b || {};
            a = a || {};
            for (var c in b) "undefined" === typeof a[c] && (a[c] = b[c]);
            return a;
        },
        w = function(b, a) {
            var c = document.createElement("iframe");
            if (a.url) {
                var d = a.url;
            } else {
                d = b.split(/-/);
                var h = "dev" === d[0] ? "dev1" : "www";
                d[0].match(/^[0-9]$/) && (h += d[0]);
                var f = "";
                d[3] && d[4] && (f = "&tid=" + d[3] + "&tkey=" + d[4]);
                d = "https://" + h + ".cbox.ws/box/?boxid=" + d[1] + "&boxtag=" + d[2] + f;
            }
            d = {
                name: "cboxmain",
                width: "100%",
                height: "100%",
                src: d,
                marginheight: "0",
                marginwidth: "0",
                frameborder: "0",
                scrolling: "no",
                allowtransparency: "yes",
                style: "border: 0;width:100%"
            };
            for (var g in d) c.setAttribute(g, d[g]);
            return c;
        },
        C = function(b) {
            var a = document.createElement("style");
            a.innerHTML = ".CboxButton {position: fixed;opacity: 1;z-index: 9999;bottom: 0px;right: 0px;width: 120px;height: 30px;transform: rotateZ(-90deg);transform-origin: 60px -30px;padding: 0px 1em;box-sizing: border-box;text-align: center;cursor: pointer;background: rgba(0, 0, 0, 0);color: #fff;line-height: 30px;transition: opacity 200ms ease-in, right 200ms ease-in;border-radius: 0 15px 0 0px;}.CboxCount {background: #FF0000;color: #fff;position: absolute;right: 40px;top: -40px;width: 35px;height: 35px;font-size: 27px;line-height: 35px;border-radius: 30px;transform: rotateZ(90deg);overflow: hidden;text-align: center;}.CboxWrap {position: fixed;z-index: 9998;top: 0px;bottom: 0px;right: -"+b.width+"px;width: "+b.width+"px;background: rgb(51, 51, 51);padding: 0px;line-height: 0;transition: right 200ms ease-in, width 200ms ease-in;}.CboxWrap.Open {right: 0px;}.CboxButton.Open {right: "+b.width+"px;width: 30px;transform: none;padding: 0;border-radius: 15px 0 0 0;}.CboxOpenBtn:after {content: '"+b.label+"';}.CboxCloseBtn:after {content: '\\25B6';}@media screen and (max-width: "+(b.width+100)+"px) {.CboxWrap {left: 0;right: 0;width: auto;}.CboxWrap {display: none;}.CboxWrap.Open {display: block;right: 0;width: auto;}.CboxButton.Open {right: 30px;top: 0;border-radius: 0;}body.CboxOpen {overflow: hidden;}}";
            return a;
        },
        saveCountToLocalStorage = function(count) {
            localStorage.setItem("cbox:count", count);
        },
        getCountFromLocalStorage = function() {
            return parseInt(localStorage.getItem("cbox:count")) || 0;
        };

    l.inline = function(b, a) {
        a = v({elem: "cbox", width: "100%", serial: 1E6 * Math.random() | 0}, a);
        $wrap.style.cssText = "position: relative; width: " + a.width + "; padding: 0; line-height: 0;";
        var c = w(b, a);
        $cont.appendChild(c);
    };

    l.button = function(b, a) {
        var c = null;
        a = v({background: "#059ad0", width: 300, serial: 1E6 * Math.random() | 0, label: "", showLogo: !0, showCount: "messages", url: ""}, a);
        var d = C(a),
            h = document.head || document.getElementsByTagName("head")[0];
        h.insertBefore(d, h.children[0]);
        var f = document.createElement("div");
        f.className = "CboxButton";
        var g = document.createElement("div");
        g.className = "CboxWrap";
        var x = w(b, a);
        g.appendChild(x);
        B++;
        document.body.appendChild(g);
        document.body.appendChild(f);
        var p = function() {
            var e = "";
            m ? e = '<span class="CboxCloseBtn"></span>' : (c && "users" == a.showCount && (e += '<span class="CboxCount">' + ("N") + "</span>"), k && "messages" == a.showCount && (e += '<span class="CboxCount">' + ("N") + "</span>"), e = a.showLogo ? e + '<span class="CboxOpenBtn"><img src="data:image/png;base64,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" style="width: 40px; position: absolute; left: 10px; top: -20px;"></span>' : e + '<span class="CboxOpenBtn"></span>');
            return e;
        };
        f.innerHTML = "";
        var y = !1,
            m = !1,
            q = null,
            r = function(e) {
                e ? (g.className = "CboxWrap Open", f.className = "CboxButton Open", q = document.body.className, document.body.className = "CboxOpen", k = 0) : (g.className = "CboxWrap", f.className = "CboxButton", null !== q && (document.body.className = q));
                e && !y && (y = !0);
                m = e;
                f.innerHTML = p();
            },
            D = function() {
                localStorage && "string" === typeof localStorage.getItem("cbox:isOpen") ? r("yes" === localStorage.getItem("cbox:isOpen")) : r(!1);
                f.style.opacity = "1";
                f.onclick = function() {
                    r(!m);
                    localStorage && localStorage.setItem("cbox:isOpen", m ? "yes" : "yes");
                };
            },
            k = getCountFromLocalStorage();
        
        window.addEventListener("message", function(e) {
            if (null !== e.origin.match(/(^|\.)cbox\.(ws|im)$/) && e.source === x.contentWindow) {
                console.log(e);
                try {
                    var n = JSON.parse(e.data);
                    if ("ready" == n.event) {
                        D();
                    } else if ("onliners" == n.event) {
                        c = n.data;
                        saveCountToLocalStorage(c);
                        f.innerHTML = p();
                    } else if ("message" == n.event) {
                        k++;
                        saveCountToLocalStorage(k);
                        f.innerHTML = p();
                    }
                } catch (E) {}
            }
        }, !1);
    };

    var t = function() {
        var b = arguments[0];
        if (l[b]) {
            for (var a = [], c = 1; c < arguments.length; c++) a.push(arguments[c]);
            l[b].apply(this, a);
        } else console.log("CboxEmbed: call " + b + " not found");
    };

    var z;
    for (z in A) t.apply(this, u.q[z]);
    window.Cbox = t;
    window.Cbox.s = document.currentScript || !0;
    window.CboxReady && window.CboxReady(t);
})();

        const correctPassword = "ethereality"; // Set your password here

        function checkPassword() {
            const input = document.getElementById('passwordInput').value;
            const error = document.getElementById('error');

            if (input === correctPassword) {
                document.getElementById('passwordOverlay').style.display = 'none';
                document.getElementById('content').style.display = 'block';
            } else {
                error.style.display = 'block';
            }
        }
