import React, {ReactNode, useState} from 'react';
import SelectPopover from './SelectPopover';

interface PropertyProps<C, P> {
    collection: C,
    property: P | null,
    propIdx: number,
    propertySelectOpen: boolean,
    getPropertyLabel?: (collection: C, property: P) => string,
    getPropertyOptions: (collection: C, searchValue: string) => P[],
    getPropertyOption?: (collection: C, property: P) => ReactNode,
    onPropertySelectOpenChange: (open: boolean) => void,
    setPropertyInPath: (idx: number, value: C | P) => void,
    resetPropertyPath: (idx: number) => void,
    readOnly?: boolean,
    isLast: boolean
}

export default function Property<C, P>(
    {
        collection,
        property,
        propIdx,
        propertySelectOpen,
        getPropertyLabel,
        getPropertyOptions,
        getPropertyOption,
        onPropertySelectOpenChange,
        setPropertyInPath,
        resetPropertyPath,
        readOnly,
        isLast
    }: PropertyProps<C, P>) {
    const className = 'property-pill property-prop'
        + (!readOnly ? ' property-can-select' : '')
        + (isLast ? ' property-last' : '');

    return (
        <>
            {property === null && !readOnly &&
                <SelectPopover index={propIdx} open={propertySelectOpen} onOpenChange={onPropertySelectOpenChange}
                               getOptions={searchValue => getPropertyOptions(collection, searchValue)}
                               getOption={getPropertyOption && ((property: P) => getPropertyOption(collection, property))}
                               setPropertyInPath={setPropertyInPath}/>}

            {property !== null &&
                <div className={className}
                     onClick={_ => !readOnly && resetPropertyPath(propIdx)}>
                    {getPropertyLabel ? getPropertyLabel(collection, property) : property!.toString()}
                </div>
            }
        </>
    );
}
