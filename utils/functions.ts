export function truncateText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength);
  }
  return text;
}

// text with new line character
export function truncateTextWithNewLine(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "\n";
  }
  return text;
}
