import React, {ReactNode, useState} from 'react';
import PropertyInPath from './PropertyInPath';
import PropertyCollapse from './PropertyCollapse';
import PropertyPathInfo from './PropertyPathInfo';
import {PropertyActions, PropertyValues} from './misc';
import './style.css';

interface PropertyPathProps<C, P> {
    propertyPath: (C | P | null)[];
    startCollection: C;
    stopProperty?: P;
    infoLabels?: ReactNode[];
    values?: ReactNode[];
    getCollectionOptions: (collection: C, property: P, searchValue: string) => C[];
    getPropertyOptions: (collection: C, searchValue: string) => P[];
    getCollectionLabel?: (collection: C) => ReactNode;
    getPropertyLabel?: (collection: C, property: P) => ReactNode;
    getCollectionOption?: (collection: C) => ReactNode;
    getPropertyOption?: (collection: C, property: P) => ReactNode;
    className?: string;
    readOnly?: boolean;
    allowCollapse?: boolean;
    startCollapsed?: boolean;
    doCollapseButtonOverride?: ReactNode;
    undoCollapseButtonOverride?: ReactNode;
    buttons?: [ReactNode, string, () => void][];
    onChange?: (newProperty: (C | P | null)[], prevProperty: (C | P | null)[]) => void;
}

function getId<C, P>(propertyPath: (C | P | null)[]) {
    const str = JSON.stringify(propertyPath);

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return 'prop' + hash;
}

export default function PropertyPath<C, P>(
    {
        propertyPath,
        startCollection,
        className,
        stopProperty,
        infoLabels,
        values,
        getCollectionOptions,
        getPropertyOptions,
        getCollectionLabel,
        getPropertyLabel,
        getCollectionOption,
        getPropertyOption,
        readOnly = false,
        allowCollapse = false,
        startCollapsed = false,
        doCollapseButtonOverride,
        undoCollapseButtonOverride,
        buttons = [],
        onChange
    }: PropertyPathProps<C, P>) {
    function setPropertyInPath(idx: number, value: C | P) {
        if (onChange) {
            const newPropertyPath = [...propertyPath];
            newPropertyPath[idx] = value;

            const length = newPropertyPath.length;
            const collection = (length > 2 ? newPropertyPath[length - 2] : startCollection) as C;
            const property = newPropertyPath[length - 1] as (P | null);

            if (value === stopProperty)
                newPropertyPath.splice(length - 1);

            if (property) {
                const options = getCollectionOptions(collection, property, '')
                    .filter(option => option !== stopProperty);
                if (options.length > 0)
                    newPropertyPath.push(null, null);
            }

            onChange(newPropertyPath, propertyPath);
            setSelectPopoverOpen(newPropertyPath.length > (idx + 1) ? idx + 1 : null);
        }
    }

    function resetPropertyPath(idx: number) {
        if (onChange) {
            const newPropertyPath = [...propertyPath];
            const replaceBy = (idx % 2 === 1) ? [null, null] : [null];
            newPropertyPath.splice(idx, (newPropertyPath.length - idx), ...replaceBy);
            onChange(newPropertyPath, propertyPath);
        }
    }

    const [selectPopoverOpen, setSelectPopoverOpen] = useState<number | null>(null);
    const id = allowCollapse ? getId(propertyPath) : '';
    const properties = new Array(Math.floor((propertyPath.length + 1) / 2))
        .fill(null)
        .map((_, idx) => {
            const collectionIdx = idx > 0 ? (idx * 2) - 1 : null;
            const propIdx = idx * 2;
            const prevCollectionIdx = collectionIdx !== null && collectionIdx > 1 ? collectionIdx - 2 : null;
            const prevPropIdx = propIdx > 1 ? propIdx - 2 : null;

            const collection = (collectionIdx !== null ? propertyPath[collectionIdx] : startCollection) as C | null;
            const property = propertyPath[propIdx] as P | null;
            const prevCollection = (prevCollectionIdx !== null ? propertyPath[prevCollectionIdx] : startCollection) as C;
            const prevProperty = (prevPropIdx !== null ? propertyPath[prevPropIdx] as P : null);

            const key = collectionIdx !== null
                ? `${collection || collectionIdx}_${property || propIdx}`
                : `${property || propIdx}`;

            return {
                key, collectionIdx, collection, prevCollection, propIdx, property, prevProperty
            };
        });

    return (
        <div className={'property' + (allowCollapse ? ` ${id}` : '') + (className ? ` ${className}` : '')}>
            {infoLabels && <PropertyPathInfo infoLabels={infoLabels}
                                             readOnly={readOnly}
                                             buttons={buttons}/>}

            {properties.map(({key, collection, property, prevCollection, prevProperty, collectionIdx, propIdx}, idx) =>
                <PropertyInPath key={key}
                                hasInfoLabels={!!infoLabels}
                                collection={collection}
                                property={property}
                                prevCollection={prevCollection}
                                prevProperty={prevProperty}
                                stopProperty={stopProperty}
                                collectionIdx={collectionIdx}
                                collectionSelectOpen={selectPopoverOpen === collectionIdx}
                                getPropertyLabel={getPropertyLabel}
                                getCollectionLabel={getCollectionLabel}
                                getCollectionOptions={getCollectionOptions}
                                getCollectionOption={getCollectionOption}
                                onCollectionSelectOpenChange={(open: boolean) => setSelectPopoverOpen(open ? collectionIdx : null)}
                                propIdx={propIdx}
                                propertySelectOpen={selectPopoverOpen === propIdx}
                                getPropertyOptions={getPropertyOptions}
                                getPropertyOption={getPropertyOption}
                                setPropertyInPath={setPropertyInPath}
                                onPropertySelectOpenChange={(open: boolean) => setSelectPopoverOpen(open ? propIdx : null)}
                                resetPropertyPath={resetPropertyPath}
                                readOnly={readOnly}
                                isLast={idx === (properties.length - 1)}/>
            )}

            {!infoLabels && (!readOnly && buttons) &&
                <PropertyActions buttons={buttons}/>}

            {allowCollapse && <PropertyCollapse id={id}
                                                startCollapsed={startCollapsed}
                                                doCollapseButtonOverride={doCollapseButtonOverride}
                                                undoCollapseButtonOverride={undoCollapseButtonOverride}/>}

            {values && values.length > 0 && <PropertyValues values={values}/>}
        </div>
    );
}
