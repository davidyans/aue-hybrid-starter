import Text from "@/components/Text";
import Image from "@/components/Image";
import Unknown from "@/components/Unknown";

// Mapea los sling:resourceType a componentes React
export const componentMap: Record<string, React.ComponentType<any>> = {
  "wknd/components/text": Text,
  "core/wcm/components/text/v2/text": Text,

  "wknd/components/image": Image,
  "core/wcm/components/image/v2/image": Image
};

export function resolveComponent(rt?: string) {
  return (rt && componentMap[rt]) || Unknown;
}