"use client";

import { useEffect, useRef, useState } from "react";
import { buttonClass } from "@/components/ui/button";

type Mode =
  | "compress-image"
  | "resize-image"
  | "crop-image"
  | "convert-to-jpg"
  | "jpg-to-image"
  | "photo-editor"
  | "upscale-image"
  | "remove-background"
  | "watermark-image"
  | "meme-generator"
  | "rotate-image"
  | "html-to-image"
  | "blur-face";

export function ImageTool({ mode }: { mode: Mode }) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<{ url: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  // options
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<"jpeg" | "png" | "webp">("jpeg");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [percent, setPercent] = useState(100);
  const [keepAspect, setKeepAspect] = useState(true);
  const [angle, setAngle] = useState(90);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [watermarkText, setWatermarkText] = useState("K3atPhoto");
  const [wmOpacity, setWmOpacity] = useState(0.5);
  const [wmSize, setWmSize] = useState(32);
  const [wmColor, setWmColor] = useState("#ffffff");
  const [topText, setTopText] = useState("النص العلوي");
  const [bottomText, setBottomText] = useState("النص السفلي");
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(0);
  const [cropH, setCropH] = useState(0);
  const [blurStrength, setBlurStrength] = useState(8);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [scale, setScale] = useState(2);
  const [bgTolerance, setBgTolerance] = useState(30);
  const [bgColor, setBgColor] = useState("#ffffff");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      previews.forEach((u) => URL.revokeObjectURL(u));
      results.forEach((r) => URL.revokeObjectURL(r.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    const arr = Array.from(list).filter((f) => f.type.startsWith("image/"));
    setFiles(arr);
    setPreviews(arr.map((f) => URL.createObjectURL(f)));
    setResults([]);
    setError(null);
  };

  const loadImage = (file: File): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });

  const canvasToBlob = (canvas: HTMLCanvasElement, mime: string, q: number) =>
    new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("فشل التحويل"))),
        mime,
        q,
      );
    });

  const processOne = async (file: File): Promise<Blob> => {
    const img = await loadImage(file);
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    if (mode === "compress-image") {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const mime =
        format === "png" ? "image/png" : format === "webp" ? "image/webp" : "image/jpeg";
      return canvasToBlob(canvas, mime, quality / 100);
    }

    if (mode === "resize-image") {
      let nw = width || Math.round((w * percent) / 100);
      let nh = height || Math.round((h * percent) / 100);
      if (keepAspect && width && !height) nh = Math.round((h * nw) / w);
      if (keepAspect && height && !width) nw = Math.round((w * nh) / h);
      if (!width && !height) {
        nw = Math.round((w * percent) / 100);
        nh = Math.round((h * percent) / 100);
      }
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, nw);
      canvas.height = Math.max(1, nh);
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvasToBlob(canvas, "image/png", 1);
    }

    if (mode === "rotate-image") {
      const rad = (angle * Math.PI) / 180;
      const swap = angle % 180 !== 0;
      const canvas = document.createElement("canvas");
      canvas.width = swap ? h : w;
      canvas.height = swap ? w : h;
      const ctx = canvas.getContext("2d")!;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rad);
      if (flipH) ctx.scale(-1, 1);
      if (flipV) ctx.scale(1, -1);
      ctx.drawImage(img, -w / 2, -h / 2);
      return canvasToBlob(canvas, "image/png", 1);
    }

    if (mode === "convert-to-jpg") {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0);
      return canvasToBlob(canvas, "image/jpeg", quality / 100);
    }

    if (mode === "jpg-to-image") {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const mime = format === "webp" ? "image/webp" : "image/png";
      return canvasToBlob(canvas, mime, 1);
    }

    if (mode === "crop-image") {
      const cx = cropW > 0 ? cropX : 0;
      const cy = cropH > 0 ? cropY : 0;
      const cw = cropW > 0 ? Math.min(cropW, w - cx) : w;
      const ch = cropH > 0 ? Math.min(cropH, h - cy) : h;
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, cw);
      canvas.height = Math.max(1, ch);
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, cx, cy, cw, ch, 0, 0, cw, ch);
      return canvasToBlob(canvas, "image/png", 1);
    }

    if (mode === "watermark-image") {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = wmOpacity;
      ctx.fillStyle = wmColor;
      ctx.font = `bold ${wmSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(watermarkText, w / 2, h / 2);
      ctx.globalAlpha = 1;
      return canvasToBlob(canvas, "image/png", 1);
    }

    if (mode === "meme-generator") {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const fontSize = Math.max(24, Math.round(w / 12));
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = Math.max(3, fontSize / 12);
      ctx.fillStyle = "#ffffff";
      if (topText) {
        ctx.textBaseline = "top";
        ctx.strokeText(topText, w / 2, 10);
        ctx.fillText(topText, w / 2, 10);
      }
      if (bottomText) {
        ctx.textBaseline = "bottom";
        ctx.strokeText(bottomText, w / 2, h - 10);
        ctx.fillText(bottomText, w / 2, h - 10);
      }
      return canvasToBlob(canvas, "image/png", 1);
    }

    if (mode === "blur-face") {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      // blur a central region
      const rw = Math.round(w * 0.35);
      const rh = Math.round(h * 0.35);
      const rx = Math.round((w - rw) / 2);
      const ry = Math.round((h - rh) / 2);
      const region = ctx.getImageData(rx, ry, rw, rh);
      // simple box blur
      const blurred = boxBlur(region, blurStrength);
      ctx.putImageData(blurred, rx, ry);
      return canvasToBlob(canvas, "image/png", 1);
    }

    if (mode === "upscale-image") {
      const canvas = document.createElement("canvas");
      canvas.width = w * scale;
      canvas.height = h * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvasToBlob(canvas, "image/png", 1);
    }

    if (mode === "remove-background") {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, w, h);
      const [br, bg, bb] = hexToRgb(bgColor);
      const tol = bgTolerance;
      for (let i = 0; i < data.data.length; i += 4) {
        const r = data.data[i],
          g = data.data[i + 1],
          b = data.data[i + 2];
        if (Math.abs(r - br) <= tol && Math.abs(g - bg) <= tol && Math.abs(b - bb) <= tol) {
          data.data[i + 3] = 0;
        }
      }
      ctx.putImageData(data, 0, 0);
      return canvasToBlob(canvas, "image/png", 1);
    }

    if (mode === "photo-editor") {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
      ctx.drawImage(img, 0, 0);
      ctx.filter = "none";
      return canvasToBlob(canvas, "image/png", 1);
    }

    if (mode === "html-to-image") {
      throw new Error("تحويل صفحات HTML إلى صورة يتطلب خادماً. قريباً.");
    }

    // fallback
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    return canvasToBlob(canvas, "image/png", 1);
  };

  const run = async () => {
    if (files.length === 0) {
      setError("الرجاء اختيار صورة أولاً.");
      return;
    }
    setBusy(true);
    setError(null);
    setResults([]);
    try {
      const out: { url: string; name: string }[] = [];
      for (const f of files) {
        const blob = await processOne(f);
        const ext = blob.type.split("/")[1]?.replace("jpeg", "jpg") || "png";
        const name = f.name.replace(/\.[^.]+$/, "") + `-K3atPhoto.${ext}`;
        out.push({ url: URL.createObjectURL(blob), name });
      }
      setResults(out);
    } catch (e) {
      setError(e instanceof Error ? e.message : "حدث خطأ غير متوقع.");
    } finally {
      setBusy(false);
    }
  };

  const downloadAll = () => {
    results.forEach((r) => {
      const a = document.createElement("a");
      a.href = r.url;
      a.download = r.name;
      a.click();
    });
  };

  const accept = "image/*";

  return (
    <div className="mx-auto max-w-4xl">
      {/* Upload */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className="border-brand-300 bg-surface-raised hover:border-brand-500 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-colors"
      >
        <div className="grid size-16 place-items-center rounded-2xl bg-brand-50 text-3xl dark:bg-brand-500/10">
          ⬆️
        </div>
        <p className="text-foreground mt-4 text-lg font-bold">اسحب وأفلت الصور هنا</p>
        <p className="text-muted mt-1 text-sm">أو انقر لاختيار ملفات من جهازك</p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />
      </div>

      {/* Previews */}
      {previews.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {previews.map((u, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={u} src={u} alt={files[i]?.name} className="aspect-square w-full rounded-xl object-cover" />
          ))}
        </div>
      )}

      {/* Options */}
      <div className="card-surface mt-6 p-6">
        <h3 className="text-foreground mb-4 text-base font-bold">الخيارات</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {(mode === "compress-image" || mode === "convert-to-jpg") && (
            <>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">الجودة: {quality}%</span>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                />
              </label>
              {mode === "compress-image" && (
                <label className="flex flex-col gap-1 text-sm">
                  <span className="text-muted">الصيغة</span>
                  <select
                    className="border-border-subtle rounded-lg border bg-transparent px-3 py-2"
                    value={format}
                    onChange={(e) => setFormat(e.target.value as "jpeg" | "png" | "webp")}
                  >
                    <option value="jpeg">JPG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WEBP</option>
                  </select>
                </label>
              )}
            </>
          )}

          {mode === "resize-image" && (
            <>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">العرض (px)</span>
                <input
                  type="number"
                  className="border-border-subtle rounded-lg border bg-transparent px-3 py-2"
                  value={width || ""}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  placeholder="تلقائي"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">الارتفاع (px)</span>
                <input
                  type="number"
                  className="border-border-subtle rounded-lg border bg-transparent px-3 py-2"
                  value={height || ""}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  placeholder="تلقائي"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">النسبة: {percent}%</span>
                <input
                  type="range"
                  min={1}
                  max={400}
                  value={percent}
                  onChange={(e) => setPercent(Number(e.target.value))}
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={keepAspect} onChange={(e) => setKeepAspect(e.target.checked)} />
                <span className="text-muted">الحفاظ على نسبة العرض/الارتفاع</span>
              </label>
            </>
          )}

          {mode === "rotate-image" && (
            <>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">الزاوية</span>
                <select
                  className="border-border-subtle rounded-lg border bg-transparent px-3 py-2"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                >
                  <option value={90}>90°</option>
                  <option value={180}>180°</option>
                  <option value={270}>270°</option>
                </select>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={flipH} onChange={(e) => setFlipH(e.target.checked)} />
                <span className="text-muted">قلب أفقي</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={flipV} onChange={(e) => setFlipV(e.target.checked)} />
                <span className="text-muted">قلب عمودي</span>
              </label>
            </>
          )}

          {mode === "crop-image" && (
            <>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">X</span>
                <input type="number" className="border-border-subtle rounded-lg border bg-transparent px-3 py-2" value={cropX} onChange={(e) => setCropX(Number(e.target.value))} />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">Y</span>
                <input type="number" className="border-border-subtle rounded-lg border bg-transparent px-3 py-2" value={cropY} onChange={(e) => setCropY(Number(e.target.value))} />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">العرض (0 = كامل)</span>
                <input type="number" className="border-border-subtle rounded-lg border bg-transparent px-3 py-2" value={cropW} onChange={(e) => setCropW(Number(e.target.value))} />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">الارتفاع (0 = كامل)</span>
                <input type="number" className="border-border-subtle rounded-lg border bg-transparent px-3 py-2" value={cropH} onChange={(e) => setCropH(Number(e.target.value))} />
              </label>
            </>
          )}

          {mode === "watermark-image" && (
            <>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">النص</span>
                <input className="border-border-subtle rounded-lg border bg-transparent px-3 py-2" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">الحجم: {wmSize}px</span>
                <input type="range" min={12} max={120} value={wmSize} onChange={(e) => setWmSize(Number(e.target.value))} />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">الشفافية: {Math.round(wmOpacity * 100)}%</span>
                <input type="range" min={10} max={100} value={wmOpacity * 100} onChange={(e) => setWmOpacity(Number(e.target.value) / 100)} />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">اللون</span>
                <input type="color" value={wmColor} onChange={(e) => setWmColor(e.target.value)} />
              </label>
            </>
          )}

          {mode === "meme-generator" && (
            <>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">النص العلوي</span>
                <input className="border-border-subtle rounded-lg border bg-transparent px-3 py-2" value={topText} onChange={(e) => setTopText(e.target.value)} />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">النص السفلي</span>
                <input className="border-border-subtle rounded-lg border bg-transparent px-3 py-2" value={bottomText} onChange={(e) => setBottomText(e.target.value)} />
              </label>
            </>
          )}

          {mode === "blur-face" && (
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">قوة الطمس: {blurStrength}</span>
              <input type="range" min={2} max={20} value={blurStrength} onChange={(e) => setBlurStrength(Number(e.target.value))} />
            </label>
          )}

          {mode === "upscale-image" && (
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">معامل التكبير</span>
              <select className="border-border-subtle rounded-lg border bg-transparent px-3 py-2" value={scale} onChange={(e) => setScale(Number(e.target.value))}>
                <option value={2}>2x</option>
                <option value={3}>3x</option>
                <option value={4}>4x</option>
              </select>
            </label>
          )}

          {mode === "remove-background" && (
            <>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">لون الخلفية</span>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">التسامح: {bgTolerance}</span>
                <input type="range" min={0} max={120} value={bgTolerance} onChange={(e) => setBgTolerance(Number(e.target.value))} />
              </label>
            </>
          )}

          {mode === "photo-editor" && (
            <>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">السطوع: {brightness}%</span>
                <input type="range" min={50} max={200} value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">التباين: {contrast}%</span>
                <input type="range" min={50} max={200} value={contrast} onChange={(e) => setContrast(Number(e.target.value))} />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span className="text-muted">التشبع: {saturation}%</span>
                <input type="range" min={0} max={200} value={saturation} onChange={(e) => setSaturation(Number(e.target.value))} />
              </label>
            </>
          )}

          {mode === "jpg-to-image" && (
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">الصيغة</span>
              <select className="border-border-subtle rounded-lg border bg-transparent px-3 py-2" value={format} onChange={(e) => setFormat(e.target.value as "jpeg" | "png" | "webp")}>
                <option value="png">PNG</option>
                <option value="webp">WEBP</option>
              </select>
            </label>
          )}
        </div>

        {mode === "html-to-image" && (
          <p className="text-muted mt-2 text-sm">تحويل صفحات HTML إلى صورة يتطلب خادماً. هذه الميزة قيد التطوير.</p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={run}
            disabled={busy || files.length === 0}
            className={buttonClass("primary", "md")}
          >
            {busy ? "جارٍ المعالجة..." : "معالجة الصور"}
          </button>
          {results.length > 0 && (
            <button type="button" onClick={downloadAll} className={buttonClass("secondary", "md")}>
              تحميل الكل ({results.length})
            </button>
          )}
        </div>
        {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-foreground mb-3 text-base font-bold">النتائج</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {results.map((r) => (
              <div key={r.url} className="card-surface p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.url} alt={r.name} className="aspect-square w-full rounded-lg object-cover" />
                <a
                  href={r.url}
                  download={r.name}
                  className="text-brand-600 mt-2 block text-center text-xs font-semibold hover:underline"
                >
                  تحميل
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function boxBlur(imageData: ImageData, radius: number): ImageData {
  const { width, height, data } = imageData;
  const out = new Uint8ClampedArray(data);
  const r = Math.max(1, radius);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let tr = 0,
        tg = 0,
        tb = 0,
        ta = 0,
        count = 0;
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const nx = x + dx,
            ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const i = (ny * width + nx) * 4;
          tr += data[i];
          tg += data[i + 1];
          tb += data[i + 2];
          ta += data[i + 3];
          count++;
        }
      }
      const i = (y * width + x) * 4;
      out[i] = tr / count;
      out[i + 1] = tg / count;
      out[i + 2] = tb / count;
      out[i + 3] = ta / count;
    }
  }
  return new ImageData(out, width, height);
}