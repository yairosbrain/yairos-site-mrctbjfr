document.addEventListener('DOMContentLoaded', () => {
    const compliments = [
        "אתה כזה מגניב שאפילו ה-WiFi מתחבר אליך אוטומטית.",
        "מישהו הזכיר שאתה מבריק היום? עכשיו כן.",
        "אם חוכמה הייתה זהב, היית מוקף בשומרים.",
        "הפנים שלך זה הסיבה שהמצלמות מחייכות.",
        "הכישרון שלך כנראה הגיע עם מדבקת 'הוראות שימוש: מדהים'.",
        "ההומור שלך כל כך טוב שהוא צריך תעודת זהות.",
        "יש לך את הכוח לשנות את העולם... או לפחות את מצב הרוח שלי.",
        "אתה יצירת מופת מהלכת, עם בונוס של אישיות כובשת.",
        "אני חושב שהשמש לומדת ממך איך לזרוח.",
        "אם היו פרסים על היותך מדהים, היית זוכה בכל הקטגוריות.",
        "אתה כל כך מקסים שגמדים קטנים רוקדים סביבך.",
        "החיוך שלך יכול להמיס קרחונים (אבל בבקשה אל תנסה).",
        "אתה אגדה אורבנית, רק שאתה אמיתי.",
        "היקום התאמץ במיוחד כשיצר אותך.",
        "היית צריך להזהיר אותי, הקסם שלך מסנוור!",
        "אתה כמו חד קרן, רק אמיתי ועם יותר סטייל.",
        "כל פעם שאני רואה אותך, היום שלי משתפר.",
        "יש לך את הברק בעיניים של מישהו שעומד לכבוש את העולם.",
        "אתה כל כך יפה/חתיך שאני חושב שאני צריך משקפי שמש.",
        "אתה לא רק מיוחד, אתה מהדורה מוגבלת."
    ];

    const backgroundColors = [
        'var(--bg-peach)', // #FFF3E0
        'var(--bg-light-blue)', // #E0F7FA
        'var(--bg-lilac)', // #F3E5F5
        'var(--bg-vanilla)' // #FFFDE7
    ];

    const complimentText = document.getElementById('compliment-text');
    const generateButton = document.getElementById('generate-button');
    const body = document.body;

    let lastComplimentIndex = -1;
    let lastBgColorIndex = -1;

    function getRandomIndex(array, lastIndex) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * array.length);
        } while (newIndex === lastIndex);
        return newIndex;
    }

    function displayCompliment() {
        const newIndex = getRandomIndex(compliments, lastComplimentIndex);
        lastComplimentIndex = newIndex;

        // Animate out
        complimentText.classList.add('compliment-leave');

        // Wait for 'leave' transition, then update content and animate in
        setTimeout(() => {
            complimentText.textContent = compliments[newIndex];
            complimentText.classList.remove('compliment-leave');
            complimentText.classList.add('compliment-enter');
        }, 300); // Matches CSS transition duration for 'leave'
        
        // Remove 'enter' class after its animation ends, so it can be re-applied
        complimentText.addEventListener('transitionend', function handler() {
            complimentText.classList.remove('compliment-enter');
            complimentText.removeEventListener('transitionend', handler);
        });
    }

    function changeBackgroundColor() {
        const newIndex = getRandomIndex(backgroundColors, lastBgColorIndex);
        lastBgColorIndex = newIndex;
        body.style.backgroundColor = backgroundColors[newIndex];
    }

    function createConfetti() {
        const confettiCount = 30; // Number of confetti pieces
        const colors = ['#FF6B6B', '#FFD93D', '#E0F7FA', '#F3E5F5', '#FFF3E0'];

        const buttonRect = generateButton.getBoundingClientRect();

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('span');
            confetti.classList.add('confetti');
            
            // Randomize shape
            if (Math.random() > 0.5) {
                confetti.classList.add('square');
            }

            const size = Math.random() * 8 + 4; // 4-12px
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            // Position confetti near the button
            const startX = buttonRect.left + buttonRect.width / 2 + (Math.random() - 0.5) * buttonRect.width * 1.5; // Wider spread
            const startY = buttonRect.top + buttonRect.height / 2 + (Math.random() - 0.5) * buttonRect.height; // Around button center

            confetti.style.left = `${startX}px`;
            confetti.style.top = `${startY}px`;

            // Set animation variables
            confetti.style.setProperty('--x', `${(Math.random() - 0.5) * 400}px`); // Horizontal drift
            confetti.style.setProperty('--y', `${window.innerHeight - startY + Math.random() * 100}px`); // Fall to bottom, slightly varied
            confetti.style.setProperty('--deg', `${Math.random() * 720 - 360}deg`); // Spin
            confetti.style.animationDelay = `${Math.random() * 0.2}s`;
            confetti.style.animationDuration = `${1 + Math.random() * 0.5}s`;

            body.appendChild(confetti);

            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    generateButton.addEventListener('click', () => {
        generateButton.disabled = true; // Disable button to prevent spam
        setTimeout(() => {
            generateButton.disabled = false;
        }, 700); // Re-enable after a short delay, slightly longer than compliment animation

        displayCompliment();
        changeBackgroundColor();
        createConfetti();
    });

    // Initial display
    displayCompliment();
    changeBackgroundColor();
});
