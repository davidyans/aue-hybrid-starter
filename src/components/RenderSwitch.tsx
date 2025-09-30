import TextCF from "@/components/TextCF";
import ImageWithTextCF from "@/components/ImageWithTextCF";

export default function RenderSwitch({ item }: { item: any }) {
  switch (item.__typename) {
    case "TextModel":
      return <TextCF item={item} />;
    case "ImageWithTextModel":
      return <ImageWithTextCF item={item} />;
    default:
      return <div>Unsupported component: {item.__typename}</div>;
  }
}