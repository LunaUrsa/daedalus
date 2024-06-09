/* eslint-disable @typescript-eslint/no-unused-vars */
import CodeMirror from "codemirror";
import jQuery from "jquery";

function initCodeMirror(n, t) {
    if (n == null)
        return null;
    var i = document.getElementById(n);
    return initCodeMirrorFromDom(i, t)
}

function initCodeMirrorFromDom(n, t) {
    t === undefined && (t = !1);
    var i = CodeMirror.fromTextArea(n, {
        mode: {
            name: "python",
            version: 3,
            singleLineStringErrors: !1
        },
        lineNumbers: !0,
        indentUnit: 4,
        tabMode: "shift",
        matchBrackets: !0,
        showTrailingSpace: !0,
        lineWrapping: !0,
        readOnly: t,
        extraKeys: {
            "Ctrl-Space": "autocomplete",
            F11: function(n) {
                n.setOption("fullScreen", !n.getOption("fullScreen"))
            },
            Esc: function(n) {
                n.getOption("fullScreen") && n.setOption("fullScreen", !1)
            }
        }
    });
    return CodeMirror.commands.autocomplete = function(n) {
        n.showHint({
            hint: CodeMirror.hint.mode
        })
    }
    ,
    jQuery(n).data("CodeMirrorInstance", i),
    i
}

function getCodeMirrorValue(n) {
    var t = document.getElementById(n)
      , i = jQuery(t).data("CodeMirrorInstance");
    return i.getValue()
}

(function(n) {
    if (typeof exports == "object" && typeof module == "object")
        module.exports = n();
    else {
        if (typeof define == "function" && define.amd)
            return define([], n);
        this.CodeMirror = n()
    }
}
)(function() {
    "use strict";
    function n(t, i) {
        var f, r, e, u;
        if (!(this instanceof n))
            return new n(t,i);
        this.options = i = i || {};
        for (f in gs)
            i.hasOwnProperty(f) || (i[f] = gs[f]);
        po(i);
        r = i.value;
        typeof r == "string" && (r = new d(r,i.mode));
        this.doc = r;
        e = this.display = new tp(t,r);
        e.wrapper.CodeMirror = this;
        fc(this);
        uc(this);
        i.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap");
        i.autofocus && !co && it(this);
        this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: !1,
            focused: !1,
            suppressEdits: !1,
            pasteIncoming: !1,
            cutIncoming: !1,
            draggingText: !1,
            highlight: new lh
        };
        ft && setTimeout(wt(ct, this, !0), 20);
        ew(this);
        u = this;
        gt(this, function() {
            var n, t;
            u.curOp.forceUpdate = !0;
            vv(u, r);
            i.autofocus && !co || hi() == e.input ? setTimeout(wt(vs, u), 20) : ys(u);
            for (n in gi)
                gi.hasOwnProperty(n) && gi[n](u, i[n], nh);
            for (t = 0; t < de.length; ++t)
                de[t](u)
        })
    }
    function tp(n, t) {
        var r = this
          , u = r.input = i("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
        b ? u.style.width = "1000px" : u.setAttribute("wrap", "off");
        nu && (u.style.border = "1px solid black");
        u.setAttribute("autocorrect", "off");
        u.setAttribute("autocapitalize", "off");
        u.setAttribute("spellcheck", "false");
        r.inputDiv = i("div", [u], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        r.scrollbarH = i("div", [i("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        r.scrollbarV = i("div", [i("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
        r.scrollbarFiller = i("div", null, "CodeMirror-scrollbar-filler");
        r.gutterFiller = i("div", null, "CodeMirror-gutter-filler");
        r.lineDiv = i("div", null, "CodeMirror-code");
        r.selectionDiv = i("div", null, null, "position: relative; z-index: 1");
        r.cursorDiv = i("div", null, "CodeMirror-cursors");
        r.measure = i("div", null, "CodeMirror-measure");
        r.lineMeasure = i("div", null, "CodeMirror-measure");
        r.lineSpace = i("div", [r.measure, r.lineMeasure, r.selectionDiv, r.cursorDiv, r.lineDiv], null, "position: relative; outline: none");
        r.mover = i("div", [i("div", [r.lineSpace], "CodeMirror-lines")], null, "position: relative");
        r.sizer = i("div", [r.mover], "CodeMirror-sizer");
        r.heightForcer = i("div", null, null, "position: absolute; height: " + ti + "px; width: 1px;");
        r.gutters = i("div", null, "CodeMirror-gutters");
        r.lineGutter = null;
        r.scroller = i("div", [r.sizer, r.heightForcer, r.gutters], "CodeMirror-scroll");
        r.scroller.setAttribute("tabIndex", "-1");
        r.wrapper = i("div", [r.inputDiv, r.scrollbarH, r.scrollbarV, r.scrollbarFiller, r.gutterFiller, r.scroller], "CodeMirror");
        gr && (r.gutters.style.zIndex = -1,
        r.scroller.style.paddingRight = 0);
        nu && (u.style.width = "0px");
        b || (r.scroller.draggable = !0);
        ho && (r.inputDiv.style.height = "1px",
        r.inputDiv.style.position = "absolute");
        gr && (r.scrollbarH.style.minHeight = r.scrollbarV.style.minWidth = "18px");
        n.appendChild ? n.appendChild(r.wrapper) : n(r.wrapper);
        r.viewFrom = r.viewTo = t.first;
        r.view = [];
        r.externalMeasured = null;
        r.viewOffset = 0;
        r.lastSizeC = 0;
        r.updateLineNumbers = null;
        r.lineNumWidth = r.lineNumInnerWidth = r.lineNumChars = null;
        r.prevInput = "";
        r.alignWidgets = !1;
        r.pollingFast = !1;
        r.poll = new lh;
        r.cachedCharWidth = r.cachedTextHeight = r.cachedPaddingH = null;
        r.inaccurateSelection = !1;
        r.maxLine = null;
        r.maxLineLength = 0;
        r.maxLineChanged = !1;
        r.wheelDX = r.wheelDY = r.wheelStartX = r.wheelStartY = null;
        r.shift = !1
    }
    function ao(t) {
        t.doc.mode = n.getMode(t.options, t.doc.modeOption);
        tu(t)
    }
    function tu(n) {
        n.doc.iter(function(n) {
            n.stateAfter && (n.stateAfter = null);
            n.styles && (n.styles = null)
        });
        n.doc.frontier = n.doc.first;
        fu(n, 100);
        n.state.modeGen++;
        n.curOp && rt(n)
    }
    function ip(n) {
        n.options.lineWrapping ? (n.display.wrapper.className += " CodeMirror-wrap",
        n.display.sizer.style.minWidth = "") : (n.display.wrapper.className = n.display.wrapper.className.replace(" CodeMirror-wrap", ""),
        yo(n));
        vo(n);
        rt(n);
        ou(n);
        setTimeout(function() {
            wf(n)
        }, 100)
    }
    function ic(n) {
        var t = pi(n.display)
          , i = n.options.lineWrapping
          , r = i && Math.max(5, n.display.scroller.clientWidth / su(n.display) - 3);
        return function(u) {
            var e, f;
            if (nr(n.doc, u))
                return 0;
            if (e = 0,
            u.widgets)
                for (f = 0; f < u.widgets.length; f++)
                    u.widgets[f].height && (e += u.widgets[f].height);
            return i ? e + (Math.ceil(u.text.length / r) || 1) * t : e + t
        }
    }
    function vo(n) {
        var t = n.doc
          , i = ic(n);
        t.iter(function(n) {
            var t = i(n);
            t != n.height && vt(n, t)
        })
    }
    function rc(n) {
        var i = lt[n.options.keyMap]
          , t = i.style;
        n.display.wrapper.className = n.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (t ? " cm-keymap-" + t : "")
    }
    function uc(n) {
        n.display.wrapper.className = n.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + n.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
        ou(n)
    }
    function iu(n) {
        fc(n);
        rt(n);
        setTimeout(function() {
            bo(n)
        }, 20)
    }
    function fc(n) {
        var r = n.display.gutters, o = n.options.gutters, t, u, f, e;
        for (rr(r),
        t = 0; t < o.length; ++t)
            u = o[t],
            f = r.appendChild(i("div", null, "CodeMirror-gutter " + u)),
            u == "CodeMirror-linenumbers" && (n.display.lineGutter = f,
            f.style.width = (n.display.lineNumWidth || 1) + "px");
        r.style.display = t ? "" : "none";
        e = r.offsetWidth;
        n.display.sizer.style.marginLeft = e + "px";
        t && (n.display.scrollbarH.style.left = n.options.fixedGutter ? e + "px" : 0)
    }
    function pf(n) {
        var r, u, t, i;
        if (n.height == 0)
            return 0;
        for (r = n.text.length,
        t = n; u = da(t); )
            i = u.find(0, !0),
            t = i.from.line,
            r += i.from.ch - i.to.ch;
        for (t = n; u = du(t); )
            i = u.find(0, !0),
            r -= t.text.length - i.from.ch,
            t = i.to.line,
            r += t.text.length - i.to.ch;
        return r
    }
    function yo(n) {
        var t = n.display
          , i = n.doc;
        t.maxLine = r(i, i.first);
        t.maxLineLength = pf(t.maxLine);
        t.maxLineChanged = !0;
        i.iter(function(n) {
            var i = pf(n);
            i > t.maxLineLength && (t.maxLineLength = i,
            t.maxLine = n)
        })
    }
    function po(n) {
        var t = g(n.gutters, "CodeMirror-linenumbers");
        t == -1 && n.lineNumbers ? n.gutters = n.gutters.concat(["CodeMirror-linenumbers"]) : t > -1 && !n.lineNumbers && (n.gutters = n.gutters.slice(0),
        n.gutters.splice(t, 1))
    }
    function ec(n) {
        var t = n.display.scroller;
        return {
            clientHeight: t.clientHeight,
            barHeight: n.display.scrollbarV.clientHeight,
            scrollWidth: t.scrollWidth,
            clientWidth: t.clientWidth,
            barWidth: n.display.scrollbarH.clientWidth,
            docHeight: Math.round(n.doc.height + tl(n.display))
        }
    }
    function wf(n, t) {
        var f;
        t || (t = ec(n));
        var i = n.display
          , e = t.docHeight + ti
          , r = t.scrollWidth > t.clientWidth
          , u = e > t.clientHeight;
        u ? (i.scrollbarV.style.display = "block",
        i.scrollbarV.style.bottom = r ? vf(i.measure) + "px" : "0",
        i.scrollbarV.firstChild.style.height = Math.max(0, e - t.clientHeight + (t.barHeight || i.scrollbarV.clientHeight)) + "px") : (i.scrollbarV.style.display = "",
        i.scrollbarV.firstChild.style.height = "0");
        r ? (i.scrollbarH.style.display = "block",
        i.scrollbarH.style.right = u ? vf(i.measure) + "px" : "0",
        i.scrollbarH.firstChild.style.width = t.scrollWidth - t.clientWidth + (t.barWidth || i.scrollbarH.clientWidth) + "px") : (i.scrollbarH.style.display = "",
        i.scrollbarH.firstChild.style.width = "0");
        r && u ? (i.scrollbarFiller.style.display = "block",
        i.scrollbarFiller.style.height = i.scrollbarFiller.style.width = vf(i.measure) + "px") : i.scrollbarFiller.style.display = "";
        r && n.options.coverGutterNextToScrollbar && n.options.fixedGutter ? (i.gutterFiller.style.display = "block",
        i.gutterFiller.style.height = vf(i.measure) + "px",
        i.gutterFiller.style.width = i.gutters.offsetWidth + "px") : i.gutterFiller.style.display = "";
        ky && vf(i.measure) === 0 && (i.scrollbarV.style.minWidth = i.scrollbarH.style.minHeight = dy ? "18px" : "12px",
        f = function(t) {
            ef(t) != i.scrollbarV && ef(t) != i.scrollbarH && v(n, pl)(t)
        }
        ,
        o(i.scrollbarV, "mousedown", f),
        o(i.scrollbarH, "mousedown", f))
    }
    function wo(n, t, i) {
        var u = i && i.top != null ? i.top : n.scroller.scrollTop, f, e;
        u = Math.floor(u - ie(n));
        var h = i && i.bottom != null ? i.bottom : u + n.wrapper.clientHeight
          , o = tr(t, u)
          , s = tr(t, h);
        if (i && i.ensure) {
            if (f = i.ensure.from.line,
            e = i.ensure.to.line,
            f < o)
                return {
                    from: f,
                    to: tr(t, ni(r(t, f)) + n.wrapper.clientHeight)
                };
            if (Math.min(e, t.lastLine()) >= s)
                return {
                    from: tr(t, ni(r(t, e)) - n.wrapper.clientHeight),
                    to: e
                }
        }
        return {
            from: o,
            to: s
        }
    }
    function bo(n) {
        var t = n.display, r = t.view, i, u, f;
        if (t.alignWidgets || t.gutters.firstChild && n.options.fixedGutter) {
            var e = go(t) - t.scroller.scrollLeft + n.doc.scrollLeft
              , s = t.gutters.offsetWidth
              , o = e + "px";
            for (i = 0; i < r.length; i++)
                if (!r[i].hidden && (n.options.fixedGutter && r[i].gutter && (r[i].gutter.style.left = o),
                u = r[i].alignable,
                u))
                    for (f = 0; f < u.length; f++)
                        u[f].style.left = o;
            n.options.fixedGutter && (t.gutters.style.left = e + s + "px")
        }
    }
    function rp(n) {
        var u;
        if (!n.options.lineNumbers)
            return !1;
        var f = n.doc
          , r = ko(n.options, f.first + f.size - 1)
          , t = n.display;
        if (r.length != t.lineNumChars) {
            var e = t.measure.appendChild(i("div", [i("div", r)], "CodeMirror-linenumber CodeMirror-gutter-elt"))
              , o = e.firstChild.offsetWidth
              , s = e.offsetWidth - o;
            return t.lineGutter.style.width = "",
            t.lineNumInnerWidth = Math.max(o, t.lineGutter.offsetWidth - s),
            t.lineNumWidth = t.lineNumInnerWidth + s,
            t.lineNumChars = t.lineNumInnerWidth ? r.length : -1,
            t.lineGutter.style.width = t.lineNumWidth + "px",
            u = t.gutters.offsetWidth,
            t.scrollbarH.style.left = n.options.fixedGutter ? u + "px" : 0,
            t.sizer.style.marginLeft = u + "px",
            !0
        }
        return !1
    }
    function ko(n, t) {
        return String(n.lineNumberFormatter(t + n.firstLineNumber))
    }
    function go(n) {
        return n.scroller.getBoundingClientRect().left - n.sizer.getBoundingClientRect().left
    }
    function bf(n, t, i) {
        for (var o, r, s = n.display.viewFrom, h = n.display.viewTo, f, u = wo(n.display, n.doc, t), e = !0; ; e = !1) {
            if (o = n.display.scroller.clientWidth,
            !up(n, u, i))
                break;
            if (f = !0,
            n.display.maxLineChanged && !n.options.lineWrapping && fp(n),
            r = ec(n),
            us(n),
            ep(n, r),
            wf(n, r),
            e && n.options.lineWrapping && o != n.display.scroller.clientWidth) {
                i = !0;
                continue
            }
            if (i = !1,
            t && t.top != null && (t = {
                top: Math.min(r.docHeight - ti - r.clientHeight, t.top)
            }),
            u = wo(n.display, n.doc, t),
            u.from >= n.display.viewFrom && u.to <= n.display.viewTo)
                break
        }
        return n.display.updateLineNumbers = null,
        f && (w(n, "update", n),
        (n.display.viewFrom != s || n.display.viewTo != h) && w(n, "viewportChange", n, n.display.viewFrom, n.display.viewTo)),
        f
    }
    function up(n, t, i) {
        var u = n.display, s = n.doc, c, h, o;
        if (!u.wrapper.offsetWidth) {
            ri(n);
            return
        }
        if (i || !(t.from >= u.viewFrom) || !(t.to <= u.viewTo) || yl(n) != 0) {
            rp(n) && ri(n);
            var a = sc(n)
              , l = s.first + s.size
              , f = Math.max(t.from - n.options.viewportMargin, s.first)
              , e = Math.min(l, t.to + n.options.viewportMargin);
            if (u.viewFrom < f && f - u.viewFrom < 20 && (f = Math.max(s.first, u.viewFrom)),
            u.viewTo > e && u.viewTo - e < 20 && (e = Math.min(l, u.viewTo)),
            ii && (f = uh(n.doc, f),
            e = nv(n.doc, e)),
            c = f != u.viewFrom || e != u.viewTo || u.lastSizeC != u.wrapper.clientHeight,
            fw(n, f, e),
            u.viewOffset = ni(r(n.doc, u.viewFrom)),
            n.display.mover.style.top = u.viewOffset + "px",
            h = yl(n),
            c || h != 0 || i)
                return o = hi(),
                h > 4 && (u.lineDiv.style.display = "none"),
                sp(n, u.updateLineNumbers, a),
                h > 4 && (u.lineDiv.style.display = ""),
                o && hi() != o && o.offsetHeight && o.focus(),
                rr(u.cursorDiv),
                rr(u.selectionDiv),
                c && (u.lastSizeC = u.wrapper.clientHeight,
                fu(n, 400)),
                op(n),
                !0
        }
    }
    function fp(n) {
        var t = n.display, u = rl(n, t.maxLine, t.maxLine.text.length).left, i, r;
        t.maxLineChanged = !1;
        i = Math.max(0, u + 3);
        r = Math.max(0, t.sizer.offsetLeft + i + ti - t.scroller.clientWidth);
        t.sizer.style.minWidth = i + "px";
        r < n.doc.scrollLeft && or(n, Math.min(t.scroller.scrollLeft, r), !0)
    }
    function ep(n, t) {
        n.display.sizer.style.minHeight = n.display.heightForcer.style.top = t.docHeight + "px";
        n.display.gutters.style.height = Math.max(t.docHeight, t.clientHeight - ti) + "px";
        b && n.options.lineWrapping && n.display.sizer.offsetWidth + n.display.gutters.offsetWidth < n.display.scroller.clientWidth - 1 && (n.display.sizer.style.minHeight = n.display.heightForcer.style.top = "0px",
        n.display.gutters.style.height = t.docHeight + "px")
    }
    function op(n) {
        for (var t, i, e, o, s, u, r = n.display, h = r.lineDiv.offsetTop, f = 0; f < r.view.length; f++)
            if ((t = r.view[f],
            !t.hidden) && (gr ? (e = t.node.offsetTop + t.node.offsetHeight,
            i = e - h,
            h = e) : (o = t.node.getBoundingClientRect(),
            i = o.bottom - o.top),
            s = t.line.height - i,
            i < 2 && (i = pi(r)),
            (s > .001 || s < -.001) && (vt(t.line, i),
            oc(t.line),
            t.rest)))
                for (u = 0; u < t.rest.length; u++)
                    oc(t.rest[u])
    }
    function oc(n) {
        if (n.widgets)
            for (var t = 0; t < n.widgets.length; ++t)
                n.widgets[t].height = n.widgets[t].node.offsetHeight
    }
    function sc(n) {
        for (var i = n.display, u = {}, f = {}, t = i.gutters.firstChild, r = 0; t; t = t.nextSibling,
        ++r)
            u[n.options.gutters[r]] = t.offsetLeft,
            f[n.options.gutters[r]] = t.offsetWidth;
        return {
            fixedPos: go(i),
            gutterTotalWidth: i.gutters.offsetWidth,
            gutterLeft: u,
            gutterWidth: f,
            wrapperWidth: i.wrapper.clientWidth
        }
    }
    function sp(n, t, i) {
        function c(t) {
            var i = t.nextSibling;
            return b && li && n.display.currentWheelTarget == t ? t.style.display = "none" : t.parentNode.removeChild(t),
            i
        }
        for (var r, a, s, e = n.display, v = n.options.lineNumbers, h = e.lineDiv, u = h.firstChild, l = e.view, f = e.viewFrom, o = 0; o < l.length; o++) {
            if (r = l[o],
            !r.hidden)
                if (r.node) {
                    while (u != r.node)
                        u = c(u);
                    s = v && t != null && t <= f && r.lineNumber;
                    r.changes && (g(r.changes, "gutter") > -1 && (s = !1),
                    hc(n, r, f, i));
                    s && (rr(r.lineNumber),
                    r.lineNumber.appendChild(document.createTextNode(ko(n.options, f))));
                    u = r.node.nextSibling
                } else
                    a = ap(n, r, f, i),
                    h.insertBefore(a, u);
            f += r.size
        }
        while (u)
            u = c(u)
    }
    function hc(n, t, i, r) {
        for (var u, f = 0; f < t.changes.length; f++)
            u = t.changes[f],
            u == "text" ? cp(n, t) : u == "gutter" ? lc(n, t, i, r) : u == "class" ? ns(t) : u == "widget" && lp(t, r);
        t.changes = null
    }
    function kf(n) {
        return n.node == n.text && (n.node = i("div", null, null, "position: relative"),
        n.text.parentNode && n.text.parentNode.replaceChild(n.node, n.text),
        n.node.appendChild(n.text),
        gr && (n.node.style.zIndex = 2)),
        n.node
    }
    function hp(n) {
        var t = n.bgClass ? n.bgClass + " " + (n.line.bgClass || "") : n.line.bgClass, r;
        t && (t += " CodeMirror-linebackground");
        n.background ? t ? n.background.className = t : (n.background.parentNode.removeChild(n.background),
        n.background = null) : t && (r = kf(n),
        n.background = r.insertBefore(i("div", null, t), r.firstChild))
    }
    function cc(n, t) {
        var i = n.display.externalMeasured;
        return i && i.line == t.line ? (n.display.externalMeasured = null,
        t.measure = i.measure,
        i.built) : sv(n, t)
    }
    function cp(n, t) {
        var r = t.text.className
          , i = cc(n, t);
        t.text == t.node && (t.node = i.pre);
        t.text.parentNode.replaceChild(i.pre, t.text);
        t.text = i.pre;
        i.bgClass != t.bgClass || i.textClass != t.textClass ? (t.bgClass = i.bgClass,
        t.textClass = i.textClass,
        ns(t)) : r && (t.text.className = r)
    }
    function ns(n) {
        hp(n);
        n.line.wrapClass ? kf(n).className = n.line.wrapClass : n.node != n.text && (n.node.className = "");
        var t = n.textClass ? n.textClass + " " + (n.line.textClass || "") : n.line.textClass;
        n.text.className = t || ""
    }
    function lc(n, t, r, u) {
        var f, c, s, o, e, h;
        if (t.gutter && (t.node.removeChild(t.gutter),
        t.gutter = null),
        f = t.line.gutterMarkers,
        (n.options.lineNumbers || f) && (c = kf(t),
        s = t.gutter = c.insertBefore(i("div", null, "CodeMirror-gutter-wrapper", "position: absolute; left: " + (n.options.fixedGutter ? u.fixedPos : -u.gutterTotalWidth) + "px"), t.text),
        !n.options.lineNumbers || f && f["CodeMirror-linenumbers"] || (t.lineNumber = s.appendChild(i("div", ko(n.options, r), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + u.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + n.display.lineNumInnerWidth + "px"))),
        f))
            for (o = 0; o < n.options.gutters.length; ++o)
                e = n.options.gutters[o],
                h = f.hasOwnProperty(e) && f[e],
                h && s.appendChild(i("div", [h], "CodeMirror-gutter-elt", "left: " + u.gutterLeft[e] + "px; width: " + u.gutterWidth[e] + "px"))
    }
    function lp(n, t) {
        var i, r;
        for (n.alignable && (n.alignable = null),
        i = n.node.firstChild; i; i = r)
            r = i.nextSibling,
            i.className == "CodeMirror-linewidget" && n.node.removeChild(i);
        ac(n, t)
    }
    function ap(n, t, i, r) {
        var u = cc(n, t);
        return t.text = t.node = u.pre,
        u.bgClass && (t.bgClass = u.bgClass),
        u.textClass && (t.textClass = u.textClass),
        ns(t),
        lc(n, t, i, r),
        ac(t, r),
        t.node
    }
    function ac(n, t) {
        if (vc(n.line, n, t, !0),
        n.rest)
            for (var i = 0; i < n.rest.length; i++)
                vc(n.rest[i], n, t, !1)
    }
    function vc(n, t, r, u) {
        var s, o, h, f, e;
        if (n.widgets)
            for (s = kf(t),
            o = 0,
            h = n.widgets; o < h.length; ++o)
                f = h[o],
                e = i("div", [f.node], "CodeMirror-linewidget"),
                f.handleMouseEvents || (e.ignoreEvents = !0),
                vp(f, e, t, r),
                u && f.above ? s.insertBefore(e, t.gutter || t.text) : s.appendChild(e),
                w(f, "redraw")
    }
    function vp(n, t, i, r) {
        if (n.noHScroll) {
            (i.alignable || (i.alignable = [])).push(t);
            var u = r.wrapperWidth;
            t.style.left = r.fixedPos + "px";
            n.coverGutter || (u -= r.gutterTotalWidth,
            t.style.paddingLeft = r.gutterTotalWidth + "px");
            t.style.width = u + "px"
        }
        n.coverGutter && (t.style.zIndex = 5,
        t.style.position = "relative",
        n.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"))
    }
    function ts(n) {
        return t(n.line, n.ch)
    }
    function is(n, t) {
        return e(n, t) < 0 ? t : n
    }
    function rs(n, t) {
        return e(n, t) < 0 ? n : t
    }
    function kt(n, t) {
        this.ranges = n;
        this.primIndex = t
    }
    function h(n, t) {
        this.anchor = n;
        this.head = t
    }
    function ht(n, t) {
        var c = n[t], i, u, r;
        for (n.sort(function(n, t) {
            return e(n.from(), t.from())
        }),
        t = g(n, c),
        i = 1; i < n.length; i++)
            if (u = n[i],
            r = n[i - 1],
            e(r.to(), u.from()) >= 0) {
                var f = rs(r.from(), u.from())
                  , o = is(r.to(), u.to())
                  , s = r.empty() ? u.from() == u.head : r.from() == r.head;
                i <= t && --t;
                n.splice(--i, 2, new h(s ? o : f,s ? f : o))
            }
        return new kt(n,t)
    }
    function vi(n, t) {
        return new kt([new h(n,t || n)],0)
    }
    function yc(n, t) {
        return Math.max(n.first, Math.min(t, n.first + n.size - 1))
    }
    function u(n, i) {
        if (i.line < n.first)
            return t(n.first, 0);
        var u = n.first + n.size - 1;
        return i.line > u ? t(u, r(n, u).text.length) : yp(i, r(n, i.line).text.length)
    }
    function yp(n, i) {
        var r = n.ch;
        return r == null || r > i ? t(n.line, i) : r < 0 ? t(n.line, 0) : n
    }
    function ru(n, t) {
        return t >= n.first && t < n.first + n.size
    }
    function pp(n, t) {
        for (var r = [], i = 0; i < t.length; i++)
            r[i] = u(n, t[i]);
        return r
    }
    function uu(n, t, i, r) {
        var u, f;
        return n.cm && n.cm.display.shift || n.extend ? (u = t.anchor,
        r && (f = e(i, u) < 0,
        f != e(r, u) < 0 ? (u = i,
        i = r) : f != e(i, r) < 0 && (i = r)),
        new h(u,i)) : new h(r || i,i)
    }
    function df(n, t, i, r) {
        k(n, new kt([uu(n, n.sel.primary(), t, i)],0), r)
    }
    function pc(n, t, i) {
        for (var f, u = [], r = 0; r < n.sel.ranges.length; r++)
            u[r] = uu(n, n.sel.ranges[r], t[r], null);
        f = ht(u, n.sel.primIndex);
        k(n, f, i)
    }
    function wc(n, t, i, r) {
        var u = n.sel.ranges.slice(0);
        u[t] = i;
        k(n, ht(u, n.sel.primIndex), r)
    }
    function bc(n, t, i, r) {
        k(n, vi(t, i), r)
    }
    function wp(n, t) {
        var i = {
            ranges: t.ranges,
            update: function(t) {
                this.ranges = [];
                for (var i = 0; i < t.length; i++)
                    this.ranges[i] = new h(u(n, t[i].anchor),u(n, t[i].head))
            }
        };
        return a(n, "beforeSelectionChange", n, i),
        n.cm && a(n.cm, "beforeSelectionChange", n.cm, i),
        i.ranges != t.ranges ? ht(i.ranges, i.ranges.length - 1) : t
    }
    function kc(n, t, i) {
        var r = n.history.done
          , u = s(r);
        u && u.ranges ? (r[r.length - 1] = t,
        gf(n, t, i)) : k(n, t, i)
    }
    function k(n, t, i) {
        gf(n, t, i);
        bb(n, n.sel, n.cm ? n.cm.curOp.id : NaN, i)
    }
    function gf(n, t, i) {
        (ot(n, "beforeSelectionChange") || n.cm && ot(n.cm, "beforeSelectionChange")) && (t = wp(n, t));
        var r = e(t.primary().head, n.sel.primary().head) < 0 ? -1 : 1;
        dc(n, nl(n, t, r, !0));
        i && i.scroll === !1 || !n.cm || di(n.cm)
    }
    function dc(n, t) {
        t.equals(n.sel) || (n.sel = t,
        n.cm && (n.cm.curOp.updateInput = n.cm.curOp.selectionChanged = n.cm.curOp.cursorActivity = !0),
        w(n, "cursorActivity", n))
    }
    function gc(n) {
        dc(n, nl(n, n.sel, null, !1), br)
    }
    function nl(n, t, i, r) {
        for (var u, f = 0; f < t.ranges.length; f++) {
            var e = t.ranges[f]
              , o = ne(n, e.anchor, i, r)
              , s = ne(n, e.head, i, r);
            (u || o != e.anchor || s != e.head) && (u || (u = t.ranges.slice(0, f)),
            u[f] = new h(o,s))
        }
        return u ? ht(u, t.primIndex) : t
    }
    function ne(n, i, f, o) {
        var w = !1, h = i, p = f || 1, v, y, c, l, s;
        n.cantEdit = !1;
        n: for (; ; ) {
            if (v = r(n, h.line),
            v.markedSpans)
                for (y = 0; y < v.markedSpans.length; ++y)
                    if (c = v.markedSpans[y],
                    l = c.marker,
                    (c.from == null || (l.inclusiveLeft ? c.from <= h.ch : c.from < h.ch)) && (c.to == null || (l.inclusiveRight ? c.to >= h.ch : c.to > h.ch))) {
                        if (o && (a(l, "beforeCursorEnter"),
                        l.explicitlyCleared))
                            if (v.markedSpans) {
                                --y;
                                continue
                            } else
                                break;
                        if (!l.atomic)
                            continue;
                        if (s = l.find(p < 0 ? -1 : 1),
                        e(s, h) == 0 && (s.ch += p,
                        s.ch < 0 ? s = s.line > n.first ? u(n, t(s.line - 1)) : null : s.ch > v.text.length && (s = s.line < n.first + n.size - 1 ? t(s.line + 1, 0) : null),
                        !s)) {
                            if (w)
                                return o ? (n.cantEdit = !0,
                                t(n.first, 0)) : ne(n, i, f, !0);
                            w = !0;
                            s = i;
                            p = -p
                        }
                        h = s;
                        continue n
                    }
            return h
        }
    }
    function us(n) {
        for (var i, f, t = n.display, r = n.doc, e = document.createDocumentFragment(), o = document.createDocumentFragment(), u = 0; u < r.sel.ranges.length; u++)
            i = r.sel.ranges[u],
            f = i.empty(),
            (f || n.options.showCursorWhenSelecting) && bp(n, i, e),
            f || kp(n, i, o);
        if (n.options.moveInputWithCursor) {
            var s = dt(n, r.sel.primary().head, "div")
              , h = t.wrapper.getBoundingClientRect()
              , c = t.lineDiv.getBoundingClientRect()
              , l = Math.max(0, Math.min(t.wrapper.clientHeight - 10, s.top + c.top - h.top))
              , a = Math.max(0, Math.min(t.wrapper.clientWidth - 10, s.left + c.left - h.left));
            t.inputDiv.style.top = l + "px";
            t.inputDiv.style.left = a + "px"
        }
        bt(t.cursorDiv, e);
        bt(t.selectionDiv, o)
    }
    function bp(n, t, r) {
        var u = dt(n, t.head, "div"), e = r.appendChild(i("div", " ", "CodeMirror-cursor")), f;
        e.style.left = u.left + "px";
        e.style.top = u.top + "px";
        e.style.height = Math.max(0, u.bottom - u.top) * n.options.cursorHeight + "px";
        u.other && (f = r.appendChild(i("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor")),
        f.style.display = "",
        f.style.left = u.other.left + "px",
        f.style.top = u.other.top + "px",
        f.style.height = (u.other.bottom - u.other.top) * .85 + "px")
    }
    function kp(n, u, f) {
        function o(n, t, r, u) {
            t < 0 && (t = 0);
            p.appendChild(i("div", null, "CodeMirror-selected", "position: absolute; left: " + n + "px; top: " + t + "px; width: " + (r == null ? b - n : r) + "px; height: " + (u - t) + "px"))
        }
        function v(i, u, f) {
            function v(r, u) {
                return ss(n, t(i, r), "div", c, u)
            }
            var c = r(a, i), l = c.text.length, e, s;
            return rk(yt(c), u || 0, f == null ? l : f, function(n, t, i) {
                var r = v(n, "left"), c, a, y, p;
                n == t ? (c = r,
                a = y = r.left) : (c = v(t - 1, "right"),
                i == "rtl" && (p = r,
                r = c,
                c = p),
                a = r.left,
                y = c.right);
                u == null && n == 0 && (a = h);
                c.top - r.top > 3 && (o(a, r.top, null, r.bottom),
                a = h,
                r.bottom < c.top && o(a, r.bottom, null, c.top));
                f == null && t == l && (y = b);
                (!e || r.top < e.top || r.top == e.top && r.left < e.left) && (e = r);
                (!s || c.bottom > s.bottom || c.bottom == s.bottom && c.right > s.right) && (s = c);
                a < h + 1 && (a = h);
                o(a, c.top, y - a, c.bottom)
            }),
            {
                start: e,
                end: s
            }
        }
        var d = n.display
          , a = n.doc
          , p = document.createDocumentFragment()
          , w = il(n.display)
          , h = w.left
          , b = d.lineSpace.offsetWidth - w.right
          , c = u.from()
          , l = u.to();
        if (c.line == l.line)
            v(c.line, c.ch, l.ch);
        else {
            var k = r(a, c.line)
              , g = r(a, l.line)
              , y = at(k) == at(g)
              , e = v(c.line, c.ch, y ? k.text.length + 1 : null).end
              , s = v(l.line, y ? 0 : null, l.ch).start;
            y && (e.top < s.top - 2 ? (o(e.right, e.top, null, e.bottom),
            o(h, s.top, s.left, s.bottom)) : o(e.right, e.top, s.left - e.right, e.bottom));
            e.bottom < s.top && o(h, e.bottom, null, s.top)
        }
        f.appendChild(p)
    }
    function te(n) {
        var t, i;
        n.state.focused && (t = n.display,
        clearInterval(t.blinker),
        i = !0,
        t.cursorDiv.style.visibility = "",
        n.options.cursorBlinkRate > 0 && (t.blinker = setInterval(function() {
            t.cursorDiv.style.visibility = (i = !i) ? "" : "hidden"
        }, n.options.cursorBlinkRate)))
    }
    function fu(n, t) {
        n.doc.mode.startState && n.doc.frontier < n.display.viewTo && n.state.highlight.set(t, wt(dp, n))
    }
    function dp(n) {
        var t = n.doc, r, i;
        (t.frontier < t.first && (t.frontier = t.first),
        t.frontier >= n.display.viewTo) || (r = +new Date + n.options.workTime,
        i = lr(t.mode, eu(n, t.frontier)),
        gt(n, function() {
            t.iter(t.frontier, Math.min(t.first + t.size, n.display.viewTo + 500), function(u) {
                var f, o, e;
                if (t.frontier >= n.display.viewFrom) {
                    for (f = u.styles,
                    u.styles = rv(n, u, i, !0),
                    o = !f || f.length != u.styles.length,
                    e = 0; !o && e < f.length; ++e)
                        o = f[e] != u.styles[e];
                    o && wi(n, t.frontier, "text");
                    u.stateAfter = lr(t.mode, i)
                } else
                    eh(n, u.text, i),
                    u.stateAfter = t.frontier % 5 == 0 ? lr(t.mode, i) : null;
                return ++t.frontier,
                +new Date > r ? (fu(n, n.options.workDelay),
                !0) : void 0
            })
        }))
    }
    function gp(n, t, i) {
        for (var o, s, h, e, f = n.doc, c = i ? -1 : t - (n.doc.mode.innerMode ? 1e3 : 100), u = t; u > c; --u) {
            if (u <= f.first)
                return f.first;
            if (o = r(f, u - 1),
            o.stateAfter && (!i || u <= f.frontier))
                return u;
            s = st(o.text, null, n.options.tabSize);
            (e == null || h > s) && (e = u - 1,
            h = s)
        }
        return e
    }
    function eu(n, t, i) {
        var f = n.doc, o = n.display, u, e;
        return f.mode.startState ? (u = gp(n, t, i),
        e = u > f.first && r(f, u - 1).stateAfter,
        e = e ? lr(f.mode, e) : la(f.mode),
        f.iter(u, t, function(i) {
            eh(n, i.text, e);
            var r = u == t - 1 || u % 5 == 0 || u >= o.viewFrom && u < o.viewTo;
            i.stateAfter = r ? lr(f.mode, e) : null;
            ++u
        }),
        i && (f.frontier = u),
        e) : !0
    }
    function ie(n) {
        return n.lineSpace.offsetTop
    }
    function tl(n) {
        return n.mover.offsetHeight - n.lineSpace.offsetHeight
    }
    function il(n) {
        if (n.cachedPaddingH)
            return n.cachedPaddingH;
        var t = bt(n.measure, i("pre", "x"))
          , r = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle;
        return n.cachedPaddingH = {
            left: parseInt(r.paddingLeft),
            right: parseInt(r.paddingRight)
        }
    }
    function nw(n, t, i) {
        var f = n.options.lineWrapping, h = f && n.display.scroller.clientWidth, e, u, r, o, s;
        if (!t.measure.heights || f && t.measure.width != h) {
            if (e = t.measure.heights = [],
            f)
                for (t.measure.width = h,
                u = t.text.firstChild.getClientRects(),
                r = 0; r < u.length - 1; r++)
                    o = u[r],
                    s = u[r + 1],
                    Math.abs(o.bottom - s.bottom) > 2 && e.push((o.bottom + s.top) / 2 - i.top);
            e.push(i.bottom - i.top)
        }
    }
    function tw(n, t, i) {
        var r;
        if (n.line == t)
            return {
                map: n.measure.map,
                cache: n.measure.cache
            };
        for (r = 0; r < n.rest.length; r++)
            if (n.rest[r] == t)
                return {
                    map: n.measure.maps[r],
                    cache: n.measure.caches[r]
                };
        for (r = 0; r < n.rest.length; r++)
            if (c(n.rest[r]) > i)
                return {
                    map: n.measure.maps[r],
                    cache: n.measure.caches[r],
                    before: !0
                }
    }
    function iw(n, t) {
        var r, i, u;
        return t = at(t),
        r = c(t),
        i = n.display.externalMeasured = new vl(n.doc,t,r),
        i.lineN = r,
        u = i.built = sv(n, i),
        i.text = u.pre,
        bt(n.display.lineMeasure, u.pre),
        i
    }
    function rl(n, t, i, r) {
        return fl(n, fs(n, t), i, r)
    }
    function ul(n, t) {
        if (t >= n.display.viewFrom && t < n.display.viewTo)
            return n.display.view[hu(n, t)];
        var i = n.display.externalMeasured;
        if (i && t >= i.lineN && t < i.lineN + i.size)
            return i
    }
    function fs(n, t) {
        var u = c(t), i = ul(n, u), r;
        return i && !i.text ? i = null : i && i.changes && hc(n, i, u, sc(n)),
        i || (i = iw(n, t)),
        r = tw(i, t, u),
        {
            line: t,
            view: i,
            rect: null,
            map: r.map,
            cache: r.cache,
            before: r.before,
            hasHeights: !1
        }
    }
    function fl(n, t, i, r) {
        t.before && (i = -1);
        var f = i + (r || ""), u;
        return t.cache.hasOwnProperty(f) ? u = t.cache[f] : (t.rect || (t.rect = t.view.text.getBoundingClientRect()),
        t.hasHeights || (nw(n, t.view, t.rect),
        t.hasHeights = !0),
        u = rw(n, t, i, r),
        u.bogus || (t.cache[f] = u)),
        {
            left: u.left,
            right: u.right,
            top: u.top,
            bottom: u.bottom
        }
    }
    function rw(n, t, i, r) {
        for (var c, l, f, v, p, d, b, w, k, e = t.map, s, o, h, a, u = 0; u < e.length; u += 3)
            if (c = e[u],
            l = e[u + 1],
            i < c ? (o = 0,
            h = 1,
            a = "left") : i < l ? (o = i - c,
            h = o + 1) : (u == e.length - 3 || i == l && e[u + 3] > i) && (h = l - c,
            o = h - 1,
            i >= l && (a = "right")),
            o != null) {
                if (s = e[u + 2],
                c == l && r == (s.insertLeft ? "left" : "right") && (a = r),
                r == "left" && o == 0)
                    while (u && e[u - 2] == e[u - 3] && e[u - 1].insertLeft)
                        s = e[(u -= 3) + 2],
                        a = "left";
                if (r == "right" && o == l - c)
                    while (u < e.length - 3 && e[u + 3] == e[u + 4] && !e[u + 5].insertLeft)
                        s = e[(u += 3) + 2],
                        a = "right";
                break
            }
        if (s.nodeType == 3) {
            while (o && cf(t.line.text.charAt(c + o)))
                --o;
            while (c + h < l && cf(t.line.text.charAt(c + h)))
                ++h;
            y && o == 0 && h == l - c ? f = s.parentNode.getBoundingClientRect() : nt && n.options.lineWrapping ? (v = lf(s, o, h).getClientRects(),
            f = v.length ? v[r == "right" ? v.length - 1 : 0] : es) : f = lf(s, o, h).getBoundingClientRect()
        } else
            o > 0 && (a = r = "right"),
            f = n.options.lineWrapping && (v = s.getClientRects()).length > 1 ? v[r == "right" ? v.length - 1 : 0] : s.getBoundingClientRect();
        for (!y || o || f && (f.left || f.right) || (p = s.parentNode.getClientRects()[0],
        f = p ? {
            left: p.left,
            right: p.left + su(n.display),
            top: p.top,
            bottom: p.bottom
        } : es),
        b = (f.bottom + f.top) / 2 - t.rect.top,
        w = t.view.measure.heights,
        u = 0; u < w.length - 1; u++)
            if (b < w[u])
                break;
        return d = u ? w[u - 1] : 0,
        b = w[u],
        k = {
            left: (a == "right" ? f.right : f.left) - t.rect.left,
            right: (a == "left" ? f.left : f.right) - t.rect.left,
            top: d,
            bottom: b
        },
        f.left || f.right || (k.bogus = !0),
        k
    }
    function el(n) {
        if (n.measure && (n.measure.cache = {},
        n.measure.heights = null,
        n.rest))
            for (var t = 0; t < n.rest.length; t++)
                n.measure.caches[t] = {}
    }
    function ol(n) {
        n.display.externalMeasure = null;
        rr(n.display.lineMeasure);
        for (var t = 0; t < n.display.view.length; t++)
            el(n.display.view[t])
    }
    function ou(n) {
        ol(n);
        n.display.cachedCharWidth = n.display.cachedTextHeight = n.display.cachedPaddingH = null;
        n.options.lineWrapping || (n.display.maxLineChanged = !0);
        n.display.lineNumChars = null
    }
    function sl() {
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }
    function hl() {
        return window.pageYOffset || (document.documentElement || document.body).scrollTop
    }
    function os(n, t, i, r) {
        var f, e, u, o, s;
        if (t.widgets)
            for (f = 0; f < t.widgets.length; ++f)
                t.widgets[f].above && (e = nf(t.widgets[f]),
                i.top += e,
                i.bottom += e);
        return r == "line" ? i : (r || (r = "local"),
        u = ni(t),
        r == "local" ? u += ie(n.display) : u -= n.display.viewOffset,
        (r == "page" || r == "window") && (o = n.display.lineSpace.getBoundingClientRect(),
        u += o.top + (r == "window" ? 0 : hl()),
        s = o.left + (r == "window" ? 0 : sl()),
        i.left += s,
        i.right += s),
        i.top += u,
        i.bottom += u,
        i)
    }
    function cl(n, t, i) {
        var r, u, f, e;
        return i == "div" ? t : (r = t.left,
        u = t.top,
        i == "page" ? (r -= sl(),
        u -= hl()) : i != "local" && i || (f = n.display.sizer.getBoundingClientRect(),
        r += f.left,
        u += f.top),
        e = n.display.lineSpace.getBoundingClientRect(),
        {
            left: r - e.left,
            top: u - e.top
        })
    }
    function ss(n, t, i, u, f) {
        return u || (u = r(n.doc, t.line)),
        os(n, u, rl(n, u, t.ch, f), i)
    }
    function dt(n, t, i, u, f) {
        function s(t, r) {
            var e = fl(n, f, t, r ? "right" : "left");
            return r ? e.left = e.right : e.right = e.left,
            os(n, u, e, i)
        }
        function c(n, t) {
            var i = e[t]
              , r = i.level % 2;
            return (n == ph(i) && t && i.level < e[t - 1].level ? (i = e[--t],
            n = wh(i) - (i.level % 2 ? 0 : 1),
            r = !0) : n == wh(i) && t < e.length - 1 && i.level < e[t + 1].level && (i = e[++t],
            n = ph(i) - i.level % 2,
            r = !1),
            r && n == i.to && n > i.from) ? s(n - 1) : s(n, r)
        }
        var e, o, l, h;
        return (u = u || r(n.doc, t.line),
        f || (f = fs(n, u)),
        e = yt(u),
        o = t.ch,
        !e) ? s(o) : (l = bh(e, o),
        h = c(o, l),
        yf != null && (h.other = c(o, yf)),
        h)
    }
    function ll(n, t) {
        var i = 0, t = u(n.doc, t), f, e;
        return n.options.lineWrapping || (i = su(n.display) * t.ch),
        f = r(n.doc, t.line),
        e = ni(f) + ie(n.display),
        {
            left: i,
            right: i,
            top: e,
            bottom: e + f.height
        }
    }
    function re(n, i, r, u) {
        var f = t(n, i);
        return f.xRel = u,
        r && (f.outside = !0),
        f
    }
    function hs(n, t, i) {
        var u = n.doc, f, s, e;
        if (i += n.display.viewOffset,
        i < 0)
            return re(u.first, 0, !0, -1);
        if (f = tr(u, i),
        s = u.first + u.size - 1,
        f > s)
            return re(u.first + u.size - 1, r(u, s).text.length, !0, 1);
        for (t < 0 && (t = 0),
        e = r(u, f); ; ) {
            var o = uw(n, e, f, t, i)
              , h = du(e)
              , l = h && h.find(0, !0);
            if (h && (o.ch > l.from.ch || o.ch == l.from.ch && o.xRel > 0))
                f = c(e = l.to.line);
            else
                return o
        }
    }
    function uw(n, i, r, u, f) {
        function p(u) {
            var f = dt(n, t(r, u), "line", i, rt);
            return (h = !0,
            g > f.bottom) ? f.left - nt : g < f.top ? f.left + nt : (h = !1,
            f.left)
        }
        var g = f - ni(i), h = !1, nt = 2 * n.display.wrapper.clientWidth, rt = fs(n, i), tt = yt(i), w = i.text.length, e = oo(i), o = so(i), v = p(e), it = h, l = p(o), b = h, c, k, a, s, d, y;
        if (u > l)
            return re(r, o, b, 1);
        for (; ; ) {
            if (tt ? o == e || o == dh(i, e, 1) : o - e <= 1) {
                for (c = u < v || u - v <= l - u ? e : o,
                k = u - (c == e ? v : l); cf(i.text.charAt(c)); )
                    ++c;
                return re(r, c, c == e ? it : b, k < -1 ? -1 : k > 1 ? 1 : 0)
            }
            if (a = Math.ceil(w / 2),
            s = e + a,
            tt)
                for (s = e,
                d = 0; d < a; ++d)
                    s = dh(i, s, 1);
            y = p(s);
            y > u ? (o = s,
            l = y,
            (b = h) && (l += 1e3),
            w = a) : (e = s,
            v = y,
            it = h,
            w -= a)
        }
    }
    function pi(n) {
        var r, t;
        if (n.cachedTextHeight != null)
            return n.cachedTextHeight;
        if (yi == null) {
            for (yi = i("pre"),
            r = 0; r < 49; ++r)
                yi.appendChild(document.createTextNode("x")),
                yi.appendChild(i("br"));
            yi.appendChild(document.createTextNode("x"))
        }
        return bt(n.measure, yi),
        t = yi.offsetHeight / 50,
        t > 3 && (n.cachedTextHeight = t),
        rr(n.measure),
        t || 1
    }
    function su(n) {
        var r, f, u, t;
        return n.cachedCharWidth != null ? n.cachedCharWidth : (r = i("span", "xxxxxxxxxx"),
        f = i("pre", [r]),
        bt(n.measure, f),
        u = r.getBoundingClientRect(),
        t = (u.right - u.left) / 10,
        t > 2 && (n.cachedCharWidth = t),
        t || 10)
    }
    function ur(n) {
        n.curOp = {
            viewChanged: !1,
            startHeight: n.doc.height,
            forceUpdate: !1,
            updateInput: null,
            typing: !1,
            changeObjs: null,
            cursorActivity: !1,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            id: ++al
        };
        uo++ || (si = [])
    }
    function fr(n) {
        var t = n.curOp, h = n.doc, r = n.display, s, c, l, v, f, e, o, i;
        if (n.curOp = null,
        t.updateMaxLine && yo(n),
        (t.viewChanged || t.forceUpdate || t.scrollTop != null || t.scrollToPos && (t.scrollToPos.from.line < r.viewFrom || t.scrollToPos.to.line >= r.viewTo) || r.maxLineChanged && n.options.lineWrapping) && (s = bf(n, {
            top: t.scrollTop,
            ensure: t.scrollToPos
        }, t.forceUpdate),
        n.display.scroller.offsetHeight && (n.doc.scrollTop = n.display.scroller.scrollTop)),
        !s && t.selectionChanged && us(n),
        s || t.startHeight == n.doc.height || wf(n),
        t.scrollTop != null && r.scroller.scrollTop != t.scrollTop && (c = Math.max(0, Math.min(r.scroller.scrollHeight - r.scroller.clientHeight, t.scrollTop)),
        r.scroller.scrollTop = r.scrollbarV.scrollTop = h.scrollTop = c),
        t.scrollLeft != null && r.scroller.scrollLeft != t.scrollLeft && (l = Math.max(0, Math.min(r.scroller.scrollWidth - r.scroller.clientWidth, t.scrollLeft)),
        r.scroller.scrollLeft = r.scrollbarH.scrollLeft = h.scrollLeft = l,
        bo(n)),
        t.scrollToPos && (v = bw(n, u(n.doc, t.scrollToPos.from), u(n.doc, t.scrollToPos.to), t.scrollToPos.margin),
        t.scrollToPos.isCursor && n.state.focused && ww(n, v)),
        t.selectionChanged && te(n),
        n.state.focused && t.updateInput && ct(n, t.typing),
        f = t.maybeHiddenMarkers,
        e = t.maybeUnhiddenMarkers,
        f)
            for (i = 0; i < f.length; ++i)
                f[i].lines.length || a(f[i], "hide");
        if (e)
            for (i = 0; i < e.length; ++i)
                e[i].lines.length && a(e[i], "unhide");
        if (--uo || (o = si,
        si = null),
        t.changeObjs) {
            for (i = 0; i < t.changeObjs.length; i++)
                a(n, "change", n, t.changeObjs[i]);
            a(n, "changes", n, t.changeObjs)
        }
        if (t.cursorActivity && a(n, "cursorActivity", n),
        o)
            for (i = 0; i < o.length; ++i)
                o[i]()
    }
    function gt(n, t) {
        if (n.curOp)
            return t();
        ur(n);
        try {
            return t()
        } finally {
            fr(n)
        }
    }
    function v(n, t) {
        return function() {
            if (n.curOp)
                return t.apply(n, arguments);
            ur(n);
            try {
                return t.apply(n, arguments)
            } finally {
                fr(n)
            }
        }
    }
    function l(n) {
        return function() {
            if (this.curOp)
                return n.apply(this, arguments);
            ur(this);
            try {
                return n.apply(this, arguments)
            } finally {
                fr(this)
            }
        }
    }
    function tt(n) {
        return function() {
            var t = this.cm;
            if (!t || t.curOp)
                return n.apply(this, arguments);
            ur(t);
            try {
                return n.apply(this, arguments)
            } finally {
                fr(t)
            }
        }
    }
    function vl(n, t, i) {
        this.line = t;
        this.rest = eb(t);
        this.size = this.rest ? c(s(this.rest)) - i + 1 : 1;
        this.node = this.text = null;
        this.hidden = nr(n, t)
    }
    function ue(n, t, i) {
        for (var f, e = [], o, u = t; u < i; u = o)
            f = new vl(n.doc,r(n.doc, u),u),
            o = u + f.size,
            e.push(f);
        return e
    }
    function rt(n, t, i, r) {
        var u, f, o, s, e;
        t == null && (t = n.doc.first);
        i == null && (i = n.doc.first + n.doc.size);
        r || (r = 0);
        u = n.display;
        r && i < u.viewTo && (u.updateLineNumbers == null || u.updateLineNumbers > t) && (u.updateLineNumbers = t);
        n.curOp.viewChanged = !0;
        t >= u.viewTo ? ii && uh(n.doc, t) < u.viewTo && ri(n) : i <= u.viewFrom ? ii && nv(n.doc, i + r) > u.viewFrom ? ri(n) : (u.viewFrom += r,
        u.viewTo += r) : t <= u.viewFrom && i >= u.viewTo ? ri(n) : t <= u.viewFrom ? (f = fe(n, i, i + r, 1),
        f ? (u.view = u.view.slice(f.index),
        u.viewFrom = f.lineN,
        u.viewTo += r) : ri(n)) : i >= u.viewTo ? (f = fe(n, t, t, -1),
        f ? (u.view = u.view.slice(0, f.index),
        u.viewTo = f.lineN) : ri(n)) : (o = fe(n, t, t, -1),
        s = fe(n, i, i + r, 1),
        o && s ? (u.view = u.view.slice(0, o.index).concat(ue(n, o.lineN, s.lineN)).concat(u.view.slice(s.index)),
        u.viewTo += r) : ri(n));
        e = u.externalMeasured;
        e && (i < e.lineN ? e.lineN += r : t < e.lineN + e.size && (u.externalMeasured = null))
    }
    function wi(n, t, i) {
        var r, u, f, e;
        (n.curOp.viewChanged = !0,
        r = n.display,
        u = n.display.externalMeasured,
        u && t >= u.lineN && t < u.lineN + u.size && (r.externalMeasured = null),
        t < r.viewFrom || t >= r.viewTo) || (f = r.view[hu(n, t)],
        f.node != null) && (e = f.changes || (f.changes = []),
        g(e, i) == -1 && e.push(i))
    }
    function ri(n) {
        n.display.viewFrom = n.display.viewTo = n.doc.first;
        n.display.view = [];
        n.display.viewOffset = 0
    }
    function hu(n, t) {
        var r, i;
        if (t >= n.display.viewTo || (t -= n.display.viewFrom,
        t < 0))
            return null;
        for (r = n.display.view,
        i = 0; i < r.length; i++)
            if (t -= r[i].size,
            t < 0)
                return i
    }
    function fe(n, t, i, r) {
        var u = hu(n, t), o, f = n.display.view, s, e;
        if (!ii)
            return {
                index: u,
                lineN: i
            };
        for (s = 0,
        e = n.display.viewFrom; s < u; s++)
            e += f[s].size;
        if (e != t) {
            if (r > 0) {
                if (u == f.length - 1)
                    return null;
                o = e + f[u].size - t;
                u++
            } else
                o = e - t;
            t += o;
            i += o
        }
        while (uh(n.doc, i) != i) {
            if (u == (r < 0 ? 0 : f.length - 1))
                return null;
            i += r * f[u - (r < 0 ? 1 : 0)].size;
            u += r
        }
        return {
            index: u,
            lineN: i
        }
    }
    function fw(n, t, i) {
        var r = n.display
          , u = r.view;
        u.length == 0 || t >= r.viewTo || i <= r.viewFrom ? (r.view = ue(n, t, i),
        r.viewFrom = t) : (r.viewFrom > t ? r.view = ue(n, t, r.viewFrom).concat(r.view) : r.viewFrom < t && (r.view = r.view.slice(hu(n, t))),
        r.viewFrom = t,
        r.viewTo < i ? r.view = r.view.concat(ue(n, r.viewTo, i)) : r.viewTo > i && (r.view = r.view.slice(0, hu(n, i))));
        r.viewTo = i
    }
    function yl(n) {
        for (var t, r = n.display.view, u = 0, i = 0; i < r.length; i++)
            t = r[i],
            t.hidden || t.node && !t.changes || ++u;
        return u
    }
    function ee(n) {
        n.display.pollingFast || n.display.poll.set(n.options.pollInterval, function() {
            cs(n);
            n.state.focused && ee(n)
        })
    }
    function cu(n) {
        function i() {
            var r = cs(n);
            r || t ? (n.display.pollingFast = !1,
            ee(n)) : (t = !0,
            n.display.poll.set(60, i))
        }
        var t = !1;
        n.display.pollingFast = !0;
        n.display.poll.set(20, i)
    }
    function cs(n) {
        var o = n.display.input, h = n.display.prevInput, c = n.doc, i, k, u, tt, f, it, g, p, b;
        if (!n.state.focused || ik(o) || oe(n) || n.options.disableInput || (n.state.pasteIncoming && n.state.fakedLastChar && (o.value = o.value.substring(0, o.value.length - 1),
        n.state.fakedLastChar = !1),
        i = o.value,
        i == h && !n.somethingSelected()))
            return !1;
        if (nt && !y && n.display.inputHasSelection === i)
            return ct(n),
            !1;
        for (k = !n.curOp,
        k && ur(n),
        n.display.shift = !1,
        u = 0,
        tt = Math.min(h.length, i.length); u < tt && h.charCodeAt(u) == i.charCodeAt(u); )
            ++u;
        var d = i.slice(u)
          , l = kr(d)
          , rt = n.state.pasteIncoming && l.length > 1 && c.sel.ranges.length == l.length;
        for (f = c.sel.ranges.length - 1; f >= 0; f--) {
            var e = c.sel.ranges[f]
              , v = e.from()
              , a = e.to();
            if (u < h.length ? v = t(v.line, v.ch - (h.length - u)) : n.state.overwrite && e.empty() && !n.state.pasteIncoming && (a = t(a.line, Math.min(r(c, a.line).text.length, a.ch + s(l).length))),
            it = n.curOp.updateInput,
            g = {
                from: v,
                to: a,
                text: rt ? [l[f]] : l,
                origin: n.state.pasteIncoming ? "paste" : n.state.cutIncoming ? "cut" : "+input"
            },
            sr(n.doc, g),
            w(n, "inputRead", n, g),
            d && !n.state.pasteIncoming && n.options.electricChars && n.options.smartIndent && e.head.ch < 100 && (!f || c.sel.ranges[f - 1].head.line != e.head.line) && (p = n.getModeAt(e.head).electricChars,
            p))
                for (b = 0; b < p.length; b++)
                    if (d.indexOf(p.charAt(b)) > -1) {
                        we(n, e.head.line, "smart");
                        break
                    }
        }
        return di(n),
        n.curOp.updateInput = it,
        n.curOp.typing = !0,
        i.length > 1e3 || i.indexOf("\n") > -1 ? o.value = n.display.prevInput = "" : n.display.prevInput = i,
        k && fr(n),
        n.state.pasteIncoming = n.state.cutIncoming = !1,
        !0
    }
    function ct(n, t) {
        var i, f, e = n.doc, r, u;
        n.somethingSelected() ? (n.display.prevInput = "",
        r = e.sel.primary(),
        i = cy && (r.to().line - r.from().line > 100 || (f = n.getSelection()).length > 1e3),
        u = i ? "-" : f || n.getSelection(),
        n.display.input.value = u,
        n.state.focused && sf(n.display.input),
        nt && !y && (n.display.inputHasSelection = u)) : t || (n.display.prevInput = n.display.input.value = "",
        nt && !y && (n.display.inputHasSelection = null));
        n.display.inaccurateSelection = i
    }
    function it(n) {
        n.options.readOnly == "nocursor" || co && hi() == n.display.input || n.display.input.focus()
    }
    function ls(n) {
        n.state.focused || (it(n),
        vs(n))
    }
    function oe(n) {
        return n.options.readOnly || n.doc.cantEdit
    }
    function ew(n) {
        function r() {
            n.state.focused && setTimeout(wt(it, n), 0)
        }
        function u() {
            i == null && (i = setTimeout(function() {
                i = null;
                t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = af = null;
                n.setSize()
            }, 100))
        }
        function f() {
            sy(document.body, t.wrapper) ? setTimeout(f, 5e3) : oi(window, "resize", u)
        }
        function e(t) {
            pt(n, t) || ro(t)
        }
        function s(i) {
            t.inaccurateSelection && (t.prevInput = "",
            t.inaccurateSelection = !1,
            t.input.value = n.getSelection(),
            sf(t.input));
            i.type == "cut" && (n.state.cutIncoming = !0)
        }
        var t = n.display, i;
        o(t.scroller, "mousedown", v(n, pl));
        ft ? o(t.scroller, "dblclick", v(n, function(t) {
            var i, r;
            pt(n, t) || (i = er(n, t),
            !i || bl(n, t) || bi(n.display, t)) || (p(t),
            r = ds(n.doc, i),
            df(n.doc, r.anchor, r.head))
        })) : o(t.scroller, "dblclick", function(t) {
            pt(n, t) || p(t)
        });
        o(t.lineSpace, "selectstart", function(n) {
            bi(t, n) || p(n)
        });
        lo || o(t.scroller, "contextmenu", function(t) {
            ua(n, t)
        });
        o(t.scroller, "scroll", function() {
            t.scroller.clientHeight && (lu(n, t.scroller.scrollTop),
            or(n, t.scroller.scrollLeft, !0),
            a(n, "scroll", n))
        });
        o(t.scrollbarV, "scroll", function() {
            t.scroller.clientHeight && lu(n, t.scrollbarV.scrollTop)
        });
        o(t.scrollbarH, "scroll", function() {
            t.scroller.clientHeight && or(n, t.scrollbarH.scrollLeft)
        });
        o(t.scroller, "mousewheel", function(t) {
            kl(n, t)
        });
        o(t.scroller, "DOMMouseScroll", function(t) {
            kl(n, t)
        });
        o(t.scrollbarH, "mousedown", r);
        o(t.scrollbarV, "mousedown", r);
        o(t.wrapper, "scroll", function() {
            t.wrapper.scrollTop = t.wrapper.scrollLeft = 0
        });
        o(window, "resize", u);
        setTimeout(f, 5e3);
        o(t.input, "keyup", v(n, ia));
        o(t.input, "input", function() {
            nt && !y && n.display.inputHasSelection && (n.display.inputHasSelection = null);
            cu(n)
        });
        o(t.input, "keydown", v(n, ta));
        o(t.input, "keypress", v(n, ra));
        o(t.input, "focus", wt(vs, n));
        o(t.input, "blur", wt(ys, n));
        n.options.dragDrop && (o(t.scroller, "dragstart", function(t) {
            lw(n, t)
        }),
        o(t.scroller, "dragenter", e),
        o(t.scroller, "dragover", e),
        o(t.scroller, "drop", v(n, cw)));
        o(t.scroller, "paste", function(i) {
            bi(t, i) || (n.state.pasteIncoming = !0,
            it(n),
            cu(n))
        });
        o(t.input, "paste", function() {
            if (b && !n.state.fakedLastChar && !(new Date - n.state.lastMiddleDown < 200)) {
                var i = t.input.selectionStart
                  , r = t.input.selectionEnd;
                t.input.value += "$";
                t.input.selectionStart = i;
                t.input.selectionEnd = r;
                n.state.fakedLastChar = !0
            }
            n.state.pasteIncoming = !0;
            cu(n)
        });
        o(t.input, "cut", s);
        o(t.input, "copy", s);
        ho && o(t.sizer, "mouseup", function() {
            hi() == t.input && t.input.blur();
            it(n)
        })
    }
    function bi(n, t) {
        for (var i = ef(t); i != n.wrapper; i = i.parentNode)
            if (!i || i.ignoreEvents || i.parentNode == n.sizer && i != n.mover)
                return !0
    }
    function er(n, i, u, f) {
        var o = n.display, s, c, a, l, e, h, v;
        if (!u && (s = ef(i),
        s == o.scrollbarH || s == o.scrollbarV || s == o.scrollbarFiller || s == o.gutterFiller))
            return null;
        l = o.lineSpace.getBoundingClientRect();
        try {
            c = i.clientX - l.left;
            a = i.clientY - l.top
        } catch (i) {
            return null
        }
        return e = hs(n, c, a),
        f && e.xRel == 1 && (h = r(n.doc, e.line).text).length == e.ch && (v = st(h, h.length, n.options.tabSize) - h.length,
        e = t(e.line, Math.round((c - il(n.display).left) / su(n.display)) - v)),
        e
    }
    function pl(n) {
        var t, i, r;
        if (!pt(this, n)) {
            if (t = this,
            i = t.display,
            i.shift = n.shiftKey,
            bi(i, n)) {
                b || (i.scroller.draggable = !1,
                setTimeout(function() {
                    i.scroller.draggable = !0
                }, 100));
                return
            }
            if (!bl(t, n)) {
                r = er(t, n);
                window.focus();
                switch (ny(n)) {
                case 1:
                    r ? ow(t, n, r) : ef(n) == i.scroller && p(n);
                    break;
                case 2:
                    b && (t.state.lastMiddleDown = +new Date);
                    r && df(t.doc, r);
                    setTimeout(wt(it, t), 20);
                    p(n);
                    break;
                case 3:
                    lo && ua(t, n)
                }
            }
        }
    }
    function ow(n, t, i) {
        var r, u, f, o;
        setTimeout(wt(ls, n), 0);
        r = +new Date;
        he && he.time > r - 400 && e(he.pos, i) == 0 ? u = "triple" : se && se.time > r - 400 && e(se.pos, i) == 0 ? (u = "double",
        he = {
            time: r,
            pos: i
        }) : (u = "single",
        se = {
            time: r,
            pos: i
        });
        f = n.doc.sel;
        o = li ? t.metaKey : t.ctrlKey;
        n.options.dragDrop && hy && !o && !oe(n) && u == "single" && f.contains(i) > -1 && f.somethingSelected() ? sw(n, t, i) : hw(n, t, i, u, o)
    }
    function sw(n, t, i) {
        var r = n.display
          , u = v(n, function(f) {
            b && (r.scroller.draggable = !1);
            n.state.draggingText = !1;
            oi(document, "mouseup", u);
            oi(r.scroller, "drop", u);
            Math.abs(t.clientX - f.clientX) + Math.abs(t.clientY - f.clientY) < 10 && (p(f),
            df(n.doc, i),
            it(n),
            ft && !y && setTimeout(function() {
                document.body.focus();
                it(n)
            }, 20))
        });
        b && (r.scroller.draggable = !0);
        n.state.draggingText = u;
        r.scroller.dragDrop && r.scroller.dragDrop();
        o(document, "mouseup", u);
        o(r.scroller, "drop", u)
    }
    function hw(n, i, f, s, c) {
        function lt(i) {
            var c, ot, b, p, v, o;
            if (e(g, i) != 0)
                if (g = i,
                s == "rect") {
                    var o = []
                      , w = n.options.tabSize
                      , it = st(r(l, f.line).text, f.ch, w)
                      , ut = st(r(l, i.line).text, i.ch, w)
                      , ft = Math.min(it, ut)
                      , et = Math.max(it, ut);
                    for (c = Math.min(f.line, i.line),
                    ot = Math.min(n.lastLine(), Math.max(f.line, i.line)); c <= ot; c++)
                        b = r(l, c).text,
                        p = iy(b, ft, w),
                        ft == et ? o.push(new h(t(c, p),t(c, p))) : b.length > p && o.push(new h(t(c, p),t(c, iy(b, et, w))));
                    o.length || o.push(new h(f,f));
                    k(l, ht(rt.ranges.slice(0, y).concat(o), y), fo)
                } else {
                    var nt = a
                      , d = nt.anchor
                      , tt = i;
                    s != "single" && (v = s == "double" ? ds(l, i) : new h(t(i.line, 0),u(l, t(i.line + 1, 0))),
                    e(v.anchor, d) > 0 ? (tt = v.head,
                    d = rs(nt.from(), v.anchor)) : (tt = v.anchor,
                    d = is(nt.to(), v.head)));
                    o = rt.ranges.slice(0);
                    o[y] = new h(u(l, d),tt);
                    k(l, ht(o, y), fo)
                }
        }
        function ft(t) {
            var f = ++w, i = er(n, t, !0, s == "rect"), r, u;
            i && (e(i, g) != 0 ? (ls(n),
            lt(i),
            r = wo(tt, l),
            (i.line >= r.to || i.line < r.from) && setTimeout(v(n, function() {
                w == f && ft(t)
            }), 150)) : (u = t.clientY < ut.top ? -20 : t.clientY > ut.bottom ? 20 : 0,
            u && setTimeout(v(n, function() {
                w == f && (tt.scroller.scrollTop += u,
                ft(t))
            }), 50)))
        }
        function ct(t) {
            w = Infinity;
            p(t);
            it(n);
            oi(document, "mousemove", et);
            oi(document, "mouseup", ot);
            l.history.lastSelOrigin = null
        }
        var tt = n.display, l = n.doc, a, y, rt, b, d, g, ut, w, et, ot;
        p(i);
        rt = l.sel;
        c ? (y = l.sel.contains(f),
        a = y > -1 ? l.sel.ranges[y] : new h(f,f)) : a = l.sel.primary();
        i.altKey ? (s = "rect",
        c || (a = new h(f,f)),
        f = er(n, i, !0, !0),
        y = -1) : s == "double" ? (b = ds(l, f),
        a = n.display.shift || l.extend ? uu(l, a, b.anchor, b.head) : b) : s == "triple" ? (d = new h(t(f.line, 0),u(l, t(f.line + 1, 0))),
        a = n.display.shift || l.extend ? uu(l, a, d.anchor, d.head) : d) : a = uu(l, a, f);
        c ? y > -1 ? wc(l, y, a, fo) : (y = l.sel.ranges.length,
        k(l, ht(l.sel.ranges.concat([a]), y), {
            scroll: !1,
            origin: "*mouse"
        })) : (y = 0,
        k(l, new kt([a],0), fo));
        g = f;
        ut = tt.wrapper.getBoundingClientRect();
        w = 0;
        et = v(n, function(n) {
            (nt && !yy ? n.buttons : ny(n)) ? ft(n) : ct(n)
        });
        ot = v(n, ct);
        o(document, "mousemove", et);
        o(document, "mouseup", ot)
    }
    function wl(n, t, i, r, u) {
        var s, e, o, h, f, c, l, a;
        try {
            s = t.clientX;
            e = t.clientY
        } catch (t) {
            return !1
        }
        if (s >= Math.floor(n.display.gutters.getBoundingClientRect().right))
            return !1;
        if (r && p(t),
        o = n.display,
        h = o.lineDiv.getBoundingClientRect(),
        e > h.bottom || !ot(n, i))
            return ch(t);
        for (e -= h.top - o.viewOffset,
        f = 0; f < n.options.gutters.length; ++f)
            if (c = o.gutters.childNodes[f],
            c && c.getBoundingClientRect().right >= s)
                return l = tr(n.doc, e),
                a = n.options.gutters[f],
                u(n, i, n, l, a, t),
                ch(t)
    }
    function bl(n, t) {
        return wl(n, t, "gutterClick", !0, w)
    }
    function cw(n) {
        var t = this, i, f, e, o, r;
        if (!pt(t, n) && !bi(t.display, n) && (p(n),
        ft && (as = +new Date),
        i = er(t, n, !0),
        f = n.dataTransfer.files,
        i && !oe(t)))
            if (f && f.length && window.FileReader && window.File) {
                var s = f.length
                  , e = Array(s)
                  , h = 0
                  , c = function(n, r) {
                    var f = new FileReader;
                    f.onload = function() {
                        if (e[r] = f.result,
                        ++h == s) {
                            i = u(t.doc, i);
                            var n = {
                                from: i,
                                to: i,
                                text: kr(e.join("\n")),
                                origin: "paste"
                            };
                            sr(t.doc, n);
                            kc(t.doc, vi(i, ki(n)))
                        }
                    }
                    ;
                    f.readAsText(n)
                };
                for (r = 0; r < s; ++r)
                    c(f[r], r)
            } else {
                if (t.state.draggingText && t.doc.sel.contains(i) > -1) {
                    t.state.draggingText(n);
                    setTimeout(wt(it, t), 20);
                    return
                }
                try {
                    if (e = n.dataTransfer.getData("Text"),
                    e) {
                        if (o = t.state.draggingText && t.listSelections(),
                        gf(t.doc, vi(i, i)),
                        o)
                            for (r = 0; r < o.length; ++r)
                                ve(t.doc, "", o[r].anchor, o[r].head, "drag");
                        t.replaceSelection(e, "around", "paste");
                        it(t)
                    }
                } catch (n) {}
            }
    }
    function lw(n, t) {
        if (ft && (!n.state.draggingText || +new Date - as < 100)) {
            ro(t);
            return
        }
        if (!pt(n, t) && !bi(n.display, t) && (t.dataTransfer.setData("Text", n.getSelection()),
        t.dataTransfer.setDragImage && !gh)) {
            var r = i("img", null, null, "position: fixed; left: 0; top: 0;");
            r.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
            et && (r.width = r.height = 1,
            n.display.wrapper.appendChild(r),
            r._top = r.offsetTop);
            t.dataTransfer.setDragImage(r, 0, 0);
            et && r.parentNode.removeChild(r)
        }
    }
    function lu(n, t) {
        Math.abs(n.doc.scrollTop - t) < 2 || (n.doc.scrollTop = t,
        dr || bf(n, {
            top: t
        }),
        n.display.scroller.scrollTop != t && (n.display.scroller.scrollTop = t),
        n.display.scrollbarV.scrollTop != t && (n.display.scrollbarV.scrollTop = t),
        dr && bf(n),
        fu(n, 100))
    }
    function or(n, t, i) {
        (i ? t == n.doc.scrollLeft : Math.abs(n.doc.scrollLeft - t) < 2) || (t = Math.min(t, n.display.scroller.scrollWidth - n.display.scroller.clientWidth),
        n.doc.scrollLeft = t,
        bo(n),
        n.display.scroller.scrollLeft != t && (n.display.scroller.scrollLeft = t),
        n.display.scrollbarH.scrollLeft != t && (n.display.scrollbarH.scrollLeft = t))
    }
    function kl(n, t) {
        var f = t.wheelDeltaX, u = t.wheelDeltaY, i, r, e, h, o;
        if (f == null && t.detail && t.axis == t.HORIZONTAL_AXIS && (f = t.detail),
        u == null && t.detail && t.axis == t.VERTICAL_AXIS ? u = t.detail : u == null && (u = t.wheelDelta),
        i = n.display,
        r = i.scroller,
        f && r.scrollWidth > r.clientWidth || u && r.scrollHeight > r.clientHeight) {
            if (u && li && b)
                n: for (e = t.target,
                h = i.view; e != r; e = e.parentNode)
                    for (o = 0; o < h.length; o++)
                        if (h[o].node == e) {
                            n.display.currentWheelTarget = e;
                            break n
                        }
            if (f && !dr && !et && ut != null) {
                u && lu(n, Math.max(0, Math.min(r.scrollTop + u * ut, r.scrollHeight - r.clientHeight)));
                or(n, Math.max(0, Math.min(r.scrollLeft + f * ut, r.scrollWidth - r.clientWidth)));
                p(t);
                i.wheelStartX = null;
                return
            }
            if (u && ut != null) {
                var c = u * ut
                  , s = n.doc.scrollTop
                  , l = s + i.wrapper.clientHeight;
                c < 0 ? s = Math.max(0, s + c - 50) : l = Math.min(n.doc.height, l + c + 50);
                bf(n, {
                    top: s,
                    bottom: l
                })
            }
            au < 20 && (i.wheelStartX == null ? (i.wheelStartX = r.scrollLeft,
            i.wheelStartY = r.scrollTop,
            i.wheelDX = f,
            i.wheelDY = u,
            setTimeout(function() {
                if (i.wheelStartX != null) {
                    var n = r.scrollLeft - i.wheelStartX
                      , t = r.scrollTop - i.wheelStartY
                      , u = t && i.wheelDY && t / i.wheelDY || n && i.wheelDX && n / i.wheelDX;
                    (i.wheelStartX = i.wheelStartY = null,
                    u) && (ut = (ut * au + u) / (au + 1),
                    ++au)
                }
            }, 200)) : (i.wheelDX += f,
            i.wheelDY += u))
        }
    }
    function ce(n, t, i) {
        if (typeof t == "string" && (t = yu[t],
        !t))
            return !1;
        n.display.pollingFast && cs(n) && (n.display.pollingFast = !1);
        var u = n.display.shift
          , r = !1;
        try {
            oe(n) && (n.state.suppressEdits = !0);
            i && (n.display.shift = !1);
            r = t(n) != ty
        } finally {
            n.display.shift = u;
            n.state.suppressEdits = !1
        }
        return r
    }
    function dl(n) {
        var t = n.state.keyMaps.slice(0);
        return n.options.extraKeys && t.push(n.options.extraKeys),
        t.push(n.options.keyMap),
        t
    }
    function na(n, t) {
        var e = ih(n.options.keyMap), r = e.auto, i, u, f;
        return (clearTimeout(gl),
        r && !dw(t) && (gl = setTimeout(function() {
            ih(n.options.keyMap) == e && (n.options.keyMap = r.call ? r.call(null, n) : r,
            rc(n))
        }, 50)),
        i = gw(t, !0),
        u = !1,
        !i) ? !1 : (f = dl(n),
        u = t.shiftKey ? ge("Shift-" + i, f, function(t) {
            return ce(n, t, !0)
        }) || ge(i, f, function(t) {
            if (typeof t == "string" ? /^go[A-Z]/.test(t) : t.motion)
                return ce(n, t)
        }) : ge(i, f, function(t) {
            return ce(n, t)
        }),
        u && (p(t),
        te(n),
        w(n, "keyHandled", n, i, t)),
        u)
    }
    function aw(n, t, i) {
        var r = ge("'" + i + "'", dl(n), function(t) {
            return ce(n, t, !0)
        });
        return r && (p(t),
        te(n),
        w(n, "keyHandled", n, "'" + i + "'", t)),
        r
    }
    function ta(n) {
        var t = this, i, r;
        (ls(t),
        pt(t, n)) || (ft && n.keyCode == 27 && (n.returnValue = !1),
        i = n.keyCode,
        t.display.shift = i == 16 || n.shiftKey,
        r = na(t, n),
        et && (le = r ? i : null,
        r || i != 88 || cy || !(li ? n.metaKey : n.ctrlKey) || t.replaceSelection("", null, "cut")))
    }
    function ia(n) {
        pt(this, n) || n.keyCode == 16 && (this.doc.sel.shift = !1)
    }
    function ra(n) {
        var t = this, i, r, u;
        if (!pt(t, n)) {
            if (i = n.keyCode,
            r = n.charCode,
            et && i == le) {
                le = null;
                p(n);
                return
            }
            (et && (!n.which || n.which < 10) || ho) && na(t, n) || (u = String.fromCharCode(r == null ? i : r),
            aw(t, n, u)) || (nt && !y && (t.display.inputHasSelection = null),
            cu(t))
        }
    }
    function vs(n) {
        n.options.readOnly != "nocursor" && (n.state.focused || (a(n, "focus", n),
        n.state.focused = !0,
        n.display.wrapper.className.search(/\bCodeMirror-focused\b/) == -1 && (n.display.wrapper.className += " CodeMirror-focused"),
        n.curOp || (ct(n),
        b && setTimeout(wt(ct, n, !0), 0))),
        ee(n),
        te(n))
    }
    function ys(n) {
        n.state.focused && (a(n, "blur", n),
        n.state.focused = !1,
        n.display.wrapper.className = n.display.wrapper.className.replace(" CodeMirror-focused", ""));
        clearInterval(n.display.blinker);
        setTimeout(function() {
            n.state.focused || (n.display.shift = !1)
        }, 150)
    }
    function ua(n, t) {
        function h() {
            if (i.input.selectionStart != null) {
                var t = i.input.value = "​" + (n.somethingSelected() ? i.input.value : "");
                i.prevInput = "​";
                i.input.selectionStart = 1;
                i.input.selectionEnd = t.length
            }
        }
        function c() {
            if (i.inputDiv.style.position = "relative",
            i.input.style.cssText = s,
            y && (i.scrollbarV.scrollTop = i.scroller.scrollTop = f),
            ee(n),
            i.input.selectionStart != null) {
                (!nt || y) && h();
                clearTimeout(ps);
                var r = 0
                  , t = function() {
                    i.prevInput == "​" && i.input.selectionStart == 0 ? v(n, yu.selectAll)(n) : r++ < 10 ? ps = setTimeout(t, 500) : ct(n)
                };
                ps = setTimeout(t, 200)
            }
        }
        var i, r, f, e, s, u;
        pt(n, t, "contextmenu") || (i = n.display,
        bi(i, t) || vw(n, t)) || (r = er(n, t),
        f = i.scroller.scrollTop,
        r && !et) && (e = n.options.resetSelectionOnContextMenu,
        e && n.doc.sel.contains(r) == -1 && v(n, k)(n.doc, vi(r), br),
        s = i.input.style.cssText,
        i.inputDiv.style.position = "absolute",
        i.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (t.clientY - 5) + "px; left: " + (t.clientX - 5) + "px; z-index: 1000; background: " + (nt ? "rgba(255, 255, 255, .05)" : "transparent") + "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);",
        it(n),
        ct(n),
        n.somethingSelected() || (i.input.value = i.prevInput = " "),
        nt && !y && h(),
        lo ? (ro(t),
        u = function() {
            oi(window, "mouseup", u);
            setTimeout(c, 20)
        }
        ,
        o(window, "mouseup", u)) : setTimeout(c, 50))
    }
    function vw(n, t) {
        return ot(n, "gutterContextMenu") ? wl(n, t, "gutterContextMenu", !1, a) : !1
    }
    function fa(n, i) {
        if (e(n, i.from) < 0)
            return n;
        if (e(n, i.to) <= 0)
            return ki(i);
        var u = n.line + i.text.length - (i.to.line - i.from.line) - 1
          , r = n.ch;
        return n.line == i.to.line && (r += ki(i).ch - i.to.ch),
        t(u, r)
    }
    function ws(n, t) {
        for (var r, u = [], i = 0; i < n.sel.ranges.length; i++)
            r = n.sel.ranges[i],
            u.push(new h(fa(r.anchor, t),fa(r.head, t)));
        return ht(u, n.sel.primIndex)
    }
    function ea(n, i, r) {
        return n.line == i.line ? t(r.line, n.ch - i.ch + r.ch) : t(r.line + (n.line - i.line), n.ch)
    }
    function yw(n, i, r) {
        for (var v, y, s = [], f = t(n.first, 0), c = f, u = 0; u < i.length; u++) {
            var l = i[u]
              , o = ea(l.from, f, c)
              , a = ea(ki(l), f, c);
            f = l.to;
            c = a;
            r == "around" ? (v = n.sel.ranges[u],
            y = e(v.head, v.anchor) < 0,
            s[u] = new h(y ? a : o,y ? o : a)) : s[u] = new h(o,o)
        }
        return new kt(s,n.sel.primIndex)
    }
    function oa(n, t, i) {
        var r = {
            canceled: !1,
            from: t.from,
            to: t.to,
            text: t.text,
            origin: t.origin,
            cancel: function() {
                this.canceled = !0
            }
        };
        return (i && (r.update = function(t, i, r, f) {
            t && (this.from = u(n, t));
            i && (this.to = u(n, i));
            r && (this.text = r);
            f !== undefined && (this.origin = f)
        }
        ),
        a(n, "beforeChange", n, r),
        n.cm && a(n.cm, "beforeChange", n.cm, r),
        r.canceled) ? null : {
            from: r.from,
            to: r.to,
            text: r.text,
            origin: r.origin
        }
    }
    function sr(n, t, i) {
        var u, r;
        if (n.cm) {
            if (!n.cm.curOp)
                return v(n.cm, sr)(n, t, i);
            if (n.cm.state.suppressEdits)
                return
        }
        if (!ot(n, "beforeChange") && (!n.cm || !ot(n.cm, "beforeChange")) || (t = oa(n, t, !0),
        t))
            if (u = tc && !i && fb(n, t.from, t.to),
            u)
                for (r = u.length - 1; r >= 0; --r)
                    sa(n, {
                        from: u[r].from,
                        to: u[r].to,
                        text: r ? [""] : t.text
                    });
            else
                sa(n, t)
    }
    function sa(n, t) {
        var i, r;
        (t.text.length != 1 || t.text[0] != "" || e(t.from, t.to) != 0) && (i = ws(n, t),
        pv(n, t, i, n.cm ? n.cm.curOp.id : NaN),
        vu(n, t, i, rh(n, t)),
        r = [],
        yr(n, function(n, i) {
            i || g(r, n.history) != -1 || (dv(n.history, t),
            r.push(n.history));
            vu(n, t, null, rh(n, t))
        }))
    }
    function ae(n, t, i) {
        var c, v, u, f, y, l;
        if (!n.cm || !n.cm.state.suppressEdits) {
            var e = n.history, r, a = n.sel, o = t == "undo" ? e.done : e.undone, h = t == "undo" ? e.undone : e.done;
            for (u = 0; u < o.length; u++)
                if (r = o[u],
                i ? r.ranges && !r.equals(n.sel) : !r.ranges)
                    break;
            if (u != o.length) {
                for (e.lastOrigin = e.lastSelOrigin = null; ; )
                    if (r = o.pop(),
                    r.ranges) {
                        if (io(r, h),
                        i && !r.equals(n.sel)) {
                            k(n, r, {
                                clearRedo: !1
                            });
                            return
                        }
                        a = r
                    } else
                        break;
                for (c = [],
                io(a, h),
                h.push({
                    changes: c,
                    generation: e.generation
                }),
                e.generation = r.generation || ++e.maxGeneration,
                v = ot(n, "beforeChange") || n.cm && ot(n.cm, "beforeChange"),
                u = r.changes.length - 1; u >= 0; --u) {
                    if (f = r.changes[u],
                    f.origin = t,
                    v && !oa(n, f, !1)) {
                        o.length = 0;
                        return
                    }
                    c.push(hh(n, f));
                    y = u ? ws(n, f, null) : s(o);
                    vu(n, f, y, ya(n, f));
                    n.cm && di(n.cm);
                    l = [];
                    yr(n, function(n, t) {
                        t || g(l, n.history) != -1 || (dv(n.history, f),
                        l.push(n.history));
                        vu(n, f, null, ya(n, f))
                    })
                }
            }
        }
    }
    function ha(n, i) {
        n.first += i;
        n.sel = new kt(ah(n.sel.ranges, function(n) {
            return new h(t(n.anchor.line + i, n.anchor.ch),t(n.head.line + i, n.head.ch))
        }),n.sel.primIndex);
        n.cm && rt(n.cm, n.first, n.first - i, i)
    }
    function vu(n, i, u, f) {
        var o, e;
        if (n.cm && !n.cm.curOp)
            return v(n.cm, vu)(n, i, u, f);
        if (i.to.line < n.first) {
            ha(n, i.text.length - 1 - (i.to.line - i.from.line));
            return
        }
        i.from.line > n.lastLine() || (i.from.line < n.first && (o = i.text.length - 1 - (n.first - i.from.line),
        ha(n, o),
        i = {
            from: t(n.first, 0),
            to: t(i.to.line + o, i.to.ch),
            text: [s(i.text)],
            origin: i.origin
        }),
        e = n.lastLine(),
        i.to.line > e && (i = {
            from: i.from,
            to: t(e, r(n, e).text.length),
            text: [i.text[0]],
            origin: i.origin
        }),
        i.removed = ff(n, i.from, i.to),
        u || (u = ws(n, i, null)),
        n.cm ? pw(n.cm, i, f) : oh(n, i, f),
        gf(n, u, br))
    }
    function pw(n, t, i) {
        var f = n.doc, e = n.display, u = t.from, o = t.to, s = !1, h = u.line, l;
        n.options.lineWrapping || (h = c(at(r(f, u.line))),
        f.iter(h, o.line + 1, function(n) {
            if (n == e.maxLine)
                return s = !0,
                !0
        }));
        f.sel.contains(t.from, t.to) > -1 && (n.curOp.cursorActivity = !0);
        oh(f, t, i, ic(n));
        n.options.lineWrapping || (f.iter(h, u.line + t.text.length, function(n) {
            var t = pf(n);
            t > e.maxLineLength && (e.maxLine = n,
            e.maxLineLength = t,
            e.maxLineChanged = !0,
            s = !1)
        }),
        s && (n.curOp.updateMaxLine = !0));
        f.frontier = Math.min(f.frontier, u.line);
        fu(n, 400);
        l = t.text.length - (o.line - u.line) - 1;
        u.line != o.line || t.text.length != 1 || cv(n.doc, t) ? rt(n, u.line, o.line + 1, l) : wi(n, u.line, "text");
        (ot(n, "change") || ot(n, "changes")) && (n.curOp.changeObjs || (n.curOp.changeObjs = [])).push({
            from: u,
            to: o,
            text: t.text,
            removed: t.removed,
            origin: t.origin
        })
    }
    function ve(n, t, i, r, u) {
        if (r || (r = i),
        e(r, i) < 0) {
            var f = r;
            r = i;
            i = f
        }
        typeof t == "string" && (t = kr(t));
        sr(n, {
            from: i,
            to: r,
            text: t,
            origin: u
        })
    }
    function ww(n, t) {
        var f = n.display, e = f.sizer.getBoundingClientRect(), r = null, u;
        t.top + e.top < 0 ? r = !0 : t.bottom + e.top > (window.innerHeight || document.documentElement.clientHeight) && (r = !1);
        r == null || gy || (u = i("div", "​", null, "position: absolute; top: " + (t.top - f.viewOffset - ie(n.display)) + "px; height: " + (t.bottom - t.top + ti) + "px; left: " + t.left + "px; width: 2px;"),
        n.display.lineSpace.appendChild(u),
        u.scrollIntoView(r),
        n.display.lineSpace.removeChild(u))
    }
    function bw(n, t, i, r) {
        for (r == null && (r = 0); ; ) {
            var o = !1
              , u = dt(n, t)
              , f = !i || i == t ? u : dt(n, i)
              , e = ye(n, Math.min(u.left, f.left), Math.min(u.top, f.top) - r, Math.max(u.left, f.left), Math.max(u.bottom, f.bottom) + r)
              , s = n.doc.scrollTop
              , h = n.doc.scrollLeft;
            if (e.scrollTop != null && (lu(n, e.scrollTop),
            Math.abs(n.doc.scrollTop - s) > 1 && (o = !0)),
            e.scrollLeft != null && (or(n, e.scrollLeft),
            Math.abs(n.doc.scrollLeft - h) > 1 && (o = !0)),
            !o)
                return u
        }
    }
    function kw(n, t, i, r, u) {
        var f = ye(n, t, i, r, u);
        f.scrollTop != null && lu(n, f.scrollTop);
        f.scrollLeft != null && or(n, f.scrollLeft)
    }
    function ye(n, t, i, r, u) {
        var f = n.display, v = pi(n.display), h, c, l, o, a;
        i < 0 && (i = 0);
        var s = n.curOp && n.curOp.scrollTop != null ? n.curOp.scrollTop : f.scroller.scrollTop
          , y = f.scroller.clientHeight - ti
          , e = {}
          , p = n.doc.height + tl(f)
          , w = i < v
          , b = u > p - v;
        return i < s ? e.scrollTop = w ? 0 : i : u > s + y && (h = Math.min(i, (b ? p : u) - y),
        h != s && (e.scrollTop = h)),
        c = n.curOp && n.curOp.scrollLeft != null ? n.curOp.scrollLeft : f.scroller.scrollLeft,
        l = f.scroller.clientWidth - ti,
        t += f.gutters.offsetWidth,
        r += f.gutters.offsetWidth,
        o = f.gutters.offsetWidth,
        a = t < o + 10,
        t < c + o || a ? (a && (t = 0),
        e.scrollLeft = Math.max(0, t - 10 - o)) : r > l + c - 3 && (e.scrollLeft = r + 10 - l),
        e
    }
    function bs(n, t, i) {
        (t != null || i != null) && pe(n);
        t != null && (n.curOp.scrollLeft = (n.curOp.scrollLeft == null ? n.doc.scrollLeft : n.curOp.scrollLeft) + t);
        i != null && (n.curOp.scrollTop = (n.curOp.scrollTop == null ? n.doc.scrollTop : n.curOp.scrollTop) + i)
    }
    function di(n) {
        pe(n);
        var i = n.getCursor()
          , r = i
          , u = i;
        n.options.lineWrapping || (r = i.ch ? t(i.line, i.ch - 1) : i,
        u = t(i.line, i.ch + 1));
        n.curOp.scrollToPos = {
            from: r,
            to: u,
            margin: n.options.cursorScrollMargin,
            isCursor: !0
        }
    }
    function pe(n) {
        var t = n.curOp.scrollToPos;
        if (t) {
            n.curOp.scrollToPos = null;
            var i = ll(n, t.from)
              , r = ll(n, t.to)
              , u = ye(n, Math.min(i.left, r.left), Math.min(i.top, r.top) - t.margin, Math.max(i.right, r.right), Math.max(i.bottom, r.bottom) + t.margin);
            n.scrollTo(u.scrollLeft, u.scrollTop)
        }
    }
    function we(n, i, u, f) {
        var l = n.doc, b, a, e, v, s, w, c;
        u == null && (u = "add");
        u == "smart" && (n.doc.mode.indent ? b = eu(n, i) : u = "prev");
        var y = n.options.tabSize
          , o = r(l, i)
          , p = st(o.text, null, y);
        if (o.stateAfter && (o.stateAfter = null),
        a = o.text.match(/^\s*/)[0],
        f || /\S/.test(o.text)) {
            if (u == "smart" && (e = n.doc.mode.indent(b, o.text.slice(a.length), o.text),
            e == ty)) {
                if (!f)
                    return;
                u = "prev"
            }
        } else
            e = 0,
            u = "not";
        if (u == "prev" ? e = i > l.first ? st(r(l, i - 1).text, null, y) : 0 : u == "add" ? e = p + n.options.indentUnit : u == "subtract" ? e = p - n.options.indentUnit : typeof u == "number" && (e = p + u),
        e = Math.max(0, e),
        v = "",
        c = 0,
        n.options.indentWithTabs)
            for (s = Math.floor(e / y); s; --s)
                c += y,
                v += "\t";
        if (c < e && (v += ry(e - c)),
        v != a)
            ve(n.doc, v, t(i, 0), t(i, a.length), "+input");
        else
            for (s = 0; s < l.sel.ranges.length; s++)
                if (w = l.sel.ranges[s],
                w.head.line == i && w.head.ch < a.length) {
                    c = t(i, a.length);
                    wc(l, s, new h(c,c));
                    break
                }
        o.stateAfter = null
    }
    function be(n, t, i, u) {
        var f = t
          , e = t
          , o = n.doc;
        if (typeof t == "number" ? e = r(o, yc(o, t)) : f = c(t),
        f == null)
            return null;
        if (u(e, f))
            wi(n, f, i);
        else
            return null;
        return e
    }
    function ke(n, t) {
        for (var r, f, o = n.doc.sel.ranges, i = [], u = 0; u < o.length; u++) {
            for (r = t(o[u]); i.length && e(r.from, s(i).to) <= 0; )
                if (f = i.pop(),
                e(f.from, r.from) < 0) {
                    r.from = f.from;
                    break
                }
            i.push(r)
        }
        gt(n, function() {
            for (var t = i.length - 1; t >= 0; t--)
                ve(n.doc, "", i[t].from, i[t].to, "+delete");
            di(n)
        })
    }
    function ks(n, i, u, f, e) {
        function d() {
            var t = a + u;
            return t < n.first || t >= n.first + n.size ? w = !1 : (a = t,
            h = r(n, t))
        }
        function c(n) {
            var t = (e ? dh : ay)(h, o, u, !0);
            if (t == null)
                if (!n && d())
                    o = e ? (u < 0 ? so : oo)(h) : u < 0 ? h.text.length : 0;
                else
                    return w = !1;
            else
                o = t;
            return !0
        }
        var a = i.line, o = i.ch, k = u, h = r(n, a), w = !0, v, y, l, p, s, b;
        if (f == "char")
            c();
        else if (f == "column")
            c(!0);
        else if (f == "word" || f == "group")
            for (v = null,
            y = f == "group",
            l = !0; ; l = !1) {
                if (u < 0 && !c(!l))
                    break;
                if (p = h.text.charAt(o) || "\n",
                s = hf(p) ? "w" : y && p == "\n" ? "n" : !y || /\s/.test(p) ? null : "p",
                !y || l || s || (s = "s"),
                v && v != s) {
                    u < 0 && (u = 1,
                    c());
                    break
                }
                if (s && (v = s),
                u > 0 && !c(!l))
                    break
            }
        return b = ne(n, t(a, o), k, !0),
        w || (b.hitSide = !0),
        b
    }
    function ca(n, t, i, r) {
        var o = n.doc, s = t.left, u, e, f;
        for (r == "page" ? (e = Math.min(n.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight),
        u = t.top + i * (e - (i < 0 ? 1.5 : .5) * pi(n.display))) : r == "line" && (u = i > 0 ? t.bottom + 3 : t.top - 3); ; ) {
            if (f = hs(n, s, u),
            !f.outside)
                break;
            if (i < 0 ? u <= 0 : u >= o.height) {
                f.hitSide = !0;
                break
            }
            u += i * 5
        }
        return f
    }
    function ds(n, i) {
        var f = r(n, i.line).text, u = i.ch, e = i.ch, o, s;
        if (f) {
            for ((i.xRel < 0 || e == f.length) && u ? --u : ++e,
            o = f.charAt(u),
            s = hf(o) ? hf : /\s/.test(o) ? function(n) {
                return /\s/.test(n)
            }
            : function(n) {
                return !/\s/.test(n) && !hf(n)
            }
            ; u > 0 && s(f.charAt(u - 1)); )
                --u;
            while (e < f.length && s(f.charAt(e)))
                ++e
        }
        return new h(t(i.line, u),t(i.line, e))
    }
    function f(t, i, r, u) {
        n.defaults[t] = i;
        r && (gi[t] = u ? function(n, t, i) {
            i != nh && r(n, t, i)
        }
        : r)
    }
    function ih(n) {
        return typeof n == "string" ? lt[n] : n
    }
    function wu(n, t, r, u, f) {
        var s, a, c, h, y, l;
        if (u && u.shared)
            return nb(n, t, r, u, f);
        if (n.cm && !n.cm.curOp)
            return v(n.cm, wu)(n, t, r, u, f);
        if (s = new fi(n,f),
        a = e(t, r),
        u && eo(u, s),
        a > 0 || a == 0 && s.clearWhenEmpty !== !1)
            return s;
        if (s.replacedWith && (s.collapsed = !0,
        s.widgetNode = i("span", [s.replacedWith], "CodeMirror-widget"),
        u.handleMouseEvents || (s.widgetNode.ignoreEvents = !0),
        u.insertLeft && (s.widgetNode.insertLeft = !0)),
        s.collapsed) {
            if (ga(n, t.line, t, r, s) || t.line != r.line && ga(n, r.line, t, r, s))
                throw new Error("Inserting collapsed marker partially overlapping an existing one");
            ii = !0
        }
        if (s.addToHistory && pv(n, {
            from: t,
            to: r,
            origin: "markText"
        }, n.sel, NaN),
        c = t.line,
        h = n.cm,
        n.iter(c, r.line + 1, function(n) {
            h && s.collapsed && !h.options.lineWrapping && at(n) == h.display.maxLine && (y = !0);
            s.collapsed && c != t.line && vt(n, 0);
            ib(n, new no(s,c == t.line ? t.ch : null,c == r.line ? r.ch : null));
            ++c
        }),
        s.collapsed && n.iter(t.line, r.line + 1, function(t) {
            nr(n, t) && vt(t, 0)
        }),
        s.clearOnEnter && o(s, "beforeCursorEnter", function() {
            s.clear()
        }),
        s.readOnly && (tc = !0,
        (n.history.done.length || n.history.undone.length) && n.clearHistory()),
        s.collapsed && (s.id = ++aa,
        s.atomic = !0),
        h) {
            if (y && (h.curOp.updateMaxLine = !0),
            s.collapsed)
                rt(h, t.line, r.line + 1);
            else if (s.className || s.title || s.startStyle || s.endStyle)
                for (l = t.line; l <= r.line; l++)
                    wi(h, l, "text");
            s.atomic && gc(h.doc);
            w(h, "markerAdded", h, s)
        }
        return s
    }
    function nb(n, t, i, r, f) {
        r = eo(r);
        r.shared = !1;
        var e = [wu(n, t, i, r, f)]
          , o = e[0]
          , h = r.widgetNode;
        return yr(n, function(n) {
            h && (r.widgetNode = h.cloneNode(!0));
            e.push(wu(n, u(n, t), u(n, i), r, f));
            for (var c = 0; c < n.linked.length; ++c)
                if (n.linked[c].isParent)
                    return;
            o = s(e)
        }),
        new bu(e,o)
    }
    function no(n, t, i) {
        this.marker = n;
        this.from = t;
        this.to = i
    }
    function ku(n, t) {
        var i, r;
        if (n)
            for (i = 0; i < n.length; ++i)
                if (r = n[i],
                r.marker == t)
                    return r
    }
    function tb(n, t) {
        for (var r, i = 0; i < n.length; ++i)
            n[i] != t && (r || (r = [])).push(n[i]);
        return r
    }
    function ib(n, t) {
        n.markedSpans = n.markedSpans ? n.markedSpans.concat([t]) : [t];
        t.marker.attachLine(n)
    }
    function rb(n, t, i) {
        var u, e, o;
        if (n)
            for (u = 0; u < n.length; ++u) {
                var r = n[u]
                  , f = r.marker
                  , s = r.from == null || (f.inclusiveLeft ? r.from <= t : r.from < t);
                !s && (r.from != t || f.type != "bookmark" || i && r.marker.insertLeft) || (o = r.to == null || (f.inclusiveRight ? r.to >= t : r.to > t),
                (e || (e = [])).push(new no(f,r.from,o ? null : r.to)))
            }
        return e
    }
    function ub(n, t, i) {
        var u, e, o;
        if (n)
            for (u = 0; u < n.length; ++u) {
                var r = n[u]
                  , f = r.marker
                  , s = r.to == null || (f.inclusiveRight ? r.to >= t : r.to > t);
                (s || r.from == t && f.type == "bookmark" && (!i || r.marker.insertLeft)) && (o = r.from == null || (f.inclusiveLeft ? r.from <= t : r.from < t),
                (e || (e = [])).push(new no(f,o ? null : r.from - t,r.to == null ? null : r.to - t)))
            }
        return e
    }
    function rh(n, t) {
        var w = ru(n, t.from.line) && r(n, t.from.line).markedSpans, b = ru(n, t.to.line) && r(n, t.to.line).markedSpans, f, h, a, y, p, u;
        if (!w && !b)
            return null;
        var v = t.from.ch
          , d = t.to.ch
          , k = e(t.from, t.to) == 0
          , i = rb(w, v, k)
          , o = ub(b, d, k)
          , c = t.text.length == 1
          , l = s(t.text).length + (c ? v : 0);
        if (i)
            for (u = 0; u < i.length; ++u)
                f = i[u],
                f.to == null && (h = ku(o, f.marker),
                h ? c && (f.to = h.to == null ? null : h.to + l) : f.to = v);
        if (o)
            for (u = 0; u < o.length; ++u)
                f = o[u],
                f.to != null && (f.to += l),
                f.from == null ? (h = ku(i, f.marker),
                h || (f.from = l,
                c && (i || (i = [])).push(f))) : (f.from += l,
                c && (i || (i = [])).push(f));
        if (i && (i = va(i)),
        o && o != i && (o = va(o)),
        a = [i],
        !c) {
            if (y = t.text.length - 2,
            y > 0 && i)
                for (u = 0; u < i.length; ++u)
                    i[u].to == null && (p || (p = [])).push(new no(i[u].marker,null,null));
            for (u = 0; u < y; ++u)
                a.push(p);
            a.push(o)
        }
        return a
    }
    function va(n) {
        for (var i, t = 0; t < n.length; ++t)
            i = n[t],
            i.from != null && i.from == i.to && i.marker.clearWhenEmpty !== !1 && n.splice(t--, 1);
        return n.length ? n : null
    }
    function ya(n, t) {
        var i = db(n, t), s = rh(n, t), r, f, u, e, h, o;
        if (!i)
            return s;
        if (!s)
            return i;
        for (r = 0; r < i.length; ++r)
            if (f = i[r],
            u = s[r],
            f && u)
                n: for (e = 0; e < u.length; ++e) {
                    for (h = u[e],
                    o = 0; o < f.length; ++o)
                        if (f[o].marker == h.marker)
                            continue n;
                    f.push(h)
                }
            else
                u && (i[r] = u);
        return i
    }
    function fb(n, t, i) {
        var r = null, o, h, c, u, s, f;
        if (n.iter(t.line, i.line + 1, function(n) {
            var t, i;
            if (n.markedSpans)
                for (t = 0; t < n.markedSpans.length; ++t)
                    i = n.markedSpans[t].marker,
                    i.readOnly && (!r || g(r, i) == -1) && (r || (r = [])).push(i)
        }),
        !r)
            return null;
        for (o = [{
            from: t,
            to: i
        }],
        h = 0; h < r.length; ++h)
            for (c = r[h],
            u = c.find(0),
            s = 0; s < o.length; ++s)
                if (f = o[s],
                !(e(f.to, u.from) < 0) && !(e(f.from, u.to) > 0)) {
                    var l = [s, 1]
                      , a = e(f.from, u.from)
                      , v = e(f.to, u.to);
                    (a < 0 || !c.inclusiveLeft && !a) && l.push({
                        from: f.from,
                        to: u.from
                    });
                    (v > 0 || !c.inclusiveRight && !v) && l.push({
                        from: u.to,
                        to: f.to
                    });
                    o.splice.apply(o, l);
                    s += l.length - 1
                }
        return o
    }
    function pa(n) {
        var i = n.markedSpans, t;
        if (i) {
            for (t = 0; t < i.length; ++t)
                i[t].marker.detachLine(n);
            n.markedSpans = null
        }
    }
    function wa(n, t) {
        if (t) {
            for (var i = 0; i < t.length; ++i)
                t[i].marker.attachLine(n);
            n.markedSpans = t
        }
    }
    function ar(n) {
        return n.inclusiveLeft ? -1 : 0
    }
    function vr(n) {
        return n.inclusiveRight ? 1 : 0
    }
    function ba(n, t) {
        var r = n.lines.length - t.lines.length, i;
        if (r != 0)
            return r;
        var u = n.find()
          , f = t.find()
          , o = e(u.from, f.from) || ar(n) - ar(t);
        return o ? -o : (i = e(u.to, f.to) || vr(n) - vr(t),
        i) ? i : t.id - n.id
    }
    function ka(n, t) {
        var f = ii && n.markedSpans, r, i, u;
        if (f)
            for (u = 0; u < f.length; ++u)
                i = f[u],
                i.marker.collapsed && (t ? i.from : i.to) == null && (!r || ba(r, i.marker) < 0) && (r = i.marker);
        return r
    }
    function da(n) {
        return ka(n, !0)
    }
    function du(n) {
        return ka(n, !1)
    }
    function ga(n, t, i, u, f) {
        var v = r(n, t), l = ii && v.markedSpans, s, o;
        if (l)
            for (s = 0; s < l.length; ++s)
                if (o = l[s],
                o.marker.collapsed) {
                    var h = o.marker.find(0)
                      , c = e(h.from, i) || ar(o.marker) - ar(f)
                      , a = e(h.to, u) || vr(o.marker) - vr(f);
                    if ((!(c >= 0) || !(a <= 0)) && (!(c <= 0) || !(a >= 0)) && (c <= 0 && (e(h.to, i) || vr(o.marker) - ar(f)) > 0 || c >= 0 && (e(h.from, u) || ar(o.marker) - vr(f)) < 0))
                        return !0
                }
    }
    function at(n) {
        for (var t; t = da(n); )
            n = t.find(-1, !0).line;
        return n
    }
    function eb(n) {
        for (var i, t; i = du(n); )
            n = i.find(1, !0).line,
            (t || (t = [])).push(n);
        return t
    }
    function uh(n, t) {
        var i = r(n, t)
          , u = at(i);
        return i == u ? t : c(u)
    }
    function nv(n, t) {
        if (t > n.lastLine())
            return t;
        var i = r(n, t), u;
        if (!nr(n, i))
            return t;
        while (u = du(i))
            i = u.find(1, !0).line;
        return c(i) + 1
    }
    function nr(n, t) {
        var u = ii && t.markedSpans, i, r;
        if (u)
            for (r = 0; r < u.length; ++r)
                if (i = u[r],
                i.marker.collapsed) {
                    if (i.from == null)
                        return !0;
                    if (!i.marker.widgetNode && i.from == 0 && i.marker.inclusiveLeft && fh(n, t, i))
                        return !0
                }
    }
    function fh(n, t, i) {
        var f, r, u;
        if (i.to == null)
            return f = i.marker.find(1, !0),
            fh(n, f.line, ku(f.line.markedSpans, i.marker));
        if (i.marker.inclusiveRight && i.to == t.text.length)
            return !0;
        for (u = 0; u < t.markedSpans.length; ++u)
            if (r = t.markedSpans[u],
            r.marker.collapsed && !r.marker.widgetNode && r.from == i.to && (r.to == null || r.to != i.from) && (r.marker.inclusiveLeft || i.marker.inclusiveRight) && fh(n, t, r))
                return !0
    }
    function tv(n, t, i) {
        ni(t) < (n.curOp && n.curOp.scrollTop || n.doc.scrollTop) && bs(n, null, i)
    }
    function nf(n) {
        return n.height != null ? n.height : (sy(document.body, n.node) || bt(n.cm.display.measure, i("div", [n.node], null, "position: relative")),
        n.height = n.node.offsetHeight)
    }
    function ob(n, t, i, r) {
        var u = new gu(n,i,r);
        return u.noHScroll && (n.display.alignWidgets = !0),
        be(n, t, "widget", function(t) {
            var i = t.widgets || (t.widgets = []), r;
            return u.insertAt == null ? i.push(u) : i.splice(Math.min(i.length - 1, Math.max(0, u.insertAt)), 0, u),
            u.line = t,
            nr(n.doc, t) || (r = ni(t) < n.doc.scrollTop,
            vt(t, t.height + nf(u)),
            r && bs(n, null, u.height),
            n.curOp.forceUpdate = !0),
            !0
        }),
        u
    }
    function sb(n, t, i, r) {
        n.text = t;
        n.stateAfter && (n.stateAfter = null);
        n.styles && (n.styles = null);
        n.order != null && (n.order = null);
        pa(n);
        wa(n, i);
        var u = r ? r(n) : 1;
        u != n.height && vt(n, u)
    }
    function hb(n) {
        n.parent = null;
        pa(n)
    }
    function iv(t, i, r, u, f, e) {
        var c = r.flattenSpans, a, v;
        c == null && (c = t.options.flattenSpans);
        var h = 0, l = null, o = new pu(i,t.options.tabSize), s;
        for (i == "" && r.blankLine && r.blankLine(u); !o.eol(); )
            o.pos > t.options.maxHighlightLength ? (c = !1,
            e && eh(t, i, u, o.pos),
            o.pos = i.length,
            s = null) : s = r.token(o, u),
            t.options.addModeClass && (a = n.innerMode(r, u).mode.name,
            a && (s = "m-" + (s ? a + " " + s : a))),
            c && l == s || (h < o.start && f(o.start, l),
            h = o.start,
            l = s),
            o.start = o.pos;
        while (h < o.pos)
            v = Math.min(o.pos, h + 5e4),
            f(v, l),
            h = v
    }
    function rv(n, t, i, r) {
        var u = [n.state.modeGen], e;
        for (iv(n, t.text, n.doc.mode, i, function(n, t) {
            u.push(n, t)
        }, r),
        e = 0; e < n.state.overlays.length; ++e) {
            var o = n.state.overlays[e]
              , f = 1
              , s = 0;
            iv(n, t.text, o.mode, !0, function(n, t) {
                for (var i = f, r, e; s < n; )
                    r = u[f],
                    r > n && u.splice(f, 1, n, u[f + 1], r),
                    f += 2,
                    s = Math.min(n, r);
                if (t)
                    if (o.opaque)
                        u.splice(i, f - i, n, t),
                        f = i + 2;
                    else
                        for (; i < f; i += 2)
                            e = u[i + 1],
                            u[i + 1] = e ? e + " " + t : t
            })
        }
        return u
    }
    function uv(n, t) {
        return t.styles && t.styles[0] == n.state.modeGen || (t.styles = rv(n, t, t.stateAfter = eu(n, c(t)))),
        t.styles
    }
    function eh(n, t, i, r) {
        var f = n.doc.mode
          , u = new pu(t,n.options.tabSize);
        for (u.start = u.pos = r || 0,
        t == "" && f.blankLine && f.blankLine(i); !u.eol() && u.pos <= n.options.maxHighlightLength; )
            f.token(u, i),
            u.start = u.pos
    }
    function ov(n, t) {
        var i, r, u;
        if (!n)
            return null;
        for (; ; ) {
            if (i = n.match(/(?:^|\s+)line-(background-)?(\S+)/),
            !i)
                break;
            n = n.slice(0, i.index) + n.slice(i.index + i[0].length);
            r = i[1] ? "bgClass" : "textClass";
            t[r] == null ? t[r] = i[2] : new RegExp("(?:^|s)" + i[2] + "(?:$|s)").test(t[r]) || (t[r] += " " + i[2])
        }
        return /^\s*$/.test(n) ? null : (u = t.cm.options.addModeClass ? ev : fv,
        u[n] || (u[n] = n.replace(/\S+/g, "cm-$&")))
    }
    function sv(n, t) {
        var e = i("span", null, null, b ? "padding-right: .1px" : null), r = {
            pre: i("pre", [e]),
            content: e,
            col: 0,
            pos: 0,
            cm: n
        }, u, f, o;
        for (t.measure = {},
        u = 0; u <= (t.rest ? t.rest.length : 0); u++)
            f = u ? t.rest[u - 1] : t.line,
            r.pos = 0,
            r.addToken = lb,
            (nt || b) && n.getOption("lineWrapping") && (r.addToken = ab(r.addToken)),
            tk(n.display.measure) && (o = yt(f)) && (r.addToken = vb(r.addToken, o)),
            r.map = [],
            yb(f, r, uv(n, f)),
            r.map.length == 0 && r.map.push(0, 0, r.content.appendChild(nk(n.display.measure))),
            u == 0 ? (t.measure.map = r.map,
            t.measure.cache = {}) : ((t.measure.maps || (t.measure.maps = [])).push(r.map),
            (t.measure.caches || (t.measure.caches = [])).push({}));
        return a(n, "renderLine", n, t.line, r.pre),
        r
    }
    function cb(n) {
        var t = i("span", "•", "cm-invalidchar");
        return t.title = "\\u" + n.charCodeAt(0).toString(16),
        t
    }
    function lb(n, t, r, u, f, e) {
        var a, p, o, h, l, c, s, v, w;
        if (t) {
            if (a = n.cm.options.specialChars,
            p = !1,
            a.test(t))
                for (o = document.createDocumentFragment(),
                h = 0; ; ) {
                    if (a.lastIndex = h,
                    l = a.exec(t),
                    c = l ? l.index - h : t.length - h,
                    c && (s = document.createTextNode(t.slice(h, h + c)),
                    y ? o.appendChild(i("span", [s])) : o.appendChild(s),
                    n.map.push(n.pos, n.pos + c, s),
                    n.col += c,
                    n.pos += c),
                    !l)
                        break;
                    if (h += c + 1,
                    l[0] == "\t") {
                        var b = n.cm.options.tabSize
                          , k = b - n.col % b
                          , s = o.appendChild(i("span", ry(k), "cm-tab"));
                        n.col += k
                    } else
                        s = n.cm.options.specialCharPlaceholder(l[0]),
                        y ? o.appendChild(i("span", [s])) : o.appendChild(s),
                        n.col += 1;
                    n.map.push(n.pos, n.pos + 1, s);
                    n.pos++
                }
            else
                n.col += t.length,
                o = document.createTextNode(t),
                n.map.push(n.pos, n.pos + t.length, o),
                y && (p = !0),
                n.pos += t.length;
            if (r || u || f || p)
                return v = r || "",
                u && (v += u),
                f && (v += f),
                w = i("span", [o], v),
                e && (w.title = e),
                n.content.appendChild(w);
            n.content.appendChild(o)
        }
    }
    function ab(n) {
        function t(n) {
            for (var i = " ", t = 0; t < n.length - 2; ++t)
                i += t % 2 ? " " : " ";
            return i + " "
        }
        return function(i, r, u, f, e, o) {
            n(i, r.replace(/ {3,}/g, t), u, f, e, o)
        }
    }
    function vb(n, t) {
        return function(i, r, u, f, e, o) {
            var s, l, c, h;
            for (u = u ? u + " cm-force-border" : "cm-force-border",
            s = i.pos,
            l = s + r.length; ; ) {
                for (c = 0; c < t.length; c++)
                    if (h = t[c],
                    h.to > s && h.from <= s)
                        break;
                if (h.to >= l)
                    return n(i, r, u, f, e, o);
                n(i, r.slice(0, h.to - s), u, f, null, o);
                f = null;
                r = r.slice(h.to - s);
                s = h.to
            }
        }
    }
    function hv(n, t, i, r) {
        var u = !r && i.widgetNode;
        u && (n.map.push(n.pos, n.pos + t, u),
        n.content.appendChild(u));
        n.pos += t
    }
    function yb(n, t, i) {
        var d = n.markedSpans, g = n.text, v = 0, h, a, u, f, s, l, k, it;
        if (!d) {
            for (h = 1; h < i.length; h += 2)
                t.addToken(t, g.slice(v, v = i[h]), ov(i[h + 1], t));
            return
        }
        for (var nt = g.length, r = 0, h = 1, c = "", tt, o = 0, y, p, w, b, e; ; ) {
            if (o == r) {
                for (y = p = w = b = "",
                e = null,
                o = Infinity,
                a = [],
                s = 0; s < d.length; ++s)
                    u = d[s],
                    f = u.marker,
                    u.from <= r && (u.to == null || u.to > r) ? (u.to != null && o > u.to && (o = u.to,
                    p = ""),
                    f.className && (y += " " + f.className),
                    f.startStyle && u.from == r && (w += " " + f.startStyle),
                    f.endStyle && u.to == o && (p += " " + f.endStyle),
                    f.title && !b && (b = f.title),
                    f.collapsed && (!e || ba(e.marker, f) < 0) && (e = u)) : u.from > r && o > u.from && (o = u.from),
                    f.type == "bookmark" && u.from == r && f.widgetNode && a.push(f);
                if (e && (e.from || 0) == r && (hv(t, (e.to == null ? nt + 1 : e.to) - r, e.marker, e.from == null),
                e.to == null))
                    return;
                if (!e && a.length)
                    for (s = 0; s < a.length; ++s)
                        hv(t, 0, a[s])
            }
            if (r >= nt)
                break;
            for (l = Math.min(nt, o); ; ) {
                if (c) {
                    if (k = r + c.length,
                    e || (it = k > l ? c.slice(0, l - r) : c,
                    t.addToken(t, it, tt ? tt + y : y, w, r + it.length == o ? p : "", b)),
                    k >= l) {
                        c = c.slice(l - r);
                        r = l;
                        break
                    }
                    r = k;
                    w = ""
                }
                c = g.slice(v, v = i[h++]);
                tt = ov(i[h++], t)
            }
        }
    }
    function cv(n, t) {
        return t.from.ch == 0 && t.to.ch == 0 && s(t.text) == "" && (!n.cm || n.cm.options.wholeLineUpdateBefore)
    }
    function oh(n, t, i, u) {
        function l(n) {
            return i ? i[n] : null
        }
        function a(n, i, r) {
            sb(n, i, r, u);
            w(n, "change", n, t)
        }
        var o = t.from, v = t.to, e = t.text, h = r(n, o.line), y = r(n, v.line), k = s(e), b = l(e.length - 1), p = v.line - o.line, f, c;
        if (cv(n, t)) {
            for (f = 0,
            c = []; f < e.length - 1; ++f)
                c.push(new ei(e[f],l(f),u));
            a(y, y.text, b);
            p && n.remove(o.line, p);
            c.length && n.insert(o.line, c)
        } else if (h == y)
            if (e.length == 1)
                a(h, h.text.slice(0, o.ch) + k + h.text.slice(v.ch), b);
            else {
                for (c = [],
                f = 1; f < e.length - 1; ++f)
                    c.push(new ei(e[f],l(f),u));
                c.push(new ei(k + h.text.slice(v.ch),b,u));
                a(h, h.text.slice(0, o.ch) + e[0], l(0));
                n.insert(o.line + 1, c)
            }
        else if (e.length == 1)
            a(h, h.text.slice(0, o.ch) + e[0] + y.text.slice(v.ch), l(0)),
            n.remove(o.line + 1, p);
        else {
            for (a(h, h.text.slice(0, o.ch) + e[0], l(0)),
            a(y, k + y.text.slice(v.ch), b),
            f = 1,
            c = []; f < e.length - 1; ++f)
                c.push(new ei(e[f],l(f),u));
            p > 1 && n.remove(o.line + 1, p - 1);
            n.insert(o.line + 1, c)
        }
        w(n, "change", n, t)
    }
    function tf(n) {
        this.lines = n;
        this.parent = null;
        for (var t = 0, i = 0; t < n.length; ++t)
            n[t].parent = this,
            i += n[t].height;
        this.height = i
    }
    function rf(n) {
        var r, u, t, i;
        for (this.children = n,
        r = 0,
        u = 0,
        t = 0; t < n.length; ++t)
            i = n[t],
            r += i.chunkSize(),
            u += i.height,
            i.parent = this;
        this.size = r;
        this.height = u;
        this.parent = null
    }
    function yr(n, t, i) {
        function r(n, u, f) {
            var o, e, s;
            if (n.linked)
                for (o = 0; o < n.linked.length; ++o)
                    (e = n.linked[o],
                    e.doc != u) && (s = f && e.sharedHist,
                    !i || s) && (t(e.doc, s),
                    r(e.doc, n, s))
        }
        r(n, null, !0)
    }
    function vv(n, t) {
        if (t.cm)
            throw new Error("This document is already in use.");
        n.doc = t;
        t.cm = n;
        vo(n);
        ao(n);
        n.options.lineWrapping || yo(n);
        n.options.mode = t.modeOption;
        rt(n)
    }
    function r(n, t) {
        var i, r, u, f;
        if (t -= n.first,
        t < 0 || t >= n.size)
            throw new Error("There is no line " + (t + n.first) + " in the document.");
        for (i = n; !i.lines; )
            for (r = 0; ; ++r) {
                if (u = i.children[r],
                f = u.chunkSize(),
                t < f) {
                    i = u;
                    break
                }
                t -= f
            }
        return i.lines[t]
    }
    function ff(n, t, i) {
        var u = []
          , r = t.line;
        return n.iter(t.line, i.line + 1, function(n) {
            var f = n.text;
            r == i.line && (f = f.slice(0, i.ch));
            r == t.line && (f = f.slice(t.ch));
            u.push(f);
            ++r
        }),
        u
    }
    function sh(n, t, i) {
        var r = [];
        return n.iter(t, i, function(n) {
            r.push(n.text)
        }),
        r
    }
    function vt(n, t) {
        var r = t - n.height, i;
        if (r)
            for (i = n; i; i = i.parent)
                i.height += r
    }
    function c(n) {
        var i, u, t, r;
        if (n.parent == null)
            return null;
        for (i = n.parent,
        u = g(i.lines, n),
        t = i.parent; t; i = t,
        t = t.parent)
            for (r = 0; ; ++r) {
                if (t.children[r] == i)
                    break;
                u += t.children[r].chunkSize()
            }
        return u + i.first
    }
    function tr(n, t) {
        var u = n.first, r, f, i, o, e;
        n: do {
            for (i = 0; i < n.children.length; ++i) {
                if (r = n.children[i],
                f = r.height,
                t < f) {
                    n = r;
                    continue n
                }
                t -= f;
                u += r.chunkSize()
            }
            return u
        } while (!n.lines);
        for (i = 0; i < n.lines.length; ++i) {
            if (o = n.lines[i],
            e = o.height,
            t < e)
                break;
            t -= e
        }
        return u + i
    }
    function ni(n) {
        var u, i, f, r, t, e;
        for (n = at(n),
        u = 0,
        i = n.parent,
        t = 0; t < i.lines.length; ++t)
            if (f = i.lines[t],
            f == n)
                break;
            else
                u += f.height;
        for (r = i.parent; r; i = r,
        r = i.parent)
            for (t = 0; t < r.children.length; ++t)
                if (e = r.children[t],
                e == i)
                    break;
                else
                    u += e.height;
        return u
    }
    function yt(n) {
        var t = n.order;
        return t == null && (t = n.order = vy(n.text)),
        t
    }
    function to(n) {
        this.done = [];
        this.undone = [];
        this.undoDepth = Infinity;
        this.lastModTime = this.lastSelTime = 0;
        this.lastOp = null;
        this.lastOrigin = this.lastSelOrigin = null;
        this.generation = this.maxGeneration = n || 1
    }
    function hh(n, t) {
        var i = {
            from: ts(t.from),
            to: ki(t),
            text: ff(n, t.from, t.to)
        };
        return wv(n, i, t.from.line, t.to.line + 1),
        yr(n, function(n) {
            wv(n, i, t.from.line, t.to.line + 1)
        }, !0),
        i
    }
    function yv(n) {
        while (n.length) {
            var t = s(n);
            if (t.ranges)
                n.pop();
            else
                break
        }
    }
    function pb(n, t) {
        return t ? (yv(n.done),
        s(n.done)) : n.done.length && !s(n.done).ranges ? s(n.done) : n.done.length > 1 && !n.done[n.done.length - 2].ranges ? (n.done.pop(),
        s(n.done)) : void 0
    }
    function pv(n, t, i, r) {
        var u = n.history, h, f, o, c;
        if (u.undone.length = 0,
        h = +new Date,
        (u.lastOp == r || u.lastOrigin == t.origin && t.origin && (t.origin.charAt(0) == "+" && n.cm && u.lastModTime > h - n.cm.options.historyEventDelay || t.origin.charAt(0) == "*")) && (f = pb(u, u.lastOp == r)))
            o = s(f.changes),
            e(t.from, t.to) == 0 && e(t.from, o.to) == 0 ? o.to = ki(t) : f.changes.push(hh(n, t));
        else
            for (c = s(u.done),
            c && c.ranges || io(n.sel, u.done),
            f = {
                changes: [hh(n, t)],
                generation: u.generation
            },
            u.done.push(f); u.done.length > u.undoDepth; )
                u.done.shift(),
                u.done[0].ranges || u.done.shift();
        u.done.push(i);
        u.generation = ++u.maxGeneration;
        u.lastModTime = u.lastSelTime = h;
        u.lastOp = r;
        u.lastOrigin = u.lastSelOrigin = t.origin;
        o || a(n, "historyAdded")
    }
    function wb(n, t, i, r) {
        var u = t.charAt(0);
        return u == "*" || u == "+" && i.ranges.length == r.ranges.length && i.somethingSelected() == r.somethingSelected() && new Date - n.history.lastSelTime <= (n.cm ? n.cm.options.historyEventDelay : 500)
    }
    function bb(n, t, i, r) {
        var u = n.history
          , f = r && r.origin;
        i == u.lastOp || f && u.lastSelOrigin == f && (u.lastModTime == u.lastSelTime && u.lastOrigin == f || wb(n, f, s(u.done), t)) ? u.done[u.done.length - 1] = t : io(t, u.done);
        u.lastSelTime = +new Date;
        u.lastSelOrigin = f;
        u.lastOp = i;
        r && r.clearRedo !== !1 && yv(u.undone)
    }
    function io(n, t) {
        var i = s(t);
        i && i.ranges && i.equals(n) || t.push(n)
    }
    function wv(n, t, i, r) {
        var u = t["spans_" + n.id]
          , f = 0;
        n.iter(Math.max(n.first, i), Math.min(n.first + n.size, r), function(i) {
            i.markedSpans && ((u || (u = t["spans_" + n.id] = {}))[f] = i.markedSpans);
            ++f
        })
    }
    function kb(n) {
        if (!n)
            return null;
        for (var i = 0, t; i < n.length; ++i)
            n[i].marker.explicitlyCleared ? t || (t = n.slice(0, i)) : t && t.push(n[i]);
        return t ? t.length ? t : null : n
    }
    function db(n, t) {
        var u = t["spans_" + n.id], i, r;
        if (!u)
            return null;
        for (i = 0,
        r = []; i < t.text.length; ++i)
            r.push(kb(u[i]));
        return r
    }
    function pr(n, t, i) {
        for (var u, l, h, c, r, a, f, e = 0, o = []; e < n.length; ++e) {
            if (u = n[e],
            u.ranges) {
                o.push(i ? kt.prototype.deepCopy.call(u) : u);
                continue
            }
            for (l = u.changes,
            h = [],
            o.push({
                changes: h
            }),
            c = 0; c < l.length; ++c)
                if (r = l[c],
                h.push({
                    from: r.from,
                    to: r.to,
                    text: r.text
                }),
                t)
                    for (f in r)
                        (a = f.match(/^spans_(\d+)$/)) && g(t, Number(a[1])) > -1 && (s(h)[f] = r[f],
                        delete r[f])
        }
        return o
    }
    function bv(n, t, i, r) {
        i < n.line ? n.line += r : t < n.line && (n.line = t,
        n.ch = 0)
    }
    function kv(n, i, r, u) {
        for (var f, h, e, o, s = 0; s < n.length; ++s) {
            if (f = n[s],
            h = !0,
            f.ranges) {
                for (f.copied || (f = n[s] = f.deepCopy(),
                f.copied = !0),
                e = 0; e < f.ranges.length; e++)
                    bv(f.ranges[e].anchor, i, r, u),
                    bv(f.ranges[e].head, i, r, u);
                continue
            }
            for (e = 0; e < f.changes.length; ++e)
                if (o = f.changes[e],
                r < o.from.line)
                    o.from = t(o.from.line + u, o.from.ch),
                    o.to = t(o.to.line + u, o.to.ch);
                else if (i <= o.to.line) {
                    h = !1;
                    break
                }
            h || (n.splice(0, s + 1),
            s = 0)
        }
    }
    function dv(n, t) {
        var i = t.from.line
          , r = t.to.line
          , u = t.text.length - (r - i) - 1;
        kv(n.done, i, r, u);
        kv(n.undone, i, r, u)
    }
    function ch(n) {
        return n.defaultPrevented != null ? n.defaultPrevented : n.returnValue == !1
    }
    function ef(n) {
        return n.target || n.srcElement
    }
    function ny(n) {
        var t = n.which;
        return t == null && (n.button & 1 ? t = 1 : n.button & 2 ? t = 3 : n.button & 4 && (t = 2)),
        li && n.ctrlKey && t == 1 && (t = 3),
        t
    }
    function w(n, t) {
        function f(n) {
            return function() {
                n.apply(null, u)
            }
        }
        var r = n._handlers && n._handlers[t], u, i;
        if (r)
            for (u = Array.prototype.slice.call(arguments, 2),
            si || (++uo,
            si = [],
            setTimeout(gb, 0)),
            i = 0; i < r.length; ++i)
                si.push(f(r[i]))
    }
    function gb() {
        var t, n;
        for (--uo,
        t = si,
        si = null,
        n = 0; n < t.length; ++n)
            t[n]()
    }
    function pt(n, t, i) {
        return a(n, i || t.type, n, t),
        ch(t) || t.codemirrorIgnore
    }
    function ot(n, t) {
        var i = n._handlers && n._handlers[t];
        return i && i.length > 0
    }
    function wr(n) {
        n.prototype.on = function(n, t) {
            o(this, n, t)
        }
        ;
        n.prototype.off = function(n, t) {
            oi(this, n, t)
        }
    }
    function lh() {
        this.id = null
    }
    function iy(n, t, i) {
        for (var f, e, r = 0, u = 0; ; ) {
            if (f = n.indexOf("\t", r),
            f == -1 && (f = n.length),
            e = f - r,
            f == n.length || u + e >= t)
                return r + Math.min(e, t - u);
            if (u += f - r,
            u += i - u % i,
            r = f + 1,
            u >= t)
                return r
        }
    }
    function ry(n) {
        while (of.length <= n)
            of.push(s(of) + " ");
        return of[n]
    }
    function s(n) {
        return n[n.length - 1]
    }
    function g(n, t) {
        for (var i = 0; i < n.length; ++i)
            if (n[i] == t)
                return i;
        return -1
    }
    function ah(n, t) {
        for (var r = [], i = 0; i < n.length; i++)
            r[i] = t(n[i], i);
        return r
    }
    function uy(n, t) {
        var i, r;
        return Object.create ? i = Object.create(n) : (r = function() {}
        ,
        r.prototype = n,
        i = new r),
        t && eo(t, i),
        i
    }
    function eo(n, t) {
        t || (t = {});
        for (var i in n)
            n.hasOwnProperty(i) && (t[i] = n[i]);
        return t
    }
    function wt(n) {
        var t = Array.prototype.slice.call(arguments, 1);
        return function() {
            return n.apply(null, t)
        }
    }
    function ey(n) {
        for (var t in n)
            if (n.hasOwnProperty(t) && n[t])
                return !1;
        return !0
    }
    function cf(n) {
        return n.charCodeAt(0) >= 768 && oy.test(n)
    }
    function i(n, t, i, r) {
        var u = document.createElement(n), f;
        if (i && (u.className = i),
        r && (u.style.cssText = r),
        typeof t == "string")
            u.appendChild(document.createTextNode(t));
        else if (t)
            for (f = 0; f < t.length; ++f)
                u.appendChild(t[f]);
        return u
    }
    function rr(n) {
        for (var t = n.childNodes.length; t > 0; --t)
            n.removeChild(n.firstChild);
        return n
    }
    function bt(n, t) {
        return rr(n).appendChild(t)
    }
    function sy(n, t) {
        if (n.contains)
            return n.contains(t);
        while (t = t.parentNode)
            if (t == n)
                return !0
    }
    function hi() {
        return document.activeElement
    }
    function vf(n) {
        if (af != null)
            return af;
        var t = i("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
        return bt(n, t),
        t.offsetWidth && (af = t.offsetHeight - t.clientHeight),
        af || 0
    }
    function nk(n) {
        if (vh == null) {
            var t = i("span", "​");
            bt(n, i("span", [t, document.createTextNode("x")]));
            n.firstChild.offsetHeight != 0 && (vh = t.offsetWidth <= 1 && t.offsetHeight > 2 && !gr)
        }
        return vh ? i("span", "​") : i("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px")
    }
    function tk(n) {
        var i, t, r;
        return yh != null ? yh : (i = bt(n, document.createTextNode("AخA")),
        t = lf(i, 0, 1).getBoundingClientRect(),
        t.left == t.right) ? !1 : (r = lf(i, 1, 2).getBoundingClientRect(),
        yh = r.right - t.right < 3)
    }
    function rk(n, t, i, r) {
        var e, f, u;
        if (!n)
            return r(t, i, "ltr");
        for (e = !1,
        f = 0; f < n.length; ++f)
            u = n[f],
            (u.from < i && u.to > t || t == i && u.to == t) && (r(Math.max(u.from, t), Math.min(u.to, i), u.level == 1 ? "rtl" : "ltr"),
            e = !0);
        e || r(t, i, "ltr")
    }
    function ph(n) {
        return n.level % 2 ? n.to : n.from
    }
    function wh(n) {
        return n.level % 2 ? n.from : n.to
    }
    function oo(n) {
        var t = yt(n);
        return t ? ph(t[0]) : 0
    }
    function so(n) {
        var t = yt(n);
        return t ? wh(s(t)) : n.text.length
    }
    function ly(n, i) {
        var e = r(n.doc, i), u = at(e), f, o;
        return u != e && (i = c(u)),
        f = yt(u),
        o = f ? f[0].level % 2 ? so(u) : oo(u) : 0,
        t(i, o)
    }
    function uk(n, i) {
        for (var e, u = r(n.doc, i), f, o; e = du(u); )
            u = e.find(1, !0).line,
            i = null;
        return f = yt(u),
        o = f ? f[0].level % 2 ? oo(u) : so(u) : u.text.length,
        t(i == null ? c(u) : i, o)
    }
    function fk(n, t, i) {
        var r = n[0].level;
        return t == r ? !0 : i == r ? !1 : t < i
    }
    function bh(n, t) {
        var r, u, i;
        for (yf = null,
        r = 0; r < n.length; ++r) {
            if (i = n[r],
            i.from < t && i.to > t)
                return r;
            if (i.from == t || i.to == t)
                if (u == null)
                    u = r;
                else
                    return fk(n, i.level, n[u].level) ? (i.from != i.to && (yf = u),
                    r) : (i.from != i.to && (yf = r),
                    u)
        }
        return u
    }
    function kh(n, t, i, r) {
        if (!r)
            return t + i;
        do
            t += i;
        while (t > 0 && cf(n.text.charAt(t)));
        return t
    }
    function dh(n, t, i, r) {
        var e = yt(n);
        if (!e)
            return ay(n, t, i, r);
        for (var o = bh(e, t), u = e[o], f = kh(n, t, u.level % 2 ? -i : i, r); ; ) {
            if (f > u.from && f < u.to)
                return f;
            if (f == u.from || f == u.to)
                return bh(e, f) == o ? f : (u = e[o += i],
                i > 0 == u.level % 2 ? u.to : u.from);
            if (u = e[o += i],
            !u)
                return null;
            f = i > 0 == u.level % 2 ? kh(n, u.to, -1, r) : kh(n, u.from, 1, r)
        }
    }
    function ay(n, t, i, r) {
        var u = t + i;
        if (r)
            while (u > 0 && cf(n.text.charAt(u)))
                u += i;
        return u < 0 || u > n.text.length ? null : u
    }
    var dr = /gecko\/\d/i.test(navigator.userAgent), ft = /MSIE \d/.test(navigator.userAgent), gr = ft && (document.documentMode == null || document.documentMode < 8), y = ft && (document.documentMode == null || document.documentMode < 9), yy = ft && (document.documentMode == null || document.documentMode < 10), py = /Trident\/([7-9]|\d{2,})\./.test(navigator.userAgent), nt = ft || py, b = /WebKit\//.test(navigator.userAgent), wy = b && /Qt\/\d+\.\d+/.test(navigator.userAgent), by = /Chrome\//.test(navigator.userAgent), et = /Opera\//.test(navigator.userAgent), gh = /Apple Computer/.test(navigator.vendor), ho = /KHTML\//.test(navigator.userAgent), ky = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent), dy = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent), gy = /PhantomJS/.test(navigator.userAgent), nu = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent), co = nu || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent), li = nu || /Mac/.test(navigator.platform), np = /win/i.test(navigator.platform), ai = et && navigator.userAgent.match(/Version\/(\d*\.\d*)/), t, e, es, yi, al, se, he, as, au, ut, gl, le, ps, ki, gs, gi, nh, th, hr, cr, de, ui, lr, la, yu, lt, pu, fi, aa, bu, gu, ei, fv, ev, lv, d, av, uf, p, gv, ro, st, of, sf, fy, hf, oy, lf, hy, af, vh, yh, yf, vy;
    ai && (ai = Number(ai[1]));
    ai && ai >= 15 && (et = !1,
    b = !0);
    var nc = li && (wy || et && (ai == null || ai < 12.11))
      , lo = dr || nt && !y
      , tc = !1
      , ii = !1;
    t = n.Pos = function(n, i) {
        if (!(this instanceof t))
            return new t(n,i);
        this.line = n;
        this.ch = i
    }
    ;
    e = n.cmpPos = function(n, t) {
        return n.line - t.line || n.ch - t.ch
    }
    ;
    kt.prototype = {
        primary: function() {
            return this.ranges[this.primIndex]
        },
        equals: function(n) {
            var t, i, r;
            if (n == this)
                return !0;
            if (n.primIndex != this.primIndex || n.ranges.length != this.ranges.length)
                return !1;
            for (t = 0; t < this.ranges.length; t++)
                if (i = this.ranges[t],
                r = n.ranges[t],
                e(i.anchor, r.anchor) != 0 || e(i.head, r.head) != 0)
                    return !1;
            return !0
        },
        deepCopy: function() {
            for (var t = [], n = 0; n < this.ranges.length; n++)
                t[n] = new h(ts(this.ranges[n].anchor),ts(this.ranges[n].head));
            return new kt(t,this.primIndex)
        },
        somethingSelected: function() {
            for (var n = 0; n < this.ranges.length; n++)
                if (!this.ranges[n].empty())
                    return !0;
            return !1
        },
        contains: function(n, t) {
            var i, r;
            for (t || (t = n),
            i = 0; i < this.ranges.length; i++)
                if (r = this.ranges[i],
                e(t, r.from()) >= 0 && e(n, r.to()) <= 0)
                    return i;
            return -1
        }
    };
    h.prototype = {
        from: function() {
            return rs(this.anchor, this.head)
        },
        to: function() {
            return is(this.anchor, this.head)
        },
        empty: function() {
            return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
        }
    };
    es = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };
    al = 0;
    as = 0;
    au = 0;
    ut = null;
    nt ? ut = -.53 : dr ? ut = 15 : by ? ut = -.7 : gh && (ut = -1 / 3);
    le = null;
    ki = n.changeEnd = function(n) {
        return n.text ? t(n.from.line + n.text.length - 1, s(n.text).length + (n.text.length == 1 ? n.from.ch : 0)) : n.to
    }
    ;
    n.prototype = {
        constructor: n,
        focus: function() {
            window.focus();
            it(this);
            cu(this)
        },
        setOption: function(n, t) {
            var i = this.options
              , r = i[n];
            (i[n] != t || n == "mode") && (i[n] = t,
            gi.hasOwnProperty(n) && v(this, gi[n])(this, t, r))
        },
        getOption: function(n) {
            return this.options[n]
        },
        getDoc: function() {
            return this.doc
        },
        addKeyMap: function(n, t) {
            this.state.keyMaps[t ? "push" : "unshift"](n)
        },
        removeKeyMap: function(n) {
            for (var i = this.state.keyMaps, t = 0; t < i.length; ++t)
                if (i[t] == n || typeof i[t] != "string" && i[t].name == n)
                    return i.splice(t, 1),
                    !0
        },
        addOverlay: l(function(t, i) {
            var r = t.token ? t : n.getMode(this.options, t);
            if (r.startState)
                throw new Error("Overlays may not be stateful.");
            this.state.overlays.push({
                mode: r,
                modeSpec: t,
                opaque: i && i.opaque
            });
            this.state.modeGen++;
            rt(this)
        }),
        removeOverlay: l(function(n) {
            for (var r, i = this.state.overlays, t = 0; t < i.length; ++t)
                if (r = i[t].modeSpec,
                r == n || typeof n == "string" && r.name == n) {
                    i.splice(t, 1);
                    this.state.modeGen++;
                    rt(this);
                    return
                }
        }),
        indentLine: l(function(n, t, i) {
            typeof t != "string" && typeof t != "number" && (t = t == null ? this.options.smartIndent ? "smart" : "prev" : t ? "add" : "subtract");
            ru(this.doc, n) && we(this, n, t, i)
        }),
        indentSelection: l(function(n) {
            for (var t, o, f, u, e = this.doc.sel.ranges, i = -1, r = 0; r < e.length; r++)
                if (t = e[r],
                t.empty())
                    t.head.line > i && (we(this, t.head.line, n, !0),
                    i = t.head.line,
                    r == this.doc.sel.primIndex && di(this));
                else
                    for (o = Math.max(i, t.from().line),
                    f = t.to(),
                    i = Math.min(this.lastLine(), f.line - (f.ch ? 0 : 1)) + 1,
                    u = o; u < i; ++u)
                        we(this, u, n)
        }),
        getTokenAt: function(n, t) {
            var f = this.doc, o;
            n = u(f, n);
            for (var e = eu(this, n.line, t), s = this.doc.mode, h = r(f, n.line), i = new pu(h.text,this.options.tabSize); i.pos < n.ch && !i.eol(); )
                i.start = i.pos,
                o = s.token(i, e);
            return {
                start: i.start,
                end: i.pos,
                string: i.current(),
                type: o || null,
                state: e
            }
        },
        getTokenTypeAt: function(n) {
            var t;
            n = u(this.doc, n);
            var i = uv(this, r(this.doc, n.line))
              , e = 0
              , o = (i.length - 1) / 2
              , f = n.ch;
            if (f == 0)
                return i[2];
            for (; ; )
                if (t = e + o >> 1,
                (t ? i[t * 2 - 1] : 0) >= f)
                    o = t;
                else if (i[t * 2 + 1] < f)
                    e = t + 1;
                else
                    return i[t * 2 + 2]
        },
        getModeAt: function(t) {
            var i = this.doc.mode;
            return i.innerMode ? n.innerMode(i, this.getTokenAt(t).state).mode : i
        },
        getHelper: function(n, t) {
            return this.getHelpers(n, t)[0]
        },
        getHelpers: function(n, t) {
            var f = [], r, i, o, u, e;
            if (!ui.hasOwnProperty(t))
                return ui;
            if (r = ui[t],
            i = this.getModeAt(n),
            typeof i[t] == "string")
                r[i[t]] && f.push(r[i[t]]);
            else if (i[t])
                for (u = 0; u < i[t].length; u++)
                    o = r[i[t][u]],
                    o && f.push(o);
            else
                i.helperType && r[i.helperType] ? f.push(r[i.helperType]) : r[i.name] && f.push(r[i.name]);
            for (u = 0; u < r._global.length; u++)
                e = r._global[u],
                e.pred(i, this) && g(f, e.val) == -1 && f.push(e.val);
            return f
        },
        getStateAfter: function(n, t) {
            var i = this.doc;
            return n = yc(i, n == null ? i.first + i.size - 1 : n),
            eu(this, n + 1, t)
        },
        cursorCoords: function(n, t) {
            var r, i = this.doc.sel.primary();
            return r = n == null ? i.head : typeof n == "object" ? u(this.doc, n) : n ? i.from() : i.to(),
            dt(this, r, t || "page")
        },
        charCoords: function(n, t) {
            return ss(this, u(this.doc, n), t || "page")
        },
        coordsChar: function(n, t) {
            return n = cl(this, n, t || "page"),
            hs(this, n.left, n.top)
        },
        lineAtHeight: function(n, t) {
            return n = cl(this, {
                top: n,
                left: 0
            }, t || "page").top,
            tr(this.doc, n + this.display.viewOffset)
        },
        heightAtLine: function(n, t) {
            var u = !1, f = this.doc.first + this.doc.size - 1, i;
            return n < this.doc.first ? n = this.doc.first : n > f && (n = f,
            u = !0),
            i = r(this.doc, n),
            os(this, i, {
                top: 0,
                left: 0
            }, t || "page").top + (u ? this.doc.height - ni(i) : 0)
        },
        defaultTextHeight: function() {
            return pi(this.display)
        },
        defaultCharWidth: function() {
            return su(this.display)
        },
        setGutterMarker: l(function(n, t, i) {
            return be(this, n, "gutter", function(n) {
                var r = n.gutterMarkers || (n.gutterMarkers = {});
                return r[t] = i,
                !i && ey(r) && (n.gutterMarkers = null),
                !0
            })
        }),
        clearGutter: l(function(n) {
            var t = this
              , i = t.doc
              , r = i.first;
            i.iter(function(i) {
                i.gutterMarkers && i.gutterMarkers[n] && (i.gutterMarkers[n] = null,
                wi(t, r, "gutter"),
                ey(i.gutterMarkers) && (i.gutterMarkers = null));
                ++r
            })
        }),
        addLineClass: l(function(n, t, i) {
            return be(this, n, "class", function(n) {
                var r = t == "text" ? "textClass" : t == "background" ? "bgClass" : "wrapClass";
                if (n[r]) {
                    if (new RegExp("(?:^|\\s)" + i + "(?:$|\\s)").test(n[r]))
                        return !1;
                    n[r] += " " + i
                } else
                    n[r] = i;
                return !0
            })
        }),
        removeLineClass: l(function(n, t, i) {
            return be(this, n, "class", function(n) {
                var f = t == "text" ? "textClass" : t == "background" ? "bgClass" : "wrapClass", u = n[f], r, e;
                if (u)
                    if (i == null)
                        n[f] = null;
                    else {
                        if (r = u.match(new RegExp("(?:^|\\s+)" + i + "(?:$|\\s+)")),
                        !r)
                            return !1;
                        e = r.index + r[0].length;
                        n[f] = u.slice(0, r.index) + (!r.index || e == u.length ? "" : " ") + u.slice(e) || null
                    }
                else
                    return !1;
                return !0
            })
        }),
        addLineWidget: l(function(n, t, i) {
            return ob(this, n, t, i)
        }),
        removeLineWidget: function(n) {
            n.clear()
        },
        lineInfo: function(n) {
            var t;
            if (typeof n == "number") {
                if (!ru(this.doc, n) || (t = n,
                n = r(this.doc, n),
                !n))
                    return null
            } else if (t = c(n),
            t == null)
                return null;
            return {
                line: t,
                handle: n,
                text: n.text,
                gutterMarkers: n.gutterMarkers,
                textClass: n.textClass,
                bgClass: n.bgClass,
                wrapClass: n.wrapClass,
                widgets: n.widgets
            }
        },
        getViewport: function() {
            return {
                from: this.display.viewFrom,
                to: this.display.viewTo
            }
        },
        addWidget: function(n, t, i, r, f) {
            var s = this.display, o, e, h, c;
            n = dt(this, u(this.doc, n));
            o = n.bottom;
            e = n.left;
            t.style.position = "absolute";
            s.sizer.appendChild(t);
            r == "over" ? o = n.top : (r == "above" || r == "near") && (h = Math.max(s.wrapper.clientHeight, this.doc.height),
            c = Math.max(s.sizer.clientWidth, s.lineSpace.clientWidth),
            (r == "above" || n.bottom + t.offsetHeight > h) && n.top > t.offsetHeight ? o = n.top - t.offsetHeight : n.bottom + t.offsetHeight <= h && (o = n.bottom),
            e + t.offsetWidth > c && (e = c - t.offsetWidth));
            t.style.top = o + "px";
            t.style.left = t.style.right = "";
            f == "right" ? (e = s.sizer.clientWidth - t.offsetWidth,
            t.style.right = "0px") : (f == "left" ? e = 0 : f == "middle" && (e = (s.sizer.clientWidth - t.offsetWidth) / 2),
            t.style.left = e + "px");
            i && kw(this, e, o, e + t.offsetWidth, o + t.offsetHeight)
        },
        triggerOnKeyDown: l(ta),
        triggerOnKeyPress: l(ra),
        triggerOnKeyUp: l(ia),
        execCommand: function(n) {
            if (yu.hasOwnProperty(n))
                return yu[n](this)
        },
        findPosH: function(n, t, i, r) {
            var o = 1, e, f;
            for (t < 0 && (o = -1,
            t = -t),
            e = 0,
            f = u(this.doc, n); e < t; ++e)
                if (f = ks(this.doc, f, o, i, r),
                f.hitSide)
                    break;
            return f
        },
        moveH: l(function(n, t) {
            var i = this;
            i.extendSelectionsBy(function(r) {
                return i.display.shift || i.doc.extend || r.empty() ? ks(i.doc, r.head, n, t, i.options.rtlMoveVisually) : n < 0 ? r.from() : r.to()
            }, ir)
        }),
        deleteH: l(function(n, t) {
            var r = this.doc.sel
              , i = this.doc;
            r.somethingSelected() ? i.replaceSelection("", null, "+delete") : ke(this, function(r) {
                var u = ks(i, r.head, n, t, !1);
                return n < 0 ? {
                    from: u,
                    to: r.head
                } : {
                    from: r.head,
                    to: u
                }
            })
        }),
        findPosV: function(n, t, i, r) {
            var h = 1, o = r, s, f, e;
            for (t < 0 && (h = -1,
            t = -t),
            s = 0,
            f = u(this.doc, n); s < t; ++s)
                if (e = dt(this, f, "div"),
                o == null ? o = e.left : e.left = o,
                f = ca(this, e, h, i),
                f.hitSide)
                    break;
            return f
        },
        moveV: l(function(n, t) {
            var r = this, i = this.doc, f = [], e = !r.display.shift && !i.extend && i.sel.somethingSelected(), u;
            if (i.extendSelectionsBy(function(u) {
                var o, s;
                return e ? n < 0 ? u.from() : u.to() : (o = dt(r, u.head, "div"),
                u.goalColumn != null && (o.left = u.goalColumn),
                f.push(o.left),
                s = ca(r, o, n, t),
                t == "page" && u == i.sel.primary() && bs(r, null, ss(r, s, "div").top - o.top),
                s)
            }, ir),
            f.length)
                for (u = 0; u < i.sel.ranges.length; u++)
                    i.sel.ranges[u].goalColumn = f[u]
        }),
        toggleOverwrite: function(n) {
            (n == null || n != this.state.overwrite) && ((this.state.overwrite = !this.state.overwrite) ? this.display.cursorDiv.className += " CodeMirror-overwrite" : this.display.cursorDiv.className = this.display.cursorDiv.className.replace(" CodeMirror-overwrite", ""),
            a(this, "overwriteToggle", this, this.state.overwrite))
        },
        hasFocus: function() {
            return hi() == this.display.input
        },
        scrollTo: l(function(n, t) {
            (n != null || t != null) && pe(this);
            n != null && (this.curOp.scrollLeft = n);
            t != null && (this.curOp.scrollTop = t)
        }),
        getScrollInfo: function() {
            var n = this.display.scroller
              , t = ti;
            return {
                left: n.scrollLeft,
                top: n.scrollTop,
                height: n.scrollHeight - t,
                width: n.scrollWidth - t,
                clientHeight: n.clientHeight - t,
                clientWidth: n.clientWidth - t
            }
        },
        scrollIntoView: l(function(n, i) {
            if (n == null ? (n = {
                from: this.doc.sel.primary().head,
                to: null
            },
            i == null && (i = this.options.cursorScrollMargin)) : typeof n == "number" ? n = {
                from: t(n, 0),
                to: null
            } : n.from == null && (n = {
                from: n,
                to: null
            }),
            n.to || (n.to = n.from),
            n.margin = i || 0,
            n.from.line != null)
                pe(this),
                this.curOp.scrollToPos = n;
            else {
                var r = ye(this, Math.min(n.from.left, n.to.left), Math.min(n.from.top, n.to.top) - n.margin, Math.max(n.from.right, n.to.right), Math.max(n.from.bottom, n.to.bottom) + n.margin);
                this.scrollTo(r.scrollLeft, r.scrollTop)
            }
        }),
        setSize: l(function(n, t) {
            function i(n) {
                return typeof n == "number" || /^\d+$/.test(String(n)) ? n + "px" : n
            }
            n != null && (this.display.wrapper.style.width = i(n));
            t != null && (this.display.wrapper.style.height = i(t));
            this.options.lineWrapping && ol(this);
            this.curOp.forceUpdate = !0;
            a(this, "refresh", this)
        }),
        operation: function(n) {
            return gt(this, n)
        },
        refresh: l(function() {
            var n = this.display.cachedTextHeight;
            rt(this);
            this.curOp.forceUpdate = !0;
            ou(this);
            this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop);
            (n == null || Math.abs(n - pi(this.display)) > .5) && vo(this);
            a(this, "refresh", this)
        }),
        swapDoc: l(function(n) {
            var t = this.doc;
            return t.cm = null,
            vv(this, n),
            ou(this),
            ct(this),
            this.scrollTo(n.scrollLeft, n.scrollTop),
            w(this, "swapDoc", this, t),
            t
        }),
        getInputField: function() {
            return this.display.input
        },
        getWrapperElement: function() {
            return this.display.wrapper
        },
        getScrollerElement: function() {
            return this.display.scroller
        },
        getGutterElement: function() {
            return this.display.gutters
        }
    };
    wr(n);
    gs = n.defaults = {};
    gi = n.optionHandlers = {};
    nh = n.Init = {
        toString: function() {
            return "CodeMirror.Init"
        }
    };
    f("value", "", function(n, t) {
        n.setValue(t)
    }, !0);
    f("mode", null, function(n, t) {
        n.doc.modeOption = t;
        ao(n)
    }, !0);
    f("indentUnit", 2, ao, !0);
    f("indentWithTabs", !1);
    f("smartIndent", !0);
    f("tabSize", 4, function(n) {
        tu(n);
        ou(n);
        rt(n)
    }, !0);
    f("specialChars", /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\ufeff]/g, function(n, t) {
        n.options.specialChars = new RegExp(t.source + (t.test("\t") ? "" : "|\t"),"g");
        n.refresh()
    }, !0);
    f("specialCharPlaceholder", cb, function(n) {
        n.refresh()
    }, !0);
    f("electricChars", !0);
    f("rtlMoveVisually", !np);
    f("wholeLineUpdateBefore", !0);
    f("theme", "default", function(n) {
        uc(n);
        iu(n)
    }, !0);
    f("keyMap", "default", rc);
    f("extraKeys", null);
    f("lineWrapping", !1, ip, !0);
    f("gutters", [], function(n) {
        po(n.options);
        iu(n)
    }, !0);
    f("fixedGutter", !0, function(n, t) {
        n.display.gutters.style.left = t ? go(n.display) + "px" : "0";
        n.refresh()
    }, !0);
    f("coverGutterNextToScrollbar", !1, wf, !0);
    f("lineNumbers", !1, function(n) {
        po(n.options);
        iu(n)
    }, !0);
    f("firstLineNumber", 1, iu, !0);
    f("lineNumberFormatter", function(n) {
        return n
    }, iu, !0);
    f("showCursorWhenSelecting", !1, us, !0);
    f("resetSelectionOnContextMenu", !0);
    f("readOnly", !1, function(n, t) {
        t == "nocursor" ? (ys(n),
        n.display.input.blur(),
        n.display.disabled = !0) : (n.display.disabled = !1,
        t || ct(n))
    });
    f("disableInput", !1, function(n, t) {
        t || ct(n)
    }, !0);
    f("dragDrop", !0);
    f("cursorBlinkRate", 530);
    f("cursorScrollMargin", 0);
    f("cursorHeight", 1);
    f("workTime", 100);
    f("workDelay", 100);
    f("flattenSpans", !0, tu, !0);
    f("addModeClass", !1, tu, !0);
    f("pollInterval", 100);
    f("undoDepth", 200, function(n, t) {
        n.doc.history.undoDepth = t
    });
    f("historyEventDelay", 1250);
    f("viewportMargin", 10, function(n) {
        n.refresh()
    }, !0);
    f("maxHighlightLength", 1e4, tu, !0);
    f("moveInputWithCursor", !0, function(n, t) {
        t || (n.display.inputDiv.style.top = n.display.inputDiv.style.left = 0)
    });
    f("tabindex", null, function(n, t) {
        n.display.input.tabIndex = t || ""
    });
    f("autofocus", null);
    th = n.modes = {};
    hr = n.mimeModes = {};
    n.defineMode = function(t, i) {
        if (n.defaults.mode || t == "null" || (n.defaults.mode = t),
        arguments.length > 2) {
            i.dependencies = [];
            for (var r = 2; r < arguments.length; ++r)
                i.dependencies.push(arguments[r])
        }
        th[t] = i
    }
    ;
    n.defineMIME = function(n, t) {
        hr[n] = t
    }
    ;
    n.resolveMode = function(t) {
        if (typeof t == "string" && hr.hasOwnProperty(t))
            t = hr[t];
        else if (t && typeof t.name == "string" && hr.hasOwnProperty(t.name)) {
            var i = hr[t.name];
            typeof i == "string" && (i = {
                name: i
            });
            t = uy(i, t);
            t.name = i.name
        } else if (typeof t == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(t))
            return n.resolveMode("application/xml");
        return typeof t == "string" ? {
            name: t
        } : t || {
            name: "null"
        }
    }
    ;
    n.getMode = function(t, i) {
        var i = n.resolveMode(i), e = th[i.name], u, f, r;
        if (!e)
            return n.getMode(t, "text/plain");
        if (u = e(t, i),
        cr.hasOwnProperty(i.name)) {
            f = cr[i.name];
            for (r in f)
                f.hasOwnProperty(r) && (u.hasOwnProperty(r) && (u["_" + r] = u[r]),
                u[r] = f[r])
        }
        if (u.name = i.name,
        i.helperType && (u.helperType = i.helperType),
        i.modeProps)
            for (r in i.modeProps)
                u[r] = i.modeProps[r];
        return u
    }
    ;
    n.defineMode("null", function() {
        return {
            token: function(n) {
                n.skipToEnd()
            }
        }
    });
    n.defineMIME("text/plain", "null");
    cr = n.modeExtensions = {};
    n.extendMode = function(n, t) {
        var i = cr.hasOwnProperty(n) ? cr[n] : cr[n] = {};
        eo(t, i)
    }
    ;
    n.defineExtension = function(t, i) {
        n.prototype[t] = i
    }
    ;
    n.defineDocExtension = function(n, t) {
        d.prototype[n] = t
    }
    ;
    n.defineOption = f;
    de = [];
    n.defineInitHook = function(n) {
        de.push(n)
    }
    ;
    ui = n.helpers = {};
    n.registerHelper = function(t, i, r) {
        ui.hasOwnProperty(t) || (ui[t] = n[t] = {
            _global: []
        });
        ui[t][i] = r
    }
    ;
    n.registerGlobalHelper = function(t, i, r, u) {
        n.registerHelper(t, i, u);
        ui[t]._global.push({
            pred: r,
            val: u
        })
    }
    ;
    lr = n.copyState = function(n, t) {
        var r, u, i;
        if (t === !0)
            return t;
        if (n.copyState)
            return n.copyState(t);
        r = {};
        for (u in t)
            i = t[u],
            i instanceof Array && (i = i.concat([])),
            r[u] = i;
        return r
    }
    ;
    la = n.startState = function(n, t, i) {
        return n.startState ? n.startState(t, i) : !0
    }
    ;
    n.innerMode = function(n, t) {
        while (n.innerMode) {
            var i = n.innerMode(t);
            if (!i || i.mode == n)
                break;
            t = i.state;
            n = i.mode
        }
        return i || {
            mode: n,
            state: t
        }
    }
    ;
    yu = n.commands = {
        selectAll: function(n) {
            n.setSelection(t(n.firstLine(), 0), t(n.lastLine()), br)
        },
        singleSelection: function(n) {
            n.setSelection(n.getCursor("anchor"), n.getCursor("head"), br)
        },
        killLine: function(n) {
            ke(n, function(i) {
                if (i.empty()) {
                    var u = r(n.doc, i.head.line).text.length;
                    return i.head.ch == u && i.head.line < n.lastLine() ? {
                        from: i.head,
                        to: t(i.head.line + 1, 0)
                    } : {
                        from: i.head,
                        to: t(i.head.line, u)
                    }
                }
                return {
                    from: i.from(),
                    to: i.to()
                }
            })
        },
        deleteLine: function(n) {
            ke(n, function(i) {
                return {
                    from: t(i.from().line, 0),
                    to: u(n.doc, t(i.to().line + 1, 0))
                }
            })
        },
        delLineLeft: function(n) {
            ke(n, function(n) {
                return {
                    from: t(n.from().line, 0),
                    to: n.from()
                }
            })
        },
        undo: function(n) {
            n.undo()
        },
        redo: function(n) {
            n.redo()
        },
        undoSelection: function(n) {
            n.undoSelection()
        },
        redoSelection: function(n) {
            n.redoSelection()
        },
        goDocStart: function(n) {
            n.extendSelection(t(n.firstLine(), 0))
        },
        goDocEnd: function(n) {
            n.extendSelection(t(n.lastLine()))
        },
        goLineStart: function(n) {
            n.extendSelectionsBy(function(t) {
                return ly(n, t.head.line)
            }, ir)
        },
        goLineStartSmart: function(n) {
            n.extendSelectionsBy(function(i) {
                var r = ly(n, i.head.line), f = n.getLineHandle(r.line), e = yt(f), u, o;
                return !e || e[0].level == 0 ? (u = Math.max(0, f.text.search(/\S/)),
                o = i.head.line == r.line && i.head.ch <= u && i.head.ch,
                t(r.line, o ? 0 : u)) : r
            }, ir)
        },
        goLineEnd: function(n) {
            n.extendSelectionsBy(function(t) {
                return uk(n, t.head.line)
            }, ir)
        },
        goLineRight: function(n) {
            n.extendSelectionsBy(function(t) {
                var i = n.charCoords(t.head, "div").top + 5;
                return n.coordsChar({
                    left: n.display.lineDiv.offsetWidth + 100,
                    top: i
                }, "div")
            }, ir)
        },
        goLineLeft: function(n) {
            n.extendSelectionsBy(function(t) {
                var i = n.charCoords(t.head, "div").top + 5;
                return n.coordsChar({
                    left: 0,
                    top: i
                }, "div")
            }, ir)
        },
        goLineUp: function(n) {
            n.moveV(-1, "line")
        },
        goLineDown: function(n) {
            n.moveV(1, "line")
        },
        goPageUp: function(n) {
            n.moveV(-1, "page")
        },
        goPageDown: function(n) {
            n.moveV(1, "page")
        },
        goCharLeft: function(n) {
            n.moveH(-1, "char")
        },
        goCharRight: function(n) {
            n.moveH(1, "char")
        },
        goColumnLeft: function(n) {
            n.moveH(-1, "column")
        },
        goColumnRight: function(n) {
            n.moveH(1, "column")
        },
        goWordLeft: function(n) {
            n.moveH(-1, "word")
        },
        goGroupRight: function(n) {
            n.moveH(1, "group")
        },
        goGroupLeft: function(n) {
            n.moveH(-1, "group")
        },
        goWordRight: function(n) {
            n.moveH(1, "word")
        },
        delCharBefore: function(n) {
            n.deleteH(-1, "char")
        },
        delCharAfter: function(n) {
            n.deleteH(1, "char")
        },
        delWordBefore: function(n) {
            n.deleteH(-1, "word")
        },
        delWordAfter: function(n) {
            n.deleteH(1, "word")
        },
        delGroupBefore: function(n) {
            n.deleteH(-1, "group")
        },
        delGroupAfter: function(n) {
            n.deleteH(1, "group")
        },
        indentAuto: function(n) {
            n.indentSelection("smart")
        },
        indentMore: function(n) {
            n.indentSelection("add")
        },
        indentLess: function(n) {
            n.indentSelection("subtract")
        },
        insertTab: function(n) {
            n.replaceSelection("\t")
        },
        defaultTab: function(n) {
            n.somethingSelected() ? n.indentSelection("add") : n.execCommand("insertTab")
        },
        transposeChars: function(n) {
            gt(n, function() {
                for (var i, u, e = n.listSelections(), f = 0; f < e.length; f++)
                    i = e[f].head,
                    u = r(n.doc, i.line).text,
                    i.ch > 0 && i.ch < u.length - 1 && n.replaceRange(u.charAt(i.ch) + u.charAt(i.ch - 1), t(i.line, i.ch - 1), t(i.line, i.ch + 1))
            })
        },
        newlineAndIndent: function(n) {
            gt(n, function() {
                for (var t, r = n.listSelections().length, i = 0; i < r; i++)
                    t = n.listSelections()[i],
                    n.replaceRange("\n", t.anchor, t.head, "+input"),
                    n.indentLine(t.from().line + 1, null, !0),
                    di(n)
            })
        },
        toggleOverwrite: function(n) {
            n.toggleOverwrite()
        }
    };
    lt = n.keyMap = {};
    lt.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite",
        Esc: "singleSelection"
    };
    lt.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-Up": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Down": "goDocEnd",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        fallthrough: "basic"
    };
    lt.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineStart",
        "Cmd-Right": "goLineEnd",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delLineLeft",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        fallthrough: ["basic", "emacsy"]
    };
    lt.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    };
    lt["default"] = li ? lt.macDefault : lt.pcDefault;
    var ge = n.lookupKey = function(n, t, i) {
        function u(t) {
            var f, r, e, o;
            if (t = ih(t),
            f = t[n],
            f === !1)
                return "stop";
            if (f != null && i(f))
                return !0;
            if (t.nofallthrough)
                return "stop";
            if (r = t.fallthrough,
            r == null)
                return !1;
            if (Object.prototype.toString.call(r) != "[object Array]")
                return u(r);
            for (e = 0; e < r.length; ++e)
                if (o = u(r[e]),
                o)
                    return o;
            return !1
        }
        for (var f, r = 0; r < t.length; ++r)
            if (f = u(t[r]),
            f)
                return f != "stop"
    }
      , dw = n.isModifierKey = function(n) {
        var t = ci[n.keyCode];
        return t == "Ctrl" || t == "Alt" || t == "Shift" || t == "Mod"
    }
      , gw = n.keyName = function(n, t) {
        if (et && n.keyCode == 34 && n.char)
            return !1;
        var i = ci[n.keyCode];
        return i == null || n.altGraphKey ? !1 : (n.altKey && (i = "Alt-" + i),
        (nc ? n.metaKey : n.ctrlKey) && (i = "Ctrl-" + i),
        (nc ? n.ctrlKey : n.metaKey) && (i = "Cmd-" + i),
        !t && n.shiftKey && (i = "Shift-" + i),
        i)
    }
    ;
    n.fromTextArea = function(t, i) {
        function f() {
            t.value = r.getValue()
        }
        var e, u, s, h, r;
        if (i || (i = {}),
        i.value = t.value,
        !i.tabindex && t.tabindex && (i.tabindex = t.tabindex),
        !i.placeholder && t.placeholder && (i.placeholder = t.placeholder),
        i.autofocus == null && (e = hi(),
        i.autofocus = e == t || t.getAttribute("autofocus") != null && e == document.body),
        t.form && (o(t.form, "submit", f),
        !i.leaveSubmitMethodAlone)) {
            u = t.form;
            s = u.submit;
            try {
                h = u.submit = function() {
                    f();
                    u.submit = s;
                    u.submit();
                    u.submit = h
                }
            } catch (c) {}
        }
        return t.style.display = "none",
        r = n(function(n) {
            t.parentNode.insertBefore(n, t.nextSibling)
        }, i),
        r.save = f,
        r.getTextArea = function() {
            return t
        }
        ,
        r.toTextArea = function() {
            f();
            t.parentNode.removeChild(r.getWrapperElement());
            t.style.display = "";
            t.form && (oi(t.form, "submit", f),
            typeof t.form.submit == "function" && (t.form.submit = s))
        }
        ,
        r
    }
    ;
    pu = n.StringStream = function(n, t) {
        this.pos = this.start = 0;
        this.string = n;
        this.tabSize = t || 8;
        this.lastColumnPos = this.lastColumnValue = 0;
        this.lineStart = 0
    }
    ;
    pu.prototype = {
        eol: function() {
            return this.pos >= this.string.length
        },
        sol: function() {
            return this.pos == this.lineStart
        },
        peek: function() {
            return this.string.charAt(this.pos) || undefined
        },
        next: function() {
            if (this.pos < this.string.length)
                return this.string.charAt(this.pos++)
        },
        eat: function(n) {
            var t = this.string.charAt(this.pos), i;
            return i = typeof n == "string" ? t == n : t && (n.test ? n.test(t) : n(t)),
            i ? (++this.pos,
            t) : void 0
        },
        eatWhile: function(n) {
            for (var t = this.pos; this.eat(n); )
                ;
            return this.pos > t
        },
        eatSpace: function() {
            for (var n = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
                ++this.pos;
            return this.pos > n
        },
        skipToEnd: function() {
            this.pos = this.string.length
        },
        skipTo: function(n) {
            var t = this.string.indexOf(n, this.pos);
            if (t > -1)
                return this.pos = t,
                !0
        },
        backUp: function(n) {
            this.pos -= n
        },
        column: function() {
            return this.lastColumnPos < this.start && (this.lastColumnValue = st(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue),
            this.lastColumnPos = this.start),
            this.lastColumnValue - (this.lineStart ? st(this.string, this.lineStart, this.tabSize) : 0)
        },
        indentation: function() {
            return st(this.string, null, this.tabSize) - (this.lineStart ? st(this.string, this.lineStart, this.tabSize) : 0)
        },
        match: function(n, t, i) {
            var u, f, r;
            if (typeof n == "string") {
                if (u = function(n) {
                    return i ? n.toLowerCase() : n
                }
                ,
                f = this.string.substr(this.pos, n.length),
                u(f) == u(n))
                    return t !== !1 && (this.pos += n.length),
                    !0
            } else
                return (r = this.string.slice(this.pos).match(n),
                r && r.index > 0) ? null : (r && t !== !1 && (this.pos += r[0].length),
                r)
        },
        current: function() {
            return this.string.slice(this.start, this.pos)
        },
        hideFirstChars: function(n, t) {
            this.lineStart += n;
            try {
                return t()
            } finally {
                this.lineStart -= n
            }
        }
    };
    fi = n.TextMarker = function(n, t) {
        this.lines = [];
        this.type = t;
        this.doc = n
    }
    ;
    wr(fi);
    fi.prototype.clear = function() {
        var n, e, u, f, o, t, r, i, s, h;
        if (!this.explicitlyCleared) {
            for (n = this.doc.cm,
            e = n && !n.curOp,
            e && ur(n),
            ot(this, "clear") && (u = this.find(),
            u && w(this, "clear", u.from, u.to)),
            f = null,
            o = null,
            i = 0; i < this.lines.length; ++i)
                t = this.lines[i],
                r = ku(t.markedSpans, this),
                n && !this.collapsed ? wi(n, c(t), "text") : n && (r.to != null && (o = c(t)),
                r.from != null && (f = c(t))),
                t.markedSpans = tb(t.markedSpans, r),
                r.from == null && this.collapsed && !nr(this.doc, t) && n && vt(t, pi(n.display));
            if (n && this.collapsed && !n.options.lineWrapping)
                for (i = 0; i < this.lines.length; ++i)
                    s = at(this.lines[i]),
                    h = pf(s),
                    h > n.display.maxLineLength && (n.display.maxLine = s,
                    n.display.maxLineLength = h,
                    n.display.maxLineChanged = !0);
            f != null && n && this.collapsed && rt(n, f, o + 1);
            this.lines.length = 0;
            this.explicitlyCleared = !0;
            this.atomic && this.doc.cantEdit && (this.doc.cantEdit = !1,
            n && gc(n.doc));
            n && w(n, "markerCleared", n, this);
            e && fr(n)
        }
    }
    ;
    fi.prototype.find = function(n, i) {
        var f, o, e, r, u;
        for (n == null && this.type == "bookmark" && (n = 1),
        e = 0; e < this.lines.length; ++e) {
            if (r = this.lines[e],
            u = ku(r.markedSpans, this),
            u.from != null && (f = t(i ? r : c(r), u.from),
            n == -1))
                return f;
            if (u.to != null && (o = t(i ? r : c(r), u.to),
            n == 1))
                return o
        }
        return f && {
            from: f,
            to: o
        }
    }
    ;
    fi.prototype.changed = function() {
        var i = this.find(-1, !0)
          , t = this
          , n = this.doc.cm;
        i && n && gt(n, function() {
            var r = i.line, o = c(i.line), f = ul(n, o), e, u;
            f && (el(f),
            n.curOp.selectionChanged = n.curOp.forceUpdate = !0);
            n.curOp.updateMaxLine = !0;
            nr(t.doc, r) || t.height == null || (e = t.height,
            t.height = null,
            u = nf(t) - e,
            u && vt(r, r.height + u))
        })
    }
    ;
    fi.prototype.attachLine = function(n) {
        if (!this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            t.maybeHiddenMarkers && g(t.maybeHiddenMarkers, this) != -1 || (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
        }
        this.lines.push(n)
    }
    ;
    fi.prototype.detachLine = function(n) {
        if (this.lines.splice(g(this.lines, n), 1),
        !this.lines.length && this.doc.cm) {
            var t = this.doc.cm.curOp;
            (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
        }
    }
    ;
    aa = 0;
    bu = n.SharedTextMarker = function(n, t) {
        this.markers = n;
        this.primary = t;
        for (var i = 0, r = this; i < n.length; ++i)
            n[i].parent = this,
            o(n[i], "clear", function() {
                r.clear()
            })
    }
    ;
    wr(bu);
    bu.prototype.clear = function() {
        if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0;
            for (var n = 0; n < this.markers.length; ++n)
                this.markers[n].clear();
            w(this, "clear")
        }
    }
    ;
    bu.prototype.find = function(n, t) {
        return this.primary.find(n, t)
    }
    ;
    gu = n.LineWidget = function(n, t, i) {
        if (i)
            for (var r in i)
                i.hasOwnProperty(r) && (this[r] = i[r]);
        this.cm = n;
        this.node = t
    }
    ;
    wr(gu);
    gu.prototype.clear = function() {
        var r = this.cm, n = this.line.widgets, t = this.line, f = c(t), i, u;
        if (f != null && n) {
            for (i = 0; i < n.length; ++i)
                n[i] == this && n.splice(i--, 1);
            n.length || (t.widgets = null);
            u = nf(this);
            gt(r, function() {
                tv(r, t, -u);
                wi(r, f, "widget");
                vt(t, Math.max(0, t.height - u))
            })
        }
    }
    ;
    gu.prototype.changed = function() {
        var r = this.height, t = this.cm, i = this.line, n;
        (this.height = null,
        n = nf(this) - r,
        n) && gt(t, function() {
            t.curOp.forceUpdate = !0;
            tv(t, i, n);
            vt(i, i.height + n)
        })
    }
    ;
    ei = n.Line = function(n, t, i) {
        this.text = n;
        wa(this, t);
        this.height = i ? i(this) : 1
    }
    ;
    wr(ei);
    ei.prototype.lineNo = function() {
        return c(this)
    }
    ;
    fv = {};
    ev = {};
    tf.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        removeInner: function(n, t) {
            for (var r, i = n, u = n + t; i < u; ++i)
                r = this.lines[i],
                this.height -= r.height,
                hb(r),
                w(r, "delete");
            this.lines.splice(n, t)
        },
        collapse: function(n) {
            n.push.apply(n, this.lines)
        },
        insertInner: function(n, t, i) {
            this.height += i;
            this.lines = this.lines.slice(0, n).concat(t).concat(this.lines.slice(n));
            for (var r = 0; r < t.length; ++r)
                t[r].parent = this
        },
        iterN: function(n, t, i) {
            for (var r = n + t; n < r; ++n)
                if (i(this.lines[n]))
                    return !0
        }
    };
    rf.prototype = {
        chunkSize: function() {
            return this.size
        },
        removeInner: function(n, t) {
            var r, i, u, f, o, e;
            for (this.size -= t,
            r = 0; r < this.children.length; ++r)
                if (i = this.children[r],
                u = i.chunkSize(),
                n < u) {
                    if (f = Math.min(t, u - n),
                    o = i.height,
                    i.removeInner(n, f),
                    this.height -= o - i.height,
                    u == f && (this.children.splice(r--, 1),
                    i.parent = null),
                    (t -= f) == 0)
                        break;
                    n = 0
                } else
                    n -= u;
            this.size - t < 25 && (this.children.length > 1 || !(this.children[0]instanceof tf)) && (e = [],
            this.collapse(e),
            this.children = [new tf(e)],
            this.children[0].parent = this)
        },
        collapse: function(n) {
            for (var t = 0; t < this.children.length; ++t)
                this.children[t].collapse(n)
        },
        insertInner: function(n, t, i) {
            var u, r, e, o, f;
            for (this.size += t.length,
            this.height += i,
            u = 0; u < this.children.length; ++u) {
                if (r = this.children[u],
                e = r.chunkSize(),
                n <= e) {
                    if (r.insertInner(n, t, i),
                    r.lines && r.lines.length > 50) {
                        while (r.lines.length > 50)
                            o = r.lines.splice(r.lines.length - 25, 25),
                            f = new tf(o),
                            r.height -= f.height,
                            this.children.splice(u + 1, 0, f),
                            f.parent = this;
                        this.maybeSpill()
                    }
                    break
                }
                n -= e
            }
        },
        maybeSpill: function() {
            var n, r, t, i, u;
            if (!(this.children.length <= 10)) {
                n = this;
                do
                    r = n.children.splice(n.children.length - 5, 5),
                    t = new rf(r),
                    n.parent ? (n.size -= t.size,
                    n.height -= t.height,
                    u = g(n.parent.children, n),
                    n.parent.children.splice(u + 1, 0, t)) : (i = new rf(n.children),
                    i.parent = n,
                    n.children = [i, t],
                    n = i),
                    t.parent = n.parent;
                while (n.children.length > 10);
                n.parent.maybeSpill()
            }
        },
        iterN: function(n, t, i) {
            for (var f, u, e, r = 0; r < this.children.length; ++r)
                if (f = this.children[r],
                u = f.chunkSize(),
                n < u) {
                    if (e = Math.min(t, u - n),
                    f.iterN(n, e, i))
                        return !0;
                    if ((t -= e) == 0)
                        break;
                    n = 0
                } else
                    n -= u
        }
    };
    lv = 0;
    d = n.Doc = function(n, i, r) {
        if (!(this instanceof d))
            return new d(n,i,r);
        r == null && (r = 0);
        rf.call(this, [new tf([new ei("",null)])]);
        this.first = r;
        this.scrollTop = this.scrollLeft = 0;
        this.cantEdit = !1;
        this.cleanGeneration = 1;
        this.frontier = r;
        var u = t(r, 0);
        this.sel = vi(u);
        this.history = new to(null);
        this.id = ++lv;
        this.modeOption = i;
        typeof n == "string" && (n = kr(n));
        oh(this, {
            from: u,
            to: u,
            text: n
        });
        k(this, vi(u), br)
    }
    ;
    d.prototype = uy(rf.prototype, {
        constructor: d,
        iter: function(n, t, i) {
            i ? this.iterN(n - this.first, t - n, i) : this.iterN(this.first, this.first + this.size, n)
        },
        insert: function(n, t) {
            for (var r = 0, i = 0; i < t.length; ++i)
                r += t[i].height;
            this.insertInner(n - this.first, t, r)
        },
        remove: function(n, t) {
            this.removeInner(n - this.first, t)
        },
        getValue: function(n) {
            var t = sh(this, this.first, this.first + this.size);
            return n === !1 ? t : t.join(n || "\n")
        },
        setValue: tt(function(n) {
            var i = t(this.first, 0)
              , u = this.first + this.size - 1;
            sr(this, {
                from: i,
                to: t(u, r(this, u).text.length),
                text: kr(n),
                origin: "setValue"
            }, !0);
            k(this, vi(i))
        }),
        replaceRange: function(n, t, i, r) {
            t = u(this, t);
            i = i ? u(this, i) : t;
            ve(this, n, t, i, r)
        },
        getRange: function(n, t, i) {
            var r = ff(this, u(this, n), u(this, t));
            return i === !1 ? r : r.join(i || "\n")
        },
        getLine: function(n) {
            var t = this.getLineHandle(n);
            return t && t.text
        },
        getLineHandle: function(n) {
            if (ru(this, n))
                return r(this, n)
        },
        getLineNumber: function(n) {
            return c(n)
        },
        getLineHandleVisualStart: function(n) {
            return typeof n == "number" && (n = r(this, n)),
            at(n)
        },
        lineCount: function() {
            return this.size
        },
        firstLine: function() {
            return this.first
        },
        lastLine: function() {
            return this.first + this.size - 1
        },
        clipPos: function(n) {
            return u(this, n)
        },
        getCursor: function(n) {
            var t = this.sel.primary();
            return n == null || n == "head" ? t.head : n == "anchor" ? t.anchor : n == "end" || n == "to" || n === !1 ? t.to() : t.from()
        },
        listSelections: function() {
            return this.sel.ranges
        },
        somethingSelected: function() {
            return this.sel.somethingSelected()
        },
        setCursor: tt(function(n, i, r) {
            bc(this, u(this, typeof n == "number" ? t(n, i || 0) : n), null, r)
        }),
        setSelection: tt(function(n, t, i) {
            bc(this, u(this, n), u(this, t || n), i)
        }),
        extendSelection: tt(function(n, t, i) {
            df(this, u(this, n), t && u(this, t), i)
        }),
        extendSelections: tt(function(n, t) {
            pc(this, pp(this, n, t))
        }),
        extendSelectionsBy: tt(function(n, t) {
            pc(this, ah(this.sel.ranges, n), t)
        }),
        setSelections: tt(function(n, t, i) {
            if (n.length) {
                for (var r = 0, f = []; r < n.length; r++)
                    f[r] = new h(u(this, n[r].anchor),u(this, n[r].head));
                t == null && (t = Math.min(n.length - 1, this.sel.primIndex));
                k(this, ht(f, t), i)
            }
        }),
        addSelection: tt(function(n, t, i) {
            var r = this.sel.ranges.slice(0);
            r.push(new h(u(this, n),u(this, t || n)));
            k(this, ht(r, r.length - 1), i)
        }),
        getSelection: function(n) {
            for (var u, r = this.sel.ranges, t, i = 0; i < r.length; i++)
                u = ff(this, r[i].from(), r[i].to()),
                t = t ? t.concat(u) : u;
            return n === !1 ? t : t.join(n || "\n")
        },
        getSelections: function(n) {
            for (var i, u = [], r = this.sel.ranges, t = 0; t < r.length; t++)
                i = ff(this, r[t].from(), r[t].to()),
                n !== !1 && (i = i.join(n || "\n")),
                u[t] = i;
            return u
        },
        replaceSelection: tt(function(n, t, i) {
            for (var u = [], r = 0; r < this.sel.ranges.length; r++)
                u[r] = n;
            this.replaceSelections(u, t, i || "+input")
        }),
        replaceSelections: function(n, t, i) {
            for (var f, e, u = [], o = this.sel, r = 0; r < o.ranges.length; r++)
                f = o.ranges[r],
                u[r] = {
                    from: f.from(),
                    to: f.to(),
                    text: kr(n[r]),
                    origin: i
                };
            for (e = t && t != "end" && yw(this, u, t),
            r = u.length - 1; r >= 0; r--)
                sr(this, u[r]);
            e ? kc(this, e) : this.cm && di(this.cm)
        },
        undo: tt(function() {
            ae(this, "undo")
        }),
        redo: tt(function() {
            ae(this, "redo")
        }),
        undoSelection: tt(function() {
            ae(this, "undo", !0)
        }),
        redoSelection: tt(function() {
            ae(this, "redo", !0)
        }),
        setExtending: function(n) {
            this.extend = n
        },
        getExtending: function() {
            return this.extend
        },
        historySize: function() {
            for (var t = this.history, i = 0, r = 0, n = 0; n < t.done.length; n++)
                t.done[n].ranges || ++i;
            for (n = 0; n < t.undone.length; n++)
                t.undone[n].ranges || ++r;
            return {
                undo: i,
                redo: r
            }
        },
        clearHistory: function() {
            this.history = new to(this.history.maxGeneration)
        },
        markClean: function() {
            this.cleanGeneration = this.changeGeneration(!0)
        },
        changeGeneration: function(n) {
            return n && (this.history.lastOp = this.history.lastOrigin = null),
            this.history.generation
        },
        isClean: function(n) {
            return this.history.generation == (n || this.cleanGeneration)
        },
        getHistory: function() {
            return {
                done: pr(this.history.done),
                undone: pr(this.history.undone)
            }
        },
        setHistory: function(n) {
            var t = this.history = new to(this.history.maxGeneration);
            t.done = pr(n.done.slice(0), null, !0);
            t.undone = pr(n.undone.slice(0), null, !0)
        },
        markText: function(n, t, i) {
            return wu(this, u(this, n), u(this, t), i, "range")
        },
        setBookmark: function(n, t) {
            var i = {
                replacedWith: t && (t.nodeType == null ? t.widget : t),
                insertLeft: t && t.insertLeft,
                clearWhenEmpty: !1,
                shared: t && t.shared
            };
            return n = u(this, n),
            wu(this, n, n, i, "bookmark")
        },
        findMarksAt: function(n) {
            var e, i, f, t;
            if (n = u(this, n),
            e = [],
            i = r(this, n.line).markedSpans,
            i)
                for (f = 0; f < i.length; ++f)
                    t = i[f],
                    (t.from == null || t.from <= n.ch) && (t.to == null || t.to >= n.ch) && e.push(t.marker.parent || t.marker);
            return e
        },
        findMarks: function(n, t) {
            n = u(this, n);
            t = u(this, t);
            var r = []
              , i = n.line;
            return this.iter(n.line, t.line + 1, function(u) {
                var o = u.markedSpans, e, f;
                if (o)
                    for (e = 0; e < o.length; e++)
                        f = o[e],
                        i == n.line && n.ch > f.to || f.from == null && i != n.line || i == t.line && f.from > t.ch || r.push(f.marker.parent || f.marker);
                ++i
            }),
            r
        },
        getAllMarks: function() {
            var n = [];
            return this.iter(function(t) {
                var r = t.markedSpans, i;
                if (r)
                    for (i = 0; i < r.length; ++i)
                        r[i].from != null && n.push(r[i].marker)
            }),
            n
        },
        posFromIndex: function(n) {
            var i, r = this.first;
            return this.iter(function(t) {
                var u = t.text.length + 1;
                if (u > n)
                    return i = n,
                    !0;
                n -= u;
                ++r
            }),
            u(this, t(r, i))
        },
        indexFromPos: function(n) {
            n = u(this, n);
            var t = n.ch;
            return n.line < this.first || n.ch < 0 ? 0 : (this.iter(this.first, n.line, function(n) {
                t += n.text.length + 1
            }),
            t)
        },
        copy: function(n) {
            var t = new d(sh(this, this.first, this.first + this.size),this.modeOption,this.first);
            return t.scrollTop = this.scrollTop,
            t.scrollLeft = this.scrollLeft,
            t.sel = this.sel,
            t.extend = !1,
            n && (t.history.undoDepth = this.history.undoDepth,
            t.setHistory(this.getHistory())),
            t
        },
        linkedDoc: function(n) {
            var t, r, i;
            return n || (n = {}),
            t = this.first,
            r = this.first + this.size,
            n.from != null && n.from > t && (t = n.from),
            n.to != null && n.to < r && (r = n.to),
            i = new d(sh(this, t, r),n.mode || this.modeOption,t),
            n.sharedHist && (i.history = this.history),
            (this.linked || (this.linked = [])).push({
                doc: i,
                sharedHist: n.sharedHist
            }),
            i.linked = [{
                doc: this,
                isParent: !0,
                sharedHist: n.sharedHist
            }],
            i
        },
        unlinkDoc: function(t) {
            var i, u, r;
            if (t instanceof n && (t = t.doc),
            this.linked)
                for (i = 0; i < this.linked.length; ++i)
                    if (u = this.linked[i],
                    u.doc == t) {
                        this.linked.splice(i, 1);
                        t.unlinkDoc(this);
                        break
                    }
            t.history == this.history && (r = [t.id],
            yr(t, function(n) {
                r.push(n.id)
            }, !0),
            t.history = new to(null),
            t.history.done = pr(this.history.done, r),
            t.history.undone = pr(this.history.undone, r))
        },
        iterLinkedDocs: function(n) {
            yr(this, n)
        },
        getMode: function() {
            return this.mode
        },
        getEditor: function() {
            return this.cm
        }
    });
    d.prototype.eachLine = d.prototype.iter;
    av = "iter insert remove copy getEditor".split(" ");
    for (uf in d.prototype)
        d.prototype.hasOwnProperty(uf) && g(av, uf) < 0 && (n.prototype[uf] = function(n) {
            return function() {
                return n.apply(this.doc, arguments)
            }
        }(d.prototype[uf]));
    wr(d);
    p = n.e_preventDefault = function(n) {
        n.preventDefault ? n.preventDefault() : n.returnValue = !1
    }
    ;
    gv = n.e_stopPropagation = function(n) {
        n.stopPropagation ? n.stopPropagation() : n.cancelBubble = !0
    }
    ;
    ro = n.e_stop = function(n) {
        p(n);
        gv(n)
    }
    ;
    var o = n.on = function(n, t, i) {
        if (n.addEventListener)
            n.addEventListener(t, i, !1);
        else if (n.attachEvent)
            n.attachEvent("on" + t, i);
        else {
            var r = n._handlers || (n._handlers = {})
              , u = r[t] || (r[t] = []);
            u.push(i)
        }
    }
    , oi = n.off = function(n, t, i) {
        var r, u;
        if (n.removeEventListener)
            n.removeEventListener(t, i, !1);
        else if (n.detachEvent)
            n.detachEvent("on" + t, i);
        else {
            if (r = n._handlers && n._handlers[t],
            !r)
                return;
            for (u = 0; u < r.length; ++u)
                if (r[u] == i) {
                    r.splice(u, 1);
                    break
                }
        }
    }
    , a = n.signal = function(n, t) {
        var r = n._handlers && n._handlers[t], u, i;
        if (r)
            for (u = Array.prototype.slice.call(arguments, 2),
            i = 0; i < r.length; ++i)
                r[i].apply(null, u)
    }
    , si, uo = 0;
    var ti = 30
      , ty = n.Pass = {
        toString: function() {
            return "CodeMirror.Pass"
        }
    }
      , br = {
        scroll: !1
    }
      , fo = {
        origin: "*mouse"
    }
      , ir = {
        origin: "+move"
    };
    lh.prototype.set = function(n, t) {
        clearTimeout(this.id);
        this.id = setTimeout(t, n)
    }
    ;
    st = n.countColumn = function(n, t, i, r, u) {
        var f, e, o;
        for (t == null && (t = n.search(/[^\s\u00a0]/),
        t == -1 && (t = n.length)),
        f = r || 0,
        e = u || 0; ; ) {
            if (o = n.indexOf("\t", f),
            o < 0 || o >= t)
                return e + (t - f);
            e += o - f;
            e += i - e % i;
            f = o + 1
        }
    }
    ;
    of = [""];
    sf = function(n) {
        n.select()
    }
    ;
    nu ? sf = function(n) {
        n.selectionStart = 0;
        n.selectionEnd = n.value.length
    }
    : nt && (sf = function(n) {
        try {
            n.select()
        } catch (t) {}
    }
    );
    [].indexOf && (g = function(n, t) {
        return n.indexOf(t)
    }
    );
    [].map && (ah = function(n, t) {
        return n.map(t)
    }
    );
    fy = /[\u00df\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
    hf = n.isWordChar = function(n) {
        return /\w/.test(n) || n > "" && (n.toUpperCase() != n.toLowerCase() || fy.test(n))
    }
    ;
    oy = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
    lf = document.createRange ? function(n, t, i) {
        var r = document.createRange();
        return r.setEnd(n, i),
        r.setStart(n, t),
        r
    }
    : function(n, t, i) {
        var r = document.body.createTextRange();
        return r.moveToElementText(n.parentNode),
        r.collapse(!0),
        r.moveEnd("character", i),
        r.moveStart("character", t),
        r
    }
    ;
    ft && (hi = function() {
        try {
            return document.activeElement
        } catch (n) {
            return document.body
        }
    }
    );
    hy = function() {
        if (y)
            return !1;
        var n = i("div");
        return "draggable"in n || "dragDrop"in n
    }();
    var kr = n.splitLines = "\n\nb".split(/\n/).length != 3 ? function(n) {
        for (var i = 0, f = [], e = n.length, t, r, u; i <= e; )
            t = n.indexOf("\n", i),
            t == -1 && (t = n.length),
            r = n.slice(i, n.charAt(t - 1) == "\r" ? t - 1 : t),
            u = r.indexOf("\r"),
            u != -1 ? (f.push(r.slice(0, u)),
            i += u + 1) : (f.push(r),
            i = t + 1);
        return f
    }
    : function(n) {
        return n.split(/\r\n?|\n/)
    }
      , ik = window.getSelection ? function(n) {
        try {
            return n.selectionStart != n.selectionEnd
        } catch (t) {
            return !1
        }
    }
    : function(n) {
        try {
            var t = n.ownerDocument.selection.createRange()
        } catch (i) {}
        return !t || t.parentElement() != n ? !1 : t.compareEndPoints("StartToEnd", t) != 0
    }
      , cy = function() {
        var n = i("div");
        return "oncopy"in n ? !0 : (n.setAttribute("oncopy", "return;"),
        typeof n.oncopy == "function")
    }()
      , ci = {
        3: "Enter",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        107: "=",
        109: "-",
        127: "Delete",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        63232: "Up",
        63233: "Down",
        63234: "Left",
        63235: "Right",
        63272: "Delete",
        63273: "Home",
        63275: "End",
        63276: "PageUp",
        63277: "PageDown",
        63302: "Insert"
    };
    return n.keyNames = ci,
    function() {
        for (var n = 0; n < 10; n++)
            ci[n + 48] = ci[n + 96] = String(n);
        for (n = 65; n <= 90; n++)
            ci[n] = String.fromCharCode(n);
        for (n = 1; n <= 12; n++)
            ci[n + 111] = ci[n + 63235] = "F" + n
    }(),
    vy = function() {
        function h(n) {
            return n <= 247 ? e.charAt(n) : 1424 <= n && n <= 1524 ? "R" : 1536 <= n && n <= 1773 ? o.charAt(n - 1536) : 1774 <= n && n <= 2220 ? "r" : 8192 <= n && n <= 8203 ? "w" : n == 8204 ? "b" : "L"
        }
        function n(n, t, i) {
            this.level = n;
            this.from = t;
            this.to = i
        }
        var e = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN"
          , o = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm"
          , c = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/
          , i = /[stwN]/
          , r = /[LRr]/
          , u = /[Lb1n]/
          , f = /[1n]/
          , t = "L";
        return function(e) {
            var y, l, b, tt, d, v, w, p, g, o, it, k, nt, a, rt;
            if (!c.test(e))
                return !1;
            for (y = e.length,
            l = [],
            o = 0; o < y; ++o)
                l.push(v = h(e.charCodeAt(o)));
            for (o = 0,
            b = t; o < y; ++o)
                v = l[o],
                v == "m" ? l[o] = b : b = v;
            for (o = 0,
            d = t; o < y; ++o)
                v = l[o],
                v == "1" && d == "r" ? l[o] = "n" : r.test(v) && (d = v,
                v == "r" && (l[o] = "R"));
            for (o = 1,
            b = l[0]; o < y - 1; ++o)
                v = l[o],
                v == "+" && b == "1" && l[o + 1] == "1" ? l[o] = "1" : v == "," && b == l[o + 1] && (b == "1" || b == "n") && (l[o] = b),
                b = v;
            for (o = 0; o < y; ++o)
                if (v = l[o],
                v == ",")
                    l[o] = "N";
                else if (v == "%") {
                    for (w = o + 1; w < y && l[w] == "%"; ++w)
                        ;
                    for (tt = o && l[o - 1] == "!" || w < y && l[w] == "1" ? "1" : "N",
                    a = o; a < w; ++a)
                        l[a] = tt;
                    o = w - 1
                }
            for (o = 0,
            d = t; o < y; ++o)
                v = l[o],
                d == "L" && v == "1" ? l[o] = "L" : r.test(v) && (d = v);
            for (o = 0; o < y; ++o)
                if (i.test(l[o])) {
                    for (w = o + 1; w < y && i.test(l[w]); ++w)
                        ;
                    var ut = (o ? l[o - 1] : t) == "L"
                      , ft = (w < y ? l[w] : t) == "L"
                      , tt = ut || ft ? "L" : "R";
                    for (a = o; a < w; ++a)
                        l[a] = tt;
                    o = w - 1
                }
            for (p = [],
            o = 0; o < y; )
                if (u.test(l[o])) {
                    for (it = o,
                    ++o; o < y && u.test(l[o]); ++o)
                        ;
                    p.push(new n(0,it,o))
                } else {
                    for (k = o,
                    nt = p.length,
                    ++o; o < y && l[o] != "L"; ++o)
                        ;
                    for (a = k; a < o; )
                        if (f.test(l[a])) {
                            for (k < a && p.splice(nt, 0, new n(1,k,a)),
                            rt = a,
                            ++a; a < o && f.test(l[a]); ++a)
                                ;
                            p.splice(nt, 0, new n(2,rt,a));
                            k = a
                        } else
                            ++a;
                    k < o && p.splice(nt, 0, new n(1,k,o))
                }
            return p[0].level == 1 && (g = e.match(/^\s+/)) && (p[0].from = g[0].length,
            p.unshift(new n(0,0,g[0].length))),
            s(p).level == 1 && (g = e.match(/\s+$/)) && (s(p).to -= g[0].length,
            p.push(new n(0,y - g[0].length,y))),
            p[0].level != s(p).level && p.push(new n(p[0].level,y,y)),
            p
        }
    }(),
    n.version = "4.0.3",
    n
});

CodeMirror.defineMode("python", function(n, t) {
    function o(n) {
        return new RegExp("^((" + n.join(")|(") + "))\\b")
    }
    function e(n, t) {
        var e, o, c, u, r;
        if (n.sol()) {
            if (e = t.scopes[0].offset,
            n.eatSpace())
                return o = n.indentation(),
                o > e ? f = "indent" : o < e && (f = "dedent"),
                null;
            e > 0 && h(n, t)
        }
        if (n.eatSpace())
            return null;
        if (c = n.peek(),
        c === "#")
            return n.skipToEnd(),
            "comment";
        if (n.match(/^[0-9\.]/, !1)) {
            if (u = !1,
            n.match(/^\d*\.\d+(e[\+\-]?\d+)?/i) && (u = !0),
            n.match(/^\d+\.\d*/) && (u = !0),
            n.match(/^\.\d+/) && (u = !0),
            u)
                return n.eat(/J/i),
                "number";
            if (r = !1,
            n.match(/^0x[0-9a-f]+/i) && (r = !0),
            n.match(/^0b[01]+/i) && (r = !0),
            n.match(/^0o[0-7]+/i) && (r = !0),
            n.match(/^[1-9]\d*(e[\+\-]?\d+)?/) && (n.eat(/J/i),
            r = !0),
            n.match(/^0(?![\dx])/i) && (r = !0),
            r)
                return n.eat(/L/i),
                "number"
        }
        return n.match(s) ? (t.tokenize = tt(n.current()),
        t.tokenize(n, t)) : n.match(b) || n.match(w) ? null : n.match(p) || n.match(v) || n.match(d) ? "operator" : n.match(y) ? null : n.match(g) ? "keyword" : n.match(nt) ? "builtin" : n.match(k) ? "variable" : (n.next(),
        i)
    }
    function tt(n) {
        while ("rub".indexOf(n.charAt(0).toLowerCase()) >= 0)
            n = n.substr(1);
        var u = n.length == 1
          , r = "string";
        return function(f, o) {
            while (!f.eol())
                if (f.eatWhile(/[^'"\\]/),
                f.eat("\\")) {
                    if (f.next(),
                    u && f.eol())
                        return r
                } else {
                    if (f.match(n))
                        return o.tokenize = e,
                        r;
                    f.eat(/['"]/)
                }
            if (u) {
                if (t.singleLineStringErrors)
                    return i;
                o.tokenize = e
            }
            return r
        }
    }
    function a(t, i, r) {
        var f, u;
        if (r = r || "py",
        f = 0,
        r === "py") {
            if (i.scopes[0].type !== "py") {
                i.scopes[0].offset = t.indentation();
                return
            }
            for (u = 0; u < i.scopes.length; ++u)
                if (i.scopes[u].type === "py") {
                    f = i.scopes[u].offset + n.indentUnit;
                    break
                }
        } else
            f = t.column() + t.current().length;
        i.scopes.unshift({
            offset: f,
            type: r
        })
    }
    function h(n, t, i) {
        var u, f, r;
        if (i = i || "py",
        t.scopes.length != 1) {
            if (t.scopes[0].type === "py") {
                for (u = n.indentation(),
                f = -1,
                r = 0; r < t.scopes.length; ++r)
                    if (u === t.scopes[r].offset) {
                        f = r;
                        break
                    }
                if (f === -1)
                    return !0;
                while (t.scopes[0].offset !== u)
                    t.scopes.shift();
                return !1
            }
            return i === "py" ? (t.scopes[0].offset = n.indentation(),
            !1) : t.scopes[0].type != i ? !0 : (t.scopes.shift(),
            !1)
        }
    }
    function it(n, t) {
        var u, r, e;
        return (f = null,
        u = t.tokenize(n, t),
        r = n.current(),
        r === ".") ? (u = t.tokenize(n, t),
        r = n.current(),
        u === "variable" || u === "builtin" ? "variable" : i) : r === "@" ? (u = t.tokenize(n, t),
        r = n.current(),
        u === "variable" || r === "@staticmethod" || r === "@classmethod" ? "meta" : i) : ((r === "pass" || r === "return") && (t.dedent += 1),
        r === "lambda" && (t.lambda = !0),
        (r !== ":" || t.lambda || t.scopes[0].type != "py") && f !== "indent" || a(n, t),
        e = "[({".indexOf(r),
        e !== -1 && a(n, t, "])}".slice(e, e + 1)),
        f === "dedent" && h(n, t)) ? i : (e = "])}".indexOf(r),
        e !== -1 && h(n, t, r)) ? i : (t.dedent > 0 && n.eol() && t.scopes[0].type == "py" && (t.scopes.length > 1 && t.scopes.shift(),
        t.dedent -= 1),
        u)
    }
    var i = "error", v = new RegExp("^[\\+\\-\\*/%&|\\^~<>!]"), y = new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]"), p = new RegExp("^((==)|(!=)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))"), w = new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))"), b = new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))"), k = new RegExp("^[_A-Za-z][_A-Za-z0-9]*"), d = o(["and", "or", "not", "is", "in"]), r = ["as", "assert", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "lambda", "pass", "raise", "return", "try", "while", "with", "yield"], u = ["abs", "all", "any", "bin", "bool", "bytearray", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip", "__import__", "NotImplemented", "Ellipsis", "__debug__"], c = {
        builtins: ["apply", "basestring", "buffer", "cmp", "coerce", "execfile", "file", "intern", "long", "raw_input", "reduce", "reload", "unichr", "unicode", "xrange", "False", "True", "None"],
        keywords: ["exec", "print"]
    }, l = {
        builtins: ["ascii", "bytes", "exec", "print"],
        keywords: ["nonlocal", "False", "True", "None"]
    }, s;
    !t.version || parseInt(t.version, 10) !== 3 ? (r = r.concat(c.keywords),
    u = u.concat(c.builtins),
    s = new RegExp("^(([rub]|(ur)|(br))?('{3}|\"{3}|['\"]))","i")) : (r = r.concat(l.keywords),
    u = u.concat(l.builtins),
    s = new RegExp("^(([rb]|(br))?('{3}|\"{3}|['\"]))","i"));
    var g = o(r)
      , nt = o(u)
      , f = null;
    return {
        startState: function(n) {
            return {
                tokenize: e,
                scopes: [{
                    offset: n || 0,
                    type: "py"
                }],
                lastToken: null,
                lambda: !1,
                dedent: 0
            }
        },
        token: function(n, t) {
            var i = it(n, t);
            return t.lastToken = {
                style: i,
                content: n.current()
            },
            n.eol() && n.lambda && (t.lambda = !1),
            i
        },
        indent: function(n) {
            return n.tokenize != e ? 0 : n.scopes[0].offset
        }
    }
});

CodeMirror.defineMIME("text/x-python", "python"),

function(n) {
    typeof exports == "object" && typeof module == "object" ? n(require("../../lib/codemirror")) : typeof define == "function" && define.amd ? define(["../../lib/codemirror"], n) : n(CodeMirror)
}(function(n) {
    n.defineOption("showTrailingSpace", !1, function(t, i, r) {
        r == n.Init && (r = !1);
        r && !i ? t.removeOverlay("trailingspace") : !r && i && t.addOverlay({
            token: function(n) {
                for (var i = n.string.length, t = i; t && /\s/.test(n.string.charAt(t - 1)); --t)
                    ;
                return t > n.pos ? (n.pos = t,
                null) : (n.pos = i,
                "trailingspace")
            },
            name: "trailingspace"
        })
    })
}),

function(n) {
    typeof exports == "object" && typeof module == "object" ? n(require("../../lib/codemirror")) : typeof define == "function" && define.amd ? define(["../../lib/codemirror"], n) : n(CodeMirror)
}(function(n) {
    "use strict";
    function u(n, t) {
        this.cm = n;
        this.options = this.buildOptions(t);
        this.widget = this.onClose = null
    }
    function f(n) {
        return typeof n == "string" ? n : n.text
    }
    function s(n, t) {
        function o(n, i) {
            var r;
            r = typeof i != "string" ? function(n) {
                return i(n, t)
            }
            : f.hasOwnProperty(i) ? f[i] : i;
            e[n] = r
        }
        var f = {
            Up: function() {
                t.moveFocus(-1)
            },
            Down: function() {
                t.moveFocus(1)
            },
            PageUp: function() {
                t.moveFocus(-t.menuSize() + 1, !0)
            },
            PageDown: function() {
                t.moveFocus(t.menuSize() - 1, !0)
            },
            Home: function() {
                t.setFocus(0)
            },
            End: function() {
                t.setFocus(t.length - 1)
            },
            Enter: t.pick,
            Tab: t.pick,
            Esc: t.close
        }, r = n.options.customKeys, e = r ? {} : f, u, i;
        if (r)
            for (i in r)
                r.hasOwnProperty(i) && o(i, r[i]);
        if (u = n.options.extraKeys,
        u)
            for (i in u)
                u.hasOwnProperty(i) && o(i, u[i]);
        return e
    }
    function e(n, t) {
        while (t && t != n) {
            if (t.nodeName.toUpperCase() === "LI" && t.parentNode == n)
                return t;
            t = t.parentNode
        }
    }
    function i(i, r) {
        var p, y, w, g, h, et, nt, ot, rt, tt, st, ut;
        this.completion = i;
        this.data = r;
        var l = this
          , c = i.cm
          , u = this.hints = document.createElement("ul");
        for (u.className = "CodeMirror-hints",
        this.selectedHint = r.selectedHint || 0,
        p = r.list,
        y = 0; y < p.length; ++y) {
            var b = u.appendChild(document.createElement("li"))
              , v = p[y]
              , it = o + (y != this.selectedHint ? "" : " " + t);
            v.className != null && (it = v.className + " " + it);
            b.className = it;
            v.render ? v.render(b, r, v) : b.appendChild(document.createTextNode(v.displayText || f(v)));
            b.hintId = y
        }
        var a = c.cursorCoords(i.options.alignWithWord ? r.from : null)
          , k = a.left
          , d = a.bottom
          , ft = !0;
        if (u.style.left = k + "px",
        u.style.top = d + "px",
        w = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth),
        g = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
        (i.options.container || document.body).appendChild(u),
        h = u.getBoundingClientRect(),
        et = h.bottom - g,
        et > 0 && (nt = h.bottom - h.top,
        ot = a.top - (a.bottom - h.top),
        ot - nt > 0 ? (u.style.top = (d = a.top - nt) + "px",
        ft = !1) : nt > g && (u.style.height = g - 5 + "px",
        u.style.top = (d = a.bottom - h.top) + "px",
        rt = c.getCursor(),
        r.from.ch != rt.ch && (a = c.cursorCoords(rt),
        u.style.left = (k = a.left) + "px",
        h = u.getBoundingClientRect()))),
        tt = h.left - w,
        tt > 0 && (h.right - h.left > w && (u.style.width = w - 5 + "px",
        tt -= h.right - h.left - w),
        u.style.left = (k = a.left - tt) + "px"),
        c.addKeyMap(this.keyMap = s(i, {
            moveFocus: function(n, t) {
                l.changeActive(l.selectedHint + n, t)
            },
            setFocus: function(n) {
                l.changeActive(n)
            },
            menuSize: function() {
                return l.screenAmount()
            },
            length: p.length,
            close: function() {
                i.close()
            },
            pick: function() {
                l.pick()
            },
            data: r
        })),
        i.options.closeOnUnfocus) {
            c.on("blur", this.onBlur = function() {
                st = setTimeout(function() {
                    i.close()
                }, 100)
            }
            );
            c.on("focus", this.onFocus = function() {
                clearTimeout(st)
            }
            )
        }
        ut = c.getScrollInfo();
        c.on("scroll", this.onScroll = function() {
            var t = c.getScrollInfo()
              , r = c.getWrapperElement().getBoundingClientRect()
              , f = d + ut.top - t.top
              , n = f - (window.pageYOffset || (document.documentElement || document.body).scrollTop);
            if (ft || (n += u.offsetHeight),
            n <= r.top || n >= r.bottom)
                return i.close();
            u.style.top = f + "px";
            u.style.left = k + ut.left - t.left + "px"
        }
        );
        n.on(u, "dblclick", function(n) {
            var t = e(u, n.target || n.srcElement);
            t && t.hintId != null && (l.changeActive(t.hintId),
            l.pick())
        });
        n.on(u, "click", function(n) {
            var t = e(u, n.target || n.srcElement);
            t && t.hintId != null && (l.changeActive(t.hintId),
            i.options.completeOnSingleClick && l.pick())
        });
        n.on(u, "mousedown", function() {
            setTimeout(function() {
                c.focus()
            }, 20)
        });
        return n.signal(r, "select", p[0], u.firstChild),
        !0
    }
    var o = "CodeMirror-hint", t = "CodeMirror-hint-active", r;
    n.showHint = function(n, t, i) {
        var r, u;
        if (!t)
            return n.showHint(i);
        if (i && i.async && (t.async = !0),
        r = {
            hint: t
        },
        i)
            for (u in i)
                r[u] = i[u];
        return n.showHint(r)
    }
    ;
    n.defineExtension("showHint", function(t) {
        if (!(this.listSelections().length > 1) && !this.somethingSelected()) {
            this.state.completionActive && this.state.completionActive.close();
            var i = this.state.completionActive = new u(this,t)
              , r = i.options.hint;
            if (r)
                if (n.signal(this, "startCompletion", this),
                r.async)
                    r(this, function(n) {
                        i.showHints(n)
                    }, i.options);
                else
                    return i.showHints(r(this, i.options))
        }
    });
    u.prototype = {
        close: function() {
            this.active() && (this.cm.state.completionActive = null,
            this.widget && this.widget.close(),
            this.onClose && this.onClose(),
            n.signal(this.cm, "endCompletion", this.cm))
        },
        active: function() {
            return this.cm.state.completionActive == this
        },
        pick: function(t, i) {
            var r = t.list[i];
            r.hint ? r.hint(this.cm, t, r) : this.cm.replaceRange(f(r), r.from || t.from, r.to || t.to, "complete");
            n.signal(t, "pick", r);
            this.close()
        },
        showHints: function(n) {
            if (!n || !n.list.length || !this.active())
                return this.close();
            this.options.completeSingle && n.list.length == 1 ? this.pick(n, 0) : this.showWidget(n)
        },
        showWidget: function(t) {
            function o() {
                f || (f = !0,
                r.close(),
                r.cm.off("cursorActivity", h),
                t && n.signal(t, "close"))
            }
            function y() {
                if (!f) {
                    n.signal(t, "update");
                    var i = r.options.hint;
                    i.async ? i(r.cm, s, r.options) : s(i(r.cm, r.options))
                }
            }
            function s(n) {
                if (t = n,
                !f) {
                    if (!t || !t.list.length)
                        return o();
                    r.widget && r.widget.close();
                    r.widget = new i(r,t)
                }
            }
            function p() {
                u && (v(u),
                u = 0)
            }
            function h() {
                p();
                var n = r.cm.getCursor()
                  , t = r.cm.getLine(n.line);
                n.line != e.line || t.length - n.ch != l - e.ch || n.ch < e.ch || r.cm.somethingSelected() || n.ch && c.test(t.charAt(n.ch - 1)) ? r.close() : (u = a(y),
                r.widget && r.widget.close())
            }
            this.widget = new i(this,t);
            n.signal(t, "shown");
            var u = 0, r = this, f, c = this.options.closeCharacters, e = this.cm.getCursor(), l = this.cm.getLine(e.line).length, a = window.requestAnimationFrame || function(n) {
                return setTimeout(n, 1e3 / 60)
            }
            , v = window.cancelAnimationFrame || clearTimeout;
            this.cm.on("cursorActivity", h);
            this.onClose = o
        },
        buildOptions: function(n) {
            var i = this.cm.options.hintOptions
              , u = {};
            for (var t in r)
                u[t] = r[t];
            if (i)
                for (t in i)
                    i[t] !== undefined && (u[t] = i[t]);
            if (n)
                for (t in n)
                    n[t] !== undefined && (u[t] = n[t]);
            return u
        }
    };
    i.prototype = {
        close: function() {
            if (this.completion.widget == this) {
                this.completion.widget = null;
                this.hints.parentNode.removeChild(this.hints);
                this.completion.cm.removeKeyMap(this.keyMap);
                var n = this.completion.cm;
                this.completion.options.closeOnUnfocus && (n.off("blur", this.onBlur),
                n.off("focus", this.onFocus));
                n.off("scroll", this.onScroll)
            }
        },
        pick: function() {
            this.completion.pick(this.data, this.selectedHint)
        },
        changeActive: function(i, r) {
            if (i >= this.data.list.length ? i = r ? this.data.list.length - 1 : 0 : i < 0 && (i = r ? 0 : this.data.list.length - 1),
            this.selectedHint != i) {
                var u = this.hints.childNodes[this.selectedHint];
                u.className = u.className.replace(" " + t, "");
                u = this.hints.childNodes[this.selectedHint = i];
                u.className += " " + t;
                u.offsetTop < this.hints.scrollTop ? this.hints.scrollTop = u.offsetTop - 3 : u.offsetTop + u.offsetHeight > this.hints.scrollTop + this.hints.clientHeight && (this.hints.scrollTop = u.offsetTop + u.offsetHeight - this.hints.clientHeight + 3);
                n.signal(this.data, "select", this.data.list[this.selectedHint], u)
            }
        },
        screenAmount: function() {
            return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1
        }
    };
    n.registerHelper("hint", "auto", function(t, i) {
        var f = t.getHelpers(t.getCursor(), "hint"), e, r, u;
        if (f.length) {
            for (r = 0; r < f.length; r++)
                if (u = f[r](t, i),
                u && u.list.length)
                    return u
        } else if (e = t.getHelper(t.getCursor(), "hintWords")) {
            if (e)
                return n.hint.fromList(t, {
                    words: e
                })
        } else if (n.hint.anyword)
            return n.hint.anyword(t, i)
    });
    n.registerHelper("hint", "fromList", function(t, i) {
        for (var o, u = t.getCursor(), r = t.getTokenAt(u), f = [], e = 0; e < i.words.length; e++)
            o = i.words[e],
            o.slice(0, r.string.length) == r.string && f.push(o);
        if (f.length)
            return {
                list: f,
                from: n.Pos(u.line, r.start),
                to: n.Pos(u.line, r.end)
            }
    });
    n.commands.autocomplete = n.showHint;
    r = {
        hint: n.hint.auto,
        completeSingle: !0,
        alignWithWord: !0,
        closeCharacters: /[\s()\[\]{};:>,]/,
        closeOnUnfocus: !0,
        completeOnSingleClick: !1,
        container: null,
        customKeys: null,
        extraKeys: null
    };
    n.defineOption("hintOptions", null)
}),

function(n) {
    typeof exports == "object" && typeof module == "object" ? n(require("../../lib/codemirror")) : typeof define == "function" && define.amd ? define(["../../lib/codemirror"], n) : n(CodeMirror)
}(function(n) {
    "use strict";
    function t(n, t) {
        for (var i = 0, r = n.length; i < r; ++i)
            t(n[i])
    }
    function f(n, t) {
        if (!Array.prototype.indexOf) {
            for (var i = n.length; i--; )
                if (n[i] === t)
                    return !0;
            return !1
        }
        return n.indexOf(t) != -1
    }
    function e(t, i, r) {
        var f = t.getCursor(), u = r(t, f), s = u, e, o;
        return /^[\w$_]*$/.test(u.string) || (u = s = {
            start: f.ch,
            end: f.ch,
            string: "",
            state: u.state,
            className: u.string == ":" ? "python-type" : null
        }),
        e || (e = []),
        e.push(s),
        o = l(u, e),
        o = o.sort(),
        {
            list: o,
            from: n.Pos(f.line, u.start),
            to: n.Pos(f.line, u.end)
        }
    }
    function o(n) {
        return e(n, r, function(n, t) {
            return n.getTokenAt(t)
        })
    }
    function l(n, i) {
        function o(n) {
            n.lastIndexOf(a, 0) != 0 || f(l, n) || l.push(n)
        }
        function v() {
            t(h, o);
            t(c, o);
            t(s, o);
            t(r, o)
        }
        var l = [], a = n.string, e, u;
        if (i) {
            for (e = i.pop(),
            e.type == "variable" ? u = e.string : e.type == "variable-3" && (u = ":" + e.string); u != null && i.length; )
                u = u[i.pop().string];
            u != null && v(u)
        }
        return l
    }
    n.registerHelper("hint", "python", o);
    var i = "and del from not while as elif global or with assert else if pass yieldbreak except import print class exec in raise continue finally is return def for lambda try"
      , s = i.split(" ")
      , r = i.toUpperCase().split(" ")
      , u = "abs divmod input open staticmethod all enumerate int ord str any eval isinstance pow sum basestring execfile issubclass print superbin file iter property tuple bool filter len range typebytearray float list raw_input unichr callable format locals reduce unicodechr frozenset long reload vars classmethod getattr map repr xrangecmp globals max reversed zip compile hasattr memoryview round __import__complex hash min set apply delattr help next setattr bufferdict hex object slice coerce dir id oct sorted intern "
      , h = u.split(" ").join("() ").split(" ")
      , c = u.toUpperCase().split(" ").join("() ").split(" ")
}),

function(n) {
    typeof exports == "object" && typeof module == "object" ? n(require("../../lib/codemirror")) : typeof define == "function" && define.amd ? define(["../../lib/codemirror"], n) : n(CodeMirror)
}(function(n) {
    "use strict";
    function t(n) {
        var t = n.getWrapperElement();
        n.state.fullScreenRestore = {
            scrollTop: window.pageYOffset,
            scrollLeft: window.pageXOffset,
            width: t.style.width,
            height: t.style.height
        };
        t.style.width = "";
        t.style.height = "auto";
        t.className += " CodeMirror-fullscreen";
        document.documentElement.style.overflow = "hidden";
        n.refresh()
    }
    function i(n) {
        var i = n.getWrapperElement(), t;
        i.className = i.className.replace(/\s*CodeMirror-fullscreen\b/, "");
        document.documentElement.style.overflow = "";
        t = n.state.fullScreenRestore;
        i.style.width = t.width;
        i.style.height = t.height;
        window.scrollTo(t.scrollLeft, t.scrollTop);
        n.refresh()
    }
    n.defineOption("fullScreen", !1, function(r, u, f) {
        (f == n.Init && (f = !1),
        !f != !u) && (u ? t(r) : i(r))
    })
})
