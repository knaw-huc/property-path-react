import React, {ReactNode} from 'react';
import SelectPopover from './SelectPopover';

interface PropertyProps<C, P> {
    collection: C,
    property: P | null,
    propIdx: number,
    getPropertyLabel?: (collection: C, property: P) => string,
    getPropertyOptions: (collection: C, searchValue: string) => P[],
    getPropertyOption?: (collection: C, property: P) => ReactNode,
    setPropertyInPath: (idx: number, value: C | P) => void,
    resetPropertyPath: (idx: number) => void,
    readOnly?: boolean,
    isLast: boolean
}

interface PropertySelectProps<P> {
    index: number,
    getPropertyOptions: (searchValue: string) => P[],
    getPropertyOption?: (property: P) => ReactNode,
    setPropertyInPath: (idx: number, value: P) => void
}

export default function Property<C, P>(
    {
        collection,
        property,
        propIdx,
        getPropertyLabel,
        getPropertyOptions,
        getPropertyOption,
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
                <PropertySelect index={propIdx}
                                getPropertyOptions={searchValue => getPropertyOptions(collection, searchValue)}
                                getPropertyOption={getPropertyOption && ((property: P) => getPropertyOption(collection, property))}
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

function PropertySelect<P>({index, getPropertyOptions, getPropertyOption, setPropertyInPath}: PropertySelectProps<P>) {
    return (
        <SelectPopover index={index}
                       getOptions={getPropertyOptions}
                       getOption={getPropertyOption}
                       setPropertyInPath={setPropertyInPath}/>
    );
}
