// Utils
export function isInsideIFrame(): boolean {
  return window.self !== window.top;
}

export class IFrameCommunicator {
  public onChangeHandler = [];
  public initialize(): void {
    if (typeof window === "undefined") {
      return;
    }
    // Send initial message
    window.parent.postMessage(
      {
        from: "nimvio-live-preview",
        type: "init",
      },
      "*"
    );
    window.addEventListener("message", this.onMessage, true);
  }

  private onMessage = (event: MessageEvent): void => {
    if (!event.data) return;
    const { type, data, metadata } = event.data;
    // Handle message
    console.log("retreived message", type);
    console.log("retreived message data", data);
    console.log("retreived message metadata", metadata);
    if (type === "change") {
      this.onChangeHandler.forEach((callback) => callback(data));
    }
  };

  public addOnChangeHandler = (callback) => {
    this.onChangeHandler.push((data) => callback(data));
  };
}
