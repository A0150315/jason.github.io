/**
 * 通过路径导入模块
 * @param {string} moduleName
 * @returns {*}
 */
declare function require(moduleName: string): any;

interface Day {
    today?: number;
    tomorrow?: number;
    day?: number;
}