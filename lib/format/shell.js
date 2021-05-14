"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatShell = void 0;
const formatShell = (prefix = '') => ({ OutputKey, OutputValue }) => `export ${prefix}${OutputKey}=${OutputValue}`;
exports.formatShell = formatShell;
