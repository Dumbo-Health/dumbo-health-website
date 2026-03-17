"use client";

import Link from 'next/link';

interface ComparisonItem {
  category: string;
  traditional: string | boolean;
  dumbo: string | boolean;
}

interface ComparisonSectionProps {
  title: string;
  subtitleTop: string;
  subtitleBottom: string;
  tableHeader: string;
  comparisonData: ComparisonItem[];
  location: string;
  smallNote?: string;
  textFooter?: string;
  ctaText?: string;
  ctaLink?: string;
  addTimeToTreatmentStart?: boolean;
}

export default function ComparisonSection({
  title,
  subtitleTop,
  subtitleBottom,
  tableHeader,
  comparisonData,
  location,
  smallNote,
  textFooter,
  ctaText,
  ctaLink,
  addTimeToTreatmentStart
}: ComparisonSectionProps) {
  const renderCellContent = (content: string | boolean, isDumbo: boolean = false) => {
    if (typeof content === 'boolean') {
      return content ? (
        <div className="flex items-center justify-center">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDumbo ? 'bg-teal-400' : 'bg-orange'
            }`}>
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div className="text-center text-primary opacity-50">-</div>
      );
    }

    if (isDumbo) {
      return (
        <div className="flex items-center justify-center space-x-2">
          <div className="text-sm text-primary font-medium font-aeonik" dangerouslySetInnerHTML={{ __html: content }} />
          <div className="w-5 h-5 rounded-full bg-teal-400 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      );
    }

    return <div className="text-sm text-primary font-aeonik" dangerouslySetInnerHTML={{ __html: content }} />;
  };

  return (
    <section className="py-16 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header: Title on Left, Subtitles on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          <div>
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-weight-500 text-primary leading-tight font-nohemi" dangerouslySetInnerHTML={{ __html: title }} />
          </div>

          <div className="space-y-4">
            <p className="text-lg text-primary opacity-75 leading-relaxed font-aeonik" dangerouslySetInnerHTML={{ __html: subtitleTop }} />

            <p className="text-sm text-primary opacity-60 leading-relaxed font-aeonik" dangerouslySetInnerHTML={{ __html: subtitleBottom }} />
          </div>
        </div>

        {/* Full Width Table */}
        <div className="w-full">
          <div className="bg-light rounded-2xl p-6 lg:p-8 shadow-lg">
            <h3 className="text-2xl font-weight-500 text-primary mb-6 text-center font-aeonik" dangerouslySetInnerHTML={{ __html: tableHeader }} />

            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b border-primary/10">
                    <th className="w-1/4 text-left py-4 px-2 text-md font-medium text-primary opacity-70 font-aeonik"></th>
                    <th className="w-3/8 text-center py-4 px-4 text-md font-medium text-primary bg-gray-50 rounded-t-lg font-aeonik" style={{width: '37.5%'}}>
                      Local solutions in {location}
                      <div className="text-xs opacity-60 font-normal mt-1 font-aeonik">(Insurance-based)</div>
                    </th>
                    <th className="w-3/8 text-center py-4 px-4 text-md font-medium text-white bg-orange rounded-t-lg font-aeonik" style={{width: '37.5%'}}>
                      Dumbo Health
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr key={index} className="border-b border-primary/5">
                      <td className="py-4 px-2 text-sm font-medium text-primary bg-light-grey/30 font-aeonik" dangerouslySetInnerHTML={{ __html: item.category }} />
                      <td className="py-4 px-4 text-center bg-gray-50/50">
                        {renderCellContent(item.traditional)}
                      </td>
                      <td className="py-4 px-4 text-center bg-orange/5">
                        {renderCellContent(item.dumbo, true)}
                      </td>
                    </tr>
                  ))}
                  {addTimeToTreatmentStart && (
                    <tr key="time-to-treatment-start" className="border-b border-primary/5">
                      <td className="py-4 px-2 text-sm font-medium text-primary bg-light-grey/30">
                        Time to Treatment Start
                      </td>
                      <td className="py-4 px-4 text-center bg-gray-50/50">
                        Weeks to months
                      </td>
                      <td className="py-4 px-4 text-center bg-orange/5">
                        <div className="flex items-center justify-center space-x-2">
                          In a few days
                        </div>
                      </td>
                    </tr>
                  )}
                  {addTimeToTreatmentStart && (
                    <tr key="time-to-treatment-start-cta" className="border-b border-primary/5">
                    <td className="py-4 px-2 text-sm font-medium text-primary bg-light-grey/30">
                    </td>
                      <td className="py-4 px-2 text-sm font-medium text-primary bg-light-grey/30">
                      </td>
                      <td className="py-4 px-4 text-center bg-orange/5">
                        <Link
                          href={ctaLink || "#"}
                          className="inline-block bg-orange text-white hover:bg-dark transition-colors duration-200 font-medium px-8 py-3 rounded-lg text-lg shadow-lg hover:shadow-xl font-button text-center"
                        >
                          {ctaText && ctaText.toUpperCase()}
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Disclaimer */}
            {smallNote && (
              <div className="mt-6 text-xs text-primary opacity-50 text-left font-aeonik" dangerouslySetInnerHTML={{ __html: smallNote }} />
            )}

            {/* Bottom Text */}
            {textFooter && (
              <div className="mt-4 text-sm text-primary text-left font-aeonik" dangerouslySetInnerHTML={{ __html: textFooter }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
