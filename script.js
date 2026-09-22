lucide.createIcons();

const animatedElements = document.querySelectorAll(
    '#app > section, #app > footer, .project-card, #skills > div > div'
);
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('#skills .h-full.rounded-full[style*="width"]');

skillBars.forEach((bar) => {
    bar.classList.add('skill-bar');
    bar.dataset.targetWidth = bar.style.width;
    bar.style.width = '0%';
});

const animateSkillBars = () => {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            skillBars.forEach((bar) => {
                bar.style.width = bar.dataset.targetWidth;
            });
        });
    });
};

if ('IntersectionObserver' in window) {
    const appContainer = document.getElementById('app');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: appContainer, threshold: 0.12 });

    animatedElements.forEach((element) => {
        element.classList.add('reveal-on-scroll');
        revealObserver.observe(element);
    });

    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                animateSkillBars();
                observer.disconnect();
            }
        }, { root: appContainer, threshold: 0.2 });

        skillsObserver.observe(skillsSection);
    }
} else {
    animatedElements.forEach((element) => element.classList.add('is-visible'));
    animateSkillBars();
}

const shareButton = document.getElementById('share-button');
if (shareButton) {
    shareButton.addEventListener('click', async () => {
        const shareData = {
            title: document.title,
            text: 'Découvrez le portfolio de Bonzou Kouassi.',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                shareButton.querySelector('span').textContent = 'Lien copié';
                setTimeout(() => {
                    shareButton.querySelector('span').textContent = 'Partager';
                }, 2000);
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                shareButton.querySelector('span').textContent = 'Partage indisponible';
            }
        }
    });
}

const defaultConfig = {
    hero_name: "BONZOU KOUASSI",
    hero_tagline: "Designer & Développeur Créatif",
    about_text: "Je suis un designer et développeur passionné par la création d'expériences numériques mémorables. Avec plus de 5 ans d'expérience, je combine esthétique et fonctionnalité pour donner vie à des projets uniques.",
    contact_email: "bkcea1796@outlook.com",
    phone: "0787487438",
    location: "Abidjan, Côte d'Ivoire",
    skills_title: "Compétences",
    background_color: "#0f0f0f",
    surface_color: "#1a1a1a",
    text_color: "#f0f0f0",
    primary_action_color: "#e4ff1a",
    secondary_action_color: "#667eea",
    font_family: "Syne",
    font_size: 16
};

function applyConfig(config) {
    document.getElementById('hero-name').textContent = config.hero_name || defaultConfig.hero_name;
    document.getElementById('hero-tagline').textContent = config.hero_tagline || defaultConfig.hero_tagline;
    document.getElementById('about-text').textContent = config.about_text || defaultConfig.about_text;
    document.getElementById('skills-title').textContent = config.skills_title || defaultConfig.skills_title;
    document.getElementById('contact-email-display').textContent = config.contact_email || defaultConfig.contact_email;
    document.getElementById('contact-location-display').textContent = config.location || defaultConfig.location;

    const navName = document.getElementById('nav-name');
    if (navName) {
        navName.textContent = (config.hero_name || defaultConfig.hero_name).split(' ').map(w => w[0]).join('');
    }

    const bg = config.background_color || defaultConfig.background_color;
    const surface = config.surface_color || defaultConfig.surface_color;
    const text = config.text_color || defaultConfig.text_color;
    const primary = config.primary_action_color || defaultConfig.primary_action_color;

    document.getElementById('app').style.backgroundColor = bg;
    document.querySelectorAll('[style*="color: #f0f0f0"]').forEach(el => el.style.color = text);
    document.querySelectorAll('.project-card, [style*="background-color: #1a1a1a"]').forEach(el => el.style.backgroundColor = surface);

    const font = config.font_family || defaultConfig.font_family;
    document.querySelectorAll('.font-heading').forEach(el => el.style.fontFamily = `${font}, sans-serif`);

    const baseSize = config.font_size || defaultConfig.font_size;
    document.getElementById('hero-name').style.fontSize = `${baseSize * 4.5}px`;
    document.getElementById('hero-tagline').style.fontSize = `${baseSize * 1.5}px`;
    document.getElementById('about-text').style.fontSize = `${baseSize * 1.125}px`;
}

window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => { applyConfig(config); },
    mapToCapabilities: (config) => ({
        recolorables: [
            { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
            { get: () => config.surface_color || defaultConfig.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); } },
            { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
            { get: () => config.primary_action_color || defaultConfig.primary_action_color, set: (v) => { config.primary_action_color = v; window.elementSdk.setConfig({ primary_action_color: v }); } },
            { get: () => config.secondary_action_color || defaultConfig.secondary_action_color, set: (v) => { config.secondary_action_color = v; window.elementSdk.setConfig({ secondary_action_color: v }); } }
        ],
        borderables: [],
        fontEditable: { get: () => config.font_family || defaultConfig.font_family, set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); } },
        fontSizeable: { get: () => config.font_size || defaultConfig.font_size, set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); } }
    }),
    mapToEditPanelValues: (config) => new Map([
        ["hero_name", config.hero_name || defaultConfig.hero_name],
        ["hero_tagline", config.hero_tagline || defaultConfig.hero_tagline],
        ["about_text", config.about_text || defaultConfig.about_text],
        ["contact_email", config.contact_email || defaultConfig.contact_email],
        ["phone", config.phone || defaultConfig.phone],
        ["location", config.location || defaultConfig.location],
        ["skills_title", config.skills_title || defaultConfig.skills_title]
    ])
});

// Cloudflare challenge platform bootstrap (auto-injected snippet)
(function () {
    function c() {
        var b = a.contentDocument || a.contentWindow.document;
        if (b) {
            var d = b.createElement('script');
            d.innerHTML = "window.__CF$cv$params={r:'a0b5971340d4de06',t:'MTc4MTQwMDg0MC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
            b.getElementsByTagName('head')[0].appendChild(d);
        }
    }
    if (document.body) {
        var a = document.createElement('iframe');
        a.height = 1;
        a.width = 1;
        a.style.position = 'absolute';
        a.style.top = 0;
        a.style.left = 0;
        a.style.border = 'none';
        a.style.visibility = 'hidden';
        document.body.appendChild(a);
        if ('loading' !== document.readyState) c();
        else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c);
        else {
            var e = document.onreadystatechange || function () { };
            document.onreadystatechange = function (b) {
                e(b);
                'loading' !== document.readyState && (document.onreadystatechange = e, c());
            };
        }
    }
})();
