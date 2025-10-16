import React, {ReactNode, useEffect, useRef} from 'react';

export default function PropertyCollapse({id, startCollapsed, doCollapseButtonOverride, undoCollapseButtonOverride}: {
    id: string,
    startCollapsed: boolean,
    doCollapseButtonOverride?: ReactNode,
    undoCollapseButtonOverride?: ReactNode
}) {
    const hideRef = useRef<HTMLButtonElement | null>(null);
    const showRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        toggleCollapse(startCollapsed);
    }, []);

    function toggleCollapse(hide: boolean) {
        hideRef.current!.style.display = hide ? 'none' : '';
        showRef.current!.style.display = !hide ? 'none' : '';

        const selectors = ['.property-resource', '.property-sep', '.property-prop'].map(cls => `.${id} ${cls}`);

        const elements = document.querySelectorAll(selectors.join(',')) as NodeListOf<HTMLElement>;
        for (const el of elements)
            hide ? el.classList.add('property-collapsed') : el.classList.remove('property-collapsed');
    }

    return (
        <>
            <button className="property-pill property-button"
                    title="Hide property path"
                    onClick={_ => toggleCollapse(true)}
                    ref={hideRef}>
                {doCollapseButtonOverride || '⇤ Collapse'}
            </button>

            <button className="property-pill property-button"
                    title="Show property path"
                    onClick={_ => toggleCollapse(false)}
                    ref={showRef}>
                {undoCollapseButtonOverride || '⇥ Collapse'}
            </button>
        </>
    );
}
