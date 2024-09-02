import axios from "axios";
import React from "react";

export async function generateMetadata() {
  try {
    const res = await axios.get(`http://localhost:3000/api/metadata`);

    const metaData = res.data.result[0];

    console.log(metaData);

    return {
      title: metaData?.profileTitle || "Default Title",
      description: metaData?.description || "Default Description",
      openGraph: {
        title: metaData?.profileTitle || "Default Title",
        description: metaData?.description || "Default Description",
        images: [
          {
            url: metaData?.cardImageURL || "/default-image.png",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: metaData?.profileTitle || "Default Title",
        description: metaData?.description || "Default Description",
        images: [metaData?.cardImageURL || "/default-image.png"],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);

    // Return default metadata if there's an error
    return {
      title: "error",
      description: "Default Description",
    };
  }
}

const CardLayout = ({ children }) => {
  return <>{children}</>;
};

export default CardLayout;
