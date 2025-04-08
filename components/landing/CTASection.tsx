export default function CTASection() {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Transform Your Data Intelligence</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Experience the power of entity-aware AI tailored specifically for your enterprise needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                Request Demo
              </button>
              <button className="border border-white border-opacity-50 px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
                Explore Platform
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }