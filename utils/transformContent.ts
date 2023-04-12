import groupBy from "lodash/groupBy";
import omit from "lodash/omit";
import clone from "lodash/clone";
import uniq from "lodash/uniq";

type WidgetsData = Array<ContentResponse<any>>;
type WidgetsGroup = Object;

interface DataWidgets {
  placeholder: string;
  templates: Array<any>;
  widgets: WidgetsData;
}

interface NewContentResponse extends ContentResponse<DataWidgets> {
  widgets: WidgetsGroup;
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
  let { widgets } = content.Data;
  // Handle empty widgets content on initial page creation
  if (!Array.isArray(widgets)) {
    widgets = [];
  }

  // Only push widgets if templates is not empty
  const { templates } = content.Data;
  let widgetsFromTemplates = [];
  if (templates && templates[0]) {
    widgetsFromTemplates = templates[0].Data.widgets;
  }

  // cloned content while omitting the Data.widgets then add to the begining of widgets array
  // merged all widgets data with widgets that come from templates
  const allWidgets = [
    omit(omit(clone(content), "Data.widgets"), "Data.templates"),
    ...widgets,
    ...widgetsFromTemplates,
  ];

  return uniq(allWidgets);
}

/**
 * Transform the existing Content by adding a group widgets to be rendered by Component Renderer
 * @param content Nimvio content
 * @returns New content response object that extends content response
 */
export default function transformContent(
  content: ContentResponse<DataWidgets>
): NewContentResponse {
  const widgets = groupWidgets(appendContent2WidgetsData(content));
  return { ...content, widgets };
}
