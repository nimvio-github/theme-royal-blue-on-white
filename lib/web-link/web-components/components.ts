import { CustomElement } from "./abstract/CustomElement";
// import { AddButtonElement } from './AddButtonElement';
import { ContainerElement } from "./ContainerElement";
import { ButtonElement } from './ButtonElement';
import { IconElement } from './IconElement';
import { TooltipElement } from './TooltipElement';
import { HighlightElement } from "./HighlightElement";
// import { PopoverElement } from './PopoverElement';

declare global {
  interface HTMLElementTagNameMap {
    [IconElement.is]: IconElement;
    [ButtonElement.is]: ButtonElement;    
    [HighlightElement.is]: HighlightElement;
    [ContainerElement.is]: ContainerElement;
    [TooltipElement.is]: TooltipElement;
  }
}

const webComponents: ReadonlyArray<typeof CustomElement> = [
  IconElement,
  ButtonElement,
  HighlightElement,
  ContainerElement,
];

const webComponentTags: ReadonlyArray<string> = webComponents.map((component) => component.is);

/**
 * Define all web components if it is possible.
 *
 * @returns {Promise<void[]>}
 */
export function defineAllRequiredWebComponents(): Promise<void[]> {
  const allDefined = webComponents.map((webComponent) => webComponent.define());
  return Promise.all(allDefined);
}


/**
 * Check if element is a web component based on its tag name.
 *
 * @param {HTMLElement} element
 * @returns {boolean}
 */
 export function isElementWebComponent(element: HTMLElement): boolean {
  return webComponentTags.includes(element.tagName.toLowerCase());
}

