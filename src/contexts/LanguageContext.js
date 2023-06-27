// 言語の切り替え機能を提供するコンテキスト
import React, { createContext, useState } from "react";

export const LanguageContext = createContext("ja-JP");

// 言語の切り替え機能を提供するコンテキストプロバイダー
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ja-JP");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
