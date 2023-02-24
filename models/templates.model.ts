type Template<TemplateData> = {
  TemplateName: String;
  Name: String;
  PublishedAt: String;
  ContentID: String;
  Data: TemplateData;
};

type FontData = {
  webFontName: String;
  linkUrl: String;
};

export type FontTemplate = Template<FontData>;

type StyleData = {
  styleName: String;
  internalCss: String;
  externalCss: String;
  fonts: FontTemplate[];
};

export type StyleTemplate = Template<StyleData>;

export type StylesData = {
  stylesName: String;
  styles: StyleTemplate[];
};

export type StylesTemplate = Template<StylesData>;
