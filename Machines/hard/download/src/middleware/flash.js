"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    if (!req.session || !req.session.flashes) {
        req.session.flashes = {
            info: [],
            error: [],
            success: [],
        };
    }
    res.flash = (type, message) => {
        req.session.flashes[type].push(message);
    };
    const _render = res.render;
    res.render = function (view, passedOptions) {
        // continue with original render
        const flashes = {
            info: req.session.flashes.info.join("<br/>"),
            error: req.session.flashes.error.join("<br/>"),
            success: req.session.flashes.success.join("<br/>"),
        };
        req.session.flashes = {
            info: [],
            error: [],
            success: [],
        };
        const options = { ...passedOptions, user: req.session?.user, flashes, baseUrl: req.baseUrl };
        _render.call(this, view, options);
    };
    next();
};
