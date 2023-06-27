import React, { createContext, useEffect, useState } from "react";

interface Props {
  children: any;
}

interface IContent {
  navbarTransparent: boolean;
}

interface IContentContext {
  Context: IContent;
  SetContext: React.Dispatch<any>;
}

export const MainContext = createContext<IContentContext>({
  Context: { navbarTransparent: true },
  SetContext: () => {},
});

const ContextContainer: React.FC<Props> = ({ children }) => {
  const [Context, SetContext] = useState<IContent>({
    navbarTransparent: true,
  });

  return (
    <MainContext.Provider value={{ Context, SetContext }}>
      {children}
    </MainContext.Provider>
  );
};

export default ContextContainer;
