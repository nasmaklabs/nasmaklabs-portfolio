"use client";

import { HeroPinned } from "@/components/sections/HeroPinned";
import { ServicesPinned } from "@/components/sections/ServicesPinned";
import { WorkHorizontal } from "@/components/sections/WorkHorizontal";
import { Manifesto } from "@/components/sections/Manifesto";
import { Contact } from "@/components/sections/Contact";
import { SceneTransition } from "@/components/ui/SceneTransition";

export default function Home() {
  return (
    <main className="bg-[#030303]">
      {/* Hero - First scene */}
      <div className="h-screen snap-start">
        <HeroPinned />
      </div>
      
      {/* Services - Scene 2 */}
      <SceneTransition>
        <ServicesPinned />
      </SceneTransition>
      
      {/* Process & Tech - Scene 3 */}
      <SceneTransition>
        <WorkHorizontal />
      </SceneTransition>
      
      {/* Why Us - Scene 4 */}
      <SceneTransition>
        <Manifesto />
      </SceneTransition>
      
      {/* Contact - Final Scene */}
      <SceneTransition>
        <Contact />
      </SceneTransition>
    </main>
  );
}
