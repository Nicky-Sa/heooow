"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SubmitNameModal from "@/components/SubmitNameModal";
import { classNames } from "@/utils/functions";
import Image from "next/image";

const PlayPage = () => {
  const router = useRouter();
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(true);
  const [hasWon, setHasWon] = useState(false);
  const audio = new Audio("/sound2.5.mp3");
  audio.loop = true;
  document.body.onkeyup = function (e) {
    if (e.key === " " || e.code === "Space") {
      playGame();
    }
  };

  const playGame = () => {
    if (!playing) {
      audio.loop = true;
      const character =
        document.getElementById("character")?.getBoundingClientRect().bottom ??
        0;
      const ground =
        document.getElementById("ground")?.getBoundingClientRect().y ?? 0;
      audio.play();
      setPlaying(true);

      console.log(ground - character);

      if (ground - character < 45) {
        setHasWon(true);
      }
      setTimeout(async () => {
        setPlaying(false);
        audio.loop = false;

        if (!localStorage.getItem("name")) {
          setOpen(true);
        } else {
          await router.push(`/result?hasWon=${ground - character < 45}`);
        }
      }, 8000);
    }
  };

  return (
    <div
      className={
        "pattern min-h-screen overflow-hidden bg-g-500 flex flex-col justify-between items-center"
      }
    >
      <img
        src={"/background/main.png"}
        alt={"logo"}
        className={"max-w-lg sm:max-w-2xl -mt-24 "}
      />

      <div
        className={"flex flex-col justify-center items-center w-full pb-10 "}
      >
        {open ? (
          <img
            src={"/character/sleeping.png"}
            className={"max-w-[12rem] -mb-1 z-10"}
            alt={""}
          />
        ) : (
          <img
            src={"/character/moving.png"}
            id={"character"}
            className={"max-w-[12rem] z-10 animate-MoveUpDown"}
            alt={"character"}
          />
        )}

        <div
          className={"bg-g-100 h-1 rounded w-full lg:w-1/2 mb-6 "}
          id={"ground"}
        />
        <img
          src={"/tip.png"}
          className={classNames(
            playing ? "opacity-0" : "",
            "transition-all duration-300 hidden sm:block max-w-[12rem] mb-4"
          )}
          alt={""}
        />

        <button
          className={classNames(
            playing ? "btn-outline" : "btn-primary",
            "transition-all duration-300 flex flex-row gap-2 items-center justify-center"
          )}
          onClick={playGame}
          disabled={playing}
        >
          <p>{playing ? "You're playing..." : "Start"}</p>
          <Image
            src={"/icons/PartyingFace.png"}
            alt={"party face icon"}
            width={"24"}
            height={"24"}
          />
        </button>
      </div>
      <SubmitNameModal isOpen={open} setIsOpen={setOpen} hasWon={hasWon} />
    </div>
  );
};

export default PlayPage;
