/**
 * Returns object url given a download Url of a PDF
 * @param url
 */
export const createPDFUrl = async (url: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = await new File([blob], 'filename', {type: 'application/pdf'})
      resolve(URL.createObjectURL(file))
    } catch (e){
      console.error('Ops createPdfUrl error --> ', e)
      console.log('ops i did it again')
      reject(e)
    }
  });
}
