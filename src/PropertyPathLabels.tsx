import React from 'react';
import './style.css';

export default function PropertyPathLabels({labels, className}: { labels: string[], className?: string }) {
    return (
        <div className={'property' + (` ${className}` || '')}>
            {labels.map((label, idx) => <div key={idx} className="property-pill property-resource">
                {label}
            </div>)}
        </div>
    );
}
