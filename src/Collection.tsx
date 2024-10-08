import React, {ReactNode} from 'react';
import SelectPopover from './SelectPopover';

interface CollectionProps<C, P> {
    collection: C | null,
    collectionIdx: number | null,
    prevCollection: C,
    prevProperty: P | null,
    getCollectionLabel?: (collection: C) => string,
    getCollectionOptions: (collection: C, property: P, searchValue: string) => C[],
    getCollectionOption?: (collection: C) => ReactNode,
    setPropertyInPath: (idx: number, value: C | P) => void,
    resetPropertyPath: (idx: number) => void,
    readOnly?: boolean,
    isLast: boolean
}

interface CollectionSelectProps<C> {
    index: number,
    getCollectionOptions: (searchValue: string) => C[],
    getCollectionOption?: (collection: C) => ReactNode,
    setPropertyInPath: (idx: number, value: C) => void
}

export default function Collection<C, P>(
    {
        collection,
        collectionIdx,
        prevCollection,
        prevProperty,
        getCollectionLabel,
        getCollectionOptions,
        getCollectionOption,
        setPropertyInPath,
        resetPropertyPath,
        readOnly,
        isLast
    }: CollectionProps<C, P>) {
    const canBeUpdated = collectionIdx !== null && !readOnly;
    const className = 'property-pill property-prop'
        + (canBeUpdated ? ' property-can-select' : '')
        + (isLast ? ' property-last' : '');

    return (
        <>
            {collection === null && canBeUpdated && prevProperty &&
                <CollectionSelect index={collectionIdx}
                                  getCollectionOptions={searchValue => getCollectionOptions(prevCollection, prevProperty, searchValue)}
                                  getCollectionOption={getCollectionOption}
                                  setPropertyInPath={setPropertyInPath}/>}

            {collection !== null &&
                <div className={className}
                     onClick={_ => canBeUpdated && resetPropertyPath(collectionIdx)}>
                    {getCollectionLabel ? getCollectionLabel(collection) : collection!.toString()}
                </div>
            }
        </>
    );
}

function CollectionSelect<C>({index, getCollectionOptions, getCollectionOption, setPropertyInPath}: CollectionSelectProps<C>) {
    return (
        <SelectPopover index={index}
                       getOptions={getCollectionOptions}
                       getOption={getCollectionOption}
                       setPropertyInPath={setPropertyInPath}/>
    );
}
