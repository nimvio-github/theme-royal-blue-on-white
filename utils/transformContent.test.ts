import transformContent, {
  groupWidgets,
  appendContent2WidgetsData,
} from "./transformContent";

const content = {
  Name: "Content",
  ContentID: "XXXX",
  TemplateName: "Page",
  PublishedAt: "2015-03-25T12:00:00Z",
  Data: {
    widgets: [
      {
        Name: "Header",
        ContentID: "XXXX",
        TemplateName: "Widget",
        PublishedAt: "2015-03-25T12:00:00Z",
        Data: { placeholder: "header", Name: "Header" },
      },
      {
        Name: "Banner",
        ContentID: "XXXX",
        TemplateName: "Widget",
        PublishedAt: "2015-03-25T12:00:00Z",
        Data: { placeholder: "main", Name: "Banner" },
      },
    ],
    placeholder: "main",
    Name: "Homepage",
  },
};

describe("test group widget by Data.placeholder", () => {
  it("should return new widgets object grouped by placeholder", () => {
    const widgets = {
      header: [
        {
          Name: "Header",
          ContentID: "XXXX",
          TemplateName: "Widget",
          PublishedAt: "2015-03-25T12:00:00Z",
          Data: { placeholder: "header", Name: "Header" },
        },
      ],
      main: [
        {
          Name: "Banner",
          ContentID: "XXXX",
          TemplateName: "Widget",
          PublishedAt: "2015-03-25T12:00:00Z",
          Data: { placeholder: "main", Name: "Banner" },
        },
      ],
    };

    expect(groupWidgets(content.Data.widgets)).toStrictEqual(widgets);
  });
});

describe("test append content to widgets data", () => {
  it("should return widgets array with appended content", () => {
    const widgets = [
      {
        Name: "Content",
        ContentID: "XXXX",
        TemplateName: "Page",
        PublishedAt: "2015-03-25T12:00:00Z",
        Data: {
          placeholder: "main",
          Name: "Homepage",
        },
      },
      {
        Name: "Header",
        ContentID: "XXXX",
        TemplateName: "Widget",
        PublishedAt: "2015-03-25T12:00:00Z",
        Data: { placeholder: "header", Name: "Header" },
      },
      {
        Name: "Banner",
        ContentID: "XXXX",
        TemplateName: "Widget",
        PublishedAt: "2015-03-25T12:00:00Z",
        Data: { placeholder: "main", Name: "Banner" },
      },
    ];

    expect(appendContent2WidgetsData(content)).toStrictEqual(widgets);
  });
});

describe("test add group widgets to content", () => {
  it("should return new content with widgets property", () => {
    const newContent = {
      Name: "Content",
      ContentID: "XXXX",
      TemplateName: "Page",
      PublishedAt: "2015-03-25T12:00:00Z",
      widgets: {
        header: [
          {
            Name: "Header",
            ContentID: "XXXX",
            TemplateName: "Widget",
            PublishedAt: "2015-03-25T12:00:00Z",
            Data: { placeholder: "header", Name: "Header" },
          },
        ],
        main: [
          {
            Name: "Content",
            ContentID: "XXXX",
            TemplateName: "Page",
            PublishedAt: "2015-03-25T12:00:00Z",
            Data: { placeholder: "main", Name: "Homepage" },
          },
          {
            Name: "Banner",
            ContentID: "XXXX",
            TemplateName: "Widget",
            PublishedAt: "2015-03-25T12:00:00Z",
            Data: { placeholder: "main", Name: "Banner" },
          },
        ],
      },
      Data: {
        widgets: [
          {
            Name: "Header",
            ContentID: "XXXX",
            TemplateName: "Widget",
            PublishedAt: "2015-03-25T12:00:00Z",
            Data: { placeholder: "header", Name: "Header" },
          },
          {
            Name: "Banner",
            ContentID: "XXXX",
            TemplateName: "Widget",
            PublishedAt: "2015-03-25T12:00:00Z",
            Data: { placeholder: "main", Name: "Banner" },
          },
        ],
        placeholder: "main",
        Name: "Homepage",
      },
    };

    expect(transformContent(content)).toStrictEqual(newContent);
  });
});
