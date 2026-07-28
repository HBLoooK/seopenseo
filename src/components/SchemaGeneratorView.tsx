import React, { useState } from 'react';
import { generateSchema } from '../services/api';
import {
  Code2,
  Copy,
  Check,
  Plus,
  Trash2,
  Sparkles,
  HelpCircle,
  FileText,
  ShoppingBag,
  Store,
  CheckCircle2,
} from 'lucide-react';

export const SchemaGeneratorView: React.FC = () => {
  const [schemaType, setSchemaType] = useState<'FAQPage' | 'Article' | 'Product' | 'LocalBusiness'>('FAQPage');

  // FAQ state
  const [faqList, setFaqList] = useState<{ question: string; answer: string }[]>([
    { question: 'Is SEOpenSEO completely free?', answer: 'Yes! SEOpenSEO provides 100% free SEO audit, keyword research, SERP analysis, and schema generation tools.' },
    { question: 'Do I need a credit card?', answer: 'No credit card or subscription is required to use any feature on SEOpenSEO.' },
  ]);

  // Article state
  const [articleTitle, setArticleTitle] = useState('Comprehensive SEO Strategy Guide for 2026');
  const [articleAuthor, setArticleAuthor] = useState('Jane Doe');
  const [articlePublisher, setArticlePublisher] = useState('SEOpenSEO Press');

  // Generated Result
  const [loading, setLoading] = useState(false);
  const [generatedJson, setGeneratedJson] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAddFaq = () => {
    setFaqList([...faqList, { question: '', answer: '' }]);
  };

  const handleRemoveFaq = (idx: number) => {
    setFaqList(faqList.filter((_, i) => i !== idx));
  };

  const handleGenerate = async () => {
    setLoading(true);
    let inputs: any = {};

    if (schemaType === 'FAQPage') {
      inputs = { faqs: faqList };
    } else if (schemaType === 'Article') {
      inputs = { headline: articleTitle, author: articleAuthor, publisher: articlePublisher };
    } else {
      inputs = { name: 'Sample Item', description: 'Product overview' };
    }

    try {
      const data = await generateSchema(schemaType, inputs);
      setGeneratedJson(JSON.stringify(data.jsonLd, null, 2));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyScript = () => {
    if (!generatedJson) return;
    const scriptTag = `<script type="application/ld+json">\n${generatedJson}\n</script>`;
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5" />
            <span>Structured Data & Google Rich Snippets Builder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Free JSON-LD Schema Markup Generator
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Generate valid JSON-LD structured data for FAQ pages, Articles, Products, and Businesses to win Google Rich Snippet stars and expandable FAQ accordions in SERPs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Configuration Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <span>Select Schema Type</span>
          </h2>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'FAQPage', label: 'FAQ Page', icon: <HelpCircle className="w-4 h-4" /> },
              { id: 'Article', label: 'Article / Blog', icon: <FileText className="w-4 h-4" /> },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSchemaType(type.id as any)}
                className={`p-3 rounded-xl border flex items-center space-x-2 font-semibold transition-all ${
                  schemaType === type.id
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {type.icon}
                <span>{type.label}</span>
              </button>
            ))}
          </div>

          {/* Form Fields */}
          {schemaType === 'FAQPage' && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Questions & Answers ({faqList.length})</span>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs rounded-lg border border-slate-700 flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Question</span>
                </button>
              </div>

              {faqList.map((faq, idx) => (
                <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Q#{idx + 1}</span>
                    {faqList.length > 1 && (
                      <button type="button" onClick={() => handleRemoveFaq(idx)} className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...faqList];
                      updated[idx].question = e.target.value;
                      setFaqList(updated);
                    }}
                    placeholder="Question (e.g. What is your return policy?)"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...faqList];
                      updated[idx].answer = e.target.value;
                      setFaqList(updated);
                    }}
                    placeholder="Answer text..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  ></textarea>
                </div>
              ))}
            </div>
          )}

          {schemaType === 'Article' && (
            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Headline / Article Title</label>
                <input
                  type="text"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Author Name</label>
                <input
                  type="text"
                  value={articleAuthor}
                  onChange={(e) => setArticleAuthor(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Publisher Organization</label>
                <input
                  type="text"
                  value={articlePublisher}
                  onChange={(e) => setArticlePublisher(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate JSON-LD Schema Code</span>
          </button>
        </div>

        {/* Output JSON-LD Preview Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                <span>Generated JSON-LD Output</span>
              </h2>

              {generatedJson && (
                <button
                  onClick={handleCopyScript}
                  className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-lg border border-emerald-500/30 flex items-center space-x-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Script Tag!' : 'Copy <script> Tag'}</span>
                </button>
              )}
            </div>

            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto max-h-[380px]">
              {generatedJson
                ? `<script type="application/ld+json">\n${generatedJson}\n</script>`
                : '// Click "Generate JSON-LD Schema Code" to create valid script tag'}
            </pre>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Ready to paste inside your HTML &lt;head&gt; or Google Tag Manager</span>
          </div>
        </div>
      </div>
    </div>
  );
};
