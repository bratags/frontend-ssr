export function getEnv(key, fallback) {
    if (typeof import.meta.env !== 'undefined' && key in import.meta.env) {
        return import.meta.env[key]
    }
    if (typeof process !== 'undefined' && process.env && key in process.env) {
        return process.env[key]
    }
    return fallback
}

export default {
    getEnv
}