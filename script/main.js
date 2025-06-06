// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
const fadeInElements = document.querySelectorAll('.fade-in');
fadeInElements.forEach(el => observer.observe(el));

// Contact form handling
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formError = document.getElementById('form-error');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Hide previous messages
    formSuccess.classList.add('hidden');
    formError.classList.add('hidden');

    // Get form data
    const formData = new FormData(contactForm);

    try {
        // Note: Replace YOUR_FORM_ID with actual Formspree form ID
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formSuccess.classList.remove('hidden');
            contactForm.reset();

            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        formError.classList.remove('hidden');

        // Scroll to error message
        formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Form validation
const formInputs = document.querySelectorAll('.form-input');
formInputs.forEach(input => {
    input.addEventListener('blur', validateInput);
    input.addEventListener('input', clearValidationError);
});

function validateInput(e) {
    const input = e.target;
    const isRequired = input.hasAttribute('required');
    const isEmpty = !input.value.trim();

    if (isRequired && isEmpty) {
        showInputError(input, 'This field is required');
    } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
        showInputError(input, 'Please enter a valid email address');
    } else {
        clearInputError(input);
    }
}

function clearValidationError(e) {
    clearInputError(e.target);
}

function showInputError(input, message) {
    clearInputError(input);

    input.classList.add('border-red-500');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    errorDiv.setAttribute('data-error-for', input.id);

    input.parentNode.appendChild(errorDiv);
}

function clearInputError(input) {
    input.classList.remove('border-red-500');
    const existingError = input.parentNode.querySelector(`[data-error-for="${input.id}"]`);
    if (existingError) {
        existingError.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Header scroll effect
const header = document.querySelector('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
        header.classList.add('shadow-lg');
    } else {
        header.classList.remove('shadow-lg');
    }

    lastScrollY = currentScrollY;
});

// Initialize animations on page load
window.addEventListener('load', () => {
    // Trigger initial fade-in for elements in viewport
    fadeInElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
        }
    });
});

// Keyboard navigation accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
});

// Translation System
const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_services: "Services",
        nav_languages: "Languages",
        nav_contact: "Contact",
        hero_title_1: "Master Languages with",
        hero_title_2: "Expert Guidance",
        hero_description: "Multilingual Education Specialist offering university-level language instruction in 7+ languages including Arabic, English, French, German, and Russian.",
        btn_book_session: "Book a Session",
        btn_view_services: "View Services",
        stat_languages: "Languages",
        stat_students: "Students",
        stat_experience: "Years Experience",
        about_title: "About Dr. Abdulrahman",
        about_subtitle: "Dedicated to empowering students through comprehensive language education and cultural understanding",
        about_philosophy_title: "Academic Excellence & Teaching Philosophy",
        about_expertise_title: "University-Level Expertise",
        about_expertise_desc: "PhD in Applied Linguistics with specialization in multilingual education and second language acquisition.",
        about_approach_title: "Cognitive Learning Approach",
        about_approach_desc: "Utilizing modern neurolinguistic methods to accelerate language acquisition and retention.",
        about_instruction_title: "Personalized Instruction",
        about_instruction_desc: "Tailored teaching methods adapted to individual learning styles and cultural backgrounds.",
        about_credentials_title: "Credentials & Achievements",
        credential_phd: "PhD in Applied Linguistics - University of Oxford",
        credential_celta: "CELTA Certified English Language Teacher",
        credential_ielts: "IELTS Official Examiner Certification",
        credential_research: "Published Research in Language Acquisition",
        credential_lecturer: "Guest Lecturer at International Universities",
        btn_download_cv: "Download Complete CV",
        services_title: "Language Learning Services",
        services_subtitle: "Comprehensive language programs designed to meet your academic, professional, and personal goals",
        service1_title: "Arabic for Non-Native Speakers",
        service1_desc: "Master Modern Standard Arabic and regional dialects with culturally immersive teaching methods.",
        service1_feature1: "Classical & Modern Arabic",
        service1_feature2: "Cultural Context Integration",
        service1_feature3: "Business Arabic Available",
        service2_title: "IELTS/TOEFL Preparation",
        service2_desc: "Comprehensive test preparation with proven strategies for achieving your target scores.",
        service2_feature1: "Speaking & Writing Focus",
        service2_feature2: "Mock Tests & Feedback",
        service2_feature3: "Score Guarantee Program",
        service3_title: "Academic Writing Coaching",
        service3_desc: "Enhance your academic writing skills for essays, dissertations, and research papers.",
        service3_feature1: "Research Methodology",
        service3_feature2: "Citation & Referencing",
        service3_feature3: "Thesis Support Available",
        service4_title: "Business Language Skills",
        service4_desc: "Professional language training for international business communication and presentations.",
        service4_feature1: "Corporate Communication",
        service4_feature2: "Presentation Skills",
        service4_feature3: "Industry-Specific Vocabulary",
        service5_title: "Conversation Practice Sessions",
        service5_desc: "Build confidence through structured conversation practice with native-level fluency guidance.",
        service5_feature1: "Real-world Scenarios",
        service5_feature2: "Pronunciation Correction",
        service5_feature3: "Cultural Nuances",
        service6_title: "University Entrance Prep",
        service6_feature1: "Admission Essay Writing",
        service6_feature2: "Interview Preparation",
        service6_feature3: "Scholarship Applications",
        service6_desc: "Comprehensive university language requirements and preparation for entrance exams",
        price_from: "Starting from $40/hour",
        languages_title: "Languages I Teach",
        languages_subtitle: "Fluent instruction across multiple languages with cultural expertise",
        contact_title: "Get In Touch",
        contact_subtitle: "Ready to start your language learning journey? Let's discuss your goals and create a personalized learning plan.",
        contact_name: "Full Name",
        contact_email: "Email Address",
        contact_phone: "Phone Number",
        contact_language: "Preferred Language",
        contact_message: "Your Message",
        btn_send_message: "Send Message",
        footer_links: "Quick Links",
        footer_about: "About Me",
        footer_services: "Services",
        footer_languages: "Languages",
        footer_contact: "Contact",
        footer_download_cv: "Download CV",
        footer_contact_info: "Contact",
        footer_rights: "All rights reserved.",
        testimonials_title: "Student Testimonials",
        testimonials_subtitle: "Hear from students who have achieved their language learning goals with expert guidance",
        language_arabic: "Arabic",
        language_english: "English",
        language_french: "French",
        language_german: "German",
        language_russian: "Russian",
        language_spanish: "Spanish",
        language_italian: "Italian",
        language_turkish: "Turkish",
        language_native: "Native",
        language_fluent: "Fluent",
        language_advanced: "Advanced",
        language_intermediate: "Intermediate",
        contact_form_title: "Send a Message",
        contact_form_name: "Full Name *",
        contact_form_email: "Email Address *",
        contact_form_phone: "Phone Number (Optional)",
        contact_form_language: "Preferred Language for Communication",
        contact_form_message: "Message *",
        contact_form_send_message: "Send Message",
        contact_form_success_message: "Thank you for your message! I'll get back to you within 24 hours.",
        contact_form_error_message: "Sorry, there was an error sending your message. Please try again or contact me directly.",
        contact_info_title: "Contact Information",
        contact_info_email: "Email",
        contact_info_whatsapp: "WhatsApp",
        contact_info_phone: "Phone",
        contact_info_location: "Location",
        contact_location_desc: "Online & In-Person Sessions Available",
        office_hours_title: "Office Hours",
        office_hours_weekdays: "Monday - Friday",
        office_hours_weekdays_time: "9:00 AM - 8:00 PM",
        office_hours_saturday: "Saturday",
        office_hours_saturday_time: "10:00 AM - 6:00 PM",
        office_hours_sunday: "Sunday",
        office_hours_sunday_time: "By Appointment",
        office_hours_note: "* All times are in local timezone. International students can schedule sessions according to their preferred time zones.",
        quick_response_title: "Quick Response Guarantee",
        quick_response_desc: "I typically respond to all inquiries within 24 hours. For urgent matters, please contact me via WhatsApp for immediate assistance.",
        quick_response_time: "Average response time: 6 hours",
        footer_about_title: "Dr. Abdulrahman",
        footer_about_desc: "Professional multilingual educator dedicated to helping students achieve their language learning goals through personalized instruction and proven methodologies.",
        footer_links_title: "Quick Links",
        footer_links_about: "About Me",
        footer_links_services: "Services",
        footer_links_languages: "Languages",
        footer_links_contact: "Contact",
        footer_links_download_cv: "Download CV",
        footer_contact_title: "Contact",
        footer_contact_email: "dr.abdulrahman@example.com",
        footer_contact_phone: "+1 (234) 567-8900",
        footer_contact_location: "Online & In-Person Sessions",
        header_title: "Dr. Abdulrahman",
        proficiency_native: "Native",
        proficiency_fluent: "Fluent",
        proficiency_advanced: "Advanced",
        proficiency_intermediate: "Intermediate",

        // Language Switcher
        current_language: "EN",
        mobile_current_language: "English",

        // Profile Section
        profile_photo_text: "Professional Photo",
        profile_name: "Dr. Abdulrahman",

        // Contact Section
        contact_email_title: "Email",
        contact_whatsapp_title: "WhatsApp",
        contact_phone_title: "Phone",
        contact_location_title: "Location",

        // Office Hours
        office_hours_weekdays: "Monday - Friday",
        office_hours_weekdays_time: "9:00 AM - 8:00 PM",
        office_hours_saturday: "Saturday",
        office_hours_saturday_time: "10:00 AM - 6:00 PM",
        office_hours_sunday: "Sunday",
        office_hours_sunday_time: "By Appointment",
        office_hours_note: "* All times are in local timezone. International students can schedule sessions according to their preferred time zones.",

        // Quick Response
        quick_response_title: "Quick Response Guarantee",
        quick_response_desc: "I typically respond to all inquiries within 24 hours. For urgent matters, please contact me via WhatsApp for immediate assistance.",
        quick_response_time: "Average response time: 6 hours",

        // Footer
        footer_about_title: "Dr. Abdulrahman",
        footer_about_desc: "Professional multilingual educator dedicated to helping students achieve their language learning goals through personalized instruction and proven methodologies.",
        footer_links_title: "Quick Links",
        footer_link_about: "About Me",
        footer_link_services: "Services",
        footer_link_languages: "Languages",
        footer_link_contact: "Contact",
        footer_link_cv: "Download CV",
        footer_contact_title: "Contact",
        footer_contact_email: "dr.abdulrahman@example.com",
        footer_contact_whatsapp: "+1 (234) 567-8900",
        footer_contact_location: "Online & In-Person Sessions",
        footer_copyright: "© Dr. Abdulrahman Language Tutor. All rights reserved.",
        footer_tagline: "Professional language education services | IELTS Official Examiner | PhD Applied Linguistics",

        // Social Media
        social_linkedin: "LinkedIn",
        social_twitter: "Twitter",
        social_whatsapp: "WhatsApp",
        social_email: "Email",

        // Form Labels
        form_name_label: "Full Name *",
        form_email_label: "Email Address *",
        form_phone_label: "Phone Number (Optional)",
        form_language_label: "Preferred Language for Communication",
        form_message_label: "Message *",
        form_message_placeholder: "Tell me about your language learning goals...",
        form_submit_button: "Send Message",
        form_success_message: "Thank you for your message! I'll get back to you within 24 hours.",
        form_error_message: "Sorry, there was an error sending your message. Please try again or contact me directly.",

        // Testimonial quotes
        testimonial_quote_1: "Dr. Abdulrahman's approach to teaching English for business has been transformative. His cultural insights and practical exercises helped me excel in international negotiations.",
        testimonial_quote_2: "I achieved a 7.5 IELTS score thanks to Dr. Abdulrahman's structured approach. His mock tests and personalized feedback were invaluable for my university application.",
        testimonial_quote_3: "Learning Arabic seemed impossible until I found Dr. Abdulrahman. His patient teaching style and cultural immersion methods made the language come alive for me.",
        testimonial_quote_4: "Dr. Abdulrahman's expertise in multiple languages is remarkable. He helped me improve my technical English for international conferences with great success.",

        // Service prices
        service1_price: "Starting from $40/hour",
        service2_price: "Starting from $40/hour",
        service3_price: "Starting from $45/hour",
        service4_price: "Starting from $55/hour",
        service5_price: "Starting from $35/hour",
        service6_price: "Starting from $60/hour",
    },
    ar: {
        nav_home: "الرئيسية",
        nav_about: "حول",
        nav_services: "الخدمات",
        nav_languages: "اللغات",
        nav_contact: "اتصل بنا",
        hero_title_1: "أتقن اللغات مع",
        hero_title_2: "إرشاد الخبراء",
        hero_description: "أخصائي تعليم متعدد اللغات يقدم تعليم اللغات على مستوى جامعي في أكثر من 7 لغات بما في ذلك العربية والإنجليزية والفرنسية والألمانية والروسية.",
        btn_book_session: "احجز جلسة",
        btn_view_services: "عرض الخدمات",
        stat_languages: "لغات",
        stat_students: "طالب",
        stat_experience: "سنوات خبرة",
        about_title: "حول الدكتور عبدالرحمن",
        about_subtitle: "مكرس لتمكين الطلاب من خلال التعليم الشامل للغات والفهم الثقافي",
        about_philosophy_title: "التميز الأكاديمي وفلسفة التدريس",
        about_expertise_title: "خبرة على مستوى جامعي",
        about_expertise_desc: "دكتوراه في اللسانيات التطبيقية مع تخصص في التعليم متعدد اللغات واكتساب اللغة الثانية.",
        about_approach_title: "نهج التعلم المعرفي",
        about_approach_desc: "استخدام الطرق العصبية اللغوية الحديثة لتسريع اكتساب اللغة والاحتفاظ بها.",
        about_instruction_title: "التعليم الشخصي",
        about_instruction_desc: "طرق تدريس مصممة خصيصاً تتكيف مع أساليب التعلم الفردية والخلفيات الثقافية.",
        about_credentials_title: "المؤهلات والإنجازات",
        credential_phd: "دكتوراه في اللسانيات التطبيقية - جامعة أكسفورد",
        credential_celta: "معلم لغة إنجليزية معتمد CELTA",
        credential_ielts: "شهادة ممتحن IELTS الرسمي",
        credential_research: "أبحاث منشورة في اكتساب اللغة",
        credential_lecturer: "محاضر ضيف في الجامعات الدولية",
        btn_download_cv: "تحميل السيرة الذاتية الكاملة",
        services_title: "خدمات تعلم اللغات",
        services_subtitle: "برامج لغوية شاملة مصممة لتلبية أهدافك الأكاديمية والمهنية والشخصية",
        service1_title: "العربية لغير الناطقين بها",
        service1_desc: "أتقن العربية الفصحى الحديثة واللهجات الإقليمية بطرق تدريس غامرة ثقافياً.",
        service1_feature1: "العربية الكلاسيكية والحديثة",
        service1_feature2: "التكامل السياق الثقافي",
        service1_feature3: "العربية التجارية متاحة",
        service2_title: "إعداد IELTS/TOEFL",
        service2_desc: "إعداد شامل للاختبار مع استراتيجيات مثبتة لتحقيق درجاتك المستهدفة.",
        service2_feature1: "التركيز على التحدث والكتابة",
        service2_feature2: "اختبارات تجريبية وملاحظات",
        service2_feature3: "برنامج ضمان الدرجات",
        service3_title: "إدارة الكتابة الأكاديمية",
        service3_desc: "تحسين مهارات كتابة الأكاديمية للأطراف والبحث والأبحاث.",
        service3_feature1: "البحث الطريقة",
        service3_feature2: "الاستشهاد والمراجعة",
        service3_feature3: "الدعم الأكاديمي متاح",
        service4_title: "مهارات اللغة التجارية",
        service4_desc: "تدريب لغوي مهني للأعمال الدولية والتقدم المهني.",
        service4_feature1: "مفردات خاصة بالصناعة",
        service4_feature2: "مهارات العرض",
        service4_feature3: "التواصل عبر الثقافات",
        service5_title: "جلسات المحادثة التمرينية",
        service5_desc: "إنشاء الثقة عبر تمرين محادثة مبني على المستوى الأصلي للتحدث والتواصل.",
        service5_feature1: "السنوات الحقيقية",
        service5_feature2: "تصحيح التلفظ",
        service5_feature3: "التفاوت الثقافي",
        service6_title: "تجهيز الدخول الجامعي",
        service6_feature1: "كتابة مقال القبول الجامعي",
        service6_feature2: "إعداد المقابلة",
        service6_feature3: "طلبات المنح الدراسية",
        service6_desc: "إعداد شامل لمتطلبات اللغة الجامعية وامتحانات القبول",
        price_from: "بدءاً من 40 دولار/ساعة",
        languages_title: "اللغات التي أُدرّسها",
        languages_subtitle: "تعليم طلق عبر لغات متعددة مع خبرة ثقافية",
        contact_title: "تواصل معنا",
        contact_subtitle: "مستعد لبدء رحلة تعلم اللغة؟ دعنا نناقش أهدافك ونضع خطة تعلم شخصية.",
        contact_name: "الاسم الكامل",
        contact_email: "عنوان البريد الإلكتروني",
        contact_phone: "رقم الهاتف",
        contact_language: "اللغة المفضلة",
        contact_message: "رسالتك",
        btn_send_message: "إرسال الرسالة",
        footer_links: "روابط سريعة",
        footer_about: "حولي",
        footer_services: "الخدمات",
        footer_languages: "اللغات",
        footer_contact: "اتصل بنا",
        footer_download_cv: "تحميل السيرة الذاتية",
        footer_contact_info: "اتصل بنا",
        footer_rights: "جميع الحقوق محفوظة.",
        testimonials_title: "شهادات الطلاب",
        testimonials_subtitle: "استمع إلى الطلاب الذين حققوا أهدافهم في تعلم اللغة بإرشاد الخبراء",
        language_arabic: "العربية",
        language_english: "الإنجليزية",
        language_french: "الفرنسية",
        language_german: "الألمانية",
        language_russian: "الروسية",
        language_spanish: "الإسبانية",
        language_italian: "الإيطالية",
        language_turkish: "التركية",
        language_native: "الأصلي",
        language_fluent: "المهرة",
        language_advanced: "المتقدم",
        language_intermediate: "المتوسط",
        contact_form_title: "إرسال رسالة",
        contact_form_name: "الاسم الكامل *",
        contact_form_email: "عنوان البريد الإلكتروني *",
        contact_form_phone: "رقم الهاتف (اختياري)",
        contact_form_language: "اللغة المفضلة للتواصل",
        contact_form_message: "الرسالة *",
        contact_form_send_message: "إرسال الرسالة",
        contact_form_success_message: "شكرا لرسالتك! سأتواصل معك في غضون 24 ساعة.",
        contact_form_error_message: "عذرا ، هناك خطأ في إرسال رسالتك. يرجى المحاولة مرة أخرى أو التواصل معي مباشرة.",
        contact_info_title: "معلومات الاتصال",
        contact_info_email: "البريد الإلكتروني",
        contact_info_whatsapp: "واتس آب",
        contact_info_phone: "الهاتف",
        contact_info_location: "الموقع",
        contact_location_desc: "الجلسات متاحة عبر الإنترنت وجهاً لوجه",
        office_hours_title: "ساعات العمل",
        office_hours_weekdays: "الاثنين - الجمعة",
        office_hours_weekdays_time: "٩:٠٠ ص - ٨:٠٠ م",
        office_hours_saturday: "السبت",
        office_hours_saturday_time: "١٠:٠٠ ص - ٦:٠٠ م",
        office_hours_sunday: "الأحد",
        office_hours_sunday_time: "بالتواصل الشخصي",
        office_hours_note: "* جميع الأوقات بتوقيت المكان المحلي. يمكن للطلاب الدوليين جدولة جلساتهم حسب توقيتهم المفضل",
        quick_response_title: "ضمان الاستجابة السريعة",
        quick_response_desc: "أعتاد أن أتواصل مع جميع الاستفسارات خلال 24 ساعة. بالنسبة للأمور الاخرى يرجى التواصل معي عبر واتس آب للمساعدة الفورية.",
        quick_response_time: "متوسط وقت الاستجابة: 6 ساعات",
        footer_about_title: "الدكتور عبدالرحمن",
        footer_about_desc: "معلم متعدد اللغات مكرس لمساعدة الطلاب في تحقيق أهدافهم في تعلم اللغة من خلال التعليم الفردي والطرق المثبتة",
        footer_links_title: "روابط سريعة",
        footer_link_about: "عن الدكتور عبد الرحمن",
        footer_link_services: "الخدمات",
        footer_link_languages: "اللغات",
        footer_link_contact: "اتصل بنا",
        footer_link_cv: "تحميل السيرة الذاتية",
        footer_contact_title: "اتصل بنا",
        footer_contact_email: "dr.abdulrahman@example.com",
        footer_contact_phone: "+1 (234) 567-8900",
        footer_contact_location: "الجلسات عبر الإنترنت والجلسات الشخصية",
        footer_copyright: "© معلم لغوي د.عبدالرحمن. جميع الحقوق محفوظة.",
        header_title: "الدكتور عبد الرحمن",
        proficiency_native: "اللغة الأم",
        proficiency_fluent: "بطلاقة",
        proficiency_advanced: "متقدم",
        proficiency_intermediate: "متوسط",

        // Form Labels
        form_name_label: "الاسم الكامل *",
        form_email_label: "البريد الإلكتروني *",
        form_phone_label: "رقم الهاتف (اختياري)",
        form_language_label: "اللغة المفضلة للتواصل",
        form_message_label: "الرسالة *",
        form_message_placeholder: "أخبرني عن أهدافك في تعلم اللغة...",
        form_submit_button: "إرسال الرسالة",
        form_success_message: "شكراً لرسالتك! سأرد عليك خلال 24 ساعة.",
        form_error_message: "عذراً، حدث خطأ في إرسال رسالتك. يرجى المحاولة مرة أخرى أو التواصل معي مباشرة.",

        // Testimonial quotes
        testimonial_quote_1: "كانت طريقة الدكتور عبدالرحمن في تدريس اللغة الإنجليزية للأعمال تحويلية. ساعدتني رؤاه الثقافية وتمارينه العملية على التفوق في المفاوضات الدولية.",
        testimonial_quote_2: "حصلت على درجة 7.5 في اختبار IELTS بفضل نهج الدكتور عبدالرحمن المنظم. كانت اختباراته التجريبية وملاحظاته الشخصية لا تقدر بثمن لتقديمي للجامعة.",
        testimonial_quote_3: "بدا تعلم اللغة العربية مستحيلاً حتى وجدت الدكتور عبدالرحمن. جعل أسلوبه الصبور في التدريس وطرقه في الانغماس الثقافي اللغة تنبض بالحياة بالنسبة لي.",
        testimonial_quote_4: "خبرة الدكتور عبدالرحمن في اللغات المتعددة رائعة. ساعدني في تحسين لغتي الإنجليزية التقنية للمؤتمرات الدولية بنجاح كبير.",

        // Service prices
        service1_price: "تبدأ من 40 دولار/ساعة",
        service2_price: "تبدأ من 40 دولار/ساعة",
        service3_price: "تبدأ من 45 دولار/ساعة",
        service4_price: "تبدأ من 55 دولار/ساعة",
        service5_price: "تبدأ من 35 دولار/ساعة",
        service6_price: "تبدأ من 60 دولار/ساعة",
        // Contact Info Section Titles
        contact_email_title: "البريد الإلكتروني",
        contact_whatsapp_title: "واتس آب",
        contact_phone_title: "الهاتف",
        contact_location_title: "الموقع",

        // Footer Links
        footer_link_about: "عن الدكتور عبد الرحمن",
        footer_link_services: "الخدمات",
        footer_link_languages: "اللغات",
        footer_link_contact: "اتصل بنا",
        footer_link_cv: "تحميل السيرة الذاتية",

        // Footer Tagline
        footer_tagline: "خدمات تعليم لغات احترافية | ممتحن IELTS الرسمي | دكتوراه في اللسانيات التطبيقية",
    },
    zh: {
        nav_home: "首页",
        nav_about: "关于",
        nav_services: "服务",
        nav_languages: "语言",
        nav_contact: "联系",
        hero_title_1: "跟随专家指导",
        hero_title_2: "掌握语言",
        hero_description: "多语言教育专家，提供大学水平的语言教学，涵盖阿拉伯语、英语、法语、德语、俄语等7+种语言。",
        btn_book_session: "预约课程",
        btn_view_services: "查看服务",
        stat_languages: "种语言",
        stat_students: "名学生",
        stat_experience: "年经验",
        about_title: "关于阿卜杜勒拉赫曼博士",
        about_subtitle: "致力于通过全面的语言教育和文化理解赋能学生",
        about_philosophy_title: "学术卓越与教学理念",
        about_expertise_title: "大学级专业知识",
        about_expertise_desc: "应用语言学博士，专攻多语言教育和第二语言习得。",
        about_approach_title: "认知学习方法",
        about_approach_desc: "运用现代神经语言学方法加速语言习得和记忆。",
        about_instruction_title: "个性化教学",
        about_instruction_desc: "量身定制的教学方法，适应个人学习风格和文化背景。",
        about_credentials_title: "资历与成就",
        credential_phd: "应用语言学博士 - 牛津大学",
        credential_celta: "CELTA认证英语教师",
        credential_ielts: "IELTS官方考官认证",
        credential_research: "语言习得研究发表",
        credential_lecturer: "国际大学客座讲师",
        btn_download_cv: "下载完整简历",
        services_title: "语言学习服务",
        services_subtitle: "全面的语言课程，旨在满足您的学术、专业和个人目标",
        service1_title: "面向非母语者的阿拉伯语",
        service1_desc: "通过文化沉浸式教学方法掌握现代标准阿拉伯语和地方方言。",
        service1_feature1: "古典与现代阿拉伯语",
        service1_feature2: "文化背景整合",
        service1_feature3: "提供商务阿拉伯语",
        service2_title: "IELTS/TOEFL备考",
        service2_desc: "全面的考试准备，采用经过验证的策略帮您达到目标分数。",
        service2_feature1: "口语写作重点",
        service2_feature2: "模拟考试与反馈",
        service2_feature3: "分数保证计划",
        service3_title: "学术写作辅导",
        service3_desc: "提高学术写作技能，为论文、论文和研究论文做准备。",
        service3_feature1: "研究方法",
        service3_feature2: "引用和参考",
        service3_feature3: "论文支持可用",
        service4_title: "商务语言技能",
        service4_desc: "为国际商务和职业发展提供专业语言培训。",
        service4_feature1: "行业专用词汇",
        service4_feature2: "演讲技巧",
        service4_feature3: "跨文化交流",
        service5_title: "对话练习课程",
        service5_desc: "通过结构化对话练习建立信心，与母语者水平交流。",
        service5_feature1: "现实世界场景",
        service5_feature2: "发音纠正",
        service5_feature3: "文化细微差别",
        service6_title: "大学入学准备",
        service6_feature1: "大学申请写作",
        service6_feature2: "面试准备",
        service6_feature3: "奖学金申请",
        service6_desc: "全面的大学语言要求和入学考试准备",
        price_from: "40美元/小时起",
        languages_title: "我教授的语言",
        languages_subtitle: "在多种语言中提供流利教学，具备文化专业知识",
        contact_title: "联系我们",
        contact_subtitle: "准备开始您的语言学习之旅了吗？让我们讨论您的目标并制定个性化学习计划。",
        contact_name: "姓名",
        contact_email: "电子邮箱",
        contact_phone: "电话号码",
        contact_language: "首选语言",
        contact_message: "您的留言",
        btn_send_message: "发送消息",
        footer_links: "快速链接",
        footer_about: "关于我",
        footer_services: "服务",
        footer_languages: "语言",
        footer_contact: "联系",
        footer_download_cv: "下载简历",
        footer_contact_info: "联系方式",
        footer_rights: "版权所有。",
        testimonials_title: "学生评价",
        testimonials_subtitle: "从专家指导中实现语言学习目标的学生",
        language_arabic: "阿拉伯语",
        language_english: "英语",
        language_french: "法语",
        language_german: "德语",
        language_russian: "俄语",
        language_spanish: "西班牙语",
        language_italian: "意大利语",
        language_turkish: "土耳其语",
        language_native: "母语",
        language_fluent: "流利",
        language_advanced: "高级",
        language_intermediate: "中级",
        contact_form_title: "发送消息",
        contact_form_name: "全名 *",
        contact_form_email: "电子邮件地址 *",
        contact_form_phone: "电话号码（可选）",
        contact_form_language: "通信的首选语言",
        contact_form_message: "消息 *",
        contact_form_send_message: "发送消息",
        contact_form_success_message: "感谢您的消息！我会在24小时内回复您。",
        contact_form_error_message: "抱歉，发送消息时出错。请重试或直接联系我。",
        contact_info_title: "联系信息",
        contact_info_email: "电子邮件",
        contact_info_whatsapp: "WhatsApp",
        contact_info_phone: "电话",
        contact_info_location: "位置",
        contact_location_desc: "提供在线和面对面课程",
        office_hours_title: "办公时间",
        office_hours_weekdays: "周一至周五",
        office_hours_weekdays_time: "上午9:00 - 晚上8:00",
        office_hours_saturday: "周六",
        office_hours_saturday_time: "上午10:00 - 下午6:00",
        office_hours_sunday: "周日",
        office_hours_sunday_time: "预约制",
        office_hours_note: "* 所有时间均为当地时间。国际学生可以根据自己所在时区安排课程。",
        quick_response_title: "快速响应保证",
        quick_response_desc: "我通常在24小时内回复所有咨询。紧急事项请通过WhatsApp联系我获取即时帮助。",
        quick_response_time: "平均响应时间：6小时",
        footer_about_title: "阿卜杜勒拉赫曼博士",
        footer_about_desc: "专业多语言教育工作者，致力于通过个性化教学和行之有效的方法帮助学生实现语言学习目标。",
        footer_links_title: "快速链接",
        footer_links_about: "关于我",
        footer_links_services: "服务",
        footer_links_languages: "语言",
        footer_links_contact: "联系",
        footer_links_download_cv: "下载简历",
        footer_contact_title: "联系方式",
        footer_contact_email: "dr.abdulrahman@example.com",
        footer_contact_whatsapp: "+1 (234) 567-8900",
        footer_contact_location: "在线和面对面课程",
        footer_copyright: "© 阿卜杜勒拉赫曼语言导师。版权所有。",
        footer_tagline: "专业语言教育服务 | IELTS官方考官 | 应用语言学博士",
        header_title: "阿卜杜勒拉赫曼博士",
        proficiency_native: "母语",
        proficiency_fluent: "流利",
        proficiency_advanced: "高级",
        proficiency_intermediate: "中级",

        // Social Media
        social_linkedin: "领英",
        social_twitter: "推特",
        social_whatsapp: "WhatsApp",
        social_email: "电子邮件",

        // Form Labels
        form_name_label: "姓名 *",
        form_email_label: "电子邮件地址 *",
        form_phone_label: "电话号码（可选）",
        form_language_label: "首选沟通语言",
        form_message_label: "留言 *",
        form_message_placeholder: "请告诉我您的语言学习目标...",
        form_submit_button: "发送消息",
        form_success_message: "感谢您的留言！我会在24小时内回复您。",
        form_error_message: "抱歉，发送消息时出现错误。请重试或直接联系我。",

        // Testimonial quotes
        testimonial_quote_1: "Abdulrahman博士教授商务英语的方法非常有效。他的文化见解和实践练习帮助我在国际谈判中表现出色。",
        testimonial_quote_2: "多亏了Abdulrahman博士的结构化方法，我在雅思考试中获得了7.5分。他的模拟测试和个性化反馈对我的大学申请非常有价值。",
        testimonial_quote_3: "在遇到Abdulrahman博士之前，学习阿拉伯语似乎是不可能的。他耐心的教学风格和文化沉浸方法让这门语言对我来说变得生动起来。",
        testimonial_quote_4: "Abdulrahman博士在多种语言方面的专业知识令人印象深刻。他帮助我提高了国际会议的技术英语水平，取得了巨大成功。",

        // Service prices
        service1_price: "每小时起价40美元",
        service2_price: "每小时起价40美元",
        service3_price: "每小时起价45美元",
        service4_price: "每小时起价55美元",
        service5_price: "每小时起价35美元",
        service6_price: "每小时起价60美元",
        // Contact Info Section Titles
        contact_email_title: "电子邮件",
        contact_whatsapp_title: "WhatsApp",
        contact_phone_title: "电话",
        contact_location_title: "位置",

        // Footer Links
        footer_link_about: "关于我",
        footer_link_services: "服务",
        footer_link_languages: "语言",
        footer_link_contact: "联系",
        footer_link_cv: "下载简历",

        // Footer Tagline
        footer_tagline: "专业语言教育服务 | IELTS官方考官 | 应用语言学博士",
    },
    tr: {
        nav_home: "Ana Sayfa",
        nav_about: "Hakkında",
        nav_services: "Hizmetler",
        nav_languages: "Diller",
        nav_contact: "İletişim",
        hero_title_1: "Uzman Rehberliğiyle",
        hero_title_2: "Dillerde Ustalaş",
        hero_description: "Arapça, İngilizce, Fransızca, Almanca ve Rusça dahil 7+ dilde üniversite düzeyinde dil eğitimi sunan çok dilli eğitim uzmanı.",
        btn_book_session: "Ders Rezervasyonu",
        btn_view_services: "Hizmetleri Görüntüle",
        stat_languages: "Dil",
        stat_students: "Öğrenci",
        stat_experience: "Yıl Deneyim",
        about_title: "Dr. Abdulrahman Hakkında",
        about_subtitle: "Kapsamlı dil eğitimi ve kültürel anlayış yoluyla öğrencileri güçlendirmeye adanmış",
        about_philosophy_title: "Akademik Mükemmellik ve Öğretim Felsefesi",
        about_expertise_title: "Üniversite Düzeyinde Uzmanlık",
        about_expertise_desc: "Çok dilli eğitim ve ikinci dil edinimi uzmanı Uygulamalı Dilbilim Doktorası.",
        about_approach_title: "Bilişsel Öğrenme Yaklaşımı",
        about_approach_desc: "Dil edinimi ve hafızayı hızlandırmak için modern nörolinguistik yöntemler kullanma.",
        about_instruction_title: "Kişiselleştirilmiş Öğretim",
        about_instruction_desc: "Bireysel öğrenme stillerine ve kültürel geçmişlere uyarlanmış özel öğretim yöntemleri.",
        about_credentials_title: "Kimlik Bilgileri ve Başarılar",
        credential_phd: "Uygulamalı Dilbilim Doktorası - Oxford Üniversitesi",
        credential_celta: "CELTA Sertifikalı İngilizce Öğretmeni",
        credential_ielts: "IELTS Resmi Sınav Görevlisi Sertifikası",
        credential_research: "Dil Edinimi Konusunda Yayınlanmış Araştırma",
        credential_lecturer: "Uluslararası Üniversitelerde Misafir Öğretim Görevlisi",
        btn_download_cv: "Tam CV'yi İndir",
        services_title: "Dil Öğrenme Hizmetleri",
        services_subtitle: "Akademik, profesyonel ve kişisel hedeflerinizi karşılamak için tasarlanmış kapsamlı dil programları",
        service1_title: "Ana Dili Olmayan Konuşmacılar için Arapça",
        service1_desc: "Kültürel olarak sürükleyici öğretim yöntemleriyle Modern Standart Arapça ve bölgesel lehçelerde ustalaşın.",
        service1_feature1: "Klasik ve Modern Arapça",
        service1_feature2: "Kültürel Bağlam Entegrasyonu",
        service1_feature3: "İş Arapçası Mevcut",
        service2_title: "IELTS/TOEFL Hazırlığı",
        service2_desc: "Hedef puanlarınızı elde etmek için kanıtlanmış stratejilerle kapsamlı sınav hazırlığı.",
        service2_feature1: "Konuşma ve Yazma Odağı",
        service2_feature2: "Deneme Sınavları ve Geri Bildirim",
        service2_feature3: "Puan Garanti Programı",
        service3_title: "Akademik Yazılım Rehberliği",
        service3_desc: "Akademik yazılım becerilerinizi geliştirmek için profesyonel dil eğitimi.",
        service3_feature1: "Araştırma Yöntemi",
        service3_feature2: "Alıntı ve Referans",
        service3_feature3: "Tez Desteği Mevcut",
        service4_title: "İş Dil Becerileri",
        service4_desc: "Uluslararası iş ve kariyer gelişimi için profesyonel dil eğitimi.",
        service4_feature1: "Sektöre Özel Kelime Dağarcığı",
        service4_feature2: "Sunum Becerileri",
        service4_feature3: "Kültürler Arası İletişim",
        service5_title: "Söyleşme Uygulama Dersleri",
        service5_desc: "Yapılandırılmış söyleşme uygulama dersleri aracılığıyla yabancı dil seviyesi iletişim kurma.",
        service5_feature1: "Gerçek Dünya Senaryoları",
        service5_feature2: "Ses Düzeltme",
        service5_feature3: "Kültürel Ayrıntılar",
        service6_title: "Üniversite Giriş Hazırlığı",
        service6_desc: "Üniversite dil gereksinimleri ve giriş sınavları için kapsamlı hazırlık.",
        service6_feature1: "Üniversite Başvuru Yazısı",
        service6_feature2: "Mülakat Hazırlığı",
        service6_feature3: "Burs Başvuruları",
        price_from: "Saatte 40$'dan başlayan fiyatlarla",
        languages_title: "Öğrettiğim Diller",
        languages_subtitle: "Kültürel uzmanlık ile birden fazla dilde akıcı eğitim",
        contact_title: "İletişime Geçin",
        contact_subtitle: "Dil öğrenme yolculuğunuza başlamaya hazır mısınız? Hedeflerinizi tartışalım ve kişiselleştirilmiş bir öğrenme planı oluşturalım.",
        contact_name: "Ad Soyad",
        contact_email: "E-posta Adresi",
        contact_phone: "Telefon Numarası",
        contact_language: "Tercih Edilen Dil",
        contact_message: "Mesajınız",
        btn_send_message: "Mesaj Gönder",
        footer_links: "Hızlı Bağlantılar",
        footer_about: "Hakkımda",
        footer_services: "Hizmetler",
        footer_languages: "Diller",
        footer_contact: "İletişim",
        footer_download_cv: "CV İndir",
        footer_contact_info: "İletişim",
        footer_rights: "Tüm hakları saklıdır.",
        testimonials_title: "Öğrenci Değerlendirmeleri",
        testimonials_subtitle: "Uzman Rehberliğiyle Dil Öğrenme Amaçlarını Gerçekleştiren Öğrenciler",
        language_arabic: "Arapça",
        language_english: "İngilizce",
        language_french: "Fransızca",
        language_german: "Almanca",
        language_russian: "Rusça",
        language_spanish: "İspanyolca",
        language_italian: "İtalyanca",
        language_turkish: "Türkçe",
        language_native: "Ana Dil",
        language_fluent: "Akıcı",
        language_advanced: "İleri",
        language_intermediate: "Orta",
        contact_form_title: "Mesaj Gönder",
        contact_form_name: "Tam Adı *",
        contact_form_email: "E-posta Adresi *",
        contact_form_phone: "Telefon Numarası (İsteğe Bağlı)",
        contact_form_language: "İletişim İçin Tercih Ettiğiniz Dil",
        contact_form_message: "Mesajınız *",
        contact_form_send_message: "Mesaj Gönder",
        contact_form_success_message: "Mesajınız için teşekkürler! 24 saat içinde size geri döneceğim.",
        contact_form_error_message: "Üzgünüz, mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin veya doğrudan bana ulaşın.",
        contact_info_title: "İletişim Bilgileri",
        contact_info_email: "E-posta",
        contact_info_whatsapp: "WhatsApp",
        contact_info_phone: "Telefon",
        contact_info_location: "Konum",
        contact_location_desc: "Çevrimiçi ve Yüz Yüze Dersler Mevcut",
        office_hours_title: "Ofis Saatleri",
        office_hours_weekdays: "Pazartesi - Cuma",
        office_hours_weekdays_time: "09:00 - 20:00",
        office_hours_saturday: "Cumartesi",
        office_hours_saturday_time: "10:00 - 18:00",
        office_hours_sunday: "Pazar",
        office_hours_sunday_time: "Randevu ile",
        office_hours_note: "* Tüm saatler yerel saat dilimine göredir. Uluslararası öğrenciler tercih ettikleri saat dilimine göre ders planlayabilirler.",
        quick_response_title: "Hızlı Yanıt Garantisi",
        quick_response_desc: "Genellikle tüm sorgularımı 24 saat içinde yanıtlayacağım. Acil durumlar için, lütfen WhatsApp üzerinden bana doğrudan ulaşın.",
        quick_response_time: "Ortalama Yanıt Süresi: 6 Saat",
        footer_about_title: "Dr. Abdulrahman",
        footer_about_desc: "Profesyonel çok dilli eğitmen, öğrencilerin dil öğrenme hedeflerini gerçekleştirmek için kişiselleştirilmiş eğitim ve kanıtlanmış yöntemler aracılığıyla yardımcı olan",
        footer_links_title: "Hızlı Bağlantılar",
        footer_links_about: "Hakkımda",
        footer_links_services: "Hizmetler",
        footer_links_languages: "Diller",
        footer_links_contact: "İletişim",
        footer_links_download_cv: "CV İndir",
        footer_contact_title: "İletişim",
        footer_contact_email: "dr.abdulrahman@example.com",
        footer_contact_phone: "+1 (234) 567-8900",
        footer_contact_location: "Çevrimiçi ve Yüz Yüze Dersler",
        footer_copyright: "© Dr. Abdulrahman Language Tutor. Tüm hakları saklıdır.",
        header_title: "Dr. Abdulrahman",
        proficiency_native: "Ana Dili",
        proficiency_fluent: "Akıcı",
        proficiency_advanced: "İleri Düzey",
        proficiency_intermediate: "Orta Düzey",

        // Testimonial quotes
        testimonial_quote_1: "Dr. Abdulrahman'ın iş İngilizcesi öğretme yaklaşımı dönüştürücü oldu. Kültürel içgörüleri ve pratik alıştırmaları uluslararası müzakerelerde mükemmelleşmeme yardımcı oldu.",
        testimonial_quote_2: "Dr. Abdulrahman'ın yapılandırılmış yaklaşımı sayesinde IELTS'te 7.5 puan aldım. Deneme sınavları ve kişiselleştirilmiş geri bildirimleri üniversite başvurum için paha biçilemezdi.",
        testimonial_quote_3: "Dr. Abdulrahman'ı bulana kadar Arapça öğrenmek imkansız görünüyordu. Sabırlı öğretim tarzı ve kültürel daldırma yöntemleri dili benim için canlandırdı.",
        testimonial_quote_4: "Dr. Abdulrahman'ın birden fazla dildeki uzmanlığı dikkat çekici. Uluslararası konferanslar için teknik İngilizcemi geliştirmemde büyük başarıyla yardımcı oldu.",

        // Service prices
        service1_price: "Saatlik 40$'dan başlayan fiyatlarla",
        service2_price: "Saatlik 40$'dan başlayan fiyatlarla",
        service3_price: "Saatlik 45$'dan başlayan fiyatlarla",
        service4_price: "Saatlik 55$'dan başlayan fiyatlarla",
        service5_price: "Saatlik 35$'dan başlayan fiyatlarla",
        service6_price: "Saatlik 60$'dan başlayan fiyatlarla",
        // Form Labels
        form_name_label: "Ad Soyad *",
        form_email_label: "E-posta Adresi *",
        form_phone_label: "Telefon Numarası (İsteğe Bağlı)",
        form_language_label: "İletişim İçin Tercih Ettiğiniz Dil",
        form_message_label: "Mesajınız *",
        form_message_placeholder: "Dil öğrenme hedeflerinizi paylaşın...",
        form_submit_button: "Mesaj Gönder",
        form_success_message: "Mesajınız için teşekkür ederim! En kısa sürede, 24 saat içinde size dönüş yapacağım.",
        form_error_message: "Üzgünüm, mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz veya benimle doğrudan iletişime geçiniz.",
        // Contact Info Section Titles
        contact_email_title: "E-posta",
        contact_whatsapp_title: "WhatsApp",
        contact_phone_title: "Telefon",
        contact_location_title: "Konum",

        // Footer Links
        footer_link_about: "Hakkımda",
        footer_link_services: "Hizmetler",
        footer_link_languages: "Diller",
        footer_link_contact: "İletişim",
        footer_link_cv: "CV İndir",

        // Footer Tagline
        footer_tagline: "Profesyonel dil eğitim hizmetleri | IELTS Resmi Sınav Görevlisi | Uygulamalı Dilbilim Doktorası",
    },
    fa: {
        nav_home: "خانه",
        nav_about: "درباره",
        nav_services: "خدمات",
        nav_languages: "زبان‌ها",
        nav_contact: "تماس",
        hero_title_1: "با راهنمایی متخصص",
        hero_title_2: "زبان‌ها را بیاموزید",
        hero_description: "متخصص آموزش چندزبانه که آموزش زبان در سطح دانشگاهی را در بیش از 7 زبان از جمله عربی، انگلیسی، فرانسوی، آلمانی و روسی ارائه می‌دهد.",
        btn_book_session: "رزرو جلسه",
        btn_view_services: "مشاهده خدمات",
        stat_languages: "زبان",
        stat_students: "دانشجو",
        stat_experience: "سال تجربه",
        about_title: "درباره دکتر عبدالرحمن",
        about_subtitle: "متعهد به توانمندسازی دانش‌آموزان از طریق آموزش جامع زبان و درک فرهنگی",
        about_philosophy_title: "تعالی آکادمیک و فلسفه تدریس",
        about_expertise_title: "تخصص سطح دانشگاهی",
        about_expertise_desc: "دکتری در زبان‌شناسی کاربردی با تخصص در آموزش چندزبانه و فراگیری زبان دوم.",
        about_approach_title: "رویکرد یادگیری شناختی",
        about_approach_desc: "استفاده از روش‌های نوین عصب‌زبان‌شناسی برای تسریع فراگیری و حفظ زبان.",
        about_instruction_title: "آموزش شخصی‌سازی شده",
        about_instruction_desc: "روش‌های تدریس سفارشی متناسب با سبک‌های یادگیری فردی و پیش‌زمینه‌های فرهنگی.",
        about_credentials_title: "اعتبارات و دستاوردها",
        credential_phd: "دکتری زبان‌شناسی کاربردی - دانشگاه آکسفورد",
        credential_celta: "معلم زبان انگلیسی گواهی‌نامه CELTA",
        credential_ielts: "گواهی‌نامه ممتحن رسمی IELTS",
        credential_research: "تحقیقات منتشر شده در فراگیری زبان",
        credential_lecturer: "مدرس مهمان در دانشگاه‌های بین‌المللی",
        btn_download_cv: "دانلود رزومه کامل",
        services_title: "خدمات یادگیری زبان",
        services_subtitle: "برنامه‌های جامع زبان طراحی شده برای رسیدن به اهداف آکادمیک، حرفه‌ای و شخصی شما",
        service1_title: "عربی برای غیر بومی‌ها",
        service1_desc: "تسلط بر عربی معیار مدرن و گویش‌های منطقه‌ای با روش‌های تدریس غوطه‌ور فرهنگی.",
        service1_feature1: "عربی کلاسیک و مدرن",
        service1_feature2: "ادغام بافت فرهنگی",
        service1_feature3: "عربی تجاری موجود",
        service2_title: "آماده‌سازی IELTS/TOEFL",
        service2_desc: "آماده‌سازی جامع آزمون با استراتژی‌های اثبات شده برای دستیابی به نمرات هدف.",
        service2_feature1: "تمرکز بر گفتار و نوشتار",
        service2_feature2: "آزمون‌های تمرینی و بازخورد",
        service2_feature3: "برنامه تضمین نمره",
        service3_title: "آموزش نوشته آکادمیک",
        service3_desc: "بهبود مهارت نوشته آکادمیک برای اطراف و تحقیقات با استفاده از آموزش حرفه‌ای زبان.",
        service3_feature1: "روش‌های تحقیق",
        service3_feature2: "استناد و مرجع",
        service3_feature3: "پشتیبانی تحقیقات موجود",
        service4_title: "مهارت‌های زبان تجاری",
        service4_desc: "تدریب حرفه‌ای برای تجارت بین‌المللی و پیشرفت شغلی.",
        service4_feature1: "کلمات خصوصی به صنعت",
        service4_feature2: "مهارت‌های ارائه",
        service4_feature3: "ارتباطات میان فرهنگی",
        service5_title: "جلسات آموزش صحبت",
        service5_desc: "ساختار شده آموزش صحبت با سطح خارجی همراه آموزش.",
        service5_feature1: "سناریوهای جهان واقعی",
        service5_feature2: "اصلاح صدا",
        service5_feature3: "تفاوت های فرهنگی",
        service6_title: "آماده‌سازی ورود به دانشگاه",
        service6_desc: "آماده‌سازی جامع برای نیازمندی‌های زبانی دانشگاه و آزمون‌های ورودی",
        service6_feature1: "نگارش مقاله پذیرش دانشگاه",
        service6_feature2: "آماده‌سازی مصاحبه",
        service6_feature3: "درخواست‌های بورسیه",
        price_from: "از ۴۰ دلار در ساعت",
        languages_title: "زبان‌هایی که تدریس می‌کنم",
        languages_subtitle: "آموزش روان در زبان‌های متعدد با تخصص فرهنگی",
        contact_title: "تماس بگیرید",
        contact_subtitle: "آماده شروع سفر یادگیری زبان هستید؟ بیایید اهدافتان را بحث کنیم و برنامه یادگیری شخصی‌سازی شده ایجاد کنیم.",
        contact_name: "نام کامل",
        contact_email: "آدرس ایمیل",
        contact_phone: "شماره تلفن",
        contact_language: "زبان ترجیحی",
        contact_message: "پیام شما",
        btn_send_message: "ارسال پیام",
        footer_links: "پیوندهای سریع",
        footer_about: "درباره من",
        footer_services: "خدمات",
        footer_languages: "زبان‌ها",
        footer_contact: "تماس",
        footer_download_cv: "دانلود رزومه",
        footer_contact_info: "تماس",
        footer_rights: "تمام حقوق محفوظ است.",
        testimonials_title: "شهادات دانشجو",
        testimonials_subtitle: "از راهنمایی خبراء به جهت رسیدن به اهداف یادگیری زبان",
        language_arabic: "عربی",
        language_english: "انگلیسی",
        language_french: "فرانسه",
        language_german: "آلمانی",
        language_russian: "روسی",
        language_spanish: "اسپانیایی",
        language_italian: "ایتالیایی",
        language_turkish: "ترکی",
        language_native: "زبان محلی",
        language_fluent: "آموزش دهنده",
        language_advanced: "پیشرفته",
        language_intermediate: "متوسط",
        contact_form_title: "ارسال پیام",
        contact_form_name: "نام کامل *",
        contact_form_email: "آدرس ایمیل *",
        contact_form_phone: "شماره تلفن (اختیاری)",
        contact_form_language: "زبان مورد توجه برای ارتباط",
        contact_form_message: "پیام *",
        contact_form_send_message: "ارسال پیام",
        contact_form_success_message: "متشکرم از پیام شما! در حدود 24 ساعت در زمان برگشت به شما پاسخ خواهم داد.",
        contact_form_error_message: "متأسفم، خطایی در ارسال پیام به وجود آمد. لطفاً دوباره امتحان کنید و یا به طور مستقیم با من تماس بگیرید توی واتس آب برای کمک آنی.",
        contact_info_title: "اطلاعات ارتباط",
        contact_info_email: "ایمیل",
        contact_info_whatsapp: "واتس آب",
        contact_info_phone: "تلفن",
        contact_info_location: "مکان",
        contact_location_desc: "جلسات آنلاین و حضوری موجود است",
        office_hours_title: "ساعات اداری",
        office_hours_weekdays: "دوشنبه تا پنجشنبه",
        office_hours_weekdays_time: "۹:۰۰ صبح تا ۸:۰۰ شب",
        office_hours_saturday: "جمعه",
        office_hours_saturday_time: "۱۰:۰۰ صبح تا ۶:۰۰ شب",
        office_hours_sunday: "شنبه",
        office_hours_sunday_time: "با هماهنگی قبلی",
        office_hours_note: "* تمام ساعات بر اساس زمان محلی است. دانشجویان بین‌المللی می‌توانند جلسات خود را بر اساس زمان‌های انتخابی خود برنامه‌ریزی کنند.",
        quick_response_title: "امانت پاسخ سریع",
        quick_response_desc: "معمولاً همه سوالات من را در حدود 24 ساعت در زمان برگشت به شما پاسخ می‌دهم. برای موقعیت‌های اضطراری، لطفاً به طور مستقیم با من تماس بگیرید توی واتس آب برای کمک آنی.",
        quick_response_time: "میانگین زمان پاسخ: 6 ساعت",
        footer_about_title: "دکتر عبدالرحمن",
        footer_about_desc: "معلم متعدد اللغات مهربان است که به کمک دانش‌آموزان به جهت رسیدن به اهداف یادگیری زبان از طریق آموزش فردی و روشهای اثبات شده کمک می‌کند.",
        footer_links_title: "پیوندهای سریع",
        footer_links_about: "درباره من",
        footer_links_services: "خدمات",
        footer_links_languages: "زبان‌ها",
        footer_links_contact: "تماس",
        footer_links_download_cv: "دانلود رزومه",
        footer_contact_title: "تماس",
        footer_contact_email: "dr.abdulrahman@example.com",
        footer_contact_phone: "+1 (234) 567-8900",
        footer_contact_location: "جلسات آنلاین و حضوری",
        footer_copyright: "© معلم عبدالرحمن آموزش زبان. تمام حقوق محفوظ است.",
        header_title: "دکتور عبدالرحمن",
        proficiency_native: "زبان مادری",
        proficiency_fluent: "روان",
        proficiency_advanced: "پیشرفته",
        proficiency_intermediate: "متوسط",

        // Testimonial quotes
        testimonial_quote_1: "روش تدریس دکتر عبدالرحمن در آموزش انگلیسی تجاری تحول‌آفرین بود. بینش‌های فرهنگی و تمرین‌های عملی او به من کمک کرد در مذاکرات بین‌المللی موفق شوم.",
        testimonial_quote_2: "با استفاده از روش منظم دکتر عبدالرحمن نمره ۷.۵ در آزمون آیلتس گرفتم. آزمون‌های آزمایشی و بازخوردهای شخصی او برای پذیرش در دانشگاه بی‌نهایت مفید بودند.",
        testimonial_quote_3: "یادگیری زبان عربی غیرممکن به نظر می‌رسید تا اینکه با دکتر عبدالرحمن آشنا شدم. شیوه صبورانه تدریس او و روش‌های غوطه‌وری فرهنگی‌اش زبان را برایم زنده کرد.",
        testimonial_quote_4: "تخصص دکتر عبدالرحمن در چند زبان فوق‌العاده است. او به من کمک کرد تا زبان انگلیسی فنی‌ام را برای کنفرانس‌های بین‌المللی به‌طور مؤثری بهبود بخشم.",

        // Service prices
        service1_price: "از ۴۰ دلار در ساعت",
        service2_price: "از ۴۰ دلار در ساعت",
        service3_price: "از ۴۵ دلار در ساعت",
        service4_price: "از ۵۵ دلار در ساعت",
        service5_price: "از ۳۵ دلار در ساعت",
        service6_price: "از ۶۰ دلار در ساعت",

        // Form Labels
        form_name_label: "نام و نام خانوادگی *",
        form_email_label: "پست الکترونیکی *",
        form_phone_label: "شماره تماس (اختیاری)",
        form_language_label: "زبان مورد نظر برای مکاتبه",
        form_message_label: "پیام *",
        form_message_placeholder: "اهداف خود را در یادگیری زبان با من در میان بگذارید...",
        form_submit_button: "ارسال پیام",
        form_success_message: "از پیام شما سپاسگزارم! حداکثر ظرف ۲۴ ساعت به شما پاسخ خواهم داد.",
        form_error_message: "متأسفانه در ارسال پیام شما مشکلی پیش آمد. خواهشمند است مجدداً تلاش فرمایید یا مستقیماً با اینجانب تماس حاصل نمایید.",
        // Contact Info Section Titles
        contact_email_title: "ایمیل",
        contact_whatsapp_title: "واتس آب",
        contact_phone_title: "تلفن",
        contact_location_title: "مکان",

        // Footer Links
        footer_link_about: "درباره من",
        footer_link_services: "خدمات",
        footer_link_languages: "زبان‌ها",
        footer_link_contact: "تماس",
        footer_link_cv: "دانلود رزومه",

        // Footer Tagline
        footer_tagline: "خدمات آموزش حرفه‌ای زبان | ممتحن رسمی IELTS | دکترای زبان‌شناسی کاربردی",
    },
    ru: {
        nav_home: "Главная",
        nav_about: "О нас",
        nav_services: "Услуги",
        nav_languages: "Языки",
        nav_contact: "Контакты",
        hero_title_1: "Изучайте языки с",
        hero_title_2: "Экспертным руководством",
        hero_description: "Специалист по многоязычному образованию, предлагающий языковое обучение университетского уровня на 7+ языках, включая арабский, английский, французский, немецкий и русский.",
        btn_book_session: "Записаться на урок",
        btn_view_services: "Посмотреть услуги",
        stat_languages: "Языков",
        stat_students: "Студентов",
        stat_experience: "Лет опыта",
        about_title: "О докторе Абдулрахмане",
        about_subtitle: "Посвящен расширению возможностей студентов через комплексное языковое образование и культурное понимание",
        about_philosophy_title: "Академическое превосходство и философия преподавания",
        about_expertise_title: "Экспертиза университетского уровня",
        about_expertise_desc: "Доктор прикладной лингвистики со специализацией в многоязычном образовании и изучении второго языка.",
        about_approach_title: "Когнитивный подход к обучению",
        about_approach_desc: "Использование современных нейролингвистических методов для ускорения изучения и запоминания языка.",
        about_instruction_title: "Персонализированное обучение",
        about_instruction_desc: "Индивидуальные методы обучения, адаптированные к личным стилям обучения и культурным особенностям.",
        about_credentials_title: "Квалификация и достижения",
        credential_phd: "Доктор прикладной лингвистики - Оксфордский университет",
        credential_celta: "Сертифицированный преподаватель английского языка CELTA",
        credential_ielts: "Сертификация официального экзаменатора IELTS",
        credential_research: "Опубликованные исследования в области изучения языков",
        credential_lecturer: "Приглашенный лектор в международных университетах",
        btn_download_cv: "Скачать полное резюме",
        services_title: "Услуги изучения языков",
        services_subtitle: "Комплексные языковые программы, разработанные для достижения ваших академических, профессиональных и личных целей",
        service1_title: "Арабский для неносителей языка",
        service1_desc: "Овладейте современным стандартным арабским и региональными диалектами с помощью культурно-погружающих методов обучения.",
        service1_feature1: "Классический и современный арабский",
        service1_feature2: "Интеграция культурного контекста",
        service1_feature3: "Доступен деловой арабский",
        service2_title: "Подготовка к IELTS/TOEFL",
        service2_desc: "Комплексная подготовка к экзаменам с проверенными стратегиями для достижения целевых баллов.",
        service2_feature1: "Фокус на говорении и письме",
        service2_feature2: "Пробные тесты и обратная связь",
        service2_feature3: "Программа гарантии баллов",
        service3_title: "Академическое письмо",
        service3_desc: "Повышение академических навыков письма для эссе, диссертаций и исследовательских работ.",
        service3_feature1: "Методология исследования",
        service3_feature2: "Цитирование и ссылка",
        service3_feature3: "Доступная поддержка диссертации",
        service4_title: "Бизнес-языковые навыки",
        service4_desc: "Профессиональное языковое обучение для международного бизнеса и карьерного роста.",
        service4_feature1: "Отраслевая лексика",
        service4_feature2: "Навыки презентации",
        service4_feature3: "Межкультурное общение",
        service5_title: "Сессии практики общения",
        service5_desc: "Структурированные сессии практики общения для достижения уровня родного языка.",
        service5_feature1: "Реальные сценарии",
        service5_feature2: "Исправление произношения",
        service5_feature3: "Культурные тонкости",
        service6_title: "Подготовка к поступлению в университет",
        service6_desc: "Полное обучение для языковых требований университета и вступительных экзаменов.",
        service6_feature1: "Написание эссе для поступления в университет",
        service6_feature2: "Подготовка к собеседованию",
        service6_feature3: "Заявка на стипендию",
        price_from: "От $40/час",
        languages_title: "Языки, которые я преподаю",
        languages_subtitle: "Свободное обучение на нескольких языках с культурной экспертизой",
        contact_title: "Свяжитесь с нами",
        contact_subtitle: "Готовы начать свое путешествие в изучении языка? Давайте обсудим ваши цели и создадим персонализированный план обучения.",
        contact_name: "Полное имя",
        contact_email: "Адрес электронной почты",
        contact_phone: "Номер телефона",
        contact_language: "Предпочитаемый язык",
        contact_message: "Ваше сообщение",
        btn_send_message: "Отправить сообщение",
        footer_links: "Быстрые ссылки",
        footer_about: "Обо мне",
        footer_services: "Услуги",
        footer_languages: "Языки",
        footer_contact: "Контакты",
        footer_download_cv: "Скачать резюме",
        footer_contact_info: "Контакты",
        footer_rights: "Все права защищены.",
        testimonials_title: "Студенческие отзывы",
        testimonials_subtitle: "Студенты, которые достигли своих целей в изучении языка с экспертным руководством",
        language_arabic: "Арабский",
        language_english: "Английский",
        language_french: "Французский",
        language_german: "Немецкий",
        language_russian: "Русский",
        language_spanish: "Испанский",
        language_italian: "Итальянский",
        language_turkish: "Турецкий",
        language_native: "Родной",
        language_fluent: "Уверенный",
        language_advanced: "Продвинутый",
        language_intermediate: "Средний",
        contact_form_title: "Отправить сообщение",
        contact_form_name: "Полное имя *",
        contact_form_email: "Электронная почта *",
        contact_form_phone: "Номер телефона (Необязательно)",
        contact_form_language: "Предпочитаемый язык для общения",
        contact_form_message: "Сообщение *",
        contact_form_send_message: "Отправить сообщение",
        contact_form_success_message: "Спасибо за ваше сообщение! Я отвечу вам в течение 24 часов.",
        contact_form_error_message: "Извините, произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз или свяжитесь со мной напрямую.",
        contact_info_title: "Контактная информация",
        contact_info_email: "Электронная почта",
        contact_info_whatsapp: "WhatsApp",
        contact_info_phone: "Телефон",
        contact_info_location: "Местоположение",
        contact_location_desc: "Доступны онлайн и очные занятия",
        office_hours_title: "Часы работы",
        office_hours_weekdays: "Понедельник - Пятница",
        office_hours_weekdays_time: "09:00 - 20:00",
        office_hours_saturday: "Суббота",
        office_hours_saturday_time: "10:00 - 18:00",
        office_hours_sunday: "Воскресенье",
        office_hours_sunday_time: "По предварительной записи",
        office_hours_note: "* Все время указано по местному времени. Международные студенты могут планировать занятия в соответствии с их предпочтительным расписанием.",
        quick_response_title: "Гарантия быстрого ответа",
        quick_response_desc: "Я обычно отвечаю на все запросы в течение 24 часов. Для срочных вопросов, пожалуйста, свяжитесь со мной напрямую через WhatsApp для немедленной помощи.",
        quick_response_time: "Среднее время ответа: 6 часов",
        footer_about_title: "Д-р Абдулрахман",
        footer_about_desc: "Профессиональный многоязычный учитель, посвященный помощи студентам в достижении их целей в изучении языка через персонализированное обучение и проверенные методы.",
        footer_links_title: "Быстрые ссылки",
        footer_links_about: "Обо мне",
        footer_links_services: "Услуги",
        footer_links_languages: "Языки",
        footer_links_contact: "Контакты",
        footer_links_download_cv: "Скачать резюме",
        footer_contact_title: "Контакты",
        footer_contact_email: "dr.abdulrahman@example.com",
        footer_contact_phone: "+1 (234) 567-8900",
        footer_contact_location: "Онлайн и личное обучение",
        footer_copyright: "© Д-р Абдулрахман Языковый Репетитор. Все права защищены.",
        header_title: "Д-р Абдулрахман",

        // Testimonial quotes
        testimonial_quote_1: "Методика преподавания делового английского у доктора Абдуррахмана была по-настоящему преобразующей. Его культурные инсайты и практические упражнения помогли мне преуспеть в международных переговорах.",
        testimonial_quote_2: "Благодаря структурированному подходу доктора Абдуррахмана я получил 7.5 баллов на IELTS. Его пробные тесты и персональные замечания были незаменимы для поступления в университет.",
        testimonial_quote_3: "Изучение арабского языка казалось невозможным, пока я не встретил доктора Абдуррахмана. Его терпеливый стиль преподавания и методы культурного погружения оживили язык для меня.",
        testimonial_quote_4: "Экспертиза доктора Абдуррахмана в области нескольких языков впечатляет. Он помог мне значительно улучшить технический английский для международных конференций.",

        // Service prices
        service1_price: "от 40 долларов/час",
        service2_price: "от 40 долларов/час",
        service3_price: "от 45 долларов/час",
        service4_price: "от 55 долларов/час",
        service5_price: "от 35 долларов/час",
        service6_price: "от 60 долларов/час",

        // Form Labels
        form_name_label: "Фамилия и имя *",
        form_email_label: "Электронная почта *",
        form_phone_label: "Номер телефона (по желанию)",
        form_language_label: "Предпочитаемый язык для общения",
        form_message_label: "Ваше сообщение *",
        form_message_placeholder: "Расскажите, пожалуйста, о ваших целях в изучении языка...",
        form_submit_button: "Отправить сообщение",
        form_success_message: "Благодарю за ваше сообщение! Я свяжусь с вами в течение 24 часов.",
        form_error_message: "К сожалению, при отправке сообщения произошла ошибка. Пожалуйста, попробуйте отправить сообщение повторно или свяжитесь со мной напрямую.",
        proficiency_native: "Родной язык",
        proficiency_fluent: "Свободное владение",
        proficiency_advanced: "Продвинутый уровень",
        proficiency_intermediate: "Средний уровень",

        // Contact Info Section Titles
        contact_email_title: "Электронная почта",
        contact_whatsapp_title: "WhatsApp",
        contact_phone_title: "Телефон",
        contact_location_title: "Местоположение",

        // Footer Links
        footer_link_about: "Обо мне",
        footer_link_services: "Услуги",
        footer_link_languages: "Языки",
        footer_link_contact: "Контакты",
        footer_link_cv: "Скачать резюме",

        // Footer Tagline
        footer_tagline: "Профессиональные услуги языкового образования | Официальный экзаменатор IELTS | Доктор прикладной лингвистики",
    }
};

const languageConfig = {
    en: { flag: "🇺🇸", name: "English", dir: "ltr", class: "" },
    ar: { flag: "🇸🇦", name: "العربية", dir: "rtl", class: "lang-ar" },
    zh: { flag: "🇨🇳", name: "中文", dir: "ltr", class: "lang-zh" },
    tr: { flag: "🇹🇷", name: "Türkçe", dir: "ltr", class: "" },
    fa: { flag: "🇮🇷", name: "فارسی", dir: "rtl", class: "lang-fa" },
    ru: { flag: "🇷🇺", name: "Русский", dir: "ltr", class: "" }
};

let currentLanguage = localStorage.getItem('language') || 'en';

// Language switching functionality
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Update text content
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update document direction and class
    const config = languageConfig[lang];
    document.documentElement.dir = config.dir;
    document.body.className = document.body.className.replace(/lang-\w+/g, '');
    if (config.class) {
        document.body.classList.add(config.class);
    }

    // Update icon margins for RTL languages
    const iconContainers = document.querySelectorAll('.flex.items-center[dir="ltr"]');
    iconContainers.forEach(container => {
        const icon = container.querySelector('i');
        if (icon) {
            if (config.dir === 'rtl') {
                icon.classList.remove('mr-2.5');
                icon.classList.add('ml-2.5');
            } else {
                icon.classList.remove('ml-2.5');
                icon.classList.add('mr-2.5');
            }
        }
    });

    // Update language selector displays
    updateLanguageDisplay();
}

function updateLanguageDisplay() {
    const config = languageConfig[currentLanguage];

    // Desktop
    document.getElementById('current-flag').textContent = config.flag;
    document.getElementById('current-lang').textContent = currentLanguage.toUpperCase();

    // Mobile
    document.getElementById('mobile-current-flag').textContent = config.flag;
    document.getElementById('mobile-current-lang').textContent = config.name;
}

// Language dropdown functionality
const languageBtn = document.getElementById('language-btn');
const languageDropdown = document.getElementById('language-dropdown');
const mobileLanguageBtn = document.getElementById('mobile-language-btn');
const mobileLanguageDropdown = document.getElementById('mobile-language-dropdown');
const mobileChevron = mobileLanguageBtn.querySelector('.fa-chevron-down');

// Function to show dropdown with animation
function showDropdown(dropdown) {
    dropdown.classList.remove('hidden');
    // Trigger reflow
    dropdown.offsetHeight;
    dropdown.classList.remove('opacity-0', 'scale-95');
    dropdown.classList.add('opacity-100', 'scale-100');
}

// Function to hide dropdown with animation
function hideDropdown(dropdown) {
    dropdown.classList.remove('opacity-100', 'scale-100');
    dropdown.classList.add('opacity-0', 'scale-95');
    // Wait for animation to complete before hiding
    setTimeout(() => {
        dropdown.classList.add('hidden');
    }, 200);
}

// Desktop language dropdown
languageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (languageDropdown.classList.contains('hidden')) {
        showDropdown(languageDropdown);
    } else {
        hideDropdown(languageDropdown);
    }
});

// Mobile language dropdown
mobileLanguageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (mobileLanguageDropdown.classList.contains('hidden')) {
        showDropdown(mobileLanguageDropdown);
        mobileChevron.style.transform = 'rotate(180deg)';
    } else {
        hideDropdown(mobileLanguageDropdown);
        mobileChevron.style.transform = 'rotate(0deg)';
    }
});

// Language option selection
document.querySelectorAll('.language-option, .mobile-language-option').forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        switchLanguage(lang);
        hideDropdown(languageDropdown);
        hideDropdown(mobileLanguageDropdown);
        mobileChevron.style.transform = 'rotate(0deg)';
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    hideDropdown(languageDropdown);
    hideDropdown(mobileLanguageDropdown);
    mobileChevron.style.transform = 'rotate(0deg)';
});

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    switchLanguage(currentLanguage);
});

// Dark Mode functionality (Updated to handle multiple buttons)
const darkModeToggleButtons = document.querySelectorAll('.dark-mode-toggle');
const darkModeIcons = document.querySelectorAll('.dark-mode-icon');
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkMode();
}

function updateDarkMode() {
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        darkModeIcons.forEach(icon => {
            icon.className = 'fas fa-sun text-gray-700 dark:text-gray-300 dark-mode-icon';
        });
    } else {
        document.documentElement.classList.remove('dark');
        darkModeIcons.forEach(icon => {
            icon.className = 'fas fa-moon text-gray-700 dark:text-gray-300 dark-mode-icon';
        });
    }
}

// Add event listeners to all dark mode toggle buttons
darkModeToggleButtons.forEach(button => {
    button.addEventListener('click', toggleDarkMode);
});

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', () => {
    updateDarkMode();
});

// Testimonials Carousel functionality
const testimonialsContainer = document.getElementById('testimonials-container');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
let currentTestimonial = 0;

function scrollToTestimonial(index) {
    const cardWidth = 320; // 80 * 4 (w-80 = 20rem = 320px)
    const scrollAmount = index * (cardWidth + 24); // 24px for gap
    testimonialsContainer.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

prevBtn.addEventListener('click', () => {
    currentTestimonial = Math.max(0, currentTestimonial - 1);
    scrollToTestimonial(currentTestimonial);
});

nextBtn.addEventListener('click', () => {
    const maxTestimonials = testimonialsContainer.children.length - 1;
    currentTestimonial = Math.min(maxTestimonials, currentTestimonial + 1);
    scrollToTestimonial(currentTestimonial);
});

// Auto-scroll testimonials every 5 seconds
setInterval(() => {
    const maxTestimonials = testimonialsContainer.children.length - 1;
    currentTestimonial = currentTestimonial >= maxTestimonials ? 0 : currentTestimonial + 1;
    scrollToTestimonial(currentTestimonial);
}, 5000);


// 🚀 HAMZAH AHMED - DEVELOPER SIGNATURE 🚀
// Add this to your projects for that clean developer flex

(function() {
    const colors = {
        primary: '\x1b[36m',    // Cyan
        secondary: '\x1b[95m',  // Bright Magenta
        accent: '\x1b[93m',     // Bright Yellow
        success: '\x1b[92m',    // Bright Green
        text: '\x1b[97m',       // Bright White
        reset: '\x1b[0m',
        bold: '\x1b[1m',
        dim: '\x1b[2m'
    };

    // Cool ASCII signature
    function showSignature() {
        console.log('\n' + colors.primary + colors.bold + '╔═══════════════════════════════════════════════════════════╗' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.text + '                 🎯 CRAFTED WITH CODE 🎯                  ' + colors.primary + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '╠═══════════════════════════════════════════════════════════╣' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.reset + '                                                           ' + colors.primary + colors.bold + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.secondary + colors.bold + '    ██╗  ██╗ █████╗ ███╗   ███╗███████╗ █████╗ ██╗  ██╗    ' + colors.primary + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.secondary + colors.bold + '    ██║  ██║██╔══██╗████╗ ████║╚══███╔╝██╔══██╗██║  ██║    ' + colors.primary + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.secondary + colors.bold + '    ███████║███████║██╔████╔██║  ███╔╝ ███████║███████║    ' + colors.primary + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.secondary + colors.bold + '    ██╔══██║██╔══██║██║╚██╔╝██║ ███╔╝  ██╔══██║██╔══██║    ' + colors.primary + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.secondary + colors.bold + '    ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗██║  ██║██║  ██║    ' + colors.primary + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.secondary + colors.bold + '    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝    ' + colors.primary + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.reset + '                                                           ' + colors.primary + colors.bold + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.accent + colors.bold + '               Hamzah AHMED - Full Stack Dev               ' + colors.primary + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.reset + '                                                           ' + colors.primary + colors.bold + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '╠═══════════════════════════════════════════════════════════╣' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.text + '  🔗 Connect with me:                                     ' + colors.primary + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.success + '     💼 Portfolio: ' + colors.text + 'hamzah.dev                             ' + colors.primary + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.success + '     📧 Email: ' + colors.text + 'hello@hamzah.dev                           ' + colors.primary + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.success + '     🐙 GitHub: ' + colors.text + 'github.com/hamzahdev                      ' + colors.primary + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.success + '     💼 LinkedIn: ' + colors.text + 'linkedin.com/in/hamzahdev               ' + colors.primary + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.reset + '                                                           ' + colors.primary + colors.bold + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.dim + colors.text + '  "Building digital experiences, one line at a time"       ' + colors.primary + colors.bold + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '║' + colors.accent + '                    Made with ❤️ and ☕                   ' + colors.primary + '║' + colors.reset);
        console.log(colors.primary + colors.bold + '╚═══════════════════════════════════════════════════════════╝' + colors.reset);
        console.log('\n');
    }

    // Minimal signature for smaller spaces
    function showMiniSignature() {
        console.log('\n' + colors.primary + '─'.repeat(50) + colors.reset);
        console.log(colors.secondary + colors.bold + '🚀 Hamzah Ahmed' + colors.reset + colors.text + ' | Full Stack Developer' + colors.reset);
        console.log(colors.success + '💼 hamzah.dev' + colors.text + ' | ' + colors.success + '🐙 github.com/hamzahdev' + colors.reset);
        console.log(colors.accent + '"Code with purpose, build with passion"' + colors.reset);
        console.log(colors.primary + '─'.repeat(50) + colors.reset + '\n');
    }

    // One-liner signature
    function showOneLiner() {
        console.log(colors.secondary + colors.bold + '🎯 Hamzah Ahmed' + colors.reset + colors.text + ' • Full Stack Dev • ' + colors.success + 'hamzah.dev' + colors.text + ' • Made with ❤️' + colors.reset);
    }

    // Animated typing signature
    function showTypingSignature() {
        const messages = [
            colors.primary + colors.bold + '> Initializing developer signature...' + colors.reset,
            colors.success + '> Loading Hamzah Ahmed profile...' + colors.reset,
            colors.accent + '> Full Stack Developer detected!' + colors.reset,
            colors.secondary + '> Portfolio: hamzah.dev' + colors.reset,
            colors.text + '> Status: Available for awesome projects! 🚀' + colors.reset
        ];

        messages.forEach((msg, index) => {
            setTimeout(() => {
                console.log(msg);
                if (index === messages.length - 1) {
                    setTimeout(() => {
                        console.log(colors.primary + '─'.repeat(40) + colors.reset);
                        console.log(colors.secondary + colors.bold + '🎯 Ready to build something amazing?' + colors.reset);
                        console.log(colors.primary + '─'.repeat(40) + colors.reset + '\n');
                    }, 500);
                }
            }, index * 800);
        });
    }

    // Usage Guide
    function showUsageGuide() {
        console.log('\n' + colors.accent + colors.bold + ' SIGNATURE COMMANDS:' + colors.reset);
        console.log(colors.secondary + '  hamzahSignature()' + colors.text + ' - Full ASCII art version' + colors.reset);
        console.log(colors.secondary + '  hamzahMini()' + colors.text + '      - Compact professional version' + colors.reset);
        console.log(colors.secondary + '  hamzahOne()' + colors.text + '       - Quick one-liner' + colors.reset);
        console.log(colors.secondary + '  hamzahTyping()' + colors.text + '    - Animated typing effect' + colors.reset);
    }

    // Make functions globally available
    window.hamzahSignature = showSignature;
    window.hamzahMini = showMiniSignature;
    window.hamzahOne = showOneLiner;
    window.hamzahTyping = showTypingSignature;

    // Auto-show signature and then the usage guide
    setTimeout(() => {
        showSignature();
        showUsageGuide();
    }, 500);

})();

// 🎯 USAGE:
// hamzahSignature() - Full ASCII signature
// hamzahMini() - Compact version
// hamzahOne() - One-liner version  
// hamzahTyping() - Animated typing effect
//