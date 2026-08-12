/* =========================================================
   ISSHAK.DEV - MAIN JAVASCRIPT
   Burger Menu
   Smooth Scroll
   Skill Bars
   Contact Form Validation
   Dark / Light Mode
   English / French / Arabic
   ========================================================= */


/* =========================================================
   MAIN INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     1. BURGER MENU
     ======================================================= */

  const nav = document.querySelector(".navbar nav ul");

  if (nav) {

    let burger = document.querySelector(".navbar .burger-menu");

    // Create burger if it doesn't already exist
    if (!burger) {
      burger = document.createElement("div");

      burger.classList.add("burger-menu");

      burger.setAttribute("role", "button");
      burger.setAttribute("tabindex", "0");
      burger.setAttribute("aria-label", "Toggle navigation");

      burger.innerHTML =
        '<i class="fas fa-bars" aria-hidden="true"></i>';

      document
        .querySelector(".navbar")
        .insertBefore(burger, nav);
    }


    // Burger icon
    const setBurgerIcon = (isOpen) => {

      burger.innerHTML = isOpen
        ? '<i class="fas fa-times" aria-hidden="true"></i>'
        : '<i class="fas fa-bars" aria-hidden="true"></i>';

    };


    // Open / close navigation
    const toggleNav = () => {

      nav.classList.toggle("show");

      burger.classList.toggle("active");

      setBurgerIcon(
        burger.classList.contains("active")
      );

    };


    // Mouse click
    burger.addEventListener("click", toggleNav);


    // Keyboard accessibility
    burger.addEventListener("keydown", (e) => {

      if (e.key === "Enter" || e.key === " ") {

        e.preventDefault();

        toggleNav();

      }

    });


    // Close mobile menu on desktop
    const MOBILE_BREAKPOINT = 768;

    const handleResize = () => {

      if (window.innerWidth > MOBILE_BREAKPOINT) {

        nav.classList.remove("show");

        burger.classList.remove("active");

        setBurgerIcon(false);

      }

    };

    window.addEventListener("resize", handleResize);

    handleResize();

  }


  /* =======================================================
     2. NAVBAR SCROLL EFFECT
     ======================================================= */

  const navbar = document.querySelector(".navbar");

  if (navbar) {

    const handleScroll = () => {

      if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

      } else {

        navbar.classList.remove("scrolled");

      }

    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

  }


  /* =======================================================
     3. SKILL BARS ANIMATION
     ======================================================= */

  const skillBars =
    document.querySelectorAll(".skill-bar");


  if (skillBars.length) {

    const options = {
      threshold: 0.4
    };


    const animateBars = (entry) => {

      if (entry.isIntersecting) {

        entry.target.style.width =
          entry.target.dataset.skill;

      }

    };


    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(animateBars);

        },
        options
      );


    skillBars.forEach((bar) => {

      bar.style.width = "0";

      observer.observe(bar);

    });

  }


  /* =======================================================
     4. SMOOTH SCROLL
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {

      anchor.addEventListener("click", function (e) {

        const target =
          document.querySelector(
            this.getAttribute("href")
          );

        if (!target) return;

        e.preventDefault();

        window.scrollTo({

          top: target.offsetTop - 70,

          behavior: "smooth"

        });


        // Close mobile menu after clicking a link
        const mobileNav =
          document.querySelector(".navbar nav ul");

        const mobileBurger =
          document.querySelector(
            ".navbar .burger-menu"
          );

        if (window.innerWidth <= 768) {

          if (mobileNav) {
            mobileNav.classList.remove("show");
          }

          if (mobileBurger) {

            mobileBurger.classList.remove("active");

            mobileBurger.innerHTML =
              '<i class="fas fa-bars" aria-hidden="true"></i>';

          }

        }

      });

    });


  /* =======================================================
     5. DARK / LIGHT MODE
     ======================================================= */

  const themeToggle =
    document.getElementById("theme-toggle");


  if (themeToggle) {

    const savedTheme =
      localStorage.getItem("theme");


    // Restore saved theme
    if (savedTheme === "light") {

      document.body.classList.add("light-mode");

    }


    // Toggle theme
    themeToggle.addEventListener("click", () => {

      document.body.classList.toggle(
        "light-mode"
      );


      if (
        document.body.classList.contains(
          "light-mode"
        )
      ) {

        localStorage.setItem(
          "theme",
          "light"
        );

      } else {

        localStorage.setItem(
          "theme",
          "dark"
        );

      }

    });

  }


  /* =======================================================
     6. CONTACT FORM VALIDATION
     ======================================================= */

  const form =
    document.querySelector(".contact-form");


  if (form) {

    const nameInput =
      form.querySelector(
        'input[type="text"]'
      );

    const emailInput =
      form.querySelector(
        'input[type="email"]'
      );

    const messageInput =
      form.querySelector("textarea");


    const submitBtn =
      form.querySelector(
        'button[type="submit"]'
      ) ||
      form.querySelector("button");


    /* -----------------------------------------------------
       Error message element
       ----------------------------------------------------- */

    const ensureErrorEl = (input) => {

      let el =
        input.nextElementSibling;


      if (
        !el ||
        !el.classList ||
        !el.classList.contains(
          "error-message"
        )
      ) {

        el =
          document.createElement("div");

        el.className =
          "error-message";

        input.parentNode.insertBefore(
          el,
          input.nextSibling
        );

      }

      return el;

    };


    /* -----------------------------------------------------
       Show error
       ----------------------------------------------------- */

    const showError = (
      input,
      message
    ) => {

      input.classList.add("invalid");

      input.classList.remove("valid");

      const error =
        ensureErrorEl(input);

      error.textContent = message;

      error.setAttribute(
        "role",
        "alert"
      );

    };


    /* -----------------------------------------------------
       Show valid
       ----------------------------------------------------- */

    const showValid = (input) => {

      input.classList.remove(
        "invalid"
      );

      input.classList.add(
        "valid"
      );

      const error =
        ensureErrorEl(input);

      error.textContent = "";

      error.removeAttribute(
        "role"
      );

    };


    /* -----------------------------------------------------
       Validation
       ----------------------------------------------------- */

    const validators = {

      name: () => {

        if (!nameInput) return true;

        const value =
          nameInput.value.trim();


        if (value.length < 2) {

          showError(
            nameInput,
            translations[
              currentLanguage
            ].nameError
          );

          return false;

        }

        showValid(nameInput);

        return true;

      },


      email: () => {

        if (!emailInput) return true;

        const value =
          emailInput.value.trim();


        const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(value)) {

          showError(
            emailInput,
            translations[
              currentLanguage
            ].emailError
          );

          return false;

        }

        showValid(emailInput);

        return true;

      },


      message: () => {

        if (!messageInput) return true;

        const value =
          messageInput.value.trim();


        if (value.length < 10) {

          showError(
            messageInput,
            translations[
              currentLanguage
            ].messageError
          );

          return false;

        }

        showValid(messageInput);

        return true;

      }

    };


    /* -----------------------------------------------------
       Validate while typing
       ----------------------------------------------------- */

    [
      nameInput,
      emailInput,
      messageInput
    ].forEach((input) => {

      if (!input) return;


      input.addEventListener(
        "input",
        () => {

          if (input === nameInput) {
            validators.name();
          }

          if (input === emailInput) {
            validators.email();
          }

          if (input === messageInput) {
            validators.message();
          }

        }
      );


      input.addEventListener(
        "blur",
        () => {

          if (input === nameInput) {
            validators.name();
          }

          if (input === emailInput) {
            validators.email();
          }

          if (input === messageInput) {
            validators.message();
          }

        }
      );

    });


    /* -----------------------------------------------------
       Submit
       ----------------------------------------------------- */

    form.addEventListener(
      "submit",
      (e) => {

        e.preventDefault();


        const valid = [

          validators.name(),

          validators.email(),

          validators.message()

        ].every(Boolean);


        if (!valid) {

          const firstInvalid =
            form.querySelector(
              ".invalid"
            );

          if (firstInvalid) {

            firstInvalid.focus();

          }

          return;

        }


        if (submitBtn) {

          submitBtn.disabled = true;


          const originalText =
            submitBtn.textContent;


          submitBtn.textContent =
            translations[
              currentLanguage
            ].sending;


          setTimeout(() => {

            form.reset();


            form
              .querySelectorAll(
                ".error-message"
              )
              .forEach(
                (el) =>
                  el.textContent = ""
              );


            form
              .querySelectorAll(
                "input, textarea"
              )
              .forEach(
                (input) =>
                  input.classList.remove(
                    "valid",
                    "invalid"
                  )
              );


            submitBtn.textContent =
              translations[
                currentLanguage
              ].messageSent;


            setTimeout(() => {

              submitBtn.textContent =
                originalText;

              submitBtn.disabled =
                false;

            }, 2200);

          }, 900);

        }

      }
    );

  }


  /* =======================================================
     7. MULTILINGUAL SYSTEM
     ======================================================= */


  const translations = {

    /* =====================================================
       ENGLISH
       ===================================================== */

    en: {

      viewLiveSite: "View Live Site",

      pageTitle:
        "Isshak Renane | Web Developer & Designer",

      home: "Home",
      about: "About",
      skills: "Skills",
      services: "Services",
      projects: "Projects",
      resume: "Resume",
      contact: "Contact",

      heroTitle:
        "Web Developer, Designer & IT Professional",

      heroText:
        "Crafting engaging digital experiences and providing robust IT solutions.",

      heroButton:
        "View My Work",


      aboutTitle:
        "About Me",

      aboutP1:
        "Hello! I'm Isshak Renane, a passionate web developer and designer with a keen eye for aesthetics and functionality. With a background in IT services, I bring a holistic approach to building digital solutions, ensuring they are not only visually appealing but also secure, efficient, and user-friendly.",

      aboutP2:
        "My journey in the digital realm started with a fascination for how websites are built, leading me to master HTML, CSS, JAVASCRIPT and modern web development practices. I love solving problems and creating intuitive interfaces that enhance user experience. When I'm not coding, I'm often exploring new design trends or diving deep into network security.",

      aboutP3:
        "Let's connect and build something amazing together!",


      skillsTitle:
        "Skills",

      technicalSkills:
        "Technical Skills",

      designTools:
        "Design & Tools",


      servicesTitle:
        "Services",

      webDevelopment:
        "Web Development",

      webDevelopmentText:
        "Building responsive and dynamic websites using modern web technologies.",

      webDesign:
        "Web Design",

      webDesignText:
        "Creating intuitive and visually stunning user interfaces and experiences.",

      itConsulting:
        "IT Consulting",

      itConsultingText:
        "Providing expert advice and solutions for your IT infrastructure and security needs.",

      responsiveDesign:
        "Responsive Design",

      responsiveDesignText:
        "Ensuring your website looks and functions perfectly on all devices.",

      cybersecurity:
        "Cybersecurity Audits",

      cybersecurityText:
        "Assessing and enhancing the security posture of your digital assets.",

      cloudSolutions:
        "Cloud Solutions",

      cloudSolutionsText:
        "Implementing and managing scalable cloud services for your business.",


      projectsTitle:
        "Projects",

      weatherProject:
        "Interactive Weather App",

      weatherProjectText:
        "A dynamic web application built with HTML, CSS, and JavaScript that fetches real-time weather data for any city.",

      artistProject:
        "Creative Artist Landing Page",

      artistProjectText:
        "Conceptualized and designed a sleek artist portfolio interface using Figma, focusing on clarity and artistic presentation.",

      ecommerceProject:
        "E-commerce Product Page",

      ecommerceProjectText:
        "Conceptual design for an intuitive and visually appealing e-commerce product detail page, prioritizing user journey.",

      photographyProject:
        "Richard Gleed Photography Portfolio",

      photographyProjectText:
        "A sleek and modern photography portfolio designed to highlight visual storytelling through elegant layouts, dark tones, and cinematic presentation.",

      securityProject:
        "System Security Audit-Kali Linux",

      securityProjectText:
        "Performed a complete security audit using Lynis to identify vulnerabilities and system hardening opportunities. Designed visuals to display key findings and improvement areas.",

      cubeProject:
        "Dynamic 3D Cube Renderer",

      cubeProjectText:
        "A pure HTML/CSS project demonstrating 3D transformations, perspective, and interactive rotation using standard web technologies and CSS animations.",


      viewLive:
        "View Live Site",

      viewCode:
        "View Code On Github",

      viewMockup:
        "View Mockup",

      viewSummary:
        "View Summary",

      viewDetails:
        "View Details",


      resumeTitle:
        "Resume",

      resumeText:
        "You can download my full resume here:",

      downloadResume:
        "Download Resume",

      keySkills:
        "Key Skills:",

      experienceHighlights:
        "Experience Highlights:",


      contactTitle:
        "Get in Touch",

      contactText:
        "Have a project in mind or just want to chat? Feel free to reach out!",

      yourName:
        "Your Name",

      yourEmail:
        "Your Email",

      yourMessage:
        "Your Message",

      sendMessage:
        "Send Message",


      nameError:
        "Please enter your name (2+ characters).",

      emailError:
        "Please enter a valid email address.",

      messageError:
        "Message must be at least 10 characters.",

      sending:
        "Sending...",

      messageSent:
        "Message sent!",


      footer:
        "© 2025 Isshak Renane. All rights reserved."

    },


    /* =====================================================
       FRENCH
       ===================================================== */

    fr: {

      viewLiveSite: "Voir le site",

      pageTitle:
        "Isshak Renane | Développeur Web & Designer",

      home:
        "Accueil",

      about:
        "À propos",

      skills:
        "Compétences",

      services:
        "Services",

      projects:
        "Projets",

      resume:
        "CV",

      contact:
        "Contact",


      heroTitle:
        "Développeur Web, Designer & Professionnel IT",

      heroText:
        "Je crée des expériences numériques attrayantes et propose des solutions informatiques robustes.",

      heroButton:
        "Voir mes projets",


      aboutTitle:
        "À propos de moi",

      aboutP1:
        "Bonjour ! Je suis Isshak Renane, développeur et designer web passionné, doté d'un sens aigu de l'esthétique et de la fonctionnalité. Fort d'une expérience dans les services informatiques, j'adopte une approche globale pour la création de solutions numériques, en veillant à ce qu'elles soient non seulement attrayantes visuellement, mais aussi sécurisées, performantes et conviviales.",

      aboutP2:
        "Mon parcours dans le monde numérique a débuté par une fascination pour la conception des sites web, ce qui m'a conduit à maîtriser HTML, CSS, JavaScript et les pratiques modernes de développement web. J'aime résoudre des problèmes et créer des interfaces intuitives qui améliorent l'expérience utilisateur. Quand je ne code pas, j'explore souvent les nouvelles tendances en design ou j'approfondis mes connaissances en sécurité réseau.",

      aboutP3:
        "Connectons-nous et construisons ensemble quelque chose d'extraordinaire !",


      skillsTitle:
        "Compétences",

      technicalSkills:
        "Compétences techniques",

      designTools:
        "Design & Outils",


      servicesTitle:
        "Services",

      webDevelopment:
        "Développement Web",

      webDevelopmentText:
        "Création de sites web responsifs et dynamiques utilisant les technologies web modernes.",

      webDesign:
        "Design Web",

      webDesignText:
        "Création d'interfaces et d'expériences utilisateur intuitives et visuellement attrayantes.",

      itConsulting:
        "Conseil IT",

      itConsultingText:
        "Conseils et solutions pour votre infrastructure informatique et vos besoins en sécurité.",

      responsiveDesign:
        "Design Responsive",

      responsiveDesignText:
        "Garantir que votre site fonctionne parfaitement sur tous les appareils.",

      cybersecurity:
        "Audits de Cybersécurité",

      cybersecurityText:
        "Évaluation et amélioration de la sécurité de vos actifs numériques.",

      cloudSolutions:
        "Solutions Cloud",

      cloudSolutionsText:
        "Mise en œuvre et gestion de services cloud évolutifs pour votre entreprise.",


      projectsTitle:
        "Projets",

      weatherProject:
        "Application météo interactive",

      weatherProjectText:
        "Une application web dynamique créée avec HTML, CSS et JavaScript qui récupère les données météo en temps réel pour n'importe quelle ville.",

      artistProject:
        "Landing Page pour artiste",

      artistProjectText:
        "Conception d'une interface élégante de portfolio artistique avec Figma, en mettant l'accent sur la clarté et la présentation artistique.",

      ecommerceProject:
        "Page produit e-commerce",

      ecommerceProjectText:
        "Conception d'une page produit e-commerce intuitive et visuellement attrayante, axée sur le parcours utilisateur.",

      photographyProject:
        "Portfolio Photographie Richard Gleed",

      photographyProjectText:
        "Un portfolio photographique moderne conçu pour mettre en valeur la narration visuelle grâce à des mises en page élégantes, des tons sombres et une présentation cinématographique.",

      securityProject:
        "Audit de sécurité système - Kali Linux",

      securityProjectText:
        "Réalisation d'un audit complet de sécurité avec Lynis afin d'identifier les vulnérabilités et les possibilités de renforcement du système.",

      cubeProject:
        "Rendu dynamique d'un cube 3D",

      cubeProjectText:
        "Projet HTML/CSS démontrant les transformations 3D, la perspective et la rotation interactive grâce aux technologies web standards et aux animations CSS.",


      viewLive:
        "Voir le site",

      viewCode:
        "Voir le code sur Github",

      viewMockup:
        "Voir la maquette",

      viewSummary:
        "Voir le résumé",

      viewDetails:
        "Voir les détails",


      resumeTitle:
        "CV",

      resumeText:
        "Vous pouvez télécharger mon CV complet ici :",

      downloadResume:
        "Télécharger le CV",

      keySkills:
        "Compétences clés :",

      experienceHighlights:
        "Expériences professionnelles :",


      contactTitle:
        "Contactez-moi",

      contactText:
        "Vous avez un projet en tête ou souhaitez simplement discuter ? N'hésitez pas à me contacter !",

      yourName:
        "Votre nom",

      yourEmail:
        "Votre adresse e-mail",

      yourMessage:
        "Votre message",

      sendMessage:
        "Envoyer le message",


      nameError:
        "Veuillez entrer votre nom (2 caractères minimum).",

      emailError:
        "Veuillez entrer une adresse e-mail valide.",

      messageError:
        "Le message doit contenir au moins 10 caractères.",

      sending:
        "Envoi...",

      messageSent:
        "Message envoyé !",


      footer:
        "© 2025 Isshak Renane. Tous droits réservés."

    },


    /* =====================================================
       ARABIC
       ===================================================== */

    ar: {

      viewLiveSite: "عرض الموقع",

      pageTitle:
        "إسحاق رنان | مطور ويب ومصمم",

      home:
        "الرئيسية",

      about:
        "من أنا",

      skills:
        "المهارات",

      services:
        "الخدمات",

      projects:
        "المشاريع",

      resume:
        "السيرة الذاتية",

      contact:
        "اتصل بي",


      heroTitle:
        "مطور ويب ومصمم وخبير في تكنولوجيا المعلومات",

      heroText:
        "أصمم تجارب رقمية مميزة وأقدم حلولاً تقنية معلومات قوية وفعالة.",

      heroButton:
        "شاهد أعمالي",


      aboutTitle:
        "من أنا",

      aboutP1:
        "مرحباً! أنا إسحاق رنان، مطور ومصمم مواقع شغوف، أولي اهتماماً كبيراً للجمع بين الجمالية والوظيفة العملية. بفضل خلفيتي في مجال خدمات تكنولوجيا المعلومات، أتبنى نهجاً شاملاً في بناء الحلول الرقمية، حيث أحرص على أن تكون هذه الحلول جذابة بصرياً، وآمنة، وفعالة، وسهلة الاستخدام.",

      aboutP2:
        "بدأت رحلتي في العالم الرقمي مدفوعاً بشغف كبير لمعرفة كيفية بناء المواقع الإلكترونية، مما قادني إلى إتقان HTML وCSS وJavaScript وأحدث ممارسات تطوير الويب. أجد متعة كبيرة في حل المشكلات وتصميم واجهات بديهية تعزز تجربة المستخدم. وعندما لا أعمل على البرمجة، غالباً ما أقضي وقتي في استكشاف اتجاهات التصميم الجديدة أو التعمق في مجال أمن الشبكات.",

      aboutP3:
        "لنتواصل ونعمل معاً لبناء شيء رائع ومميز!",


      skillsTitle:
        "المهارات",

      technicalSkills:
        "المهارات التقنية",

      designTools:
        "التصميم والأدوات",


      servicesTitle:
        "الخدمات",

      webDevelopment:
        "تطوير المواقع",

      webDevelopmentText:
        "بناء مواقع ويب متجاوبة وديناميكية باستخدام تقنيات الويب الحديثة.",

      webDesign:
        "تصميم المواقع",

      webDesignText:
        "إنشاء واجهات وتجارب مستخدم سهلة الاستخدام وجذابة بصرياً.",

      itConsulting:
        "استشارات تقنية المعلومات",

      itConsultingText:
        "تقديم المشورة والحلول المتخصصة للبنية التحتية لتكنولوجيا المعلومات واحتياجات الأمن.",

      responsiveDesign:
        "التصميم المتجاوب",

      responsiveDesignText:
        "ضمان ظهور موقعك وعمله بشكل مثالي على جميع الأجهزة.",

      cybersecurity:
        "تدقيق الأمن السيبراني",

      cybersecurityText:
        "تقييم وتعزيز مستوى أمان أصولك الرقمية.",

      cloudSolutions:
        "الحلول السحابية",

      cloudSolutionsText:
        "تنفيذ وإدارة خدمات سحابية قابلة للتوسع لتلبية احتياجات عملك.",


      projectsTitle:
        "المشاريع",

      weatherProject:
        "تطبيق الطقس التفاعلي",

      weatherProjectText:
        "تطبيق ويب ديناميكي تم تطويره باستخدام HTML وCSS وJavaScript لجلب بيانات الطقس في الوقت الفعلي لأي مدينة.",

      artistProject:
        "صفحة هبوط لفنان",

      artistProjectText:
        "تصميم واجهة أنيقة لمحفظة فنية باستخدام Figma، مع التركيز على الوضوح والعرض الفني.",

      ecommerceProject:
        "صفحة منتج للتجارة الإلكترونية",

      ecommerceProjectText:
        "تصميم مفاهيمي لصفحة منتج إلكترونية سهلة الاستخدام وجذابة بصرياً، مع التركيز على رحلة المستخدم.",

      photographyProject:
        "محفظة تصوير Richard Gleed",

      photographyProjectText:
        "محفظة تصوير حديثة وأنيقة مصممة لإبراز السرد البصري من خلال تخطيطات راقية وألوان داكنة وعرض سينمائي.",

      securityProject:
        "تدقيق أمان النظام - Kali Linux",

      securityProjectText:
        "إجراء تدقيق أمني شامل باستخدام Lynis لتحديد نقاط الضعف وفرص تعزيز أمان النظام.",

      cubeProject:
        "عارض مكعب ثلاثي الأبعاد",

      cubeProjectText:
        "مشروع HTML/CSS يوضح التحويلات ثلاثية الأبعاد والمنظور والدوران التفاعلي باستخدام تقنيات الويب القياسية وحركات CSS.",


      viewLive:
        "عرض الموقع",

      viewCode:
        "عرض الكود على Github",

      viewMockup:
        "عرض النموذج",

      viewSummary:
        "عرض الملخص",

      viewDetails:
        "عرض التفاصيل",


      resumeTitle:
        "السيرة الذاتية",

      resumeText:
        "يمكنك تحميل سيرتي الذاتية الكاملة من هنا:",

      downloadResume:
        "تحميل السيرة الذاتية",

      keySkills:
        "المهارات الأساسية:",

      experienceHighlights:
        "أهم الخبرات:",


      contactTitle:
        "تواصل معي",

      contactText:
        "هل لديك مشروع في ذهنك أو ترغب فقط في التحدث؟ لا تتردد في التواصل معي!",

      yourName:
        "اسمك",

      yourEmail:
        "بريدك الإلكتروني",

      yourMessage:
        "رسالتك",

      sendMessage:
        "إرسال الرسالة",


      nameError:
        "يرجى إدخال اسمك (حرفان على الأقل).",

      emailError:
        "يرجى إدخال عنوان بريد إلكتروني صالح.",

      messageError:
        "يجب أن تحتوي الرسالة على 10 أحرف على الأقل.",

      sending:
        "جارٍ الإرسال...",

      messageSent:
        "تم إرسال الرسالة!",


      footer:
        "© 2025 إسحاق رنان. جميع الحقوق محفوظة."

    }

  };


  /* =======================================================
     CURRENT LANGUAGE
     ======================================================= */

  let currentLanguage =
    localStorage.getItem("lang") || "en";


  /* =======================================================
     FLAGS
     ======================================================= */

  const flagMap = {

    en:
      "https://flagcdn.com/w20/gb.png",

    fr:
      "https://flagcdn.com/w20/fr.png",

    ar:
      "https://flagcdn.com/w20/sa.png"

  };


  /* =======================================================
     TRANSLATION HELPER
     ======================================================= */

  const setText = (
    selector,
    value
  ) => {

    const element =
      document.querySelector(selector);

    if (element && value) {

      element.textContent = value;

    }

  };


  /* =======================================================
     APPLY TRANSLATIONS
     ======================================================= */

  const applyTranslations = (lang) => {

    // Safety check
    if (!translations[lang]) {

      lang = "en";

    }


    currentLanguage = lang;


    const t =
      translations[lang];


    /* -----------------------------------------------------
       HTML LANGUAGE + RTL
       ----------------------------------------------------- */

    document.documentElement.lang =
      lang;

    document.documentElement.dir =
      lang === "ar"
        ? "rtl"
        : "ltr";


    /* -----------------------------------------------------
       PAGE TITLE
       ----------------------------------------------------- */

    document.title =
      t.pageTitle;


    /* -----------------------------------------------------
       GENERIC DATA-I18N ELEMENTS
       ----------------------------------------------------- */

    document
      .querySelectorAll("[data-i18n]")
      .forEach((element) => {

        const key =
          element.getAttribute(
            "data-i18n"
          );


        if (t[key]) {

          element.textContent =
            t[key];

        }

      });


    /* -----------------------------------------------------
       NAVBAR
       ----------------------------------------------------- */

    setText(
      '.navbar nav a[href="#home"]',
      t.home
    );

    setText(
      '.navbar nav a[href="#about"]',
      t.about
    );

    setText(
      '.navbar nav a[href="#skills"]',
      t.skills
    );

    setText(
      '.navbar nav a[href="#services"]',
      t.services
    );

    setText(
      '.navbar nav a[href="#projects"]',
      t.projects
    );

    setText(
      '.navbar nav a[href="#resume"]',
      t.resume
    );

    setText(
      '.navbar nav a[href="#contact"]',
      t.contact
    );


    /* -----------------------------------------------------
       HERO
       ----------------------------------------------------- */

    setText(
      ".hero-content h2",
      t.heroTitle
    );

    setText(
      ".hero-content p",
      t.heroText
    );

    setText(
      ".hero-content .btn",
      t.heroButton
    );


    /* -----------------------------------------------------
       ABOUT
       ----------------------------------------------------- */

    setText(
      "#about h2",
      t.aboutTitle
    );

    setText(
      ".about-p1",
      t.aboutP1
    );

    setText(
      ".about-p2",
      t.aboutP2
    );

    setText(
      ".about-p3",
      t.aboutP3
    );


    /* -----------------------------------------------------
       SKILLS
       ----------------------------------------------------- */

    setText(
      "#skills h2",
      t.skillsTitle
    );


    const skillHeadings =
      document.querySelectorAll(
        ".skills-category h3"
      );


    if (skillHeadings[0]) {

      skillHeadings[0].textContent =
        t.technicalSkills;

    }


    if (skillHeadings[1]) {

      skillHeadings[1].textContent =
        t.designTools;

    }


    /* -----------------------------------------------------
       SERVICES
       ----------------------------------------------------- */

    setText(
      "#services h2",
      t.servicesTitle
    );


    const serviceCards =
      document.querySelectorAll(
        ".service-card"
      );


    if (serviceCards[0]) {

      setText(
        ".service-card:nth-child(1) h3",
        t.webDevelopment
      );

      setText(
        ".service-card:nth-child(1) p",
        t.webDevelopmentText
      );

    }


    if (serviceCards[1]) {

      setText(
        ".service-card:nth-child(2) h3",
        t.webDesign
      );

      setText(
        ".service-card:nth-child(2) p",
        t.webDesignText
      );

    }


    if (serviceCards[2]) {

      setText(
        ".service-card:nth-child(3) h3",
        t.itConsulting
      );

      setText(
        ".service-card:nth-child(3) p",
        t.itConsultingText
      );

    }


    if (serviceCards[3]) {

      setText(
        ".service-card:nth-child(4) h3",
        t.responsiveDesign
      );

      setText(
        ".service-card:nth-child(4) p",
        t.responsiveDesignText
      );

    }


    if (serviceCards[4]) {

      setText(
        ".service-card:nth-child(5) h3",
        t.cybersecurity
      );

      setText(
        ".service-card:nth-child(5) p",
        t.cybersecurityText
      );

    }


    if (serviceCards[5]) {

      setText(
        ".service-card:nth-child(6) h3",
        t.cloudSolutions
      );

      setText(
        ".service-card:nth-child(6) p",
        t.cloudSolutionsText
      );

    }


    /* -----------------------------------------------------
       PROJECTS
       ----------------------------------------------------- */

    setText(
      "#projects h2",
      t.projectsTitle
    );


    const projectCards =
      document.querySelectorAll(
        ".project-card"
      );


    const projectData = [

      [
        t.weatherProject,
        t.weatherProjectText
      ],

      [
        t.artistProject,
        t.artistProjectText
      ],

      [
        t.ecommerceProject,
        t.ecommerceProjectText
      ],

      [
        t.photographyProject,
        t.photographyProjectText
      ],

      [
        t.securityProject,
        t.securityProjectText
      ],

      [
        t.cubeProject,
        t.cubeProjectText
      ]

    ];


    projectCards.forEach(
      (card, index) => {

        if (!projectData[index]) return;


        const title =
          card.querySelector("h3");

        const description =
          card.querySelector("p");


        if (title) {

          title.textContent =
            projectData[index][0];

        }


        if (description) {

          description.textContent =
            projectData[index][1];

        }

      }
    );


    /* -----------------------------------------------------
       PROJECT BUTTONS
       ----------------------------------------------------- */

    const projectButtons =
      document.querySelectorAll(
        ".project-links .btn-small"
      );


    projectButtons.forEach(
      (button) => {

        const text =
          button.textContent
            .trim()
            .toLowerCase();


        if (
          text.includes("live") ||
          text.includes("site")
        ) {

          button.textContent =
            t.viewLive;

        }

        else if (
          text.includes("github") ||
          text.includes("code")
        ) {

          button.textContent =
            t.viewCode;

        }

        else if (
          text.includes("mockup") ||
          text.includes("maquette")
        ) {

          button.textContent =
            t.viewMockup;

        }

        else if (
          text.includes("summary") ||
          text.includes("résumé") ||
          text.includes("ملخص")
        ) {

          button.textContent =
            t.viewSummary;

        }

        else if (
          text.includes("details") ||
          text.includes("détails") ||
          text.includes("تفاصيل")
        ) {

          button.textContent =
            t.viewDetails;

        }

      }
    );


    /* -----------------------------------------------------
       RESUME
       ----------------------------------------------------- */

    setText(
      "#resume h2",
      t.resumeTitle
    );


    setText(
      "#resume > .container > p",
      t.resumeText
    );


    const resumeButton =
      document.querySelector(
        '#resume a[href*="CV"]'
      );


    if (resumeButton) {

      resumeButton.textContent =
        t.downloadResume;

    }


    const resumeHeadings =
      document.querySelectorAll(
        ".resume-preview h3"
      );


    if (resumeHeadings[0]) {

      resumeHeadings[0].textContent =
        t.keySkills;

    }


    if (resumeHeadings[1]) {

      resumeHeadings[1].textContent =
        t.experienceHighlights;

    }


    /* -----------------------------------------------------
       CONTACT
       ----------------------------------------------------- */

    setText(
      "#contact h2",
      t.contactTitle
    );

    setText(
      "#contact .container > p",
      t.contactText
    );


    const nameInput =
      document.querySelector(
        '.contact-form input[type="text"]'
      );

    const emailInput =
      document.querySelector(
        '.contact-form input[type="email"]'
      );

    const messageInput =
      document.querySelector(
        ".contact-form textarea"
      );


    if (nameInput) {

      nameInput.placeholder =
        t.yourName;

    }


    if (emailInput) {

      emailInput.placeholder =
        t.yourEmail;

    }


    if (messageInput) {

      messageInput.placeholder =
        t.yourMessage;

    }


    const submitButton =
      document.querySelector(
        '.contact-form button[type="submit"]'
      );


    if (submitButton) {

      submitButton.textContent =
        t.sendMessage;

    }


    /* -----------------------------------------------------
       FOOTER
       ----------------------------------------------------- */

    setText(
      ".footer p",
      t.footer
    );


    /* -----------------------------------------------------
       UPDATE MAIN DESKTOP FLAG
       ----------------------------------------------------- */

    const currentFlag =
      document.getElementById(
        "current-flag"
      );


    if (currentFlag) {

      currentFlag.src =
        flagMap[lang];

      currentFlag.alt =
        lang.toUpperCase();

    }


    /* -----------------------------------------------------
       ACTIVE LANGUAGE BUTTON
       ----------------------------------------------------- */

    document
      .querySelectorAll("[data-lang]")
      .forEach((button) => {

        button.classList.toggle(
          "active",
          button.dataset.lang === lang
        );

      });


    /* -----------------------------------------------------
       SAVE LANGUAGE
       ----------------------------------------------------- */

    localStorage.setItem(
      "lang",
      lang
    );

  };


  /* =======================================================
     8. LANGUAGE BUTTONS
     ======================================================= */

  document
    .querySelectorAll(
      ".dropdown-menu button, .lang-switcher button"
    )
    .forEach((button) => {

      button.addEventListener(
        "click",
        (e) => {

          e.preventDefault();

          e.stopPropagation();


          const lang =
            button.dataset.lang;


          if (!lang) return;


          applyTranslations(lang);


          // Close desktop dropdown
          const dropdown =
            document.querySelector(
              ".lang-dropdown"
            );


          if (dropdown) {

            dropdown.classList.remove(
              "open"
            );

          }

        }
      );

    });


  /* =======================================================
     9. DESKTOP LANGUAGE DROPDOWN
     ======================================================= */

  const selectedLanguage =
    document.querySelector(
      ".selected-lang"
    );


  const languageDropdown =
    document.querySelector(
      ".lang-dropdown"
    );


  if (
    selectedLanguage &&
    languageDropdown
  ) {

    selectedLanguage.addEventListener(
      "click",
      (e) => {

        e.preventDefault();

        e.stopPropagation();


        languageDropdown.classList.toggle(
          "open"
        );

      }
    );

  }


  /* =======================================================
     10. CLOSE LANGUAGE DROPDOWN
     ======================================================= */

  document.addEventListener(
    "click",
    (e) => {

      if (
        languageDropdown &&
        !languageDropdown.contains(
          e.target
        )
      ) {

        languageDropdown.classList.remove(
          "open"
        );

      }

    }
  );


  /* =======================================================
     11. INITIAL LANGUAGE
     ======================================================= */

  applyTranslations(
    localStorage.getItem("lang") || "en"
  );


});
