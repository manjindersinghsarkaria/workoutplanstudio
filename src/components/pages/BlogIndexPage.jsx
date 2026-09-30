import { Link } from "react-router-dom";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { blogPosts } from "@/data/blogPosts";

const CATEGORY_COLORS = {
  "Workout Planning": "bg-blue-600/20 text-blue-400 border-blue-500/30",
  "Workout Splits": "bg-purple-600/20 text-purple-400 border-purple-500/30",
  "Strength Programs": "bg-orange-600/20 text-orange-400 border-orange-500/30",
  "Training Principles": "bg-cyan-600/20 text-cyan-400 border-cyan-500/30",
  "Workout Plans": "bg-green-600/20 text-green-400 border-green-500/30",
};

function CategoryBadge({ category }) {
  const cls =
    CATEGORY_COLORS[category] ??
    "bg-slate-600/20 text-slate-400 border-slate-500/30";
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${cls}`}
    >
      {category}
    </span>
  );
}

function PostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-blue-500/40 hover:bg-slate-900 transition-all"
    >
      <div className="flex items-center gap-2 mb-3">
        <CategoryBadge category={post.category} />
        <span className="text-xs text-slate-500">{post.readTime}</span>
      </div>
      <h2 className="text-lg font-bold text-white leading-snug group-hover:text-blue-400 transition-colors mb-2">
        {post.title}
      </h2>
      <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
        {post.description}
      </p>
      <span className="inline-block mt-4 text-xs font-semibold text-blue-400 group-hover:underline">
        Read article →
      </span>
    </Link>
  );
}

export default function BlogIndexPage() {
  // JSON-LD for the blog listing page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "WorkoutPlanStudio Blog",
    description:
      "Expert guides on workout planning, training splits, and strength programming.",
    url: "https://www.workoutplanstudio.ca/blog",
    publisher: {
      "@type": "Organization",
      name: "WorkoutPlanStudio",
      url: "https://www.workoutplanstudio.ca",
    },
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.datePublished,
      url: `https://www.workoutplanstudio.ca/blog/${p.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader label="Blog" />

      <main className="mx-auto max-w-3xl px-4 py-12 space-y-10">
        {/* Hero */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-600/20 text-blue-400 border border-blue-500/30">
            Workout Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Workout Planning Blog
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Science-based guides on training splits, strength programs, and
            everything you need to build an effective workout plan.
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {blogPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center space-y-4">
          <h2 className="text-xl font-bold text-white">
            Ready to start training?
          </h2>
          <p className="text-slate-400 text-sm">
            Use WorkoutPlanStudio to generate, load, and track any workout plan
            — free, no account needed.
          </p>
          <Link
            to="/app"
            className="inline-block px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/30"
          >
            Open the App
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
