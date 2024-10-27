// excelWorker.js
importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js');

self.onmessage = (e) => {
  const file = e.data;
  const reader = new FileReader();

  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    
    // Extract headers and jsonData
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const headers = jsonData[0] || [];

    // Send both headers and jsonData as an object to the main thread
    self.postMessage({ headers, jsonData });
  };

  reader.readAsArrayBuffer(file);
};
