var t = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}
  , n = function(e) {
    try {
        return !!e()
    } catch (e) {
        return !0
    }
}
  , i = !n((function() {
    var e = function() {}
    .bind();
    return "function" != typeof e || e.hasOwnProperty("prototype")
}
))
  , r = i
  , o = Function.prototype
  , s = o.call
  , a = r && o.bind.bind(s, s)
  , c = r ? a : function(e) {
    return function() {
        return s.apply(e, arguments)
    }
}
  , u = c
  , l = u({}.toString)
  , h = u("".slice)
  , d = function(e) {
    return h(l(e), 8, -1)
}
  , f = n
  , p = d
  , v = Object
  , m = c("".split)
  , y = f((function() {
    return !v("z").propertyIsEnumerable(0)
}
)) ? function(e) {
    return "String" == p(e) ? m(e, "") : v(e)
}
: v
  , g = function(e) {
    return null == e
}
  , b = g
  , w = TypeError
  , S = function(e) {
    if (b(e))
        throw w("Can't call method on " + e);
    return e
}
  , A = y
  , R = S
  , I = function(e) {
    return A(R(e))
}
  , k = function(e) {
    return e && e.Math == Math && e
}
  , E = k("object" == typeof globalThis && globalThis) || k("object" == typeof window && window) || k("object" == typeof self && self) || k("object" == typeof t && t) || function() {
    return this
}() || Function("return this")()
  , C = {
    exports: {}
}
  , T = E
  , O = Object.defineProperty
  , x = function(e, t) {
    try {
        O(T, e, {
            value: t,
            configurable: !0,
            writable: !0
        })
    } catch (n) {
        T[e] = t
    }
    return t
}
  , z = x
  , F = "__core-js_shared__"
  , L = E[F] || z(F, {})
  , D = L;
(C.exports = function(e, t) {
    return D[e] || (D[e] = void 0 !== t ? t : {})
}
)("versions", []).push({
    version: "3.29.1",
    mode: "global",
    copyright: "© 2014-2023 Denis Pushkarev (zloirock.ru)",
    license: "https://github.com/zloirock/core-js/blob/v3.29.1/LICENSE",
    source: "https://github.com/zloirock/core-js"
});
var U, j, M = S, P = Object, B = function(e) {
    return P(M(e))
}, H = B, N = c({}.hasOwnProperty), Q = Object.hasOwn || function(e, t) {
    return N(H(e), t)
}
, W = c, V = 0, K = Math.random(), X = W(1..toString), G = function(e) {
    return "Symbol(" + (void 0 === e ? "" : e) + ")_" + X(++V + K, 36)
}, q = "undefined" != typeof navigator && String(navigator.userAgent) || "", Y = E, Z = q, J = Y.process, _ = Y.Deno, $ = J && J.versions || _ && _.version, ee = $ && $.v8;
ee && (j = (U = ee.split("."))[0] > 0 && U[0] < 4 ? 1 : +(U[0] + U[1])),
!j && Z && (!(U = Z.match(/Edge\/(\d+)/)) || U[1] >= 74) && (U = Z.match(/Chrome\/(\d+)/)) && (j = +U[1]);
var te = j
  , ne = te
  , ie = n
  , re = !!Object.getOwnPropertySymbols && !ie((function() {
    var e = Symbol();
    return !String(e) || !(Object(e)instanceof Symbol) || !Symbol.sham && ne && ne < 41
}
))
  , oe = re && !Symbol.sham && "symbol" == typeof Symbol.iterator
  , se = E
  , ae = C.exports
  , ce = Q
  , ue = G
  , le = re
  , he = oe
  , de = se.Symbol
  , fe = ae("wks")
  , pe = he ? de.for || de : de && de.withoutSetter || ue
  , ve = function(e) {
    return ce(fe, e) || (fe[e] = le && ce(de, e) ? de[e] : pe("Symbol." + e)),
    fe[e]
}
  , me = "object" == typeof document && document.all
  , ye = {
    all: me,
    IS_HTMLDDA: void 0 === me && void 0 !== me
}
  , ge = ye.all
  , be = ye.IS_HTMLDDA ? function(e) {
    return "function" == typeof e || e === ge
}
: function(e) {
    return "function" == typeof e
}
  , we = be
  , Se = ye.all
  , Ae = ye.IS_HTMLDDA ? function(e) {
    return "object" == typeof e ? null !== e : we(e) || e === Se
}
: function(e) {
    return "object" == typeof e ? null !== e : we(e)
}
  , Re = Ae
  , Ie = String
  , ke = TypeError
  , Ee = function(e) {
    if (Re(e))
        return e;
    throw ke(Ie(e) + " is not an object")
}
  , Ce = {}
  , Te = !n((function() {
    return 7 != Object.defineProperty({}, 1, {
        get: function() {
            return 7
        }
    })[1]
}
))
  , Oe = Te && n((function() {
    return 42 != Object.defineProperty((function() {}
    ), "prototype", {
        value: 42,
        writable: !1
    }).prototype
}
))
  , xe = {}
  , ze = Ae
  , Fe = E.document
  , Le = ze(Fe) && ze(Fe.createElement)
  , De = function(e) {
    return Le ? Fe.createElement(e) : {}
}
  , Ue = De
  , je = !Te && !n((function() {
    return 7 != Object.defineProperty(Ue("div"), "a", {
        get: function() {
            return 7
        }
    }).a
}
))
  , Me = i
  , Pe = Function.prototype.call
  , Be = Me ? Pe.bind(Pe) : function() {
    return Pe.apply(Pe, arguments)
}
  , He = E
  , Ne = be
  , Qe = function(e) {
    return Ne(e) ? e : void 0
}
  , We = function(e, t) {
    return arguments.length < 2 ? Qe(He[e]) : He[e] && He[e][t]
}
  , Ve = c({}.isPrototypeOf)
  , Ke = We
  , Xe = be
  , Ge = Ve
  , qe = Object
  , Ye = oe ? function(e) {
    return "symbol" == typeof e
}
: function(e) {
    var t = Ke("Symbol");
    return Xe(t) && Ge(t.prototype, qe(e))
}
  , Ze = String
  , Je = function(e) {
    try {
        return Ze(e)
    } catch (e) {
        return "Object"
    }
}
  , _e = be
  , $e = Je
  , et = TypeError
  , tt = function(e) {
    if (_e(e))
        return e;
    throw et($e(e) + " is not a function")
}
  , nt = tt
  , it = g
  , rt = function(e, t) {
    var n = e[t];
    return it(n) ? void 0 : nt(n)
}
  , ot = Be
  , st = be
  , at = Ae
  , ct = TypeError
  , ut = Be
  , lt = Ae
  , ht = Ye
  , dt = rt
  , ft = function(e, t) {
    var n, i;
    if ("string" === t && st(n = e.toString) && !at(i = ot(n, e)))
        return i;
    if (st(n = e.valueOf) && !at(i = ot(n, e)))
        return i;
    if ("string" !== t && st(n = e.toString) && !at(i = ot(n, e)))
        return i;
    throw ct("Can't convert object to primitive value")
}
  , pt = TypeError
  , vt = ve("toPrimitive")
  , mt = function(e, t) {
    if (!lt(e) || ht(e))
        return e;
    var n, i = dt(e, vt);
    if (i) {
        if (void 0 === t && (t = "default"),
        n = ut(i, e, t),
        !lt(n) || ht(n))
            return n;
        throw pt("Can't convert object to primitive value")
    }
    return void 0 === t && (t = "number"),
    ft(e, t)
}
  , yt = mt
  , gt = Ye
  , bt = function(e) {
    var t = yt(e, "string");
    return gt(t) ? t : t + ""
}
  , wt = Te
  , St = je
  , At = Oe
  , Rt = Ee
  , It = bt
  , kt = TypeError
  , Et = Object.defineProperty
  , Ct = Object.getOwnPropertyDescriptor
  , Tt = "enumerable"
  , Ot = "configurable"
  , xt = "writable";
xe.f = wt ? At ? function(e, t, n) {
    if (Rt(e),
    t = It(t),
    Rt(n),
    "function" == typeof e && "prototype" === t && "value"in n && xt in n && !n[xt]) {
        var i = Ct(e, t);
        i && i[xt] && (e[t] = n.value,
        n = {
            configurable: Ot in n ? n[Ot] : i[Ot],
            enumerable: Tt in n ? n[Tt] : i[Tt],
            writable: !1
        })
    }
    return Et(e, t, n)
}
: Et : function(e, t, n) {
    if (Rt(e),
    t = It(t),
    Rt(n),
    St)
        try {
            return Et(e, t, n)
        } catch (e) {}
    if ("get"in n || "set"in n)
        throw kt("Accessors not supported");
    return "value"in n && (e[t] = n.value),
    e
}
;
var zt = Math.ceil
  , Ft = Math.floor
  , Lt = Math.trunc || function(e) {
    var t = +e;
    return (t > 0 ? Ft : zt)(t)
}
  , Dt = function(e) {
    var t = +e;
    return t != t || 0 === t ? 0 : Lt(t)
}
  , Ut = Dt
  , jt = Math.max
  , Mt = Math.min
  , Pt = function(e, t) {
    var n = Ut(e);
    return n < 0 ? jt(n + t, 0) : Mt(n, t)
}
  , Bt = Dt
  , Ht = Math.min
  , Nt = function(e) {
    return e > 0 ? Ht(Bt(e), 9007199254740991) : 0
}
  , Qt = Nt
  , Wt = function(e) {
    return Qt(e.length)
}
  , Vt = I
  , Kt = Pt
  , Xt = Wt
  , Gt = function(e) {
    return function(t, n, i) {
        var r, o = Vt(t), s = Xt(o), a = Kt(i, s);
        if (e && n != n) {
            for (; s > a; )
                if ((r = o[a++]) != r)
                    return !0
        } else
            for (; s > a; a++)
                if ((e || a in o) && o[a] === n)
                    return e || a || 0;
        return !e && -1
    }
}
  , qt = {
    includes: Gt(!0),
    indexOf: Gt(!1)
}
  , Yt = {}
  , Zt = Q
  , Jt = I
  , _t = qt.indexOf
  , $t = Yt
  , en = c([].push)
  , tn = function(e, t) {
    var n, i = Jt(e), r = 0, o = [];
    for (n in i)
        !Zt($t, n) && Zt(i, n) && en(o, n);
    for (; t.length > r; )
        Zt(i, n = t[r++]) && (~_t(o, n) || en(o, n));
    return o
}
  , nn = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
  , rn = tn
  , on = nn
  , sn = Object.keys || function(e) {
    return rn(e, on)
}
  , an = Te
  , cn = Oe
  , un = xe
  , ln = Ee
  , hn = I
  , dn = sn;
Ce.f = an && !cn ? Object.defineProperties : function(e, t) {
    ln(e);
    for (var n, i = hn(t), r = dn(t), o = r.length, s = 0; o > s; )
        un.f(e, n = r[s++], i[n]);
    return e
}
;
var fn, pn = We("document", "documentElement"), vn = C.exports, mn = G, yn = vn("keys"), gn = function(e) {
    return yn[e] || (yn[e] = mn(e))
}, bn = Ee, wn = Ce, Sn = nn, An = Yt, Rn = pn, In = De, kn = "prototype", En = "script", Cn = gn("IE_PROTO"), Tn = function() {}, On = function(e) {
    return "<" + En + ">" + e + "</" + En + ">"
}, xn = function(e) {
    e.write(On("")),
    e.close();
    var t = e.parentWindow.Object;
    return e = null,
    t
}, zn = function() {
    try {
        fn = new ActiveXObject("htmlfile")
    } catch (e) {}
    var e, t, n;
    zn = "undefined" != typeof document ? document.domain && fn ? xn(fn) : (t = In("iframe"),
    n = "java" + En + ":",
    t.style.display = "none",
    Rn.appendChild(t),
    t.src = String(n),
    (e = t.contentWindow.document).open(),
    e.write(On("document.F=Object")),
    e.close(),
    e.F) : xn(fn);
    for (var i = Sn.length; i--; )
        delete zn[kn][Sn[i]];
    return zn()
};
An[Cn] = !0;
var Fn = Object.create || function(e, t) {
    var n;
    return null !== e ? (Tn[kn] = bn(e),
    n = new Tn,
    Tn[kn] = null,
    n[Cn] = e) : n = zn(),
    void 0 === t ? n : wn.f(n, t)
}
  , Ln = ve
  , Dn = Fn
  , Un = xe.f
  , jn = Ln("unscopables")
  , Mn = Array.prototype;
null == Mn[jn] && Un(Mn, jn, {
    configurable: !0,
    value: Dn(null)
});
var Pn, Bn, Hn, Nn = function(e) {
    Mn[jn][e] = !0
}, Qn = {}, Wn = be, Vn = E.WeakMap, Kn = Wn(Vn) && /native code/.test(String(Vn)), Xn = function(e, t) {
    return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t
    }
}, Gn = xe, qn = Xn, Yn = Te ? function(e, t, n) {
    return Gn.f(e, t, qn(1, n))
}
: function(e, t, n) {
    return e[t] = n,
    e
}
, Zn = Kn, Jn = E, _n = Ae, $n = Yn, ei = Q, ti = L, ni = gn, ii = Yt, ri = "Object already initialized", oi = Jn.TypeError, si = Jn.WeakMap;
if (Zn || ti.state) {
    var ai = ti.state || (ti.state = new si);
    ai.get = ai.get,
    ai.has = ai.has,
    ai.set = ai.set,
    Pn = function(e, t) {
        if (ai.has(e))
            throw oi(ri);
        return t.facade = e,
        ai.set(e, t),
        t
    }
    ,
    Bn = function(e) {
        return ai.get(e) || {}
    }
    ,
    Hn = function(e) {
        return ai.has(e)
    }
} else {
    var ci = ni("state");
    ii[ci] = !0,
    Pn = function(e, t) {
        if (ei(e, ci))
            throw oi(ri);
        return t.facade = e,
        $n(e, ci, t),
        t
    }
    ,
    Bn = function(e) {
        return ei(e, ci) ? e[ci] : {}
    }
    ,
    Hn = function(e) {
        return ei(e, ci)
    }
}
var ui = {
    set: Pn,
    get: Bn,
    has: Hn,
    enforce: function(e) {
        return Hn(e) ? Bn(e) : Pn(e, {})
    },
    getterFor: function(e) {
        return function(t) {
            var n;
            if (!_n(t) || (n = Bn(t)).type !== e)
                throw oi("Incompatible receiver, " + e + " required");
            return n
        }
    }
}
  , li = {}
  , hi = {}
  , di = {}.propertyIsEnumerable
  , fi = Object.getOwnPropertyDescriptor
  , pi = fi && !di.call({
    1: 2
}, 1);
hi.f = pi ? function(e) {
    var t = fi(this, e);
    return !!t && t.enumerable
}
: di;
var vi = Te
  , mi = Be
  , yi = hi
  , gi = Xn
  , bi = I
  , wi = bt
  , Si = Q
  , Ai = je
  , Ri = Object.getOwnPropertyDescriptor;
li.f = vi ? Ri : function(e, t) {
    if (e = bi(e),
    t = wi(t),
    Ai)
        try {
            return Ri(e, t)
        } catch (e) {}
    if (Si(e, t))
        return gi(!mi(yi.f, e, t), e[t])
}
;
var Ii = {
    exports: {}
}
  , ki = Te
  , Ei = Q
  , Ci = Function.prototype
  , Ti = ki && Object.getOwnPropertyDescriptor
  , Oi = Ei(Ci, "name")
  , xi = {
    EXISTS: Oi,
    PROPER: Oi && "something" === function() {}
    .name,
    CONFIGURABLE: Oi && (!ki || ki && Ti(Ci, "name").configurable)
}
  , zi = be
  , Fi = L
  , Li = c(Function.toString);
zi(Fi.inspectSource) || (Fi.inspectSource = function(e) {
    return Li(e)
}
);
var Di = Fi.inspectSource
  , Ui = c
  , ji = n
  , Mi = be
  , Pi = Q
  , Bi = Te
  , Hi = xi.CONFIGURABLE
  , Ni = Di
  , Qi = ui.enforce
  , Wi = ui.get
  , Vi = String
  , Ki = Object.defineProperty
  , Xi = Ui("".slice)
  , Gi = Ui("".replace)
  , qi = Ui([].join)
  , Yi = Bi && !ji((function() {
    return 8 !== Ki((function() {}
    ), "length", {
        value: 8
    }).length
}
))
  , Zi = String(String).split("String")
  , Ji = Ii.exports = function(e, t, n) {
    "Symbol(" === Xi(Vi(t), 0, 7) && (t = "[" + Gi(Vi(t), /^Symbol\(([^)]*)\)/, "$1") + "]"),
    n && n.getter && (t = "get " + t),
    n && n.setter && (t = "set " + t),
    (!Pi(e, "name") || Hi && e.name !== t) && (Bi ? Ki(e, "name", {
        value: t,
        configurable: !0
    }) : e.name = t),
    Yi && n && Pi(n, "arity") && e.length !== n.arity && Ki(e, "length", {
        value: n.arity
    });
    try {
        n && Pi(n, "constructor") && n.constructor ? Bi && Ki(e, "prototype", {
            writable: !1
        }) : e.prototype && (e.prototype = void 0)
    } catch (e) {}
    var i = Qi(e);
    return Pi(i, "source") || (i.source = qi(Zi, "string" == typeof t ? t : "")),
    e
}
;
Function.prototype.toString = Ji((function() {
    return Mi(this) && Wi(this).source || Ni(this)
}
), "toString");
var _i = be
  , $i = xe
  , er = Ii.exports
  , tr = x
  , nr = function(e, t, n, i) {
    i || (i = {});
    var r = i.enumerable
      , o = void 0 !== i.name ? i.name : t;
    if (_i(n) && er(n, o, i),
    i.global)
        r ? e[t] = n : tr(t, n);
    else {
        try {
            i.unsafe ? e[t] && (r = !0) : delete e[t]
        } catch (e) {}
        r ? e[t] = n : $i.f(e, t, {
            value: n,
            enumerable: !1,
            configurable: !i.nonConfigurable,
            writable: !i.nonWritable
        })
    }
    return e
}
  , ir = {}
  , rr = tn
  , or = nn.concat("length", "prototype");
ir.f = Object.getOwnPropertyNames || function(e) {
    return rr(e, or)
}
;
var sr = {};
sr.f = Object.getOwnPropertySymbols;
var ar, cr, ur, lr = We, hr = ir, dr = sr, fr = Ee, pr = c([].concat), vr = lr("Reflect", "ownKeys") || function(e) {
    var t = hr.f(fr(e))
      , n = dr.f;
    return n ? pr(t, n(e)) : t
}
, mr = Q, yr = vr, gr = li, br = xe, wr = n, Sr = be, Ar = /#|\.prototype\./, Rr = function(e, t) {
    var n = kr[Ir(e)];
    return n == Cr || n != Er && (Sr(t) ? wr(t) : !!t)
}, Ir = Rr.normalize = function(e) {
    return String(e).replace(Ar, ".").toLowerCase()
}
, kr = Rr.data = {}, Er = Rr.NATIVE = "N", Cr = Rr.POLYFILL = "P", Tr = Rr, Or = E, xr = li.f, zr = Yn, Fr = nr, Lr = x, Dr = function(e, t, n) {
    for (var i = yr(t), r = br.f, o = gr.f, s = 0; s < i.length; s++) {
        var a = i[s];
        mr(e, a) || n && mr(n, a) || r(e, a, o(t, a))
    }
}, Ur = Tr, jr = function(e, t) {
    var n, i, r, o, s, a = e.target, c = e.global, u = e.stat;
    if (n = c ? Or : u ? Or[a] || Lr(a, {}) : (Or[a] || {}).prototype)
        for (i in t) {
            if (o = t[i],
            r = e.dontCallGetSet ? (s = xr(n, i)) && s.value : n[i],
            !Ur(c ? i : a + (u ? "." : "#") + i, e.forced) && void 0 !== r) {
                if (typeof o == typeof r)
                    continue;
                Dr(o, r)
            }
            (e.sham || r && r.sham) && zr(o, "sham", !0),
            Fr(n, i, o, e)
        }
}, Mr = !n((function() {
    function e() {}
    return e.prototype.constructor = null,
    Object.getPrototypeOf(new e) !== e.prototype
}
)), Pr = Q, Br = be, Hr = B, Nr = Mr, Qr = gn("IE_PROTO"), Wr = Object, Vr = Wr.prototype, Kr = Nr ? Wr.getPrototypeOf : function(e) {
    var t = Hr(e);
    if (Pr(t, Qr))
        return t[Qr];
    var n = t.constructor;
    return Br(n) && t instanceof n ? n.prototype : t instanceof Wr ? Vr : null
}
, Xr = n, Gr = be, qr = Ae, Yr = Kr, Zr = nr, Jr = ve("iterator"), _r = !1;
[].keys && ("next"in (ur = [].keys()) ? (cr = Yr(Yr(ur))) !== Object.prototype && (ar = cr) : _r = !0);
var $r = !qr(ar) || Xr((function() {
    var e = {};
    return ar[Jr].call(e) !== e
}
));
$r && (ar = {}),
Gr(ar[Jr]) || Zr(ar, Jr, (function() {
    return this
}
));
var eo = {
    IteratorPrototype: ar,
    BUGGY_SAFARI_ITERATORS: _r
}
  , to = xe.f
  , no = Q
  , io = ve("toStringTag")
  , ro = function(e, t, n) {
    e && !n && (e = e.prototype),
    e && !no(e, io) && to(e, io, {
        configurable: !0,
        value: t
    })
}
  , oo = eo.IteratorPrototype
  , so = Fn
  , ao = Xn
  , co = ro
  , uo = Qn
  , lo = function() {
    return this
}
  , ho = function(e, t, n, i) {
    var r = t + " Iterator";
    return e.prototype = so(oo, {
        next: ao(+!i, n)
    }),
    co(e, r, !1),
    uo[r] = lo,
    e
}
  , fo = c
  , po = tt
  , vo = be
  , mo = String
  , yo = TypeError
  , go = function(e, t, n) {
    try {
        return fo(po(Object.getOwnPropertyDescriptor(e, t)[n]))
    } catch (e) {}
}
  , bo = Ee
  , wo = function(e) {
    if ("object" == typeof e || vo(e))
        return e;
    throw yo("Can't set " + mo(e) + " as a prototype")
}
  , So = Object.setPrototypeOf || ("__proto__"in {} ? function() {
    var e, t = !1, n = {};
    try {
        (e = go(Object.prototype, "__proto__", "set"))(n, []),
        t = n instanceof Array
    } catch (e) {}
    return function(n, i) {
        return bo(n),
        wo(i),
        t ? e(n, i) : n.__proto__ = i,
        n
    }
}() : void 0)
  , Ao = jr
  , Ro = Be
  , Io = be
  , ko = ho
  , Eo = Kr
  , Co = So
  , To = ro
  , Oo = Yn
  , xo = nr
  , zo = Qn
  , Fo = xi.PROPER
  , Lo = xi.CONFIGURABLE
  , Do = eo.IteratorPrototype
  , Uo = eo.BUGGY_SAFARI_ITERATORS
  , jo = ve("iterator")
  , Mo = "keys"
  , Po = "values"
  , Bo = "entries"
  , Ho = function() {
    return this
}
  , No = I
  , Qo = Nn
  , Wo = Qn
  , Vo = ui
  , Ko = xe.f
  , Xo = function(e, t, n, i, r, o, s) {
    ko(n, t, i);
    var a, c, u, l = function(e) {
        if (e === r && v)
            return v;
        if (!Uo && e in f)
            return f[e];
        switch (e) {
        case Mo:
        case Po:
        case Bo:
            return function() {
                return new n(this,e)
            }
        }
        return function() {
            return new n(this)
        }
    }, h = t + " Iterator", d = !1, f = e.prototype, p = f[jo] || f["@@iterator"] || r && f[r], v = !Uo && p || l(r), m = "Array" == t && f.entries || p;
    if (m && (a = Eo(m.call(new e))) !== Object.prototype && a.next && (Eo(a) !== Do && (Co ? Co(a, Do) : Io(a[jo]) || xo(a, jo, Ho)),
    To(a, h, !0)),
    Fo && r == Po && p && p.name !== Po && (Lo ? Oo(f, "name", Po) : (d = !0,
    v = function() {
        return Ro(p, this)
    }
    )),
    r)
        if (c = {
            values: l(Po),
            keys: o ? v : l(Mo),
            entries: l(Bo)
        },
        s)
            for (u in c)
                (Uo || d || !(u in f)) && xo(f, u, c[u]);
        else
            Ao({
                target: t,
                proto: !0,
                forced: Uo || d
            }, c);
    return f[jo] !== v && xo(f, jo, v, {
        name: r
    }),
    zo[t] = v,
    c
}
  , Go = function(e, t) {
    return {
        value: e,
        done: t
    }
}
  , qo = Te
  , Yo = "Array Iterator"
  , Zo = Vo.set
  , Jo = Vo.getterFor(Yo)
  , _o = Xo(Array, "Array", (function(e, t) {
    Zo(this, {
        type: Yo,
        target: No(e),
        index: 0,
        kind: t
    })
}
), (function() {
    var e = Jo(this)
      , t = e.target
      , n = e.kind
      , i = e.index++;
    return !t || i >= t.length ? (e.target = void 0,
    Go(void 0, !0)) : Go("keys" == n ? i : "values" == n ? t[i] : [i, t[i]], !1)
}
), "values")
  , $o = Wo.Arguments = Wo.Array;
if (Qo("keys"),
Qo("values"),
Qo("entries"),
qo && "values" !== $o.name)
    try {
        Ko($o, "name", {
            value: "values"
        })
    } catch (e) {}
var es = De("span").classList
  , ts = es && es.constructor && es.constructor.prototype
  , ns = ts === Object.prototype ? void 0 : ts
  , is = E
  , rs = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
}
  , os = ns
  , ss = _o
  , as = Yn
  , cs = ve
  , us = cs("iterator")
  , ls = cs("toStringTag")
  , hs = ss.values
  , ds = function(e, t) {
    if (e) {
        if (e[us] !== hs)
            try {
                as(e, us, hs)
            } catch (t) {
                e[us] = hs
            }
        if (e[ls] || as(e, ls, t),
        rs[t])
            for (var n in ss)
                if (e[n] !== ss[n])
                    try {
                        as(e, n, ss[n])
                    } catch (t) {
                        e[n] = ss[n]
                    }
    }
};
for (var fs in rs)
    ds(is[fs] && is[fs].prototype, fs);
ds(os, "DOMTokenList");
var ps = {};
ps[ve("toStringTag")] = "z";
var vs, ms, ys = "[object z]" === String(ps), gs = be, bs = d, ws = ve("toStringTag"), Ss = Object, As = "Arguments" == bs(function() {
    return arguments
}()), Rs = ys ? bs : function(e) {
    var t, n, i;
    return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function(e, t) {
        try {
            return e[t]
        } catch (e) {}
    }(t = Ss(e), ws)) ? n : As ? bs(t) : "Object" == (i = bs(t)) && gs(t.callee) ? "Arguments" : i
}
, Is = Rs, ks = String, Es = function(e) {
    if ("Symbol" === Is(e))
        throw TypeError("Cannot convert a Symbol value to a string");
    return ks(e)
}, Cs = Ee, Ts = function() {
    var e = Cs(this)
      , t = "";
    return e.hasIndices && (t += "d"),
    e.global && (t += "g"),
    e.ignoreCase && (t += "i"),
    e.multiline && (t += "m"),
    e.dotAll && (t += "s"),
    e.unicode && (t += "u"),
    e.unicodeSets && (t += "v"),
    e.sticky && (t += "y"),
    t
}, Os = n, xs = E.RegExp, zs = Os((function() {
    var e = xs("a", "y");
    return e.lastIndex = 2,
    null != e.exec("abcd")
}
)), Fs = zs || Os((function() {
    return !xs("a", "y").sticky
}
)), Ls = {
    BROKEN_CARET: zs || Os((function() {
        var e = xs("^r", "gy");
        return e.lastIndex = 2,
        null != e.exec("str")
    }
    )),
    MISSED_STICKY: Fs,
    UNSUPPORTED_Y: zs
}, Ds = n, Us = E.RegExp, js = Ds((function() {
    var e = Us(".", "s");
    return !(e.dotAll && e.exec("\n") && "s" === e.flags)
}
)), Ms = n, Ps = E.RegExp, Bs = Ms((function() {
    var e = Ps("(?<a>b)", "g");
    return "b" !== e.exec("b").groups.a || "bc" !== "b".replace(e, "$<a>c")
}
)), Hs = Be, Ns = c, Qs = Es, Ws = Ts, Vs = Ls, Ks = C.exports, Xs = Fn, Gs = ui.get, qs = js, Ys = Bs, Zs = Ks("native-string-replace", String.prototype.replace), Js = RegExp.prototype.exec, _s = Js, $s = Ns("".charAt), ea = Ns("".indexOf), ta = Ns("".replace), na = Ns("".slice), ia = (ms = /b*/g,
Hs(Js, vs = /a/, "a"),
Hs(Js, ms, "a"),
0 !== vs.lastIndex || 0 !== ms.lastIndex), ra = Vs.BROKEN_CARET, oa = void 0 !== /()??/.exec("")[1];
(ia || oa || ra || qs || Ys) && (_s = function(e) {
    var t, n, i, r, o, s, a, c = this, u = Gs(c), l = Qs(e), h = u.raw;
    if (h)
        return h.lastIndex = c.lastIndex,
        t = Hs(_s, h, l),
        c.lastIndex = h.lastIndex,
        t;
    var d = u.groups
      , f = ra && c.sticky
      , p = Hs(Ws, c)
      , v = c.source
      , m = 0
      , y = l;
    if (f && (p = ta(p, "y", ""),
    -1 === ea(p, "g") && (p += "g"),
    y = na(l, c.lastIndex),
    c.lastIndex > 0 && (!c.multiline || c.multiline && "\n" !== $s(l, c.lastIndex - 1)) && (v = "(?: " + v + ")",
    y = " " + y,
    m++),
    n = new RegExp("^(?:" + v + ")",p)),
    oa && (n = new RegExp("^" + v + "$(?!\\s)",p)),
    ia && (i = c.lastIndex),
    r = Hs(Js, f ? n : c, y),
    f ? r ? (r.input = na(r.input, m),
    r[0] = na(r[0], m),
    r.index = c.lastIndex,
    c.lastIndex += r[0].length) : c.lastIndex = 0 : ia && r && (c.lastIndex = c.global ? r.index + r[0].length : i),
    oa && r && r.length > 1 && Hs(Zs, r[0], n, (function() {
        for (o = 1; o < arguments.length - 2; o++)
            void 0 === arguments[o] && (r[o] = void 0)
    }
    )),
    r && d)
        for (r.groups = s = Xs(null),
        o = 0; o < d.length; o++)
            s[(a = d[o])[0]] = r[a[1]];
    return r
}
);
var sa = _s;
jr({
    target: "RegExp",
    proto: !0,
    forced: /./.exec !== sa
}, {
    exec: sa
});
var aa = Te
  , ca = c
  , ua = Be
  , la = n
  , ha = sn
  , da = sr
  , fa = hi
  , pa = B
  , va = y
  , ma = Object.assign
  , ya = Object.defineProperty
  , ga = ca([].concat)
  , ba = !ma || la((function() {
    if (aa && 1 !== ma({
        b: 1
    }, ma(ya({}, "a", {
        enumerable: !0,
        get: function() {
            ya(this, "b", {
                value: 3,
                enumerable: !1
            })
        }
    }), {
        b: 2
    })).b)
        return !0;
    var e = {}
      , t = {}
      , n = Symbol()
      , i = "abcdefghijklmnopqrst";
    return e[n] = 7,
    i.split("").forEach((function(e) {
        t[e] = e
    }
    )),
    7 != ma({}, e)[n] || ha(ma({}, t)).join("") != i
}
)) ? function(e, t) {
    for (var n = pa(e), i = arguments.length, r = 1, o = da.f, s = fa.f; i > r; )
        for (var a, c = va(arguments[r++]), u = o ? ga(ha(c), o(c)) : ha(c), l = u.length, h = 0; l > h; )
            a = u[h++],
            aa && !ua(s, c, a) || (n[a] = c[a]);
    return n
}
: ma
  , wa = ba;
jr({
    target: "Object",
    stat: !0,
    arity: 2,
    forced: Object.assign !== wa
}, {
    assign: wa
});
let Sa = function(e) {
    return e[e.generic = 0] = "generic",
    e[e.NoStreamAvailable = 1] = "NoStreamAvailable",
    e[e.VideoInitialized = 2] = "VideoInitialized",
    e[e.VideoPlay = 3] = "VideoPlay",
    e[e.RTCPlayerCreated = 4] = "RTCPlayerCreated",
    e[e.RTCVideoReady = 5] = "RTCVideoReady",
    e[e.StreamInfoReceived = 6] = "StreamInfoReceived",
    e[e.DataChannelClosed = 7] = "DataChannelClosed",
    e[e.WebsocketClosed = 8] = "WebsocketClosed",
    e[e.Unauthorized = 9] = "Unauthorized",
    e[e.AFK_Warn = 10] = "AFK_Warn",
    e[e.AFK_Error = 11] = "AFK_Error",
    e[e.AFK_Action = 12] = "AFK_Action",
    e[e.AFK_Abort = 13] = "AFK_Abort",
    e
}({});
class Aa {
    constructor() {
        this._type = void 0,
        this.stack = void 0
    }
    static get Type() {
        var e;
        return null != (e = this._Type) ? e : Sa.generic
    }
    get type() {
        var e;
        return null != (e = this._type) ? e : Sa.generic
    }
}
Aa._Type = void 0;
class Ra extends Aa {
    constructor(e) {
        super(),
        this._type = e
    }
}
let Ia = function(e) {
    return e[e.none = 0] = "none",
    e[e.dataChannelReady = 1] = "dataChannelReady",
    e[e.resolution = 2] = "resolution",
    e
}({});
class ka extends Aa {
    constructor(e) {
        super(),
        this.state = e,
        this._type = Sa.RTCVideoReady
    }
}
ka._Type = Sa.RTCVideoReady;
class Ea extends Aa {
    constructor(e) {
        super(),
        this.streamInfo = e,
        this._type = Sa.StreamInfoReceived
    }
}
Ea._Type = Sa.StreamInfoReceived;
class Ca extends Aa {
    constructor(e) {
        super(),
        this.reason = e,
        this._type = Sa.Unauthorized
    }
}
Ca._Type = Sa.Unauthorized;
var Ta = Object.freeze({
    __proto__: null,
    EventTypes: Sa,
    AEvent: Aa,
    Generic: Ra,
    RTCVideoReadyState: Ia,
    RTCVideoReady: ka,
    StreamInfoReceived: Ea,
    Unauthorized: Ca
})
  , Oa = d
  , xa = c
  , za = function(e) {
    if ("Function" === Oa(e))
        return xa(e)
}
  , Fa = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView
  , La = Ii.exports
  , Da = xe
  , Ua = function(e, t, n) {
    return n.get && La(n.get, t, {
        getter: !0
    }),
    n.set && La(n.set, t, {
        setter: !0
    }),
    Da.f(e, t, n)
}
  , ja = nr
  , Ma = function(e, t, n) {
    for (var i in t)
        ja(e, i, t[i], n);
    return e
}
  , Pa = Ve
  , Ba = TypeError
  , Ha = function(e, t) {
    if (Pa(t, e))
        return e;
    throw Ba("Incorrect invocation")
}
  , Na = Dt
  , Qa = Nt
  , Wa = RangeError
  , Va = function(e) {
    if (void 0 === e)
        return 0;
    var t = Na(e)
      , n = Qa(t);
    if (t !== n)
        throw Wa("Wrong length or index");
    return n
}
  , Ka = Array
  , Xa = Math.abs
  , Ga = Math.pow
  , qa = Math.floor
  , Ya = Math.log
  , Za = Math.LN2
  , Ja = {
    pack: function(e, t, n) {
        var i, r, o, s = Ka(n), a = 8 * n - t - 1, c = (1 << a) - 1, u = c >> 1, l = 23 === t ? Ga(2, -24) - Ga(2, -77) : 0, h = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0, d = 0;
        for ((e = Xa(e)) != e || e === 1 / 0 ? (r = e != e ? 1 : 0,
        i = c) : (i = qa(Ya(e) / Za),
        e * (o = Ga(2, -i)) < 1 && (i--,
        o *= 2),
        (e += i + u >= 1 ? l / o : l * Ga(2, 1 - u)) * o >= 2 && (i++,
        o /= 2),
        i + u >= c ? (r = 0,
        i = c) : i + u >= 1 ? (r = (e * o - 1) * Ga(2, t),
        i += u) : (r = e * Ga(2, u - 1) * Ga(2, t),
        i = 0)); t >= 8; )
            s[d++] = 255 & r,
            r /= 256,
            t -= 8;
        for (i = i << t | r,
        a += t; a > 0; )
            s[d++] = 255 & i,
            i /= 256,
            a -= 8;
        return s[--d] |= 128 * h,
        s
    },
    unpack: function(e, t) {
        var n, i = e.length, r = 8 * i - t - 1, o = (1 << r) - 1, s = o >> 1, a = r - 7, c = i - 1, u = e[c--], l = 127 & u;
        for (u >>= 7; a > 0; )
            l = 256 * l + e[c--],
            a -= 8;
        for (n = l & (1 << -a) - 1,
        l >>= -a,
        a += t; a > 0; )
            n = 256 * n + e[c--],
            a -= 8;
        if (0 === l)
            l = 1 - s;
        else {
            if (l === o)
                return n ? NaN : u ? -1 / 0 : 1 / 0;
            n += Ga(2, t),
            l -= s
        }
        return (u ? -1 : 1) * n * Ga(2, l - t)
    }
}
  , _a = B
  , $a = Pt
  , ec = Wt
  , tc = function(e) {
    for (var t = _a(this), n = ec(t), i = arguments.length, r = $a(i > 1 ? arguments[1] : void 0, n), o = i > 2 ? arguments[2] : void 0, s = void 0 === o ? n : $a(o, n); s > r; )
        t[r++] = e;
    return t
}
  , nc = bt
  , ic = xe
  , rc = Xn
  , oc = Pt
  , sc = Wt
  , ac = function(e, t, n) {
    var i = nc(t);
    i in e ? ic.f(e, i, rc(0, n)) : e[i] = n
}
  , cc = Array
  , uc = Math.max
  , lc = function(e, t, n) {
    for (var i = sc(e), r = oc(t, i), o = oc(void 0 === n ? i : n, i), s = cc(uc(o - r, 0)), a = 0; r < o; r++,
    a++)
        ac(s, a, e[r]);
    return s.length = a,
    s
}
  , hc = E
  , dc = c
  , fc = Te
  , pc = Fa
  , vc = xi
  , mc = Yn
  , yc = Ua
  , gc = Ma
  , bc = n
  , wc = Ha
  , Sc = Dt
  , Ac = Nt
  , Rc = Va
  , Ic = Ja
  , kc = Kr
  , Ec = So
  , Cc = ir.f
  , Tc = tc
  , Oc = lc
  , xc = ro
  , zc = ui
  , Fc = vc.PROPER
  , Lc = vc.CONFIGURABLE
  , Dc = "ArrayBuffer"
  , Uc = "DataView"
  , jc = "prototype"
  , Mc = "Wrong index"
  , Pc = zc.getterFor(Dc)
  , Bc = zc.getterFor(Uc)
  , Hc = zc.set
  , Nc = hc[Dc]
  , Qc = Nc
  , Wc = Qc && Qc[jc]
  , Vc = hc[Uc]
  , Kc = Vc && Vc[jc]
  , Xc = Object.prototype
  , Gc = hc.Array
  , qc = hc.RangeError
  , Yc = dc(Tc)
  , Zc = dc([].reverse)
  , Jc = Ic.pack
  , _c = Ic.unpack
  , $c = function(e) {
    return [255 & e]
}
  , eu = function(e) {
    return [255 & e, e >> 8 & 255]
}
  , tu = function(e) {
    return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255]
}
  , nu = function(e) {
    return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0]
}
  , iu = function(e) {
    return Jc(e, 23, 4)
}
  , ru = function(e) {
    return Jc(e, 52, 8)
}
  , ou = function(e, t, n) {
    yc(e[jc], t, {
        configurable: !0,
        get: function() {
            return n(this)[t]
        }
    })
}
  , su = function(e, t, n, i) {
    var r = Rc(n)
      , o = Bc(e);
    if (r + t > o.byteLength)
        throw qc(Mc);
    var s = o.bytes
      , a = r + o.byteOffset
      , c = Oc(s, a, a + t);
    return i ? c : Zc(c)
}
  , au = function(e, t, n, i, r, o) {
    var s = Rc(n)
      , a = Bc(e);
    if (s + t > a.byteLength)
        throw qc(Mc);
    for (var c = a.bytes, u = s + a.byteOffset, l = i(+r), h = 0; h < t; h++)
        c[u + h] = l[o ? h : t - h - 1]
};
if (pc) {
    var cu = Fc && Nc.name !== Dc;
    if (bc((function() {
        Nc(1)
    }
    )) && bc((function() {
        new Nc(-1)
    }
    )) && !bc((function() {
        return new Nc,
        new Nc(1.5),
        new Nc(NaN),
        1 != Nc.length || cu && !Lc
    }
    )))
        cu && Lc && mc(Nc, "name", Dc);
    else {
        (Qc = function(e) {
            return wc(this, Wc),
            new Nc(Rc(e))
        }
        )[jc] = Wc;
        for (var uu, lu = Cc(Nc), hu = 0; lu.length > hu; )
            (uu = lu[hu++])in Qc || mc(Qc, uu, Nc[uu]);
        Wc.constructor = Qc
    }
    Ec && kc(Kc) !== Xc && Ec(Kc, Xc);
    var du = new Vc(new Qc(2))
      , fu = dc(Kc.setInt8);
    du.setInt8(0, 2147483648),
    du.setInt8(1, 2147483649),
    !du.getInt8(0) && du.getInt8(1) || gc(Kc, {
        setInt8: function(e, t) {
            fu(this, e, t << 24 >> 24)
        },
        setUint8: function(e, t) {
            fu(this, e, t << 24 >> 24)
        }
    }, {
        unsafe: !0
    })
} else
    Wc = (Qc = function(e) {
        wc(this, Wc);
        var t = Rc(e);
        Hc(this, {
            type: Dc,
            bytes: Yc(Gc(t), 0),
            byteLength: t
        }),
        fc || (this.byteLength = t,
        this.detached = !1)
    }
    )[jc],
    Kc = (Vc = function(e, t, n) {
        wc(this, Kc),
        wc(e, Wc);
        var i = Pc(e)
          , r = i.byteLength
          , o = Sc(t);
        if (o < 0 || o > r)
            throw qc("Wrong offset");
        if (o + (n = void 0 === n ? r - o : Ac(n)) > r)
            throw qc("Wrong length");
        Hc(this, {
            type: Uc,
            buffer: e,
            byteLength: n,
            byteOffset: o,
            bytes: i.bytes
        }),
        fc || (this.buffer = e,
        this.byteLength = n,
        this.byteOffset = o)
    }
    )[jc],
    fc && (ou(Qc, "byteLength", Pc),
    ou(Vc, "buffer", Bc),
    ou(Vc, "byteLength", Bc),
    ou(Vc, "byteOffset", Bc)),
    gc(Kc, {
        getInt8: function(e) {
            return su(this, 1, e)[0] << 24 >> 24
        },
        getUint8: function(e) {
            return su(this, 1, e)[0]
        },
        getInt16: function(e) {
            var t = su(this, 2, e, arguments.length > 1 ? arguments[1] : void 0);
            return (t[1] << 8 | t[0]) << 16 >> 16
        },
        getUint16: function(e) {
            var t = su(this, 2, e, arguments.length > 1 ? arguments[1] : void 0);
            return t[1] << 8 | t[0]
        },
        getInt32: function(e) {
            return nu(su(this, 4, e, arguments.length > 1 ? arguments[1] : void 0))
        },
        getUint32: function(e) {
            return nu(su(this, 4, e, arguments.length > 1 ? arguments[1] : void 0)) >>> 0
        },
        getFloat32: function(e) {
            return _c(su(this, 4, e, arguments.length > 1 ? arguments[1] : void 0), 23)
        },
        getFloat64: function(e) {
            return _c(su(this, 8, e, arguments.length > 1 ? arguments[1] : void 0), 52)
        },
        setInt8: function(e, t) {
            au(this, 1, e, $c, t)
        },
        setUint8: function(e, t) {
            au(this, 1, e, $c, t)
        },
        setInt16: function(e, t) {
            au(this, 2, e, eu, t, arguments.length > 2 ? arguments[2] : void 0)
        },
        setUint16: function(e, t) {
            au(this, 2, e, eu, t, arguments.length > 2 ? arguments[2] : void 0)
        },
        setInt32: function(e, t) {
            au(this, 4, e, tu, t, arguments.length > 2 ? arguments[2] : void 0)
        },
        setUint32: function(e, t) {
            au(this, 4, e, tu, t, arguments.length > 2 ? arguments[2] : void 0)
        },
        setFloat32: function(e, t) {
            au(this, 4, e, iu, t, arguments.length > 2 ? arguments[2] : void 0)
        },
        setFloat64: function(e, t) {
            au(this, 8, e, ru, t, arguments.length > 2 ? arguments[2] : void 0)
        }
    });
xc(Qc, Dc),
xc(Vc, Uc);
var pu = {
    ArrayBuffer: Qc,
    DataView: Vc
}
  , vu = c
  , mu = n
  , yu = be
  , gu = Rs
  , bu = Di
  , wu = function() {}
  , Su = []
  , Au = We("Reflect", "construct")
  , Ru = /^\s*(?:class|function)\b/
  , Iu = vu(Ru.exec)
  , ku = !Ru.exec(wu)
  , Eu = function(e) {
    if (!yu(e))
        return !1;
    try {
        return Au(wu, Su, e),
        !0
    } catch (e) {
        return !1
    }
}
  , Cu = function(e) {
    if (!yu(e))
        return !1;
    switch (gu(e)) {
    case "AsyncFunction":
    case "GeneratorFunction":
    case "AsyncGeneratorFunction":
        return !1
    }
    try {
        return ku || !!Iu(Ru, bu(e))
    } catch (e) {
        return !0
    }
};
Cu.sham = !0;
var Tu = !Au || mu((function() {
    var e;
    return Eu(Eu.call) || !Eu(Object) || !Eu((function() {
        e = !0
    }
    )) || e
}
)) ? Cu : Eu
  , Ou = Tu
  , xu = Je
  , zu = TypeError
  , Fu = function(e) {
    if (Ou(e))
        return e;
    throw zu(xu(e) + " is not a constructor")
}
  , Lu = Ee
  , Du = Fu
  , Uu = g
  , ju = ve("species")
  , Mu = function(e, t) {
    var n, i = Lu(e).constructor;
    return void 0 === i || Uu(n = Lu(i)[ju]) ? t : Du(n)
}
  , Pu = jr
  , Bu = za
  , Hu = n
  , Nu = Ee
  , Qu = Pt
  , Wu = Nt
  , Vu = Mu
  , Ku = pu.ArrayBuffer
  , Xu = pu.DataView
  , Gu = Xu.prototype
  , qu = Bu(Ku.prototype.slice)
  , Yu = Bu(Gu.getUint8)
  , Zu = Bu(Gu.setUint8);
Pu({
    target: "ArrayBuffer",
    proto: !0,
    unsafe: !0,
    forced: Hu((function() {
        return !new Ku(2).slice(1, void 0).byteLength
    }
    ))
}, {
    slice: function(e, t) {
        if (qu && void 0 === t)
            return qu(Nu(this), e);
        for (var n = Nu(this).byteLength, i = Qu(e, n), r = Qu(void 0 === t ? n : t, n), o = new (Vu(this, Ku))(Wu(r - i)), s = new Xu(this), a = new Xu(o), c = 0; i < r; )
            Zu(a, c++, Yu(s, i++));
        return o
    }
});
var Ju = {
    exports: {}
}
  , _u = ve("iterator")
  , $u = !1;
try {
    var el = 0
      , tl = {
        next: function() {
            return {
                done: !!el++
            }
        },
        return: function() {
            $u = !0
        }
    };
    tl[_u] = function() {
        return this
    }
    ,
    Array.from(tl, (function() {
        throw 2
    }
    ))
} catch (e) {}
var nl, il, rl, ol = function(e, t) {
    if (!t && !$u)
        return !1;
    var n = !1;
    try {
        var i = {};
        i[_u] = function() {
            return {
                next: function() {
                    return {
                        done: n = !0
                    }
                }
            }
        }
        ,
        e(i)
    } catch (e) {}
    return n
}, sl = Fa, al = Te, cl = E, ul = be, ll = Ae, hl = Q, dl = Rs, fl = Je, pl = Yn, vl = nr, ml = Ua, yl = Ve, gl = Kr, bl = So, wl = ve, Sl = G, Al = ui.enforce, Rl = ui.get, Il = cl.Int8Array, kl = Il && Il.prototype, El = cl.Uint8ClampedArray, Cl = El && El.prototype, Tl = Il && gl(Il), Ol = kl && gl(kl), xl = Object.prototype, zl = cl.TypeError, Fl = wl("toStringTag"), Ll = Sl("TYPED_ARRAY_TAG"), Dl = "TypedArrayConstructor", Ul = sl && !!bl && "Opera" !== dl(cl.opera), jl = !1, Ml = {
    Int8Array: 1,
    Uint8Array: 1,
    Uint8ClampedArray: 1,
    Int16Array: 2,
    Uint16Array: 2,
    Int32Array: 4,
    Uint32Array: 4,
    Float32Array: 4,
    Float64Array: 8
}, Pl = {
    BigInt64Array: 8,
    BigUint64Array: 8
}, Bl = function(e) {
    var t = gl(e);
    if (ll(t)) {
        var n = Rl(t);
        return n && hl(n, Dl) ? n[Dl] : Bl(t)
    }
}, Hl = function(e) {
    if (!ll(e))
        return !1;
    var t = dl(e);
    return hl(Ml, t) || hl(Pl, t)
};
for (nl in Ml)
    (rl = (il = cl[nl]) && il.prototype) ? Al(rl)[Dl] = il : Ul = !1;
for (nl in Pl)
    (rl = (il = cl[nl]) && il.prototype) && (Al(rl)[Dl] = il);
if ((!Ul || !ul(Tl) || Tl === Function.prototype) && (Tl = function() {
    throw zl("Incorrect invocation")
}
,
Ul))
    for (nl in Ml)
        cl[nl] && bl(cl[nl], Tl);
if ((!Ul || !Ol || Ol === xl) && (Ol = Tl.prototype,
Ul))
    for (nl in Ml)
        cl[nl] && bl(cl[nl].prototype, Ol);
if (Ul && gl(Cl) !== Ol && bl(Cl, Ol),
al && !hl(Ol, Fl))
    for (nl in jl = !0,
    ml(Ol, Fl, {
        configurable: !0,
        get: function() {
            return ll(this) ? this[Ll] : void 0
        }
    }),
    Ml)
        cl[nl] && pl(cl[nl], Ll, nl);
var Nl = {
    NATIVE_ARRAY_BUFFER_VIEWS: Ul,
    TYPED_ARRAY_TAG: jl && Ll,
    aTypedArray: function(e) {
        if (Hl(e))
            return e;
        throw zl("Target is not a typed array")
    },
    aTypedArrayConstructor: function(e) {
        if (ul(e) && (!bl || yl(Tl, e)))
            return e;
        throw zl(fl(e) + " is not a typed array constructor")
    },
    exportTypedArrayMethod: function(e, t, n, i) {
        if (al) {
            if (n)
                for (var r in Ml) {
                    var o = cl[r];
                    if (o && hl(o.prototype, e))
                        try {
                            delete o.prototype[e]
                        } catch (n) {
                            try {
                                o.prototype[e] = t
                            } catch (e) {}
                        }
                }
            Ol[e] && !n || vl(Ol, e, n ? t : Ul && kl[e] || t, i)
        }
    },
    exportTypedArrayStaticMethod: function(e, t, n) {
        var i, r;
        if (al) {
            if (bl) {
                if (n)
                    for (i in Ml)
                        if ((r = cl[i]) && hl(r, e))
                            try {
                                delete r[e]
                            } catch (e) {}
                if (Tl[e] && !n)
                    return;
                try {
                    return vl(Tl, e, n ? t : Ul && Tl[e] || t)
                } catch (e) {}
            }
            for (i in Ml)
                !(r = cl[i]) || r[e] && !n || vl(r, e, t)
        }
    },
    getTypedArrayConstructor: Bl,
    isView: function(e) {
        if (!ll(e))
            return !1;
        var t = dl(e);
        return "DataView" === t || hl(Ml, t) || hl(Pl, t)
    },
    isTypedArray: Hl,
    TypedArray: Tl,
    TypedArrayPrototype: Ol
}
  , Ql = E
  , Wl = n
  , Vl = ol
  , Kl = Nl.NATIVE_ARRAY_BUFFER_VIEWS
  , Xl = Ql.ArrayBuffer
  , Gl = Ql.Int8Array
  , ql = !Kl || !Wl((function() {
    Gl(1)
}
)) || !Wl((function() {
    new Gl(-1)
}
)) || !Vl((function(e) {
    new Gl,
    new Gl(null),
    new Gl(1.5),
    new Gl(e)
}
), !0) || Wl((function() {
    return 1 !== new Gl(new Xl(2),1,void 0).length
}
))
  , Yl = Ae
  , Zl = Math.floor
  , Jl = Number.isInteger || function(e) {
    return !Yl(e) && isFinite(e) && Zl(e) === e
}
  , _l = Dt
  , $l = RangeError
  , eh = function(e) {
    var t = _l(e);
    if (t < 0)
        throw $l("The argument can't be less than 0");
    return t
}
  , th = RangeError
  , nh = function(e, t) {
    var n = eh(e);
    if (n % t)
        throw th("Wrong offset");
    return n
}
  , ih = tt
  , rh = i
  , oh = za(za.bind)
  , sh = function(e, t) {
    return ih(e),
    void 0 === t ? e : rh ? oh(e, t) : function() {
        return e.apply(t, arguments)
    }
}
  , ah = Rs
  , ch = rt
  , uh = g
  , lh = Qn
  , hh = ve("iterator")
  , dh = function(e) {
    if (!uh(e))
        return ch(e, hh) || ch(e, "@@iterator") || lh[ah(e)]
}
  , fh = Be
  , ph = tt
  , vh = Ee
  , mh = Je
  , yh = dh
  , gh = TypeError
  , bh = function(e, t) {
    var n = arguments.length < 2 ? yh(e) : t;
    if (ph(n))
        return vh(fh(n, e));
    throw gh(mh(e) + " is not iterable")
}
  , wh = Qn
  , Sh = ve("iterator")
  , Ah = Array.prototype
  , Rh = function(e) {
    return void 0 !== e && (wh.Array === e || Ah[Sh] === e)
}
  , Ih = Rs
  , kh = mt
  , Eh = TypeError
  , Ch = function(e) {
    var t = kh(e, "number");
    if ("number" == typeof t)
        throw Eh("Can't convert number to bigint");
    return BigInt(t)
}
  , Th = sh
  , Oh = Be
  , xh = Fu
  , zh = B
  , Fh = Wt
  , Lh = bh
  , Dh = dh
  , Uh = Rh
  , jh = function(e) {
    var t = Ih(e);
    return "BigInt64Array" == t || "BigUint64Array" == t
}
  , Mh = Nl.aTypedArrayConstructor
  , Ph = Ch
  , Bh = d
  , Hh = Array.isArray || function(e) {
    return "Array" == Bh(e)
}
  , Nh = Tu
  , Qh = Ae
  , Wh = ve("species")
  , Vh = Array
  , Kh = function(e) {
    var t;
    return Hh(e) && (t = e.constructor,
    (Nh(t) && (t === Vh || Hh(t.prototype)) || Qh(t) && null === (t = t[Wh])) && (t = void 0)),
    void 0 === t ? Vh : t
}
  , Xh = sh
  , Gh = y
  , qh = B
  , Yh = Wt
  , Zh = function(e, t) {
    return new (Kh(e))(0 === t ? 0 : t)
}
  , Jh = c([].push)
  , _h = function(e) {
    var t = 1 == e
      , n = 2 == e
      , i = 3 == e
      , r = 4 == e
      , o = 6 == e
      , s = 7 == e
      , a = 5 == e || o;
    return function(c, u, l, h) {
        for (var d, f, p = qh(c), v = Gh(p), m = Xh(u, l), y = Yh(v), g = 0, b = h || Zh, w = t ? b(c, y) : n || s ? b(c, 0) : void 0; y > g; g++)
            if ((a || g in v) && (f = m(d = v[g], g, p),
            e))
                if (t)
                    w[g] = f;
                else if (f)
                    switch (e) {
                    case 3:
                        return !0;
                    case 5:
                        return d;
                    case 6:
                        return g;
                    case 2:
                        Jh(w, d)
                    }
                else
                    switch (e) {
                    case 4:
                        return !1;
                    case 7:
                        Jh(w, d)
                    }
        return o ? -1 : i || r ? r : w
    }
}
  , $h = {
    forEach: _h(0),
    map: _h(1),
    filter: _h(2),
    some: _h(3),
    every: _h(4),
    find: _h(5),
    findIndex: _h(6),
    filterReject: _h(7)
}
  , ed = We
  , td = Ua
  , nd = Te
  , id = ve("species")
  , rd = function(e) {
    var t = ed(e);
    nd && t && !t[id] && td(t, id, {
        configurable: !0,
        get: function() {
            return this
        }
    })
}
  , od = be
  , sd = Ae
  , ad = So
  , cd = jr
  , ud = E
  , ld = Be
  , hd = Te
  , dd = ql
  , fd = Nl
  , pd = pu
  , vd = Ha
  , md = Xn
  , yd = Yn
  , gd = Jl
  , bd = Nt
  , wd = Va
  , Sd = nh
  , Ad = bt
  , Rd = Q
  , Id = Rs
  , kd = Ae
  , Ed = Ye
  , Cd = Fn
  , Td = Ve
  , Od = So
  , xd = ir.f
  , zd = function(e) {
    var t, n, i, r, o, s, a, c, u = xh(this), l = zh(e), h = arguments.length, d = h > 1 ? arguments[1] : void 0, f = void 0 !== d, p = Dh(l);
    if (p && !Uh(p))
        for (c = (a = Lh(l, p)).next,
        l = []; !(s = Oh(c, a)).done; )
            l.push(s.value);
    for (f && h > 2 && (d = Th(d, arguments[2])),
    n = Fh(l),
    i = new (Mh(u))(n),
    r = jh(i),
    t = 0; n > t; t++)
        o = f ? d(l[t], t) : l[t],
        i[t] = r ? Ph(o) : +o;
    return i
}
  , Fd = $h.forEach
  , Ld = rd
  , Dd = Ua
  , Ud = xe
  , jd = li
  , Md = function(e, t, n) {
    var i, r;
    return ad && od(i = t.constructor) && i !== n && sd(r = i.prototype) && r !== n.prototype && ad(e, r),
    e
}
  , Pd = ui.get
  , Bd = ui.set
  , Hd = ui.enforce
  , Nd = Ud.f
  , Qd = jd.f
  , Wd = Math.round
  , Vd = ud.RangeError
  , Kd = pd.ArrayBuffer
  , Xd = Kd.prototype
  , Gd = pd.DataView
  , qd = fd.NATIVE_ARRAY_BUFFER_VIEWS
  , Yd = fd.TYPED_ARRAY_TAG
  , Zd = fd.TypedArray
  , Jd = fd.TypedArrayPrototype
  , _d = fd.aTypedArrayConstructor
  , $d = fd.isTypedArray
  , ef = "BYTES_PER_ELEMENT"
  , tf = "Wrong length"
  , nf = function(e, t) {
    _d(e);
    for (var n = 0, i = t.length, r = new e(i); i > n; )
        r[n] = t[n++];
    return r
}
  , rf = function(e, t) {
    Dd(e, t, {
        configurable: !0,
        get: function() {
            return Pd(this)[t]
        }
    })
}
  , of = function(e) {
    var t;
    return Td(Xd, e) || "ArrayBuffer" == (t = Id(e)) || "SharedArrayBuffer" == t
}
  , sf = function(e, t) {
    return $d(e) && !Ed(t) && t in e && gd(+t) && t >= 0
}
  , af = function(e, t) {
    return t = Ad(t),
    sf(e, t) ? md(2, e[t]) : Qd(e, t)
}
  , cf = function(e, t, n) {
    return t = Ad(t),
    !(sf(e, t) && kd(n) && Rd(n, "value")) || Rd(n, "get") || Rd(n, "set") || n.configurable || Rd(n, "writable") && !n.writable || Rd(n, "enumerable") && !n.enumerable ? Nd(e, t, n) : (e[t] = n.value,
    e)
};
hd ? (qd || (jd.f = af,
Ud.f = cf,
rf(Jd, "buffer"),
rf(Jd, "byteOffset"),
rf(Jd, "byteLength"),
rf(Jd, "length")),
cd({
    target: "Object",
    stat: !0,
    forced: !qd
}, {
    getOwnPropertyDescriptor: af,
    defineProperty: cf
}),
Ju.exports = function(e, t, n) {
    var i = e.match(/\d+/)[0] / 8
      , r = e + (n ? "Clamped" : "") + "Array"
      , o = "get" + e
      , s = "set" + e
      , a = ud[r]
      , c = a
      , u = c && c.prototype
      , l = {}
      , h = function(e, t) {
        Nd(e, t, {
            get: function() {
                return function(e, t) {
                    var n = Pd(e);
                    return n.view[o](t * i + n.byteOffset, !0)
                }(this, t)
            },
            set: function(e) {
                return function(e, t, r) {
                    var o = Pd(e);
                    n && (r = (r = Wd(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r),
                    o.view[s](t * i + o.byteOffset, r, !0)
                }(this, t, e)
            },
            enumerable: !0
        })
    };
    qd ? dd && (c = t((function(e, t, n, r) {
        return vd(e, u),
        Md(kd(t) ? of(t) ? void 0 !== r ? new a(t,Sd(n, i),r) : void 0 !== n ? new a(t,Sd(n, i)) : new a(t) : $d(t) ? nf(c, t) : ld(zd, c, t) : new a(wd(t)), e, c)
    }
    )),
    Od && Od(c, Zd),
    Fd(xd(a), (function(e) {
        e in c || yd(c, e, a[e])
    }
    )),
    c.prototype = u) : (c = t((function(e, t, n, r) {
        vd(e, u);
        var o, s, a, l = 0, d = 0;
        if (kd(t)) {
            if (!of(t))
                return $d(t) ? nf(c, t) : ld(zd, c, t);
            o = t,
            d = Sd(n, i);
            var f = t.byteLength;
            if (void 0 === r) {
                if (f % i)
                    throw Vd(tf);
                if ((s = f - d) < 0)
                    throw Vd(tf)
            } else if ((s = bd(r) * i) + d > f)
                throw Vd(tf);
            a = s / i
        } else
            a = wd(t),
            o = new Kd(s = a * i);
        for (Bd(e, {
            buffer: o,
            byteOffset: d,
            byteLength: s,
            length: a,
            view: new Gd(o)
        }); l < a; )
            h(e, l++)
    }
    )),
    Od && Od(c, Zd),
    u = c.prototype = Cd(Jd)),
    u.constructor !== c && yd(u, "constructor", c),
    Hd(u).TypedArrayConstructor = c,
    Yd && yd(u, Yd, r);
    var d = c != a;
    l[r] = c,
    cd({
        global: !0,
        constructor: !0,
        forced: d,
        sham: !qd
    }, l),
    ef in c || yd(c, ef, i),
    ef in u || yd(u, ef, i),
    Ld(r)
}
) : Ju.exports = function() {}
,
(0,
Ju.exports)("Uint8", (function(e) {
    return function(t, n, i) {
        return e(this, t, n, i)
    }
}
));
var uf = tc
  , lf = Ch
  , hf = Rs
  , df = Be
  , ff = n
  , pf = Nl.aTypedArray
  , vf = Nl.exportTypedArrayMethod
  , mf = c("".slice);
vf("fill", (function(e) {
    var t = arguments.length;
    pf(this);
    var n = "Big" === mf(hf(this), 0, 3) ? lf(e) : +e;
    return df(uf, this, n, t > 1 ? arguments[1] : void 0, t > 2 ? arguments[2] : void 0)
}
), ff((function() {
    var e = 0;
    return new Int8Array(2).fill({
        valueOf: function() {
            return e++
        }
    }),
    1 !== e
}
)));
var yf = E
  , gf = Be
  , bf = Nl
  , wf = Wt
  , Sf = nh
  , Af = B
  , Rf = n
  , If = yf.RangeError
  , kf = yf.Int8Array
  , Ef = kf && kf.prototype
  , Cf = Ef && Ef.set
  , Tf = bf.aTypedArray
  , Of = bf.exportTypedArrayMethod
  , xf = !Rf((function() {
    var e = new Uint8ClampedArray(2);
    return gf(Cf, e, {
        length: 1,
        0: 3
    }, 1),
    3 !== e[1]
}
))
  , zf = xf && bf.NATIVE_ARRAY_BUFFER_VIEWS && Rf((function() {
    var e = new kf(2);
    return e.set(1),
    e.set("2", 1),
    0 !== e[0] || 2 !== e[1]
}
));
Of("set", (function(e) {
    Tf(this);
    var t = Sf(arguments.length > 1 ? arguments[1] : void 0, 1)
      , n = Af(e);
    if (xf)
        return gf(Cf, this, n, t);
    var i = this.length
      , r = wf(n)
      , o = 0;
    if (r + t > i)
        throw If("Wrong length");
    for (; o < r; )
        this[t + o] = n[o++]
}
), !xf || zf);
var Ff = lc
  , Lf = Math.floor
  , Df = function(e, t) {
    var n = e.length
      , i = Lf(n / 2);
    return n < 8 ? Uf(e, t) : jf(e, Df(Ff(e, 0, i), t), Df(Ff(e, i), t), t)
}
  , Uf = function(e, t) {
    for (var n, i, r = e.length, o = 1; o < r; ) {
        for (i = o,
        n = e[o]; i && t(e[i - 1], n) > 0; )
            e[i] = e[--i];
        i !== o++ && (e[i] = n)
    }
    return e
}
  , jf = function(e, t, n, i) {
    for (var r = t.length, o = n.length, s = 0, a = 0; s < r || a < o; )
        e[s + a] = s < r && a < o ? i(t[s], n[a]) <= 0 ? t[s++] : n[a++] : s < r ? t[s++] : n[a++];
    return e
}
  , Mf = Df
  , Pf = q.match(/firefox\/(\d+)/i)
  , Bf = !!Pf && +Pf[1]
  , Hf = /MSIE|Trident/.test(q)
  , Nf = q.match(/AppleWebKit\/(\d+)\./)
  , Qf = !!Nf && +Nf[1]
  , Wf = za
  , Vf = n
  , Kf = tt
  , Xf = Mf
  , Gf = Bf
  , qf = Hf
  , Yf = te
  , Zf = Qf
  , Jf = Nl.aTypedArray
  , _f = Nl.exportTypedArrayMethod
  , $f = E.Uint16Array
  , ep = $f && Wf($f.prototype.sort)
  , tp = !(!ep || Vf((function() {
    ep(new $f(2), null)
}
)) && Vf((function() {
    ep(new $f(2), {})
}
)))
  , np = !!ep && !Vf((function() {
    if (Yf)
        return Yf < 74;
    if (Gf)
        return Gf < 67;
    if (qf)
        return !0;
    if (Zf)
        return Zf < 602;
    var e, t, n = new $f(516), i = Array(516);
    for (e = 0; e < 516; e++)
        t = e % 4,
        n[e] = 515 - e,
        i[e] = e - 2 * t + 3;
    for (ep(n, (function(e, t) {
        return (e / 4 | 0) - (t / 4 | 0)
    }
    )),
    e = 0; e < 516; e++)
        if (n[e] !== i[e])
            return !0
}
));
_f("sort", (function(e) {
    return void 0 !== e && Kf(e),
    np ? ep(this, e) : Xf(Jf(this), function(e) {
        return function(t, n) {
            return void 0 !== e ? +e(t, n) || 0 : n != n ? -1 : t != t ? 1 : 0 === t && 0 === n ? 1 / t > 0 && 1 / n < 0 ? 1 : -1 : t > n
        }
    }(e))
}
), !np || tp);
var ip = i
  , rp = Function.prototype
  , op = rp.apply
  , sp = rp.call
  , ap = "object" == typeof Reflect && Reflect.apply || (ip ? sp.bind(op) : function() {
    return sp.apply(op, arguments)
}
)
  , cp = c([].slice)
  , up = ap
  , lp = Nl
  , hp = n
  , dp = cp
  , fp = E.Int8Array
  , pp = lp.aTypedArray
  , vp = lp.exportTypedArrayMethod
  , mp = [].toLocaleString
  , yp = !!fp && hp((function() {
    mp.call(new fp(1))
}
));
vp("toLocaleString", (function() {
    return up(mp, yp ? dp(pp(this)) : pp(this), dp(arguments))
}
), hp((function() {
    return [1, 2].toLocaleString() != new fp([1, 2]).toLocaleString()
}
)) || !hp((function() {
    fp.prototype.toLocaleString.call([1, 2])
}
)));
var gp = rd
  , bp = "ArrayBuffer"
  , wp = pu[bp];
jr({
    global: !0,
    constructor: !0,
    forced: E[bp] !== wp
}, {
    ArrayBuffer: wp
}),
gp(bp);
let Sp, Ap = function(e) {
    return e[e.QualityControlOwnership = 0] = "QualityControlOwnership",
    e[e.Response = 1] = "Response",
    e[e.Command = 2] = "Command",
    e[e.FreezeFrame = 3] = "FreezeFrame",
    e[e.UnfreezeFrame = 4] = "UnfreezeFrame",
    e[e.VideoEncoderAvgQP = 5] = "VideoEncoderAvgQP",
    e
}({});
!function(e) {
    let t = function(e) {
        return e[e.IFrameRequest = 0] = "IFrameRequest",
        e[e.RequestQualityControl = 1] = "RequestQualityControl",
        e[e.MaxFpsRequest = 2] = "MaxFpsRequest",
        e[e.AverageBitrateRequest = 3] = "AverageBitrateRequest",
        e[e.StartStreaming = 4] = "StartStreaming",
        e[e.StopStreaming = 5] = "StopStreaming",
        e[e.UIInteraction = 50] = "UIInteraction",
        e[e.Command = 51] = "Command",
        e[e.KeyDown = 60] = "KeyDown",
        e[e.KeyUp = 61] = "KeyUp",
        e[e.KeyPress = 62] = "KeyPress",
        e[e.MouseEnter = 70] = "MouseEnter",
        e[e.MouseLeave = 71] = "MouseLeave",
        e[e.MouseDown = 72] = "MouseDown",
        e[e.MouseUp = 73] = "MouseUp",
        e[e.MouseMove = 74] = "MouseMove",
        e[e.MouseWheel = 75] = "MouseWheel",
        e[e.TouchStart = 80] = "TouchStart",
        e[e.TouchEnd = 81] = "TouchEnd",
        e[e.TouchMove = 82] = "TouchMove",
        e
    }({});
    e.ToUE4Message = t,
    e.ToBuffer = function(e, t) {
        const n = JSON.stringify(t)
          , i = new DataView(new ArrayBuffer(3 + 2 * n.length));
        let r = 0;
        i.setUint8(r, e),
        r++,
        i.setUint16(r, n.length, !0),
        r += 2;
        for (let e = 0; e < n.length; e++)
            i.setUint16(r, n.charCodeAt(e), !0),
            r += 2;
        return i.buffer
    }
}(Sp || (Sp = {}));
class Rp {
    constructor() {
        this.receiving = !1,
        this.size = 0,
        this.jpeg = void 0,
        this.height = 0,
        this.width = 0,
        this.valid = !1,
        this.freezeFrameOverlay = void 0,
        this.freezeFrameOverlay = document.createElement("img"),
        this.setupFreezeFrameOverlay()
    }
    setupFreezeFrameOverlay() {
        this.freezeFrameOverlay = document.createElement("img"),
        this.freezeFrameOverlay.id = "freezeFrameOverlay",
        this.freezeFrameOverlay.style.display = "none",
        this.freezeFrameOverlay.style.pointerEvents = "none",
        this.freezeFrameOverlay.style.position = "absolute",
        this.freezeFrameOverlay.style.zIndex = "30"
    }
    showFreezeFrameOverlay() {
        this.freezeFrameOverlay && this.valid && (this.freezeFrameOverlay.style.display = "block")
    }
    invalidateFreezeFrameOverlay() {
        this.freezeFrameOverlay && (this.freezeFrameOverlay.style.display = "none"),
        this.valid = !1
    }
}
let Ip = function(e) {
    return e[e.LockedMouse = 0] = "LockedMouse",
    e[e.HoveringMouse = 1] = "HoveringMouse",
    e
}({})
  , kp = function(e) {
    return e[e.MainButton = 0] = "MainButton",
    e[e.AuxiliaryButton = 1] = "AuxiliaryButton",
    e[e.SecondaryButton = 2] = "SecondaryButton",
    e[e.FourthButton = 3] = "FourthButton",
    e[e.FifthButton = 4] = "FifthButton",
    e
}({})
  , Ep = function(e) {
    return e[e.PrimaryButton = 1] = "PrimaryButton",
    e[e.SecondaryButton = 2] = "SecondaryButton",
    e[e.AuxiliaryButton = 4] = "AuxiliaryButton",
    e[e.FourthButton = 8] = "FourthButton",
    e[e.FifthButton = 16] = "FifthButton",
    e
}({});
var Cp, Tp, Op, xp, zp = "undefined" != typeof process && "process" == d(process), Fp = TypeError, Lp = function(e, t) {
    if (e < t)
        throw Fp("Not enough arguments");
    return e
}, Dp = /(?:ipad|iphone|ipod).*applewebkit/i.test(q), Up = E, jp = ap, Mp = sh, Pp = be, Bp = Q, Hp = n, Np = pn, Qp = cp, Wp = De, Vp = Lp, Kp = Dp, Xp = zp, Gp = Up.setImmediate, qp = Up.clearImmediate, Yp = Up.process, Zp = Up.Dispatch, Jp = Up.Function, _p = Up.MessageChannel, $p = Up.String, ev = 0, tv = {}, nv = "onreadystatechange";
Hp((function() {
    Cp = Up.location
}
));
var iv = function(e) {
    if (Bp(tv, e)) {
        var t = tv[e];
        delete tv[e],
        t()
    }
}
  , rv = function(e) {
    return function() {
        iv(e)
    }
}
  , ov = function(e) {
    iv(e.data)
}
  , sv = function(e) {
    Up.postMessage($p(e), Cp.protocol + "//" + Cp.host)
};
Gp && qp || (Gp = function(e) {
    Vp(arguments.length, 1);
    var t = Pp(e) ? e : Jp(e)
      , n = Qp(arguments, 1);
    return tv[++ev] = function() {
        jp(t, void 0, n)
    }
    ,
    Tp(ev),
    ev
}
,
qp = function(e) {
    delete tv[e]
}
,
Xp ? Tp = function(e) {
    Yp.nextTick(rv(e))
}
: Zp && Zp.now ? Tp = function(e) {
    Zp.now(rv(e))
}
: _p && !Kp ? (xp = (Op = new _p).port2,
Op.port1.onmessage = ov,
Tp = Mp(xp.postMessage, xp)) : Up.addEventListener && Pp(Up.postMessage) && !Up.importScripts && Cp && "file:" !== Cp.protocol && !Hp(sv) ? (Tp = sv,
Up.addEventListener("message", ov, !1)) : Tp = nv in Wp("script") ? function(e) {
    Np.appendChild(Wp("script"))[nv] = function() {
        Np.removeChild(this),
        iv(e)
    }
}
: function(e) {
    setTimeout(rv(e), 0)
}
);
var av = {
    set: Gp,
    clear: qp
}
  , cv = function() {
    this.head = null,
    this.tail = null
};
cv.prototype = {
    add: function(e) {
        var t = {
            item: e,
            next: null
        }
          , n = this.tail;
        n ? n.next = t : this.head = t,
        this.tail = t
    },
    get: function() {
        var e = this.head;
        if (e)
            return null === (this.head = e.next) && (this.tail = null),
            e.item
    }
};
var uv, lv, hv, dv, fv, pv = cv, vv = /ipad|iphone|ipod/i.test(q) && "undefined" != typeof Pebble, mv = /web0s(?!.*chrome)/i.test(q), yv = E, gv = sh, bv = li.f, wv = av.set, Sv = pv, Av = Dp, Rv = vv, Iv = mv, kv = zp, Ev = yv.MutationObserver || yv.WebKitMutationObserver, Cv = yv.document, Tv = yv.process, Ov = yv.Promise, xv = bv(yv, "queueMicrotask"), zv = xv && xv.value;
if (!zv) {
    var Fv = new Sv
      , Lv = function() {
        var e, t;
        for (kv && (e = Tv.domain) && e.exit(); t = Fv.get(); )
            try {
                t()
            } catch (e) {
                throw Fv.head && uv(),
                e
            }
        e && e.enter()
    };
    Av || kv || Iv || !Ev || !Cv ? !Rv && Ov && Ov.resolve ? ((dv = Ov.resolve(void 0)).constructor = Ov,
    fv = gv(dv.then, dv),
    uv = function() {
        fv(Lv)
    }
    ) : kv ? uv = function() {
        Tv.nextTick(Lv)
    }
    : (wv = gv(wv, yv),
    uv = function() {
        wv(Lv)
    }
    ) : (lv = !0,
    hv = Cv.createTextNode(""),
    new Ev(Lv).observe(hv, {
        characterData: !0
    }),
    uv = function() {
        hv.data = lv = !lv
    }
    ),
    zv = function(e) {
        Fv.head || uv(),
        Fv.add(e)
    }
}
var Dv = zv
  , Uv = function(e) {
    try {
        return {
            error: !1,
            value: e()
        }
    } catch (e) {
        return {
            error: !0,
            value: e
        }
    }
}
  , jv = E.Promise
  , Mv = "object" == typeof Deno && Deno && "object" == typeof Deno.version
  , Pv = !Mv && !zp && "object" == typeof window && "object" == typeof document
  , Bv = E
  , Hv = jv
  , Nv = be
  , Qv = Tr
  , Wv = Di
  , Vv = ve
  , Kv = Pv
  , Xv = Mv
  , Gv = te;
Hv && Hv.prototype;
var qv = Vv("species")
  , Yv = !1
  , Zv = Nv(Bv.PromiseRejectionEvent)
  , Jv = Qv("Promise", (function() {
    var e = Wv(Hv)
      , t = e !== String(Hv);
    if (!t && 66 === Gv)
        return !0;
    if (!Gv || Gv < 51 || !/native code/.test(e)) {
        var n = new Hv((function(e) {
            e(1)
        }
        ))
          , i = function(e) {
            e((function() {}
            ), (function() {}
            ))
        };
        if ((n.constructor = {})[qv] = i,
        !(Yv = n.then((function() {}
        ))instanceof i))
            return !0
    }
    return !t && (Kv || Xv) && !Zv
}
))
  , _v = {
    CONSTRUCTOR: Jv,
    REJECTION_EVENT: Zv,
    SUBCLASSING: Yv
}
  , $v = {}
  , em = tt
  , tm = TypeError
  , nm = function(e) {
    var t, n;
    this.promise = new e((function(e, i) {
        if (void 0 !== t || void 0 !== n)
            throw tm("Bad Promise constructor");
        t = e,
        n = i
    }
    )),
    this.resolve = em(t),
    this.reject = em(n)
};
$v.f = function(e) {
    return new nm(e)
}
;
var im, rm, om, sm = jr, am = zp, cm = E, um = Be, lm = nr, hm = So, dm = ro, fm = rd, pm = tt, vm = be, mm = Ae, ym = Ha, gm = Mu, bm = av.set, wm = Dv, Sm = function(e, t) {
    try {
        1 == arguments.length ? console.error(e) : console.error(e, t)
    } catch (e) {}
}, Am = Uv, Rm = pv, Im = ui, km = jv, Em = $v, Cm = "Promise", Tm = _v.CONSTRUCTOR, Om = _v.REJECTION_EVENT, xm = _v.SUBCLASSING, zm = Im.getterFor(Cm), Fm = Im.set, Lm = km && km.prototype, Dm = km, Um = Lm, jm = cm.TypeError, Mm = cm.document, Pm = cm.process, Bm = Em.f, Hm = Bm, Nm = !!(Mm && Mm.createEvent && cm.dispatchEvent), Qm = "unhandledrejection", Wm = function(e) {
    var t;
    return !(!mm(e) || !vm(t = e.then)) && t
}, Vm = function(e, t) {
    var n, i, r, o = t.value, s = 1 == t.state, a = s ? e.ok : e.fail, c = e.resolve, u = e.reject, l = e.domain;
    try {
        a ? (s || (2 === t.rejection && Ym(t),
        t.rejection = 1),
        !0 === a ? n = o : (l && l.enter(),
        n = a(o),
        l && (l.exit(),
        r = !0)),
        n === e.promise ? u(jm("Promise-chain cycle")) : (i = Wm(n)) ? um(i, n, c, u) : c(n)) : u(o)
    } catch (e) {
        l && !r && l.exit(),
        u(e)
    }
}, Km = function(e, t) {
    e.notified || (e.notified = !0,
    wm((function() {
        for (var n, i = e.reactions; n = i.get(); )
            Vm(n, e);
        e.notified = !1,
        t && !e.rejection && Gm(e)
    }
    )))
}, Xm = function(e, t, n) {
    var i, r;
    Nm ? ((i = Mm.createEvent("Event")).promise = t,
    i.reason = n,
    i.initEvent(e, !1, !0),
    cm.dispatchEvent(i)) : i = {
        promise: t,
        reason: n
    },
    !Om && (r = cm["on" + e]) ? r(i) : e === Qm && Sm("Unhandled promise rejection", n)
}, Gm = function(e) {
    um(bm, cm, (function() {
        var t, n = e.facade, i = e.value;
        if (qm(e) && (t = Am((function() {
            am ? Pm.emit("unhandledRejection", i, n) : Xm(Qm, n, i)
        }
        )),
        e.rejection = am || qm(e) ? 2 : 1,
        t.error))
            throw t.value
    }
    ))
}, qm = function(e) {
    return 1 !== e.rejection && !e.parent
}, Ym = function(e) {
    um(bm, cm, (function() {
        var t = e.facade;
        am ? Pm.emit("rejectionHandled", t) : Xm("rejectionhandled", t, e.value)
    }
    ))
}, Zm = function(e, t, n) {
    return function(i) {
        e(t, i, n)
    }
}, Jm = function(e, t, n) {
    e.done || (e.done = !0,
    n && (e = n),
    e.value = t,
    e.state = 2,
    Km(e, !0))
}, _m = function(e, t, n) {
    if (!e.done) {
        e.done = !0,
        n && (e = n);
        try {
            if (e.facade === t)
                throw jm("Promise can't be resolved itself");
            var i = Wm(t);
            i ? wm((function() {
                var n = {
                    done: !1
                };
                try {
                    um(i, t, Zm(_m, n, e), Zm(Jm, n, e))
                } catch (t) {
                    Jm(n, t, e)
                }
            }
            )) : (e.value = t,
            e.state = 1,
            Km(e, !1))
        } catch (t) {
            Jm({
                done: !1
            }, t, e)
        }
    }
};
if (Tm && (Um = (Dm = function(e) {
    ym(this, Um),
    pm(e),
    um(im, this);
    var t = zm(this);
    try {
        e(Zm(_m, t), Zm(Jm, t))
    } catch (e) {
        Jm(t, e)
    }
}
).prototype,
(im = function(e) {
    Fm(this, {
        type: Cm,
        done: !1,
        notified: !1,
        parent: !1,
        reactions: new Rm,
        rejection: !1,
        state: 0,
        value: void 0
    })
}
).prototype = lm(Um, "then", (function(e, t) {
    var n = zm(this)
      , i = Bm(gm(this, Dm));
    return n.parent = !0,
    i.ok = !vm(e) || e,
    i.fail = vm(t) && t,
    i.domain = am ? Pm.domain : void 0,
    0 == n.state ? n.reactions.add(i) : wm((function() {
        Vm(i, n)
    }
    )),
    i.promise
}
)),
rm = function() {
    var e = new im
      , t = zm(e);
    this.promise = e,
    this.resolve = Zm(_m, t),
    this.reject = Zm(Jm, t)
}
,
Em.f = Bm = function(e) {
    return e === Dm || undefined === e ? new rm(e) : Hm(e)
}
,
vm(km) && Lm !== Object.prototype)) {
    om = Lm.then,
    xm || lm(Lm, "then", (function(e, t) {
        var n = this;
        return new Dm((function(e, t) {
            um(om, n, e, t)
        }
        )).then(e, t)
    }
    ), {
        unsafe: !0
    });
    try {
        delete Lm.constructor
    } catch (e) {}
    hm && hm(Lm, Um)
}
sm({
    global: !0,
    constructor: !0,
    wrap: !0,
    forced: Tm
}, {
    Promise: Dm
}),
dm(Dm, Cm, !1),
fm(Cm);
var $m = Be
  , ey = Ee
  , ty = rt
  , ny = sh
  , iy = Be
  , ry = Ee
  , oy = Je
  , sy = Rh
  , ay = Wt
  , cy = Ve
  , uy = bh
  , ly = dh
  , hy = function(e, t, n) {
    var i, r;
    ey(e);
    try {
        if (!(i = ty(e, "return"))) {
            if ("throw" === t)
                throw n;
            return n
        }
        i = $m(i, e)
    } catch (e) {
        r = !0,
        i = e
    }
    if ("throw" === t)
        throw n;
    if (r)
        throw i;
    return ey(i),
    n
}
  , dy = TypeError
  , fy = function(e, t) {
    this.stopped = e,
    this.result = t
}
  , py = fy.prototype
  , vy = function(e, t, n) {
    var i, r, o, s, a, c, u, l = n && n.that, h = !(!n || !n.AS_ENTRIES), d = !(!n || !n.IS_RECORD), f = !(!n || !n.IS_ITERATOR), p = !(!n || !n.INTERRUPTED), v = ny(t, l), m = function(e) {
        return i && hy(i, "normal", e),
        new fy(!0,e)
    }, y = function(e) {
        return h ? (ry(e),
        p ? v(e[0], e[1], m) : v(e[0], e[1])) : p ? v(e, m) : v(e)
    };
    if (d)
        i = e.iterator;
    else if (f)
        i = e;
    else {
        if (!(r = ly(e)))
            throw dy(oy(e) + " is not iterable");
        if (sy(r)) {
            for (o = 0,
            s = ay(e); s > o; o++)
                if ((a = y(e[o])) && cy(py, a))
                    return a;
            return new fy(!1)
        }
        i = uy(e, r)
    }
    for (c = d ? e.next : i.next; !(u = iy(c, i)).done; ) {
        try {
            a = y(u.value)
        } catch (e) {
            hy(i, "throw", e)
        }
        if ("object" == typeof a && a && cy(py, a))
            return a
    }
    return new fy(!1)
}
  , my = jv
  , yy = _v.CONSTRUCTOR || !ol((function(e) {
    my.all(e).then(void 0, (function() {}
    ))
}
))
  , gy = Be
  , by = tt
  , wy = $v
  , Sy = Uv
  , Ay = vy;
jr({
    target: "Promise",
    stat: !0,
    forced: yy
}, {
    all: function(e) {
        var t = this
          , n = wy.f(t)
          , i = n.resolve
          , r = n.reject
          , o = Sy((function() {
            var n = by(t.resolve)
              , o = []
              , s = 0
              , a = 1;
            Ay(e, (function(e) {
                var c = s++
                  , u = !1;
                a++,
                gy(n, t, e).then((function(e) {
                    u || (u = !0,
                    o[c] = e,
                    --a || i(o))
                }
                ), r)
            }
            )),
            --a || i(o)
        }
        ));
        return o.error && r(o.value),
        n.promise
    }
});
var Ry = jr
  , Iy = _v.CONSTRUCTOR
  , ky = jv
  , Ey = We
  , Cy = be
  , Ty = nr
  , Oy = ky && ky.prototype;
if (Ry({
    target: "Promise",
    proto: !0,
    forced: Iy,
    real: !0
}, {
    catch: function(e) {
        return this.then(void 0, e)
    }
}),
Cy(ky)) {
    var xy = Ey("Promise").prototype.catch;
    Oy.catch !== xy && Ty(Oy, "catch", xy, {
        unsafe: !0
    })
}
var zy = Be
  , Fy = tt
  , Ly = $v
  , Dy = Uv
  , Uy = vy;
jr({
    target: "Promise",
    stat: !0,
    forced: yy
}, {
    race: function(e) {
        var t = this
          , n = Ly.f(t)
          , i = n.reject
          , r = Dy((function() {
            var r = Fy(t.resolve);
            Uy(e, (function(e) {
                zy(r, t, e).then(n.resolve, i)
            }
            ))
        }
        ));
        return r.error && i(r.value),
        n.promise
    }
});
var jy = Be
  , My = $v;
jr({
    target: "Promise",
    stat: !0,
    forced: _v.CONSTRUCTOR
}, {
    reject: function(e) {
        var t = My.f(this);
        return jy(t.reject, void 0, e),
        t.promise
    }
});
var Py = Ee
  , By = Ae
  , Hy = $v
  , Ny = jr
  , Qy = _v.CONSTRUCTOR
  , Wy = function(e, t) {
    if (Py(e),
    By(t) && t.constructor === e)
        return t;
    var n = Hy.f(e);
    return (0,
    n.resolve)(t),
    n.promise
};
We("Promise"),
Ny({
    target: "Promise",
    stat: !0,
    forced: Qy
}, {
    resolve: function(e) {
        return Wy(this, e)
    }
});
var Vy = c(1..valueOf)
  , Ky = Dt
  , Xy = Es
  , Gy = S
  , qy = RangeError
  , Yy = jr
  , Zy = c
  , Jy = Dt
  , _y = Vy
  , $y = function(e) {
    var t = Xy(Gy(this))
      , n = ""
      , i = Ky(e);
    if (i < 0 || i == 1 / 0)
        throw qy("Wrong number of repetitions");
    for (; i > 0; (i >>>= 1) && (t += t))
        1 & i && (n += t);
    return n
}
  , eg = n
  , tg = RangeError
  , ng = String
  , ig = Math.floor
  , rg = Zy($y)
  , og = Zy("".slice)
  , sg = Zy(1..toFixed)
  , ag = function(e, t, n) {
    return 0 === t ? n : t % 2 == 1 ? ag(e, t - 1, n * e) : ag(e * e, t / 2, n)
}
  , cg = function(e, t, n) {
    for (var i = -1, r = n; ++i < 6; )
        r += t * e[i],
        e[i] = r % 1e7,
        r = ig(r / 1e7)
}
  , ug = function(e, t) {
    for (var n = 6, i = 0; --n >= 0; )
        i += e[n],
        e[n] = ig(i / t),
        i = i % t * 1e7
}
  , lg = function(e) {
    for (var t = 6, n = ""; --t >= 0; )
        if ("" !== n || 0 === t || 0 !== e[t]) {
            var i = ng(e[t]);
            n = "" === n ? i : n + rg("0", 7 - i.length) + i
        }
    return n
};
Yy({
    target: "Number",
    proto: !0,
    forced: eg((function() {
        return "0.000" !== sg(8e-5, 3) || "1" !== sg(.9, 0) || "1.25" !== sg(1.255, 2) || "1000000000000000128" !== sg(0xde0b6b3a7640080, 0)
    }
    )) || !eg((function() {
        sg({})
    }
    ))
}, {
    toFixed: function(e) {
        var t, n, i, r, o = _y(this), s = Jy(e), a = [0, 0, 0, 0, 0, 0], c = "", u = "0";
        if (s < 0 || s > 20)
            throw tg("Incorrect fraction digits");
        if (o != o)
            return "NaN";
        if (o <= -1e21 || o >= 1e21)
            return ng(o);
        if (o < 0 && (c = "-",
        o = -o),
        o > 1e-21)
            if (n = (t = function(e) {
                for (var t = 0, n = e; n >= 4096; )
                    t += 12,
                    n /= 4096;
                for (; n >= 2; )
                    t += 1,
                    n /= 2;
                return t
            }(o * ag(2, 69, 1)) - 69) < 0 ? o * ag(2, -t, 1) : o / ag(2, t, 1),
            n *= 4503599627370496,
            (t = 52 - t) > 0) {
                for (cg(a, 0, n),
                i = s; i >= 7; )
                    cg(a, 1e7, 0),
                    i -= 7;
                for (cg(a, ag(10, i, 1), 0),
                i = t - 1; i >= 23; )
                    ug(a, 1 << 23),
                    i -= 23;
                ug(a, 1 << i),
                cg(a, 1, 1),
                ug(a, 2),
                u = lg(a)
            } else
                cg(a, 0, n),
                cg(a, 1 << -t, 0),
                u = lg(a) + rg("0", s);
        return u = s > 0 ? c + ((r = u.length) <= s ? "0." + rg("0", s - r) + u : og(u, 0, r - s) + "." + og(u, r - s)) : c + u
    }
});
const hg = console
  , dg = ["error", "warn", "info", "http", "verbose", "debug", "silly"]
  , fg = dg.indexOf("http");
function pg(e) {
    return ("number" == typeof e ? e : dg.indexOf(e)) <= fg
}
const vg = {
    error: (e,t)=>pg(0) ? (void 0 === t ? hg.error(e) : hg.error(e, t),
    vg) : vg,
    warn: (e,t)=>pg(1) ? (void 0 === t ? hg.warn(e) : hg.warn(e, t),
    vg) : vg,
    info: (e,t)=>pg(2) ? (void 0 === t ? hg.info(e) : hg.info(e, t),
    vg) : vg,
    http: (e,t)=>pg(3) ? (void 0 === t ? hg.log(e) : hg.log(e, t),
    vg) : vg,
    verbose: (e,t)=>pg(4) ? (void 0 === t ? hg.log(e) : hg.log(e, t),
    vg) : vg,
    debug: (e,t)=>pg(5) ? (void 0 === t ? hg.debug(e) : hg.debug(e, t),
    vg) : vg,
    silly: (e,t)=>pg(6) ? (void 0 === t ? hg.log(e) : hg.log(e, t),
    vg) : vg
};
class mg {
    get elapsedTime() {
        return this.timeout ? Date.now() - (this.startTime || 0) : -1
    }
    getElapsedTime() {
        return `${(this.elapsedTime / 1e3).toFixed(1)}s`
    }
    get running() {
        return !!this.timeout
    }
    constructor(e) {
        this.ms = e,
        this.startTime = void 0,
        this.timeout = void 0
    }
    start(e, t) {
        if (void 0 === t && void 0 === this.ms)
            throw new Error("Either method's ms or class's ms must defined.");
        this.startTime = Date.now(),
        this.timeout && (clearTimeout(this.timeout),
        this.timeout = void 0),
        this.timeout = setTimeout((()=>{
            null == e || e(),
            this.timeout = void 0
        }
        ), void 0 === t ? this.ms : t)
    }
    stop() {
        if (!this.timeout)
            throw new Error("Timeout was not running.");
        clearTimeout(this.timeout),
        this.startTime = void 0
    }
}
class yg {
    get elapsedTime() {
        return this.timeout ? Date.now() - (this.startTime || 0) : -1
    }
    getElapsedTime() {
        return `${(this.elapsedTime / 1e3).toFixed(1)}s`
    }
    get running() {
        return !!this.timeout
    }
    constructor(e) {
        this.ms = e,
        this.startTime = void 0,
        this.timeout = void 0
    }
    async start() {
        return this.timeout && (clearTimeout(this.timeout.timeout),
        this.timeout.reject(),
        this.timeout = void 0),
        this.startTime = Date.now(),
        new Promise(((e,t)=>{
            this.timeout = {
                reject: t,
                timeout: setTimeout((()=>{
                    e(),
                    this.timeout = void 0
                }
                ), this.ms)
            }
        }
        ))
    }
    stop() {
        if (!this.timeout)
            throw new Error("Timeout was not running.");
        clearTimeout(this.timeout.timeout),
        this.timeout.reject(),
        this.startTime = void 0
    }
}
class gg {
    async warn() {
        return (this.errorTimeout.running || this.actionTimeout.running) && (this.events.dispatch(Sa.AFK_Abort),
        this.errorTimeout.running && this.errorTimeout.stop(),
        this.actionTimeout.running && this.actionTimeout.stop()),
        this.warnTimeout.start()
    }
    async error() {
        return this.errorTimeout.start()
    }
    async action() {
        return this.actionTimeout.start()
    }
    start() {
        this.enabled && this.warn().then((()=>{
            if (!this.enabled)
                throw new Error("Disabled");
            return vg.warn(`AFK warned. ${(this.warnTime / 1e3).toFixed(1)}s`),
            this.events.dispatch(Sa.AFK_Warn)
        }
        )).then((()=>{
            if (!this.enabled)
                throw new Error("Disabled");
            return this.error()
        }
        )).then((()=>{
            if (!this.enabled)
                throw new Error("Disabled");
            return vg.error(`AFK errored. ${(this.errorTime / 1e3).toFixed(1)}s`),
            this.events.dispatch(Sa.AFK_Error)
        }
        )).then((()=>{
            if (!this.enabled)
                throw new Error("Disabled");
            return this.action()
        }
        )).then((()=>{
            if (!this.enabled)
                throw new Error("Disabled");
            return vg.error(`AFK actioned. ${(this.actionTime / 1e3).toFixed(1)}s`),
            this.events.dispatch(Sa.AFK_Action)
        }
        )).catch((()=>{}
        ))
    }
    get warnTime() {
        return this._warnTime
    }
    set warnTime(e) {
        this._warnTime = e,
        this.warnTimeout = new yg(this.warnTime)
    }
    get errorTime() {
        return this._errorTime
    }
    set errorTime(e) {
        this._errorTime = e,
        this.errorTimeout = new yg(this.errorTime)
    }
    get actionTime() {
        return this._actionTime
    }
    set actionTime(e) {
        this._actionTime = e,
        this.actionTimeout = new yg(this.actionTime)
    }
    constructor(e, t=!1, n=6e5, i=6e4, r=1e4) {
        this.events = e,
        this.enabled = t,
        this.warnTimeout = void 0,
        this.errorTimeout = void 0,
        this.actionTimeout = void 0,
        this._warnTime = void 0,
        this._errorTime = void 0,
        this._actionTime = void 0,
        this.warnTime = n,
        this.errorTime = i,
        this.actionTime = r
    }
}
var bg = qt.includes
  , wg = Nn;
jr({
    target: "Array",
    proto: !0,
    forced: n((function() {
        return !Array(1).includes()
    }
    ))
}, {
    includes: function(e) {
        return bg(this, e, arguments.length > 1 ? arguments[1] : void 0)
    }
}),
wg("includes");
var Sg = Ae
  , Ag = d
  , Rg = ve("match")
  , Ig = function(e) {
    var t;
    return Sg(e) && (void 0 !== (t = e[Rg]) ? !!t : "RegExp" == Ag(e))
}
  , kg = TypeError
  , Eg = ve("match")
  , Cg = jr
  , Tg = function(e) {
    if (Ig(e))
        throw kg("The method doesn't accept regular expressions");
    return e
}
  , Og = S
  , xg = Es
  , zg = function(e) {
    var t = /./;
    try {
        "/./"[e](t)
    } catch (n) {
        try {
            return t[Eg] = !1,
            "/./"[e](t)
        } catch (e) {}
    }
    return !1
}
  , Fg = c("".indexOf);
Cg({
    target: "String",
    proto: !0,
    forced: !zg("includes")
}, {
    includes: function(e) {
        return !!~Fg(xg(Og(this)), xg(Tg(e)), arguments.length > 1 ? arguments[1] : void 0)
    }
});
class Lg {
    constructor() {
        this.createStack = !1,
        this.handlers = {},
        this.requiredListeners = void 0
    }
    static duckTypeEventTypes(e) {
        return "number" == typeof e ? e : "function" == typeof e ? e.Type : e.type
    }
    dispatch(e) {
        const {stack: t} = this.createStack ? new Error(" ") : {
            stack: void 0
        };
        var n;
        if (e instanceof Aa)
            e.stack = t,
            null == (n = this.handlers[e.type]) || n.forEach((t=>{
                t(e)
            }
            ));
        else if ("number" == typeof e) {
            var i;
            const n = new Ra(e);
            n.stack = t,
            null == (i = this.handlers[e]) || i.forEach((e=>{
                e(n)
            }
            ))
        } else if ("function" == typeof e) {
            var r;
            const n = new e;
            n.stack = t,
            null == (r = this.handlers[n.type]) || r.forEach((e=>{
                e(n)
            }
            ))
        }
    }
    addListener(e, t) {
        const n = Lg.duckTypeEventTypes(e);
        return this.handlers[n] || (this.handlers[n] = []),
        this.handlers[n].push(t),
        {
            handler: t,
            remove: ()=>this.removeListener(n, t),
            isRegistered: ()=>{
                var e, i;
                return null != (e = null == (i = this.handlers[n]) ? void 0 : i.includes(t)) && e
            }
        }
    }
    removeListener(e, t) {
        const n = Lg.duckTypeEventTypes(e);
        let i;
        return !!(this.handlers[n] && (i = this.handlers[n].indexOf(t)) > -1) && (this.handlers[n].splice(i, 1),
        !0)
    }
    setupRequiredListeners(...e) {
        return this.requiredListeners || (this.requiredListeners = []),
        this.requiredListeners = this.requiredListeners.concat(e.map((e=>Lg.duckTypeEventTypes(e)))),
        this
    }
    checkRequiredListeners() {
        var e;
        const t = {
            added: [],
            missing: []
        };
        return null != (e = this.requiredListeners) && e.length && this.requiredListeners.forEach((e=>{
            var n;
            null != (n = this.handlers[e]) && n.length || t.missing.push(Sa[e])
        }
        )),
        Object.keys(this.handlers).forEach((e=>t.added.push(Sa[e]))),
        t
    }
}
var Dg = za
  , Ug = nr
  , jg = sa
  , Mg = n
  , Pg = ve
  , Bg = Yn
  , Hg = Pg("species")
  , Ng = RegExp.prototype
  , Qg = function(e, t, n, i) {
    var r = Pg(e)
      , o = !Mg((function() {
        var t = {};
        return t[r] = function() {
            return 7
        }
        ,
        7 != ""[e](t)
    }
    ))
      , s = o && !Mg((function() {
        var t = !1
          , n = /a/;
        return "split" === e && ((n = {}).constructor = {},
        n.constructor[Hg] = function() {
            return n
        }
        ,
        n.flags = "",
        n[r] = /./[r]),
        n.exec = function() {
            return t = !0,
            null
        }
        ,
        n[r](""),
        !t
    }
    ));
    if (!o || !s || n) {
        var a = Dg(/./[r])
          , c = t(r, ""[e], (function(e, t, n, i, r) {
            var s = Dg(e)
              , c = t.exec;
            return c === jg || c === Ng.exec ? o && !r ? {
                done: !0,
                value: a(t, n, i)
            } : {
                done: !0,
                value: s(n, t, i)
            } : {
                done: !1
            }
        }
        ));
        Ug(String.prototype, e, c[0]),
        Ug(Ng, r, c[1])
    }
    i && Bg(Ng[r], "sham", !0)
}
  , Wg = c
  , Vg = Dt
  , Kg = Es
  , Xg = S
  , Gg = Wg("".charAt)
  , qg = Wg("".charCodeAt)
  , Yg = Wg("".slice)
  , Zg = function(e) {
    return function(t, n) {
        var i, r, o = Kg(Xg(t)), s = Vg(n), a = o.length;
        return s < 0 || s >= a ? e ? "" : void 0 : (i = qg(o, s)) < 55296 || i > 56319 || s + 1 === a || (r = qg(o, s + 1)) < 56320 || r > 57343 ? e ? Gg(o, s) : i : e ? Yg(o, s, s + 2) : r - 56320 + (i - 55296 << 10) + 65536
    }
}
  , Jg = {
    codeAt: Zg(!1),
    charAt: Zg(!0)
}.charAt
  , _g = c
  , $g = B
  , eb = Math.floor
  , tb = _g("".charAt)
  , nb = _g("".replace)
  , ib = _g("".slice)
  , rb = /\$([$&'`]|\d{1,2}|<[^>]*>)/g
  , ob = /\$([$&'`]|\d{1,2})/g
  , sb = Be
  , ab = Ee
  , cb = be
  , ub = d
  , lb = sa
  , hb = TypeError
  , db = function(e, t) {
    var n = e.exec;
    if (cb(n)) {
        var i = sb(n, e, t);
        return null !== i && ab(i),
        i
    }
    if ("RegExp" === ub(e))
        return sb(lb, e, t);
    throw hb("RegExp#exec called on incompatible receiver")
}
  , fb = ap
  , pb = Be
  , vb = c
  , mb = Qg
  , yb = n
  , gb = Ee
  , bb = be
  , wb = g
  , Sb = Dt
  , Ab = Nt
  , Rb = Es
  , Ib = S
  , kb = function(e, t, n) {
    return t + (n ? Jg(e, t).length : 1)
}
  , Eb = rt
  , Cb = function(e, t, n, i, r, o) {
    var s = n + e.length
      , a = i.length
      , c = ob;
    return void 0 !== r && (r = $g(r),
    c = rb),
    nb(o, c, (function(o, c) {
        var u;
        switch (tb(c, 0)) {
        case "$":
            return "$";
        case "&":
            return e;
        case "`":
            return ib(t, 0, n);
        case "'":
            return ib(t, s);
        case "<":
            u = r[ib(c, 1, -1)];
            break;
        default:
            var l = +c;
            if (0 === l)
                return o;
            if (l > a) {
                var h = eb(l / 10);
                return 0 === h ? o : h <= a ? void 0 === i[h - 1] ? tb(c, 1) : i[h - 1] + tb(c, 1) : o
            }
            u = i[l - 1]
        }
        return void 0 === u ? "" : u
    }
    ))
}
  , Tb = db
  , Ob = ve("replace")
  , xb = Math.max
  , zb = Math.min
  , Fb = vb([].concat)
  , Lb = vb([].push)
  , Db = vb("".indexOf)
  , Ub = vb("".slice)
  , jb = "$0" === "a".replace(/./, "$0")
  , Mb = !!/./[Ob] && "" === /./[Ob]("a", "$0");
mb("replace", (function(e, t, n) {
    var i = Mb ? "$" : "$0";
    return [function(e, n) {
        var i = Ib(this)
          , r = wb(e) ? void 0 : Eb(e, Ob);
        return r ? pb(r, e, i, n) : pb(t, Rb(i), e, n)
    }
    , function(e, r) {
        var o = gb(this)
          , s = Rb(e);
        if ("string" == typeof r && -1 === Db(r, i) && -1 === Db(r, "$<")) {
            var a = n(t, o, s, r);
            if (a.done)
                return a.value
        }
        var c = bb(r);
        c || (r = Rb(r));
        var u = o.global;
        if (u) {
            var l = o.unicode;
            o.lastIndex = 0
        }
        for (var h = []; ; ) {
            var d = Tb(o, s);
            if (null === d)
                break;
            if (Lb(h, d),
            !u)
                break;
            "" === Rb(d[0]) && (o.lastIndex = kb(s, Ab(o.lastIndex), l))
        }
        for (var f, p = "", v = 0, m = 0; m < h.length; m++) {
            for (var y = Rb((d = h[m])[0]), g = xb(zb(Sb(d.index), s.length), 0), b = [], w = 1; w < d.length; w++)
                Lb(b, void 0 === (f = d[w]) ? f : String(f));
            var S = d.groups;
            if (c) {
                var A = Fb([y], b, g, s);
                void 0 !== S && Lb(A, S);
                var R = Rb(fb(r, void 0, A))
            } else
                R = Cb(y, s, g, b, S, r);
            g >= v && (p += Ub(s, v, g) + R,
            v = g + y.length)
        }
        return p + Ub(s, v)
    }
    ]
}
), !!yb((function() {
    var e = /./;
    return e.exec = function() {
        var e = [];
        return e.groups = {
            a: "7"
        },
        e
    }
    ,
    "7" !== "".replace(e, "$<a>")
}
)) || !jb || Mb);
function Pb(e, t=2) {
    return `00 ${e}`.slice(-t)
}
function Bb(e) {
    const t = e / 1e3 / 60 / 60 / 24 / 365 % 1
      , n = t % 1 * 365
      , i = n % 1 * 24
      , r = i % 1 * 60
      , o = r % 1 * 60
      , s = o % 1 * 1e3;
    return `${Pb(Math.floor(t), 3)}y ${Pb(Math.floor(n), 3)}d ${Pb(Math.floor(i))}h ${Pb(Math.floor(r))}m ${Pb(Math.floor(o))}s ${Pb(Math.floor(s), 3)}ms`
}
class Hb {
    constructor() {
        this._container = void 0,
        this.audio = void 0,
        this._video = void 0,
        this.sizeContainer = void 0,
        this._overlay = void 0,
        this.playOverlay = void 0,
        this.statsSelector = ()=>document.querySelector("#pixel-streaming-stats"),
        this.editTextButton = void 0,
        this.editTextButtonSelector = ()=>document.querySelector("#editTextButton"),
        this.hiddenInput = void 0,
        this.hiddenInputSelector = ()=>document.querySelector("#hiddenInput"),
        this.streamingVideo = void 0,
        this.streamingVideoSelector = ()=>document.querySelector("#streamingVideoContainer"),
        this.sizeContainer = document.createElement("placeholder")
    }
    get container() {
        return this._container
    }
    set container(e) {
        e && (this._container = e)
    }
    set video(e) {
        this._video = e
    }
    get video() {
        return this._video ? this._video : document.createElement("video")
    }
    set overlay(e) {
        this._overlay = e
    }
    get overlay() {
        return this._overlay
    }
    get stats() {
        return this.statsSelector()
    }
}
class Nb {
    constructor(e) {
        this.overlayElement = void 0,
        this.overlayElement = document.createElement("div"),
        this.overlayElement.id = "play-overlay",
        this.overlayElement.style.background = "black",
        this.overlayElement.style.width = "100%",
        this.overlayElement.style.height = "100%",
        this.overlayElement.style.zIndex = "4",
        this.overlayElement.style.position = "absolute",
        this.overlayElement.style.justifyContent = "center",
        this.overlayElement.style.alignItems = "center",
        this.overlayElement.style.display = "flex",
        this.overlayElement.style.opacity = "0",
        this.overlayElement.style.top = "0",
        this.overlayElement.style.pointerEvents = "none",
        this.overlayElement.style.transition = "opacity 325ms cubic-bezier(0.4, 0, 0.2, 1) 0ms";
        const t = document.createElement("img");
        t.src = "data:image/jpeg;base64,";
        t.style.width = "75px",
        t.style.height = "75px",
        t.style.cursor = "pointer";
        const n = document.createElement("div");
        n.style.position = "absolute",
        n.style.width = "100%",
        n.style.height = "100%",
        n.style.zIndex = "-1",
        n.style.display = "flex",
        n.style.justifyContent = "center",
        n.style.flexDirection = "colum";
        const i = document.createElement("img");
        i.style.marginTop = "-5px",
        i.src = "data:image/svg+xml,%3csvg width='57' height='57' viewBox='0 0 57 57' xmlns='http://www.w3.org/2000/svg' stroke='white'%3e %3cg fill='none' fillRule='evenodd'%3e %3cg transform='translate(1 1)' strokeWidth='2'%3e %3ccircle cx='5' cy='50' r='5'%3e %3canimate attributeName='cy' begin='0s' dur='2.2s' values='50%3b5%3b50%3b50' calcMode='linear' repeatCount='indefinite' /%3e %3canimate attributeName='cx' begin='0s' dur='2.2s' values='5%3b27%3b49%3b5' calcMode='linear' repeatCount='indefinite' /%3e %3c/circle%3e %3ccircle cx='27' cy='5' r='5'%3e %3canimate attributeName='cy' begin='0s' dur='2.2s' from='5' to='5' values='5%3b50%3b50%3b5' calcMode='linear' repeatCount='indefinite' /%3e %3canimate attributeName='cx' begin='0s' dur='2.2s' from='27' to='27' values='27%3b49%3b5%3b27' calcMode='linear' repeatCount='indefinite' /%3e %3c/circle%3e %3ccircle cx='49' cy='50' r='5'%3e %3canimate attributeName='cy' begin='0s' dur='2.2s' values='50%3b50%3b5%3b50' calcMode='linear' repeatCount='indefinite' /%3e %3canimate attributeName='cx' from='49' to='49' begin='0s' dur='2.2s' values='49%3b5%3b27%3b49' calcMode='linear' repeatCount='indefinite' /%3e %3c/circle%3e %3c/g%3e %3c/g%3e%3c/svg%3e",
        i.style.marginLeft = "auto",
        i.style.marginRight = "auto",
        i.style.width = "50px",
        i.style.opacity = "0.6",
        n.append(i),
        this.overlayElement.append(t),
        e.dom.container.append(this.overlayElement),
        e.dom.container.append(n),
        t.addEventListener("click", (()=>{
            var t, n, i, r;
            this.remove(),
            null == e || null == (t = e.dom) || null == (n = t.video) || n.play(),
            null == e || null == (i = e.dom) || null == (r = i.audio) || r.play()
        }
        ))
    }
    remove() {
        this.overlayElement.style.opacity = "0",
        this.overlayElement.style.pointerEvents = "none",
        setTimeout((()=>{
            this.overlayElement.remove()
        }
        ), 330)
    }
    show() {
        this.overlayElement.style.opacity = "1",
        this.overlayElement.style.pointerEvents = "auto"
    }
}
class Qb {
    constructor(e, t) {
        this.webrtc_client = t,
        this.element = void 0,
        this.element = e.querySelector(".overlay");
        let n = function(e) {
            return e.load = "loadbar",
            e.play = "play-button",
            e.unavailable = "no-stream-available",
            e.warn = "danger",
            e.error = "dangerer",
            e.afk = "dangererest",
            e.connectionIssue = "bolt",
            e
        }({});
        const i = ()=>{
            var e, t, i;
            null == (e = this.element) || e.classList.remove(n.load, n.play),
            null == (t = this.element) || t.classList.remove(n.unavailable),
            null == (i = this.element) || i.classList.remove(n.warn, n.error, n.afk)
        }
        ;
        this.webrtc_client.events.addListener(Sa.WebsocketClosed, (()=>{
            var e;
            i(),
            this.webrtc_client.websocketClosed = !0,
            this.webrtc_client.dom.container.style.height = "-webkit-fill-available",
            null == (e = this.webrtc_client) || e.loader(!0, !this.webrtc_client.socket.reconnect.inProgress || this.webrtc_client.disconnectedDueToAfk)
        }
        )),
        this.webrtc_client.events.addListener(Sa.VideoInitialized, (()=>{
            var e, t, r, o, s;
            (i(),
            null == (e = this.webrtc_client.dom.video) || e.classList.remove("hidden"),
            this.webrtc_client.initializeVideo(),
            null != (t = this.webrtc_client) && null != (r = t.streamInfo) && r.autoPlay) || (null == (o = this.element) || o.classList.add(n.play),
            null == (s = this.element) || s.addEventListener("click", (()=>{
                var e, t;
                null != (e = this.webrtc_client.dom.video) && e.paused && (null == (t = this.webrtc_client) || t.play()),
                i()
            }
            )))
        }
        ));
        const r = (e,t)=>{
            const n = ()=>{
                var t;
                null == (t = this.webrtc_client.snackbar) || t.closeSnackbar(e),
                this.webrtc_client.dom.video.removeEventListener("mousemove", n)
            }
            ;
            this.webrtc_client.dom.video.addEventListener("mousemove", n),
            this.webrtc_client.dom.video.addEventListener("touchstart", n),
            setTimeout((()=>{
                this.webrtc_client.dom.video.removeEventListener("mousemove", n),
                this.webrtc_client.dom.video.removeEventListener("touchstart", n)
            }
            ), t)
        }
        ;
        this.webrtc_client.events.addListener(Sa.NoStreamAvailable, (()=>{
            var e;
            i(),
            null == (e = this.element) || e.classList.add(n.unavailable),
            this.webrtc_client.disconnectedDueToAfk || this.webrtc_client.socket.reconnectAttempt()
        }
        )),
        this.webrtc_client.events.addListener(Sa.DataChannelClosed, (()=>{
            var e;
            i(),
            null == (e = this.element) || e.classList.add(n.connectionIssue),
            this.webrtc_client.disconnectedDueToAfk || this.webrtc_client.socket.reconnectAttempt()
        }
        )),
        this.webrtc_client.events.addListener(Sa.AFK_Warn, (()=>{
            var e;
            i(),
            null == (e = this.element) || e.classList.add(n.warn)
        }
        )),
        this.webrtc_client.events.addListener(Sa.AFK_Error, (()=>{
            var e;
            i(),
            null == (e = this.element) || e.classList.add(n.error)
        }
        )),
        this.webrtc_client.events.addListener(Sa.AFK_Action, (()=>{
            var e;
            i(),
            null == (e = this.element) || e.classList.add(n.afk)
        }
        )),
        this.webrtc_client.events.addListener(Sa.AFK_Abort, (()=>{
            var e;
            null == (e = this.element) || e.classList.remove(n.warn, n.error)
        }
        )),
        this.webrtc_client.snackbar && (this.webrtc_client.events.addListener(Sa.AFK_Warn, (()=>{
            const e = this.webrtc_client.afk.errorTime
              , t = this.webrtc_client.afk.actionTime
              , n = this.webrtc_client.snackbar.enqueueSnackbar(`No interaction with the stream detected, your connection will be closed due to inactivity in ${i = t + e,
            i >= 31536e6 ? Bb(i).replace(/0?0?/g, "") : i >= 864e5 ? Bb(i).replace(/000\w 0?0?/g, "") : i >= 36e5 ? Bb(i).replace(/000\w 000\w 0?/g, "") : i >= 6e4 ? Bb(i).replace(/000\w 000\w 00\w 0?/g, "") : i >= 1e3 ? Bb(i).replace(/000\w 000\w 00\w 00\w 0?/g, "") : Bb(i).replace(/000\w 000\w 00\w 00\w 00\w 0?0?/g, "")}`, {
                variant: "warning",
                autoHideDuration: e
            });
            var i;
            r(n, e)
        }
        )),
        this.webrtc_client.events.addListener(Sa.AFK_Error, (()=>{
            const e = this.webrtc_client.afk.actionTime
              , t = this.webrtc_client.snackbar.enqueueSnackbar("No interaction with the stream detected, connection may be closed soon", {
                variant: "warning",
                autoHideDuration: e
            });
            r(t, e)
        }
        )),
        this.webrtc_client.events.addListener(Sa.AFK_Action, (()=>{
            this.webrtc_client.snackbar.enqueueSnackbar("The stream was disconnected due to inactivity", {
                variant: "warning",
                autoHideDuration: 3e5
            })
        }
        )))
    }
}
var Wb = n
  , Vb = Te
  , Kb = ve("iterator")
  , Xb = !Wb((function() {
    var e = new URL("b?a=1&b=2&c=3","http://a")
      , t = e.searchParams
      , n = "";
    return e.pathname = "c%20d",
    t.forEach((function(e, i) {
        t.delete("b"),
        n += i + e
    }
    )),
    !t.size && !Vb || !t.sort || "http://a/c%20d?a=1&c=3" !== e.href || "3" !== t.get("c") || "a=1" !== String(new URLSearchParams("?a=1")) || !t[Kb] || "a" !== new URL("https://a@b").username || "b" !== new URLSearchParams(new URLSearchParams("a=b")).get("a") || "xn--e1aybc" !== new URL("http://тест").host || "#%D0%B1" !== new URL("http://a#б").hash || "a1c3" !== n || "x" !== new URL("http://x",void 0).host
}
))
  , Gb = jr
  , qb = E
  , Yb = Be
  , Zb = c
  , Jb = Te
  , _b = Xb
  , $b = nr
  , ew = Ua
  , tw = Ma
  , nw = ro
  , iw = ho
  , rw = ui
  , ow = Ha
  , sw = be
  , aw = Q
  , cw = sh
  , uw = Rs
  , lw = Ee
  , hw = Ae
  , dw = Es
  , fw = Fn
  , pw = Xn
  , vw = bh
  , mw = dh
  , yw = Lp
  , gw = Mf
  , bw = ve("iterator")
  , ww = "URLSearchParams"
  , Sw = ww + "Iterator"
  , Aw = rw.set
  , Rw = rw.getterFor(ww)
  , Iw = rw.getterFor(Sw)
  , kw = Object.getOwnPropertyDescriptor
  , Ew = function(e) {
    if (!Jb)
        return qb[e];
    var t = kw(qb, e);
    return t && t.value
}
  , Cw = Ew("fetch")
  , Tw = Ew("Request")
  , Ow = Ew("Headers")
  , xw = Tw && Tw.prototype
  , zw = Ow && Ow.prototype
  , Fw = qb.RegExp
  , Lw = qb.TypeError
  , Dw = qb.decodeURIComponent
  , Uw = qb.encodeURIComponent
  , jw = Zb("".charAt)
  , Mw = Zb([].join)
  , Pw = Zb([].push)
  , Bw = Zb("".replace)
  , Hw = Zb([].shift)
  , Nw = Zb([].splice)
  , Qw = Zb("".split)
  , Ww = Zb("".slice)
  , Vw = /\+/g
  , Kw = Array(4)
  , Xw = function(e) {
    return Kw[e - 1] || (Kw[e - 1] = Fw("((?:%[\\da-f]{2}){" + e + "})", "gi"))
}
  , Gw = function(e) {
    try {
        return Dw(e)
    } catch (t) {
        return e
    }
}
  , qw = function(e) {
    var t = Bw(e, Vw, " ")
      , n = 4;
    try {
        return Dw(t)
    } catch (e) {
        for (; n; )
            t = Bw(t, Xw(n--), Gw);
        return t
    }
}
  , Yw = /[!'()~]|%20/g
  , Zw = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+"
}
  , Jw = function(e) {
    return Zw[e]
}
  , _w = function(e) {
    return Bw(Uw(e), Yw, Jw)
}
  , $w = iw((function(e, t) {
    Aw(this, {
        type: Sw,
        iterator: vw(Rw(e).entries),
        kind: t
    })
}
), "Iterator", (function() {
    var e = Iw(this)
      , t = e.kind
      , n = e.iterator.next()
      , i = n.value;
    return n.done || (n.value = "keys" === t ? i.key : "values" === t ? i.value : [i.key, i.value]),
    n
}
), !0)
  , eS = function(e) {
    this.entries = [],
    this.url = null,
    void 0 !== e && (hw(e) ? this.parseObject(e) : this.parseQuery("string" == typeof e ? "?" === jw(e, 0) ? Ww(e, 1) : e : dw(e)))
};
eS.prototype = {
    type: ww,
    bindURL: function(e) {
        this.url = e,
        this.update()
    },
    parseObject: function(e) {
        var t, n, i, r, o, s, a, c = mw(e);
        if (c)
            for (n = (t = vw(e, c)).next; !(i = Yb(n, t)).done; ) {
                if (o = (r = vw(lw(i.value))).next,
                (s = Yb(o, r)).done || (a = Yb(o, r)).done || !Yb(o, r).done)
                    throw Lw("Expected sequence with length 2");
                Pw(this.entries, {
                    key: dw(s.value),
                    value: dw(a.value)
                })
            }
        else
            for (var u in e)
                aw(e, u) && Pw(this.entries, {
                    key: u,
                    value: dw(e[u])
                })
    },
    parseQuery: function(e) {
        if (e)
            for (var t, n, i = Qw(e, "&"), r = 0; r < i.length; )
                (t = i[r++]).length && (n = Qw(t, "="),
                Pw(this.entries, {
                    key: qw(Hw(n)),
                    value: qw(Mw(n, "="))
                }))
    },
    serialize: function() {
        for (var e, t = this.entries, n = [], i = 0; i < t.length; )
            e = t[i++],
            Pw(n, _w(e.key) + "=" + _w(e.value));
        return Mw(n, "&")
    },
    update: function() {
        this.entries.length = 0,
        this.parseQuery(this.url.query)
    },
    updateURL: function() {
        this.url && this.url.update()
    }
};
var tS = function() {
    ow(this, nS);
    var e = arguments.length > 0 ? arguments[0] : void 0
      , t = Aw(this, new eS(e));
    Jb || (this.length = t.entries.length)
}
  , nS = tS.prototype;
if (tw(nS, {
    append: function(e, t) {
        yw(arguments.length, 2);
        var n = Rw(this);
        Pw(n.entries, {
            key: dw(e),
            value: dw(t)
        }),
        Jb || this.length++,
        n.updateURL()
    },
    delete: function(e) {
        yw(arguments.length, 1);
        for (var t = Rw(this), n = t.entries, i = dw(e), r = 0; r < n.length; )
            n[r].key === i ? Nw(n, r, 1) : r++;
        Jb || (this.length = n.length),
        t.updateURL()
    },
    get: function(e) {
        yw(arguments.length, 1);
        for (var t = Rw(this).entries, n = dw(e), i = 0; i < t.length; i++)
            if (t[i].key === n)
                return t[i].value;
        return null
    },
    getAll: function(e) {
        yw(arguments.length, 1);
        for (var t = Rw(this).entries, n = dw(e), i = [], r = 0; r < t.length; r++)
            t[r].key === n && Pw(i, t[r].value);
        return i
    },
    has: function(e) {
        yw(arguments.length, 1);
        for (var t = Rw(this).entries, n = dw(e), i = 0; i < t.length; )
            if (t[i++].key === n)
                return !0;
        return !1
    },
    set: function(e, t) {
        yw(arguments.length, 1);
        for (var n, i = Rw(this), r = i.entries, o = !1, s = dw(e), a = dw(t), c = 0; c < r.length; c++)
            (n = r[c]).key === s && (o ? Nw(r, c--, 1) : (o = !0,
            n.value = a));
        o || Pw(r, {
            key: s,
            value: a
        }),
        Jb || (this.length = r.length),
        i.updateURL()
    },
    sort: function() {
        var e = Rw(this);
        gw(e.entries, (function(e, t) {
            return e.key > t.key ? 1 : -1
        }
        )),
        e.updateURL()
    },
    forEach: function(e) {
        for (var t, n = Rw(this).entries, i = cw(e, arguments.length > 1 ? arguments[1] : void 0), r = 0; r < n.length; )
            i((t = n[r++]).value, t.key, this)
    },
    keys: function() {
        return new $w(this,"keys")
    },
    values: function() {
        return new $w(this,"values")
    },
    entries: function() {
        return new $w(this,"entries")
    }
}, {
    enumerable: !0
}),
$b(nS, bw, nS.entries, {
    name: "entries"
}),
$b(nS, "toString", (function() {
    return Rw(this).serialize()
}
), {
    enumerable: !0
}),
Jb && ew(nS, "size", {
    get: function() {
        return Rw(this).entries.length
    },
    configurable: !0,
    enumerable: !0
}),
nw(tS, ww),
Gb({
    global: !0,
    constructor: !0,
    forced: !_b
}, {
    URLSearchParams: tS
}),
!_b && sw(Ow)) {
    var iS = Zb(zw.has)
      , rS = Zb(zw.set)
      , oS = function(e) {
        if (hw(e)) {
            var t, n = e.body;
            if (uw(n) === ww)
                return t = e.headers ? new Ow(e.headers) : new Ow,
                iS(t, "content-type") || rS(t, "content-type", "application/x-www-form-urlencoded;charset=UTF-8"),
                fw(e, {
                    body: pw(0, dw(n)),
                    headers: pw(0, t)
                })
        }
        return e
    };
    if (sw(Cw) && Gb({
        global: !0,
        enumerable: !0,
        dontCallGetSet: !0,
        forced: !0
    }, {
        fetch: function(e) {
            return Cw(e, arguments.length > 1 ? oS(arguments[1]) : {})
        }
    }),
    sw(Tw)) {
        var sS = function(e) {
            return ow(this, xw),
            new Tw(e,arguments.length > 1 ? oS(arguments[1]) : {})
        };
        xw.constructor = sS,
        sS.prototype = xw,
        Gb({
            global: !0,
            constructor: !0,
            dontCallGetSet: !0,
            forced: !0
        }, {
            Request: sS
        })
    }
}
var aS = Object.is || function(e, t) {
    return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
}
  , cS = Be
  , uS = Ee
  , lS = g
  , hS = S
  , dS = aS
  , fS = Es
  , pS = rt
  , vS = db;
Qg("search", (function(e, t, n) {
    return [function(t) {
        var n = hS(this)
          , i = lS(t) ? void 0 : pS(t, e);
        return i ? cS(i, t, n) : new RegExp(t)[e](fS(n))
    }
    , function(e) {
        var i = uS(this)
          , r = fS(e)
          , o = n(t, i, r);
        if (o.done)
            return o.value;
        var s = i.lastIndex;
        dS(s, 0) || (i.lastIndex = 0);
        var a = vS(i, r);
        return dS(i.lastIndex, s) || (i.lastIndex = s),
        null === a ? -1 : a.index
    }
    ]
}
));
const mS = 65536
  , yS = 32767;
let gS;
var bS;
let wS;
var SS;
(bS = gS || (gS = {})).normalizeAndQuantizeSigned = function(e, t, n, i) {
    if (!e)
        throw new Error("PlayerElement is undefined");
    const r = t / (.5 * e.clientWidth)
      , o = i * n / (.5 * e.clientHeight);
    return {
        x: r * yS,
        y: o * yS
    }
}
,
bS.unquantizeAndDenormalizeUnsigned = function(e, t, n, i) {
    if (!e)
        throw new Error("PlayerElement is undefined");
    const r = (n / mS - .5) / i + .5;
    return {
        x: t / mS * e.clientWidth,
        y: r * e.clientHeight
    }
}
,
bS.normalizeAndQuantizeUnsigned = function(e, t, n, i) {
    if (!e)
        throw new Error("PlayerElement is undefined");
    const r = t / e.clientWidth
      , o = i * (n / e.clientHeight - .5) + .5;
    return r < 0 || r > 1 || o < 0 || o > 1 ? {
        inRange: !1,
        x: mS,
        y: mS
    } : {
        inRange: !0,
        x: r * mS,
        y: o * mS
    }
}
,
(SS = wS || (wS = {})).normalizeAndQuantizeSigned = function(e, t, n, i) {
    if (!e)
        throw new Error("PlayerElement is undefined");
    const r = i * t / (.5 * e.clientWidth)
      , o = n / (.5 * e.clientHeight);
    return {
        x: r * yS,
        y: o * yS
    }
}
,
SS.unquantizeAndDenormalizeUnsigned = function(e, t, n, i) {
    if (!e)
        throw new Error("PlayerElement is undefined");
    const r = n / mS;
    return {
        x: ((t / mS - .5) / i + .5) * e.clientWidth,
        y: r * e.clientHeight
    }
}
,
SS.normalizeAndQuantizeUnsigned = function(e, t, n, i) {
    if (!e)
        throw new Error("PlayerElement is undefined");
    const r = i * (t / e.clientWidth - .5) + .5
      , o = n / e.clientHeight;
    return r < 0 || r > 1 || o < 0 || o > 1 ? {
        inRange: !1,
        x: mS,
        y: mS
    } : {
        inRange: !0,
        x: r * mS,
        y: o * mS
    }
}
;
class AS {
    constructor(e, t) {
        this.playerElement = void 0,
        this.videoElement = void 0,
        this.playerElement = e,
        this.videoElement = t
    }
    normalizeAndQuantizeSigned(e, t, n) {
        const i = this.videoElement.videoHeight / this.videoElement.videoWidth;
        let r = i;
        if (n && (r = (null == n ? void 0 : n.height) / (null == n ? void 0 : n.width)),
        i > r) {
            const n = i / r;
            return gS.normalizeAndQuantizeSigned(this.videoElement, e, t, n)
        }
        const o = r / i;
        return wS.normalizeAndQuantizeSigned(this.videoElement, e, t, o)
    }
    unquantizeAndDenormalizeUnsigned(e, t, n) {
        const i = this.videoElement.videoHeight / this.videoElement.videoWidth;
        let r = i;
        if (n && (r = (null == n ? void 0 : n.height) / (null == n ? void 0 : n.width)),
        i > r) {
            const n = i / r;
            return gS.unquantizeAndDenormalizeUnsigned(this.videoElement, e, t, n)
        }
        const o = r / i;
        return wS.unquantizeAndDenormalizeUnsigned(this.videoElement, e, t, o)
    }
    normalizeAndQuantizeUnsigned(e, t, n) {
        const i = this.videoElement.videoHeight / this.videoElement.videoWidth;
        let r = i;
        if (n && (r = (null == n ? void 0 : n.height) / (null == n ? void 0 : n.width)),
        i > r) {
            const n = i / r;
            return gS.normalizeAndQuantizeUnsigned(this.videoElement, e, t, n)
        }
        const o = r / i;
        return wS.normalizeAndQuantizeUnsigned(this.videoElement, e, t, o)
    }
    normalizeTouchScreen(e, t, n) {
        const i = n.getBoundingClientRect()
          , r = e - i.left
          , o = t - i.top;
        return {
            inRange: !0,
            x: r / n.offsetWidth * 65536,
            y: o / n.offsetHeight * 65536
        }
    }
}
function RS(e) {
    const t = new Intl.NumberFormat(window.navigator.language,{
        maximumFractionDigits: 0,
        minimumIntegerDigits: 2
    });
    let n = (e.timestamp - e.timestampStart) / 1e3;
    const i = []
      , r = [60, 60];
    for (const e of r)
        i.push(n % e),
        n /= e;
    i.push(n);
    const o = i[0]
      , s = Math.floor(i[1])
      , a = Math.floor(i[2]);
    return `${t.format(a)}:${t.format(s)}:${t.format(o)}`
}
class IS {
    constructor(e, t, n) {
        var i;
        this.cfg = void 0,
        this.pcClient = void 0,
        this.dcClient = void 0,
        this.tnClient = void 0,
        this.dataChannelOptions = void 0,
        this.aggregateStatsIntervalId = void 0,
        this.aggregatedStats = void 0,
        this.video = void 0,
        this.audio = void 0,
        this.videoSettings = void 0,
        this.extmapAllowMixed = void 0,
        this.cfg = t.peerConnectionOptions,
        this.cfg.sdpSemantics = "unified-plan",
        this.pcClient = null,
        this.dcClient = null,
        this.tnClient = null,
        this.videoSettings = n,
        this.dataChannelOptions = {
            ordered: !0
        },
        this.video = this.createWebRtcVideo(e),
        this.audio = this.createWebRtcAudio(e),
        null != (i = e.autoplay) && i.audio && (this.audio.autoplay = !0),
        this.extmapAllowMixed = e.extmapAllowMixed
    }
    createWebRtcAudio(e) {
        const t = e.audioRef || document.createElement("Audio");
        return e.dom.audio = t,
        t
    }
    createWebRtcVideo(e) {
        var t;
        const n = e.videoRef || document.createElement("video");
        return n.id = "streamingVideoContainer",
        n.className = "streaming-video",
        n.style.alignSelf = "center",
        n.playsInline = !0,
        n.classList.add("hidden"),
        n.muted = !0,
        (this.videoSettings.autoPlay || null != (t = e.autoplay) && t.video) && (n.autoplay = !0),
        n.style.maxHeight = "100%",
        n.style.maxWidth = "100%",
        n.style.opacity = "0",
        n.style.transition = "opacity 700ms",
        n.style.transitionDelay = "0.2s",
        n.addEventListener("play", (()=>{
            this.onVideoPlay && this.onVideoPlay()
        }
        )),
        n.addEventListener("loadedmetadata", (()=>{
            this.onVideoInitialized && (this.onVideoInitialized(),
            null == e || e.videoInitializeCallback(e),
            e.dom.playOverlay && e.dom.playOverlay.show())
        }
        ), !0),
        e.dom.container.firstChild ? e.videoRef || e.dom.container.insertBefore(n, e.dom.container.firstChild) : (e.videoRef || e.dom.container.append(n),
        n.style.maxHeight = `${e.dom.sizeContainer.clientHeight}px`),
        e.dom.video = n,
        n
    }
    handleOnTrack(e) {
        vg.silly("handleOnTrack", e.streams),
        "audio" == e.track.kind ? [this.audio.srcObject] = e.streams : "video" == e.track.kind && ([this.video.srcObject] = e.streams)
    }
    setupDataChannel(e, t, n) {
        try {
            const i = e.createDataChannel(t, n);
            return vg.silly(`Datachannel '${t}' created.`),
            i.addEventListener("open", (()=>{
                vg.silly(`Datachannel '${t}' onOpen.`),
                this.onDataChannelConnected && this.onDataChannelConnected()
            }
            )),
            i.addEventListener("close", (()=>{
                vg.silly(`Datachannel '${t}' onClose.`),
                this.onDataChannelClosed()
            }
            )),
            i.addEventListener("message", (e=>{
                if (vg.silly(`Got message (${t})`, e.data),
                this.onDataChannelMessage)
                    if (e.data instanceof Blob) {
                        const t = new FileReader;
                        t.addEventListener("load", (e=>{
                            var t;
                            const n = null == (t = e.target) ? void 0 : t.result;
                            this.onDataChannelMessage(n)
                        }
                        )),
                        t.readAsArrayBuffer(e.data)
                    } else
                        e.data instanceof ArrayBuffer && this.onDataChannelMessage(e.data)
            }
            )),
            i
        } catch (e) {
            return vg.error("No Datachannel.", e),
            null
        }
    }
    onicecandidate(e) {
        var t, n;
        (vg.silly(`ICE candidate (${null == (t = e.candidate) ? void 0 : t.type})`, e),
        e.candidate && e.candidate.candidate) && (null == (n = this.onWebRtcCandidate) || n.call(this, e.candidate))
    }
    async handleCreateOffer(e) {
        const t = await e.createOffer({
            offerToReceiveAudio: this.videoSettings.audio,
            offerToReceiveVideo: this.videoSettings.video
        }).catch((()=>{
            vg.verbose("Couldn't create offer")
        }
        ));
        if (!t)
            throw void 0;
        var n;
        (await e.setLocalDescription(t).catch((()=>{
            vg.verbose("Couldn't create offer")
        }
        )),
        this.onWebRtcOffer) && (this.extmapAllowMixed || (t.sdp = t.sdp.replace("\r\na=extmap-allow-mixed\r\n", "\r\n")),
        t.sdp = null == (n = t.sdp) ? void 0 : n.replace(/(a=fmtp:\d+ .*level-asymmetry-allowed=.*)\r\n/gm, "$1;x-google-start-bitrate=12000;x-google-min-bitrate=6000;x-google-max-bitrate=16000\r\n"),
        this.onWebRtcOffer(t))
    }
    setupPeerConnection(e) {
        e.addTransceiver("video", {
            direction: "recvonly"
        }),
        e.addTransceiver("audio", {
            direction: "recvonly"
        }),
        e.ontrack = this.handleOnTrack.bind(this),
        e.onicecandidate = this.onicecandidate.bind(this),
        e.onsignalingstatechange = ()=>{
            vg.debug(`RTCPeerConnection.signalingState = ${e.signalingState}`)
        }
        ,
        e.oniceconnectionstatechange = ()=>{
            vg.debug(`RTCPeerConnection.iceConnectionState = ${e.iceConnectionState}`)
        }
        ,
        e.onicegatheringstatechange = ()=>{
            vg.debug(`RTCPeerConnection.iceGatheringState = ${e.iceGatheringState}`)
        }
        ,
        e.onicecandidateerror = e=>{
            "localhost" == window.location.hostname && vg.error(`RTCPeerConnectionIceErrorEvent, ${e.errorCode}: "${e.errorText}" ${e.url}`)
        }
    }
    handleCandidateFromServer(e) {
        var t;
        const n = new RTCIceCandidate(e);
        void 0 === n.type ? vg.warn(`ICE candidate (${n.type}):`, e) : vg.silly(`ICE candidate (${n.type}): `, e),
        null == (t = this.pcClient) || t.addIceCandidate(n).then((()=>vg.silly(`Added ICE candidate (${n.type}).`))).catch((e=>vg.error(e)))
    }
    createOffer() {
        this.pcClient && (vg.verbose("Closing existing PeerConnection"),
        this.pcClient.close(),
        this.pcClient = null),
        this.pcClient = new RTCPeerConnection(this.cfg),
        this.setupPeerConnection(this.pcClient),
        this.dcClient = this.setupDataChannel(this.pcClient, "arcware.px", this.dataChannelOptions),
        this.handleCreateOffer(this.pcClient).catch((()=>{}
        ))
    }
    receiveAnswer(e) {
        var t;
        vg.silly(`Received answer:\n ${"object" == typeof e ? JSON.stringify(e) : e}`);
        const n = new RTCSessionDescription(e);
        null == (t = this.pcClient) || t.setRemoteDescription(n)
    }
    close() {
        null != this && this.pcClient && (vg.verbose("Closing existing peerClient"),
        this.pcClient.close(),
        this.pcClient = null),
        this.aggregateStatsIntervalId && clearInterval(this.aggregateStatsIntervalId)
    }
    send(e) {
        this.dcClient && "open" == this.dcClient.readyState && this.dcClient.send(e)
    }
    getStats() {
        this.pcClient && this.pcClient.getStats(null).then((e=>function(e, t) {
            const n = t || {}
              , i = {};
            return e.forEach((e=>{
                "inbound-rtp" !== e.type || e.isRemote || "video" !== e.mediaType && !e.id.toLowerCase().includes("video") || (i.timestamp = e.timestamp,
                i.bytesReceived = e.bytesReceived,
                i.framesDecoded = e.framesDecoded,
                i.packetsLost = e.packetsLost,
                i.bytesReceivedStart = n && n.bytesReceivedStart ? n.bytesReceivedStart : e.bytesReceived,
                i.framesDecodedStart = n && n.framesDecodedStart ? n.framesDecodedStart : e.framesDecoded,
                i.timestampStart = n && n.timestampStart ? n.timestampStart : e.timestamp,
                n && n.timestamp && (n.bytesReceived && (i.bitrate = 8 * (i.bytesReceived - n.bytesReceived) / (i.timestamp - n.timestamp),
                i.bitrate = Math.floor(i.bitrate),
                i.lowBitrate = n.lowBitrate && n.lowBitrate < i.bitrate ? n.lowBitrate : i.bitrate,
                i.highBitrate = n.highBitrate && n.highBitrate > i.bitrate ? n.highBitrate : i.bitrate),
                n.bytesReceivedStart && (i.avgBitrate = 8 * (i.bytesReceived - n.bytesReceivedStart) / (i.timestamp - n.timestampStart),
                i.avgBitrate = Math.floor(i.avgBitrate)),
                n.framesDecoded && (i.framerate = (i.framesDecoded - n.framesDecoded) / ((i.timestamp - n.timestamp) / 1e3),
                i.framerate = Math.floor(i.framerate),
                i.lowFramerate = n.lowFramerate && n.lowFramerate < i.framerate ? n.lowFramerate : i.framerate,
                i.highFramerate = n.highFramerate && n.highFramerate > i.framerate ? n.highFramerate : i.framerate),
                n.framesDecodedStart && (i.avgframerate = (i.framesDecoded - n.framesDecodedStart) / ((i.timestamp - n.timestampStart) / 1e3),
                i.avgframerate = Math.floor(i.avgframerate)))),
                "track" !== e.type || "video_label" !== e.trackIdentifier && "video" !== e.kind || (i.framesDropped = e.framesDropped,
                i.framesReceived = e.framesReceived,
                i.framesDroppedPercentage = e.framesDropped / e.framesReceived * 100,
                i.frameHeight = e.frameHeight,
                i.frameWidth = e.frameWidth,
                i.frameHeightStart = n && n.frameHeightStart ? n.frameHeightStart : e.frameHeight,
                i.frameWidthStart = n && n.frameWidthStart ? n.frameWidthStart : e.frameWidth),
                "candidate-pair" === e.type && (i.currentRoundTripTime = e.currentRoundTripTime)
            }
            )),
            Promise.resolve(i)
        }(e, this.aggregatedStats))).then((e=>this.aggregatedStats = e)).then((e=>this.onAggregatedStats ? this.onAggregatedStats(e) : null)).catch((e=>vg.error(e)))
    }
    aggregateStats(e) {
        this.aggregateStatsIntervalId && clearInterval(this.aggregateStatsIntervalId),
        this.aggregateStatsIntervalId = setInterval(this.getStats.bind(this), e)
    }
}
var kS = Be
  , ES = Q
  , CS = Ve
  , TS = Ts
  , OS = RegExp.prototype
  , xS = xi.PROPER
  , zS = nr
  , FS = Ee
  , LS = Es
  , DS = n
  , US = function(e) {
    var t = e.flags;
    return void 0 !== t || "flags"in OS || ES(e, "flags") || !CS(OS, e) ? t : kS(TS, e)
}
  , jS = "toString"
  , MS = RegExp.prototype[jS]
  , PS = DS((function() {
    return "/a/b" != MS.call({
        source: "a",
        flags: "b"
    })
}
))
  , BS = xS && MS.name != jS;
(PS || BS) && zS(RegExp.prototype, jS, (function() {
    var e = FS(this);
    return "/" + LS(e.source) + "/" + LS(US(e))
}
), {
    unsafe: !0
});
var HS = Je
  , NS = TypeError
  , QS = n
  , WS = function(e, t) {
    var n = [][e];
    return !!n && QS((function() {
        n.call(null, t || function() {
            return 1
        }
        , 1)
    }
    ))
}
  , VS = jr
  , KS = c
  , XS = tt
  , GS = B
  , qS = Wt
  , YS = function(e, t) {
    if (!delete e[t])
        throw NS("Cannot delete property " + HS(t) + " of " + HS(e))
}
  , ZS = Es
  , JS = n
  , _S = Mf
  , $S = WS
  , eA = Bf
  , tA = Hf
  , nA = te
  , iA = Qf
  , rA = []
  , oA = KS(rA.sort)
  , sA = KS(rA.push)
  , aA = JS((function() {
    rA.sort(void 0)
}
))
  , cA = JS((function() {
    rA.sort(null)
}
))
  , uA = $S("sort")
  , lA = !JS((function() {
    if (nA)
        return nA < 70;
    if (!(eA && eA > 3)) {
        if (tA)
            return !0;
        if (iA)
            return iA < 603;
        var e, t, n, i, r = "";
        for (e = 65; e < 76; e++) {
            switch (t = String.fromCharCode(e),
            e) {
            case 66:
            case 69:
            case 70:
            case 72:
                n = 3;
                break;
            case 68:
            case 71:
                n = 4;
                break;
            default:
                n = 2
            }
            for (i = 0; i < 47; i++)
                rA.push({
                    k: t + i,
                    v: n
                })
        }
        for (rA.sort((function(e, t) {
            return t.v - e.v
        }
        )),
        i = 0; i < rA.length; i++)
            t = rA[i].k.charAt(0),
            r.charAt(r.length - 1) !== t && (r += t);
        return "DGBEFHACIJK" !== r
    }
}
));
VS({
    target: "Array",
    proto: !0,
    forced: aA || !cA || !uA || !lA
}, {
    sort: function(e) {
        void 0 !== e && XS(e);
        var t = GS(this);
        if (lA)
            return void 0 === e ? oA(t) : oA(t, e);
        var n, i, r = [], o = qS(t);
        for (i = 0; i < o; i++)
            i in t && sA(r, t[i]);
        for (_S(r, function(e) {
            return function(t, n) {
                return void 0 === n ? -1 : void 0 === t ? 1 : void 0 !== e ? +e(t, n) || 0 : ZS(t) > ZS(n) ? 1 : -1
            }
        }(e)),
        n = qS(r),
        i = 0; i < n; )
            t[i] = r[i++];
        for (; i < o; )
            YS(t, i++);
        return t
    }
});
var hA = tt
  , dA = B
  , fA = y
  , pA = Wt
  , vA = TypeError
  , mA = function(e) {
    return function(t, n, i, r) {
        hA(n);
        var o = dA(t)
          , s = fA(o)
          , a = pA(o)
          , c = e ? a - 1 : 0
          , u = e ? -1 : 1;
        if (i < 2)
            for (; ; ) {
                if (c in s) {
                    r = s[c],
                    c += u;
                    break
                }
                if (c += u,
                e ? c < 0 : a <= c)
                    throw vA("Reduce of empty array with no initial value")
            }
        for (; e ? c >= 0 : a > c; c += u)
            c in s && (r = n(r, s[c], c, o));
        return r
    }
}
  , yA = {
    left: mA(!1),
    right: mA(!0)
}.left;
jr({
    target: "Array",
    proto: !0,
    forced: !zp && te > 79 && te < 83 || !WS("reduce")
}, {
    reduce: function(e) {
        var t = arguments.length;
        return yA(this, e, t, t > 1 ? arguments[1] : void 0)
    }
});
const gA = {
    NumberDict: {
        0: 48,
        1: 49,
        2: 50,
        _3: 51,
        4: 52,
        5: 53,
        6: 54,
        7: 55,
        _8: 56,
        _9: 57
    },
    ArrowDict: {
        ArrowLeft: 37,
        ArrowUp: 38,
        ArrowRight: 39,
        ArrowDown: 40
    },
    LetterDict: {
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90
    },
    FKeyDict: {
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        F13: 124,
        F14: 125,
        F15: 126,
        F16: 127,
        F17: 128,
        F18: 129,
        F19: 130,
        F20: 131,
        F21: 132,
        F22: 133,
        F23: 134,
        F24: 135,
        F25: 136,
        F26: 137,
        F27: 138,
        F28: 139,
        F29: 140,
        F30: 141,
        F31: 142,
        F32: 143
    },
    ModDict: {
        Break: 3,
        Backspace: 8,
        Tab: 9,
        Clear: 12,
        Enter: 13,
        Shift: 16,
        Control: 17,
        Alt: 18,
        Pause: 19,
        Delete: 46
    },
    OtherDict: {
        Spacebar: 32
    }
}
  , bA = [gA.NumberDict, gA.ArrowDict, gA.LetterDict, gA.FKeyDict, gA.ModDict, gA.OtherDict].reduce(((e,t)=>t ? (Object.keys(t).forEach((n=>{
    const i = t[n];
    e[n] && vg.warn(`KeyDict, key '${n}'(type: string, value: ${e[n]}) overwritten by ${i}`),
    e[n] = i,
    e[i] && vg.warn(`KeyDict, key '${i}'(type: number, value: ${e[i]}) overwritten by ${n}`),
    e[i] = n
}
)),
e) : e), {});
function wA(e) {
    const t = "string" == typeof e ? function(e) {
        let t = e;
        switch (t) {
        case " ":
            t = "Spacebar";
            break;
        case "3":
            t = "_3";
            break;
        case "8":
            t = "_8";
            break;
        case "9":
            t = "_9";
            break;
        default:
            if (gA.LetterDict[e.toUpperCase()])
                return e.toUpperCase()
        }
        return t
    }(e) : void 0
      , n = "number" == typeof e ? e : void 0;
    return n && void 0 !== bA[n] ? (vg.debug(`MapKey, key '${e}' mapped to ${bA[n]}.`),
    bA[n]) : t && void 0 !== bA[t] ? (vg.debug(`MapKey, key '${e}' mapped to ${bA[t]}.`),
    bA[t]) : void vg.debug(`MapKey, key '${e}' is unknown.`)
}
const SA = new Set(["Tab", wA("Tab")].concat(Object.keys(gA.FKeyDict).reduce(((e,t)=>(e.push(t, gA.FKeyDict[t]),
e)), [])));
const AA = 60
  , RA = 8
  , IA = 16
  , kA = 17
  , EA = 18
  , CA = 253
  , TA = 254
  , OA = 255;
class xA {
    get video() {
        return this.player.video
    }
    constructor(e, t) {
        this.player = void 0,
        this.webrtc_client = void 0,
        this.x = 0,
        this.y = 0,
        this.hiddenInput = void 0,
        this.editTextButton = void 0,
        this.freezeFrame = new Rp,
        this.webrtc_client = e,
        this.player = t
    }
    emitMouseMove(e, t, n, i) {
        xA.PrintInputs && vg.verbose(`x: ${e}, y:${t}, dX: ${n}, dY: ${i}`);
        const r = this.player.aspectRatio.normalizeAndQuantizeUnsigned(e, t, this.webrtc_client.playerResolution.videoRes)
          , o = this.player.aspectRatio.normalizeAndQuantizeSigned(n, i, this.webrtc_client.playerResolution.videoRes)
          , s = new DataView(new ArrayBuffer(9));
        s.setUint8(0, Sp.ToUE4Message.MouseMove),
        s.setUint16(1, r.x, !0),
        s.setUint16(3, r.y, !0),
        s.setInt16(5, o.x, !0),
        s.setInt16(7, o.y, !0),
        this.webrtc_client.sendInputData(s.buffer)
    }
    emitMouseWheel(e, t, n) {
        xA.PrintInputs && vg.verbose(`mouse wheel with delta ${e} at (${t}, ${n})`);
        const i = this.player.aspectRatio.normalizeAndQuantizeUnsigned(t, n, this.webrtc_client.playerResolution.videoRes)
          , r = new DataView(new ArrayBuffer(7));
        r.setUint8(0, Sp.ToUE4Message.MouseWheel),
        r.setInt16(1, e, !0),
        r.setUint16(3, i.x, !0),
        r.setUint16(5, i.y, !0),
        this.webrtc_client.sendInputData(r.buffer)
    }
    emitMouseDown(e, t, n) {
        xA.PrintInputs && vg.verbose(`mouse button ${e} down at (${t}, ${n})`);
        const i = this.player.aspectRatio.normalizeAndQuantizeUnsigned(t, n, this.webrtc_client.playerResolution.videoRes)
          , r = new DataView(new ArrayBuffer(6));
        r.setUint8(0, Sp.ToUE4Message.MouseDown),
        r.setUint8(1, e),
        r.setUint16(2, i.x, !0),
        r.setUint16(4, i.y, !0),
        this.webrtc_client.sendInputData(r.buffer)
    }
    emitMouseUp(e, t, n) {
        xA.PrintInputs && vg.verbose(`mouse button ${e} up at (${t}, ${n})`);
        const i = this.player.aspectRatio.normalizeAndQuantizeUnsigned(t, n, this.webrtc_client.playerResolution.videoRes)
          , r = new DataView(new ArrayBuffer(6));
        r.setUint8(0, Sp.ToUE4Message.MouseUp),
        r.setUint8(1, e),
        r.setUint16(2, i.x, !0),
        r.setUint16(4, i.y, !0),
        this.webrtc_client.sendInputData(r.buffer)
    }
}
function zA(e) {
    return +e.keyCode === IA ? CA : +e.keyCode === kA ? TA : +e.keyCode === EA ? OA : +e.keyCode
}
xA.PrintInputs = !1;
class FA extends xA {
    constructor(e, t) {
        super(e, t),
        this.resizeFreezeFrameOverlay = ()=>{
            0 !== this.freezeFrame.width && 0 !== this.freezeFrame.height && (this.freezeFrame.freezeFrameOverlay.style.width = `${this.freezeFrame.width}px`,
            this.freezeFrame.freezeFrameOverlay.style.height = `${this.freezeFrame.height}px`,
            this.freezeFrame.freezeFrameOverlay.style.left = "0px",
            this.freezeFrame.freezeFrameOverlay.style.top = "0px")
        }
        ,
        this.lockStateChange = ()=>{
            document.pointerLockElement === this.video ? (vg.verbose("Pointer locked"),
            document.addEventListener("mousemove", this.updatePosition, !1)) : (vg.verbose("The pointer lock status is now unlocked"),
            document.removeEventListener("mousemove", this.updatePosition, !1))
        }
        ,
        this.updatePosition = e=>{
            this.x += e.movementX,
            this.y += e.movementY,
            this.x > this.webrtc_client.dom.container.clientWidth && (this.x = 1),
            this.x <= 0 && (this.x = this.webrtc_client.dom.container.clientWidth),
            this.y > this.webrtc_client.dom.container.clientHeight && (this.y = 1),
            this.y <= 0 && (this.y = this.webrtc_client.dom.container.clientHeight),
            this.emitMouseMove(this.x, this.y, e.movementX, e.movementY)
        }
        ,
        this.registerInputs(),
        this.registerKeyboardEvents(),
        e.touchRegistered = !0
    }
    registerKeyboardEvents() {
        const e = {};
        document.addEventListener("keydown", (t=>{
            if (e[t.key] = t.key,
            e.t && e[5]) {
                this.webrtc_client.renderStatsEnabled = !this.webrtc_client.renderStatsEnabled;
                const e = document.querySelector("#pixel-streaming-stats")
                  , t = null == e ? void 0 : e.style;
                t && (t.display = this.webrtc_client.renderStatsEnabled ? "block" : "none")
            }
            if (FA.PrintInputs && vg.verbose(`key down ${t.key}, repeat = ${t.repeat}`),
            this.webrtc_client.sendInputData(new Uint8Array([AA, zA(t), +t.repeat]).buffer),
            t.keyCode === RA) {
                const e = new KeyboardEvent("keypress",{
                    keyCode: RA,
                    code: "haha"
                });
                document.dispatchEvent(e)
            }
            var n;
            this.webrtc_client.inputOptions.suppressBrowserKeys && ((n = t.keyCode) >= 112 && n <= 123 || 9 === n) && t.preventDefault()
        }
        )),
        document.addEventListener("keyup", (t=>{
            delete e[t.key],
            FA.PrintInputs && vg.verbose(`key up ${t.key}`);
            const n = wA(t.key);
            void 0 !== n && this.webrtc_client.sendInputData(new Uint8Array([Sp.ToUE4Message.KeyUp, n]).buffer),
            this.webrtc_client.inputOptions.suppressBrowserKeys && function(e) {
                return SA.has(e)
            }(t.key) && t.preventDefault()
        }
        )),
        document.addEventListener("keypress", (e=>{
            FA.PrintInputs && vg.verbose(`key press ${e.key}`);
            const t = new DataView(new ArrayBuffer(3));
            t.setUint8(0, Sp.ToUE4Message.KeyPress),
            t.setUint16(1, e.keyCode, !0),
            this.webrtc_client.sendInputData(t.buffer)
        }
        ))
    }
    registerInputs() {
        this.video && this.registerMouseEnterAndLeaveEvents()
    }
    registerMouseEnterAndLeaveEvents() {
        this.video.addEventListener("mouseenter", (e=>{
            FA.PrintInputs && vg.verbose("mouse enter");
            const t = new DataView(new ArrayBuffer(1));
            t.setUint8(0, Sp.ToUE4Message.MouseEnter),
            this.webrtc_client.sendInputData(t.buffer),
            this.pressMouseButtons(e.buttons, this.x, this.y)
        }
        )),
        this.video.addEventListener("mouseleave", (e=>{
            FA.PrintInputs && vg.verbose("mouse leave");
            const t = new DataView(new ArrayBuffer(1));
            t.setUint8(0, Sp.ToUE4Message.MouseLeave),
            this.webrtc_client.sendInputData(t.buffer),
            this.releaseMouseButtons(e.buttons, this.x, this.y)
        }
        ))
    }
    showFreezeFrame() {
        if (!this.freezeFrame.jpeg)
            return;
        const e = btoa(this.freezeFrame.jpeg.reduce(((e,t)=>e + String.fromCodePoint(t)), ""));
        this.freezeFrame.freezeFrameOverlay.src = `data:image/jpeg;base64,${e}`,
        this.freezeFrame.freezeFrameOverlay.addEventListener("load", (()=>{
            this.freezeFrame.height = this.freezeFrame.freezeFrameOverlay.naturalHeight,
            this.freezeFrame.width = this.freezeFrame.freezeFrameOverlay.naturalWidth,
            this.resizeFreezeFrameOverlay(),
            this.webrtc_client.shouldShowPlayOverlay || this.freezeFrame.showFreezeFrameOverlay()
        }
        ))
    }
    registerHoveringMouseEvents() {
        const e = this.video;
        this.webrtc_client.style.cursor = "none",
        e.addEventListener("mousemove", (e=>{
            this.emitMouseMove(e.offsetX, e.offsetY, e.movementX, e.movementY),
            e.preventDefault()
        }
        )),
        e.addEventListener("mousedown", (e=>{
            this.emitMouseDown(e.button, e.offsetX, e.offsetY),
            e.preventDefault()
        }
        )),
        e.addEventListener("mouseup", (e=>{
            this.emitMouseUp(e.button, e.offsetX, e.offsetY),
            e.preventDefault()
        }
        )),
        e.addEventListener("contextmenu", (e=>{
            this.emitMouseUp(e.button, e.offsetX, e.offsetY),
            e.preventDefault()
        }
        )),
        e.addEventListener("wheel", (e=>{
            this.emitMouseWheel(e.deltaX - e.deltaY, e.offsetX, e.offsetY),
            e.preventDefault()
        }
        ))
    }
    pressMouseButtons(e, t, n) {
        e & Ep.PrimaryButton && this.emitMouseDown(kp.MainButton, t, n),
        e & Ep.SecondaryButton && this.emitMouseDown(kp.SecondaryButton, t, n),
        e & Ep.AuxiliaryButton && this.emitMouseDown(kp.AuxiliaryButton, t, n),
        e & Ep.FourthButton && this.emitMouseDown(kp.FourthButton, t, n),
        e & Ep.FifthButton && this.emitMouseDown(kp.FifthButton, t, n)
    }
    releaseMouseButtons(e, t, n) {
        e & Ep.PrimaryButton && this.emitMouseUp(kp.MainButton, t, n),
        e & Ep.SecondaryButton && this.emitMouseUp(kp.SecondaryButton, t, n),
        e & Ep.AuxiliaryButton && this.emitMouseUp(kp.AuxiliaryButton, t, n),
        e & Ep.FourthButton && this.emitMouseUp(kp.FourthButton, t, n),
        e & Ep.FifthButton && this.emitMouseUp(kp.FifthButton, t, n)
    }
    registerLockedMouseEvents() {
        const e = this.video;
        e.addEventListener("click", (()=>{
            e.requestPointerLock()
        }
        )),
        document.addEventListener("pointerlockchange", this.lockStateChange, !1),
        document.addEventListener("mozpointerlockchange", this.lockStateChange, !1),
        e.addEventListener("mousedown", (e=>{
            this.emitMouseDown(e.button, this.x, this.y)
        }
        )),
        e.addEventListener("mouseup", (e=>{
            this.emitMouseUp(e.button, this.x, this.y)
        }
        )),
        e.addEventListener("wheel", (e=>{
            this.emitMouseWheel(e.deltaX - e.deltaY, this.x, this.y)
        }
        ))
    }
}
class LA extends FA {
    constructor(e, t) {
        super(e, t),
        this.normalizeAndQuantizeUnsigned = (e,t)=>({
            inRange: !0,
            x: e,
            y: t
        }),
        this.normalizeAndQuantizeSigned = void 0,
        this.unquantizeAndDenormalizeUnsigned = void 0,
        this._orientationChangeTimeout = void 0,
        "ontouchstart"in document.documentElement && this.createOnScreenKeyboardHelpers(),
        this.setupNormalizeAndQuantize(),
        window.addEventListener("resize", (()=>this.onOrientationChange()), !0),
        window.addEventListener("orientationchange", (()=>this.onOrientationChange()))
    }
    registerInputs() {
        super.registerInputs(),
        this.registerTouchEvents()
    }
    onOrientationChange() {
        clearTimeout(this._orientationChangeTimeout),
        this._orientationChangeTimeout = setTimeout((()=>{
            this.setupNormalizeAndQuantize()
        }
        ), 500)
    }
    setupNormalizeAndQuantize() {
        const e = this.webrtc_client.dom.container
          , t = this.video;
        if (e) {
            const n = e.clientHeight / e.clientWidth
              , i = t.clientHeight / t.clientWidth;
            if (n > i) {
                const t = n / i;
                this.normalizeAndQuantizeUnsigned = (n,i)=>{
                    const r = n / e.clientWidth
                      , o = t * (i / e.clientHeight - .5) + .5;
                    return r < 0 || r > 1 || o < 0 || o > 1 ? {
                        inRange: !1,
                        x: 65535,
                        y: 65535
                    } : {
                        inRange: !0,
                        x: 65536 * r,
                        y: 65536 * o
                    }
                }
                ,
                this.unquantizeAndDenormalizeUnsigned = (n,i)=>{
                    const r = (i / 65536 - .5) / t + .5;
                    return {
                        x: n / 65536 * e.clientWidth,
                        y: r * e.clientHeight
                    }
                }
                ,
                this.normalizeAndQuantizeSigned = (n,i)=>({
                    x: 32767 * (n / (.5 * e.clientWidth)),
                    y: 32767 * (t * i / (.5 * e.clientHeight))
                })
            } else {
                const t = i / n;
                this.normalizeAndQuantizeUnsigned = (n,i)=>{
                    const r = t * (n / e.clientWidth - .5) + .5
                      , o = i / e.clientHeight;
                    return r < 0 || r > 1 || o < 0 || o > 1 ? {
                        inRange: !1,
                        x: 65535,
                        y: 65535
                    } : {
                        inRange: !0,
                        x: 65536 * r,
                        y: 65536 * o
                    }
                }
                ,
                this.unquantizeAndDenormalizeUnsigned = (n,i)=>{
                    const r = i / 65536;
                    return {
                        x: ((n / 65536 - .5) / t + .5) * e.clientWidth,
                        y: r * e.clientHeight
                    }
                }
                ,
                this.normalizeAndQuantizeSigned = (n,i)=>({
                    x: 32767 * (t * n / (.5 * e.clientWidth)),
                    y: 32767 * (i / (.5 * e.clientHeight))
                })
            }
        }
    }
    showOnScreenKeyboard(e) {
        if (e.showOnScreenKeyboard) {
            if (!this.editTextButton)
                return;
            this.editTextButton.classList.remove("hiddenState");
            const t = this.player.aspectRatio.unquantizeAndDenormalizeUnsigned(e.x, e.y, this.webrtc_client.playerResolution.videoRes);
            if (!t)
                return;
            this.editTextButton.style.top = `${t.y.toString()}px`,
            this.editTextButton.style.left = `${(t.x - 40).toString()}px`
        } else {
            var t, n;
            null == (t = this.editTextButton) || t.classList.add("hiddenState"),
            null == (n = this.hiddenInput) || n.blur()
        }
    }
    createOnScreenKeyboardHelpers() {
        this.webrtc_client.dom.hiddenInput,
        this.webrtc_client.dom.editTextButton
    }
    registerTouchEvents() {
        const e = this.video
          , t = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
          , n = {};
        function i(e) {
            const i = t.pop();
            void 0 === i && vg.verbose("exhausted touch indentifiers"),
            n[e.identifier] = i
        }
        const r = (e,t)=>{
            const i = "5.xx" === this.webrtc_client.streamInfo.meta.ueVersion
              , r = i ? new DataView(new ArrayBuffer(2 + 7 * t.length)) : new DataView(new ArrayBuffer(2 + 6 * t.length));
            r.setUint8(0, e),
            r.setUint8(1, t.length);
            let o = 2;
            if ("object" == typeof t)
                for (const e of Object.values(t)) {
                    const t = this.player.aspectRatio.normalizeTouchScreen(e.clientX, e.clientY, this.video);
                    FA.PrintInputs && vg.verbose(`F ${n[e.identifier]}=(${t.x}, ${t.y})`),
                    r.setUint16(o, t.x, !0),
                    o += 2,
                    r.setUint16(o, t.y, !0),
                    o += 2,
                    r.setUint8(o, n[e.identifier]),
                    o += 1,
                    r.setUint8(o, 255 * e.force),
                    o += 1,
                    i && (r.setUint8(o, t.inRange ? 1 : 0),
                    o += 1)
                }
            this.webrtc_client.sendInputData(r.buffer)
        }
          , o = new URLSearchParams(window.location.search);
        if (!this.webrtc_client.inputOptions.fakeMouseWithTouches && !1 !== this.webrtc_client.streamInfo.touchCapable || "true" === o.get("touchCapable"))
            e.addEventListener("touchstart", (e=>{
                for (let t = 0; t < e.changedTouches.length; t++)
                    i(e.changedTouches[t]);
                FA.PrintInputs && vg.verbose("touch start"),
                r(Sp.ToUE4Message.TouchStart, e.changedTouches),
                e.preventDefault()
            }
            )),
            e.addEventListener("touchend", (e=>{
                FA.PrintInputs && vg.verbose("touch end"),
                r(Sp.ToUE4Message.TouchEnd, e.changedTouches);
                for (let r = 0; r < e.changedTouches.length; r++)
                    i = e.changedTouches[r],
                    t.push(n[i.identifier]),
                    t.sort(((e,t)=>t - e)),
                    delete n[i.identifier];
                var i;
                e.preventDefault()
            }
            )),
            e.addEventListener("touchmove", (e=>{
                FA.PrintInputs && vg.verbose("touch move"),
                r(Sp.ToUE4Message.TouchMove, e.touches),
                e.preventDefault()
            }
            ));
        else {
            let t;
            e.addEventListener("touchstart", (n=>{
                if (void 0 === t && this.webrtc_client.dom.video) {
                    const i = n.changedTouches[0];
                    t = {
                        id: i.identifier,
                        x: i.clientX - this.webrtc_client.dom.video.getBoundingClientRect().left,
                        y: i.clientY - this.webrtc_client.dom.video.getBoundingClientRect().top
                    },
                    "function" == typeof e.onmouseenter && e.onmouseenter({}),
                    this.emitMouseDown(kp.MainButton, t.x, t.y)
                }
                n.preventDefault()
            }
            )),
            e.addEventListener("touchend", (n=>{
                for (let r = 0; r < n.changedTouches.length; r++) {
                    var i;
                    const o = n.changedTouches[r];
                    if (o.identifier === (null == (i = t) ? void 0 : i.id) && this.webrtc_client.dom.video) {
                        const n = o.clientX - this.webrtc_client.dom.video.getBoundingClientRect().left
                          , i = o.clientY - this.webrtc_client.dom.video.getBoundingClientRect().top;
                        this.emitMouseUp(kp.MainButton, n, i),
                        "function" == typeof e.onmouseleave && e.onmouseleave({}),
                        t = void 0;
                        break
                    }
                }
                n.preventDefault()
            }
            )),
            e.addEventListener("touchmove", (e=>{
                for (let i = 0; i < e.touches.length; i++) {
                    var n;
                    const r = e.touches[i];
                    if (r.identifier === (null == (n = t) ? void 0 : n.id) && this.webrtc_client.dom.video) {
                        const e = r.clientX - this.webrtc_client.dom.video.getBoundingClientRect().left
                          , n = r.clientY - this.webrtc_client.dom.video.getBoundingClientRect().top;
                        this.emitMouseMove(e, n, e - t.x, n - t.y),
                        t.x = e,
                        t.y = n;
                        break
                    }
                }
                e.preventDefault()
            }
            ))
        }
    }
}
class DA extends LA {
    constructor(e, t) {
        super(e, t),
        this.createWebRtcOffer()
    }
    createWebRtcOffer() {
        this.player ? (vg.silly("Starting connection to server and creating offer."),
        this.player.createOffer()) : vg.warn("Unable to setup video. WebRTC player has been setup, cannot create offer.")
    }
}
function UA(e, t) {
    if ("object" == typeof t) {
        Object.keys(t).forEach((e=>{
            t[e].width && t[e].height && (t[e] = `${t[e].width.toFixed(1)}x ${t[e].height.toFixed(1)}`)
        }
        ));
        const e = t;
        e.width && e.height && (t = `${e.width.toFixed(1)}x ${e.height.toFixed(1)}`)
    }
    return "number" == typeof t ? t.toFixed(1) : t
}
class jA extends IS {
    get socket() {
        return this.webrtc_client.socket
    }
    get freezeFrame() {
        return this.input.freezeFrame
    }
    constructor(e, t, n) {
        var i, r;
        super(n, e, t),
        this.webrtc_client = void 0,
        this.input = void 0,
        this.aspectRatio = void 0,
        this.printInterval = 3e5,
        this.nextPrintDuration = this.printInterval,
        this.webrtc_client = n,
        this.aspectRatio = new AS(this.webrtc_client.dom.container,null == (i = this.webrtc_client) || null == (r = i.dom) ? void 0 : r.video),
        this.input = new DA(this.webrtc_client,this),
        this.webrtc_client.dispatch(Sa.RTCPlayerCreated)
    }
    onWebRtcOffer(e) {
        var t;
        if (null != (t = this.socket) && t.ready()) {
            const t = JSON.stringify(e);
            vg.silly(`-> SS: offer:\n ${t}`),
            this.socket.send(t)
        }
    }
    onWebRtcCandidate(e) {
        var t;
        this.ready() && (vg.silly(`-> SS: iceCandidate\n ${JSON.stringify(e, void 0, 4)}`),
        null == (t = this.socket) || t.send(JSON.stringify({
            type: "iceCandidate",
            candidate: e
        })))
    }
    onDataChannelConnected() {
        this.webrtc_client.playerResolution.setResolution(),
        this.ready() && (vg.silly("WebRTC connected, waiting for video ..."),
        this.webrtc_client.dispatch(new ka(Ia.dataChannelReady)))
    }
    onDataChannelClosed() {
        this.webrtc_client.dispatch(Sa.DataChannelClosed)
    }
    ready() {
        var e;
        return null == (e = this.socket) ? void 0 : e.ready()
    }
    onVideoInitialized() {
        var e;
        (this.webrtc_client.websocketClosed = !1,
        requestAnimationFrame((()=>setTimeout((()=>{
            var e, t, n;
            this.webrtc_client.dom.video && (this.webrtc_client.dom.video.style.transform = "translateX(0)",
            this.webrtc_client.dom.video.style.opacity = "1",
            this.webrtc_client && (null == (e = this.webrtc_client) || e.loader(!1),
            null == (t = this.webrtc_client) || null == (n = t.socket) || n.resetReconnectAttempts()))
        }
        )))),
        this.ready() && this.webrtc_client.shouldShowPlayOverlay) && (null == (e = this.socket) || e.send(JSON.stringify({
            type: "onVideoInitialized"
        })),
        vg.silly("Video initialized. State reported to signalling."),
        this.webrtc_client.dispatch(Sa.VideoInitialized))
    }
    onVideoPlay() {
        this.webrtc_client.dispatch(Sa.VideoPlay)
    }
    onDataChannelMessage(e) {
        const t = new Uint8Array(e);
        if (this.freezeFrame.receiving && this.freezeFrame.jpeg) {
            const e = new Uint8Array(this.freezeFrame.jpeg.length + t.length);
            e.set(this.freezeFrame.jpeg, 0),
            e.set(t, this.freezeFrame.jpeg.length),
            this.freezeFrame.jpeg = e,
            this.freezeFrame.jpeg.length === this.freezeFrame.size ? (this.freezeFrame.receiving = !1,
            this.freezeFrame.valid = !0,
            vg.verbose(`received complete freeze frame ${this.freezeFrame.size}`),
            this.input.showFreezeFrame()) : this.freezeFrame.jpeg.length > this.freezeFrame.size ? (vg.verbose(`received bigger freeze frame than advertised: ${this.freezeFrame.jpeg.length}/${this.freezeFrame.size}`),
            this.freezeFrame.jpeg = void 0,
            this.freezeFrame.receiving = !1) : vg.verbose(`received next chunk (${t.length} bytes) of freeze frame: ${this.freezeFrame.jpeg.length}/${this.freezeFrame.size}`)
        } else if (t[0] === Ap.QualityControlOwnership)
            ;
        else if (t[0] === Ap.Response) {
            const t = new TextDecoder("utf-16").decode(e.slice(1));
            this.webrtc_client.applicationResponse(t),
            vg.verbose(t)
        } else if (t[0] === Ap.Command) {
            const t = new TextDecoder("utf-16").decode(e.slice(1));
            vg.verbose(t);
            const n = JSON.parse(t);
            "onScreenKeyboard" === n.command && this.input.showOnScreenKeyboard(n)
        } else
            t[0] === Ap.FreezeFrame ? (this.freezeFrame.size = new DataView(t.slice(1, 5).buffer).getInt32(0, !0),
            this.freezeFrame.jpeg = t.slice(5),
            this.freezeFrame.jpeg.length < this.freezeFrame.size ? (vg.verbose(`received first chunk of freeze frame: ${this.freezeFrame.jpeg.length}/${this.freezeFrame.size}`),
            this.freezeFrame.receiving = !0) : (vg.verbose(`received complete freeze frame: ${this.freezeFrame.jpeg.length}/${this.freezeFrame.size}`),
            this.input.showFreezeFrame())) : t[0] === Ap.UnfreezeFrame ? this.freezeFrame.invalidateFreezeFrameOverlay() : t[0] === Ap.VideoEncoderAvgQP ? vg.verbose(`VideoEncoderAvgQP ${t}`) : vg.verbose(`unrecognised data received, packet ID ${t[0]}`)
    }
    reportIncomingVideoSize(e, t) {
        void 0 !== e && void 0 !== t && (this.webrtc_client.playerResolution.videoRes = {
            width: e,
            height: t
        })
    }
    onAggregatedStats(e) {
        if (this.reportIncomingVideoSize(e.frameWidth, e.frameHeight),
        this.webrtc_client.dom.stats && this.webrtc_client.renderStats) {
            var t;
            const n = new Intl.NumberFormat(window.navigator.language,{
                maximumFractionDigits: 0
            })
              , i = function(t) {
                return "number" == typeof t ? n.format(t) : "currentRoundTripTime" == t ? n.format(1e3 * e[t]) : void 0 !== e[t] ? n.format(e[t]) : "N/A"
            }
              , [r,o] = function(e) {
                let t = "B"
                  , n = e.bytesReceived ? e.bytesReceived : 0;
                const i = ["kB", "MB", "GB"];
                for (const e of i) {
                    if (n < 1e5)
                        break;
                    n /= 1e3,
                    t = e
                }
                return [t, n]
            }(e)
              , s = null == (t = this.webrtc_client.dom.video) ? void 0 : t.getBoundingClientRect();
            let a, c;
            jA.ShowPackageDataWithStats && this.webrtc_client.streamInfo && (a = `${JSON.stringify(JSON.parse(JSON.stringify(this.webrtc_client.streamInfo)), UA, 2)}`.split("\n").join("</br>").split("{").join("").split("}").join("")),
            jA.ShowMaxResolution && (c = `max res: ${JSON.stringify(this.webrtc_client.playerResolution.getMaxResolution(), UA)}`.split("\n").join("</br>").split("{").join("").split("}").join(""));
            const u = [`Duration: ${RS(e)}`, "Video Resolution: " + (e.frameWidth && e.frameHeight ? `${e.frameWidth}x ${e.frameHeight}` : "N/A"), s ? `Video Element Resolution: ${Math.floor(s.width)}x ${Math.floor(s.height)}` : null, `Received (${r}): ${i(o)}`, `Frames Decoded: ${i("framesDecoded")}`, `Packets Lost: ${i("packetsLost")}`, `Average Bitrate (kbps): ${i("avgBitrate")}`, `Bitrate (kbps): ${i("bitrate")}`, `Low Bitrate (kbps): ${i("lowBitrate")}`, `Hight Bitrate (kbps): ${i("highBitrate")}`, `Average Framerate: ${i("avgframerate")}`, `Framerate: ${i("framerate")}`, `High framerate: ${i("highFramerate")}`, `Frames dropped: ${i("framesDropped")}`, `Frames dropped percentage: ${i("framesDroppedPercentage")} %`, `Latency (ms): ${i("currentRoundTripTime")}`, (c || a) && " ", c || null, a || null].filter((e=>!!e)).join("</br>");
            this.webrtc_client.dom.stats.innerHTML = u
        } else
            this.webrtc_client.dom.stats && this.webrtc_client.dom.stats.innerHTML && (this.webrtc_client.dom.stats.innerHTML = "");
        if (e.timestampStart && e.timestamp - e.timestampStart > this.nextPrintDuration) {
            var n;
            if (this.ready())
                vg.verbose("Sending stats to signalling."),
                null == (n = this.socket) || n.send(JSON.stringify({
                    type: "stats",
                    data: e
                }));
            this.nextPrintDuration += this.printInterval
        }
    }
}
function MA(e, t, n) {
    const i = {
        value: t,
        expiry: void 0 === n ? void 0 : Date.now() + 1e3 * n
    };
    localStorage.setItem(e, JSON.stringify(i))
}
function PA(e) {
    const t = localStorage.getItem(e);
    if (!t)
        return null;
    const n = JSON.parse(t);
    return n.expiry && Date.now() > n.expiry ? (localStorage.removeItem(e),
    null) : n.value
}
jA.ShowPackageDataWithStats = !0,
jA.ShowMaxResolution = !0;
class BA {
    get input() {
        var e;
        return null == (e = this.player) ? void 0 : e.input
    }
    get ws() {
        return this._ws
    }
    constructor(e, t=!0, n) {
        if (this.no_auth = t,
        this._keycloak = n,
        this.rememberSession = !0,
        this.webrtc_client = void 0,
        this.player = void 0,
        this._ws = void 0,
        this.url = void 0,
        this.onWebSocketMessages = {
            error: e=>{
                var t, n;
                e.verbosity < this.webrtc_client.verbosityLevel && (null == (t = this.webrtc_client) || null == (n = t.snackbar) || n.enqueueSnackbar(e.reason, {
                    variant: "warning",
                    autoHideDuration: this.webrtc_client.socket.reconnect.delay
                }, 0 !== e.reason.indexOf("LL: ") && this.webrtc_client.socket.reconnect.inProgress));
                vg.warn(e.reason, e),
                1 != e.code && 3 != e.code && 4 != e.code && 6 != e.code || this.webrtc_client.dispatch(Sa.NoStreamAvailable)
            }
            ,
            config: e=>{
                const t = ()=>{
                    var t, n, i, r, o, s, a;
                    const c = null == (t = this.webrtc_client) ? void 0 : t.touchRegistered;
                    var u, l;
                    if (this.player = new jA(e,{
                        audio: !0,
                        video: !0,
                        autoPlay: null != (n = this.webrtc_client.streamInfo.autoPlay) && n
                    },this.webrtc_client),
                    null != (i = this.webrtc_client) && null != (r = i.streamInfo) && r.afk && (this.webrtc_client.afk.enabled = this.webrtc_client.streamInfo.afk.enabled,
                    this.webrtc_client.afk.warnTime = 1e3 * this.webrtc_client.streamInfo.afk.warn,
                    this.webrtc_client.afk.errorTime = 1e3 * this.webrtc_client.streamInfo.afk.error,
                    this.webrtc_client.afk.actionTime = 1e3 * this.webrtc_client.streamInfo.afk.action),
                    !c)
                        switch (this.webrtc_client.inputOptions.controlScheme = !0 === (null == (u = this.webrtc_client.streamInfo) || null == (l = u.meta) ? void 0 : l.mouseLock) ? Ip.LockedMouse : Ip.HoveringMouse,
                        this.webrtc_client.inputOptions.controlScheme) {
                        case Ip.HoveringMouse:
                            null == (o = this.input) || o.registerHoveringMouseEvents();
                            break;
                        case Ip.LockedMouse:
                            null == (s = this.input) || s.registerLockedMouseEvents();
                            break;
                        default:
                            vg.error(`ERROR: Unknown control scheme ${this.webrtc_client.inputOptions.controlScheme}`),
                            null == (a = this.input) || a.registerLockedMouseEvents()
                        }
                }
                ;
                this.webrtc_client.hasStreamInfo ? t() : this.webrtc_client.events.addListener(Ea, (()=>{
                    t()
                }
                ))
            }
            ,
            iceCandidate: e=>{
                this.player && e.candidate && this.player.handleCandidateFromServer(e.candidate)
            }
            ,
            answer: e=>{
                if (!this.player)
                    return void vg.info("Player is undefined");
                this.player.receiveAnswer(e);
                vg.info("Socket.onAnswer() Starting aggregateStats timer with interval 0.25s."),
                this.player.aggregateStats(250)
            }
            ,
            streamInfo: e=>{
                this.webrtc_client.streamInfo = e.streamInfo,
                e.streamInfo && this.webrtc_client.dispatch(new Ea(e.streamInfo))
            }
            ,
            sessionId: e=>{
                this.rememberSession && e.sessionId && (MA("sessionId", {
                    session: e.sessionId,
                    project: this.webrtc_client.packageId
                }, 15),
                this.webrtc_client.events.addListener(Sa.WebsocketClosed, (()=>{
                    this.rememberSession && !function(e) {
                        const t = localStorage.getItem(e);
                        return t ? !!JSON.parse(t).expiry : null
                    }("sessionId") && MA("sessionId", {
                        session: e.sessionId,
                        project: this.webrtc_client.packageId
                    }, 15)
                }
                )))
            }
            ,
            ping: ()=>{
                this.send(JSON.stringify({
                    type: "pong"
                })),
                vg.silly("Received 'ping', answering 'pong'.");
                const e = PA("sessionId");
                this.rememberSession && null != e && e.session && MA("sessionId", {
                    session: e.session,
                    project: this.webrtc_client.packageId
                }, 15)
            }
            ,
            queue: e=>{
                var t;
                null == (t = this.webrtc_client) || t.updateQueueData(e.queue)
            }
            ,
            letter: e=>{
                var t;
                (null == (t = this.webrtc_client) ? void 0 : t.sendLetter) && this.webrtc_client.sendLetter(e.reason.slice(4))
            }
        },
        this.defaultAttempts = 6,
        this.defaultReconnectDelay = 8e3,
        this.reconnect = {
            attempts: this.defaultAttempts,
            attemptsLeft: this.defaultAttempts,
            inProgress: !0,
            delay: this.defaultReconnectDelay,
            lastReconnectTime: Date.now() - this.defaultReconnectDelay,
            reconnectBlocked: !1
        },
        this.resetReconnectAttempts = ()=>{
            this.reconnect.attemptsLeft = this.reconnect.attempts,
            this.reconnect.inProgress = !0
        }
        ,
        0 != e.indexOf("wss://") && 0 != e.indexOf("ws://"))
            throw new Error(`The url '${e}' is not starting with ws:// or wss://`);
        this.url = e
    }
    get keycloak() {
        return e(this.webrtc_client.clientId, this.webrtc_client.keycloakUrl)
    }
    get keycloakToken() {
        var t;
        return this.no_auth ? Promise.resolve("") : this._keycloak ? Promise.resolve(null != (t = this._keycloak.token) ? t : "") : e(this.webrtc_client.clientId, this.webrtc_client.keycloakUrl).then((e=>{
            var t;
            return this._keycloak = e,
            null != (t = this._keycloak.token) ? t : ""
        }
        ))
    }
    async init(e, t) {
        this.webrtc_client = e,
        t && (this.webrtc_client.dom.video.autoplay = !0);
        const n = await this.keycloakToken;
        this.webrtc_client.websocketClosed = !1;
        const i = PA("sessionId")
          , r = new URLSearchParams(window.location.search)
          , o = r.get("b")
          , s = r.get("rId")
          , a = i && i.project === this.webrtc_client.packageId
          , c = null != this.webrtc_client.sessionId ? this.webrtc_client.sessionId : a && i.session
          , u = (()=>{
            const e = [];
            return this.webrtc_client.packageId && e.push(`p=${this.webrtc_client.packageId}`),
            c && e.push(`s=${c}`),
            n && e.push(`t=${n}`),
            c && a && e.push("r=true"),
            "true" === o && e.push("b=true"),
            this.webrtc_client.shareId && e.push(`sh=${this.webrtc_client.shareId}`),
            s && e.push(`rId=${s}`),
            e
        }
        )()
          , l = `${this.url}?${u.join("&")}`;
        this._ws = new WebSocket(l),
        this.ws.addEventListener("error", (e=>{
            var t, n;
            vg.error("WS error:", e),
            null == (t = this.webrtc_client) || null == (n = t.snackbar) || n.enqueueSnackbar(e, {
                variant: "warning"
            }, this.webrtc_client.socket.reconnect.inProgress)
        }
        )),
        this.ws.addEventListener("close", (e=>{
            var t, n;
            (vg.warn(`WS closed: ${JSON.stringify(e.code)} - ${e.reason}`),
            4606 === e.code && e.reason.includes("Unauthorized")) && (null == (t = (n = this.webrtc_client).unauthorizedFallback) || t.call(n));
            4506 == e.code && (this.webrtc_client.disconnectedDueToAfk = !0),
            1e3 === e.code && "The maximum run time has been reached." === e.reason && this.blockReconnect(),
            this.webrtc_client.dispatch(Sa.WebsocketClosed),
            4500 == e.code && this.webrtc_client.dispatch(new Ca(e.reason)),
            this.player && (this.player.close(),
            this.player = void 0)
        }
        )),
        this.ws.addEventListener("message", (e=>{
            const t = JSON.parse(e.data);
            this.onWebSocketMessages[t.type] && this.onWebSocketMessages[t.type](t)
        }
        ))
    }
    ready() {
        return this.ws && this.ws.readyState === WebSocket.OPEN
    }
    send(e) {
        if (!this.ready())
            throw new Error("Cannot send data. Websocket is not open.");
        this.ws.send(e)
    }
    close(e, t) {
        var n;
        null == (n = this.ws) || n.close(e, t)
    }
    reconnectAttempt() {
        const e = Date.now() - this.reconnect.delay + 25 < this.reconnect.lastReconnectTime;
        this.reconnect.attemptsLeft > 0 && !this.reconnect.reconnectBlocked && Date.now() && !e && (this.reconnect.lastReconnectTime = Date.now(),
        this.reconnect.attemptsLeft--,
        0 === this.reconnect.attemptsLeft && (this.reconnect.inProgress = !1),
        setTimeout((()=>{
            this.reconnect.reconnectBlocked || (this.ready() && this.close(4507, "Client reconnecting."),
            this.init(this.webrtc_client, !0).then((()=>!0)).catch((()=>{}
            )))
        }
        ), this.reconnect.delay))
    }
    blockReconnect() {
        this.reconnect.reconnectBlocked = !0
    }
}
class HA {
    static get Next() {
        return this.next++
    }
    get identifier() {
        return `${this.constructor.name}_ ${this.id}`
    }
    get address() {
        return this._address
    }
    get packageId() {
        return this._packageId
    }
    set streamInfo(e) {
        this._streamInfo = e
    }
    get streamInfo() {
        return this._streamInfo || vg.verbose("Using stream information, before receiving streaminfo."),
        this._streamInfo
    }
    get hasStreamInfo() {
        return !!this._streamInfo
    }
    get socket() {
        return this._socket
    }
    dispatch(e) {
        return this.events.dispatch(e)
    }
    constructor(e, t, n, i, r) {
        var o, s, a, c;
        this.settings = r,
        this.playerResolution = void 0,
        this.websocketClosed = void 0,
        this.orientationZoom = void 0,
        this.id = void 0,
        this.playerStyle = {
            styleHeight: 0,
            styleWidth: 0,
            styleLeft: 0,
            styleTop: 0
        },
        this._address = void 0,
        this.sessionId = void 0,
        this.shareId = void 0,
        this._packageId = void 0,
        this._streamInfo = void 0,
        this.afk = void 0,
        this.dom = void 0,
        this.style = {
            additional: "",
            cursor: "default"
        },
        this._socket = void 0,
        this.events = (new Lg).setupRequiredListeners(Sa.NoStreamAvailable),
        this.emitUIInteraction = e=>{
            this.emitDescriptor(Sp.ToUE4Message.UIInteraction, e)
        }
        ,
        setTimeout((()=>{
            const e = this.events.checkRequiredListeners();
            e.missing.length > 0 && vg.error(`Missing event listeners: [${e.missing.map((e=>`"${e}"`)).join(", ")}]`)
        }
        ), 1e3),
        this.id = HA.Next,
        this._address = e,
        this._packageId = t,
        this.sessionId = n,
        this.shareId = i,
        this.websocketClosed = !1,
        this.afk = new gg(this.events,null == r || null == (o = r.afk) ? void 0 : o.enabled,null == r || null == (s = r.afk) ? void 0 : s.warnTime,null == r || null == (a = r.afk) ? void 0 : a.errorTime,null == r || null == (c = r.afk) ? void 0 : c.actionTime),
        this.events.addListener(Sa.AFK_Action, (()=>{
            this.socket.close(4506, "AFK")
        }
        )),
        this.initDomHelper(),
        this._socket = new BA(e,r.no_auth,r.keycloak)
    }
    initDomHelper() {
        this.dom = new Hb,
        this.dom.editTextButton = this.dom.editTextButtonSelector(),
        this.dom.hiddenInput = this.dom.hiddenInputSelector(),
        this.dom.streamingVideo = this.dom.streamingVideoSelector()
    }
    emitCommand(e) {
        this.emitDescriptor(Sp.ToUE4Message.Command, e)
    }
    emitDescriptor(e, t) {
        this.sendInputData(Sp.ToBuffer(e, t))
    }
    requestQualityControl() {
        this.sendInputData(new Uint8Array([Sp.ToUE4Message.RequestQualityControl]).buffer)
    }
    setStreamResolution(e) {
        const t = {
            Console: `r.setres ${e.width}x ${e.height}w`
        };
        "5.xx" === this.streamInfo.meta.ueVersion ? this.emitCommand({
            "Resolution.Width": Math.round(e.width),
            "Resolution.Height": Math.round(e.height)
        }) : this.emitUIInteraction(t),
        vg.silly(`RTC send command: ${JSON.stringify(t)}`)
    }
}
HA.PrintInputs = !1,
HA.next = 0;
class NA {
    constructor(e) {
        this.webrtc_player = e,
        this.delayResize = new mg(1e3),
        this.blockResize = new mg(1e3),
        this._isDynamic = void 0,
        this._videoRes = void 0
    }
    set isDynamic(e) {
        this._isDynamic = e
    }
    get isDynamic() {
        var e, t;
        return void 0 !== this._isDynamic ? this._isDynamic : !(null == (e = this.webrtc_player.streamInfo) || null == (t = e.resolution) || !t.dynamic)
    }
    set videoRes(e) {
        var t, n;
        (null == (t = this._videoRes) ? void 0 : t.width) == (null == e ? void 0 : e.width) && (null == (n = this._videoRes) ? void 0 : n.height) == (null == e ? void 0 : e.height) || (this._videoRes = e,
        vg.silly(`VideoRes changed to ${JSON.stringify(e)}`))
    }
    get videoRes() {
        return this._videoRes
    }
    getMaxResolution() {
        const e = this._getMaxResolution();
        return e.width = Math.floor(e.width),
        e.height = Math.floor(e.height),
        e.width = e.width % 2 + e.width,
        e.height = e.height % 2 + e.height,
        e
    }
    _getMaxResolution() {
        const {sizeContainer: e} = this.webrtc_player.dom
          , t = this.webrtc_player.streamInfo.resolution || NA.NamedSizes.UHD
          , {clientWidth: n, clientHeight: i} = e
          , r = {
            width: n,
            height: i
        };
        if (this.isDynamic) {
            if (t)
                return {
                    width: t.width,
                    height: t.height
                };
            throw new Error("Max size of package has to be at leas UHD.")
        }
        const o = t.width / t.height;
        return r.width / r.height > o ? {
            width: r.height * o,
            height: r.height
        } : {
            width: r.width,
            height: r.width / o
        }
    }
    setResolution() {
        const e = {
            width: 0,
            height: 0
        };
        if (this.webrtc_player.streamInfo) {
            const {container: i, video: r} = this.webrtc_player.dom
              , {width: o, height: s} = this.webrtc_player.streamInfo.resolution;
            if (!i)
                return e;
            const a = this.getMaxResolution();
            if (Number.isNaN(a.width) || Number.isNaN(a.width))
                return e;
            if (r) {
                var t, n;
                const {dom: {sizeContainer: {clientWidth: i, clientHeight: r}}} = this.webrtc_player
                  , c = function(e, t) {
                    const n = {
                        width: 0,
                        height: 0
                    };
                    if (n.width = Math.floor(e.width),
                    n.height = Math.floor(e.height),
                    n.height > t.height) {
                        const e = t.height / n.height;
                        n.height = t.height,
                        n.width *= e
                    }
                    if (n.width > t.width) {
                        const e = t.width / n.width;
                        n.width = t.width,
                        n.height *= e
                    }
                    return n.width = n.width % 2 + n.width,
                    n.height = n.height % 2 + n.height,
                    n
                }({
                    width: i * Math.max(window.devicePixelRatio, 1.25),
                    height: r * Math.max(window.devicePixelRatio, 1.25)
                }, a);
                this.webrtc_player.orientationZoom && (c.width < c.height ? this.webrtc_player.orientationZoom.hasOwnProperty.call(this.webrtc_player.orientationZoom, "portrait") && this.webrtc_player.zoom(this.webrtc_player.orientationZoom.portrait) : this.webrtc_player.orientationZoom.hasOwnProperty.call(this.webrtc_player.orientationZoom, "landscape") && this.webrtc_player.zoom(this.webrtc_player.orientationZoom.landscape)),
                this.webrtc_player.sendResolutionOnResize ? this.isDynamic ? this.updateVideoStreamSize(c) : this.updateVideoStreamSize({
                    width: o,
                    height: s
                }) : this.webrtc_player.requestQualityControl(),
                null == (t = this.webrtc_player) || null == (n = t.input) || n.resizeFreezeFrameOverlay();
                const {identifier: u} = this.webrtc_player;
                vg.silly(`${u} setResolution ${this.isDynamic ? "dynamic" : "strict"}: ${JSON.stringify(e)}`)
            }
        }
        return e
    }
    updateVideoStreamSize(e) {
        const {container: t} = this.webrtc_player.dom;
        !this.blockResize.running && t && (this.setStreamResolution(e),
        this.blockResize.start())
    }
    setStreamResolution(e) {
        this.webrtc_player.streamInfo.resolution.fixed && (e.height != this.webrtc_player.streamInfo.resolution.height && (e.height = this.webrtc_player.streamInfo.resolution.height),
        e.width != this.webrtc_player.streamInfo.resolution.width && (e.width = this.webrtc_player.streamInfo.resolution.width)),
        this.webrtc_player.setStreamResolution(e)
    }
}
NA.NamedSizes = {
    HD: {
        width: 1920,
        height: 1080
    },
    UHD: {
        width: 3840,
        height: 2160
    }
};
class QA extends HA {
    get renderStats() {
        return "true" === localStorage.getItem("ShowStats") || this.renderStatsEnabled
    }
    get player() {
        return this.socket.player
    }
    get input() {
        var e;
        return null == (e = this.player) ? void 0 : e.input
    }
    constructor(e) {
        var t;
        super(e.address, e.packageId, e.sessionId, e.shareId, e.settings),
        this.playerResolution = void 0,
        this.renderStatsEnabled = !1,
        this.shouldShowPlayOverlay = !0,
        this.onOrientationChanged = this.onOrientationChange.bind(this),
        this.onResize = ()=>{}
        ,
        this.delayOrientationChange = new mg(500),
        this.inputOptions = {
            controlScheme: Ip.LockedMouse,
            suppressBrowserKeys: !1,
            fakeMouseWithTouches: !1
        },
        this.loader = void 0,
        this.snackbar = void 0,
        this.videoInitializeCallback = void 0,
        this.applicationResponse = void 0,
        this.videoRef = void 0,
        this.audioRef = void 0,
        this.touchRegistered = void 0,
        this.disconnectedDueToAfk = void 0,
        this.forceVideoToFitContainer = !0,
        this.extmapAllowMixed = !0,
        this.autoplay = void 0,
        this.playOverlay = void 0,
        this.verbosityLevel = void 0,
        this.updateQueueData = void 0,
        this.sendResolutionOnResize = void 0,
        this.unauthorizedFallback = void 0,
        this.sendLetter = void 0,
        this.keycloakUrl = void 0,
        this.clientId = void 0,
        this.containersStyles = {
            sizeContainer: {},
            container: {
                width: "auto",
                height: "auto"
            },
            video: {}
        },
        this.setContainersStyles = (e,t,n)=>{
            for (const [i,r] of Object.entries(n))
                e.style[i] = r,
                this.containersStyles[t][i] = r
        }
        ,
        this.revertToLastSavedContainersStyles = ()=>{
            for (const [e,t] of Object.entries(this.containersStyles.sizeContainer))
                this.dom.sizeContainer.style[e] = t;
            for (const [e,t] of Object.entries(this.containersStyles.container))
                this.dom.container.style[e] = t;
            for (const [e,t] of Object.entries(this.containersStyles.video))
                this.dom.video.style[e] = t
        }
        ,
        this.adjustContainerFit = ()=>{
            const {videoWidth: e} = this.dom.video
              , {videoHeight: t} = this.dom.video;
            e / this.dom.sizeContainer.clientWidth >= t / this.dom.sizeContainer.clientHeight ? (this.setContainersStyles(this.dom.video, "video", {
                width: "100%",
                height: "auto"
            }),
            this.setContainersStyles(this.dom.container, "container", {
                width: "100%",
                height: "auto"
            })) : (this.setContainersStyles(this.dom.video, "video", {
                width: "auto",
                height: /firefox|fxios/i.test(navigator.userAgent) ? "100%" : "-webkit-fill-available"
            }),
            this.setContainersStyles(this.dom.container, "container", {
                width: "auto",
                height: /firefox|fxios/i.test(navigator.userAgent) ? "100%" : "-webkit-fill-available"
            }))
        }
        ,
        this.initializeVideo = ()=>{
            if (this.dom.container.style.width = "auto",
            this.dom.container.style.height = "auto",
            this.forceVideoToFitContainer = !0,
            this.adjustContainerFit(),
            this.forceVideoToFitContainer) {
                let e;
                new ResizeObserver((()=>{
                    clearTimeout(e),
                    e = setTimeout((()=>{
                        this.adjustContainerFit(),
                        this.playerResolution.setResolution()
                    }
                    ), 850)
                }
                )).observe(this.dom.video)
            }
            this.onResize(),
            setTimeout(this.onResize, 550)
        }
        ,
        this.timeOutFunctionId = void 0,
        this.cancelResize = ()=>{
            clearTimeout(this.timeOutFunctionId)
        }
        ,
        e = Object.assign({
            sendResolutionOnResize: !0,
            updateQueueData: ()=>{}
            ,
            sendLetter: ()=>{}
            ,
            keycloakUrl: void 0,
            clientId: void 0
        }, e),
        this.keycloakUrl = e.keycloakUrl,
        this.clientId = e.clientId,
        "string" == typeof e.sizeContainer ? this.dom.sizeContainer = document.querySelector(`#${e.sizeContainer}`) : (this.dom.sizeContainer = e.sizeContainer,
        this.dom.container = e.container),
        this.dom.container || (this.dom.container = document.createElement("div"),
        this.dom.sizeContainer.append(this.dom.container));
        const n = document.createElement("div");
        n.id = "pixel-streaming-stats";
        var i;
        Object.entries({
            position: "absolute",
            background: "#ffffffa3",
            top: "0",
            left: "0",
            padding: "10px",
            display: "none",
            zIndex: "100"
        }).forEach((([e,t])=>{
            n.style[e] = t
        }
        )),
        this.dom.sizeContainer.append(n),
        this.videoRef = e.videoRef,
        this.forceVideoToFitContainer = e.forceVideoToFitContainer,
        this.extmapAllowMixed = e.extmapAllowMixed,
        this.audioRef = e.audioRef,
        this.playerResolution = new NA(this),
        this.dom.sizeContainer.style.display = "flex",
        this.dom.sizeContainer.style.justifyContent = "center",
        this.dom.sizeContainer.style.alignItems = "center",
        this.dom.sizeContainer.style.maxHeight = "100%",
        this.dom.sizeContainer.style.maxWidth = "100%",
        this.dom.sizeContainer.style.height = "100%",
        this.dom.container.style.display = "flex",
        this.dom.container.style.height = /firefox|fxios/i.test(navigator.userAgent) ? "100%" : "-webkit-fill-available",
        this.dom.container.style.width = "100%",
        this.dom.container.style.position = "relative",
        this.dom.overlay = new Qb(this.dom.container,this),
        e.playOverlay && (this.dom.playOverlay = new Nb(this),
        this.playOverlay = e.playOverlay),
        this.socket.init(this).catch((e=>{
            vg.error(e)
        }
        )),
        this.orientationZoom = e.orientationZoom,
        this.loader = e.loader || (()=>{}
        ),
        this.autoplay = e.autoplay,
        this.sendResolutionOnResize = e.sendResolutionOnResize,
        e.snackbar && (this.snackbar = (i = e.snackbar,
        {
            enqueueSnackbar: (e,t,n)=>{
                const r = n ? ` Retrying in ${t.autoHideDuration / 1e3} seconds.` : "";
                if (e instanceof CloseEvent) {
                    if (4507 !== e.code && 4506 !== e.code) {
                        const n = 0 === e.reason.length ? "Cannot establish connection." : e.reason;
                        return i.enqueueSnackbar(`${n} (${e.code}) ${r}`, {
                            variant: "warning",
                            autoHideDuration: t.autoHideDuration,
                            disableWindowBlurListener: !0
                        })
                    }
                    return 0
                }
                return e instanceof Event ? 0 : i.enqueueSnackbar(e + r, t)
            }
            ,
            closeSnackbar: e=>i.closeSnackbar(e)
        })),
        this.updateQueueData = e.updateQueueData,
        this.sendLetter = null == (t = e) ? void 0 : t.sendLetter,
        this.events.addListener(Sa.DataChannelClosed, (()=>{
            this.afk.enabled = !1
        }
        )),
        this.events.addListener(Ca, (()=>{
            null == e.unauthorizedFallback || e.unauthorizedFallback()
        }
        )),
        this.events.addListener(Sa.NoStreamAvailable, (()=>{
            console.error("No stream available.")
        }
        )),
        this.load(e.touchSupport),
        this.videoInitializeCallback = e.videoInitializeCallback || (()=>{}
        ),
        this.applicationResponse = e.applicationResponse || (()=>{}
        ),
        this.verbosityLevel = e.verbosityLevel || 100,
        this.unauthorizedFallback = e.unauthorizedFallback
    }
    setAfk() {
        this.afk.enabled && this.afk.start()
    }
    setupDomListeners() {
        window.addEventListener("orientationchange", this.onOrientationChanged);
        const e = new ResizeObserver((()=>{
            this.cancelResize(),
            this.timeOutFunctionId = setTimeout(this.onResize, 550)
        }
        ));
        window.addEventListener("resize", this.cancelResize),
        e.observe(this.dom.sizeContainer),
        document.addEventListener("keydown", (e=>{
            const {activeElement: t} = document;
            !("Space" === e.code && t instanceof HTMLElement) || t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.blur()
        }
        ))
    }
    closeWebsocket(e, t=!1) {
        var n;
        t && this.socket.blockReconnect(),
        null == (n = this.socket) || n.close(1e3, e),
        window.removeEventListener("orientationchange", this.onOrientationChanged),
        window.removeEventListener("resize", this.onResize),
        window.removeEventListener("resize", this.cancelResize)
    }
    load(e) {
        this.requestQualityControl(),
        this.setupDomListeners(),
        this.inputOptions.fakeMouseWithTouches = null != e && !e,
        ("ontouchstart"in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && "Win32" !== navigator.platform && "Win64" !== navigator.platform || (this.style.additional = "cursor: grab; cursor: -moz-grab; cursor: -webkit-grab");
        const t = {
            PrioritiseQuality: 1,
            LowBitrate: 6e3,
            HighBitrate: 16e3
        };
        this.sendQualityConsoleCommands(t),
        vg.silly(`Setting bitrate: ${JSON.stringify(t)}`)
    }
    onOrientationChange() {
        vg.verbose(`The orientation of the device is now ${window.orientation}`),
        this.landscapeFullscreenMode(),
        this.delayOrientationChange.start((()=>this.playerResolution.setResolution()))
    }
    landscapeFullscreenMode() {
        var e, t;
        90 === Math.abs(window.orientation) || 90 === Math.abs(null == (e = window.screen) || null == (t = e.orientation) ? void 0 : t.angle) ? (this.dom.sizeContainer.style.position = "fixed",
        this.dom.sizeContainer.style.top = "0",
        this.dom.sizeContainer.style.height = "stretch",
        this.dom.sizeContainer.style.height = "100%",
        this.dom.sizeContainer.style.width = "100%",
        this.dom.sizeContainer.style.background = "black") : (this.dom.sizeContainer.style.position = "relative",
        this.dom.sizeContainer.style.top = "auto",
        this.dom.sizeContainer.style.background = "none",
        this.revertToLastSavedContainersStyles())
    }
    play() {
        var e, t;
        (this.setAfk(),
        this.dom.video) && (null == (e = this.dom) || null == (t = e.video) || t.play().then((()=>{
            var e;
            return vg.info("video.play() promise returned!"),
            this.requestQualityControl(),
            null == (e = this.input) || e.freezeFrame.showFreezeFrameOverlay(),
            null
        }
        )).catch((e=>vg.error("Couldn't play video!", e))))
    }
    sendInputData(e) {
        var t;
        null != this.player && (this.setAfk(),
        null == (t = this.player) || t.send(e))
    }
    zoom(e) {
        const t = {
            Zoom: e
        };
        this.emitUIInteraction(t),
        vg.silly(`RTC send command: ${JSON.stringify(t)}`)
    }
    sendQualityConsoleCommands(e) {
        null !== e.PrioritiseQuality && (vg.silly(`RTC send command: Streamer.PrioritiseQuality ${e.PrioritiseQuality}`),
        this.emitUIInteraction({
            Console: `Streamer.PrioritiseQuality ${e.PrioritiseQuality}`
        })),
        null !== e.LowBitrate && (vg.silly(`RTC send command: Streamer.LowBitrate ${e.LowBitrate}`),
        this.emitUIInteraction({
            Console: `Streamer.LowBitrate ${e.LowBitrate}`
        })),
        null !== e.HighBitrate && (vg.silly(`RTC send command: Streamer.HighBitrate ${e.HighBitrate}`),
        this.emitUIInteraction({
            Console: `Streamer.HighBitrate ${e.HighBitrate}`
        }))
    }
}
export {QA as WebRTCClient, Ta as events};
