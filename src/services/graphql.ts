/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";
import { aemFetch } from "@/lib/aem";

// ----- Tipos base
export type BaseCF = { _path: string; __typename: string };

export type TextCF = BaseCF & {
  __typename: "TextModel";
  text?: { html?: string; plaintext?: string };
};

export type ImageWithTextCF = BaseCF & {
  __typename: "ImageWithTextModel";
  imagePath?: {
    _path?: string;
    width?: number;
    height?: number;
    mimeType?: string;
  };
  altText?: string;
};

export type ComponentItem = TextCF | ImageWithTextCF | BaseCF;

/**
 * Ejecuta la persisted query en Author (getComponentListByPath)
 * Variables: { path: listPath }
 */
export async function fetchComponentListItems(
  listPath: string
): Promise<ComponentItem[]> {
  const service = "oshynsite";
  const queryName = "getComponentListByPath";
  const path = `/graphql/execute.json/${service}/${queryName}`;

  const json = await aemFetch<any>(path, {
    method: "POST",
    body: JSON.stringify({ variables: { path: listPath } }),
  });

  const items: ComponentItem[] =
    json?.data?.componentListByPath?.item?.items ??
    json?.data?.component_listByPath?.items ??
    [];

  return items;
}
