import React, {ReactNode, KeyboardEvent, useEffect, useRef, useState} from 'react';
import * as Popover from '@radix-ui/react-popover';

interface SelectPopoverCommonProps<O> {
    index: number;
    getOptions: (searchValue: string) => O[];
    getOption?: (option: O) => ReactNode;
    setPropertyInPath: (idx: number, value: O) => void;
}

export default function SelectPopover<O>(
    {
        index,
        getOptions,
        getOption,
        setPropertyInPath,
        open,
        onOpenChange
    }: SelectPopoverCommonProps<O> & { open: boolean, onOpenChange: (open: boolean) => void }) {
    return (
        <Popover.Root modal open={open} onOpenChange={onOpenChange}>
            <Popover.Trigger asChild>
                <button className="property-pill property-select">
                    Select value
                </button>
            </Popover.Trigger>

            <Popover.Content className="property-popover">
                <Popover.Arrow className="property-popover-arrow"/>
                <SelectPopoverContent index={index} getOptions={getOptions} getOption={getOption}
                                      setPropertyInPath={setPropertyInPath}/>
            </Popover.Content>
        </Popover.Root>
    );
}

function SelectPopoverContent<O>({index, getOptions, getOption, setPropertyInPath}: SelectPopoverCommonProps<O>) {
    const [searchValue, setSearchValue] = useState('');
    const searchRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setSearchValue('');
        if (searchRef.current)
            searchRef.current.focus();
    }, []);

    function OnKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            const options = getOptions(searchValue);
            if (options.length > 0)
                setPropertyInPath(index, options[0]);
        }
    }

    return (
        <>
            <input type="text" value={searchValue} ref={searchRef} onKeyDown={OnKeyDown}
                   onChange={e => setSearchValue(e.target.value)}/>

            <SelectPopoverOptions index={index} getOptions={getOptions} getOption={getOption}
                                  setPropertyInPath={setPropertyInPath} searchValue={searchValue}/>
        </>
    );
}

function SelectPopoverOptions<O>(
    {
        index,
        getOptions,
        getOption,
        setPropertyInPath,
        searchValue
    }: SelectPopoverCommonProps<O> & { searchValue: string }) {
    return (
        <ul className="property-popover-options">
            {getOptions(searchValue).map(option => <li
                key={option as string}
                onClick={_ => setPropertyInPath(index, option)}>
                {getOption ? getOption(option) : option!.toString()}
            </li>)}
        </ul>
    );
}