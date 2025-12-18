import { ShieldCheck, BarChart3, Cog, Layers, Code2, BookOpen, Users, Layout } from 'lucide-react';
import { ServiceItem } from '../types';

export const servicesDataEn: ServiceItem[] = [
  {
    title: "Advisor & Strategy for Digital Transformation",
    slug: "software-strategy-consulting-and-advisory",
    description: "Your Route Officer. We define the technological direction to achieve your business goals.",
    icon: Users,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Strategic Software Consulting</h3>
          <p className="leading-relaxed text-slate-400">
            At A Beat Beyond, strategic software consulting is the first step to turning technology into a true growth engine for your SME. We don't just suggest software: we deepen our analysis of your business, processes, and goals to define an IT strategy that is truly effective and sustainable over time.
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            Our engineered approach ensures we go beyond standard solutions, identifying technologies and architectures best suited to solve your specific challenges and seize new opportunities.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">Our services include:</h4>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "In-depth analysis of business processes and business objectives.",
              "Assessment of existing IT infrastructure and identification of areas for improvement.",
              "Definition of a technology roadmap aligned with corporate strategy.",
              "Neutral selection of the most suitable technologies and software (commercial or open source).",
              "Design of scalable, secure, and high-performance software architectures.",
              "Consulting on digital transformation and adoption of new technologies (Cloud, AI, IoT).",
              "Support in defining IT budgets and evaluating the ROI of technological investments."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          Relying on our strategic consulting, you will get a clear vision of how technology can support your growth, optimize costs, and improve your competitiveness in the market.
        </p>
      </div>
    )
  },
  {
    title: "IT Architecture Design",
    slug: "it-architecture-design",
    description: "The Ship's Hull. We design robust and scalable infrastructures to face every sea.",
    icon: Layout,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">IT Architecture Design</h3>
          <p className="leading-relaxed text-slate-400">
            A well-designed IT architecture is the backbone of an efficient and resilient company. A Beat Beyond designs infrastructure and software solutions that not only meet the current needs of your SME but are also scalable and ready to face future challenges.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">Our engineered approach focuses on:</h4>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "In-depth analysis of business, performance, and security requirements.",
              "Selection of the most suitable technologies (on-premise, cloud, hybrid) in line with budget and strategic goals.",
              "Design of resilient systems with disaster recovery and business continuity plans.",
              "Cost optimization (TCO - Total Cost of Ownership) without compromising quality and security.",
              "Guarantee of scalability to support future business growth.",
              "Seamless integration with existing and future systems."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          We work to create IT architectures that are not only technologically advanced but also perfectly aligned with your corporate vision, providing a solid foundation for innovation and growth.
        </p>
      </div>
    )
  },
  {
    title: "Systems Integration",
    slug: "systems-integration",
    description: "Crew Synchrony. ERP, CRM, and MES communicate perfectly to eliminate errors and delays.",
    icon: Layers,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Integration of ERP, WMS, MES Systems</h3>
          <p className="leading-relaxed text-slate-400">
            In today's business landscape, operational efficiency crucially depends on the ability of different software systems to communicate with each other fluidly and automatically. A Beat Beyond specializes in system integration, with a particular focus on harmonizing your ERP system with specific management software for logistics (WMS) and production (MES).
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            We eliminate information silos and inefficiencies resulting from manual data entry processes or disconnected systems. Our goal is to create a cohesive technological ecosystem where data flows uninterrupted, providing a unique and accurate view of your operations.
          </p>
        </div>

        <div>
           <h4 className="text-xl font-bold text-cyan-400 mb-4">Our integration services include:</h4>
           <ul className="grid gap-4 md:grid-cols-2">
             {[
               "Analysis of existing data flows and identification of critical integration points.",
               "Design of robust and scalable integration architectures (API, middleware, ETL).",
               "Development of custom connectors to ensure communication between ERP and WMS/MES.",
               "Integration of master data, production orders, work progress, warehouse management, traceability, and quality.",
               "Automation of business processes through system integration.",
               "Testing and validation of integration solutions to ensure reliability.",
               "Post-implementation support and maintenance."
             ].map((item, i) => (
               <li key={i} className="flex items-start gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                 <span>{item}</span>
               </li>
             ))}
           </ul>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          With proper system integration, your SME can benefit from greater efficiency, reduced errors, better process visibility, faster decisions based on accurate data, and greater agility in responding to market needs.
        </p>
      </div>
    )
  },
  {
    title: "Cybersecurity",
    slug: "cybersecurity",
    description: "Shield against storms. Data protection and ISO 27001 compliance to navigate safely.",
    icon: ShieldCheck,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Cybersecurity and Regulatory Compliance</h3>
          <p className="leading-relaxed text-slate-400">
            In the digital age, cybersecurity is an absolute priority. A Beat Beyond helps you protect your corporate assets, sensitive data, and brand reputation, while ensuring compliance with current regulations like GDPR and NIS2.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">We offer a holistic approach that includes:</h4>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "Risk Assessment and Vulnerability Assessment.",
              "Definition and implementation of security policies and Business Continuity Plans.",
              "Design of robust security architectures (firewall, IDS/IPS, endpoint protection).",
              "Consulting for GDPR and NIS2 directive compliance.",
              "Support in implementing Information Security Management Systems (ISMS) compliant with ISO 27001 standard.",
              "Staff training on security awareness.",
              "Incident Response and crisis management."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          With A Beat Beyond, cybersecurity becomes an enabling factor for your business, allowing you to operate with serenity and confidence in the digital landscape.
        </p>
      </div>
    )
  },
  {
    title: "Business Intelligence",
    slug: "business-intelligence",
    description: "The Onboard Radar. We transform data into a clear vision to avoid reefs and seize opportunities.",
    icon: BarChart3,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Business Intelligence and Data Analysis</h3>
          <p className="leading-relaxed text-slate-400">
            We transform your raw data into strategic information. Our Business Intelligence (BI) and data analysis solutions allow you to make faster, informed decisions based on concrete evidence, improving the competitiveness and efficiency of your SME.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">Our complete service includes:</h4>
          <ul className="grid gap-4 md:grid-cols-2">
             {[
               "Assessment of BI opportunities and definition of Key Performance Indicators (KPIs).",
               "Design and implementation of data warehouses and data lakes.",
               "Development of interactive dashboards and custom reports.",
               "Integration of data from different sources (ERP, CRM, spreadsheets, etc.).",
               "Predictive analysis and machine learning to anticipate trends and optimize processes.",
               "Training your team to make the best use of BI tools."
             ].map((item, i) => (
               <li key={i} className="flex items-start gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                 <span>{item}</span>
               </li>
             ))}
          </ul>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          With our support, you can unlock the hidden potential in your data, identify new business opportunities, optimize operations, and monitor performance in real time.
        </p>
      </div>
    )
  },
  {
    title: "Open Source",
    slug: "open-source-software",
    description: "Freedom to maneuver. We reduce dependence on external suppliers (Vendor Lock-in) and cut costs.",
    icon: Code2,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Open Source Software Opportunity Assessment</h3>
          <p className="leading-relaxed text-slate-400">
             Adopting open source software can represent a significant opportunity for SMEs to reduce licensing costs, avoid vendor lock-in, and access flexible and customizable solutions. A Beat Beyond helps you navigate the world of open source, assessing with an engineered approach where and how these solutions can bring value to your business.
          </p>
          <p className="mt-4 leading-relaxed text-slate-400">
            Not all open source solutions are equal, and a transition requires careful planning.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">Our assessment service includes:</h4>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "Analysis of the current technology stack and associated costs (licenses, maintenance).",
              "Identification of areas where open source solutions could replace or integrate proprietary software.",
              "Research and evaluation of mature, reliable, and community-supported open source alternatives.",
              "Comparative analysis of features, risks, and benefits (TCO).",
              "Assessment of necessary internal skills and training planning.",
              "Development of a gradual and low-risk migration strategy.",
              "Consulting on open source license management and compliance."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          Our goal is to provide you with all the necessary information to make an informed decision, ensuring that any transition is strategically advantageous, sustainable, and secure.
        </p>
      </div>
    )
  },
  {
    title: "Temporary Project Management",
    slug: "project-management",
    description: "The Second-in-Command. We manage complex projects ensuring times, costs, and results.",
    icon: Cog,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Project Management and Technical Documentation</h3>
          
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-cyan-300 mb-2">Project Management</h4>
            <p className="leading-relaxed text-slate-400 mb-4">
              Effective project management is essential to translate IT strategies into concrete results. At A Beat Beyond, we apply consolidated project management methodologies (such as PMP®) to ensure that your technology projects are completed on time, within budget, and according to expected quality standards.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-cyan-300 mb-2">Technical Documentation</h4>
            <p className="leading-relaxed text-slate-400">
              Clear and precise technical documentation is essential for the success of any IT project. We act as a bridge between business expectations and the development team, minimizing misunderstandings and reducing delays.
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold text-cyan-400 mb-4">Our services cover:</h4>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "Detailed project planning and WBS.",
              "Resource, time, cost, and risk management.",
              "Continuous monitoring and reporting.",
              "Quality and change management.",
              "Business process and requirements analysis.",
              "Drafting of technical specifications and documentation for tenders.",
              "Creation of use cases, user stories, and diagrams."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          With A Beat Beyond as a partner, you can count on an expert team working to turn your technological visions into measurable successes, allowing you to focus on your core business.
        </p>
      </div>
    )
  },
  {
    title: "Training",
    slug: "training",
    description: "Crew Training. We transfer skills to your team to make you autonomous.",
    icon: BookOpen,
    fullContent: (
      <div className="space-y-8 text-slate-300">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-4">Training in Business Intelligence and Cybersecurity</h3>
          <p className="leading-relaxed text-slate-400">
             In a rapidly evolving technological world, continuous staff training is a strategic investment. A Beat Beyond offers personalized training programs designed to transfer practical and immediately applicable skills. We believe true technological autonomy is achieved when skills reside within the company.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-bold text-cyan-400 mb-4">Business Intelligence Training:</h4>
            <ul className="space-y-3">
              {[
                "Introduction to BI concepts and data-driven decision making.",
                "Using BI tools for data analysis.",
                "Development of interactive dashboards and KPI monitoring.",
                "Interpretation of data to identify trends."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-cyan-400 mb-4">Cybersecurity Training:</h4>
            <ul className="space-y-3">
              {[
                "Awareness of phishing, malware, ransomware.",
                "Best practices for data security.",
                "Principles of regulatory compliance (GDPR, NIS2).",
                "Secure password and access management.",
                "Incident response procedures."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-lg font-medium border-l-4 border-cyan-400 pl-4 italic">
          The goal is to make your team more autonomous, aware, and capable of making the best use of technologies for the success of your SME.
        </p>
      </div>
    )
  }
];