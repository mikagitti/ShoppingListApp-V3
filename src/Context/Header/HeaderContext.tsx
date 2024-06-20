import React, { createContext, useState, ReactNode } from 'react';

import headerListJson from './HeaderListJSON.json';

export type HeaderType = {
    id: number;
    headerName: string;    
}

export type ActiveHeaderType = {
    id: number
}

type HeaderContext = {
    headerList: HeaderType[];
    activeHeader: ActiveHeaderType;
    chooseHeader: (header: ActiveHeaderType) => void;
}

const defaultHeaderListState: HeaderContext = {
    headerList: [],
    activeHeader: {id: 1},
    chooseHeader: (header: ActiveHeaderType) => {}
}

//CONTEXT
const HeaderListContext = createContext<HeaderContext>(defaultHeaderListState);

//PROVIDER
export const HeaderListProvider = ({children} : {children : ReactNode}) => {
    
    const headerList = headerListJson;
    const [activeHeader, setActiveHeader] = useState<ActiveHeaderType>({id: 1});

    const chooseHeader = (header: ActiveHeaderType) => {
        setActiveHeader({id: header.id});
    }
    
    return (
        <HeaderListContext.Provider value={{ headerList, activeHeader, chooseHeader }}>
            {children}
        </HeaderListContext.Provider>
    );
}


export default HeaderListContext;
