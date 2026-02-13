interface SocialPreviewProps {
  type: 'facebook' | 'twitter';
  title: string;
  description: string;
  image: string;
  url: string;
  siteName?: string;
}

export default function SocialPreview({
  type,
  title,
  description,
  image,
  url,
  siteName,
}: SocialPreviewProps) {
  const hostname = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })();

  return (
    <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
      {image ? (
        <div className="flex h-32 items-center justify-center overflow-hidden bg-slate-700">
          <img
            src={image}
            alt="Social preview"
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center bg-slate-700">
          <span className="text-xs text-slate-500">No image set</span>
        </div>
      )}
      <div className="p-3">
        <p className="mb-0.5 text-[10px] uppercase tracking-wide text-slate-500">
          {type === 'twitter' ? (siteName || hostname) : hostname}
        </p>
        <p className="mb-1 line-clamp-2 text-sm font-semibold text-slate-50">
          {title || 'No title set'}
        </p>
        <p className="line-clamp-2 text-xs text-slate-400">
          {description || 'No description set'}
        </p>
      </div>
    </div>
  );
}
