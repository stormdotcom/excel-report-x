import { v4 as uuidv4 } from "uuid";

export const imageFiles = ["image/x-png", "image/png", "image/jpg", "image/jpeg"];
export const imageMaxSize = 10000000; // bytes

export const verifyFiles = (files, fileSize = imageMaxSize, acceptedFileTypesArray = imageFiles) => {
    const results = [];
    const maxFiles = 20;

    if (files && files.length > 0) {
        for (let i = 0; i < Math.min(files.length, maxFiles); i++) {
            const currentFile = files[i];
            const currentFileType = currentFile.type;
            const currentFileSize = currentFile.size;
            const sizeInMb = Math.round((currentFileSize / 1000000) * 100) / 100;
            const fileSizeInMb = Math.round((fileSize / 1000000) * 100) / 100;

            if (currentFileSize > fileSize) {
                results.push({
                    id: uuidv4(),
                    isVerified: false,
                    message: `${sizeInMb}MB not allowed, should be less than ${fileSizeInMb}MB`,
                    file: currentFile
                });
                continue;
            }
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                results.push({
                    id: uuidv4(),
                    isVerified: false,
                    message: `${currentFileType} type file not allowed`,
                    file: currentFile
                });
                continue;
            }
            results.push({
                id: uuidv4(),
                isVerified: true,
                status: "File Accepted",
                currFileName: currentFile.name || "Sample File",
                file: currentFile
            });
        }
    }

    return results;
};
