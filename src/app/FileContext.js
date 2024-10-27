/* eslint-disable no-undef */
import React, { createContext, useContext, useState } from "react";

const FileContext = createContext();

export const useFileContext = () => {
    return useContext(FileContext);
};

export const FileProvider = ({ children }) => {
    const [fileMap, setFileMap] = useState(new Map());

    const addFile = (id, file) => {
        setFileMap(prev => new Map(prev).set(id, file));
    };

    const removeFile = (id) => {
        setFileMap(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
        });
    };
    const getFirstFile = () => {
        return fileMap.size > 0 ? fileMap.values().next().value : null;
    };

    return (
        <FileContext.Provider value={{ fileMap, addFile, removeFile, getFirstFile }}>
            {children}
        </FileContext.Provider>
    );
};
