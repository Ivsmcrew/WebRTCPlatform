export function getAverageVolume(dataArray: Uint8Array) {
  const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
  return avg / 255 * 10 // нормируем 0-1
}