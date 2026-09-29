import React, { useState } from 'react';
import Link from 'next/link';

// ==========================================
// --- Type Definitions (Interfaces) ---
// ==========================================

interface PackageCardProps {
  title: string;
  subtitle: string;
  price: string;
  period: string;
  features: string[];
  ctaText?: string;
  ctaLink?: string;
  isPopular?: boolean;
}

interface PackageData {
  title: string;
  subtitle: string;
  price: string;
  period: string;
  features: string[];
}

interface TeamMember {
  name: string;
  role: string;
  company: string;
  imageUrl: string;
}

interface TeamMemberCardProps extends TeamMember {
  onClick: () => void;
}

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

interface HajjPackageCardProps extends PackageCardProps { }

interface FeatureItem {
  image: string;
  title: string;
  description: string;
}

interface FAQItemProps {
  question: string;
  answer: string;
}

interface FAQData {
  question: string;
  answer: string;
}

// ==========================================
// --- Reusable Icon Components (SVG) ---
// ==========================================
const DiamondIcon: React.FC = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const ArrowUpRightIcon: React.FC = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ChevronUpIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const LinkedInIcon: React.FC = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon: React.FC = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// ==========================================
// --- Package Card Component ---
// ==========================================
const PackageCard: React.FC<PackageCardProps> = ({
  title,
  subtitle,
  price,
  period,
  features,
  ctaText = "FREE Consultation",
  ctaLink = "/custom-builder", // ✅ Default route to custom-builder
  isPopular = false,
}) => (
  <div className={`border rounded-xl p-6 flex flex-col transition-all duration-300 hover:shadow-xl ${isPopular ? 'border-[#C5A100] shadow-lg' : 'border-gray-200'}`}>
    <div className="text-center mb-4">
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
    <div className="text-center mb-6">
      <span className="text-4xl font-extrabold text-gray-900">৳ {price}</span>
      <span className="text-sm text-gray-600 ml-1">{period}</span>
    </div>
    <ul className="space-y-3 text-sm text-gray-600 mb-6 flex-grow">
      {features.map((feature: string, index: number) => (
        <li key={index} className="flex items-start gap-2">
          <svg className="w-4 h-4 mt-1 text-[#062B1E] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <div className="text-center mt-auto">
      {/* ✅ Internal Link to custom-builder */}
      <Link
        href={ctaLink}
        className="inline-flex items-center justify-center gap-2 w-full bg-[#062B1E] hover:bg-[#0A6847] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        {ctaText} <ArrowUpRightIcon />
      </Link>
    </div>
  </div>
);

// ==========================================
// --- Umrah Packages Section ---
// ==========================================
const UmrahPackagesSection: React.FC = () => {
  const packages: PackageData[] = [
    {
      title: "Premium Umrah Package",
      subtitle: "Ideal for budget-conscious pilgrims seeking a spiritual experience.",
      price: "1,85,000",
      period: "included Food",
      features: [
        "Package-1 June 2nd week (13 days)",
        "Package-2 July 1st week (13 days)",
        "Package-3 August 1st week (13 days)",
        "Package-4 05th September - 17th September (13 days)",
        "Standard Hotel | Distance 0-100m",
        "Standard Hotel (Inside of Markazia)",
        "Flights Up Direct - SV/BG/BS",
        "Flights Down Direct - SV/BG/BS",
        "Special Services Ziyara + Guide + Da'e",
      ],
    },
    {
      title: "Economy Umrah Package",
      subtitle: "Ideal for budget-conscious pilgrims seeking a spiritual experience.",
      price: "1,50,000",
      period: "included Food",
      features: [
        "Price ৳1,40,000 Food not included",
        "Package-1 June last week (13 Days)",
        "Package-2 August 3rd week (13 Days)",
        "Hotel Distance 650-750m.",
        "Flights Up Transit - Air Arabia/Gulf Air",
        "Flights Down Transit - Air Arabia/Gulf Air",
        "Special Services Ziyara + Guide + Da'e",
      ],
    },
    {
      title: "Corporate Umrah Package",
      subtitle: "Ideal for budget-conscious pilgrims seeking a spiritual experience.",
      price: "1,65,000",
      period: "included Food",
      features: [
        "Hotel Distance 650-750m.",
        "Flights Up Direct - SV/BG/BS",
        "Flights Down Direct - SV/BG/BS",
        "Food Included/Excluded",
        "Special Services Ziyara + Guide + Da'e",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-[#062B1E] font-medium mb-2">
            <DiamondIcon />
            <span>Affordable Packages</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Available Umrah Packages from Bangladesh
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Plan your Umrah and Ziyarah. Our upcoming Umrah packages will encompass a range of options, including economy and premium packages, designed to accommodate various budgets and preferences.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg: PackageData, index: number) => (
            <PackageCard key={index} {...pkg} ctaLink="/custom-builder" />
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// --- Team Member Card Component ---
// ==========================================
const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, role, company, imageUrl, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={imageUrl || "https://via.placeholder.com/400"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
          <div className="flex gap-3 justify-center mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {/* ✅ Internal links to custom-builder */}
            <Link href="/custom-builder" onClick={(e: React.MouseEvent) => e.stopPropagation()} className="bg-white/20 backdrop-blur-sm hover:bg-[#C5A100] text-white p-2 rounded-full transition-colors">
              <LinkedInIcon />
            </Link>
            <Link href="/custom-builder" onClick={(e: React.MouseEvent) => e.stopPropagation()} className="bg-white/20 backdrop-blur-sm hover:bg-[#C5A100] text-white p-2 rounded-full transition-colors">
              <TwitterIcon />
            </Link>
            <Link href="/custom-builder" onClick={(e: React.MouseEvent) => e.stopPropagation()} className="bg-white/20 backdrop-blur-sm hover:bg-[#C5A100] text-white p-2 rounded-full transition-colors">
              <InstagramIcon />
            </Link>
          </div>
          <p className="text-white text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            Click to view profile
          </p>
        </div>
      </div>

      <div className="p-5 text-center relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#C5A100] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#062B1E] transition-colors duration-300 line-clamp-1">
          {name}
        </h3>
        <p className="text-[#C5A100] font-semibold text-sm mt-1">{role}</p>
        <p className="text-xs text-gray-500 mt-1 line-clamp-1">{company}</p>
      </div>
    </div>
  );
};

// ==========================================
// --- Modal Component ---
// ==========================================
const TeamMemberModal: React.FC<TeamMemberModalProps> = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-scaleIn relative"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="relative h-64 overflow-hidden">
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
          <p className="text-[#C5A100] font-semibold mt-1">{member.role}</p>
          <p className="text-sm text-gray-500 mt-1">{member.company}</p>

          <div className="flex gap-3 justify-center mt-6">
            {/* ✅ Internal links to custom-builder */}
            <Link href="/custom-builder" className="bg-gray-100 hover:bg-[#C5A100] hover:text-white text-gray-700 p-3 rounded-full transition-colors">
              <LinkedInIcon />
            </Link>
            <Link href="/custom-builder" className="bg-gray-100 hover:bg-[#C5A100] hover:text-white text-gray-700 p-3 rounded-full transition-colors">
              <TwitterIcon />
            </Link>
            <Link href="/custom-builder" className="bg-gray-100 hover:bg-[#C5A100] hover:text-white text-gray-700 p-3 rounded-full transition-colors">
              <InstagramIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// --- Main Team Section Component ---
// ==========================================
const TeamSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    { name: "Mufti Shah Zamir Uddin Rahmani", role: "Chairman", company: "Imarat International Limited", imageUrl: "https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/06/3.png.bv.webp?bv_host=hajjpoint.com" },
    { name: "Sadiqur Rahman Azhari", role: "Managing Director", company: "Multivision Tours and Travels", imageUrl: "https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/06/2.png.bv.webp?bv_host=hajjpoint.com" },
    { name: "Talukdar Tariq Masud", role: "CEO", company: "Imarat International Limited", imageUrl: "https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/06/4.png.bv.webp?bv_host=hajjpoint.com" },
    { name: "Mufti Niamatullah", role: "Director", company: "MULTIVISION UNITED LIMITED", imageUrl: "https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/06/1.png.bv.webp?bv_host=hajjpoint.com" },
    { name: "Maulana Sabbir Ahmad", role: "Managing Partner", company: "Imarat International Limited", imageUrl: "https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/07/hajj-point.png.bv.webp?bv_host=hajjpoint.com" },
    { name: "Maulana Naimul Hasan", role: "Director", company: "Nuriya Tours & Travels", imageUrl: "https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/07/hajj-point-1.png.bv.webp?bv_host=hajjpoint.com" },
  ];

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Our Expert Team</h3>
            <div className="w-24 h-1 bg-[#C5A100] mx-auto mt-3 rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals behind our success
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {teamMembers.map((member: TeamMember, index: number) => (
              <TeamMemberCard
                key={index}
                {...member}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </div>
      </section>

      <TeamMemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

// ==========================================
// --- Hajj Package Card (full-screen expand) ---
// ==========================================
const HajjPackageCard: React.FC<HajjPackageCardProps> = ({
  title,
  subtitle,
  price,
  period,
  features,
  ctaText = "FREE Consultation",
  ctaLink = "/custom-builder", // ✅ Default route to custom-builder
  isPopular = false,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const previewCount = 4;
  const hasMore = features.length > previewCount;

  return (
    <>
      <div className="relative w-full h-full">
        <div
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          onClick={() => setIsExpanded((prev: boolean) => !prev)}
          className={`
            group border rounded-xl p-3 sm:p-6 flex flex-col
            transition-all duration-500 ease-in-out cursor-pointer
            bg-white
            ${isPopular ? 'border-[#C5A100] shadow-lg' : 'border-gray-200'}
            hover:shadow-2xl
            ${isExpanded
              ? 'fixed left-0 right-0 mx-auto z-50 shadow-2xl scale-100 w-[96vw] max-w-6xl'
              : 'relative w-full h-auto z-10'}
          `}
          style={{
            maxHeight: isExpanded ? '90vh' : '300px',
            top: isExpanded ? '50%' : 'auto',
            transform: isExpanded ? 'translateY(-50%)' : 'translateY(0)',
            overflowY: isExpanded ? 'auto' : 'hidden',
          }}
        >
          <div className="text-center mb-3 sm:mb-4">
            <h3 className="text-base sm:text-2xl font-bold text-gray-900">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {subtitle}
            </p>
          </div>

          <div className="text-center mb-3 sm:mb-6">
            <span className="text-xl sm:text-4xl font-extrabold text-gray-900">
              ৳ {price}
            </span>
            <span className="text-xs sm:text-sm text-gray-600 ml-1">
              {period}
            </span>
          </div>

          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 flex-grow">
            {features
              .slice(0, isExpanded ? features.length : previewCount)
              .map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 mt-1 text-[#062B1E] flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
          </ul>

          {hasMore && (
            <button
              type="button"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setIsExpanded((prev: boolean) => !prev);
              }}
              className="sm:hidden text-[#C5A100] text-xs font-semibold mb-2 self-center hover:underline"
            >
              {isExpanded ? 'Show Less ▲' : `Show All (${features.length}) ▼`}
            </button>
          )}

          <div className="text-center mt-auto">
            {/* ✅ Internal Link to custom-builder */}
            <Link
              href={ctaLink}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="inline-flex items-center justify-center gap-1 sm:gap-2 w-full bg-[#062B1E] hover:bg-[#0A6847] text-white text-xs sm:text-sm font-semibold py-2 sm:py-3 px-3 sm:px-6 rounded-lg transition-colors"
            >
              {ctaText} <ArrowUpRightIcon />
            </Link>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

// ==========================================
// --- Hajj Packages Section ---
// ==========================================
const HajjPackagesSection: React.FC = () => {
  const packages: PackageData[] = [
    {
      title: "Economy - Shifting",
      subtitle: "Ideal for budget-conscious pilgrims seeking a spiritual experience.",
      price: "5,80,000",
      period: "",
      features: [
        "Time & Duration 40-45 Days",
        "Hotel Makkah Distance 650-700m.",
        "Hotel Madinah Distance 700-750m",
        "Shifting Hotel Shisha/Azizia | Standard Hotel",
        "Flights Up Direct - SV/BG",
        "Flights Down Direct - SV/BG",
        "Special Services Ziyara + Guide + Da'e + Workshop",
      ],
    },
    {
      title: "Standard - Non Shifting",
      subtitle: "Ideal for budget-conscious pilgrims seeking a spiritual experience.",
      price: "7,20,000",
      period: "",
      features: [
        "Time & Duration 35-38 Days",
        "Hotel Distance 450-500m.",
        "Mina & Arafat AC tent (D Catagory)",
        "Flights Up Direct - SV/BG",
        "Flights Down Direct - SV/BG",
        "Food Buffet",
        "Special Services Ziyara + Guide + Da'e + Workshop",
      ],
    },
    {
      title: "Premium Shifting",
      subtitle: "Premium, stress-free Hajj for those seeking maximum comfort and privacy.",
      price: "8,80,000",
      period: "",
      features: [
        "Time & Duration 30-33 Days",
        "Hotel Makkah Standard, Distance 0-100m.",
        "Hotel Madinah Standard Hotel (Inside of Markazia)",
        "Mina & Arafat AC tent (D Catagory)",
        "Flights Up Direct - SV/BG",
        "Flights Down Direct - SV/BG",
        "Food Breakfast, Lunch & dinner",
        "Special Services Ziyara + Guide + Da'e + Workshop",
      ],
    },
    {
      title: "VIP - Shifting",
      subtitle: "Ultimate luxury Hajj experience with 5-star hotels and private services.",
      price: "12,50,000",
      period: "",
      features: [
        "Time & Duration 25-28 Days",
        "Hotel Makkah 5 Star, Distance 0-50m.",
        "Hotel Madinah 5 Star (Inside of Markazia)",
        "Mina & Arafat VIP AC tent (A Catagory)",
        "Flights Up Direct - SV/BG (Business Class)",
        "Flights Down Direct - SV/BG (Business Class)",
        "Food Buffet (Breakfast, Lunch & Dinner)",
        "Special Services Ziyara + Guide + Da'e + Workshop",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-yellow-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-[#062B1E] font-medium mb-2">
            <DiamondIcon />
            <span>Affordable Packages</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Popular Hajj Packages 2027
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our popular Hajj packages for 2027 have been meticulously crafted to
            ensure a seamless and memorable journey. We prioritize our member's
            comfort, safety, and well-being throughout their Hajj pilgrimage,
            providing a worry-free experience.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 items-start">
          {packages.map((pkg: PackageData, index: number) => (
            <HajjPackageCard key={index} {...pkg} ctaLink="/custom-builder" />
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// --- About Section ---
// ==========================================
const AboutSection: React.FC = () => {
  const features: FeatureItem[] = [
    { image: 'https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/03/2.jpg.bv.webp?bv_host=hajjpoint.com', title: 'Experienced Guidance', description: 'Years of expertise in organizing smooth and successful Hajj and Umrah journeys. Lorem ipsum dolor sit amet conse ctetur adip scing elit conse ctetur adip scing elit.' },
    { image: 'https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/03/3-1.jpg.bv.webp?bv_host=hajjpoint.com', title: 'Complete Packages', description: 'From visas to flights, hotels, and transportation everything handled for your convenience Lorem ipsum dolor sit amet conse ctetur conse ctetur adip scing elit.' },
    { image: 'https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/03/4.jpg.bv.webp?bv_host=hajjpoint.com', title: 'Prime Accommodations', description: 'Stay close to Haram with clean, comfortable, and high-quality hotel options. Lorem ipsum dolor sit amet conse ctetur adip scing elit conse ctetur adip scing elit.' },
    { image: 'https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/03/1-1.jpg.bv.webp?bv_host=hajjpoint.com', title: 'Personalized Support', description: 'Dedicated team available to assist you before, during, and after your pilgrimage. Lorem ipsum dolor sit amet conse ctetur adip scing elit conse ctetur adip scing elit.' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#062B1E] font-medium">
              <DiamondIcon />
              <span>About Hajjpoint</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Dedicated to your sacred Hajj and Umrah
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Discover unforgettable destinations, tailored trips, and seamless journeys designed just for you, anywhere, anytime.
            </p>
            <img src="https://hajjpoint.com/wp-content/uploads/2026/03/arabian-sa45.webp" alt="About" className="rounded-lg shadow-lg w-full h-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature: FeatureItem, index: number) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <img src={feature.image} alt={feature.title} className="w-16 h-16 rounded-full object-cover mb-4 border-4 border-white shadow-sm" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// --- FAQ Item & Section ---
// ==========================================
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="border-b border-gray-200 py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full text-left font-semibold text-gray-800 hover:text-[#C5A100]">
        <span>{question}</span>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600 text-sm">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection: React.FC = () => {
  const faqs: FAQData[] = [
    { question: "What services do you offer for Hajj and Umrah?", answer: "We offer visa processing, flight booking, hotel reservations, guided tours, and 24/7 support throughout your journey." },
    { question: "Do you provide group or private packages?", answer: "Yes! We offer both group and customized private packages to suit your preferences and budget." },
    { question: "How early should I book my Hajj or Umrah trip?", answer: "It is best to book at least 2–3 months in advance, especially during peak seasons." },
    { question: "Do you help with visa applications?", answer: "Absolutely! We handle all visa processing for Umrah and Hajj, including document preparation and submission." },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src="https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/06/2.png.bv.webp?bv_host=hajjpoint.com" alt="FAQ" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Start Your Hajj Journey with Confidence
            </h2>
            <p className="text-gray-600 mb-8">
              Provide your travel details and package preferences, and we'll get back to you with a customized Hajj quote tailored to your needs.
            </p>
            <div>
              {faqs.map((faq: FAQData, index: number) => (
                <FAQItem key={index} {...faq} />
              ))}
            </div>
            {/* ✅ CTA to custom-builder */}
            <div className="mt-8">
              <Link
                href="/custom-builder"
                className="inline-flex items-center justify-center gap-2 bg-[#062B1E] hover:bg-[#0A6847] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Build Your Custom Package <ArrowUpRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// --- Why Choose Us Section ---
// ==========================================
const WhyChooseUsSection: React.FC = () => {
  const features: FeatureItem[] = [
    { image: 'https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/03/2.jpg.bv.webp?bv_host=hajjpoint.com', title: 'Experienced Guidance', description: 'Years of expertise in organizing smooth and successful Hajj and Umrah journeys.' },
    { image: 'https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/03/3-1.jpg.bv.webp?bv_host=hajjpoint.com', title: 'Complete Packages', description: 'From visas to flights, hotels, and transportation everything handled for your convenience.' },
    { image: 'https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/03/4.jpg.bv.webp?bv_host=hajjpoint.com', title: 'Prime Accommodations', description: 'Stay close to Haram with clean, comfortable, and high-quality hotel options.' },
    { image: 'https://hajjpoint.com/wp-content/uploads/al_opt_content/IMAGE/hajjpoint.com/wp-content/uploads/2026/03/1-1.jpg.bv.webp?bv_host=hajjpoint.com', title: 'Personalized Support', description: 'Dedicated team available to assist you before, during, and after your pilgrimage.' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-green-800 text-white p-8 rounded-lg h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 font-medium mb-2">
              <DiamondIcon />
              <span>Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Journey, Our Commitment.</h2>
            <p className="text-gray-200 leading-relaxed">
              At Manaska, we are dedicated to making your sacred journey smooth, comfortable, and spiritually fulfilling. With years of experience in Hajj and Umrah services, we offer carefully crafted packages, expert guidance, and personalized support at every step.
            </p>
            <img src="https://hajjpoint.com/wp-content/uploads/2026/03/145.webp" alt="Why Choose Us" className="rounded-lg mt-8 w-full h-auto max-h-64 object-cover" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature: FeatureItem, index: number) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl flex flex-col">
                <img src={feature.image} alt={feature.title} className="w-16 h-16 rounded-full object-cover mb-4 border-4 border-white shadow-sm" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// --- Main Page Component ---
// ==========================================
const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <UmrahPackagesSection />
        <TeamSection />
        <HajjPackagesSection />
        <AboutSection />
        <FAQSection />
        <WhyChooseUsSection />
      </main>
    </div>
  );
};

export default AboutUs;