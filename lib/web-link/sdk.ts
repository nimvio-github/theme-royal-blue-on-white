import { NodeWebLinkProvider } from "./lib/WebLinkProvider";
import { defineAllRequiredWebComponents } from "./web-components/components";
import { QueryParamPresenceWatcher } from "./lib/QueryParamPresenceWatcher";
import { IFrameCommunicator, isInsideIFrame } from "./lib/IFrameCommunicator";

class WebLinkSDK {
  public readonly nodeWebLink: NodeWebLinkProvider;
  private readonly queryParamPresenceWatcher: QueryParamPresenceWatcher;
  private readonly iframeCommunicator: IFrameCommunicator;

  constructor() {
    this.queryParamPresenceWatcher = new QueryParamPresenceWatcher();
    this.nodeWebLink = new NodeWebLinkProvider();
    this.iframeCommunicator = new IFrameCommunicator();

    this.init();
  }

  public init = async (): Promise<void> => {
    await defineAllRequiredWebComponents();

    // The 'preview' query should not be hardcoded, it should be set from configuration manager
    // Reference: https://github.com/Kentico/kontent-smart-link/blob/master/src/sdk.ts#L63
    this.queryParamPresenceWatcher.watch("preview", this.nodeWebLink.toggle);
    // Initialize IFrameCommunicator
    if (isInsideIFrame()) {
      this.iframeCommunicator.initialize();
      this.addOnChangeHandler = this.iframeCommunicator.addOnChangeHandler;
    }
  };

  public addOnChangeHandler = (callback) => {
    this.iframeCommunicator.addOnChangeHandler(callback);
  };

  public destroy = (): void => {
    this.queryParamPresenceWatcher.unwatchAll();
    this.nodeWebLink.destroy();
  };
}

class WebLink {
  private static instance: WebLink;
  private sdk: WebLinkSDK | null = null;

  public static init() {
    if (!WebLink.instance) {
      WebLink.instance = new WebLink();
    }

    if (!WebLink.instance.sdk) {
      WebLink.instance.sdk = new WebLinkSDK();
    }

    return WebLink.instance;
  }

  public destroy = (): void => {
    this.sdk?.destroy();
    this.sdk = null;
  };

  public addOnChangeHandler = (callback) => {
    this.sdk.addOnChangeHandler(callback);
  };
}

export default WebLink;
