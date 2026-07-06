import Footer from '../components/Footer';

const caption = 'Make the low opacity overlay trend online for free. Upload two photos, lower the opacity, export for X/Twitter. No Photoshop, no CapCut, no upload, no login.';

const faq = [
  {
    question: 'What app is used for the low opacity overlay trend?',
    answer: 'People use Photoshop, CapCut, Canva, PicsArt, and browser tools. LowkeyPic is built only for this trend, so it is faster: upload two photos, lower opacity, drag the overlay, and download.',
  },
  {
    question: 'How do I make one photo transparent over another?',
    answer: 'Put the second photo on top of the first photo, then lower its opacity to about 7-10%. In LowkeyPic, upload the normal photo, upload the hidden overlay photo, and use the How hidden slider.',
  },
  {
    question: 'Can I do the opacity trend on iPhone?',
    answer: 'Yes. Open LowkeyPic in Safari, choose two photos from your camera roll, set opacity around 7-10%, adjust the overlay, then download the final image.',
  },
  {
    question: 'Can I make the Twitter overlay trend without Photoshop?',
    answer: 'Yes. LowkeyPic works in your browser, so you can make the Twitter overlay trend without Photoshop, without CapCut, and without installing an app.',
  },
  {
    question: 'What opacity is best for the hidden overlay trend?',
    answer: 'Start around 7-10%. Use 4-6% for a very subtle hidden photo overlay, and 12-16% if the overlay needs to be easier to notice.',
  },
  {
    question: 'Does LowkeyPic upload my photos?',
    answer: 'No. LowkeyPic processes images locally in your browser using Canvas APIs. Your photos are not uploaded, stored, or sent to a server.',
  },
  {
    question: 'Can I remove the tiny credit?',
    answer: 'Yes. Tiny credit is on by default, but you can turn it off in More export options before downloading.',
  },
  {
    question: 'Is LowkeyPic free?',
    answer: 'Yes. LowkeyPic is free to use and does not require login.',
  },
];

export default function SeoArticlePage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'How to Make the Low Opacity Overlay Trend on X/Twitter — Free Online Tool',
      description: caption,
      image: [
        'https://lowkeypic.emanuele.click/low-opacity-overlay-editor-lowkeypic.webp',
        'https://lowkeypic.emanuele.click/low-opacity-overlay-trend-before-after.webp',
      ],
      author: {
        '@type': 'Person',
        name: 'Emanuele',
        url: 'https://emanuele.click',
      },
      publisher: {
        '@type': 'Organization',
        name: 'LowkeyPic',
        url: 'https://lowkeypic.emanuele.click',
      },
      mainEntityOfPage: 'https://lowkeypic.emanuele.click/how-to-make-low-opacity-overlay-trend/',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'LowkeyPic',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'iOS, Android, macOS, Windows, Linux',
      url: 'https://lowkeypic.emanuele.click/',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description: 'A free browser tool for making the low opacity overlay trend for X/Twitter. No upload, no login, no Photoshop, no CapCut.',
    },
  ];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <a className="link" href="/#editor">Back to the editor</a>
          <p className="mt-8 text-sm font-bold uppercase tracking-[.2em] text-cyan-100/70">LowkeyPic guide</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-6xl">
            How to Make the Low Opacity Overlay Trend on X/Twitter — Free Online Tool
          </h1>
          <p className="mt-5 text-xl leading-8 text-white/70">
            The low opacity overlay trend is the X/Twitter image effect where one normal photo has a second hidden photo placed faintly on top. To make it, upload two photos, lower the top photo opacity, adjust the position, then export one final image. LowkeyPic is built exactly for this: no upload, no login, no Photoshop, no CapCut, just a browser tool that gets you to the post fast.
          </p>

          <CtaCard />

          <section className="mt-8 rounded-[2rem] bg-white/[0.06] p-5 shadow-soft">
            <h2 className="text-2xl font-black text-white">Quick answer</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-7 text-white/70">
              <li>Upload your normal photo.</li>
              <li>Upload the hidden overlay photo.</li>
              <li>Set opacity around 7-10%.</li>
              <li>Adjust size, blur, and position.</li>
              <li>Download the final image for X/Twitter.</li>
            </ol>
          </section>

          <MediaPlaceholder
            filename="low-opacity-overlay-editor-lowkeypic.webp"
            alt="LowkeyPic editor showing a low opacity overlay photo tool in the browser"
            label="Editor screenshot placeholder"
          />

          <div className="prose-dark mt-10">
            <h2>What is the low opacity overlay trend on X/Twitter?</h2>
            <p>The low opacity overlay trend is a simple photo edit: one image is visible, and a second image is layered over it at low opacity. The hidden photo overlay is faint enough that the post looks normal at first, then people notice the second layer when they look closer.</p>
            <p>People call it the low opacity overlay trend, opacity trend, hidden photo overlay, transparent photo overlay, X overlay picture trend, Twitter overlay trend, or “how do I put one picture faintly over another.” Same idea, different search terms, very internet.</p>

            <h2>What app do people use for the opacity overlay trend?</h2>
            <p>Photoshop, CapCut, Canva, and PicsArt can all do opacity edits. They work, but they are general editing apps, which means extra menus, timelines, layers, exports, and little moments where you wonder why this became a project.</p>
            <p><a href="/#editor">LowkeyPic</a> is simpler because it is built only for this trend. Upload the normal pic, upload the hidden layer, lower the opacity, download. That is the whole thing.</p>

            <h2>How to overlay two photos online for free</h2>
            <p>Use <a href="/#editor">LowkeyPic</a> as a transparent photo overlay online tool. The editor runs in your browser, so you can overlay two photos online free without making an account or sending images to a server.</p>
            <p>The normal photo becomes the base. The hidden photo becomes the overlay. Use the opacity slider to make one photo transparent over another, then drag the overlay until the composition feels right.</p>

            <MediaPlaceholder
              filename="low-opacity-overlay-trend-before-after.webp"
              alt="Before and after example of the low opacity overlay trend with a hidden photo layer"
              label="Before/after example placeholder"
            />

            <h2>How to make the trend on iPhone</h2>
            <p>On iPhone, open <a href="/#editor">LowkeyPic</a> in Safari. Tap Normal pic and choose a photo from your camera roll. Tap Hidden layer and choose the photo you want to place faintly on top. Set opacity to around 7-10%, adjust the size or position with your finger, then tap Download Image.</p>
            <p>You do not need to install Photoshop, CapCut, Canva, or another app just to make the opacity trend on iPhone.</p>

            <h2>How to make the trend without Photoshop or CapCut</h2>
            <p>If you only want the X overlay picture trend, Photoshop and CapCut are overkill. LowkeyPic gives you the few controls that matter: opacity, size, tilt, position, blur, and export. No layers panel. No video timeline. No “wait, where is opacity?” moment.</p>
            <p>That makes it useful when you saw the trend on X/Twitter and just want to make one quickly before the idea gets stale.</p>

            <VideoPlaceholder
              filename="how-to-make-low-opacity-overlay-trend.mp4"
              label="Short demo video placeholder"
            />

            <h2>Best opacity settings for the hidden overlay effect</h2>
            <p>Start at 7-10% opacity. That range usually makes the hidden photo visible enough to reward a second look without turning the post into an obvious double exposure.</p>
            <p>Use 4-6% for a very subtle hidden photo overlay. Use 12-16% if the hidden image has low contrast or needs to be more readable. Anything over 20% starts to feel less “lowkey” and more like a normal transparent overlay.</p>

            <h2>How to make the hidden photo look subtle</h2>
            <p>Subtle overlays are mostly about edges and contrast. If the hidden layer looks pasted on, lower the opacity. If it still feels sharp, add a little blur. If it looks too centered, drag it slightly off-axis or rotate it a tiny bit.</p>
            <p>For darker base photos, try screen or soft-light in Advanced. For bright base photos, normal or multiply may work better. The goal is not perfection. The goal is “wait, what am I seeing?”</p>

            <h2>Best export size for X/Twitter</h2>
            <p>Portrait 1080x1350 is the recommended export because it gives the image more room in the feed. Square 1080x1080 is good if you want a safer crop across platforms. X wide 1600x900 works for landscape photos, memes, and screenshots.</p>
            <p>LowkeyPic defaults to portrait JPEG at high quality so the main export is one tap. More export options are there if you want them, but you do not need to touch them.</p>

            <h2>Privacy: do your images get uploaded?</h2>
            <p>No. LowkeyPic uses browser Canvas APIs to process the image locally on your device. Your photos are not uploaded, stored, or sent to a server. There is no login and no backend image processing.</p>
            <p>We may use privacy-friendly aggregate analytics to understand visits. Your images never leave your device.</p>

            <h2>Consent and safety reminder</h2>
            <p>Only use images you own or have permission to use. If another person is in the image, make sure they are okay with the edit and the post. Hidden does not mean harmless.</p>

            <CtaCard compact />

            <h2>FAQ</h2>
            {faq.map((item) => (
              <section key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </section>
            ))}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}

function CtaCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="mt-8 rounded-[2rem] bg-violet-200/[0.09] p-5 shadow-soft">
      <p className="font-bold text-white">{compact ? 'Ready to make yours?' : 'Want to make one now?'}</p>
      <p className="mt-2 text-white/60">Use the free browser editor. No upload, no login, no Photoshop, no CapCut.</p>
      <a className="primary-button mt-4 inline-flex" href="/#editor">Start creating</a>
    </div>
  );
}

function MediaPlaceholder(props: { filename: string; alt: string; label: string }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-[2rem] bg-white/[0.06] p-3 shadow-soft">
      <div
        role="img"
        aria-label={props.alt}
        className="flex aspect-[16/10] items-center justify-center rounded-[1.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(167,139,250,.35),transparent_34%),linear-gradient(135deg,#15131f,#08070d)] text-center"
      >
        <div>
          <p className="text-lg font-black text-white">{props.label}</p>
          <p className="mt-2 text-sm text-white/50">{props.filename}</p>
        </div>
      </div>
      <figcaption className="px-2 pt-3 text-sm text-white/50">{props.alt}</figcaption>
    </figure>
  );
}

function VideoPlaceholder(props: { filename: string; label: string }) {
  return (
    <figure className="mt-8 overflow-hidden rounded-[2rem] bg-white/[0.06] p-3 shadow-soft">
      <div className="flex aspect-video items-center justify-center rounded-[1.5rem] bg-black/30 text-center">
        <div>
          <p className="text-lg font-black text-white">{props.label}</p>
          <p className="mt-2 text-sm text-white/50">{props.filename}</p>
        </div>
      </div>
      <figcaption className="px-2 pt-3 text-sm text-white/50">Short demo video placeholder for how to make the low opacity overlay trend.</figcaption>
    </figure>
  );
}
