import { gql, GraphQLClient } from "graphql-request";

interface ContentResponse<TemplateData> {
  Name: string;
  ContentID: string;
  TemplateName: string;
  PublishedAt: string;
  Data: TemplateData;
}

type fetchOptions = {
  deep: Boolean;
  cache?: any;
};

const globalCache = {};

/**
 * Get Content data By ContentID
 * @param $client GraphQL client from custom graphql-request plugin
 * @param id ContentID that will be fetched
 * @param deep Fetch all reference type inside the response
 * @returns
 */
export const getContentById = async <TemplateData>(
  $client: GraphQLClient,
  id: string,
  option?: fetchOptions
): Promise<{ data: TemplateData }> => {
  try {
    const query = /* GraphQL */ `
      query getContentById {
        content(contentId: "${id}") {
          Name
          ContentID
          Data
          TemplateName
          PublishedAt
        }
      }
    `;
    const response = await $client.request<
      ContentResponse<[ContentResponse<TemplateData>]>
    >(query);
    if (option && option.deep && response[0] && response[0].Data) {
      const referenceCache = option.cache || globalCache;
      referenceCache[id] = response[0];
      const responseData = response[0].Data;
      const responseDataKey = Object.keys(responseData);
      // Recursively fetch Reference Content
      for (const key of responseDataKey) {
        if (
          typeof responseData[key] === "object" &&
          responseData[key].Type === "Reference" &&
          responseData[key].ReferenceType === "Content" &&
          Array.isArray(responseData[key].ContentIDs)
        ) {
          responseData[key] = await Promise.all(
            responseData[key].ContentIDs.map(async (contentId) => {
              if (referenceCache[contentId]) {
                return referenceCache[contentId];
              } else {
                const { data } = await getContentById($client, contentId, {
                  deep: true,
                  cache: referenceCache,
                });
                referenceCache[contentId] = data;
                return data;
              }
            })
          );
        }
      }
    }
    return { data: response[0] };
  } catch (error) {
    console.log("error fetching id ", id, error);
    console.log("error :", error);
  }
};

/**
 * Get Children Pages By ContentID, if no ContentID it will fetch all the parent pages
 * @param $client GraphQL client from custom graphql-request plugin
 * @param id ContentID that will be fetched
 * @returns
 */
export const getChildPages = async (
  $client: GraphQLClient,
  id: string,
  pageSize: number = 20
) => {
  try {
    const query = gql`
      query getContentById {
        content(contentId: "${id}", pageSize: ${pageSize}, templateName: "Page", retrieveChild:true, depth:1) {
          Name
          ContentID
          Data
          TemplateName
          PublishedAt
        }
      }
    `;
    const response = await $client.request<ContentResponse<any>[]>(query);
    return {
      data: response,
    };
  } catch (error) {
    console.log("error fetching child ", id, error);
    console.log("error :", error);
  }
};

/**
 * Get Content By Page Slug
 * @param $client GraphQL client from custom graphql-request plugin
 * @param slug Page slug that will be fetched
 * @returns
 */
export const getContentByPageSlug = async (
  $client: GraphQLClient,
  slug: string,
  option?: fetchOptions
) => {
  // TODO: Change urlPath into pageSlug after the BE is finished on updating the text slug component validation
  try {
    const query = gql`
      query getContentByPageSlug {
        content(data: {urlPath: "${slug}"}) {
          Name
          ContentID
          Data
          TemplateName
          PublishedAt
        }
      }
  `;
    const response = await $client.request<
      ContentResponse<[ContentResponse<any>]>
    >(query);
    if (option && option.deep && response[0] && response[0].Data) {
      const referenceCache = option.cache || globalCache;
      const id = response[0].ContentID;
      referenceCache[id] = response[0];
      const responseData = response[0].Data;
      const responseDataKey = Object.keys(responseData);
      // Recursively fetch Reference Content
      for (const key of responseDataKey) {
        if (
          typeof responseData[key] === "object" &&
          responseData[key].Type === "Reference" &&
          responseData[key].ReferenceType === "Content" &&
          Array.isArray(responseData[key].ContentIDs)
        ) {
          responseData[key] = await Promise.all(
            responseData[key].ContentIDs.map(async (contentId) => {
              if (referenceCache[contentId]) {
                return referenceCache[contentId];
              } else {
                const { data } = await getContentById($client, contentId, {
                  deep: true,
                  cache: referenceCache,
                });
                referenceCache[contentId] = data;
                return data;
              }
            })
          );
        }
      }
    }
    return { data: response[0] };
  } catch (error) {
    console.log("error fetching slug ", slug, error);
    console.log("error :", error);
  }
};

export const getMultipleContents = async (
  $client: GraphQLClient,
  Ids: string[]
) => {
  try {
    const promisedContents = Ids.map(async (id) => {
      const { data: content } = await getContentById($client, id);
      return content;
    });
    const response = await Promise.all(promisedContents);
    return {
      data: response,
    };
  } catch (error) {
    console.log("error fetching multipleContents ", Ids.join(", "));
    console.log("error :", error);
  }
};
