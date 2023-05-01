import React,{createContext,useState} from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const [globalState, setGlobalState] = useState({themeName:'blue'});
  
    const updateGlobalState = (newState) => {
      setGlobalState((prevState) => ({
        ...prevState,
        ...newState,
      }));
    };
  
    return (
      <AppContext.Provider value={{ globalState, updateGlobalState }}>
        {children}
      </AppContext.Provider>
    );
  };

export {AppProvider,AppContext};