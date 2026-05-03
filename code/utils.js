export function clamp(val, min, max) {
    let result = val;
    
    if (result > max) {
        result = max;
    } else if (result < min) {
        result = min;
    }
    
    return result
}