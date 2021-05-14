"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatYaml = void 0;
const formatYaml = (prefix = '') => ({ OutputKey, OutputValue }) => `${prefix}${OutputKey}: ${OutputValue}`;
exports.formatYaml = formatYaml;
