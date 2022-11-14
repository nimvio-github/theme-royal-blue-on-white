import {
  getHighlightTypeForElement,
  HighlightType,
} from "../utils/customElements";
import { createTemplateForCustomElement } from "../utils/node";
import { parseEditButtonDataAttributes } from "../utils/dataAttributes";
import { isInsideIFrame } from "../lib/IFrameCommunicator";
import { ButtonType, ButtonElement } from "./ButtonElement";
import { IconName } from "./IconElement";
import {
  ElementPositionOffset,
  PositionedElement,
} from "./abstract/PositionedElement";
import { Colors } from "./tokens/colors";
import { Shadows } from "./tokens/shadows";
import { BaseZIndex } from "./constants/zIndex";

const templateHTML = `
  <style>
    :host,
    :host * {
      box-sizing: border-box;
    }
    
    :host {
      display: block;
      position: absolute;
      pointer-events: none;
      touch-action: none;
      min-height: 40px;
      min-width: 40px;
      width: 100%;
      height: 100%;
      border: 2px dashed !important;
      border-color: var(--ksl-color-primary-transparent, ${Colors.PrimaryTransparent}) !important;
      border-radius: 5px;
    }
    
    :host([hidden]) {
      display: none;
    }
    
    :host(:hover),
    :host([selected]) {
      border-color: var(--ksl-color-primary, ${Colors.Primary}) !important;
      z-index: calc(var(--ksl-z-index, ${BaseZIndex}) + 10);
    }
    
    :host(:focus) {
      outline: none;
    }

    :host([selected]) .ksl-highlight__toolbar,
    :host(:hover) .ksl-highlight__toolbar {
      visibility: visible;
    }
    
    .ksl-highlight__toolbar {
      visibility: hidden;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      pointer-events: all;
      touch-action: auto;
      min-height: 40px;
      max-height: 40px;
      border-radius: 8px;
      background-color: var(--ksl-color-background-default, ${Colors.BackgroundDefault});
      z-index: var(--ksl-z-index, ${BaseZIndex});
      padding: 8px;
      box-shadow: var(--ksl-shadow-default, ${Shadows.Default});
    }
    
    .ksl-highlight__toolbar:hover {
      z-index: calc(var(--ksl-z-index, ${BaseZIndex}) + 10);
    }
    
    .ksl-highlight__toolbar-button + .ksl-highlight__toolbar-button {
      margin-left: 4px;
    }
  </style>
  <div id="ksl-toolbar" class="ksl-highlight__toolbar">
    <ksl-button 
      id="ksl-edit" 
      class="ksl-highlight__toolbar-button"
      type="${ButtonType.Quinary}"
      tooltip-position="${ElementPositionOffset.BottomEnd}"
    >
      <ksl-icon icon-name="${IconName.Edit}" />
    </ksl-button>
  </div>
`;

export class HighlightElement extends PositionedElement {
  public static get is() {
    return "ksl-highlight" as const;
  }

  public get type(): HighlightType {
    return getHighlightTypeForElement(this.targetRef);
  }

  public get selected(): boolean {
    return this.hasAttribute("selected");
  }

  public set selected(value: boolean) {
    this.updateAttribute("selected", value);
  }

  private readonly editButtonRef: ButtonElement;

  constructor() {
    super();

    // @ts-ignore
    this.editButtonRef = this.shadowRoot.querySelector(
      "#ksl-edit"
    ) as ButtonElement;
  }

  public static initializeTemplate(): HTMLTemplateElement {
    return createTemplateForCustomElement(templateHTML);
  }

  private static getEditButtonTooltip(type: HighlightType): string {
    switch (type) {
      case HighlightType.Element:
        return "Edit element";

      case HighlightType.ContentComponent:
        return "Edit component";

      case HighlightType.ContentItem:
        return "Edit item";

      default:
        return "Edit";
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();

    this.editButtonRef.addEventListener("click", this.handleEditButtonClick);
  }

  public disconnectedCallback(): void {
    super.connectedCallback();

    this.editButtonRef.removeEventListener("click", this.handleEditButtonClick);
    this.unregisterTargetNodeListeners();
  }

  public attachTo = (node: HTMLElement): void => {
    this.unregisterTargetNodeListeners();

    super.attachTo(node);

    const type = this.type;
    this.hidden = type === HighlightType.None;
    this.editButtonRef.tooltipMessage =
      HighlightElement.getEditButtonTooltip(type);

    if (this.targetRef) {
      this.targetRef.addEventListener(
        "mousemove",
        this.handleTargetNodeMouseEnter
      );
      this.targetRef.addEventListener(
        "mouseleave",
        this.handleTargetNodeMouseLeave
      );
      this.targetRef.addEventListener("click", this.handleEditButtonClick);
    }
  };

  public adjustPosition = (): void => {
    if (!this.targetRef || !this.offsetParent) {
      return;
    }

    const offsetParentRect = this.offsetParent.getBoundingClientRect();
    const targetRect = this.targetRef.getBoundingClientRect();

    this.style.top = `${targetRect.top - offsetParentRect.top}px`;
    this.style.left = `${targetRect.left - offsetParentRect.left}px`;

    this.style.width = `${targetRect.width}px`;
    this.style.height = `${targetRect.height}px`;
  };

  private unregisterTargetNodeListeners = (): void => {
    if (this.targetRef) {
      this.targetRef.removeEventListener(
        "mousemove",
        this.handleTargetNodeMouseEnter
      );
      this.targetRef.removeEventListener(
        "mouseleave",
        this.handleTargetNodeMouseLeave
      );
      this.targetRef.removeEventListener("click", this.handleEditButtonClick);
    }
  };

  private handleTargetNodeMouseEnter = (): void => {
    this.selected = true;
  };

  private handleTargetNodeMouseLeave = (): void => {
    this.selected = false;
  };

  private handleEditButtonClick = (event: MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    // @ts-ignore
    const dataAttributes = parseEditButtonDataAttributes(this.targetRef);
    if (!isInsideIFrame()) {
      // The URL below should be generated from parsed data attributes. Refer to https://github.com/Kentico/kontent-smart-link
      // Currently the URL is hardcoded for PoC purpose
      const url = `https://app-dev.nimvio.com/content-management/structure/edit/${dataAttributes.itemId}?project_id=${dataAttributes.projectId}`;
      // @ts-ignore
      window.open(url, "_blank").focus();
    } else {
      const message = {
        type: "open content",
        data: {
          ...dataAttributes,
        },
        from: "nimvio-live-preview",
      };
      window.parent.postMessage(message, "*");
    }
  };
}
