import React, {ReactNode, useEffect, useRef, useState} from 'react';
import * as Popover from '@radix-ui/react-popover';

export default function SelectPopover<O>({index, getOptions, getOption, setPropertyInPath}: {
    index: number,
    getOptions: (searchValue: string) => O[],
    getOption?: (option: O) => ReactNode,
    setPropertyInPath: (idx: number, value: O) => void
}) {
    const searchRef = useRef<HTMLInputElement | null>(null);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setSearchValue('');
        if (searchRef.current)
            searchRef.current.focus();
    }, []);

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className="property-pill property-select">
                    Select value
                </button>
            </Popover.Trigger>

            <Popover.Content className="property-popover">
                <Popover.Arrow className="property-popover-arrow"/>

                <input type="text" value={searchValue} ref={searchRef}
                       onChange={e => setSearchValue(e.target.value)}/>

                <ul className="property-popover-options">
                    {getOptions(searchValue).map(option => <li
                        key={option as string}
                        onClick={_ => setPropertyInPath(index, option)}>
                        {getOption ? getOption(option) : option!.toString()}
                    </li>)}
                </ul>
            </Popover.Content>
        </Popover.Root>
    );
}
