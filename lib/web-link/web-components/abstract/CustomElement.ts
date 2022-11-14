// Custom elements API as well as all Web Component definitions can only be run in a browser environment,
// because they require build-in browser APIs, which are not available on the backend (during SSR).
// There are several libraries that allow server-side rendering of Web Components. It is usually done by
// redefining the whole DOM API on the backend. For the purpose of this SDK it is not required to
// support server-side rendering of Web Components, because whole page must be loaded for SDK to work properly.
// However, some SSR frameworks (such as Next.js) will try to run this code on the server side first during SSR,
// which could result in a crash because HTMLElement is not defined on the backend. That is why we are setting
// this property to null in a global Nodejs scope.
const isNotInBrowser = typeof window === 'undefined';
if (isNotInBrowser) {
  // eslint-disable-next-line
  // @ts-ignore: required to support SSR frameworks
  global['HTMLElement'] = null;
}

export abstract class CustomElement extends HTMLElement {
  private static _template: HTMLTemplateElement | null = null;

  /**
   * Name of the custom element that will be added to the CustomElementRegistry.
   * This name will be used to add a custom element to the page.
   *
   * @type {string}
   */
   public static get is(): string {
    throw function() {console.log('test is')};
  }

  /**
   * Template is usually stored in the scope of custom element file, but this does not work with SSR,
   * since `document` is not available on the backend. That is why we are storing the template in a static
   * constructor property and initialize it when we are sure we are in a browser environment.
   *
   * @type {HTMLTemplateElement}
   */
   protected static get template(): HTMLTemplateElement {
    if (!this._template) {
      this._template = this.initializeTemplate();
    }
    return this._template;
  }

    
  protected constructor() {
    super();

    const selfClass = Object.getPrototypeOf(this).constructor;
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(selfClass.template.content.cloneNode(true));
  }

  public static define(): Promise<void> {
    // The 'this' keyword refers to current constructor in static methods.
    // Conversion to unknown is needed so that we can explicitly converse
    // this class to CustomElementConstructor.
    const self = this as unknown;
    
    customElements.define(this.is, self as CustomElementConstructor);

    return Promise.resolve();
  }

  /**
   * Initialize a template for the custom element.
   * Each KSL custom element class should implement this static method.
   *
   * @returns {HTMLTemplateElement}
   */
   protected static initializeTemplate(): HTMLTemplateElement {
    throw function() {console.log('test initializeTemplate')};
  }  

  /**
   * Update attribute value on the custom element.
   *
   * @param {string} attributeName
   * @param {string | number | boolean | null} attributeValue
   */
   protected updateAttribute(attributeName: string, attributeValue: string | number | boolean | null): void {
    if (attributeValue) {
      this.setAttribute(attributeName, attributeValue.toString());
    } else {
      this.removeAttribute(attributeName);
    }
  }  
}
