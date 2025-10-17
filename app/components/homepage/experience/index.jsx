// @flow strict

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-8 border-[#25213b] flex flex-col justify-center">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-4">
        <div className="flex items-center">
          <span className="w-14 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-4 text-xl rounded-md">
            Experiences
          </span>
          <span className="w-14 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-4 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 items-center w-full">
          <div className="hidden lg:flex justify-center items-center">
            <div className="w-3/4 max-w-[400px]">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-2xl">
              <div className="flex flex-col gap-4 justify-center h-full">
                {/* Example Experience Card with timeframe */}
                <GlowCard identifier="experience-1">
                  <div className="p-4 relative">
                    <Image
                      src="/blur-23.svg"
                      alt="Hero"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-x-4 px-2 py-2">
                        <div className="text-violet-500 transition-all duration-300">
                          <BsPersonWorkspace size={28} />
                        </div>
                        <div>
                          <p className="text-lg font-semibold uppercase mb-1">
                            AI/ML Engineering Intern
                          </p>
                          <p className="text-sm mb-0">
                            9am Solution
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[#16f2b3] mb-1 font-semibold">
                          Internship
                        </p>
                        <p className="text-sm text-[#16f2b3] mb-0 font-semibold">
                          Oct 4, 2025 – Present
                        </p>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;