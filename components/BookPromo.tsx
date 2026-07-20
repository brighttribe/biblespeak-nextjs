import { FEATURED_BOOK, amazonLink } from '@/lib/books'

export default function BookPromo() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <div className="w-1.5 h-4 bg-brand rounded-full" />
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Featured Book</h2>
      </div>
      <div className="p-3 text-center">
        <a
          href={amazonLink(FEATURED_BOOK.asin)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={FEATURED_BOOK.cover}
            alt={`${FEATURED_BOOK.title} book cover`}
            width={200}
            height={300}
            className="mx-auto w-[200px] h-auto rounded-lg shadow-md mb-4 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-xl"
          />
          <h3 className="font-bold text-slate-900 leading-snug mb-1 group-hover:text-brand transition-colors">{FEATURED_BOOK.title}</h3>
          <p className="text-sm text-slate-500 mb-1">{FEATURED_BOOK.subtitle}</p>
          <p className="text-xs text-slate-400 mb-4">by {FEATURED_BOOK.author}</p>
        </a>
        <a
          href={amazonLink(FEATURED_BOOK.asin)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full py-2.5 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-colors"
        >
          Buy on Amazon
        </a>
      </div>
    </div>
  )
}
