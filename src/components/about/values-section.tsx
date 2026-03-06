const values = [
  {
    title: "Sleep is essential",
    description: "We treat it with the same seriousness as nutrition or exercise.",
  },
  {
    title: "Care for everyone",
    description: "We serve those often overlooked in sleep health, women and younger adults.",
  },
  {
    title: "Human-first design",
    description: "From tech to tone, everything we do is built for clarity, warmth, and support.",
  },
];

export function ValuesSection() {
  return (
    <section className="bg-sunlight py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="font-heading text-h2 text-midnight">Our Purpose</h2>
          <p className="font-body text-body-lg text-midnight/70 mt-2">
            Supporting healthier lives one night of sleep at a time.
          </p>
        </div>
        <div className="mt-16">
          <h2 className="font-heading text-h2 text-midnight text-center">Our Values</h2>
          <h3 className="font-heading text-h3 text-midnight/70 text-center mt-2 mb-4">
            What drives us forward
          </h3>
          <p className="font-body text-body-lg text-midnight/70 text-center max-w-2xl mx-auto mb-12">
            At Dumbo Health, we believe sleep is the foundation of health, and that better care should be accessible, personal, and stigma-free.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-8 shadow-sm">
                <h4 className="font-heading text-xl text-midnight mb-3">{value.title}</h4>
                <p className="font-body text-body text-midnight/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
