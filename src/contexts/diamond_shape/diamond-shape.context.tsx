import React, { createContext, useState } from "react";

export const DiamondShapeContext = createContext({
    shape: 'Round',
    updateShape: (value: string) => {}
});

function DiamondShapeProvider({ children }: any) {
    const [shape, setShape] = useState<string>('Round');

    const updateShape = (value: string) => {
        setShape(value)
    }

    return (<DiamondShapeContext.Provider value={{
        shape,
        updateShape,
    }} >
        {children}
    </DiamondShapeContext.Provider>
)
};

export default DiamondShapeProvider;
