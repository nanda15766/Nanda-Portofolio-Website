export function SkillsSkeleton() {
  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <div className="w-32 h-10 bg-slate-800/50 rounded-lg animate-pulse mb-4"></div>
          <div className="w-64 h-6 bg-slate-800/50 rounded-md animate-pulse"></div>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-12">
          {[1, 2, 3].map((cat) => (
            <div key={cat}>
              <div className="w-40 h-8 bg-slate-800/50 rounded-md animate-pulse mb-6"></div>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="w-24 h-10 bg-slate-800/50 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseStudiesSkeleton() {
  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <div className="w-48 h-12 bg-slate-900/80 rounded-lg animate-pulse mb-4"></div>
            <div className="w-72 h-6 bg-slate-900/80 rounded-md animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[1, 2].map((card) => (
              <div key={card} className="bg-slate-900/50 rounded-3xl p-8 lg:p-10 border border-slate-800 animate-pulse">
                <div className="w-40 h-8 bg-slate-800/50 rounded-md mb-4"></div>
                <div className="w-64 h-5 bg-slate-800/50 rounded-md mb-6"></div>
                <div className="w-full aspect-video bg-slate-800/50 rounded-xl mb-6"></div>
                
                <div className="space-y-6">
                  {[1, 2, 3].map((section) => (
                    <div key={section} className="p-5 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                      <div className="w-24 h-6 bg-slate-800/50 rounded-md mb-3"></div>
                      <div className="w-full h-16 bg-slate-800/50 rounded-md"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
