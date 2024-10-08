import React, {ReactNode} from 'react';
import Collection from './Collection';
import Property from './Property';
import {Seperator} from './misc';

interface PropertyInPathProps<C, P> {
    hasInfoLabels: boolean,
    collection: C | null,
    property: P | null,
    prevCollection: C,
    prevProperty: P | null,
    stopProperty?: P,
    collectionIdx: number | null,
    getCollectionLabel?: (collection: C) => string,
    getCollectionOptions: (collection: C, property: P, searchValue: string) => C[],
    getCollectionOption?: (collection: C) => ReactNode,
    propIdx: number,
    getPropertyLabel?: (collection: C, property: P) => string,
    getPropertyOptions: (collection: C, searchValue: string) => P[],
    getPropertyOption?: (collection: C, property: P) => ReactNode,
    setPropertyInPath: (idx: number, value: C | P) => void,
    resetPropertyPath: (idx: number) => void,
    readOnly?: boolean,
    isLast: boolean
}

export default function PropertyInPath<C, P>(
    {
        hasInfoLabels,
        collection,
        property,
        prevCollection,
        prevProperty,
        stopProperty,
        collectionIdx,
        getCollectionLabel,
        getCollectionOptions,
        getCollectionOption,
        propIdx,
        getPropertyLabel,
        getPropertyOptions,
        getPropertyOption,
        setPropertyInPath,
        resetPropertyPath,
        readOnly,
        isLast
    }: PropertyInPathProps<C, P>) {
    const hasProperty = collection && (stopProperty === undefined || property !== stopProperty);

    return (
        <>
            {(hasInfoLabels || collectionIdx !== null) && <Seperator/>}
            {collectionIdx !== null && <Collection
                collection={collection}
                collectionIdx={collectionIdx}
                prevCollection={prevCollection}
                prevProperty={prevProperty}
                getCollectionLabel={getCollectionLabel}
                getCollectionOptions={getCollectionOptions}
                getCollectionOption={getCollectionOption}
                setPropertyInPath={setPropertyInPath}
                resetPropertyPath={resetPropertyPath}
                readOnly={readOnly}
                isLast={isLast && !hasProperty}/>}

            {collectionIdx !== null && collection && <Seperator/>}
            {hasProperty && <Property
                collection={collection}
                property={property}
                propIdx={propIdx}
                getPropertyLabel={getPropertyLabel}
                getPropertyOptions={getPropertyOptions}
                getPropertyOption={getPropertyOption}
                setPropertyInPath={setPropertyInPath}
                resetPropertyPath={resetPropertyPath}
                readOnly={readOnly}
                isLast={isLast}/>}
        </>
    );
}
