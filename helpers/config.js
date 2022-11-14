const config = {
  APICD_URL: "https://api-dev.nimvio.com/cda/graphql/v1",
  APIES_URL: "https://api-dev.nimvio.com/cda/es/v1",
  projectId: "Project_5b95d816-f96f-4ddf-ad39-69b5abbd2909",
  pageContentId: "Content_f01aa3bd-44ce-4069-976b-e6de2ea9b8f4",
  header: {
    navContentId: "Content_6f00a185-26b3-4664-9d77-5121aa4a199e",
    panelContentId: "Content_ad79d439-9e33-4c34-bb0a-b368c61daadf",
  },
  footer: {
    navContentId: "Content_24dce8bc-0396-4ce6-813d-cf92af57b30c",
    panelContentId: "Content_302643ae-d72b-47df-9f3f-322105b70d8b",
  },
  homeContentId: "Content_f28bc112-7746-49e1-b4b7-e17f13ef8713",
  widgets: {
    NewsListingWidget: "Content_1966dc76-fba8-40de-b8b3-bcd843665f4c",
    ResourcesWidget: "Content_8512c5c2-cec9-4b5a-9926-5781f208fea8",
  },
  headerContentId: {
    HeaderTopNavigation: "Content_ba509396-778a-4176-bd55-8cbb97065420",
    HeaderDesktopNavigation: "Content_e11c1a4a-9543-4006-b041-36b246cfe2bc",
  },
  news: {
    detailTemplateName: "MoeNewsDetailPage",
    itemPerPage: 5,
    sort: "CreatedAt",
    sortAsc: "false",
  },
};

export default config;
