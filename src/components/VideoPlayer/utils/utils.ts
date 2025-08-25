export function getAverageVolume(dataArray: Uint8Array<ArrayBufferLike>) {
  const avg = Array.from(dataArray).reduce((a, b) => a + b, 0) / dataArray.length
  return Math.min(1, (avg / 255) * 10) // Вручную выбранное значение "10"
}