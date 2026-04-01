import ShinyText from "../../components/ShinyText";
import TextType from "../../components/TextType";
import { BASE, PHRASES } from "../utils/constants";

export default function TypewriterHeading() {
  return (
    <>
      <h1 className="min-w-[40] text-4xl md:text-8xl font-display font-bold tracking-tight mb-8 max-w-4xl leading-[1.1] min-h-20">
        <ShinyText text={BASE} color="rgba(255,255,255,0.85)" shineColor="#ffffff" spread={90} speed={2.5} />
        <br />
        <TextType
          as="span"
          text={PHRASES}
          typingSpeed={60}
          deletingSpeed={28}
          pauseDuration={2200}
          className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent"
          cursorClassName="bg-cyan-400 inline-block w-[3px] h-[0.85em] rounded-sm ml-1 !text-transparent !bg-clip-border align-text-bottom"
          showCursor={true}
          variableSpeed={undefined}
          onSentenceComplete={undefined}
          lastWordClassName="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          shinyLastWord={true}
          shinyLastWordProps={{
            gradient: "linear-gradient(120deg, transparent 40%, #ffffff 50%, transparent 60%), linear-gradient(to right, #22d3ee 0%, #3b82f6 100%)",
            bgSize: "200% auto, 100% auto",
            speed: 3
          }}
        />
      </h1>
    </>
  );
}
