"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function LoadMore() {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      alert("Load More");
    }
  }, [inView]);

  return (
    <>
      <section className="flex justify-center items-center w-full">
        <div>
          <Image
            ref={ref}
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
