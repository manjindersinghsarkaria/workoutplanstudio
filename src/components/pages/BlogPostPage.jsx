import { useParams, Link, Navigate } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { getPostBySlug, blogPosts } from "@/data/blogPosts";
import { AffiliateProducts } from "@/components/ui/AffiliateProducts";
import { BLOG_GEAR } from "@/data/affiliateProducts";

// ── Section renderers ─────────────────────────────────────────────────────────

function Paragraph({ content }) {
  return <p className="text-slate-400 leading-relaxed">{content}</p>;
}

function Heading2({ content }) {
  return (
    <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-3 mt-8">
      {content}
    </h2>
  );
}

function Heading3({ content }) {
  return (
    <h3 className="text-lg font-semibold text-slate-200 mt-6">{content}</h3>
  );
}

function BulletList({ content }) {
  return (
    <ul className="space-y-2 pl-1">
      {content.map((item, i) => (
        <li key={i} className="flex gap-3 text-slate-400 leading-relaxed">
          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function OrderedList({ content }) {
  return (
    <ol className="space-y-2 pl-1">
      {content.map((item, i) => (
        <li key={i} className="flex gap-3 text-slate-400 leading-relaxed">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function Tip({ content }) {
  return (
    <div className="rounded-xl border border-blue-500/30 bg-blue-600/10 px-4 py-3 text-sm text-blue-300">
      <span className="font-bold text-blue-400">Tip: </span>
      {content}
    </div>
  );
}

function Table({ content }) {
  const { headers, rows } = content;
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-800/60">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left font-semibold text-slate-200"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-slate-900/40" : "bg-slate-900/20"}
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-slate-400">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderSection(section, i) {
  switch (section.type) {
    case "p":
      return <Paragraph key={i} content={section.content} />;
    case "h2":
      return <Heading2 key={i} content={section.content} />;
    case "h3":
      return <Heading3 key={i} content={section.content} />;
    case "ul":
      return <BulletList key={i} content={section.content} />;
    case "ol":
      return <OrderedList key={i} content={section.content} />;
    case "tip":
      return <Tip key={i} content={section.content} />;
    case "table":
      return <Table key={i} content={section.content} />;
    default:
      return null;
  }
}

// ── Related posts ─────────────────────────────────────────────────────────────

function RelatedPosts({ currentSlug }) {
  const related = blogPosts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Related Articles</h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {related.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-blue-500/40 transition-all"
          >
            <p className="text-xs text-slate-500 mb-1">{post.category}</p>
            <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.datePublished,
    author: {
      "@type": "Organization",
      name: "WorkoutPlanStudio",
      url: "https://www.workoutplanstudio.ca",
    },
    publisher: {
      "@type": "Organization",
      name: "WorkoutPlanStudio",
      url: "https://www.workoutplanstudio.ca",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.workoutplanstudio.ca/blog/${post.slug}`,
    },
    keywords: post.tags?.join(", "),
  };

  const formattedDate = new Date(post.datePublished).toLocaleDateString(
    "en-CA",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader label="Blog" />

      <main className="mx-auto max-w-3xl px-4 py-12 space-y-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link to="/blog" className="hover:text-slate-300 transition">
            Blog
          </Link>
          <span>/</span>
          <span className="text-slate-400 truncate">{post.title}</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-600/20 text-blue-400 border border-blue-500/30">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            {post.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-800" />

        {/* Article body */}
        <article className="space-y-5">
          {post.sections.map((section, i) => renderSection(section, i))}
        </article>

        {/* Affiliate gear */}
        <AffiliateProducts gearSetKey={BLOG_GEAR[slug]} />

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">
            Track your workouts for free
          </h2>
          <p className="text-slate-400 text-sm">
            WorkoutPlanStudio turns any workout plan into an interactive
            session tracker — rest timers, set logging, and history included.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/app"
              className="inline-block px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/30 text-sm"
            >
              Open WorkoutPlanStudio
            </Link>
            <Link
              to="/sample-plans"
              className="inline-block px-6 py-2.5 rounded-xl font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 transition-all text-sm"
            >
              Browse Sample Plans
            </Link>
          </div>
        </div>

        {/* Related */}
        <RelatedPosts currentSlug={slug} />

        {/* Back link */}
        <Link
          to="/blog"
          className="inline-block text-sm text-blue-400 hover:underline"
        >
          ← Back to all articles
        </Link>
      </main>

      <SiteFooter />
    </div>
  );
}
