/* eslint-env worker */
import * as XLSX from 'xlsx';

onmessage = (e) => {
  const file = e.data;
  const reader = new FileReaderSync();
  const data = new Uint8Array(reader.readAsArrayBuffer(file));
  const workbook = XLSX.read(data, { type: 'array' });

  // Extract headers and jsonData
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const headers = jsonData[0] || [];

  postMessage({ headers, jsonData });
};
