"use client";

import React, { useEffect, useRef, useState } from "react";

// Components

import MarqueeCoinsSkeleton from "@/components/ui/core/skeletons/MarqueeCoinsSkeleton";
import MarqueeCoinBox from "@/components/ui/core/MarqueeCoinBox";

// Constants

import { SYMBOLS_NAMES_CLIENT } from "@/constants/coin/endpoints";
import { DEFAULT_COIN_IMAGE } from "@/constants/coin/default";

// Functions

import { cn } from "@/libs/cn";

// Hooks

import { usePostFetch } from "@/libs/api/usePostFetch";

// Interfaces

import { Symbol, ApiResponse, MarqueeCoinsProps } from "@/Interfaces/coin";

const MarqueeCoins: React.FC<MarqueeCoinsProps> = ({ className }) => {
  // States

  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [priority, setPriority] = useState<number>(2);

  // Refs

  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const marquee2Ref = useRef<HTMLDivElement | null>(null);

  // Hooks

  const { error, isLoading, mutate } = usePostFetch<ApiResponse>(
    {
      endPoint: SYMBOLS_NAMES_CLIENT,
      body: { action: "symbolsName", priority },
      route: "/coin/marquee",
    },
    { onSuccess: (res) => setSymbols(res.data || []) }
  );

  // Functions

  const handleClick = (row: Symbol) => console.log("Clicked:", row);

  const getImageSrc = (row: Symbol): string => {
    return row?.local_image || row?.logo || DEFAULT_COIN_IMAGE;
  };

  useEffect(() => {
    const interval = setInterval(() => mutate(), 25000);
    return () => clearInterval(interval);
  }, [mutate]);

  useEffect(() => {
    if (!marqueeRef.current || !marquee2Ref.current) return;
    const width = marqueeRef.current.scrollWidth;
    const speed = 100;
    const duration = width / speed;
    marqueeRef.current.style.animationDuration = `${duration}s`;
    marquee2Ref.current.style.animationDuration = `${duration}s`;
  }, [symbols]);

  const handlePause = () => {
    if (marqueeRef.current && marquee2Ref.current) {
      marqueeRef.current.style.animationPlayState = "paused";
      marquee2Ref.current.style.animationPlayState = "paused";
    }
  };
  const handlePlay = () => {
    if (marqueeRef.current && marquee2Ref.current) {
      marqueeRef.current.style.animationPlayState = "running";
      marquee2Ref.current.style.animationPlayState = "running";
    }
  };

  if (isLoading || error) return <MarqueeCoinsSkeleton />;

  return (
    <>
      <div className="fixed top-[3.75rem] w-screen h-[3.5rem] bg-white dark:bg-background z-10" />
      {symbols.length > 0 && (
        <div
          className={cn(
            "left-to-right w-screen h-[2.75rem] inline-flex items-center cursor-pointer",
            className
          )}
        >
          <div className="flex flex-row items-center select-none">
            <div
              onMouseEnter={handlePause}
              onMouseLeave={handlePlay}
              onTouchStart={handlePause}
              onTouchEnd={handlePlay}
              className="relative flex"
            >
              {/* Marquee 1 */}
              <div
                ref={marqueeRef}
                className="flex flex-row animate-marquee whitespace-nowrap z-[960]"
              >
                {symbols.map(
                  (row, i) =>
                    row?.latest_price_info?.formatted_price && (
                      <MarqueeCoinBox
                        key={i}
                        row={row}
                        onClick={handleClick}
                        getImageSrc={getImageSrc}
                      />
                    )
                )}
              </div>

              {/* Marquee 2 */}
              <div
                ref={marquee2Ref}
                className="absolute top-0 animate-marquee2 whitespace-nowrap"
              >
                <div className="flex flex-row">
                  {symbols.map(
                    (row, i) =>
                      row?.latest_price_info?.formatted_price && (
                        <MarqueeCoinBox
                          key={`b${i}`}
                          row={row}
                          onClick={handleClick}
                          getImageSrc={getImageSrc}
                        />
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MarqueeCoins;
