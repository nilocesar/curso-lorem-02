!(function (e, t) {
    "object" == typeof exports && "object" == typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? (exports["./dist"] = t()) : (e["./dist"] = t());
})(window, function () {
    return (function (e) {
        var t = {};
        function i(s) {
            if (t[s]) return t[s].exports;
            var n = (t[s] = { i: s, l: !1, exports: {} });
            return e[s].call(n.exports, n, n.exports, i), (n.l = !0), n.exports;
        }
        return (
            (i.m = e),
            (i.c = t),
            (i.d = function (e, t, s) {
                i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: s });
            }),
            (i.r = function (e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            (i.t = function (e, t) {
                if ((1 & t && (e = i(e)), 8 & t)) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                var s = Object.create(null);
                if ((i.r(s), Object.defineProperty(s, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
                    for (var n in e)
                        i.d(
                            s,
                            n,
                            function (t) {
                                return e[t];
                            }.bind(null, n)
                        );
                return s;
            }),
            (i.n = function (e) {
                var t =
                    e && e.__esModule
                        ? function () {
                              return e.default;
                          }
                        : function () {
                              return e;
                          };
                return i.d(t, "a", t), t;
            }),
            (i.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (i.p = ""),
            i((i.s = 0))
        );
    })([
        function (e, t, i) {
            "use strict";
            i.r(t);
            let s = document.body || document.getElementsByTagName("body")[0],
                n = new Map(),
                o = {
                    jsonToHtml: (e, t) => {
                        let i = document.createElement(e.type);
                        for (let s in e.attrs) 0 === s.indexOf("#") && t ? i.setAttribute(e.attrs[s], t[s.substring(1)]) : i.setAttribute(s, e.attrs[s]);
                        for (let s in e.children) {
                            let n = null;
                            (n =
                                "#text" == e.children[s].type
                                    ? 0 == e.children[s].text.indexOf("#")
                                        ? document.createTextNode(t[e.children[s].text.substring(1)])
                                        : document.createTextNode(e.children[s].text)
                                    : o.jsonToHtml(e.children[s], t)),
                                ((n && n.tagName && "undefined" !== n.tagName.toLowerCase()) || 3 == n.nodeType) && i.appendChild(n);
                        }
                        return i;
                    },
                    injectStyle: (e, t = {}) => {
                        let i = document.createElement("style");
                        return i.appendChild(document.createTextNode(e)), t.className && i.classList.add(t.className), s.appendChild(i), i;
                    },
                    getFormattedDim: (e) => {
                        if (!e) return null;
                        let t = function (e, t) {
                            return { size: e.substring(0, e.indexOf(t)), sufix: t };
                        };
                        return (e = String(e)).indexOf("%") > -1
                            ? t(e, "%")
                            : e.indexOf("px") > -1
                            ? t(e, "px")
                            : e.indexOf("em") > -1
                            ? t(e, "em")
                            : e.indexOf("rem") > -1
                            ? t(e, "rem")
                            : e.indexOf("pt") > -1
                            ? t(e, "pt")
                            : "auto" == e
                            ? t(e, "")
                            : void 0;
                    },
                    extend: (e, t) => {
                        for (let i in e) "object" == typeof e[i] ? t && t[i] && (e[i] = o.extend(e[i], t[i])) : "object" == typeof t && void 0 !== t[i] && (e[i] = t[i]);
                        return e;
                    },
                    injectIconsFont(e, t) {
                        if (e && e.length) {
                            let i = document.getElementsByTagName("head")[0],
                                s = 0,
                                n = () => {
                                    --s || t();
                                };
                            e.forEach((e) => {
                                let t = document.createElement("link");
                                (t.type = "text/css"), (t.rel = "stylesheet"), (t.href = e), (t.className = `_access-font-icon-${s++}`), (t.onload = n), o.deployedObjects.set("." + t.className, !0), i.appendChild(t);
                            });
                        }
                    },
                    isFontLoaded(e, t) {
                        try {
                            const i = () => t(document.fonts.check(`1em ${e}`));
                            document.fonts.ready.then(
                                () => {
                                    i();
                                },
                                () => {
                                    i();
                                }
                            );
                        } catch (e) {
                            return t(!0);
                        }
                    },
                    warn(e) {
                        // console.warn ? console.warn("Accessibility: " + e) : console.log("Accessibility: " + e);
                    },
                    deployedObjects: {
                        get: (e) => n.get(e),
                        contains: (e) => n.has(e),
                        set: (e, t) => {
                            n.set(e, t);
                        },
                        remove: (e) => {
                            n.delete(e);
                        },
                        getAll: () => n,
                    },
                };
            var a = o;
            var c = {
                has: (e) => window.localStorage.hasOwnProperty(e),
                set(e, t) {
                    window.localStorage.setItem(e, JSON.stringify(t));
                },
                get(e) {
                    let t = window.localStorage.getItem(e);
                    try {
                        return JSON.parse(t);
                    } catch (e) {
                        return t;
                    }
                },
                clear() {
                    window.localStorage.clear();
                },
                remove(e) {
                    window.localStorage.removeItem(e);
                },
                isSupported() {
                    try {
                        return localStorage.setItem("_test", "_test"), localStorage.removeItem("_test"), !0;
                    } catch (e) {
                        return !1;
                    }
                },
            };
            let r = {
                    icon: {
                        position: { bottom: { size: 50, units: "px" }, right: { size: 10, units: "px" }, type: "fixed" },
                        dimensions: { width: { size: 50, units: "px" }, height: { size: 50, units: "px" } },
                        zIndex: "9999",
                        backgroundColor: "transparent",
                        color: "#fff",
                        img: "accessible",
                        circular: !1,
                        circularBorder: !1,
                        fontFaceSrc: ["https://fonts.googleapis.com/icon?family=Material+Icons"],
                        fontFamily: "Material Icons",
                        fontClass: "material-icons",
                        useEmojis: !1,
                    },
                    hotkeys: {
                        enabled: !1,
                        helpTitles: !0,
                        keys: {
                            toggleMenu: ["ctrlKey", "altKey", 65],
                            invertColors: ["ctrlKey", "altKey", 73],
                            grayHues: ["ctrlKey", "altKey", 71],
                            underlineLinks: ["ctrlKey", "altKey", 85],
                            bigCursor: ["ctrlKey", "altKey", 67],
                            readingGuide: ["ctrlKey", "altKey", 82],
                            textToSpeech: ["ctrlKey", "altKey", 84],
                            speechToText: ["ctrlKey", "altKey", 83],
                        },
                    },
                    buttons: { font: { size: 18, units: "px" } },
                    guide: { cBorder: "#20ff69", cBackground: "#000000", height: "12px" },
                    menu: { dimensions: { width: { size: 25, units: "vw" }, height: { size: "auto", units: "" } }, fontFamily: "RobotoDraft, Roboto, sans-serif, Arial" },
                    labels: {
                        resetTitle: "Reset",
                        closeTitle: "Close",
                        menuTitle: "Accessibility Options",
                        increaseText: "increase text size",
                        decreaseText: "decrease text size",
                        increaseTextSpacing: "increase text spacing",
                        decreaseTextSpacing: "decrease text spacing",
                        invertColors: "invert colors",
                        grayHues: "gray hues",
                        bigCursor: "big cursor",
                        readingGuide: "reading guide",
                        underlineLinks: "underline links",
                        textToSpeech: "text to speech",
                        speechToText: "speech to text",
                    },
                    textToSpeechLang: "en-US",
                    speechToTextLang: "en-US",
                    textPixelMode: !1,
                    textEmlMode: !0,
                    animations: { buttons: !0 },
                    modules: { increaseText: !0, decreaseText: !0, increaseTextSpacing: !0, decreaseTextSpacing: !0, invertColors: !0, grayHues: !0, bigCursor: !0, readingGuide: !0, underlineLinks: !0, textToSpeech: !0, speechToText: !0 },
                    session: { persistent: !0 },
                },
                l = null;
            class u {
                constructor(e = {}) {
                    (l = this),
                        (e = this.deleteOppositesIfDefined(e)),
                        (this.options = a.extend(r, e)),
                        this.disabledUnsupportedFeatures(),
                        (this.sessionState = { textSize: 0, textSpace: 0, invertColors: !1, grayHues: !1, underlineLinks: !1, bigCursor: !1, readingGuide: !1 }),
                        this.options.icon.useEmojis
                            ? (this.fontFallback(), this.build())
                            : a.injectIconsFont(this.options.icon.fontFaceSrc, () => {
                                  this.build(),
                                      a.isFontLoaded(this.options.icon.fontFamily, (e) => {
                                          e || (a.warn(`${this.options.icon.fontFamily} font was not loaded, using emojis instead`), this.fontFallback(), this.destroy(), this.build());
                                      });
                              });
                }
                initFontSize() {
                    if (!this.htmlInitFS) {
                        let e = a.getFormattedDim(getComputedStyle(this.html).fontSize),
                            t = a.getFormattedDim(getComputedStyle(this.body).fontSize);
                        (this.html.style.fontSize = (e.size / 16) * 100 + "%"), (this.htmlOrgFontSize = this.html.style.fontSize), (this.body.style.fontSize = t.size / e.size + "em");
                    }
                }
                fontFallback() {
                    (this.options.icon.useEmojis = !0), (this.options.icon.fontFamily = null), (this.options.icon.img = ""), (this.options.icon.fontClass = "");
                }
                deleteOppositesIfDefined(e) {
                    return (
                        e.icon &&
                            e.icon.position &&
                            (e.icon.position.left && (delete r.icon.position.right, (r.icon.position.left = e.icon.position.left)), e.icon.position.top && (delete r.icon.position.bottom, (r.icon.position.top = e.icon.position.top))),
                        e
                    );
                }
                disabledUnsupportedFeatures() {
                    ("webkitSpeechRecognition" in window && "https:" == location.protocol) || (a.warn("speech to text isn't supported in this browser or in http protocol (https required)"), (this.options.modules.speechToText = !1)),
                        (window.SpeechSynthesisUtterance && window.speechSynthesis) || (a.warn("text to speech isn't supported in this browser"), (this.options.modules.textToSpeech = !1)),
                        navigator.userAgent.toLowerCase().indexOf("firefox") > -1 && (a.warn("grayHues isn't supported in firefox"), (this.options.modules.grayHues = !1));
                }
                injectCss() {
                    let e =
                        `\n        ._access-scrollbar::-webkit-scrollbar-track, .mat-autocomplete-panel::-webkit-scrollbar-track, .mat-tab-body-content::-webkit-scrollbar-track, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-track, .mat-menu-panel::-webkit-scrollbar-track {\n            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n            background-color: #F5F5F5;\n        }\n        \n        ._access-scrollbar::-webkit-scrollbar, .mat-autocomplete-panel::-webkit-scrollbar, .mat-tab-body-content::-webkit-scrollbar, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar, .mat-menu-panel::-webkit-scrollbar {\n            width: 6px;\n            background-color: #F5F5F5;\n        }\n        \n        ._access-scrollbar::-webkit-scrollbar-thumb, .mat-autocomplete-panel::-webkit-scrollbar-thumb, .mat-tab-body-content::-webkit-scrollbar-thumb, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-thumb, .mat-menu-panel::-webkit-scrollbar-thumb {\n            background-color: #999999;\n        }\n        ._access-icon {\n    visibility:hidden; \n       position: ${
                            this.options.icon.position.type
                        };\n            background-repeat: no-repeat;\n            background-size: contain;\n            cursor: pointer;\n            opacity: 0;\n            transition-duration: .5s;\n            -moz-user-select: none;\n            -webkit-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            ${
                            this.options.icon.useEmojis ? "" : "box-shadow: 1px 1px 5px rgba(0,0,0,.5);"
                        }\n     }\n        ._access-icon:hover {\n            ` +
                        (this.options.animations.buttons && !this.options.icon.useEmojis ? "\n            box-shadow: 1px 1px 10px rgba(0,0,0,.9);\n            " : "") +
                        "\n        }\n        .circular._access-icon {\n            border-radius: 50%;\n            border: .5px solid white;\n        }\n        " +
                        (this.options.animations.buttons && this.options.icon.circularBorder
                            ? "\n        .circular._access-icon:hover {\n            border: 5px solid white;\n            border-style: double;\n            font-size: 35px!important;\n            vertical-align: middle;\n            padding-top: 2px;\n            text-align: center;\n        }\n        "
                            : "") +
                        `\n        .access_read_guide_bar{\n            box-sizing: border-box;\n            background: ${
                            this.options.guide.cBackground
                        };\n            width: 100%!important;\n            min-width: 100%!important;\n            position: fixed!important;\n            height: ${this.options.guide.height} !important;\n            border: solid 3px ${
                            this.options.guide.cBorder
                        };\n            border-radius: 5px;\n            top: 15px;\n            z-index: 2147483647;\n        }\n        .access-high-contrast *{\n            background-color: #000 !important;\n            background-image: none !important;\n            border-color: #fff !important;\n            -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n            color: #fff !important;\n            text-indent: 0 !important;\n            text-shadow: none !important;\n        }\n        ._access-menu {\n            -moz-user-select: none;\n            -webkit-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            position: fixed;\n            width: ${
                            this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units
                        };\n            height: ${this.options.menu.dimensions.height.size + this.options.menu.dimensions.height.units};\n            transition-duration: .5s;\n            z-index: ${
                            this.options.icon.zIndex + 1
                        };\n            opacity: 1;\n            background-color: #fff;\n            color: #000;\n            border-radius: 3px;\n            border: solid 1px #f1f0f1;\n            font-family: ${
                            this.options.menu.fontFamily
                        };\n            min-width: 300px;\n            box-shadow: 0px 0px 1px #aaa;\n            max-height: 100vh;\n            ${
                            "rtl" == getComputedStyle(this.body).direction ? "text-indent: -5px" : ""
                        }\n        }\n        ._access-menu.close {\n            z-index: -1;\n            width: 0;\n            opacity: 0;\n            background-color: transparent;\n        }\n        ._access-menu.bottom {\n            bottom: 0;\n        }\n        ._access-menu.top {\n            top: 0;\n        }\n        ._access-menu.left {\n            left: 0;\n        }\n        ._access-menu.close.left {\n            left: -${
                            this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units
                        };\n        }\n        ._access-menu.right {\n            right: 0;\n        }\n        ._access-menu.close.right {\n            right: -${
                            this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units
                        };\n        }\n        ._access-menu ._text-center {\n            text-align: center;\n        }\n        ._access-menu h3 {\n            font-size: 24px !important;\n            margin-top: 20px;\n            margin-bottom: 20px;\n            padding: 0;\n            color: rgba(0,0,0,.87);\n            letter-spacing: initial!important;\n            word-spacing: initial!important;\n        }\n        ._access-menu ._menu-close-btn {\n            left: 5px;\n            color: #d63c3c;\n            transition: .3s ease;\n            transform: rotate(0deg);\n        }\n        ._access-menu ._menu-reset-btn:hover,._access-menu ._menu-close-btn:hover {\n            ${
                            this.options.animations.buttons ? "transform: rotate(180deg);" : ""
                        }\n        }\n        ._access-menu ._menu-reset-btn {\n            right: 5px;\n            color: transparent;\n            transition: .3s ease;\n            transform: rotate(0deg);\n        }\n        ._access-menu ._menu-btn {\n            position: absolute;\n            top: 5px;\n            cursor: pointer;\n            font-size: 24px !important;\n            font-weight: bold;\n        }\n        ._access-menu ul {\n            padding: 0;\n            position: relative;\n            font-size: 18px !important;\n            margin: 0;\n            overflow: auto;\n            max-height: calc(100vh - 77px);\n        }\n        html._access_cursor * {\n            cursor: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyOS4xODhweCIgaGVpZ2h0PSI0My42MjVweCIgdmlld0JveD0iMCAwIDI5LjE4OCA0My42MjUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI5LjE4OCA0My42MjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0Q5REFEOSIgc3Ryb2tlLXdpZHRoPSIxLjE0MDYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyLjgsNC41NDkgMjYuODQ3LDE5LjkwMiAxNi45NjQsMjIuNzAxIDI0LjIzOSwzNy43NDkgMTguMjc4LDQyLjAxNyA5Ljc0MSwzMC43MjQgMS4xMzgsMzUuODA5ICIvPjxnPjxnPjxnPjxwYXRoIGZpbGw9IiMyMTI2MjciIGQ9Ik0yOS4xNzUsMjEuMTU1YzAuMDcxLTAuNjEzLTAuMTY1LTEuMjUzLTAuNjM1LTEuNTczTDIuMTY1LDAuMjU4Yy0wLjQyNC0wLjMyLTAuOTg4LTAuMzQ2LTEuNDM1LTAuMDUzQzAuMjgyLDAuNDk3LDAsMS4wMywwLDEuNjE3djM0LjE3MWMwLDAuNjEzLDAuMzA2LDEuMTQ2LDAuNzc2LDEuNDM5YzAuNDcxLDAuMjY3LDEuMDU5LDAuMjEzLDEuNDgyLTAuMTZsNy40ODItNi4zNDRsNi44NDcsMTIuMTU1YzAuMjU5LDAuNDgsMC43MjksMC43NDYsMS4yLDAuNzQ2YzAuMjM1LDAsMC40OTQtMC4wOCwwLjcwNi0wLjIxM2w2Ljk4OC00LjU4NWMwLjMyOS0wLjIxMywwLjU2NS0wLjU4NiwwLjY1OS0xLjAxM2MwLjA5NC0wLjQyNiwwLjAyNC0wLjg4LTAuMTg4LTEuMjI2bC02LjM3Ni0xMS4zODJsOC42MTEtMi43NDVDMjguNzA1LDIyLjI3NCwyOS4xMDUsMjEuNzY4LDI5LjE3NSwyMS4xNTV6IE0xNi45NjQsMjIuNzAxYy0wLjQyNCwwLjEzMy0wLjc3NiwwLjUwNi0wLjk0MSwwLjk2Yy0wLjE2NSwwLjQ4LTAuMTE4LDEuMDEzLDAuMTE4LDEuNDM5bDYuNTg4LDExLjc4MWwtNC41NDEsMi45ODVsLTYuODk0LTEyLjMxNWMtMC4yMTItMC4zNzMtMC41NDEtMC42NC0wLjk0MS0wLjcyYy0wLjA5NC0wLjAyNy0wLjE2NS0wLjAyNy0wLjI1OS0wLjAyN2MtMC4zMDYsMC0wLjU4OCwwLjEwNy0wLjg0NywwLjMyTDIuOCwzMi41OVY0LjU0OWwyMS41OTksMTUuODA2TDE2Ljk2NCwyMi43MDF6Ii8+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg==),auto!important;\n        }\n        ._access-menu ul li {\n            list-style-type: none;\n            cursor: pointer;\n            -ms-user-select: none;\n            -moz-user-select: none;\n            -webkit-user-select: none;\n            user-select: none;\n            border: solid 1px #f1f0f1;\n            padding: 10px 0 10px 30px;\n            margin: 5px;\n            border-radius: 4px;\n            transition-duration: .5s;\n            transition-timing-function: ease-in-out;\n            font-size: ${
                            this.options.buttons.font.size + this.options.buttons.font.units
                        } !important;\n            line-height: ${
                            this.options.buttons.font.size + this.options.buttons.font.units
                        } !important;\n            text-indent: 5px;\n            background: #f9f9f9;\n            color: rgba(0,0,0,.6);\n            letter-spacing: initial!important;\n            word-spacing: initial!important;\n        }\n        ._access-menu ul.before-collapse li {\n            opacity: 0.05;\n        }\n        ._access-menu ul li.active, ._access-menu ul li.active:hover {\n            color: #fff;\n            background-color: #000;\n        }\n        ._access-menu ul li:hover {\n            color: rgba(0,0,0,.8);\n            background-color: #eaeaea;\n        }\n        ._access-menu ul li.not-supported {\n            display: none;\n        }\n        ._access-menu ul li:before {\n            content: ' ';\n            ${
                            this.options.icon.useEmojis ? "" : "font-family: " + this.options.icon.fontFamily + ";"
                        }\n            text-rendering: optimizeLegibility;\n            font-feature-settings: "liga" 1;\n            font-style: normal;\n            text-transform: none;\n            line-height: ${
                            this.options.icon.useEmojis ? "1.1" : "1"
                        };\n            font-size: ${
                            this.options.icon.useEmojis ? "20px" : "24px"
                        } !important;\n            width: 30px;\n            height: 30px;\n            display: inline-block;\n            overflow: hidden;\n            -webkit-font-smoothing: antialiased;\n            left: 8px;\n            position: absolute;\n            color: rgba(0,0,0,.6);\n            direction: ltr;\n        }\n        ._access-menu ul li svg path {\n            fill: rgba(0,0,0,.6);\n        }\n        ._access-menu ul li:hover svg path {\n            fill: rgba(0,0,0,.8);\n        }\n        ._access-menu ul li.active svg path {\n            fill: #fff;\n        }\n        ._access-menu ul li:hover:before {\n            color: rgba(0,0,0,.8);\n        }\n        ._access-menu ul li.active:before {\n            color: #fff;\n        }\n        ._access-menu ul li[data-access-action="increaseText"]:before {\n            content: ${
                            this.options.icon.useEmojis ? '"🔼"' : '"zoom_in"'
                        };\n        }\n        ._access-menu ul li[data-access-action="decreaseText"]:before {\n            content: ${
                            this.options.icon.useEmojis ? '"🔽"' : '"zoom_out"'
                        };\n        }\n        ._access-menu ul li[data-access-action="increaseTextSpacing"]:before {\n            content: ${
                            this.options.icon.useEmojis ? '"🔼"' : '"unfold_more"'
                        };\n            transform: rotate(90deg) translate(-7px, 2px);\n        }\n        ._access-menu ul li[data-access-action="decreaseTextSpacing"]:before {\n            content: ${
                            this.options.icon.useEmojis ? '"🔽"' : '"unfold_less"'
                        };\n            transform: rotate(90deg) translate(-7px, 2px);\n        }\n        ._access-menu ul li[data-access-action="invertColors"]:before {\n            content: ${
                            this.options.icon.useEmojis ? '"🎆"' : '"invert_colors"'
                        };\n        }\n        ._access-menu ul li[data-access-action="grayHues"]:before {\n            content: ${
                            this.options.icon.useEmojis ? '"🌫️"' : '"format_color_reset"'
                        };\n        }\n        ._access-menu ul li[data-access-action="underlineLinks"]:before {\n            content: ${
                            this.options.icon.useEmojis ? '"💯"' : '"format_underlined"'
                        };\n        }\n        ._access-menu ul li[data-access-action="bigCursor"]:before {\n            /*content: 'touch_app';*/\n        }\n        ._access-menu ul li[data-access-action="readingGuide"]:before {\n            content: ${
                            this.options.icon.useEmojis ? '"↔️"' : '"border_horizontal"'
                        };\n        }\n        ._access-menu ul li[data-access-action="textToSpeech"]:before {\n            content: ${
                            this.options.icon.useEmojis ? '"⏺️"' : '"record_voice_over"'
                        };\n        }\n        ._access-menu ul li[data-access-action="speechToText"]:before {\n            content: ${this.options.icon.useEmojis ? '"🎤"' : '"mic"'};\n        }`;
                    a.injectStyle(e, { className: "_access-main-css" }), a.deployedObjects.set("._access-main-css", !1);
                }
                injectIcon() {
                    let e = 0.8 * this.options.icon.dimensions.width.size,
                        t = 0.9 * this.options.icon.dimensions.width.size,
                        i = 0.1 * this.options.icon.dimensions.width.size,
                        s = `width: ${this.options.icon.dimensions.width.size + this.options.icon.dimensions.width.units}\n            ;height: ${
                            this.options.icon.dimensions.height.size + this.options.icon.dimensions.height.units
                        }\n            ;font-size: ${e + this.options.icon.dimensions.width.units}\n            ;line-height: ${t + this.options.icon.dimensions.width.units}\n            ;text-indent: ${
                            i + this.options.icon.dimensions.width.units
                        }\n            ;background-color: ${this.options.icon.useEmojis ? "transparent" : this.options.icon.backgroundColor};color: ${this.options.icon.color}`;
                    for (let e in this.options.icon.position) s += ";" + e + ":" + this.options.icon.position[e].size + this.options.icon.position[e].units;
                    s += `;z-index: ${this.options.icon.zIndex}`;
                    let n = `_access-icon ${this.options.icon.fontClass} _access` + (this.options.icon.circular ? " circular" : ""),
                        o = a.jsonToHtml({ type: "i", attrs: { class: n, style: s, title: this.options.labels.menuTitle }, children: [{ type: "#text", text: this.options.icon.img }] });
                    return this.body.appendChild(o), a.deployedObjects.set("._access-icon", !1), o;
                }
                parseKeys(e) {
                    return this.options.hotkeys.enabled && this.options.hotkeys.helpTitles
                        ? "Hotkey: " +
                              e
                                  .map(function (e) {
                                      return Number.isInteger(e) ? String.fromCharCode(e).toLowerCase() : e.replace("Key", "");
                                  })
                                  .join("+")
                        : "";
                }
                injectMenu() {
                    let e = a.jsonToHtml({
                        type: "div",
                        attrs: { class: "_access-menu close _access" },
                        children: [
                            {
                                type: "h3",
                                attrs: { class: "_text-center" },
                                children: [
                                    {
                                        type: "i",
                                        attrs: { class: `_menu-close-btn _menu-btn ${this.options.icon.fontClass}`, title: this.options.labels.closeTitle },
                                        children: [{ type: "#text", text: `${this.options.icon.useEmojis ? "X" : "close"}` }],
                                    },
                                    { type: "#text", text: this.options.labels.menuTitle },
                                    {
                                        type: "i",
                                        attrs: { class: `_menu-reset-btn _menu-btn ${this.options.icon.fontClass}`, title: this.options.labels.resetTitle },
                                        children: [{ type: "#text", text: `${this.options.icon.useEmojis ? "♲" : "refresh"}` }],
                                    },
                                ],
                            },
                            {
                                type: "ul",
                                attrs: { class: this.options.animations.buttons ? "before-collapse _access-scrollbar" : "_access-scrollbar" },
                                children: [
                                    { type: "li", attrs: { "data-access-action": "increaseText" }, children: [{ type: "#text", text: this.options.labels.increaseText }] },
                                    { type: "li", attrs: { "data-access-action": "decreaseText" }, children: [{ type: "#text", text: this.options.labels.decreaseText }] },
                                    { type: "li", attrs: { "data-access-action": "increaseTextSpacing" }, children: [{ type: "#text", text: this.options.labels.increaseTextSpacing }] },
                                    { type: "li", attrs: { "data-access-action": "decreaseTextSpacing" }, children: [{ type: "#text", text: this.options.labels.decreaseTextSpacing }] },
                                    { type: "li", attrs: { "data-access-action": "invertColors", title: this.parseKeys(this.options.hotkeys.keys.invertColors) }, children: [{ type: "#text", text: this.options.labels.invertColors }] },
                                    { type: "li", attrs: { "data-access-action": "grayHues", title: this.parseKeys(this.options.hotkeys.keys.grayHues) }, children: [{ type: "#text", text: this.options.labels.grayHues }] },
                                    { type: "li", attrs: { "data-access-action": "underlineLinks", title: this.parseKeys(this.options.hotkeys.keys.underlineLinks) }, children: [{ type: "#text", text: this.options.labels.underlineLinks }] },
                                    {
                                        type: "li",
                                        attrs: { "data-access-action": "bigCursor", title: this.parseKeys(this.options.hotkeys.keys.bigCursor) },
                                        children: [
                                            { type: "div", attrs: { id: "iconBigCursor" } },
                                            { type: "#text", text: this.options.labels.bigCursor },
                                        ],
                                    },
                                    { type: "li", attrs: { "data-access-action": "readingGuide", title: this.parseKeys(this.options.hotkeys.keys.readingGuide) }, children: [{ type: "#text", text: this.options.labels.readingGuide }] },
                                    { type: "li", attrs: { "data-access-action": "textToSpeech" }, children: [{ type: "#text", text: this.options.labels.textToSpeech }] },
                                    { type: "li", attrs: { "data-access-action": "speechToText" }, children: [{ type: "#text", text: this.options.labels.speechToText }] },
                                ],
                            },
                        ],
                    });
                    for (let t in this.options.icon.position) e.classList.add(t);
                    return (
                        this.body.appendChild(e),
                        setTimeout(function () {
                            let e = document.getElementById("iconBigCursor");
                            e &&
                                ((e.outerHTML =
                                    e.outerHTML +
                                    '<svg version="1.1" id="iconBigCursorSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="position: absolute;width: 19px;height: 19px;left: 17px;enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M 423.547 323.115 l -320 -320 c -3.051 -3.051 -7.637 -3.947 -11.627 -2.304 s -6.592 5.547 -6.592 9.856 V 480 c 0 4.501 2.837 8.533 7.083 10.048 c 4.224 1.536 8.981 0.192 11.84 -3.285 l 85.205 -104.128 l 56.853 123.179 c 1.792 3.883 5.653 6.187 9.685 6.187 c 1.408 0 2.837 -0.277 4.203 -0.875 l 74.667 -32 c 2.645 -1.131 4.736 -3.285 5.76 -5.973 c 1.024 -2.688 0.939 -5.675 -0.277 -8.299 l -57.024 -123.52 h 132.672 c 4.309 0 8.213 -2.603 9.856 -6.592 C 427.515 330.752 426.598 326.187 423.547 323.115 Z"/></svg>'),
                                document.getElementById("iconBigCursor").remove());
                        }, 1),
                        a.deployedObjects.set("._access-menu", !1),
                        document.querySelector("._access-menu ._menu-close-btn").addEventListener(
                            "click",
                            () => {
                                this.toggleMenu();
                            },
                            !1
                        ),
                        document.querySelector("._access-menu ._menu-reset-btn").addEventListener(
                            "click",
                            () => {
                                this.resetAll();
                            },
                            !1
                        ),
                        e
                    );
                }
                addListeners() {
                    let e = document.querySelectorAll("._access-menu ul li");
                    for (let t = 0; t < e.length; t++)
                        e[t].addEventListener(
                            "click",
                            (e) => {
                                let t = e || window.event;
                                this.invoke(t.target.getAttribute("data-access-action"));
                            },
                            !1
                        );
                }
                disableUnsupportedModules() {
                    for (let e in this.options.modules)
                        if (!this.options.modules[e]) {
                            let t = document.querySelector('li[data-access-action="' + e + '"]');
                            t && t.classList.add("not-supported");
                        }
                }
                resetAll() {
                    this.menuInterface.textToSpeech(!0),
                        this.menuInterface.speechToText(!0),
                        this.menuInterface.underlineLinks(!0),
                        this.menuInterface.grayHues(!0),
                        this.menuInterface.invertColors(!0),
                        this.menuInterface.bigCursor(!0),
                        this.menuInterface.readingGuide(!0),
                        this.resetTextSize(),
                        this.resetTextSpace();
                }
                resetTextSize() {
                    this.resetIfDefined(this.initialValues.body.fontSize, this.body.style, "fontSize"), void 0 !== this.htmlOrgFontSize && (this.html.style.fontSize = this.htmlOrgFontSize);
                    let e = document.querySelectorAll("[data-init-font-size]");
                    for (let t = 0; t < e.length; t++) (e[t].style.fontSize = e[t].getAttribute("data-init-font-size")), e[t].removeAttribute("data-init-font-size");
                    (this.sessionState.textSize = 0), this.onChange(!0);
                }
                resetTextSpace() {
                    this.resetIfDefined(this.initialValues.body.wordSpacing, this.body.style, "wordSpacing"), this.resetIfDefined(this.initialValues.body.letterSpacing, this.body.style, "letterSpacing");
                    let e = document.querySelectorAll("[data-init-word-spacing]"),
                        t = document.querySelectorAll("[data-init-letter-spacing]");
                    for (let t = 0; t < e.length; t++) (e[t].style.wordSpacing = e[t].getAttribute("data-init-word-spacing")), e[t].removeAttribute("data-init-word-spacing");
                    for (let i = 0; i < t.length; i++) (e[i].style.letterSpacing = e[i].getAttribute("data-init-letter-spacing")), e[i].removeAttribute("data-init-letter-spacing");
                    (this.sessionState.textSpace = 0), this.onChange(!0);
                }
                alterTextSize(e) {
                    (this.sessionState.textSize += e ? 1 : -1), this.onChange(!0);
                    let t = 2;
                    if ((e || (t *= -1), this.options.textPixelMode)) {
                        let e = document.querySelectorAll("*:not(._access)");
                        for (let i = 0; i < e.length; i++) {
                            let s = getComputedStyle(e[i]).fontSize;
                            s && s.indexOf("px") > -1 && (e[i].getAttribute("data-init-font-size") || e[i].setAttribute("data-init-font-size", s), (s = 1 * s.replace("px", "") + t), (e[i].style.fontSize = s + "px"));
                        }
                    } else if (this.options.textEmlMode) {
                        let e = this.html.style.fontSize;
                        e.indexOf("%") ? ((e = 1 * e.replace("%", "")), (this.html.style.fontSize = e + t + "%")) : a.warn("Accessibility.textEmlMode, html element is not set in %.");
                    } else {
                        let e = a.getFormattedDim(getComputedStyle(this.body).fontSize);
                        void 0 === this.initialValues.body.fontSize && (this.initialValues.body.fontSize = e.size + e.sufix), e && e.sufix && !isNaN(1 * e.size) && (this.body.style.fontSize = 1 * e.size + t + e.sufix);
                    }
                }
                alterTextSpace(e) {
                    (this.sessionState.textSpace += e ? 1 : -1), this.onChange(!0);
                    let t = 1;
                    if ((e || (t *= -1), this.options.textPixelMode)) {
                        let e = document.querySelectorAll("*:not(._access)"),
                            i = Array.prototype.slice.call(document.querySelectorAll("._access-menu *"));
                        for (let s = 0; s < e.length; s++) {
                            if (i.includes(e[s])) continue;
                            let n = e[s].style.wordSpacing;
                            n && n.indexOf("px") > -1
                                ? (e[s].getAttribute("data-init-word-spacing") || e[s].setAttribute("data-init-word-spacing", n), (n = 1 * n.replace("px", "") + t), (e[s].style.wordSpacing = n + "px"))
                                : (e[s].setAttribute("data-init-word-spacing", n), (e[s].style.wordSpacing = t + "px"));
                            let o = e[s].style.letterSpacing;
                            o && o.indexOf("px") > -1
                                ? (e[s].getAttribute("data-init-letter-spacing") || e[s].setAttribute("data-init-letter-spacing", o), (o = 1 * o.replace("px", "") + t), (e[s].style.letterSpacing = o + "px"))
                                : (e[s].setAttribute("data-init-letter-spacing", o), (e[s].style.letterSpacing = t + "px"));
                        }
                    } else {
                        let e = a.getFormattedDim(getComputedStyle(this.body).wordSpacing);
                        void 0 === this.initialValues.body.wordSpacing && (this.initialValues.body.wordSpacing = ""), e && e.sufix && !isNaN(1 * e.size) && (this.body.style.wordSpacing = 1 * e.size + t + e.sufix);
                        let i = a.getFormattedDim(getComputedStyle(this.body).letterSpacing);
                        void 0 === this.initialValues.body.letterSpacing && (this.initialValues.body.letterSpacing = ""), i && i.sufix && !isNaN(1 * i.size) && (this.body.style.letterSpacing = 1 * i.size + t + i.sufix);
                    }
                }
                speechToText() {
                    "webkitSpeechRecognition" in window &&
                        ((this.recognition = new webkitSpeechRecognition()),
                        (this.recognition.continuous = !0),
                        (this.recognition.interimResults = !0),
                        (this.recognition.onstart = () => {
                            this.body.classList.add("_access-listening");
                        }),
                        (this.recognition.onend = () => {
                            this.body.classList.remove("_access-listening");
                        }),
                        (this.recognition.onresult = (e) => {
                            let t = "";
                            if (void 0 !== e.results) {
                                for (let i = e.resultIndex; i < e.results.length; ++i) e.results[i].isFinal && (t += e.results[i][0].transcript);
                                t &&
                                    this.speechToTextTarget &&
                                    (this.speechToTextTarget.parentElement.classList.remove("_access-listening"),
                                    "input" == this.speechToTextTarget.tagName.toLowerCase() || "textarea" == this.speechToTextTarget.tagName.toLowerCase()
                                        ? (this.speechToTextTarget.value = t)
                                        : null != this.speechToTextTarget.getAttribute("contenteditable") && (this.speechToTextTarget.innerText = t));
                            }
                        }),
                        (this.recognition.lang = this.options.speechToTextLang),
                        this.recognition.start());
                }
                textToSpeech(e) {
                    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) return;
                    let t = new window.SpeechSynthesisUtterance(e);
                    t.lang = this.options.textToSpeechLang;
                    let i = window.speechSynthesis.getVoices(),
                        s = !1;
                    for (let e = 0; e < i.length; e++)
                        if (i[e].lang === t.lang) {
                            (t.voice = i[e]), (s = !0);
                            break;
                        }
                    s || a.warn("text to speech language not supported!"), window.speechSynthesis.speak(t);
                }
                listen() {
                    "object" == typeof l.recognition && "function" == typeof l.recognition.stop && l.recognition.stop(), (l.speechToTextTarget = window.event.target), l.speechToText(window.event.target.innerText);
                }
                read() {
                    window.event.preventDefault(), window.event.stopPropagation(), l.textToSpeech(window.event.target.innerText);
                }
                runHotkey(e) {
                    switch (e) {
                        case "toggleMenu":
                            this.toggleMenu();
                            break;
                        default:
                            this.menuInterface.hasOwnProperty(e) && this.options.modules[e] && this.menuInterface[e](!1);
                    }
                }
                toggleMenu() {
                    this.menu.classList.contains("close")
                        ? (this.options.animations &&
                              this.options.animations.buttons &&
                              setTimeout(() => {
                                  this.menu.querySelector("ul").classList.toggle("before-collapse");
                              }, 500),
                          setTimeout(() => {
                              this.menu.classList.toggle("close");
                          }, 10))
                        : this.options.animations && this.options.animations.buttons
                        ? (setTimeout(() => {
                              this.menu.classList.toggle("close");
                          }, 500),
                          setTimeout(() => {
                              this.menu.querySelector("ul").classList.toggle("before-collapse");
                          }, 10))
                        : this.menu.classList.toggle("close");
                }
                invoke(e) {
                    "function" == typeof this.menuInterface[e] && this.menuInterface[e]();
                }
                build() {
                    (this.initialValues = { underlineLinks: !1, textToSpeech: !1, bigCursor: !1, readingGuide: !1, body: {}, html: {} }),
                        (this.body = document.body || document.getElementsByTagName("body")[0]),
                        (this.html = document.documentElement || document.getElementsByTagName("html")[0]),
                        this.options.textEmlMode && this.initFontSize(),
                        this.injectCss(),
                        (this.icon = this.injectIcon()),
                        (this.menu = this.injectMenu()),
                        this.addListeners(),
                        this.disableUnsupportedModules(),
                        this.options.hotkeys.enabled &&
                            (document.onkeydown = function (e) {
                                let t = Object.entries(l.options.hotkeys.keys).find(function (t) {
                                    let i = !0;
                                    for (var s = 0; s < t[1].length; s++) Number.isInteger(t[1][s]) ? e.keyCode != t[1][s] && (i = !1) : (null != e[t[1][s]] && 0 != e[t[1][s]]) || (i = !1);
                                    return i;
                                });
                                null != t && l.runHotkey(t[0]);
                            }),
                        this.icon.addEventListener(
                            "click",
                            () => {
                                this.toggleMenu();
                            },
                            !1
                        ),
                        setTimeout(() => {
                            this.icon.style.opacity = "1";
                        }, 10),
                        (this.updateReadGuide = function (e) {
                            let t = 0;
                            (t = "touchmove" == e.type ? e.changedTouches[0].clientY : e.y), (document.getElementById("access_read_guide_bar").style.top = t - (parseInt(l.options.guide.height.replace("px")) + 5) + "px");
                        }),
                        (this.menuInterface = {
                            increaseText: () => {
                                this.alterTextSize(!0);
                            },
                            decreaseText: () => {
                                this.alterTextSize(!1);
                            },
                            increaseTextSpacing: () => {
                                this.alterTextSpace(!0);
                            },
                            decreaseTextSpacing: () => {
                                this.alterTextSpace(!1);
                            },
                            invertColors: (e) => {
                                if (
                                    (void 0 === this.initialValues.html.backgroundColor && (this.initialValues.html.backgroundColor = getComputedStyle(this.html).backgroundColor),
                                    void 0 === this.initialValues.html.color && (this.initialValues.html.color = getComputedStyle(this.html).color),
                                    e)
                                )
                                    return (
                                        this.resetIfDefined(this.initialValues.html.backgroundColor, this.html.style, "backgroundColor"),
                                        this.resetIfDefined(this.initialValues.html.color, this.html.style, "color"),
                                        document.querySelector('._access-menu [data-access-action="invertColors"]').classList.remove("active"),
                                        (this.initialValues.invertColors = !1),
                                        (this.sessionState.invertColors = this.initialValues.invertColors),
                                        this.onChange(!0),
                                        void (this.html.style.filter = "")
                                    );
                                document.querySelector('._access-menu [data-access-action="invertColors"]').classList.toggle("active"),
                                    (this.initialValues.invertColors = !this.initialValues.invertColors),
                                    (this.sessionState.invertColors = this.initialValues.invertColors),
                                    this.onChange(!0),
                                    this.initialValues.invertColors ? (this.initialValues.grayHues && this.menuInterface.grayHues(!0), (this.html.style.filter = "invert(1)")) : (this.html.style.filter = "");
                            },
                            grayHues: (e) => {
                                if (
                                    (void 0 === this.initialValues.html.filter && (this.initialValues.html.filter = getComputedStyle(this.html).filter),
                                    void 0 === this.initialValues.html.webkitFilter && (this.initialValues.html.webkitFilter = getComputedStyle(this.html).webkitFilter),
                                    void 0 === this.initialValues.html.mozFilter && (this.initialValues.html.mozFilter = getComputedStyle(this.html).mozFilter),
                                    void 0 === this.initialValues.html.msFilter && (this.initialValues.html.msFilter = getComputedStyle(this.html).msFilter),
                                    e)
                                )
                                    return (
                                        document.querySelector('._access-menu [data-access-action="grayHues"]').classList.remove("active"),
                                        (this.initialValues.grayHues = !1),
                                        (this.sessionState.grayHues = this.initialValues.grayHues),
                                        this.onChange(!0),
                                        this.resetIfDefined(this.initialValues.html.filter, this.html.style, "filter"),
                                        this.resetIfDefined(this.initialValues.html.webkitFilter, this.html.style, "webkitFilter"),
                                        this.resetIfDefined(this.initialValues.html.mozFilter, this.html.style, "mozFilter"),
                                        void this.resetIfDefined(this.initialValues.html.msFilter, this.html.style, "msFilter")
                                    );
                                let t;
                                document.querySelector('._access-menu [data-access-action="grayHues"]').classList.toggle("active"),
                                    (this.initialValues.grayHues = !this.initialValues.grayHues),
                                    (this.sessionState.grayHues = this.initialValues.grayHues),
                                    this.onChange(!0),
                                    this.initialValues.grayHues ? ((t = "grayscale(1)"), this.initialValues.invertColors && this.menuInterface.invertColors(!0)) : (t = ""),
                                    (this.html.style.webkitFilter = t),
                                    (this.html.style.mozFilter = t),
                                    (this.html.style.msFilter = t),
                                    (this.html.style.filter = t);
                            },
                            underlineLinks: (e) => {
                                let t = "_access-underline",
                                    i = () => {
                                        let e = document.querySelector("." + t);
                                        e && (e.parentElement.removeChild(e), a.deployedObjects.remove("." + t));
                                    };
                                if (e)
                                    return (
                                        (this.initialValues.underlineLinks = !1),
                                        (this.sessionState.underlineLinks = this.initialValues.underlineLinks),
                                        this.onChange(!0),
                                        document.querySelector('._access-menu [data-access-action="underlineLinks"]').classList.remove("active"),
                                        i()
                                    );
                                if (
                                    (document.querySelector('._access-menu [data-access-action="underlineLinks"]').classList.toggle("active"),
                                    (this.initialValues.underlineLinks = !this.initialValues.underlineLinks),
                                    (this.sessionState.underlineLinks = this.initialValues.underlineLinks),
                                    this.onChange(!0),
                                    this.initialValues.underlineLinks)
                                ) {
                                    let e = "\n                    body a {\n                        text-decoration: underline !important;\n                    }\n                ";
                                    a.injectStyle(e, { className: t }), a.deployedObjects.set("." + t, !0);
                                } else i();
                            },
                            bigCursor: (e) => {
                                if (e)
                                    return (
                                        this.html.classList.remove("_access_cursor"),
                                        document.querySelector('._access-menu [data-access-action="bigCursor"]').classList.remove("active"),
                                        (this.initialValues.bigCursor = !1),
                                        (this.sessionState.bigCursor = !1),
                                        void this.onChange(!0)
                                    );
                                document.querySelector('._access-menu [data-access-action="bigCursor"]').classList.toggle("active"),
                                    (this.initialValues.bigCursor = !this.initialValues.bigCursor),
                                    (this.sessionState.bigCursor = this.initialValues.bigCursor),
                                    this.onChange(!0),
                                    this.html.classList.toggle("_access_cursor");
                            },
                            readingGuide: (e) => {
                                if (e)
                                    return (
                                        null != document.getElementById("access_read_guide_bar") && document.getElementById("access_read_guide_bar").remove(),
                                        document.querySelector('._access-menu [data-access-action="readingGuide"]').classList.remove("active"),
                                        (this.initialValues.readingGuide = !1),
                                        (this.sessionState.readingGuide = this.initialValues.readingGuide),
                                        this.onChange(!0),
                                        document.body.removeEventListener("touchmove", this.updateReadGuide, !1),
                                        void document.body.removeEventListener("mousemove", this.updateReadGuide, !1)
                                    );
                                if (
                                    (document.querySelector('._access-menu [data-access-action="readingGuide"]').classList.toggle("active"),
                                    (this.initialValues.readingGuide = !this.initialValues.readingGuide),
                                    (this.sessionState.readingGuide = this.initialValues.readingGuide),
                                    this.onChange(!0),
                                    this.initialValues.readingGuide)
                                ) {
                                    let e = document.createElement("div");
                                    (e.id = "access_read_guide_bar"),
                                        e.classList.add("access_read_guide_bar"),
                                        document.body.append(e),
                                        document.body.addEventListener("touchmove", this.updateReadGuide, !1),
                                        document.body.addEventListener("mousemove", this.updateReadGuide, !1);
                                } else
                                    null != document.getElementById("access_read_guide_bar") && document.getElementById("access_read_guide_bar").remove(),
                                        document.body.removeEventListener("touchmove", this.updateReadGuide, !1),
                                        document.body.removeEventListener("mousemove", this.updateReadGuide, !1);
                            },
                            textToSpeech: (e) => {
                                this.onChange(!1);
                                let t = "_access-text-to-speech",
                                    i = () => {
                                        let e = document.querySelector("." + t);
                                        e && (e.parentElement.removeChild(e), document.removeEventListener("click", this.read, !1), a.deployedObjects.remove("." + t));
                                    };
                                if (e) return document.querySelector('._access-menu [data-access-action="textToSpeech"]').classList.remove("active"), (this.initialValues.textToSpeech = !1), i();
                                if (
                                    (document.querySelector('._access-menu [data-access-action="textToSpeech"]').classList.toggle("active"),
                                    (this.initialValues.textToSpeech = !this.initialValues.textToSpeech),
                                    this.initialValues.textToSpeech)
                                ) {
                                    let e = "\n                        *:hover {\n                            box-shadow: 2px 2px 2px rgba(180,180,180,0.7);\n                        }\n                    ";
                                    a.injectStyle(e, { className: t }), a.deployedObjects.set("." + t, !0), document.addEventListener("click", this.read, !1);
                                } else i();
                            },
                            speechToText: (e) => {
                                this.onChange(!1);
                                let t = "_access-speech-to-text",
                                    i = () => {
                                        this.recognition && (this.recognition.stop(), this.body.classList.remove("_access-listening"));
                                        let e = document.querySelector("." + t);
                                        e && (e.parentElement.removeChild(e), a.deployedObjects.remove("." + t));
                                        let i = document.querySelectorAll("._access-mic");
                                        for (let e = 0; e < i.length; e++) i[e].removeEventListener("focus", this.listen, !1), i[e].classList.remove("_access-mic");
                                    };
                                if (e) return document.querySelector('._access-menu [data-access-action="speechToText"]').classList.remove("active"), (this.initialValues.speechToText = !1), i();
                                if (
                                    (document.querySelector('._access-menu [data-access-action="speechToText"]').classList.toggle("active"),
                                    (this.initialValues.speechToText = !this.initialValues.speechToText),
                                    this.initialValues.speechToText)
                                ) {
                                    let e = `\n                        body:after {\n                            content: ${this.options.icon.useEmojis ? '"🎤"' : '"mic"'};\n                            ${
                                        this.options.icon.useEmojis ? "" : "font-family: '" + this.options.icon.fontFamily + "';"
                                    }\n                            position: fixed;\n                            z-index: 1100;\n                            top: 1vw;\n                            right: 1vw;\n                            width: 36px;\n                            height: 36px;\n                            font-size: 30px;\n                            line-height: 36px;\n                            border-radius: 50%;\n                            background: rgba(255,255,255,0.7);\n                            display: flex;\n                            justify-content: center;\n                            aling-items: center;\n                        }\n\n                        body._access-listening:after {\n                            animation: _access-listening-animation 2s infinite ease;\n                        }\n\n                        @keyframes _access-listening-animation {\n                            0%  {background-color: transparent;}\n                            50%  {background-color: #EF9A9A;}\n                        }\n                    `;
                                    a.injectStyle(e, { className: t }), a.deployedObjects.set("." + t, !0);
                                    let i = document.querySelectorAll('input[type="text"], input[type="search"], textarea, [contenteditable]');
                                    for (let e = 0; e < i.length; e++)
                                        i[e].addEventListener(
                                            "blur",
                                            () => {
                                                "object" == typeof this.recognition && "function" == typeof this.recognition.stop && this.recognition.stop();
                                            },
                                            !1
                                        ),
                                            i[e].addEventListener("focus", this.listen, !1),
                                            i[e].parentElement.classList.add("_access-mic");
                                } else i();
                            },
                        }),
                        this.options.session.persistent && this.setSessionFromCache();
                }
                resetIfDefined(e, t, i) {
                    void 0 !== e && (t[i] = e);
                }
                onChange(e) {
                    e && this.options.session.persistent && this.saveSession();
                }
                saveSession() {
                    c.set("_accessState", this.sessionState);
                }
                setSessionFromCache() {
                    let e = c.get("_accessState");
                    if (e) {
                        if (e.textSize) {
                            let t = e.textSize;
                            if (t > 0) for (; t--; ) this.alterTextSize(!0);
                            else for (; t++; ) this.alterTextSize(!1);
                        }
                        if (e.textSpace) {
                            let t = e.textSpace;
                            if (t > 0) for (; t--; ) this.alterTextSpace(!0);
                            else for (; t++; ) this.alterTextSpace(!1);
                        }
                        e.invertColors && this.menuInterface.invertColors(),
                            e.grayHues && this.menuInterface.grayHues(),
                            e.underlineLinks && this.menuInterface.underlineLinks(),
                            e.bigCursor && this.menuInterface.bigCursor(),
                            e.readingGuide && this.menuInterface.readingGuide(),
                            (this.sessionState = e);
                    }
                }
                destroy() {
                    let e = a.deployedObjects.getAll();
                    for (let t of e) {
                        let e = document.querySelector(t);
                        e && e.parentElement.removeChild(e);
                    }
                }
            }
            u.init = (e) => {
                a.warn('"Accessibility.init()" is deprecated! Please use "new Accessibility()" instead'), new u(e);
            };
            var d = u;
            window.Accessibility = d;
        },
    ]);
});
