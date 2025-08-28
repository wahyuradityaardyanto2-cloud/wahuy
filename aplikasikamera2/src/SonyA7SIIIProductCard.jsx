import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check, Minus, Plus, X } from "lucide-react";

// 100% lookalike of the provided UI (mobile-first). TailwindCSS required.
// Drop this component into any React app with Tailwind set up.
// Fonts: the screenshot looks like SF/Inter. Tailwind's default (Inter) is fine.

const EUR = (n) => new Intl.NumberFormat("en-EN", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const CAMERA = {
  brand: "SONY",
  name: "SONY A7SIII",
  model: "ILCE-7SM3",
  price: 4200,
  img: "https://images.unsplash.com/photo-1519183071298-a2962be96f83?q=80&w=1600&auto=format&fit=crop", // crisp A7 series image
  thumb: "https://images.unsplash.com/photo-1519183071298-a2962be96f83?q=80&w=320&auto=format&fit=crop",
};

export default function SonyA7SIIIProductCard() {
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState("info");
  const [inCart, setInCart] = React.useState(false);
  const [openBag, setOpenBag] = React.useState(false);

  const addToCart = () => {
    setInCart(true);
    setOpenBag(true);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#f4f7fb] flex items-center justify-center p-4">
      {/* Phone frame mock */}
      <div className="w-[360px] max-w-full">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="relative rounded-[28px] bg-white shadow-xl ring-1 ring-black/5 overflow-hidden"
        >
          {/* header */}
          <div className="px-6 pt-6 flex items-center justify-between">
            <span className="text-2xl tracking-[0.35em] font-semibold text-neutral-900 select-none">SONY</span>
            <button
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5"
              onClick={() => setOpenBag(true)}
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {inCart && (
                <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">{qty}</span>
              )}
            </button>
          </div>

          {/* product image */}
          <div className="px-6 mt-2">
            <div className="relative aspect-[5/3] w-full rounded-2xl bg-gradient-to-b from-neutral-100 to-neutral-200 overflow-hidden flex items-center justify-center">
              <img
                src={CAMERA.img}
                alt={CAMERA.name}
                className="h-full w-auto object-cover"
              />
            </div>
            <div className="h-3" />
          </div>

          {/* title & price */}
          <div className="px-6">
            <h1 className="text-[28px] leading-tight font-extrabold tracking-tight text-neutral-900 drop-shadow-sm">
              {CAMERA.name}
            </h1>
            <p className="text-xs text-neutral-400 mt-1">{CAMERA.model}</p>
            <p className="text-[22px] font-semibold text-neutral-900 mt-2">{EUR(CAMERA.price)}</p>
          </div>

          {/* tabs */}
          <div className="px-6 mt-3">
            <div className="flex items-center gap-6 text-sm">
              {[
                { id: "info", label: "Info" },
                { id: "specs", label: "Specifications" },
                { id: "material", label: "Material" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative pb-2 font-medium ${tab === t.id ? "text-blue-600" : "text-neutral-400"}`}
                >
                  {t.label}
                  {tab === t.id && (
                    <motion.span layoutId="underline" className="absolute left-0 right-0 -bottom-[1px] h-[3px] rounded-full bg-blue-600" />
                  )}
                </button>
              ))}
            </div>
            <div className="mt-2 text-[13px] leading-relaxed text-neutral-700">
              {tab === "info" && (
                <p>
                  Taking the S series to a whole new level of full-frame movie expression, spectacular new speed combines with supreme sensitivity and ultra-low noise to put previously impossible 4K movie shoots on the menu, with high dynamic range.
                </p>
              )}
              {tab === "specs" && (
                <ul className="list-disc pl-5 space-y-1">
                  <li>12.1MP Full-Frame Exmor R CMOS</li>
                  <li>Up to 4K/120p 10-bit 4:2:2</li>
                  <li>759-pt Fast Hybrid AF, Real-time Eye AF</li>
                  <li>ISO 80–409,600 (expanded)</li>
                </ul>
              )}
              {tab === "material" && (
                <ul className="list-disc pl-5 space-y-1">
                  <li>Magnesium alloy chassis</li>
                  <li>Weather-sealed body construction</li>
                  <li>Anti-dust shutter mechanism</li>
                </ul>
              )}
            </div>
          </div>

          {/* add to cart */}
          <div className="px-6 pb-6 pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <button
                  className="h-9 w-9 rounded-full bg-neutral-100 flex items-center justify-center active:scale-95 transition"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-8 text-center font-semibold">{qty}</span>
                <button
                  className="h-9 w-9 rounded-full bg-neutral-100 flex items-center justify-center active:scale-95 transition"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {inCart && (
                <div className="inline-flex items-center gap-1 text-sm text-green-600">
                  <Check className="h-4 w-4" /> Added to bag
                </div>
              )}
            </div>
            <button
              onClick={addToCart}
              className="w-full h-14 rounded-[18px] bg-blue-600 text-white font-semibold text-lg shadow-lg shadow-blue-600/20 active:translate-y-[1px] transition"
            >
              Add to cart
            </button>
          </div>
        </motion.div>

        {/* Bag / Bottom Sheet */}
        <AnimatePresence>
          {openBag && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 flex items-end justify-center"
            >
              <div className="absolute inset-0 bg-black/30" onClick={() => setOpenBag(false)} />
              <motion.div
                initial={{ y: 400 }}
                animate={{ y: 0 }}
                exit={{ y: 400 }}
                transition={{ type: "spring", stiffness: 140, damping: 18 }}
                className="relative w-[360px] max-w-full rounded-t-[28px] bg-white shadow-2xl ring-1 ring-black/5 p-6 z-50"
              >
                <div className="mx-auto h-1 w-12 rounded-full bg-neutral-200 mb-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[22px] font-bold">Your bag</p>
                    <p className="text-xs text-neutral-400">{qty} item{qty>1?"s":""}</p>
                  </div>
                  <button className="h-9 w-9 rounded-full bg-neutral-100 flex items-center justify-center" onClick={() => setOpenBag(false)} aria-label="Close bag">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 ring-1 ring-black/5">
                    <div className="h-12 w-12 rounded-xl overflow-hidden bg-neutral-200 flex items-center justify-center">
                      <img src={CAMERA.thumb} alt={CAMERA.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{CAMERA.name}</p>
                      <p className="text-xs text-neutral-400">{CAMERA.model}</p>
                    </div>
                    <p className="text-sm font-semibold">{EUR(CAMERA.price)}</p>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-neutral-500">Total</span>
                  <span className="text-[22px] font-bold">{EUR(CAMERA.price * qty)}</span>
                </div>

                <button className="mt-4 w-full h-14 rounded-[18px] bg-blue-600 text-white font-semibold text-lg shadow-lg shadow-blue-600/20 active:translate-y-[1px] transition">
                  Checkout
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
