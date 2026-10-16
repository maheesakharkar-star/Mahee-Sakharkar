/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, MouseEvent, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MessageSquare, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Sparkles, 
  Send, 
  CheckCircle,
  Key,
  HelpCircle,
  ChevronRight,
  Share2
} from 'lucide-react';
import { BlogPost, Comment } from '../types';
import { blogPostsData } from '../data';
import { updatePageSeo } from '../utils/seo';

interface BlogViewProps {
  initialArticleSlug?: string | null;
  navigate: (path: string) => void;
}

export default function BlogView({ initialArticleSlug, navigate }: BlogViewProps) {
  const [activeBlogCategory, setActiveBlogCategory] = useState<'all' | 'tips' | 'diy' | 'impact'>('all');
  const [blogs, setBlogs] = useState<BlogPost[]>(blogPostsData);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // New Comment state
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // DIY tip project upload form
  const [tipTitle, setTipTitle] = useState('');
  const [tipCategory, setTipCategory] = useState('diy');
  const [tipDesc, setTipDesc] = useState('');
  const [tipUploader, setTipUploader] = useState('');
  const [submitTipSuccess, setSubmitTipSuccess] = useState(false);

  // Sync blogs and URL slug
  useEffect(() => {
    const savedBlogs = localStorage.getItem('second_story_blogs');
    let loadedBlogs = blogPostsData;
    if (savedBlogs) {
      try {
        const parsed = JSON.parse(savedBlogs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          loadedBlogs = parsed.map((item: any) => {
            const defaultItem = blogPostsData.find((b) => b.id === item.id);
            return {
              ...defaultItem,
              ...item,
              slug: item.slug || defaultItem?.slug || item.id || 'article',
              mainKeyword: item.mainKeyword || defaultItem?.mainKeyword || 'sustainable upcycling',
              relatedKeywords: item.relatedKeywords || defaultItem?.relatedKeywords || ['eco living', 'circular craft'],
              aeoQuestions: item.aeoQuestions || defaultItem?.aeoQuestions || [],
              likes: typeof item.likes === 'number' ? item.likes : defaultItem?.likes || 0,
              comments: Array.isArray(item.comments) ? item.comments : defaultItem?.comments || []
            };
          });
        }
      } catch (err) {
        console.error('Error parsing blogs storage:', err);
      }
    }
    setBlogs(loadedBlogs);

    if (initialArticleSlug) {
      const found = loadedBlogs.find(
        (b) => b.slug === initialArticleSlug || b.id === initialArticleSlug
      );
      if (found) {
        setSelectedPost(found);
        updatePageSeo(`/blog/${found.slug || found.id}`);
      }
    } else {
      setSelectedPost(null);
      updatePageSeo('/blog');
    }
  }, [initialArticleSlug]);

  const handleSelectArticle = (post: BlogPost) => {
    setSelectedPost(post);
    navigate(`/blog/${post.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCatalog = () => {
    setSelectedPost(null);
    navigate('/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (cat: 'all' | 'tips' | 'diy' | 'impact') => {
    setActiveBlogCategory(cat);
    if (selectedPost) {
      handleBackToCatalog();
    }
  };

  const handleLike = (postId: string, e: MouseEvent) => {
    e.stopPropagation();
    const updated = blogs.map((p) => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    });
    setBlogs(updated);
    localStorage.setItem('second_story_blogs', JSON.stringify(updated));

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
    }
  };

  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !commentName.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: 'comment-' + Date.now(),
      author: commentName,
      text: commentText,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedBlogs = blogs.map((p) => {
      if (p.id === selectedPost.id) {
        const comments = p.comments ? [...p.comments, newComment] : [newComment];
        return { ...p, comments };
      }
      return p;
    });

    setBlogs(updatedBlogs);
    localStorage.setItem('second_story_blogs', JSON.stringify(updatedBlogs));
    
    setSelectedPost({
      ...selectedPost,
      comments: selectedPost.comments ? [...selectedPost.comments, newComment] : [newComment]
    });

    setCommentName('');
    setCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const handleSuggestTipSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newTip = {
      id: 'user-tip-' + Date.now(),
      title: tipTitle,
      category: tipCategory,
      details: tipDesc,
      uploader: tipUploader,
      submittedDate: new Date().toISOString()
    };

    const savedTips = JSON.parse(localStorage.getItem('second_story_user_tips') || '[]');
    savedTips.push(newTip);
    localStorage.setItem('second_story_user_tips', JSON.stringify(savedTips));

    setSubmitTipSuccess(true);
    setTipTitle('');
    setTipDesc('');
    setTipUploader('');

    setTimeout(() => setSubmitTipSuccess(false), 5000);
  };

  // Helper to render markdown content with semantic <h2> for AEO
  const renderFormattedArticle = (content?: string) => {
    if (!content || typeof content !== 'string') return null;
    const lines = content.split('\n');
    const elements: ReactNode[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = (key: string) => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ').trim();
        if (text) {
          elements.push(
            <p key={key} className="text-sm sm:text-base text-earth-dark/90 leading-relaxed font-sans mb-4">
              {text}
            </p>
          );
        }
        currentParagraph = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ')) {
        flushParagraph(`p-before-h2-${index}`);
        const h2Text = trimmed.replace('## ', '');
        elements.push(
          <div key={`h2-block-${index}`} className="pt-6 pb-2 border-b border-[#E8E2D9]/70 mb-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-forest bg-forest/10 px-2.5 py-0.5 rounded-md mb-2">
              <HelpCircle className="h-3 w-3" />
              <span>AEO Answer Heading</span>
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-earth-dark tracking-tight leading-snug">
              {h2Text}
            </h2>
          </div>
        );
      } else if (trimmed.startsWith('### ')) {
        flushParagraph(`p-before-h3-${index}`);
        const h3Text = trimmed.replace('### ', '');
        elements.push(
          <h3 key={`h3-${index}`} className="font-display text-base sm:text-lg font-bold text-earth-dark mt-5 mb-2">
            {h3Text}
          </h3>
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        flushParagraph(`p-before-li-${index}`);
        elements.push(
          <li key={`li-${index}`} className="text-sm text-earth-slate ml-6 list-disc mb-1.5 leading-relaxed">
            {trimmed.replace(/^[-*]\s+/, '')}
          </li>
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        flushParagraph(`p-before-num-${index}`);
        const itemText = trimmed.replace(/^\d+\.\s+/, '');
        elements.push(
          <li key={`num-${index}`} className="text-sm text-earth-slate ml-6 list-decimal mb-2 leading-relaxed">
            {itemText}
          </li>
        );
      } else if (trimmed === '') {
        flushParagraph(`p-empty-${index}`);
      } else {
        currentParagraph.push(trimmed);
      }
    });

    flushParagraph('p-final');
    return elements;
  };

  // Filter blog listing
  const filteredBlogs = blogs.filter((post) => {
    if (activeBlogCategory === 'all') return true;
    return post.category === activeBlogCategory;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Intro Header */}
      <section id="blog-header" className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-sans text-xs font-bold text-forest bg-forest/10 px-4 py-1.5 rounded-full uppercase tracking-wider">
          The Second Story Journal · Editorial & AEO Resource
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F1916] tracking-tight">
          Sustainable Living, DIY Guides & Impact Stories
        </h1>
        <p className="font-sans text-sm text-earth-slate leading-relaxed">
          Explore structured zero-waste techniques, beginner-friendly upcycling crafts, and inspiring stories of marginalized women reclaiming self-reliance through the circular economy.
        </p>

        {/* Categories Tab list buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#E8E2D9] pb-3 pt-2">
          {[
            { id: 'all', label: 'All Articles' },
            { id: 'tips', label: 'Sustainability Tips' },
            { id: 'diy', label: 'DIY Upcycling Projects' },
            { id: 'impact', label: 'Impact Histories' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id as any)}
              className={`rounded-full px-4.5 py-2 text-xs font-bold transition-all ${
                activeBlogCategory === cat.id
                  ? 'bg-forest text-white shadow-md shadow-forest/20'
                  : 'bg-white text-earth-slate border border-[#E8E2D9] hover:bg-[#F3EDE3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Column Grid Section */}
      <div id="blog-main-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 Columns: Dynamic Blog Stream (either Lists or Expanded details) */}
        <div className="lg:col-span-8 space-y-8">
          
          <AnimatePresence mode="wait">
            {!selectedPost ? (
              
              /* CARD VIEW STREAM */
              <motion.div 
                key="list-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredBlogs.map((post) => (
                  <article
                    key={post.id}
                    className="group rounded-2xl border border-[#E8E2D9] bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full hover:border-[#CC7722]/30"
                  >
                    <div>
                      {/* Image Thumbnail with Small Size & Alt Text */}
                      <div className="relative aspect-video w-full bg-zinc-100 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.imageAlt || post.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-[#1F1916]/80 text-[#FCFAF7] backdrop-blur-sm px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider">
                          {post.category === 'tips' ? 'Eco-Tips' : post.category === 'diy' ? 'DIY Guide' : 'Social Impact'}
                        </span>
                      </div>

                      <div className="p-6 space-y-3.5">
                        <div className="flex items-center gap-3 font-mono text-[10px] text-earth-slate">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-forest" />
                            <span>{post.publishedDate}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-ochre" />
                            <span>{post.readTime} Read</span>
                          </span>
                        </div>

                        {/* Title with Anchor Link */}
                        <h2 className="font-display font-bold text-base sm:text-lg text-earth-dark group-hover:text-[#CC7722] transition-colors leading-snug">
                          <a
                            href={`/blog/${post.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleSelectArticle(post);
                            }}
                            className="hover:underline"
                            title={`Read complete article: ${post.title}`}
                          >
                            {post.title}
                          </a>
                        </h2>

                        <p className="font-sans text-xs text-earth-slate line-clamp-3 leading-relaxed">
                          {post.summary}
                        </p>

                        {/* SEO Keyword tags indicator */}
                        {post.mainKeyword ? (
                          <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] font-mono text-earth-slate/80">
                            <span className="bg-[#FCFAF7] border border-[#E8E2D9] px-2 py-0.5 rounded">
                              #{post.mainKeyword.replace(/\s+/g, '-')}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-[#F2ECE4] mt-2 flex items-center justify-between text-xs font-semibold text-earth-slate">
                      <a
                        href={`/blog/${post.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelectArticle(post);
                        }}
                        className="text-forest hover:text-ochre font-bold flex items-center gap-1 underline"
                        title={`Read ${post.title}`}
                      >
                        <span>Read Full Article</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </a>

                      <div className="flex items-center gap-3 pt-3">
                        <button
                          type="button"
                          onClick={(e) => handleLike(post.id, e)}
                          className="flex items-center gap-1 text-ochre hover:text-red-500 transition-colors"
                          aria-label={`Like ${post.title}`}
                        >
                          <Heart className="h-4 w-4 fill-current text-ochre tracking-wider hover:scale-110" />
                          <span>{post.likes}</span>
                        </button>
                        <span className="flex items-center gap-1 text-earth-slate">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments ? post.comments.length : 0}</span>
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </motion.div>

            ) : (
              
              /* EXPANDED DETAILED JOURNAL VIEW WITH AEO HEADINGS AND UNIQUE URL */
              <motion.article 
                key="detail-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm"
              >
                {/* Semantic Breadcrumbs with Anchor Texts */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-earth-slate">
                  <a
                    href="/"
                    onClick={(e) => { e.preventDefault(); navigate('/'); }}
                    className="hover:text-forest underline"
                    title="Return to The Second Story Home"
                  >
                    Home
                  </a>
                  <ChevronRight className="h-3 w-3" />
                  <a
                    href="/blog"
                    onClick={(e) => { e.preventDefault(); handleBackToCatalog(); }}
                    className="hover:text-forest underline"
                    title="Browse all journal articles"
                  >
                    The Second Story Journal
                  </a>
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-earth-dark font-semibold truncate max-w-xs">{selectedPost.title}</span>
                </nav>

                <div className="flex justify-between items-center">
                  <a
                    href="/blog"
                    onClick={(e) => {
                      e.preventDefault();
                      handleBackToCatalog();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-ochre underline transition-all"
                    title="Return to journal catalog"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Journal Catalog</span>
                  </a>

                  <span className="text-xs font-mono text-earth-slate bg-[#FCFAF7] border border-[#E8E2D9] px-2.5 py-1 rounded">
                    URL: /blog/{selectedPost.slug}
                  </span>
                </div>

                {/* Banner Header */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-earth-slate">
                    <span className="bg-[#FCFAF7] border border-[#E8E2D9] px-2.5 py-0.5 rounded text-ochre font-extrabold uppercase">
                      Category: {selectedPost.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedPost.publishedDate}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{selectedPost.readTime} ReadTime</span>
                    </span>
                  </div>

                  <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-earth-dark leading-tight [text-wrap:balance]">
                    {selectedPost.title}
                  </h1>

                  <div className="flex items-center gap-2.5 text-xs text-earth-slate border-b border-[#F2ECE4] pb-4">
                    <div className="h-7 w-7 rounded-full bg-forest text-white font-display font-bold flex items-center justify-center text-[10px]">
                      {selectedPost.author ? selectedPost.author.charAt(0) : 'A'}
                    </div>
                    <span>Published by: <strong className="text-earth-dark">{selectedPost.author || 'The Second Story Team'}</strong></span>
                  </div>
                </div>

                {/* Main and Related Keywords Banner for AI Studio & Crawlers */}
                <div className="rounded-2xl border border-forest/20 bg-forest/5 p-4 sm:p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-forest uppercase tracking-wider">
                    <Key className="h-4 w-4" />
                    <span>Target Search & AEO Keywords</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="bg-white p-2.5 rounded-xl border border-forest/20">
                      <span className="block text-[10px] font-mono text-earth-slate uppercase">Main Keyword</span>
                      <strong className="text-earth-dark text-xs">{selectedPost.mainKeyword || 'sustainable upcycling'}</strong>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-forest/20">
                      <span className="block text-[10px] font-mono text-earth-slate uppercase">Related Keyword 1</span>
                      <span className="text-earth-dark font-medium text-xs">{(selectedPost.relatedKeywords && selectedPost.relatedKeywords[0]) || 'eco crafts'}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-forest/20">
                      <span className="block text-[10px] font-mono text-earth-slate uppercase">Related Keyword 2</span>
                      <span className="text-earth-dark font-medium text-xs">{(selectedPost.relatedKeywords && selectedPost.relatedKeywords[1]) || 'zero waste living'}</span>
                    </div>
                  </div>
                </div>

                {/* Big Image banner with Small Size & Alt Text */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-100 border border-[#E8E2D9]">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.imageAlt || selectedPost.title}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Main Content Rendered with Genuine Semantic <h2> for AEO */}
                <div id="blog-rendered-content" className="space-y-4">
                  {renderFormattedArticle(selectedPost.content)}
                </div>

                {/* AEO Dedicated Q&A Box for Search Answer Engines */}
                {selectedPost.aeoQuestions && selectedPost.aeoQuestions.length > 0 && (
                  <div className="rounded-2xl border border-ochre/30 bg-[#FFFDF8] p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-ochre uppercase tracking-wider">
                      <HelpCircle className="h-4 w-4" />
                      <span>Answer Engine Optimization (AEO) Key Takeaways</span>
                    </div>
                    <div className="space-y-4">
                      {selectedPost.aeoQuestions.map((qa, idx) => (
                        <div key={idx} className="border-l-2 border-ochre pl-4 space-y-1">
                          <h3 className="text-sm font-bold text-earth-dark">Q: {qa.question}</h3>
                          <p className="text-xs text-earth-slate leading-relaxed"><strong>A:</strong> {qa.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Liker button */}
                <div className="flex justify-between items-center bg-[#FCFAF7] border border-[#E8E2D9] p-4 rounded-2xl">
                  <span className="text-xs font-display font-bold text-earth-dark">Find this upcycling guide helpful?</span>
                  <button
                    onClick={(e) => handleLike(selectedPost.id, e)}
                    className="flex items-center gap-2 px-4.5 py-2 bg-ochre hover:bg-ochre/90 text-white rounded-xl text-xs font-semibold shadow-md shadow-ochre/10 transition-all active:scale-[0.98]"
                  >
                    <Heart className="h-4 w-4 fill-white" />
                    <span>Support Guide ({selectedPost.likes} Likes)</span>
                  </button>
                </div>

                {/* Dynamic Comments Module */}
                <div className="space-y-6 pt-6 border-t border-[#F2ECE4]" id="blog-comments-module">
                  <h4 className="font-display font-bold text-lg text-earth-dark flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-forest" />
                    <span>Discussion & Reader Notes ({selectedPost.comments ? selectedPost.comments.length : 0})</span>
                  </h4>

                  <div className="space-y-4">
                    {selectedPost.comments && selectedPost.comments.length > 0 ? (
                      selectedPost.comments.map((comment) => (
                        <div key={comment.id} className="p-4 rounded-2xl bg-slate-50 border border-[#E8E2D9]/70 space-y-1">
                          <div className="flex items-center justify-between font-display text-xs font-bold text-earth-dark">
                            <span>{comment.author}</span>
                            <span className="font-mono text-[10px] text-earth-slate font-normal">{comment.date}</span>
                          </div>
                          <p className="font-sans text-xs text-earth-slate">{comment.text}</p>
                        </div>
                      ))
                    ) : (
                      <em className="block text-xs text-earth-slate">No comment logs logged. Be the original first reader!</em>
                    )}
                  </div>

                  {/* Add comment Form */}
                  <div className="bg-[#FCFAF7] border border-[#E8E2D9] rounded-2xl p-5 space-y-4">
                    <h5 className="font-display font-bold text-sm text-earth-dark">Add Your Discussion Comment</h5>
                    <form onSubmit={handleAddComment} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-bold text-earth-slate uppercase tracking-wider mb-1">Your Name:*</label>
                          <input
                            type="text"
                            required
                            value={commentName}
                            onChange={(e) => setCommentName(e.target.value)}
                            placeholder="E.g., Arundhati Rao"
                            className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3 py-2 text-xs focus:border-forest focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-earth-slate uppercase tracking-wider mb-1">Comment Statement:*</label>
                        <textarea
                          required
                          rows={2}
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Type your feedback, advice, or suggestions here..."
                          className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3 py-2 text-xs focus:border-forest focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          type="submit"
                          className="px-4.5 py-2 bg-forest hover:bg-forest/90 text-white font-display font-bold rounded-lg text-xs shadow-md shadow-forest/10 transition-all flex items-center gap-1"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>Publish Note</span>
                        </button>
                        
                        <AnimatePresence>
                          {commentSuccess && (
                            <motion.span 
                              initial={{ opacity: 0 }} 
                              animate={{ opacity: 1 }} 
                              exit={{ opacity: 0 }}
                              className="text-xs font-medium text-forest"
                            >
                              Comment listed!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </form>
                  </div>

                </div>

              </motion.article>
            )}
          </AnimatePresence>

        </div>

        {/* Right 4 Columns: Submit DIY Suggestion / Contributions sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="rounded-3xl border border-[#E8E2D9] bg-white p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-earth-dark font-display font-bold text-sm">
              <Sparkles className="h-4.5 w-4.5 text-ochre" />
              <span>Submit a DIY Guide / Suggestion</span>
            </div>

            <p className="font-sans text-xs text-earth-slate leading-relaxed">
              Have you designed an awesome upcycled utility object using household items? Share your step-by-step coordinates below. Once reviewed, our content team will showcase it under your name in our general index!
            </p>

            <form onSubmit={handleSuggestTipSubmit} className="space-y-4 border-t border-[#F2ECE4] pt-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Author Name:*</label>
                <input
                  type="text"
                  required
                  value={tipUploader}
                  onChange={(e) => setTipUploader(e.target.value)}
                  placeholder="E.g., Ramesh Sen"
                  className="w-full rounded-xl border border-[#E8E2D9] bg-[#FCFAF7] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">DIY Project Title:*</label>
                <input
                  type="text"
                  required
                  value={tipTitle}
                  onChange={(e) => setTipTitle(e.target.value)}
                  placeholder="E.g., Egg Carton Seed Germination Trays"
                  className="w-full rounded-xl border border-[#E8E2D9] bg-[#FCFAF7] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Project Category:*</label>
                <select
                  value={tipCategory}
                  onChange={(e) => setTipCategory(e.target.value)}
                  className="w-full rounded-xl border border-[#E8E2D9] bg-[#FCFAF7] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none font-semibold"
                >
                  <option value="diy">DIY Step-by-Step Projects</option>
                  <option value="tips">Household Sustainability Tips</option>
                  <option value="impact">My Sustainable Upcycle Experience</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-earth-slate uppercase tracking-wider mb-1">Process Guidelines & Materials:*</label>
                <textarea
                  required
                  rows={4}
                  value={tipDesc}
                  onChange={(e) => setTipDesc(e.target.value)}
                  placeholder="Draft materials needed, sizing, wrapping adhesives, and usage steps..."
                  className="w-full rounded-xl border border-[#E8E2D9] bg-[#FCFAF7] px-3.5 py-2.5 text-xs focus:border-forest focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full text-center font-display font-bold py-2.5 bg-forest hover:bg-forest/90 text-white rounded-xl shadow-lg transition-all"
              >
                Submit Project Idea
              </button>

              <AnimatePresence>
                {submitTipSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 p-2.5 bg-green-50 text-forest border border-forest/20 rounded-xl"
                  >
                    <CheckCircle className="h-4 w-4 text-[#CC7722]" />
                    <span className="font-semibold text-[10px]">DIY Suggestion Submitted! Our design team will inspect the details and mail you our premium circular handbook.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          <div className="rounded-3xl bg-[#1F1916] text-[#EBE6E0] p-6 space-y-4">
            <span className="font-mono text-[9px] font-bold text-ochre uppercase bg-white/10 px-2 py-0.5 rounded-full inline-block">Circular Manifesto</span>
            <blockquote className="font-display text-sm font-bold italic leading-relaxed text-white">
              "We don't need a single person living zero-waste flawlessly. We need millions of people doing it imperfectly."
            </blockquote>
            <span className="block text-[11px] text-[#BDB5AC]">- Zero Waste Society</span>
          </div>

        </div>

      </div>

    </div>
  );
}
