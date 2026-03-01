import { Type } from "@angular/core";

export interface AppModalInterface {
    name: string,
    image: string,
    modalTitle?: string,
    file?: any,
    linksSelected?: string[]
}

export interface WindowState {
    id: number | undefined,
    isOpen: boolean;
    isMinimized: boolean;
    isSelected: boolean;
    onBackground: boolean;
    lastDragPosition: { x: number, y: number },
    dragPosition: { x: number, y: number };
    maximazed?: boolean,
    xSize?: string;
    lastXSize?: string;
    ySize?: string;
    lastYSize?: string;
    zIndex?: number;
    component?: Type<any>
    appInfo: AppModalInterface,
}

export type WindowsApps = Record<string, WindowState>;
