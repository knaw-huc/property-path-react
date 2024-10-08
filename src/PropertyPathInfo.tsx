import React, {ReactNode} from 'react';
import {PropertyActions} from './misc';

export default function PropertyPathInfo({infoLabels, readOnly, buttons}: {
    infoLabels?: string[],
    readOnly?: boolean,
    buttons: [ReactNode, string, () => void][];
}) {
    return (
        <>
            {infoLabels?.map((resource, idx) => <div
                key={idx} className="property-pill property-resource">
                {resource}
            </div>)}

            {!readOnly && buttons && <PropertyActions buttons={buttons}/>}
        </>
    );
}
