// ==UserScript==
// @name         RaiPlay - Force 1080p
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Forces 1080p and adds a badge to the left of the player buttons
// @author       Giorgio
// @match        *://*.raiplay.it/*
// @match        *://*.rai.it/*
// @match        *://*.rainews.it/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/arrive/2.4.1/arrive.min.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const PARAM_TO_ADD = 'forceUserAgent=raiplayappletv';
    const BADGE_CLASS = 'vjs-1080p-badge';
    const STYLE_ID = 'gm-1080p-badge-style';

    // NETWORK LOGIC
    function modifyUrl(url) {
        if (typeof url === 'string' && url.includes('relinkerServlet.htm') && !url.includes(PARAM_TO_ADD)) {
            const separator = url.includes('?') ? '&' : '?';
            return url + separator + PARAM_TO_ADD;
        }
        return url;
    }

    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        if (args[0]) {
            args[0] = modifyUrl(args[0]);
        }
        return originalFetch.apply(this, args);
    };

    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
        url = modifyUrl(url);
        return originalOpen.apply(this, [method, url, ...args]);
    };

    // UI LOGIC
    function ensureStyles() {
        if (document.getElementById(STYLE_ID)) return;

        const css = `
            .vjs-control-bar .vjs-1080p-badge {
                order: 109;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                height: auto !important;
                line-height: normal !important;
                align-self: center !important;
                padding: 0 8px !important;
                margin: 0 !important;
                width: auto !important;
                box-sizing: border-box !important;
            }

            .vjs-control-bar .vjs-1080p-badge > span {
                background: transparent;
                color: #039cf9;
                font-size: 0.8em;
                font-weight: 800;
                border: 1.5px solid #039cf9;
                padding: 1px 4px;
                border-radius: 4px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                line-height: 1;
                pointer-events: none;
            }
        `;

        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = css;
        document.documentElement.appendChild(style);
    }

    function injectBadge(container) {
        if (container.find('.' + BADGE_CLASS).length) return;

        ensureStyles();

        const badge = $(`
            <div class="${BADGE_CLASS} vjs-control" aria-hidden="true">
                <span>1080p</span>
            </div>
        `);

        container.find('.vjs-custom-control-spacer').after(badge);
    }

    // Attach to Video.js player
    $(document).arrive('rai-player .vjs-custom-control-spacer, rainews-player .vjs-custom-control-spacer', function() {
        const container = $(this).parent();
        injectBadge(container);
    });

})();