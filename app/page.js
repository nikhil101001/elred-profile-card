"use client";

import axios from "axios";
import { BriefcaseBusiness, Check, MapPin, Share2, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MiniCard from "@/components/home/MiniCard";

export default function Home() {
  const [user, setUser] = useState({});
  const [metaData, setMetaData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        url: "https://elred-profile-card.vercel.app/card",
      });
    }
  };

  const handleMiniCardClick = () => {
    console.log("clicked");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-full flex flex-col gap-4 border max-w-xl mx-auto bg-cover bg-[url('/background.png')] text-white">
      <header className="bg-white/20 p-8 font-semibold backdrop-blur-lg">
        Profile
      </header>

      <div className="flex flex-col gap-8 p-8">
        {/* user detail */}
        <div className="flex flex-col gap-4">
          <Image
            src={user?.dpURL || "/profile.png"}
            alt="Profile"
            width={60}
            height={60}
            className="rounded-full"
          />

          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <span>
              {user?.firstname} {user?.lastname}
            </span>
            <Check className="w-6 h-6 bg-blue-500 rounded-full text-white p-1" />
          </h1>

          <div className="flex flex-col gap-1">
            <div className="flex item-center gap-x-2">
              <BriefcaseBusiness className="w-5" />
              <p>{user?.title?.[0].value}</p>
            </div>

            <Link
              href={`https://maps.google.com/?q=${user?.location?.latitude},${user?.location?.longitude}`}
              target="_blank"
            >
              <div className="flex item-center gap-x-2 cursor-pointer">
                <MapPin className="w-5" />
                <p>{user?.location?.city}</p>
              </div>
            </Link>
          </div>
        </div>

        {/* minicard */}
        <div
          className="w-fit scale-[0.2] -m-60 -mx-28 cursor-pointer"
          onClick={handleMiniCardClick}
        >
          <MiniCard />
        </div>

        {/* share */}
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/20 backdrop-blur-lg gap-1">
          <div
            className="bg-white/20 p-2 rounded-full backdrop-blur-lg cursor-pointer"
            onClick={handleShare}
          >
            <Share2 className="w-6 h-6" />
          </div>
          <p className="text-sm">Share</p>
        </div>

        {/* Ratings */}
        <div className="flex flex-col justify-center items-center p-6 rounded-xl bg-white/20 backdrop-blur-lg relative font-normal">
          <div className="bg-white/20 p-2 rounded-full absolute -top-5 mx-auto backdrop-blur-lg">
            <Star className="w-6 h-6 fill-white" />
          </div>
          <p className="me-auto pb-4 text-lg">Ratings</p>

          <div className="space-y-4">
            <div className="flex gap-8 border-b border-white/20 p-2 me-auto items-center">
              <p className="text-2xl">57</p>
              <p>Has ethical code of conduct and is safe to do bussines with</p>
            </div>

            <div className="flex gap-8 p-2 me-auto items-center">
              <p className="text-2xl">27</p>
              <p>Met In real life/Video call</p>
            </div>
          </div>
        </div>

        {/* Comments section */}
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/20 backdrop-blur-lg gap-1">
          <div className="w-full flex items-center justify-between gap-2 mb-4">
            <p className="text-lg">Comments</p>
            <p className="text-sm">See all</p>
          </div>

          {/* comments */}
          <div className="me-auto max-h-52 overflow-y-auto w-full">
            {Array.from({ length: 10 }).map((_, i) => (
              <div className="flex gap-4 items-center w-full" key={i}>
                <Image
                  src="/profile.png"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-sm max-w-xs">
                    Gwen Stacy{" "}
                    <span className="text-gray-200">
                      See you in the next event
                    </span>{" "}
                    @roger vaccaro
                  </p>

                  <div className="flex gap-2 items-center">
                    <p className="text-sm text-gray-200">1s</p>
                    <p className="text-sm text-gray-200">241 Likes</p>
                    <p className="text-sm text-gray-200">Reply</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 rounded-xl max-w-lg mx-auto relative">
            {/* Modal Content */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white"
            >
              X
            </button>

            <MiniCard />
          </div>
        </div>
      )}
    </main>
  );
}
