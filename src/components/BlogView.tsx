/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Heart, MessageSquare, Calendar, User, Clock, ArrowLeft, ArrowUpRight, Sparkles, Send, Info, CheckCircle } from 'lucide-react';
import { BlogPost, Comment } from '../types';
import { blogPostsData } from '../data';

export default function BlogView() {
  const [activeBlogCategory, setActiveBlogCategory] = useState<'all' | 'tips' | 'diy' | 'impact'>('all');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
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

  // Persist likes and new blogs locally
  useEffect(() => {
    const savedBlogs = localStorage.getItem('second_story_blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      setBlogs(blogPostsData);
      localStorage.setItem('second_story_blogs', JSON.stringify(blogPostsData));
    }
  }, []);

  const handleCategoryChange = (cat: 'all' | 'tips' | 'diy' | 'impact') => {
    setActiveBlogCategory(cat);
    setSelectedPost(null);
  };

  const handleLike = (postId: string, e: MouseEvent) => {
    e.stopPropagation(); // Avoid triggering full screen expand
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

  // Filter blog listing
  const filteredBlogs = blogs.filter((post) => {
    if (activeBlogCategory === 'all') return true;
    return post.category === activeBlogCategory;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Intro Header */}
      <section id="blog-header" className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-sans text-xs font-bold text-forest bg-forest/10 px-4 py-1.5 rounded-full uppercase tracking-wider">
          The Second Story Journal
        </span>
        <h2 className="font-display text-4xl font-extrabold text-[#1F1916] tracking-tight">
          Sustainability, DIY & Stories
        </h2>
        <p className="font-sans text-sm text-earth-slate">
          Tips from practitioners, guides explaining home upcycling, and detailed reports exploring how single-mothers weave their lives back to self-sufficiency.
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
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="group cursor-pointer rounded-2xl border border-[#E8E2D9] bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full hover:border-[#CC7722]/20"
                  >
                    <div>
                      <div className="relative aspect-video w-full bg-zinc-100 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
                          referrerPolicy="no-referrer"
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

                        <h3 className="font-display font-bold text-base sm:text-lg text-earth-dark group-hover:text-[#CC7722] transition-colors leading-snug">
                          {post.title}
                        </h3>

                        <p className="font-sans text-xs text-earth-slate line-clamp-3 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-[#F2ECE4] mt-2 flex items-center justify-between text-xs font-semibold text-earth-slate">
                      <span className="italic text-earth-dark font-medium">By: {post.author.split(' ')[0]}</span>
                      <div className="flex items-center gap-3 pt-3">
                        <button
                          type="button"
                          onClick={(e) => handleLike(post.id, e)}
                          className="flex items-center gap-1 group-h/btn text-ochre hover:text-red-500 transition-colors"
                        >
                          <Heart className="h-4 w-4 fill-current text-ochre tracking-wider hover:scale-110" />
                          <span>{post.likes}</span>
                        </button>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments ? post.comments.length : 0}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

            ) : (
              
              /* EXPANDED DETAILED JOURNAL VIEW */
              <motion.article 
                key="detail-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm"
              >
                <button
                  onClick={() => setSelectedPost(null)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-forest hover:text-ochre mb-2 underline transition-all cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back to Journal Catalog</span>
                </button>

                {/* Banner elements */}
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

                  <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-earth-dark leading-tight">
                    {selectedPost.title}
                  </h1>

                  <div className="flex items-center gap-2.5 text-xs text-earth-slate border-b border-[#F2ECE4] pb-4">
                    <div className="h-7 w-7 rounded-full bg-forest text-white font-display font-bold flex items-center justify-center text-[10px]">
                      {selectedPost.author.charAt(0)}
                    </div>
                    <span>Published under: <strong>{selectedPost.author}</strong></span>
                  </div>
                </div>

                {/* Big Image banner */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-100">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Main Content formatting text */}
                <div id="blog-rendered-content" className="font-sans text-xs sm:text-sm text-earth-dark/95 leading-relaxed whitespace-pre-line space-y-4">
                  {selectedPost.content}
                </div>

                {/* Action Liker button */}
                <div className="flex justify-between items-center bg-[#FCFAF7] border border-[#E8E2D9] p-4 rounded-2xl">
                  <span className="text-xs font-display font-bold text-earth-dark">Find this upcycling guide helpful?</span>
                  <button
                    onClick={(e) => handleLike(selectedPost.id, e)}
                    className="flex items-center gap-2 px-4.5 py-2 bg-ochre hover:bg-ochre/90 text-white rounded-xl text-xs font-semibold shadow-md shadow-ochre/10 transition-all active:scale-[0.98]"
                  >
                    <Heart className="h-4 w-4 fill-white" />
                    <span>Enjoy of this ({selectedPost.likes} Likes)</span>
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
                  <option value="story">My Sustainable Upcycle Experience</option>
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
                    <span className="font-semibold text-[10px]">DIY Suggestion Submited! Our design team will inspect the details and mail you our premium circular handbook.</span>
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
