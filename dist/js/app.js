(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    !function(T, y, u, d) {
        "use strict";
        function a(t, i) {
            this.element = t, this.$context = T(t).data("api", this), this.$layers = this.$context.find(".layer");
            var e = {
                calibrateX: this.$context.data("calibrate-x") || null,
                calibrateY: this.$context.data("calibrate-y") || null,
                invertX: this.$context.data("invert-x") || null,
                invertY: this.$context.data("invert-y") || null,
                limitX: parseFloat(this.$context.data("limit-x")) || null,
                limitY: parseFloat(this.$context.data("limit-y")) || null,
                scalarX: parseFloat(this.$context.data("scalar-x")) || null,
                scalarY: parseFloat(this.$context.data("scalar-y")) || null,
                frictionX: parseFloat(this.$context.data("friction-x")) || null,
                frictionY: parseFloat(this.$context.data("friction-y")) || null,
                originX: parseFloat(this.$context.data("origin-x")) || null,
                originY: parseFloat(this.$context.data("origin-y")) || null
            };
            for (var s in e) null === e[s] && delete e[s];
            T.extend(this, r, i, e), this.calibrationTimer = null, this.calibrationFlag = !0, 
            this.enabled = !1, this.depths = [], this.raf = null, this.bounds = null, this.ex = 0, 
            this.ey = 0, this.ew = 0, this.eh = 0, this.ecx = 0, this.ecy = 0, this.erx = 0, 
            this.ery = 0, this.cx = 0, this.cy = 0, this.ix = 0, this.iy = 0, this.mx = 0, this.my = 0, 
            this.vx = 0, this.vy = 0, this.onMouseMove = this.onMouseMove.bind(this), this.onDeviceOrientation = this.onDeviceOrientation.bind(this), 
            this.onOrientationTimer = this.onOrientationTimer.bind(this), this.onCalibrationTimer = this.onCalibrationTimer.bind(this), 
            this.onAnimationFrame = this.onAnimationFrame.bind(this), this.onWindowResize = this.onWindowResize.bind(this), 
            this.initialise();
        }
        var o = "parallax", r = {
            relativeInput: !1,
            clipRelativeInput: !1,
            calibrationThreshold: 100,
            calibrationDelay: 500,
            supportDelay: 500,
            calibrateX: !1,
            calibrateY: !0,
            invertX: !0,
            invertY: !0,
            limitX: !1,
            limitY: !1,
            scalarX: 10,
            scalarY: 10,
            frictionX: .1,
            frictionY: .1,
            originX: .5,
            originY: .5,
            type: [ "translate" ]
        };
        a.prototype.transformSupport = function(t) {
            for (var i = u.createElement("div"), e = !1, s = null, a = !1, o = null, r = null, n = 0, h = this.vendors.length; n < h; n++) if (null !== this.vendors[n] ? (o = this.vendors[n][0] + "transform", 
            r = this.vendors[n][1] + "Transform") : r = o = "transform", i.style[r] !== d) {
                e = !0;
                break;
            }
            switch (t) {
              case "2D":
                a = e;
                break;

              case "3D":
                if (e) {
                    var l = u.body || u.createElement("body"), p = u.documentElement, c = p.style.overflow;
                    u.body || (p.style.overflow = "hidden", p.appendChild(l), l.style.overflow = "hidden", 
                    l.style.background = ""), l.appendChild(i), i.style[r] = "translate3d(1px,1px,1px)", 
                    a = (s = y.getComputedStyle(i).getPropertyValue(o)) !== d && 0 < s.length && "none" !== s, 
                    p.style.overflow = c, l.removeChild(i);
                }
            }
            return a;
        }, a.prototype.ww = null, a.prototype.wh = null, a.prototype.wcx = null, a.prototype.wcy = null, 
        a.prototype.wrx = null, a.prototype.wry = null, a.prototype.portrait = null, a.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), 
        a.prototype.vendors = [ null, [ "-webkit-", "webkit" ], [ "-moz-", "Moz" ], [ "-o-", "O" ], [ "-ms-", "ms" ] ], 
        a.prototype.motionSupport = !!y.DeviceMotionEvent, a.prototype.orientationSupport = !!y.DeviceOrientationEvent, 
        a.prototype.orientationStatus = 0, a.prototype.transform2DSupport = a.prototype.transformSupport("2D"), 
        a.prototype.transform3DSupport = a.prototype.transformSupport("3D"), a.prototype.propertyCache = {}, 
        a.prototype.initialise = function() {
            this.accelerate(this.$context), this.updateLayers(), this.updateDimensions(), this.enable(), 
            this.queueCalibration(this.calibrationDelay);
        }, a.prototype.updateLayers = function() {
            this.$layers = this.$context.find(".layer"), this.depths = [], this.accelerate(this.$layers), 
            this.$layers.each(T.proxy((function(t, i) {
                this.depths.push(T(i).data("depth") || 0);
            }), this));
        }, a.prototype.updateDimensions = function() {
            this.ww = y.innerWidth, this.wh = y.innerHeight, this.wcx = this.ww * this.originX, 
            this.wcy = this.wh * this.originY, this.wrx = Math.max(this.wcx, this.ww - this.wcx), 
            this.wry = Math.max(this.wcy, this.wh - this.wcy);
        }, a.prototype.updateBounds = function() {
            this.bounds = this.element.getBoundingClientRect(), this.ex = this.bounds.left, 
            this.ey = this.bounds.top, this.ew = this.bounds.width, this.eh = this.bounds.height, 
            this.ecx = this.ew * this.originX, this.ecy = this.eh * this.originY, this.erx = Math.max(this.ecx, this.ew - this.ecx), 
            this.ery = Math.max(this.ecy, this.eh - this.ecy);
        }, a.prototype.queueCalibration = function(t) {
            clearTimeout(this.calibrationTimer), this.calibrationTimer = setTimeout(this.onCalibrationTimer, t);
        }, a.prototype.enable = function() {
            this.enabled || (this.enabled = !0, this.orientationSupport ? (this.portrait = null, 
            y.addEventListener("deviceorientation", this.onDeviceOrientation), setTimeout(this.onOrientationTimer, this.supportDelay)) : (this.cx = 0, 
            this.cy = 0, this.portrait = !1, y.addEventListener("mousemove", this.onMouseMove)), 
            y.addEventListener("resize", this.onWindowResize), this.raf = requestAnimationFrame(this.onAnimationFrame));
        }, a.prototype.disable = function() {
            this.enabled && (this.enabled = !1, this.orientationSupport ? y.removeEventListener("deviceorientation", this.onDeviceOrientation) : y.removeEventListener("mousemove", this.onMouseMove), 
            y.removeEventListener("resize", this.onWindowResize), cancelAnimationFrame(this.raf));
        }, a.prototype.calibrate = function(t, i) {
            this.calibrateX = t === d ? this.calibrateX : t, this.calibrateY = i === d ? this.calibrateY : i;
        }, a.prototype.invert = function(t, i) {
            this.invertX = t === d ? this.invertX : t, this.invertY = i === d ? this.invertY : i;
        }, a.prototype.friction = function(t, i) {
            this.frictionX = t === d ? this.frictionX : t, this.frictionY = i === d ? this.frictionY : i;
        }, a.prototype.scalar = function(t, i) {
            this.scalarX = t === d ? this.scalarX : t, this.scalarY = i === d ? this.scalarY : i;
        }, a.prototype.limit = function(t, i) {
            this.limitX = t === d ? this.limitX : t, this.limitY = i === d ? this.limitY : i;
        }, a.prototype.origin = function(t, i) {
            this.originX = t === d ? this.originX : t, this.originY = i === d ? this.originY : i;
        }, a.prototype.clamp = function(t, i, e) {
            return t = Math.max(t, i), t = Math.min(t, e);
        }, a.prototype.css = function(t, i, e) {
            var s = this.propertyCache[i];
            if (!s) for (var a = 0, o = this.vendors.length; a < o; a++) if (s = null !== this.vendors[a] ? T.camelCase(this.vendors[a][1] + "-" + i) : i, 
            t.style[s] !== d) {
                this.propertyCache[i] = s;
                break;
            }
            t.style[s] = e;
        }, a.prototype.accelerate = function(t) {
            for (var i = 0, e = t.length; i < e; i++) {
                var s = t[i];
                this.css(s, "transform", "translate3d(0,0,0)"), this.css(s, "transform-style", "preserve-3d"), 
                this.css(s, "backface-visibility", "hidden");
            }
        }, a.prototype.setPosition = function(i, e, s) {
            var a = this, t = T(i).data("translate-calibration") || 1, o = T(i).data("rotate-calibration") || 1, r = T(i).data("scale-calibration") || 1, n = T(i).data("grayscale-calibration") || 1, h = T(i).data("blur-calibration") || 1, l = T(i).data("brightness-calibration") || 1, p = (T(i).data("contrast-calibration"), 
            T(i).data("hue-rotate-calibration") || 1), c = T(i).data("opacity-calibration") || 1, y = T(i).data("saturate-calibration") || 1, u = T(i).data("sepia-calibration") || 1, d = T(i).data("skewX-calibration") || 1, m = (T(i).data("skewX-calibration"), 
            T(i).data("perspective") || 0), b = (e + s) * o / 2 + "deg", v = 1 + (e + s) * r / 2, f = (e + s) * d / 2 + "deg", x = 100 - (e + s) * n / 2 + "%", w = Math.max((e + s) * h / 2, 0) + "px", g = 100 - (e + s) * l / 2 + "%", X = (e + s) * p / 2 + "deg", Y = 1 - (e + s) * c / 200, M = 100 - (e + s) * y / 2 + "%", D = 100 - (e + s) * u / 2 + "%";
            e = e * t + "px", s = s * t + "px";
            var F = "", $ = "", S = T(i).data("parallax-type") || "";
            if (0 < S.length) var k = S.split(","); else k = this.type;
            k.forEach((function(t) {
                "translate" == (t = t.trim()) && (a.transform3DSupport ? F = F + "translate3d(" + e + "," + s + ",0) " : a.transform2DSupport ? F = F + "translate(" + e + "," + s + ") " : (i.style.left = e, 
                i.style.top = s)), "rotate" == t && (F = a.transform3DSupport ? F + "rotate3d(0, 0, 1, " + b + ") " : F + "rotate(" + b + ") "), 
                "rotateX" == t && (F = F + "rotateX(" + b + ") "), "rotateY" == t && (F = F + "rotateY(" + b + ") "), 
                "scale" == t && (F = a.transform3DSupport ? F + "scale3d(" + v + ", " + v + ", 1) " : F + "scale(" + v + ") "), 
                "skewX" == t && (F = F + "skewX(" + f + ") "), "skewY" == t && (F = F + "skewX(" + f + ") "), 
                "grayscale" == t && ($ = $ + "grayscale(" + x + ") "), "blur" == t && ($ = $ + "blur(" + w + ") "), 
                "brightness" == t && ($ = $ + "brightness(" + g + ") "), "contrast" == t && ($ = $ + "contrast(" + g + ") "), 
                "hue-rotate" == t && ($ = $ + "hue-rotate(" + X + ") "), "saturate" == t && ($ = $ + "saturate(" + M + ") "), 
                "sepia" == t && ($ = $ + "sepia(" + D + ") "), "opacity" == t && (i.style.opacity = Y), 
                "perspective" == t && (F = F + "perspective(" + m + ") ");
            })), this.css(i, "-webkit-transform", F), this.css(i, "transform", F), this.css(i, "-moz-filter", $), 
            this.css(i, "-webkit-filter", $), this.css(i, "filter", $);
        }, a.prototype.onOrientationTimer = function(t) {
            this.orientationSupport && 0 === this.orientationStatus && (this.disable(), this.orientationSupport = !1, 
            this.enable());
        }, a.prototype.onCalibrationTimer = function(t) {
            this.calibrationFlag = !0;
        }, a.prototype.onWindowResize = function(t) {
            this.updateDimensions();
        }, a.prototype.onAnimationFrame = function() {
            this.updateBounds();
            var t = this.ix - this.cx, i = this.iy - this.cy;
            (Math.abs(t) > this.calibrationThreshold || Math.abs(i) > this.calibrationThreshold) && this.queueCalibration(0), 
            this.portrait ? (this.mx = this.calibrateX ? i : this.iy, this.my = this.calibrateY ? t : this.ix) : (this.mx = this.calibrateX ? t : this.ix, 
            this.my = this.calibrateY ? i : this.iy), this.mx *= this.ew * (this.scalarX / 100), 
            this.my *= this.eh * (this.scalarY / 100), isNaN(parseFloat(this.limitX)) || (this.mx = this.clamp(this.mx, -this.limitX, this.limitX)), 
            isNaN(parseFloat(this.limitY)) || (this.my = this.clamp(this.my, -this.limitY, this.limitY)), 
            this.vx += (this.mx - this.vx) * this.frictionX, this.vy += (this.my - this.vy) * this.frictionY;
            for (var e = 0, s = this.$layers.length; e < s; e++) {
                var a = this.depths[e], o = this.$layers[e], r = this.vx * a * (this.invertX ? -1 : 1), n = this.vy * a * (this.invertY ? -1 : 1);
                this.setPosition(o, r, n);
            }
            this.raf = requestAnimationFrame(this.onAnimationFrame);
        }, a.prototype.onDeviceOrientation = function(t) {
            if (!this.desktop && null !== t.beta && null !== t.gamma) {
                this.orientationStatus = 1;
                var i = (t.beta || 0) / 30, e = (t.gamma || 0) / 30, s = y.innerHeight > y.innerWidth;
                this.portrait !== s && (this.portrait = s, this.calibrationFlag = !0), this.calibrationFlag && (this.calibrationFlag = !1, 
                this.cx = i, this.cy = e), this.ix = i, this.iy = e;
            }
        }, a.prototype.onMouseMove = function(t) {
            var i = t.clientX, e = t.clientY;
            !this.orientationSupport && this.relativeInput ? (this.clipRelativeInput && (i = Math.max(i, this.ex), 
            i = Math.min(i, this.ex + this.ew), e = Math.max(e, this.ey), e = Math.min(e, this.ey + this.eh)), 
            this.ix = (i - this.ex - this.ecx) / this.erx, this.iy = (e - this.ey - this.ecy) / this.ery) : (this.ix = (i - this.wcx) / this.wrx, 
            this.iy = (e - this.wcy) / this.wry);
        };
        var n = {
            enable: a.prototype.enable,
            disable: a.prototype.disable,
            updateLayers: a.prototype.updateLayers,
            calibrate: a.prototype.calibrate,
            friction: a.prototype.friction,
            invert: a.prototype.invert,
            scalar: a.prototype.scalar,
            limit: a.prototype.limit,
            origin: a.prototype.origin
        };
        T.fn[o] = function(e) {
            var s = arguments;
            return this.each((function() {
                var t = T(this), i = t.data(o);
                i || (i = new a(this, e), t.data(o, i)), n[e] && i[e].apply(i, Array.prototype.slice.call(s, 1));
            }));
        };
    }(window.jQuery || window.Zepto, window, document);
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    $(document).ready((function() {
        $(".parallax__list>li").addClass("layer");
        $(".parallax__list").parallax();
        $(".wrapper").addClass("active");
    }));
    window["FLS"] = true;
    isWebp();
})();