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
    collectionSelectOpen: boolean,
    getCollectionLabel?: (collection: C) => ReactNode,
    getCollectionOptions: (collection: C, property: P, searchValue: string) => C[],
    getCollectionOption?: (collection: C) => ReactNode,
    onCollectionSelectOpenChange: (open: boolean) => void,
    propIdx: number,
    propertySelectOpen: boolean,
    getPropertyLabel?: (collection: C, property: P) => ReactNode,
    getPropertyOptions: (collection: C, searchValue: string) => P[],
    getPropertyOption?: (collection: C, property: P) => ReactNode,
    onPropertySelectOpenChange: (open: boolean) => void,
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
        collectionSelectOpen,
        getCollectionLabel,
        getCollectionOptions,
        getCollectionOption,
        onCollectionSelectOpenChange,
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
    }: PropertyInPathProps<C, P>) {
    const hasProperty = collection && (stopProperty === undefined || property !== stopProperty);

    return (
        <>
            {(hasInfoLabels || collectionIdx !== null) && <Seperator/>}
                {collectionIdx !== null && <Collection
                    collection={collection}
                    collectionIdx={collectionIdx}
                    collectionSelectOpen={collectionSelectOpen}
                    prevCollection={prevCollection}
                    prevProperty={prevProperty}
                    getCollectionLabel={getCollectionLabel}
                    getCollectionOptions={getCollectionOptions}
                    getCollectionOption={getCollectionOption}
                    onCollectionSelectOpenChange={onCollectionSelectOpenChange}
                    setPropertyInPath={setPropertyInPath}
                    resetPropertyPath={resetPropertyPath}
                    readOnly={readOnly}
                    isLast={isLast && !hasProperty}/>}

                {collectionIdx !== null && collection && <Seperator/>}
                {hasProperty && <Property
                    collection={collection}
                    property={property}
                    propIdx={propIdx}
                    propertySelectOpen={propertySelectOpen}
                    getPropertyLabel={getPropertyLabel}
                    getPropertyOptions={getPropertyOptions}
                    getPropertyOption={getPropertyOption}
                    onPropertySelectOpenChange={onPropertySelectOpenChange}
                    setPropertyInPath={setPropertyInPath}
                    resetPropertyPath={resetPropertyPath}
                    readOnly={readOnly}
                    isLast={isLast}/>}
        </>
    );
}
