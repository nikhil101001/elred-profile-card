"use client";

import axios from "axios";
import { Check, Forward, Globe, Mail, MapPin, Phone } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MiniCard = ({ user, metaData }) => {
  const handleShare = () => {
    navigator.share({
      title: metaData?.profileTitle,
      text: metaData?.description,
      url: "https://elred-profile-card.vercel.app/card",
    });
  };

  return (
    <>
      <Head>
        <title>{metaData?.profileTitle}</title>
        <meta name="description" content={metaData?.description} />
        {/* Open Graph Metadata for social media sharing */}
        <meta property="og:title" content={metaData?.profileTitle} />
        <meta property="og:description" content={metaData?.description} />
        <meta property="og:image" content={metaData?.cardImageURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData?.cardTitle} />
        <meta name="twitter:description" content={metaData?.description} />
        <meta name="twitter:image" content={metaData?.cardImageURL} />
      </Head>
      <div
        className={`h-full flex flex-col gap-4 max-w-xl mx-auto bg-[length:100%_130%] bg-[url('/background.png')] text-white items-center justify-center border rounded-xl backdrop-blur-lg p-4 w-full`}
      >
        <div className="h-[90%] w-[90%] flex flex-col items-center justify-between text-center gap-6">
          <div
            className="flex items-center justify-end gap-2 ms-auto cursor-pointer"
            onClick={handleShare}
          >
            <Forward className="bg-white/20 p-1 h-7 w-7 rounded-md" />
            <span>Share</span>
          </div>

          <div className="relative">
            <Image
              src={user?.dpURL || "/profile.png"}
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full border-blue-500 border-4"
            />
            <Check className="w-6 h-6 absolute bottom-4 right-0 bg-blue-500 rounded-full text-white p-1" />
          </div>

          <h2 className="text-2xl">
            <span className="font-bold text-4xl">{user?.firstname}</span> <br />{" "}
            {user?.lastname}
          </h2>

          {/* detail */}
          <div className="space-y-1 text-xl">
            <p>{user?.title?.[0].value}</p>
            <p>Wildcraft</p>
            <p>{user?.location?.city}</p>
          </div>

          {/* card group */}
          <Image
            src="/cardGroup.png"
            alt="CardDetail"
            width={200}
            height={200}
          />
          <Image
            src="/cardGroup2.png"
            alt="CardDetail"
            width={300}
            height={200}
          />

          {/* share items */}
          <div className="flex gap-4 items-center">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-lg px-4 text-2xl">
              S
            </div>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-lg">
              <Mail className="w-8 h-8" />
            </div>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-lg">
              <Phone className="w-8 h-8" />
            </div>
            <Link
              href={`https://maps.google.com/?q=${user?.location?.latitude},${user?.location?.longitude}`}
              target="_blank"
            >
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-lg">
                <MapPin className="w-8 h-8" />
              </div>
            </Link>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-lg">
              <Globe className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Fetch metadata and user data server-side
export async function getServerSideProps() {
  try {
    const userResponse = await axios.get("/api/userdata");
    const metaDataResponse = await axios.get("/api/metadata");

    return {
      props: {
        user: userResponse.data.result[0],
        metaData: metaDataResponse.data.result[0],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        user: {},
        metaData: {},
      },
    };
  }
}

export default MiniCard;
