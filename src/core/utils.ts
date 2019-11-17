export function randomNumber(min: number, max: number) {
    return parseInt(String(Math.random() * (max - min + 1)), 10) + min;
}