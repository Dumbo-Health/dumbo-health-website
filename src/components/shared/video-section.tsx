export function VideoSection() {
  return (
    <section className="bg-daylight py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl shadow-lg shadow-midnight/10">
          <div className="relative aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/8DKLYsikxTs"
              title="Dumbo Health - Sleep Apnea Care"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
