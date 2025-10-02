/* eslint-disable @typescript-eslint/no-explicit-any */
import TextCF from "@/components/TextCF";
import ImageWithTextCF from "@/components/ImageWithTextCF";
import PostCardsContainer from "@/components/PostCardsContainer";
import PostCard from "@/components/PostCard";

export default function RenderSwitch({ item }: { item: any }) {
  switch (item.__typename) {
    case "TextModel":
      return <TextCF item={item} />;
    case "ImageWithTextModel":
      return <ImageWithTextCF item={item} />;
    case "PostCardsContainerModel":
      return <PostCardsContainer item={item} />;
    case "PostCardModel":
      return <PostCard item={item} />;
    default:
      return <div>Unsupported component: {item.__typename}</div>;
  }
}