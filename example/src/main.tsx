import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import PropertyPath from '@knaw-huc/property-path-react';
import './index.css';

createRoot(document.getElementById('root')!).render(<App/>);

function App() {
    const [propertyPathA, setPropertyPathA] = useState<(string | null)[]>(['ex:partner', 'ex:Person', 'ex:hasName', 'ex:PersonName', 'ex:literalName']);
    const [propertyPathB, setPropertyPathB] = useState<(string | null)[]>(['inverse:ex:isInRecord', 'ex:PersonName', '__value__']);

    const collections = ['ex:PersonRecord', 'ex:Person', 'ex:PersonName'];
    const properties = ['ex:partner', 'ex:hasName', 'ex:literalName', 'inverse:ex:isInRecord'];

    function getCollectionsFor(_collection: string, _property: string, searchValue: string) {
        const s = searchValue.toLowerCase();
        return ['__value__', ...collections.filter(collection => collection.toLowerCase().indexOf(s) > -1)];
    }

    function getPropertiesFor(_collection: string, searchValue: string) {
        const s = searchValue.toLowerCase();
        return properties.filter(property => property.toLowerCase().indexOf(s) > -1);
    }

    function onChangePropertyPathA(newPropertyPath: (string | null)[], prevPropertyPath: (string | null)[]) {
        console.log('Property path A was updated!');
        console.log('Previous property path', prevPropertyPath);
        console.log('New property path', newPropertyPath);
        setPropertyPathA(newPropertyPath);
    }

    function onChangePropertyPathB(newPropertyPath: (string | null)[], prevPropertyPath: (string | null)[]) {
        console.log('Property path B was updated!');
        console.log('Previous property path', prevPropertyPath);
        console.log('New property path', newPropertyPath);
        setPropertyPathB(newPropertyPath);
    }

    return (
        <>
            <h2>Default</h2>
            <PropertyPath propertyPath={propertyPathA}
                          startCollection="ex:Person"
                          stopProperty="__value__"
                          getCollectionOptions={getCollectionsFor}
                          getPropertyOptions={getPropertiesFor}
                          getCollectionLabel={collection => collection.replace('ex:', '')}
                          getPropertyLabel={(_collection, property) => property.replace('ex:', '').replace('inverse:', '← ')}
                          getCollectionOption={collection => <div>{collection}</div>}
                          getPropertyOption={(_collection, property) => <div>{property}</div>}
                          onChange={onChangePropertyPathA}/>

            <h2>Read-only</h2>
            <PropertyPath propertyPath={propertyPathB}
                          startCollection="ex:PersonRecord"
                          stopProperty="__value__"
                          getCollectionOptions={getCollectionsFor}
                          getPropertyOptions={getPropertiesFor}
                          getCollectionLabel={collection => collection.replace('ex:', '')}
                          getPropertyLabel={(_collection, property) => property.replace('ex:', '').replace('inverse:', '← ')}
                          getCollectionOption={collection => <div>{collection}</div>}
                          getPropertyOption={(_collection, property) => <div>{property}</div>}
                          readOnly={true}/>

            <h2>Allow collapse</h2>
            <PropertyPath propertyPath={propertyPathB}
                          startCollection="ex:PersonRecord"
                          stopProperty="__value__"
                          getCollectionOptions={getCollectionsFor}
                          getPropertyOptions={getPropertiesFor}
                          getCollectionLabel={collection => collection.replace('ex:', '')}
                          getPropertyLabel={(_collection, property) => property.replace('ex:', '').replace('inverse:', '← ')}
                          getCollectionOption={collection => <div>{collection}</div>}
                          getPropertyOption={(_collection, property) => <div>{property}</div>}
                          onChange={onChangePropertyPathB}
                          allowCollapse={true}/>

            <h2>With info labels</h2>
            <PropertyPath propertyPath={propertyPathA}
                          startCollection="ex:Person"
                          stopProperty="__value__"
                          infoLabels={['My dataset', 'Collection of persons']}
                          getCollectionOptions={getCollectionsFor}
                          getPropertyOptions={getPropertiesFor}
                          getCollectionLabel={collection => collection.replace('ex:', '')}
                          getPropertyLabel={(_collection, property) => property.replace('ex:', '').replace('inverse:', '← ')}
                          getCollectionOption={collection => <div>{collection}</div>}
                          getPropertyOption={(_collection, property) => <div>{property}</div>}
                          onChange={onChangePropertyPathA}/>

            <h2>With values</h2>
            <PropertyPath propertyPath={propertyPathA}
                          startCollection="ex:Person"
                          stopProperty="__value__"
                          values={['Jan Jansen', 'Piet Hendriks', 'Maria van Stam']}
                          getCollectionOptions={getCollectionsFor}
                          getPropertyOptions={getPropertiesFor}
                          getCollectionLabel={collection => collection.replace('ex:', '')}
                          getPropertyLabel={(_collection, property) => property.replace('ex:', '').replace('inverse:', '← ')}
                          getCollectionOption={collection => <div>{collection}</div>}
                          getPropertyOption={(_collection, property) => <div>{property}</div>}
                          readOnly={true}/>
        </>
    );
}
