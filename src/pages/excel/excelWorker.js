/* eslint-env worker */
import * as XLSX from 'xlsx';


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

    self.postMessage({ headers, jsonData });
  };

  reader.readAsArrayBuffer(file);
};
