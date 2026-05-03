export function clamp(val, min, max) {
    let result = val;
    if (result > max) {
        result = max;
    } else (result < min) {
        result = min;
    }
    return result
}