export const AMAZON_TAG = 'gol016-20'

export function amazonLink(asin: string) {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`
}

export const FEATURED_BOOK = {
  title: 'The Unseen Throne',
  subtitle: 'Psalm 82 and the Divine Council',
  author: 'Brian A. Dempsey',
  asin: 'B0F31X4Z44',
  cover: '/unseen-throne-cover.webp',
}

export type RecommendedBook = {
  title: string
  author: string
  asin: string
  cover: string
}

// Whole-Bible commentary, used to open the list on any "book of the Bible" page
const NEW_BIBLE_COMMENTARY: RecommendedBook = {
  title: 'New Bible Commentary',
  author: 'D. A. Carson, ed.',
  asin: '085110648X',
  cover: '/book-covers/9780851106489.jpg',
}

export const OT_BOOKS: RecommendedBook[] = [
  {
    title: 'The Unfolding Mystery',
    author: 'Edmund P. Clowney',
    asin: '1596388927',
    cover: '/book-covers/9781596388925.jpg',
  },
  {
    title: 'According to Plan',
    author: 'Graeme Goldsworthy',
    asin: '0830826963',
    cover: '/book-covers/9780830826964.jpg',
  },
  {
    title: 'Introducing the Old Testament',
    author: 'Tremper Longman III',
    asin: '0310291488',
    cover: '/book-covers/9780310291480.jpg',
  },
  {
    title: "God's Big Picture",
    author: 'Vaughan Roberts',
    asin: '0830853642',
    cover: '/book-covers/9780830853649.jpg',
  },
  {
    title: 'The Drama of Scripture',
    author: 'Bartholomew & Goheen',
    asin: '0801027462',
    cover: '/book-covers/9780801027468.jpg',
  },
]

export const NT_BOOKS: RecommendedBook[] = [
  {
    title: 'Introducing Jesus',
    author: 'Mark L. Strauss',
    asin: '0310528585',
    cover: '/book-covers/9780310528586.jpg',
  },
  {
    title: 'Basic Christianity',
    author: 'John Stott',
    asin: '0802875513',
    cover: '/book-covers/9780802875518.jpg',
  },
  {
    title: 'The King Jesus Gospel',
    author: 'Scot McKnight',
    asin: '0310531454',
    cover: '/book-covers/9780310531456.jpg',
  },
  {
    title: 'Reading the Gospels Wisely',
    author: 'Jonathan T. Pennington',
    asin: '0801039371',
    cover: '/book-covers/9780801039379.jpg',
  },
  {
    title: 'The Jesus I Never Knew',
    author: 'Philip Yancey',
    asin: '031021923X',
    cover: '/book-covers/9780310219231.jpg',
  },
]

// Generic "how to read / study / pray" pool — used as the second, page-independent block
export const HOWTO_BOOKS: RecommendedBook[] = [
  {
    title: 'How to Read the Bible for All Its Worth',
    author: 'Gordon Fee & Douglas Stuart',
    asin: '0310517826',
    cover: '/book-covers/9780310517825.jpg',
  },
  {
    title: "Grasping God's Word",
    author: 'J. Scott Duvall & J. Daniel Hays',
    asin: '0310109175',
    cover: '/book-covers/9780310109174.jpg',
  },
  {
    title: 'A Praying Life',
    author: 'Paul E. Miller',
    asin: '1631466836',
    cover: '/book-covers/9781631466830.jpg',
  },
  {
    title: 'Women of the Word',
    author: 'Jen Wilkin',
    asin: '1433541769',
    cover: '/book-covers/9781433541766.jpg',
  },
  {
    title: 'The Bible Recap',
    author: 'Tara-Leigh Cobble',
    asin: '0764237039',
    cover: '/book-covers/9780764237034.jpg',
  },
]

export type Testament = 'ot' | 'nt' | 'book-ot' | 'book-nt' | 'general'

const OT_BOOK_NAMES = new Set([
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
  'Samuel', 'Kings', 'Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalm', 'Psalms',
  'Proverbs', 'Ecclesiastes', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel',
  'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
  'Haggai', 'Zechariah', 'Malachi',
])

const NT_BOOK_NAMES = new Set([
  'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', 'Corinthians', 'Galatians',
  'Ephesians', 'Philippians', 'Colossians', 'Thessalonians', 'Timothy', 'Titus',
  'Philemon', 'Hebrews', 'James', 'Peter', 'Jude', 'Revelation',
])

const OT_KEYWORDS = [
  'Old Testament', 'Israelite', 'Israel and Judah', 'king of Israel', 'king of Judah',
  'Babylon', 'exile', 'Exodus', 'wilderness', 'patriarch', 'Pentateuch', 'tabernacle',
  'the Law of Moses', 'Moses', 'judges of Israel', 'prophet of Israel', 'Canaan',
  'covenant with Abraham', 'Abraham', 'Isaac', 'Jacob', 'twelve tribes',
]

const NT_KEYWORDS = [
  'New Testament', 'Jesus', 'Christ', 'apostle', 'apostles', 'disciple of Jesus',
  'the Gospels', 'Gospel of', 'early church', 'Paul the apostle', 'the apostle Paul',
  'crucifixion', 'resurrection of Jesus', 'the church at', 'epistle',
]

function countOccurrences(haystack: string, needle: string): number {
  if (!haystack) return 0
  return haystack.split(needle).length - 1
}

export function classifyWord(title: string, content: string | null | undefined): Testament {
  const t = title.trim()
  if (OT_BOOK_NAMES.has(t)) return 'book-ot'
  if (NT_BOOK_NAMES.has(t)) return 'book-nt'

  const text = content ?? ''
  const otScore = OT_KEYWORDS.reduce((n, k) => n + countOccurrences(text, k), 0)
  const ntScore = NT_KEYWORDS.reduce((n, k) => n + countOccurrences(text, k), 0)

  if (otScore === 0 && ntScore === 0) return 'general'
  if (otScore === ntScore) return 'general'
  return otScore > ntScore ? 'ot' : 'nt'
}

export function getFeaturedBooks(
  classification: Testament,
  title: string,
): { title: string; books: RecommendedBook[] } {
  switch (classification) {
    case 'ot':
      return { title: 'Old Testament Reading', books: OT_BOOKS }
    case 'nt':
      return { title: 'New Testament Reading', books: NT_BOOKS }
    case 'book-ot':
    case 'book-nt': {
      const bookBooks = BOOK_COMMENTARIES[title.trim()]
      if (bookBooks) return { title: 'Commentaries on This Book', books: bookBooks }
      const pool = classification === 'book-ot' ? OT_BOOKS : NT_BOOKS
      return { title: 'Commentaries & Overviews', books: [NEW_BIBLE_COMMENTARY, ...pool.slice(0, 4)] }
    }
    default:
      return { title: 'Recommended Reading', books: HOWTO_BOOKS }
  }
}

export const BOOK_COMMENTARIES: Record<string, RecommendedBook[]> = {
  "Genesis": [
    { title: "Genesis (Tyndale Old Testament Commentaries)", author: "Derek Kidner", asin: "0830842012", cover: "/book-covers/9780830842018.jpg" },
    { title: "The Message of Genesis 1-11", author: "David J. Atkinson", asin: "1514004518", cover: "/book-covers/9781514004517.jpg" },
    { title: "The Message of Genesis 12-50", author: "Joyce G. Baldwin", asin: "1514004534", cover: "/book-covers/9781514004531.jpg" },
    { title: "Genesis: Beginning and Blessing (Preaching the Word)", author: "R. Kent Hughes", asin: "1433535521", cover: "/book-covers/9781433535529.jpg" },
  ],
  "Exodus": [
    { title: "Exodus (Tyndale Old Testament Commentaries)", author: "R. Alan Cole", asin: "0830842020", cover: "/book-covers/9780830842025.jpg" },
    { title: "The Message of Exodus", author: "J. Alec Motyer", asin: "1514004550", cover: "/book-covers/9781514004555.jpg" },
    { title: "Exodus: Saved for God's Glory (Preaching the Word)", author: "Philip Graham Ryken", asin: "1433548720", cover: "/book-covers/9781433548727.jpg" },
  ],
  "Leviticus": [
    { title: "Leviticus (Tyndale Old Testament Commentaries)", author: "Jay Sklar", asin: "0830842845", cover: "/book-covers/9780830842841.jpg" },
    { title: "The Message of Leviticus", author: "Derek Tidball", asin: "1514004577", cover: "/book-covers/9781514004579.jpg" },
  ],
  "Deuteronomy": [
    { title: "Deuteronomy (Tyndale Old Testament Commentaries)", author: "J. A. Thompson", asin: "1844742601", cover: "/book-covers/9781844742608.jpg" },
    { title: "The Message of Deuteronomy", author: "Raymond Brown", asin: "1514004615", cover: "/book-covers/9781514004616.jpg" },
    { title: "Deuteronomy: Loving Obedience to a Loving God (Preaching the Word)", author: "Ajith Fernando", asin: "1433531003", cover: "/book-covers/9781433531002.jpg" },
  ],
  "Joshua": [
    { title: "Joshua (Tyndale Old Testament Commentaries)", author: "Richard S. Hess", asin: "184474261X", cover: "/book-covers/9781844742615.jpg" },
    { title: "The Message of Joshua", author: "David G. Firth", asin: "1514004631", cover: "/book-covers/9781514004630.jpg" },
    { title: "Joshua: People of God's Purpose (Preaching the Word)", author: "David Jackman", asin: "1433511975", cover: "/book-covers/9781433511974.jpg" },
  ],
  "Samuel": [
    { title: "1 Samuel: Looking on the Heart", author: "Dale Ralph Davis", asin: "1857925165", cover: "/book-covers/9781857925166.jpg" },
    { title: "1 Samuel For You", author: "Tim Chester", asin: "190991956X", cover: "/book-covers/9781909919563.jpg" },
    { title: "2 Samuel: Out of Every Adversity", author: "Dale Ralph Davis", asin: "1845502701", cover: "/book-covers/9781845502706.jpg" },
    { title: "2 Samuel: Your Kingdom Come", author: "John Woodhouse", asin: "1433546132", cover: "/book-covers/9781433546136.jpg" },
  ],
  "Chronicles": [
    { title: "The Message of Chronicles", author: "Michael Wilcock", asin: "1514004739", cover: "/book-covers/9781514004739.jpg" },
    { title: "1 and 2 Chronicles (NIV Application Commentary)", author: "Andrew E. Hill", asin: "0310206103", cover: "/book-covers/9780310206101.jpg" },
    { title: "1 & 2 Chronicles: A Mentor Commentary", author: "Richard L. Pratt Jr.", asin: "1845501446", cover: "/book-covers/9781845501440.jpg" },
  ],
  "Ezra": [
    { title: "Ezra and Nehemiah (Tyndale Old Testament Commentaries)", author: "Derek Kidner", asin: "0830842128", cover: "/book-covers/9780830842124.jpg" },
    { title: "Ezra & Nehemiah: The Quest for Restoration", author: "Dale Ralph Davis", asin: "1527112241", cover: "/book-covers/9781527112247.jpg" },
    { title: "The Message of Ezra & Haggai", author: "Robert Fyall", asin: "0830824324", cover: "/book-covers/9780830824328.jpg" },
  ],
  "Nehemiah": [
    { title: "Ezra and Nehemiah (Tyndale Old Testament Commentaries)", author: "Derek Kidner", asin: "0830842128", cover: "/book-covers/9780830842124.jpg" },
    { title: "Ezra & Nehemiah: The Quest for Restoration", author: "Dale Ralph Davis", asin: "1527112241", cover: "/book-covers/9781527112247.jpg" },
    { title: "The Message of Nehemiah", author: "Raymond Brown", asin: "0830812423", cover: "/book-covers/9780830812424.jpg" },
  ],
  "Esther": [
    { title: "Esther & Ruth (Reformed Expository Commentary)", author: "Iain M. Duguid", asin: "0875527833", cover: "/book-covers/9780875527833.jpg" },
    { title: "According to Plan", author: "Graeme Goldsworthy", asin: "0830826963", cover: "/book-covers/9780830826964.jpg" },
    { title: "God's Big Picture", author: "Vaughan Roberts", asin: "0830853642", cover: "/book-covers/9780830853649.jpg" },
  ],
  "Job": [
    { title: "Job (Tyndale Old Testament Commentaries)", author: "Francis I. Andersen", asin: "0830842144", cover: "/book-covers/9780830842148.jpg" },
    { title: "The Message of Job", author: "David J. Atkinson", asin: "1514005204", cover: "/book-covers/9781514005200.jpg" },
    { title: "Job: The Wisdom of the Cross (Preaching the Word)", author: "Christopher Ash", asin: "1433513129", cover: "/book-covers/9781433513121.jpg" },
  ],
  "Psalm": [
    { title: "Psalms 1-72 (Tyndale Old Testament Commentaries)", author: "Derek Kidner", asin: "0830842152", cover: "/book-covers/9780830842155.jpg" },
    { title: "Psalms 73-150 (Tyndale Old Testament Commentaries)", author: "Derek Kidner", asin: "0830842160", cover: "/book-covers/9780830842162.jpg" },
    { title: "Psalms For You", author: "Christopher Ash", asin: "1784984159", cover: "/book-covers/9781784984151.jpg" },
    { title: "Psalms: An Expositional Commentary", author: "James Montgomery Boice", asin: "080106595X", cover: "/book-covers/9780801065958.jpg" },
  ],
  "Ecclesiastes": [
    { title: "Ecclesiastes (Tyndale Old Testament Commentaries)", author: "Michael A. Eaton", asin: "0830842187", cover: "/book-covers/9780830842186.jpg" },
    { title: "The Message of Ecclesiastes", author: "Derek Kidner", asin: "1514006316", cover: "/book-covers/9781514006313.jpg" },
    { title: "Ecclesiastes: Why Everything Matters (Preaching the Word)", author: "Philip Graham Ryken", asin: "1433548887", cover: "/book-covers/9781433548888.jpg" },
  ],
  "Isaiah": [
    { title: "The Message of Isaiah", author: "Barry G. Webb", asin: "0830812407", cover: "/book-covers/9780830812400.jpg" },
    { title: "Isaiah (Tyndale Old Testament Commentaries)", author: "Paul D. Wegner", asin: "0830842683", cover: "/book-covers/9780830842681.jpg" },
  ],
  "Jeremiah": [
    { title: "The Message of Jeremiah", author: "Christopher J. H. Wright", asin: "0830824391", cover: "/book-covers/9780830824397.jpg" },
    { title: "Jeremiah and Lamentations (Tyndale Old Testament Commentaries)", author: "Hetty Lalleman", asin: "0830842837", cover: "/book-covers/9780830842834.jpg" },
    { title: "Jeremiah and Lamentations: From Sorrow to Hope (Preaching the Word)", author: "Philip Graham Ryken", asin: "1433548801", cover: "/book-covers/9781433548802.jpg" },
  ],
  "Lamentations": [
    { title: "The Message of Lamentations", author: "Christopher J. H. Wright", asin: "0830824413", cover: "/book-covers/9780830824410.jpg" },
    { title: "Jeremiah and Lamentations (Tyndale Old Testament Commentaries)", author: "Hetty Lalleman", asin: "0830842837", cover: "/book-covers/9780830842834.jpg" },
    { title: "Jeremiah and Lamentations: From Sorrow to Hope (Preaching the Word)", author: "Philip Graham Ryken", asin: "1433548801", cover: "/book-covers/9781433548802.jpg" },
  ],
  "Hosea": [
    { title: "Hosea (Tyndale Old Testament Commentaries)", author: "David Allan Hubbard", asin: "0830842241", cover: "/book-covers/9780830842247.jpg" },
    { title: "Hosea (Focus on the Bible)", author: "Michael Eaton", asin: "1857922778", cover: "/book-covers/9781857922776.jpg" },
    { title: "Hosea & Obadiah: Turning Back to God", author: "Michael Bentley", asin: "0852344503", cover: "/book-covers/9780852344507.jpg" },
  ],
  "Joel": [
    { title: "Joel and Amos (Tyndale Old Testament Commentaries)", author: "Tchavdar S. Hadjiev", asin: "0830842721", cover: "/book-covers/9780830842728.jpg" },
    { title: "The Message of Joel, Micah & Habakkuk", author: "David Prior", asin: "1514006472", cover: "/book-covers/9781514006474.jpg" },
    { title: "Joel, Amos, and Obadiah: A 12-Week Study", author: "Kristofer Holroyd", asin: "1433558068", cover: "/book-covers/9781433558061.jpg" },
  ],
  "Amos": [
    { title: "The Message of Amos", author: "J.A. Motyer", asin: "0877842833", cover: "/book-covers/9780877842835.jpg" },
    { title: "Joel and Amos (Tyndale Old Testament Commentaries)", author: "Tchavdar S. Hadjiev", asin: "0830842721", cover: "/book-covers/9780830842728.jpg" },
    { title: "Amos: An Ordinary Man with an Extraordinary Message", author: "T.J. Betts", asin: "1845507274", cover: "/book-covers/9781845507275.jpg" },
  ],
  "Jonah": [
    { title: "The Message of Jonah", author: "Rosemary Nixon", asin: "083082426X", cover: "/book-covers/9780830824267.jpg" },
    { title: "Obadiah, Jonah and Micah (Tyndale Old Testament Commentaries)", author: "T. Desmond Alexander, David W. Baker, Bruce Waltke", asin: "0830842268", cover: "/book-covers/9780830842261.jpg" },
    { title: "Jonah & Micah (Reformed Expository Commentary)", author: "Richard D. Phillips", asin: "1596381140", cover: "/book-covers/9781596381148.jpg" },
    { title: "A Commentary on Jonah", author: "Hugh Martin", asin: "0851511155", cover: "/book-covers/9780851511153.jpg" },
  ],
  "Micah": [
    { title: "The Message of Joel, Micah and Habakkuk", author: "David Prior", asin: "0830812415", cover: "/book-covers/9780830812417.jpg" },
    { title: "Obadiah, Jonah and Micah (Tyndale Old Testament Commentaries)", author: "T. Desmond Alexander, David W. Baker, Bruce Waltke", asin: "0830842268", cover: "/book-covers/9780830842261.jpg" },
    { title: "Jonah, Micah, Nahum, Habakkuk & Zephaniah: God's Just Demands", author: "John L. Mackay", asin: "1845503457", cover: "/book-covers/9781845503451.jpg" },
  ],
  "Nahum": [
    { title: "The Message of Obadiah, Nahum and Zephaniah", author: "Gordon Bridger", asin: "0830824340", cover: "/book-covers/9780830824342.jpg" },
    { title: "Nahum, Habakkuk and Zephaniah (Tyndale Old Testament Commentaries)", author: "S. D. Snyman", asin: "0830842756", cover: "/book-covers/9780830842759.jpg" },
    { title: "Jonah, Micah, Nahum, Habakkuk & Zephaniah: God's Just Demands", author: "John L. Mackay", asin: "1845503457", cover: "/book-covers/9781845503451.jpg" },
  ],
  "Habakkuk": [
    { title: "The Message of Joel, Micah and Habakkuk", author: "David Prior", asin: "0830812415", cover: "/book-covers/9780830812417.jpg" },
    { title: "Habakkuk: A Wrestler with God", author: "Walter J. Chantry", asin: "0851519954", cover: "/book-covers/9780851519951.jpg" },
    { title: "Nahum, Habakkuk and Zephaniah (Tyndale Old Testament Commentaries)", author: "S. D. Snyman", asin: "0830842756", cover: "/book-covers/9780830842759.jpg" },
  ],
  "Zephaniah": [
    { title: "The Message of Obadiah, Nahum and Zephaniah", author: "Gordon Bridger", asin: "0830824340", cover: "/book-covers/9780830824342.jpg" },
    { title: "Nahum, Habakkuk and Zephaniah (Tyndale Old Testament Commentaries)", author: "S. D. Snyman", asin: "0830842756", cover: "/book-covers/9780830842759.jpg" },
    { title: "Jonah, Micah, Nahum, Habakkuk & Zephaniah: God's Just Demands", author: "John L. Mackay", asin: "1845503457", cover: "/book-covers/9781845503451.jpg" },
  ],
  "Haggai": [
    { title: "Haggai, Zechariah and Malachi (Tyndale Old Testament Commentaries)", author: "Joyce G. Baldwin", asin: "0830842284", cover: "/book-covers/9780830842285.jpg" },
    { title: "Haggai, Zechariah & Malachi: God's Restored People", author: "John L. Mackay", asin: "1845506189", cover: "/book-covers/9781845506186.jpg" },
    { title: "The Message of Ezra & Haggai", author: "Robert Fyall", asin: "0830824324", cover: "/book-covers/9780830824328.jpg" },
    { title: "Zephaniah, Haggai, Malachi (Reformed Expository Commentary)", author: "Iain M. Duguid and Matthew P. Harmon", asin: "1629951986", cover: "/book-covers/9781629951980.jpg" },
  ],
  "Zechariah": [
    { title: "Haggai, Zechariah and Malachi (Tyndale Old Testament Commentaries)", author: "Joyce G. Baldwin", asin: "0830842284", cover: "/book-covers/9780830842285.jpg" },
    { title: "The Message of Zechariah: Your Kingdom Come", author: "Barry G. Webb", asin: "0830824308", cover: "/book-covers/9780830824304.jpg" },
    { title: "Zechariah (Reformed Expository Commentary)", author: "Richard D. Phillips", asin: "1596380284", cover: "/book-covers/9781596380288.jpg" },
  ],
  "Malachi": [
    { title: "Haggai, Zechariah and Malachi (Tyndale Old Testament Commentaries)", author: "Joyce G. Baldwin", asin: "0830842284", cover: "/book-covers/9780830842285.jpg" },
    { title: "The Message of Malachi", author: "Peter Adam", asin: "0830824375", cover: "/book-covers/9780830824373.jpg" },
    { title: "Zephaniah, Haggai, Malachi (Reformed Expository Commentary)", author: "Iain M. Duguid and Matthew P. Harmon", asin: "1629951986", cover: "/book-covers/9781629951980.jpg" },
  ],
  "Matthew": [
    { title: "The Message of Matthew", author: "Michael Green", asin: "1789741440", cover: "/book-covers/9781789741445.jpg" },
    { title: "Matthew (Tyndale New Testament Commentary)", author: "R. T. France", asin: "1844742679", cover: "/book-covers/9781844742677.jpg" },
    { title: "Matthew: All Authority in Heaven and on Earth (Preaching the Word)", author: "Douglas Sean O'Donnell", asin: "1433503654", cover: "/book-covers/9781433503658.jpg" },
  ],
  "Mark": [
    { title: "The Message of Mark", author: "Donald English", asin: "1789741459", cover: "/book-covers/9781789741452.jpg" },
    { title: "Mark (Tyndale New Testament Commentary)", author: "R. Alan Cole", asin: "0830842322", cover: "/book-covers/9780830842322.jpg" },
    { title: "Mark: Jesus, Servant and Savior (Preaching the Word)", author: "R. Kent Hughes", asin: "1433538385", cover: "/book-covers/9781433538384.jpg" },
  ],
  "Luke": [
    { title: "The Message of Luke", author: "Michael Wilcock", asin: "0830824219", cover: "/book-covers/9780830824212.jpg" },
    { title: "Luke (Tyndale New Testament Commentaries)", author: "Leon Morris", asin: "0830842330", cover: "/book-covers/9780830842339.jpg" },
    { title: "Luke: That You May Know the Truth (Preaching the Word)", author: "R. Kent Hughes", asin: "1433538342", cover: "/book-covers/9781433538346.jpg" },
  ],
  "John": [
    { title: "The Message of John", author: "Bruce Milne", asin: "0830824227", cover: "/book-covers/9780830824229.jpg" },
    { title: "John (Tyndale New Testament Commentaries, Revised Edition)", author: "Colin G. Kruse", asin: "1783595779", cover: "/book-covers/9781783595778.jpg" },
    { title: "John: That You May Believe (Preaching the Word)", author: "R. Kent Hughes", asin: "1433539195", cover: "/book-covers/9781433539190.jpg" },
  ],
  "Ephesians": [
    { title: "The Message of Ephesians", author: "John Stott", asin: "083082443X", cover: "/book-covers/9780830824434.jpg" },
    { title: "Ephesians (Reformed Expository Commentary)", author: "Bryan Chapell", asin: "1596380160", cover: "/book-covers/9781596380165.jpg" },
    { title: "Ephesians: The Mystery of the Body of Christ (Preaching the Word)", author: "R. Kent Hughes", asin: "1433536269", cover: "/book-covers/9781433536267.jpg" },
  ],
  "Philippians": [
    { title: "The Message of Philippians", author: "J. Alec Motyer", asin: "0830817867", cover: "/book-covers/9780830817863.jpg" },
    { title: "Philippians (Reformed Expository Commentary)", author: "Dennis E. Johnson", asin: "1596382007", cover: "/book-covers/9781596382008.jpg" },
    { title: "Philippians: The Fellowship of the Gospel (Preaching the Word)", author: "R. Kent Hughes", asin: "1581349548", cover: "/book-covers/9781581349542.jpg" },
  ],
  "Colossians": [
    { title: "Colossians and Philemon (Tyndale New Testament Commentaries)", author: "N. T. Wright", asin: "083084242X", cover: "/book-covers/9780830842421.jpg" },
    { title: "The Message of Colossians & Philemon", author: "Dick Lucas", asin: "0830819983", cover: "/book-covers/9780830819980.jpg" },
    { title: "Colossians & Philemon: So Walk In Him", author: "John Woodhouse", asin: "1845506324", cover: "/book-covers/9781845506322.jpg" },
  ],
  "Thessalonians": [
    { title: "1 and 2 Thessalonians (Tyndale New Testament Commentaries)", author: "Leon Morris", asin: "0830842438", cover: "/book-covers/9780830842438.jpg" },
    { title: "The Message of 1 & 2 Thessalonians", author: "John Stott", asin: "0830824448", cover: "/book-covers/9780830824441.jpg" },
    { title: "1 & 2 Thessalonians For You", author: "Ligon Duncan", asin: "1784985015", cover: "/book-covers/9781784985011.jpg" },
  ],
  "Timothy": [
    { title: "1-2 Timothy and Titus: To Guard the Deposit (Preaching the Word)", author: "R. Kent Hughes with Bryan Chapell", asin: "1433530538", cover: "/book-covers/9781433530531.jpg" },
    { title: "1-2 Timothy & Titus (IVP New Testament Commentary)", author: "Philip H. Towner", asin: "0830840141", cover: "/book-covers/9780830840144.jpg" },
    { title: "The Message of 2 Timothy", author: "John Stott", asin: "0830824995", cover: "/book-covers/9780830824991.jpg" },
  ],
  "Titus": [
    { title: "Guard the Truth: The Message of 1 Timothy & Titus", author: "John Stott", asin: "0830819924", cover: "/book-covers/9780830819928.jpg" },
    { title: "1-2 Timothy and Titus: To Guard the Deposit (Preaching the Word)", author: "R. Kent Hughes with Bryan Chapell", asin: "1433530538", cover: "/book-covers/9781433530531.jpg" },
    { title: "1-2 Timothy & Titus (IVP New Testament Commentary)", author: "Philip H. Towner", asin: "0830840141", cover: "/book-covers/9780830840144.jpg" },
  ],
  "Philemon": [
    { title: "Colossians and Philemon (Tyndale New Testament Commentaries)", author: "N. T. Wright", asin: "083084242X", cover: "/book-covers/9780830842421.jpg" },
    { title: "The Message of Colossians & Philemon", author: "Dick Lucas", asin: "0830819983", cover: "/book-covers/9780830819980.jpg" },
    { title: "Colossians & Philemon: So Walk In Him", author: "John Woodhouse", asin: "1845506324", cover: "/book-covers/9781845506322.jpg" },
  ],
  "Hebrews": [
    { title: "The Message of Hebrews", author: "Raymond Brown", asin: "0830825045", cover: "/book-covers/9780830825042.jpg" },
    { title: "Hebrews: An Anchor for the Soul (Preaching the Word)", author: "R. Kent Hughes", asin: "1433538423", cover: "/book-covers/9781433538421.jpg" },
    { title: "Hebrews: A Call to Commitment", author: "William L. Lane", asin: "1573832952", cover: "/book-covers/9781573832953.jpg" },
  ],
  "Revelation": [
    { title: "The Message of Revelation", author: "Michael Wilcock", asin: "0830825215", cover: "/book-covers/9780830825219.jpg" },
    { title: "Triumph of the Lamb: A Commentary on Revelation", author: "Dennis E. Johnson", asin: "0875522009", cover: "/book-covers/9780875522005.jpg" },
    { title: "The Returning King: A Guide to the Book of Revelation", author: "Vern S. Poythress", asin: "0875524621", cover: "/book-covers/9780875524627.jpg" },
  ],
}

