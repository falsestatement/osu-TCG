import { useState, useRef } from "react";

const TCGCard = ({
  title,
  description,
  variant,
  rarity,
  image,
  onClose,
  onCardClick,
}: {
  title: string;
  description: string;
  variant: string;
  rarity: string;
  image: string;
  onClose: () => void;
  onCardClick: (any) => void;
}) => {
  // cardVariants: Normal, Holographic, Polychromatic
  // rarityVariants: common, uncommon, rare
  const [counter, setCounter] = useState(0);
  const boundingRef = useRef<DOMRect | null>(null);

  document.body.style.setProperty("--chroma-shift", "-200px");
  document.body.style.setProperty("--before-glare-shift", "-60px");
  document.body.style.setProperty("--after-glare-shift", "-120px");
  document.body.style.setProperty("--poly-x", "-15%");
  document.body.style.setProperty("--poly-y", "-25%");
  document.body.style.setProperty("--shine-brightness", "0.7");

  return (
    <div
      onClick={onCardClick}
      onMouseEnter={(e) => {
        boundingRef.current = e.currentTarget.getBoundingClientRect();
      }}
      onMouseLeave={() => {
        boundingRef.current = null;
      }}
      onMouseMove={(e) => {
        const x = e.clientX - boundingRef.current.left;
        const y = e.clientY - boundingRef.current.top + 10;

        const normX = x / boundingRef.current.width;
        const normY = y / boundingRef.current.height;

        e.currentTarget.style.setProperty(
          "--chroma-shift",
          `${-normY * 400}px`,
        );
        e.currentTarget.style.setProperty(
          "--before-glare-shift",
          `${-normX * 60}px`,
        );
        e.currentTarget.style.setProperty(
          "--after-glare-shift",
          `${normX * 120 - 120}px`,
        );
        e.currentTarget.style.setProperty("--poly-x", `${-(normX + 2) * 50}px`);
        e.currentTarget.style.setProperty("--poly-y", `${-(normY + 1) * 70}px`);
        e.currentTarget.style.setProperty(
          "--rot-x",
          `${-(normY - 0.5) * 10}deg`,
        );
        e.currentTarget.style.setProperty(
          "--rot-y",
          `${(normX - 0.5) * 10}deg`,
        );
        e.currentTarget.style.setProperty("--shine-x", `${normX * 100}%`);
        e.currentTarget.style.setProperty("--shine-y", `${normY * 100}%`);
      }}
      className="group animate-idle-wobble hover:animate-none
      hover:[transform:perspective(500px)_rotateY(var(--rot-y))_rotateX(var(--rot-x))] relative [flex -ml-[62px] first:ml-0 min-w-[15em] min-h-[21em] w-[15em] h-[21em] bg-gradient-to-br from-pink-400 to-violet-600 rounded-lg p-1 drop-shadow-[0_5px_5px_rgba(0,0,0,0.35)] left-0 top-0 transition-[left,top] duration-200 ease-in-out hover:-top-2 peer peer-hover:relative peer-hover:left-[72px]"
    >
      <div className="flex relative flex-col justify-between bg-[url('/assets/omega_triangle.jpg')] bg-[length:75%] brightness-[1.1] w-full h-full rounded-md p-2">
        <div
          className={
            variant == "Holographic"
              ? "absolute pointer-events-none h-full w-full rounded-lg top-0 left-0 bg-[linear-gradient(rgba(255,86,86,1)_0%,rgba(255,207,78,1)_15%,rgba(246,255,61,1)_20%,rgba(194,255,71,1)_35%,rgba(77,255,152,1)_52%,rgba(117,177,255,1)_69%,rgba(174,91,255,1)_85%,rgba(255,111,200,1)_97%),repeating-linear-gradient(133deg,#0e152e_0%,hsl(180,10%,60%)_3.8%,hsl(180,29%,66%)_4.5%,hsl(180,10%,60%)_5.2%,#0e152e_10%,#0e152e_12%)] bg-[length:100%_200%] animate-holo-idle-before group-hover:animate-none group-hover:bg-[0%_var(--chroma-shift),0%_var(--before-glare-shift)] bg-blend-hue brightness-[0.5] contrast-[2] saturate-[1.5] mix-blend-color-dodge after:content-[''] after:block after:absolute after:h-full after:w-full after:rounded-lg after:top-0 after:left-0 after:bg-[linear-gradient(rgba(255,86,86,1)_0%,rgba(255,207,78,1)_15%,rgba(246,255,61,1)_20%,rgba(194,255,71,1)_35%,rgba(77,255,152,1)_52%,rgba(117,177,255,1)_69%,rgba(174,91,255,1)_85%,rgba(255,111,200,1)_97%),repeating-linear-gradient(133deg,#0e152e_0%,hsl(180,10%,60%)_3.8%,hsl(180,29%,66%)_4.5%,hsl(180,10%,60%)_5.2%,#0e152e_10%,#0e152e_12%)] after:animate-holo-idle-after after:group-hover:animate-none after:bg-[length:200%_300%] after:bg-[0%_var(--chroma-shift),-60px_var(--after-glare-shift)] after:bg-blend-hue after:brightness-[0.9] after:contrast-[1.2] after:saturate-[1.6] after:mix-blend-exclusion before:absolute before:h-full before:w-full before:rounded-lg before:top-0 before:left-0 before:bg-[url('/assets/omega_triangle_contrast.jpg')] before:bg-[length:75%] before:mix-blend-overlay"
              : "hidden"
          }
        />
        <div
          className={
            variant == "Polychromatic"
              ? "absolute pointer-events-none h-full w-full top-0 left-0 rounded-lg bg-[url('/assets/omega_triangle_contrast.jpg'),repeating-radial-gradient(circle,rgba(255,0,0,1),rgba(245,0,255,1),rgba(0,8,255,1),rgba(0,252,255,1),rgba(0,255,73,1),rgba(255,253,0,1),rgba(255,168,0,1),rgba(255,0,0,1)_140px)] bg-[length:75%,140%_140%] animate-poly-idle group-hover:animate-none group-hover:[background-position:0%,var(--poly-x)_var(--poly-y)] bg-blend-overlay brightness-[0.35] contrast-[1] saturate-[1] mix-blend-color-dodge"
              : "hidden"
          }
        />
        <div className="flex flex-col grow">
          <div
            className={
              rarity == "Common"
                ? "bg-gradient-to-r from-lime-500 to-green-500 rounded-md flex justify-center items-center border-solid border-2 border-lime-700 select-none font-bold"
                : rarity == "Uncommon"
                  ? "bg-gradient-to-r from-sky-500 to-blue-500 rounded-md flex justify-center items-center border-solid border-2 border-sky-700 select-none font-bold"
                  : rarity == "Rare"
                    ? "bg-gradient-to-r from-pink-500 to-red-500 rounded-md flex justify-center items-center border-solid border-2 border-pink-700 select-none font-bold"
                    : "hidden"
            }
          >
            {title}
          </div>

          <div
            style={{
              margin: "0.5rem 0",
              minHeight: "7em",
              borderRadius: "0.375rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: `url('/card_images/${image}')`,
              backgroundSize: "cover",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "rgb(109,40,217)",
            }}
          />

          <div className="text-[10px] text-center font-semibold select-none w-full max-h-[10em] h-[10em]">
            {description}
          </div>
        </div>
        <div className="group-hover:flex group-hover:justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCounter((prev) => (prev > 0 ? prev - 1 : prev));
            }}
            className="p-2 mr-2 hidden bg-pink-300 rounded-lg w-5 h-5 group-hover:flex justify-center items-center hover:bg-pink-200"
          >
            {"-"}
          </button>
          <input
            value={counter}
            onChange={(e) => setCounter(+e.target.value)}
            type="number"
            className="font-bold w-full group-hover:text-center rounded-lg bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCounter((prev) => prev + 1);
            }}
            className="p-2 ml-2 hidden bg-pink-300 rounded-lg w-5 h-5 group-hover:flex justify-center items-center hover:bg-pink-200"
          >
            {"+"}
          </button>
        </div>
      </div>
      <div
        className={
          variant === "Holographic" || variant === "Polychromatic"
            ? "absolute h-full w-full group-hover:bg-[radial-gradient(circle_at_var(--shine-x)_var(--shine-y),rgba(254,255,231,var(--shine-brightness))_0%,rgba(0,0,0,0)_60%)] top-0 left-0 pointer-events-none rounded-lg mix-blend-overlay group-hover:[mask-image:url('/assets/omega_triangle_mask.png')] group-hover:[mask-size:73%] group-hover:[mask-position:2px_1px]"
            : "absolute h-full w-full group-hover:bg-[radial-gradient(circle_at_var(--shine-x)_var(--shine-y),rgba(254,255,231,0.4)_0%,rgba(0,0,0,0)_60%)] top-0 left-0 pointer-events-none rounded-lg mix-blend-overlay"
        }
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute hidden text-white bg-pink-700 group-hover:flex -right-3 -top-3 bg-pink-700 w-7 h-7 justify-center items-center rounded-full text-lg hover:bg-pink-500"
      >
        x
      </button>
    </div>
  );
};

export default TCGCard;
