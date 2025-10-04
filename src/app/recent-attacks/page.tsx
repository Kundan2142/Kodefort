"use client";

import React from "react";

interface Attack {
  title: string;
  description: string;
  link: string;
  date: string;
}

const attacks: Attack[] = [
  {
    title: "Salesforce Data Breach",
    description:
      "A hacker group claims to have stolen nearly one billion Salesforce records through social engineering attacks targeting clients.",
    link: "https://www.reuters.com/sustainability/boards-policy-regulation/almost-1-billion-salesforce-records-stolen-hacker-group-claims-2025-10-03/",
    date: "2025-10-03",
  },
  {
    title: "China-Linked Hacking Fears Over Cisco Devices",
    description:
      "The UK's National Cyber Security Centre warns of vulnerabilities in Cisco devices, potentially exploited by Chinese-backed cyberattacks.",
    link: "https://www.thetimes.co.uk/article/china-linked-hacking-fears-over-cisco-devices-in-offices-rrll65c3n",
    date: "2025-10-03",
  },
  {
    title: "Asahi Beers Cyberattack in Japan",
    description:
      "Cyberattack disrupted Asahi Group’s beer and beverage supply, causing shortages across restaurants and stores.",
    link: "https://www.reuters.com/technology/tapped-out-asahi-beers-running-dry-japan-cyberattack-shutdown-lingers-2025-10-03/",
    date: "2025-10-03",
  },
  {
    title: "South Korea Raises Cyber Threat Level After Data Centre Fire",
    description:
      "A massive data center fire destroyed government systems and caused widespread outages. National cyber threat level raised.",
    link: "https://www.theguardian.com/world/2025/sep/30/south-korea-raises-cyber-threat-level-after-huge-data-centre-fire-sparks-hacking-fears",
    date: "2025-09-30",
  },
  {
    title: "Festival Rush Exploited by Cyber Crooks in Andhra Pradesh",
    description:
      "Cybercriminals targeted credit card holders during festive season with fake offers, causing financial losses.",
    link: "https://timesofindia.indiatimes.com/city/vijayawada/andhra-pradesh-cyber-crooks-exploit-festival-rush-target-credit-card-holders/articleshow/124197866.cms",
    date: "2025-09-28",
  },
  {
    title: "Flight Disruptions Due to Cyberattack on Check-In Technology",
    description:
      "A suspected ransomware attack on a check-in tech company caused flight delays and cancellations across Europe.",
    link: "https://www.cybersecuritydive.com/topic/cyberattacks/",
    date: "2025-10-02",
  },
];

export default function RecentAttacksPage() {
  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">🛡️ Recent Cyber Attacks</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {attacks.map((attack, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow hover:-translate-y-1 transform"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{attack.title}</h2>
            <p className="text-gray-600 text-sm mb-4">
              {attack.description.length > 120
                ? attack.description.slice(0, 120) + "…"
                : attack.description}
            </p>
            <div className="flex items-center justify-between">
              <a
                href={attack.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Read more
              </a>
              <time className="text-xs text-gray-400">{new Date(attack.date).toLocaleDateString()}</time>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-500">
          Stay updated on cybersecurity threats and protect your organization from attacks.
        </p>
      </div>
    </main>
  );
}
