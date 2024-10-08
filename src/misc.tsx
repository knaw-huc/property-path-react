import React, {ReactNode} from 'react';

export function Seperator() {
    return (
        <div className="property-sep">→</div>
    );
}

export function PropertyActions({buttons}: {
    buttons: [ReactNode, string, () => void][];
}) {
    return (
        <>
            {buttons.map(([button, title, onClick]) => <button
                key={title}
                className="property-pill property-button"
                title={title}
                onClick={onClick}>
                {button}
            </button>)}
        </>
    );
}

export function PropertyValues({values}: { values: string[] }) {
    return (
        <ul className="property-values">
            {values.map(value =>
                <li key={value}>{value}</li>)}
        </ul>
    );
}
