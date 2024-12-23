/**
 * Adds a click outside listener to the document, triggering the callback function when a click occurs outside
 * the specified element.
 *
 * @param {Document} document - The document object to attach the event listener to.
 * @param {string} action - The type of event to listen for (e.g. 'click').
 * @param {(target: HTMLElement) => void} callback - The function to be called when a click occurs outside
 * the specified element.
 */
export const addClickOutsideListener = (
  document: Document,
  action: string,
  callback: (target: HTMLElement) => void) =>
{
  document.addEventListener(action, (event) => {
    callback(event.target as HTMLElement)
  })
}

/**
 * Converts a file to its base64 representation.
 *
 * @param {File} file - The file to be converted.
 * @return {Promise<string>} A promise that resolves with the base64 representation of the file, or rejects with an error.
 */
export const toBase64 = (file: File): Promise<string> => {
  return new Promise<any>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader?.result?? "");
    reader.onerror = error => reject(error);
  });
}

/**
 * Converts a File object to a Blob.
 *
 * @param {File} file - The file to be converted.
 * @return {Promise<Blob>} A Promise that resolves with the converted Blob.
 */
export const toBlob = (file: File): Promise<Blob> => {
  return new Promise<Blob>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      if (!reader.result) {
        reject('Error')
        return
      }
      const blob = new Blob([reader.result], { type: file.type });
      resolve(blob);
    };
  });
}

/**
 * Generates initials from the given name.
 *
 * @param {string} name - The name from which initials are generated.
 * @return {string} The generated initials in uppercase.
 */
export const getUserInitials = (name: string): string => {
  const initials = name.match(/\b\w/g) || [];
  return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
}
