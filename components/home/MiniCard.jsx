"use client";

import axios from "axios";
import { Check, Forward, Globe, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MiniCard = () => {
  const [user, setUser] = useState({});
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    axios
      .get("/api/userdata")
      .then((res) => setUser(res.data.result[0]))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    axios
      .get("/api/metadata")
      .then((res) => setMetaData(res.data.result[0]))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleShare = () => {
    if (metaData && user) {
      navigator.share({
        title: metaData?.profileTitle,
        text: metaData?.description,
        url: user?.shareProfileURL,
      });
    }
  };

  return (
    <div
      className={`min-h-full flex flex-col gap-4 max-w-xl mx-auto bg-[length:100%_130%] bg-[url('/background.png')] text-white items-center justify-center border rounded-xl backdrop-blur-lg p-4 w-full`}
    >
      <div className="w-[90%] h-full flex flex-col items-center justify-between text-center gap-6">
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
        <Image src="/cardGroup.png" alt="CardDetail" width={200} height={200} />
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
  );
};

export default MiniCard;
