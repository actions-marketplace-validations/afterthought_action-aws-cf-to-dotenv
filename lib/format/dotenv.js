"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDotenv = void 0;
const formatDotenv = (prefix = '') => ({ OutputKey, OutputValue }) => `${prefix}${OutputKey}=${OutputValue}`;
exports.formatDotenv = formatDotenv;
