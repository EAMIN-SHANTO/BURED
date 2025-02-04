import React from 'react';

interface Member {
  name: string;
  role: string;
  image: string;
  department: string;
  twitter?: string;
  linkedin?: string;
}

const Panel: React.FC = () => {
  const president: Member[] = [
    {
      name: "Member X1",
      role: "President",
      image: "/photos/other/avt.jpg",
      department: "Computer Science & Engineering",
      twitter: "https://twitter.com/x1",
      linkedin: "https://linkedin.com/in/x1"
    }
  ];

  const vicePresident: Member[] = [
    {
      name: "Member X2",
      role: "Vice President",
      image: "/photos/other/avt.jpg",
      department: "Computer Science & Engineering",
      twitter: "https://twitter.com/x2",
      linkedin: "https://linkedin.com/in/x2"
    }
  ];

  const seniorExecutives: Member[] = [
    {
      name: "Member X3",
      role: "Senior Executive",
      image: "/photos/other/avt.jpg",
      department: "Computer Science & Engineering",
      twitter: "https://twitter.com/x3",
      linkedin: "https://linkedin.com/in/x3"
    },
    {
      name: "Member X4",
      role: "Senior Executive",
      image: "/photos/other/avt.jpg",
      department: "Computer Science & Engineering",
      twitter: "https://twitter.com/x4",
      linkedin: "https://linkedin.com/in/x4"
    },
    {
      name: "Member X5",
      role: "Senior Executive",
      image: "/photos/other/avt.jpg",
      department: "Computer Science & Engineering",
      twitter: "https://twitter.com/x5",
      linkedin: "https://linkedin.com/in/x5"
    }
  ];

  const members: Member[] = [
    {
      name: "Member X6",
      role: "Member",
      image: "/photos/other/avt.jpg",
      department: "Computer Science & Engineering",
      twitter: "https://twitter.com/x6",
      linkedin: "https://linkedin.com/in/x6"
    },
    {
      name: "Member X7",
      role: "Member",
      image: "/photos/other/avt.jpg",
      department: "Computer Science & Engineering",
      twitter: "https://twitter.com/x7",
      linkedin: "https://linkedin.com/in/x7"
    },
    {
      name: "Member X8",
      role: "Member",
      image: "/photos/other/avt.jpg",
      department: "Computer Science & Engineering",
      twitter: "https://twitter.com/x8",
      linkedin: "https://linkedin.com/in/x8"
    },
    {
      name: "Member X9",
      role: "Member",
      image: "/photos/other/avt.jpg",
      department: "Computer Science & Engineering",
      twitter: "https://twitter.com/x9",
      linkedin: "https://linkedin.com/in/x9"
    }
  ];

  const MemberCard: React.FC<{ member: Member }> = ({ member }) => (
    <div className="flex flex-col items-center text-center">
      {/* Profile Image */}
      <div className="mb-4 relative group">
        <div className="w-48 h-48 rounded-full overflow-hidden">
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Member Info */}
      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
      <p className="text-gray-600 mb-4">{member.role}</p>

      {/* Social Links */}
      <div className="flex items-center gap-4">
        {member.twitter && (
          <a 
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        )}
        {member.linkedin && (
          <a 
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  );

  const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
    </div>
  );

  return (
    <div className="flex flex-col pt-24">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/photos/other/resa.jpg"
            alt="Team Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/95"></div>
        </div>

        <div className="relative max-w-[1440px] mx-auto w-[90%]">
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-white/10 text-white 
              backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              Our Team
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Meet the Minds Behind{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                BUReD
              </span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Our dedicated team of innovators, researchers, and leaders working together 
              to drive excellence in research and development.
            </p>
          </div>
        </div>
      </section>

      {/* President Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <SectionTitle title="President" />
          <div className="max-w-lg mx-auto">
            {president.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Vice President Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <SectionTitle title="Vice President" />
          <div className="max-w-lg mx-auto">
            {vicePresident.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Senior Executives Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <SectionTitle title="Senior Executives" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {seniorExecutives.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1440px] mx-auto w-[90%]">
          <SectionTitle title="Members" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {members.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Panel; 