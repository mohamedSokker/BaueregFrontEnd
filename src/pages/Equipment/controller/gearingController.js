import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { folder, useControls } from "leva";

import { objects3D } from "../Model/model";

const useGearing = ({ isAnimate, isPartsAnimate, rpm }) => {
  const sunGear = useRef(null);
  const smallSunGear = useRef();
  const smallSunGear01 = useRef();
  const smallSunGear02 = useRef();
  const smallPlate = useRef();
  const bigPlate = useRef();
  const bigSunGear = useRef();
  const bigSunGear05 = useRef();
  const bigSunGear06 = useRef();
  const bigPlateSunGear = useRef();
  const cover = useRef();
  const coverGear = useRef();
  const coverGear01 = useRef();
  const coverGear02 = useRef();
  const coverGear03 = useRef();
  const coverGear04 = useRef();
  const coverSunGear = useRef();
  const ring = useRef();

  const tlRef = useRef();
  const partstlRef = useRef();

  const dur = 60;

  const coverPosition = 2;
  const coversunGearPosition = 320;
  const coverGearPosition = 160;
  const coverBearingPosition = 1.8;
  const ringPosition = 1.4;
  const bigPlatePosition = 1;
  const bigPlateSunGearPosition = 0.3;
  const bigPlateGearPosition = 0.2;
  const smallPlatePosition = 0.6;
  const smallPlateSunGearPosition = 0.3;
  const smallPlateGearPosition = 0.2;
  const smallPlateBearingPosition = 0.4;
  const partsDur = 1;

  let visible = {};

  // useEffect(() => {
  // objects3D.map((item) => {
  //   visible = {
  //     ...visible,
  //     [item]: useControls(item, { visible: true, wireFrame: false }),
  //   };
  //   // console.log(visible);
  // });
  // }, []);
  console.log(visible);

  const tl = gsap.timeline({ paused: true });
  const partstl = gsap.timeline({ paused: true });

  const startWorkingAnimation = () => {
    tl.to(sunGear.current.rotation, {
      x: -2 * Math.PI * rpm,
      duration: dur,
      repeat: -1,
      ease: "linear",
    });
    tl.to(
      smallSunGear.current.rotation,
      {
        x: 2 * Math.PI * rpm * (28 / 21),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );
    tl.to(
      smallSunGear01.current.rotation,
      {
        x: 2 * Math.PI * rpm * (28 / 21),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );
    tl.to(
      smallSunGear02.current.rotation,
      {
        x: 2 * Math.PI * rpm * (28 / 21),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );
    tl.to(
      smallPlate.current.rotation,
      {
        x: -2 * Math.PI * rpm * (28 / 69),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );

    tl.to(
      bigPlateSunGear.current.rotation,
      {
        x: -2 * Math.PI * rpm * (28 / 69),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );
    tl.to(
      bigSunGear.current.rotation,
      {
        x: 2 * Math.PI * rpm * (28 / 69) * (28 / 21),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );
    tl.to(
      bigSunGear05.current.rotation,
      {
        x: 2 * Math.PI * rpm * (28 / 69) * (28 / 21),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );
    tl.to(
      bigSunGear06.current.rotation,
      {
        x: 2 * Math.PI * rpm * (28 / 69) * (28 / 21),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );
    tl.to(
      bigPlate.current.rotation,
      {
        x: -2 * Math.PI * rpm * (28 / 69) * (28 / 69),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );

    tl.to(
      coverSunGear.current.rotation,
      {
        x: -2 * Math.PI * rpm * (28 / 69) * (28 / 69),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );
    tl.to(
      coverGear.current.rotation,
      {
        x: 2 * Math.PI * rpm * (28 / 69) * (28 / 69) * (21 / 24),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );

    tl.to(
      coverGear01.current.rotation,
      {
        x: 2 * Math.PI * rpm * (28 / 69) * (28 / 69) * (21 / 24),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );
    tl.to(
      coverGear02.current.rotation,
      {
        x: 2 * Math.PI * rpm * (28 / 69) * (28 / 69) * (21 / 24),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );
    tl.to(
      coverGear03?.current?.rotation,
      {
        x: 2 * Math.PI * rpm * (28 / 69) * (28 / 69) * (21 / 24),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );
    tl.to(
      coverGear04.current.rotation,
      {
        x: 2 * Math.PI * rpm * (28 / 69) * (28 / 69) * (21 / 24),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );
    tl.to(
      cover.current.rotation,
      {
        x: -2 * Math.PI * rpm * (28 / 69) * (28 / 69) * (21 / 69),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );
    tl.to(
      ring.current.rotation,
      {
        x: -2 * Math.PI * rpm * (28 / 69) * (28 / 69) * (21 / 69),
        duration: dur,
        repeat: -1,
        ease: "linear",
      },
      "<"
    );

    tlRef.current = tl;
  };

  const startPartsAnimation = () => {
    partstl.to(cover.current.position, {
      x: coverPosition,
      duration: partsDur,
      // repeat: -1,
      ease: "linear",
    });

    partstl.to(coverSunGear.current.position, {
      x: -coversunGearPosition,
      duration: partsDur,
      // repeat: -1,
      ease: "linear",
    });

    partstl.to(coverGear.current.position, {
      x: -coverGearPosition,
      duration: partsDur,
      // repeat: -1,
      ease: "linear",
    });

    partstl.to(
      coverGear01.current.position,
      {
        x: -coverGearPosition,
        duration: partsDur,
        // repeat: -1,
        ease: "linear",
      },
      "<"
    );
    partstl.to(
      coverGear02.current.position,
      {
        x: -coverGearPosition,
        duration: partsDur,
        // repeat: -1,
        ease: "linear",
      },
      "<"
    );
    partstl.to(
      coverGear03?.current?.position,
      {
        x: -coverGearPosition,
        duration: partsDur,
        // repeat: -1,
        ease: "linear",
      },
      "<"
    );
    partstl.to(
      coverGear04.current.position,
      {
        x: -coverGearPosition,
        duration: partsDur,
        // repeat: -1,
        ease: "linear",
      },
      "<"
    );

    partstl.to(ring.current.position, {
      x: ringPosition,
      duration: partsDur,
      // repeat: -1,
      ease: "linear",
    });

    partstl.to(bigPlate.current.position, {
      x: bigPlatePosition,
      duration: partsDur,
      // repeat: -1,
      ease: "linear",
    });

    partstl.to(bigPlateSunGear.current.position, {
      x: -bigPlateSunGearPosition,
      duration: partsDur,
      // repeat: -1,
      ease: "linear",
    });

    partstl.to(bigSunGear.current.position, {
      x: -bigPlateGearPosition,
      duration: partsDur,
      // repeat: -1,
      ease: "linear",
    });
    partstl.to(
      bigSunGear05.current.position,
      {
        x: -bigPlateGearPosition,
        duration: partsDur,
        // repeat: -1,
        ease: "linear",
      },
      "<"
    );
    partstl.to(
      bigSunGear06.current.position,
      {
        x: -bigPlateGearPosition,
        duration: partsDur,
        // repeat: -1,
        ease: "linear",
      },
      "<"
    );

    partstl.to(smallPlate.current.position, {
      x: smallPlatePosition,
      duration: partsDur,
      // repeat: -1,
      ease: "linear",
    });

    partstl.to(sunGear.current.position, {
      x: -smallPlateSunGearPosition,
      duration: partsDur,
      //   repeat: -1,
      ease: "linear",
    });

    partstl.to(smallSunGear.current.position, {
      x: -smallPlateGearPosition,
      duration: partsDur,
      // repeat: -1,
      ease: "linear",
    });
    partstl.to(
      smallSunGear01.current.position,
      {
        x: -smallPlateGearPosition,
        duration: partsDur,
        // repeat: -1,
        ease: "linear",
      },
      "<"
    );
    partstl.to(
      smallSunGear02.current.position,
      {
        x: -smallPlateGearPosition,
        duration: partsDur,
        // repeat: -1,
        ease: "linear",
      },
      "<"
    );

    partstlRef.current = partstl;
  };

  useEffect(() => {
    startWorkingAnimation();
  }, [rpm]);

  useEffect(() => {
    if (!isAnimate) {
      console.log("pause");
      tlRef.current.pause();
      // tl.paused(true);
    } else {
      console.log("play");
      tlRef.current.play();
    }
  }, [isAnimate]);

  useEffect(() => {
    startPartsAnimation();
  }, []);

  useEffect(() => {
    if (isPartsAnimate === false) {
      partstlRef.current.pause();
    } else if (isPartsAnimate === true) {
      partstlRef.current.play();
    } else {
      partstlRef.current.reverse();
    }
  }, [isPartsAnimate]);

  return {
    sunGear,
    smallSunGear,
    smallSunGear01,
    smallSunGear02,
    smallPlate,
    bigPlate,
    bigSunGear,
    bigSunGear05,
    bigSunGear06,
    bigPlateSunGear,
    cover,
    coverGear,
    coverGear01,
    coverGear02,
    coverGear03,
    coverGear04,
    coverSunGear,
    ring,
    visible,
  };
};

export default useGearing;
