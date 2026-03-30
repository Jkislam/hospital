import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.doctors': 'Doctors',
    'nav.blood_bank': 'Blood Bank',
    'nav.contact': 'Contact',
    'hero.badge': 'TRUSTED HEALTHCARE IN SHERPUR',
    'hero.title': 'Sherpur Ever Care Hospital',
    'hero.desc': 'Sherpur Ever Care Hospital is the leading Sherpur hospital providing compassionate, high-quality medical services with state-of-the-art facilities and expert medical professionals.',
    'hero.book': 'Book Appointment',
    'hero.emergency': 'Emergency Call',
    'hero.search_placeholder': 'Search doctors or services...',
    'hero.search_btn': 'Search',
    'hero.stat.emergency': 'Emergency Support',
    'hero.stat.doctors': 'Expert Doctors',
    'hero.stat.patients': 'Happy Patients',
    'features.quality_title': 'Quality Care',
    'features.quality_desc': 'We maintain the highest standards of medical excellence.',
    'features.service_title': '24/7 Service',
    'features.service_desc': 'Our emergency and ICU services are available round the clock.',
    'features.team_title': 'Expert Team',
    'features.team_desc': 'Dedicated professionals with years of specialized experience.',
    'about.badge': 'About Our Hospital',
    'about.title': 'Advanced Healthcare Solutions at Sherpur Hospital',
    'about.desc1': 'Sherpur Ever Care Hospital is a leading healthcare provider in Sherpur district. Located at Narayanpur, we offer a wide range of medical services from routine check-ups to complex surgeries and intensive care.',
    'about.desc2': 'Our facility is equipped with modern diagnostic tools and a team of highly qualified doctors and nurses dedicated to your well-being.',
    'about.more': 'Learn More About Us',
    'services.badge': 'Our Specializations',
    'services.title': 'Comprehensive Medical Services',
    'services.desc': 'We offer a wide range of specialized medical services to meet all your healthcare needs under one roof.',
    'services.emergency': 'Emergency Care',
    'services.emergency_desc': '24/7 immediate medical attention for all types of emergencies.',
    'services.diagnostics': 'Diagnostics',
    'services.diagnostics_desc': '24-hour USG, anomaly scans, echocardiograms, digital X-rays, and ECG.',
    'services.surgery': 'Surgery',
    'services.surgery_desc': '24-hour major and minor surgeries, normal deliveries, and C-sections.',
    'services.maternity': 'Maternity',
    'services.maternity_desc': '24-hour normal deliveries and cesarean sections with expert care.',
    'services.more': 'Read More',
    'services.view_all': 'View All Services',
    'doctors.badge': 'Meet Our Experts',
    'doctors.title': 'Qualified Medical Professionals',
    'doctors.desc': 'Our team consists of highly experienced specialists dedicated to providing the best patient care.',
    'doctors.view_all': 'View All Doctors',
    'doctors.view_profile': 'View Profile & Book',
    'testimonials.title': 'What Our Patients Say',
    'testimonials.desc': 'Real feedback from people who trusted us with their health.',
    'testimonials.recovered': 'Recovered Patient',
    'contact.badge': 'Find Us',
    'contact.title': 'Visit Our Hospital',
    'contact.desc': 'We are conveniently located in the heart of Sherpur. Visit us for any medical assistance or consultation.',
    'contact.location_title': 'Our Location',
    'contact.location_desc': 'Nurjahan Villa, Narayanpur, Sherpur Sadar Hospital Road, Sherpur',
    'contact.phone_title': 'Phone Number',
    'contact.directions': 'Get Directions',
    'footer.about': 'Sherpur Ever Care Hospital is dedicated to providing the best medical services in Sherpur. We are the leading Sherpur Hospital for all your healthcare needs.',
    'footer.quick_links': 'Quick Links',
    'footer.contact_info': 'Contact Info',
    'footer.rights': 'All rights reserved.',
    'blood_bank.title': 'Blood Bank',
    'blood_bank.desc': 'Find blood donors in Sherpur. Every drop counts. Your donation can save a life.',
    'about_page_title': 'About Sherpur Ever Care Hospital',
    'about_page_subtitle': 'Providing compassionate and high-quality medical services to the people of Sherpur district.',
    'about_page_story_title': 'Our Story',
    'about_page_story_desc1': 'Sherpur Ever Care Hospital was founded with a vision to bring advanced healthcare facilities to the doorstep of Sherpur residents. Since our inception, we have been committed to clinical excellence and patient-centric care.',
    'about_page_story_desc2': 'We believe that everyone deserves access to quality medical treatment. Our hospital combines state-of-the-art technology with a human touch to ensure the best possible outcomes for our patients.',
    'about_page_why_excellence': 'Clinical Excellence',
    'feat_emergency': '24/7 Emergency',
    'feat_expert': 'Expert Doctors',
    'feat_nursing': 'Compassionate Nursing Staff',
    'feat_ot': 'Modern Operation Theaters',
    'feat_environment': 'Clean & Safe Environment',
    'about_page_mission_title': 'Our Mission',
    'about_page_mission_desc': 'To provide accessible, affordable, and high-quality healthcare services through innovation, compassion, and clinical excellence.',
    'about_page_vision_title': 'Our Vision',
    'about_page_vision_desc': 'To be the most trusted healthcare destination in the region, recognized for our commitment to patient safety and superior medical outcomes.',
    'about_page_why_title': 'Why Choose Us?',
    'about_page_why_subtitle': 'We are dedicated to providing the best possible care for you and your family.',
    'about_page_why_excellence_desc': 'We maintain the highest standards of medical care and safety.',
    'about_page_why_trust': 'Trusted by Thousands',
    'about_page_why_trust_desc': 'Our reputation is built on years of successful treatments and happy patients.',
    'about_page_why_compassion': 'Compassionate Care',
    'about_page_why_compassion_desc': 'We treat every patient with the dignity, respect, and care they deserve.',
  },
  bn: {
    'nav.home': 'হোম',
    'nav.about': 'আমাদের সম্পর্কে',
    'nav.services': 'সেবাসমূহ',
    'nav.doctors': 'ডাক্তারগণ',
    'nav.blood_bank': 'ব্লাড ব্যাংক',
    'nav.contact': 'যোগাযোগ',
    'hero.badge': 'শেরপুরে বিশ্বস্ত স্বাস্থ্যসেবা',
    'hero.title': 'শেরপুর এভারকেয়ার হাসপাতাল',
    'hero.desc': 'শেরপুর এভারকেয়ার হাসপাতাল (Sherpur Ever Care Hospital) শেরপুরে অত্যাধুনিক সুবিধা এবং বিশেষজ্ঞ চিকিৎসা পেশাদারদের সাথে সহানুভূতিশীল, উচ্চ-মানের চিকিৎসা সেবা প্রদান করছে। শেরপুর এভার কেয়ার - আপনার বিশ্বস্ত স্বাস্থ্যসেবা সঙ্গী।',
    'hero.book': 'অ্যাপয়েন্টমেন্ট বুক করুন',
    'hero.emergency': 'জরুরী কল',
    'hero.search_placeholder': 'ডাক্তার বা সেবা খুঁজুন...',
    'hero.search_btn': 'খুঁজুন',
    'hero.stat.emergency': 'জরুরী সহায়তা',
    'hero.stat.doctors': 'বিশেষজ্ঞ ডাক্তার',
    'hero.stat.patients': 'সুখী রোগী',
    'features.quality_title': 'মানসম্মত যত্ন',
    'features.quality_desc': 'আমরা চিকিৎসা শ্রেষ্ঠত্বের সর্বোচ্চ মান বজায় রাখি।',
    'features.service_title': '২৪/৭ সেবা',
    'features.service_desc': 'আমাদের জরুরী এবং আইসিইউ সেবা সার্বক্ষণিক উপলব্ধ।',
    'features.team_title': 'বিশেষজ্ঞ দল',
    'features.team_desc': 'বছরের পর বছর বিশেষ অভিজ্ঞতাসম্পন্ন নিবেদিত পেশাদার।',
    'about.badge': 'আমাদের হাসপাতাল সম্পর্কে',
    'about.title': 'শেরপুর এভার কেয়ার হাসপাতালে উন্নত স্বাস্থ্যসেবা',
    'about.desc1': 'শেরপুর এভারকেয়ার হাসপাতাল (Sherpur Ever Care Hospital) শেরপুর জেলার একটি শীর্ষস্থানীয় স্বাস্থ্যসেবা প্রদানকারী প্রতিষ্ঠান। নারায়ণপুরে অবস্থিত, আমরা রুটিন চেক-আপ থেকে শুরু করে জটিল সার্জারি এবং নিবিড় পরিচর্যা পর্যন্ত বিস্তৃত চিকিৎসা সেবা প্রদান করি।',
    'about.desc2': 'আমাদের সুবিধা আধুনিক ডায়াগনস্টিক সরঞ্জাম এবং আপনার সুস্থতার জন্য নিবেদিত উচ্চ যোগ্য ডাক্তার এবং নার্সদের একটি দল দ্বারা সজ্জিত।',
    'about.more': 'আমাদের সম্পর্কে আরও জানুন',
    'services.badge': 'আমাদের বিশেষত্ব',
    'services.title': 'ব্যাপক চিকিৎসা সেবাসমূহ',
    'services.desc': 'আমরা আপনার সমস্ত স্বাস্থ্যসেবা প্রয়োজন মেটাতে এক ছাদের নিচে বিস্তৃত বিশেষ চিকিৎসা সেবা প্রদান করি।',
    'services.emergency': 'জরুরী যত্ন',
    'services.emergency_desc': 'সব ধরণের জরুরী অবস্থার জন্য ২৪/৭ তাৎক্ষণিক চিকিৎসা মনোযোগ।',
    'services.diagnostics': 'ডায়াগনস্টিকস',
    'services.diagnostics_desc': '২৪-ঘন্টা ইউএসজি, অ্যানোমালি স্ক্যান, ইকোকার্ডিওগ্রাম, ডিজিটাল এক্স-রে এবং ইসিজি।',
    'services.surgery': 'সার্জারি',
    'services.surgery_desc': '২৪-ঘন্টা বড় এবং ছোট সার্জারি, স্বাভাবিক ডেলিভারি এবং সি-সেকশন।',
    'services.maternity': 'মাতৃত্ব',
    'services.maternity_desc': 'বিশেষজ্ঞ যত্নের সাথে ২৪-ঘন্টা স্বাভাবিক ডেলিভারি এবং সিজারিয়ান সেকশন।',
    'services.more': 'আরও পড়ুন',
    'services.view_all': 'সব সেবা দেখুন',
    'doctors.badge': 'আমাদের বিশেষজ্ঞদের সাথে দেখা করুন',
    'doctors.title': 'যোগ্য চিকিৎসা পেশাদারগণ',
    'doctors.desc': 'আমাদের দল সর্বোত্তম রোগীর যত্ন প্রদানের জন্য নিবেদিত অত্যন্ত অভিজ্ঞ বিশেষজ্ঞদের নিয়ে গঠিত।',
    'doctors.view_all': 'সব ডাক্তার দেখুন',
    'doctors.view_profile': 'প্রোফাইল দেখুন এবং বুক করুন',
    'testimonials.title': 'আমাদের রোগীরা যা বলেন',
    'testimonials.desc': 'যারা তাদের স্বাস্থ্যের জন্য আমাদের বিশ্বাস করেছেন তাদের কাছ থেকে বাস্তব প্রতিক্রিয়া।',
    'testimonials.recovered': 'সুস্থ রোগী',
    'contact.badge': 'আমাদের খুঁজুন',
    'contact.title': 'আমাদের হাসপাতাল পরিদর্শন করুন',
    'contact.desc': 'আমরা শেরপুরের হৃদয়ে সুবিধাজনকভাবে অবস্থিত। যেকোনো চিকিৎসা সহায়তা বা পরামর্শের জন্য আমাদের পরিদর্শন করুন।',
    'contact.location_title': 'আমাদের অবস্থান',
    'contact.location_desc': 'নূরজাহান ভিলা, নারায়ণপুর, শেরপুর সদর হাসপাতাল রোড, শেরপুর',
    'contact.phone_title': 'ফোন নম্বর',
    'contact.directions': 'দিকনির্দেশ পান',
    'footer.about': 'শেরপুর এভারকেয়ার হাসপাতাল শেরপুরে সর্বোত্তম চিকিৎসা সেবা প্রদানের জন্য নিবেদিত। শেরপুরের সেরা এভারকেয়ার হসপিটাল হিসেবে আপনার স্বাস্থ্য আমাদের অগ্রাধিকার।',
    'footer.quick_links': 'দ্রুত লিঙ্ক',
    'footer.contact_info': 'যোগাযোগের তথ্য',
    'footer.rights': 'সর্বস্বত্ব সংরক্ষিত।',
    'blood_bank.title': 'ব্লাড ব্যাংক',
    'blood_bank.desc': 'শেরপুরে রক্তদাতা খুঁজুন। প্রতি ফোঁটা রক্ত মূল্যবান। আপনার দান একটি জীবন বাঁচাতে পারে।',
    'about_page_title': 'শেরপুর এভারকেয়ার হাসপাতাল সম্পর্কে',
    'about_page_subtitle': 'শেরপুর জেলার মানুষের জন্য সহানুভূতিশীল এবং উচ্চমানের চিকিৎসা সেবা প্রদান করছি।',
    'about_page_story_title': 'আমাদের গল্প',
    'about_page_story_desc1': 'শেরপুর এভারকেয়ার হাসপাতাল শেরপুরবাসীর দোরগোড়ায় উন্নত স্বাস্থ্যসেবা পৌঁছে দেওয়ার লক্ষ্য নিয়ে প্রতিষ্ঠিত হয়েছিল। আমাদের যাত্রার শুরু থেকেই আমরা উন্নত চিকিৎসা এবং রোগী-কেন্দ্রিক সেবার প্রতি প্রতিশ্রুতিবদ্ধ।',
    'about_page_story_desc2': 'আমরা বিশ্বাস করি যে প্রত্যেকেরই মানসম্মত চিকিৎসা পাওয়ার অধিকার রয়েছে। আমাদের হাসপাতাল রোগীদের সর্বোত্তম ফলাফল নিশ্চিত করতে মানবিক স্পর্শের সাথে অত্যাধুনিক প্রযুক্তির সমন্বয় ঘটায়।',
    'about_page_why_excellence': 'চিকিৎসা উৎকর্ষ',
    'feat_emergency': '২৪/৭ জরুরী সেবা',
    'feat_expert': 'বিশেষজ্ঞ ডাক্তার',
    'feat_nursing': 'সহানুভূতিশীল নার্সিং স্টাফ',
    'feat_ot': 'আধুনিক অপারেশন থিয়েটার',
    'feat_environment': 'পরিচ্ছন্ন ও নিরাপদ পরিবেশ',
    'about_page_mission_title': 'আমাদের লক্ষ্য',
    'about_page_mission_desc': 'উদ্ভাবন, সহানুভূতি এবং চিকিৎসা উৎকর্ষের মাধ্যমে সহজলভ্য, সাশ্রয়ী এবং উচ্চমানের স্বাস্থ্যসেবা প্রদান করা।',
    'about_page_vision_title': 'আমাদের স্বপ্ন',
    'about_page_vision_desc': 'রোগীর নিরাপত্তা এবং উন্নত চিকিৎসার প্রতি আমাদের প্রতিশ্রুতির জন্য এই অঞ্চলের সবচেয়ে বিশ্বস্ত স্বাস্থ্যসেবা গন্তব্য হওয়া।',
    'about_page_why_title': 'কেন আমাদের বেছে নেবেন?',
    'about_page_why_subtitle': 'আমরা আপনার এবং আপনার পরিবারের জন্য সর্বোত্তম যত্ন প্রদানের জন্য নিবেদিত।',
    'about_page_why_excellence_desc': 'আমরা চিকিৎসা সেবা এবং নিরাপত্তার সর্বোচ্চ মান বজায় রাখি।',
    'about_page_why_trust': 'হাজারো মানুষের আস্থা',
    'about_page_why_trust_desc': 'আমাদের খ্যাতি বছরের পর বছর সফল চিকিৎসা এবং সুখী রোগীদের ওপর ভিত্তি করে তৈরি।',
    'about_page_why_compassion': 'সহানুভূতিশীল যত্ন',
    'about_page_why_compassion_desc': 'আমরা প্রতিটি রোগীকে মর্যাদা, সম্মান এবং যত্নের সাথে চিকিৎসা করি।',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'bn';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
