import React, {ReactNode} from 'react';
import SelectPopover from './SelectPopover';

interface CollectionProps<C, P> {
    collection: C | null,
    collectionIdx: number | null,
    collectionSelectOpen: boolean,
    prevCollection: C,
    prevProperty: P | null,
    getCollectionLabel?: (collection: C) => string,
    getCollectionOptions: (collection: C, property: P, searchValue: string) => C[],
    getCollectionOption?: (collection: C) => ReactNode,
    onCollectionSelectOpenChange: (open: boolean) => void,
    setPropertyInPath: (idx: number, value: C | P) => void,
    resetPropertyPath: (idx: number) => void,
    readOnly?: boolean,
    isLast: boolean
}

export default function Collection<C, P>(
    {
        collection,
        collectionIdx,
        collectionSelectOpen,
        prevCollection,
        prevProperty,
        getCollectionLabel,
        getCollectionOptions,
        getCollectionOption,
        setPropertyInPath,
        onCollectionSelectOpenChange,
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
                <SelectPopover index={collectionIdx}
                               open={collectionSelectOpen}
                               onOpenChange={onCollectionSelectOpenChange}
                               getOptions={searchValue => getCollectionOptions(prevCollection, prevProperty, searchValue)}
                               getOption={getCollectionOption}
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

