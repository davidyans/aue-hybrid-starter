import React from "react";
// import ContainerCF from "@/components/ContainerCF";
import ImageWithTextCF from "@/components/ImageWithTextCF";
import TextCF from "@/components/TextCF";
import PostCardsContainer from "@/components/PostCardsContainer";
import PostCard from "@/components/PostCard";
// import RenderSwitch from "@/components/RenderSwitch";

const StyleGuide = () => {
  const ImageWithTextContent = {
    _path: "/content/dam/wknd/cfs/dummy-image",
    __typename: "ImageWithTextModel",
    imagePath: {
      _path: "/next.svg",
    },
    altText: "This is a sample description for the image.",
  } as const;

  const TextCFContent = {
    _path: "/content/dam/wknd/cfs/dummy-text",
    __typename: "TextModel",
    text: {
      html: "<p>This is a sample text for the TextCF component. You can use this to demonstrate typography and text styles.</p>",
      plaintext:
        "This is a sample text for the TextCF component. You can use this to demonstrate typography and text styles.",
    },
  } as const;

  const postCards = [
    {
      _path: "/content/dam/wknd/cfs/post-1",
      title: "First Post",
      description: {
        html: "<p>This is the description for the first post.</p>",
        plaintext: "This is the description for the first post.",
      },
      imagePath: { _path: "/first-post.jpg" },
    },
    {
      _path: "/content/dam/wknd/cfs/post-2",
      title: "Second Post",
      description: {
        html: "<p>This is the description for the second post.</p>",
        plaintext: "This is the description for the second post.",
      },
      imagePath: { _path: "/second-post.jpg" },
    },
  ];

  return (
    <div className="style-guide">
      <h1>Style Guide</h1>
      <section className="component-section">
        <h2>Image With Text Component</h2>
        <ImageWithTextCF item={ImageWithTextContent} />
      </section>
      <section className="component-section">
        <h2>TextCF Component</h2>
        <TextCF item={TextCFContent} />
      </section>
      <section className="component-section">
        <h2>PostCardContainer Component</h2>
        <PostCardsContainer
          item={{
            _path: "/content/dam/wknd/cfs/post-cards-container",
            title: "Sample Post Cards",
            items: postCards,
          }}
        >
          {/* The PostCardsContainer component renders its items prop internally,
          so we don't need to pass children explicitly here. */}
        </PostCardsContainer>
      </section>
      <section className="component-section md:w-1/2">
        <h2>Container Component</h2>
        {/* <ContainerCF
          listPath="/content/dam/wknd/cfs/component-list-1"
          filterId="cf-components"
          label="Main container"
        >
          <RenderSwitch key={dummyItem._path} item={dummyItem} />
        </ContainerCF> */}
      </section>
      {/* Add more components and guidelines as needed */}
    </div>
  );
};

export default StyleGuide;
