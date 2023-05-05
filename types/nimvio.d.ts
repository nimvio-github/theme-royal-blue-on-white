interface ContentResponse<TemplateData> {
  Name: string;
  ContentID: string;
  TemplateName: string;
  PublishedAt: string;
  Data: TemplateData;
}
