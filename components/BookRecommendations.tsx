import { RecommendedBook, amazonLink } from '@/lib/books'

export default function BookRecommendations({
  books,
  title,
}: {
  books: RecommendedBook[]
  title: string
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-3.5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <div className="w-1.5 h-4 bg-brand rounded-full" />
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{title}</h2>
      </div>
      <div className="px-6 py-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {books.map((book) => (
          <a
            key={book.asin}
            href={amazonLink(book.asin)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group text-center"
          >
            <div className="aspect-[2/3] w-full overflow-hidden rounded-md border border-slate-200 shadow-sm mb-2 bg-slate-50 group-hover:shadow-md transition-shadow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.cover}
                alt={`${book.title} book cover`}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-semibold text-slate-900 leading-snug">{book.title}</p>
            <p className="text-xs text-slate-500 mb-1">{book.author}</p>
            <span className="text-xs font-medium text-brand">View on Amazon →</span>
          </a>
        ))}
      </div>
      <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-100">
        <p className="text-[11px] text-slate-400">As an Amazon Associate we earn from qualifying purchases.</p>
      </div>
    </div>
  )
}
