"use client";

import {Color} from "@/types/canvas";
import {rgbToHexColor} from "@/lib/utils";

interface ColorPickerProps {
    onChange: (color: Color) => void;
}

const ColorPicker = ({
                         onChange
                     }: ColorPickerProps) => {
    return (
        <div className={'flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200'}>
            <ColorButton
                color={{r: 243, g: 82, b: 35}}
                onClick={onChange}/>

            <ColorButton
                color={{r: 233, g: 15, b: 44}}
                onClick={onChange}/>

            <ColorButton
                color={{r: 68, g: 202, b: 99}}
                onClick={onChange}/>

            <ColorButton
                color={{r: 39, g: 142, b: 237}}
                onClick={onChange}/>

            <ColorButton
                color={{r: 220, g: 174, b: 58}}
                onClick={onChange}/>

            <ColorButton
                color={{r: 34, g: 170, b: 200}}
                onClick={onChange}/>

            <ColorButton
                color={{r: 0, g: 0, b: 0}}
                onClick={onChange}/>

            <ColorButton
                color={{r: 255, g: 255, b: 255}}
                onClick={onChange}/>
        </div>
    );
};

interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
}

const ColorButton = ({
                         onClick,
                         color
                     }: ColorButtonProps) => {
    return (
        <button
            className={'w-8 h-8 items-center flex justify-center hover:opacity-75 transition'}
            onClick={() => onClick(color)}
        >
            <div className={'h-8 w-8 rounded-md border border-neutral-300'}
                 style={{
                     backgroundColor: `${rgbToHexColor(color)}`,
                 }}
            />
        </button>
    );
};
export default ColorPicker;
