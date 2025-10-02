import React from "react";
// import ContainerCF from "@/components/ContainerCF";
import ImageWithTextCF from "@/components/ImageWithTextCF";
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

  return (
    <div className="style-guide">
      <h1>Style Guide</h1>
      <section className="component-section">
        <h2>Image With Text Component</h2>
        <ImageWithTextCF item={ImageWithTextContent} />
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
