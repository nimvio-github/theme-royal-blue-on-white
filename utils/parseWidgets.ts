import groupBy from "lodash/groupBy";

interface DataWidgets {
  widgets: Array<any>;
}

/**
 * Parse widgets from Nimvio content and group by its placeholder
 * @param raw Nimvio content
 * @returns
 */
export default function parseWidgets(raw: ContentResponse<DataWidgets>) {
  const widgets = groupBy(raw.Data.widgets, "Data.placeholder");

  return { ...raw, widgets };
}
