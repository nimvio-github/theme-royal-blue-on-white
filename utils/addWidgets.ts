import { groupBy, omit, clone } from "lodash";

type WidgetsData = Array<ContentResponse<any>>;
type WidgetsGroup = Object;

interface DataWidgets {
  placeholder: string;
  widgets: WidgetsData;
}

interface NewContentResponse extends ContentResponse<DataWidgets> {
  widgets: WidgetsGroup;
}

/**
 * Add widgets to Nimvio content
 * @param raw Nimvio content
 * @returns
 */
export default function addWidgets(
  raw: ContentResponse<DataWidgets>
): NewContentResponse {
  const widgets = groupBy(raw.Data.widgets, "Data.placeholder");

  return { ...raw, widgets };
}

/**
 * Group widgets based by Data.placeholder
 * @param widgetsData widgets from content.Data.widgets
 * @returns New widgets object grouped by placeholder
 */
export function groupWidgets(widgetsData: WidgetsData): WidgetsGroup {
  const widgets = groupBy(widgetsData, "Data.placeholder");
  return widgets;
}

/**
 * Append content to content.Data.widgets
 * @param content Nimvio content
 * @returns Array of widget object with new object added from content
 */
export function appendContent2WidgetsData(
  content: ContentResponse<DataWidgets>
): Array<ContentResponse<any>> {
  const { widgets } = content.Data;

  // cloned content while omitting the Data.widgets then add to the begining of widgets array
  return [omit(clone(content), "Data.widgets"), ...widgets];
}

/**
 * Add group widgets to Nimvio content
 * @param content Nimvio content
 * @returns New content object that extends content response
 */
export function addGroupWidgets2Content(content: ContentResponse<DataWidgets>) {
  const widgets = groupWidgets(appendContent2WidgetsData(content));
  return { ...content, widgets };
}
