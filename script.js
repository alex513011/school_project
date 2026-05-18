/**
 * School Life Schedule Management Web App - script.js
 * Core application state, local storage synchronization, calendar engine,
 * interactive timetable rendering, homework board, and custom notifications.
 */

// ==========================================================================
// STATE MANAGEMENT & MOCK GENERATION
// ==========================================================================

let appState = {
    timetable: {}, // Key: "day_period" (e.g. "1_1" for Mon 1st period) -> { subject, teacher, room, color }
    schedules: [], // List of { id, title, type, date, desc }
    homeworks: [], // List of { id, title, subject, duedate, notes, completed }
    notifLog: [],  // History: { id, title, text, timestamp }
    alertedToday: [] // To prevent duplicate toast popups on the same calendar day: { key, date }
};

// Helper: Preset color swatches
const COLOR_PRESETS = [
    { name: 'Red', value: '#FF6B6B' },
    { name: 'Blue', value: '#5B8DEF' },
    { name: 'Green', value: '#6BCB77' },
    { name: 'Purple', value: '#9E7CFF' },
    { name: 'Orange', value: '#FFB84D' },
    { name: 'Slate', value: '#748DA6' }
];

// Helper to calculate D-Day
function getDDay(targetDateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDateStr);
    target.setHours(0, 0, 0, 0);
    
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'D-Day';
    if (diffDays < 0) return `D+${Math.abs(diffDays)}`;
    return `D-${diffDays}`;
}

// Generate premium initial mock data if localStorage is empty
function initializeMockData() {
    const today = new Date();
    
    // Format dates relative to today so D-days are always active and beautiful
    const formatDate = (daysOffset) => {
        const d = new Date(today);
        d.setDate(today.getDate() + daysOffset);
        return d.toISOString().split('T')[0];
    };

    // 1. Timetable Mock
    appState.timetable = {
        // Monday
        "1_1": { subject: "수학", teacher: "김태희", room: "수학교실", color: "#FF6B6B" },
        "1_2": { subject: "수학", teacher: "김태희", room: "수학교실", color: "#FF6B6B" },
        "1_3": { subject: "영어", teacher: "이지은", room: "영어랩실", color: "#5B8DEF" },
        "1_4": { subject: "국어", teacher: "박도현", room: "1학년1반", color: "#6BCB77" },
        "1_5": { subject: "과학", teacher: "최성우", room: "과학실험실", color: "#9E7CFF" },
        "1_6": { subject: "과학", teacher: "최성우", room: "과학실험실", color: "#9E7CFF" },
        // Tuesday
        "2_1": { subject: "영어", teacher: "이지은", room: "영어랩실", color: "#5B8DEF" },
        "2_2": { subject: "국어", teacher: "박도현", room: "1학년1반", color: "#6BCB77" },
        "2_3": { subject: "사회", teacher: "정민우", room: "1학년1반", color: "#FFB84D" },
        "2_4": { subject: "체육", teacher: "홍길동", room: "운동장", color: "#748DA6" },
        "2_5": { subject: "미술", teacher: "이소라", room: "미술실", color: "#9E7CFF" },
        "2_6": { subject: "미술", teacher: "이소라", room: "미술실", color: "#9E7CFF" },
        // Wednesday
        "3_1": { subject: "국어", teacher: "박도현", room: "1학년1반", color: "#6BCB77" },
        "3_2": { subject: "수학", teacher: "김태희", room: "수학교실", color: "#FF6B6B" },
        "3_3": { subject: "과학", teacher: "최성우", room: "과학실험실", color: "#9E7CFF" },
        "3_4": { subject: "사회", teacher: "정민우", room: "1학년1반", color: "#FFB84D" },
        "3_5": { subject: "진로", teacher: "한정희", room: "상담실", color: "#748DA6" },
        // Thursday
        "4_1": { subject: "영어", teacher: "이지은", room: "영어랩실", color: "#5B8DEF" },
        "4_2": { subject: "영어", teacher: "이지은", room: "영어랩실", color: "#5B8DEF" },
        "4_3": { subject: "수학", teacher: "김태희", room: "수학교실", color: "#FF6B6B" },
        "4_4": { subject: "국어", teacher: "박도현", room: "1학년1반", color: "#6BCB77" },
        "4_5": { subject: "음악", teacher: "백건우", room: "음악실", color: "#9E7CFF" },
        "4_6": { subject: "음악", teacher: "백건우", room: "음악실", color: "#9E7CFF" },
        "4_7": { subject: "체육", teacher: "홍길동", room: "체육관", color: "#748DA6" },
        // Friday
        "5_1": { subject: "과학", teacher: "최성우", room: "과학실험실", color: "#9E7CFF" },
        "5_2": { subject: "사회", teacher: "정민우", room: "1학년1반", color: "#FFB84D" },
        "5_3": { subject: "국어", teacher: "박도현", room: "1학년1반", color: "#6BCB77" },
        "5_4": { subject: "수학", teacher: "김태희", room: "수학교실", color: "#FF6B6B" },
        "5_5": { subject: "자율", teacher: "박도현", room: "1학년1반", color: "#748DA6" },
        "5_6": { subject: "자율", teacher: "박도현", room: "1학년1반", color: "#748DA6" },
    };

    // 2. Schedules Mock
    appState.schedules = [
        {
            id: 'mock-sch-1',
            title: '영어 수행평가 (말하기)',
            type: 'performance',
            date: formatDate(2), // D-2
            desc: '주제: 내가 가장 좋아하는 과학기술에 관해 3분간 스피치'
        },
        {
            id: 'mock-sch-2',
            title: '체육대회 🏃',
            type: 'personal',
            date: formatDate(4), // D-4
            desc: '우리 반 단체 티셔츠 입고 등교하기! 축구/줄다리기 참가'
        },
        {
            id: 'mock-sch-3',
            title: '1학기 2차 지필평가 (기말고사)',
            type: 'exam',
            date: formatDate(15), // D-15
            desc: '국어/수학/영어/과학 전 범위 대비'
        }
    ];

    // 3. Homework Mock
    appState.homeworks = [
        {
            id: 'mock-hw-1',
            title: '수학 문제집 32p ~ 35p 풀기',
            subject: '수학',
            duedate: formatDate(1), // D-1
            notes: '연습장에 풀고 오답 노트 작성 필수',
            completed: false
        },
        {
            id: 'mock-hw-2',
            title: '과학 발표 ppt 준비',
            subject: '과학',
            duedate: formatDate(3), // D-3
            notes: '우주 팽창을 주제로 5슬라이드 분량 제작',
            completed: false
        },
        {
            id: 'mock-hw-3',
            title: '영어 단어 100개 암기 테스트',
            subject: '영어',
            duedate: formatDate(-1), // Completed yesterday
            notes: '해커스 보카 13강 ~ 15강 범위',
            completed: true
        }
    ];

    // 4. Logs Mock
    appState.notifLog = [
        {
            id: 'mock-log-1',
            title: '시스템 알림',
            text: '하루고 스마트 플래너에 오신 것을 환영합니다! 초기화용 가상 샘플 데이터가 성공적으로 로드되었습니다.',
            timestamp: new Date().toLocaleString()
        }
    ];
    
    appState.alertedToday = [];
    saveState();
}

function loadState() {
    const saved = localStorage.getItem('harugo_app_state');
    if (saved) {
        try {
            appState = JSON.parse(saved);
        } catch (e) {
            console.error('State load failed. Creating fresh database...', e);
            initializeMockData();
        }
    } else {
        initializeMockData();
    }
}

function saveState() {
    localStorage.setItem('harugo_app_state', JSON.stringify(appState));
}

// ==========================================================================
// CALENDAR CALCULATION ENGINE
// ==========================================================================

let calendarCurrentDate = new Date();

function renderCalendar() {
    const container = document.getElementById('calendar-days-container');
    const headerText = document.getElementById('calendar-month-year-text');
    if (!container || !headerText) return;

    container.innerHTML = '';
    
    const year = calendarCurrentDate.getFullYear();
    const month = calendarCurrentDate.getMonth(); // 0-indexed

    // Set Month Header Text (Korean format)
    headerText.textContent = `${year}년 ${month + 1}월`;

    // First day of current month
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0: Sun, 1: Mon, ...
    
    // Total days in current month
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Fill blank slots of previous month
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day-slot empty-day';
        container.appendChild(emptyCell);
    }

    // Fill days of active month
    const today = new Date();
    for (let day = 1; day <= totalDays; day++) {
        const cellDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        const cell = document.createElement('div');
        cell.className = 'calendar-day-slot';
        
        // Weekend styling
        const weekDay = new Date(year, month, day).getDay();
        if (weekDay === 0) cell.classList.add('weekend-sun');
        if (weekDay === 6) cell.classList.add('weekend-sat');
        
        // Today highlighting
        if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === day) {
            cell.classList.add('today');
        }

        // Inner HTML structure
        const numSpan = document.createElement('span');
        numSpan.className = 'calendar-day-num';
        numSpan.textContent = day;
        cell.appendChild(numSpan);

        // Filter events on this specific date
        const dayEvents = appState.schedules.filter(s => s.date === cellDateStr);
        if (dayEvents.length > 0) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'calendar-events-dots';
            
            dayEvents.forEach(evt => {
                const dot = document.createElement('span');
                dot.className = `calendar-dot dot-${evt.type}`;
                dot.title = evt.title;
                dotsContainer.appendChild(dot);
            });
            cell.appendChild(dotsContainer);
        }

        // Click handler: Set date on form and pop alert
        cell.addEventListener('click', () => {
            document.getElementById('schedule-date').value = cellDateStr;
            const itemsSummary = dayEvents.map(e => `• [${e.type === 'exam' ? '시험' : e.type === 'performance' ? '수행' : '개인'}] ${e.title}`).join('\n');
            if (dayEvents.length > 0) {
                showToast(`선택일 일정 (${day}일)`, itemsSummary, 'info');
            }
        });

        container.appendChild(cell);
    }
}

// ==========================================================================
// VIEW SWITCHER (SPA ROUTING)
// ==========================================================================

function switchTab(targetPanelId) {
    // Hide all panels
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    
    // Show target panel
    const targetPanel = document.getElementById(targetPanelId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }

    // Toggle nav active state
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.getAttribute('data-target') === targetPanelId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update Header title dynamically
    const headerTitle = document.getElementById('panel-title');
    if (headerTitle) {
        switch (targetPanelId) {
            case 'panel-home':
                headerTitle.textContent = '오늘 화면';
                break;
            case 'panel-timetable':
                headerTitle.textContent = '나의 시간표';
                break;
            case 'panel-schedules':
                headerTitle.textContent = '학사 일정';
                break;
            case 'panel-homework':
                headerTitle.textContent = '과제 체크리스트';
                break;
            case 'panel-notifications':
                headerTitle.textContent = '알림 & 설정';
                break;
        }
    }

    // Re-render panels if specific data changes
    if (targetPanelId === 'panel-home') {
        renderHome();
    } else if (targetPanelId === 'panel-timetable') {
        renderTimetable();
    } else if (targetPanelId === 'panel-schedules') {
        renderCalendar();
        renderSchedulesList();
    } else if (targetPanelId === 'panel-homework') {
        renderHomeworkList();
    } else if (targetPanelId === 'panel-notifications') {
        renderNotifLogs();
    }
}

// ==========================================================================
// RENDERING 1: HOME (TODAY DASHBOARD)
// ==========================================================================

const DAYS_KR = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

function renderHome() {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0: Sun, 1: Mon, ...
    
    // Update Header Date Text
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${DAYS_KR[currentDayOfWeek]}`;
    document.getElementById('current-date-text').textContent = formattedDate;
    document.getElementById('today-day-tag').textContent = DAYS_KR[currentDayOfWeek];

    // --- Core Stat 1: Next Class ---
    const homeNextClass = document.getElementById('home-next-class');
    const homeNextClassTime = document.getElementById('home-next-class-time');
    
    if (currentDayOfWeek === 0 || currentDayOfWeek === 6) {
        homeNextClass.textContent = '주말 쉬는 날 🎉';
        homeNextClassTime.textContent = '알찬 주말을 보내세요!';
    } else {
        // Simple period timeline mapping
        const currentHour = today.getHours();
        const currentMin = today.getMinutes();
        const currentTimeVal = currentHour * 60 + currentMin;

        // Periods times mapping: starts and labels
        const periods = [
            { id: 1, start: 540, end: 590, text: "09:00 - 09:50" }, // 9:00 - 9:50
            { id: 2, start: 600, end: 650, text: "10:00 - 10:50" },
            { id: 3, start: 660, end: 710, text: "11:00 - 11:50" },
            { id: 4, start: 720, end: 770, text: "12:00 - 12:50" },
            { id: 5, start: 830, end: 880, text: "13:50 - 14:40" },
            { id: 6, start: 890, end: 940, text: "14:50 - 15:40" },
            { id: 7, start: 950, end: 1000, text: "15:50 - 16:40" }
        ];

        let foundClass = null;
        let nextP = null;

        // Find active or next upcoming class
        for (let i = 0; i < periods.length; i++) {
            const p = periods[i];
            const classKey = `${currentDayOfWeek}_${p.id}`;
            const cls = appState.timetable[classKey];
            
            if (currentTimeVal < p.end && cls) {
                if (currentTimeVal >= p.start) {
                    foundClass = { ...cls, period: p.id, time: p.text, active: true };
                    break;
                } else if (!nextP) {
                    foundClass = { ...cls, period: p.id, time: p.text, active: false };
                    break;
                }
            }
        }

        if (foundClass) {
            homeNextClass.textContent = `${foundClass.subject} (${foundClass.period}교시)`;
            homeNextClassTime.textContent = `${foundClass.active ? '진행 중' : '시작 대기'} • ${foundClass.time}`;
        } else {
            homeNextClass.textContent = '방과 후 시간 🏠';
            homeNextClassTime.textContent = '오늘 수업이 모두 끝났습니다!';
        }
    }

    // --- Core Stat 2: Remaining Homework ---
    const activeHw = appState.homeworks.filter(h => !h.completed);
    document.getElementById('home-remaining-homework').textContent = `${activeHw.length}개`;

    // --- Core Stat 3: Upcoming Important Schedule ---
    const homeUpcomingEvent = document.getElementById('home-upcoming-event');
    const homeUpcomingEventDday = document.getElementById('home-upcoming-event-dday');
    
    // Sort schedules ascending by proximity
    const upcomingSchedules = appState.schedules
        .filter(s => new Date(s.date) >= today.setHours(0,0,0,0))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (upcomingSchedules.length > 0) {
        const nextEvt = upcomingSchedules[0];
        homeUpcomingEvent.textContent = nextEvt.title;
        homeUpcomingEventDday.textContent = getDDay(nextEvt.date);
    } else {
        homeUpcomingEvent.textContent = '일정 없음';
        homeUpcomingEventDday.textContent = '-';
    }

    // --- Home Component 4: Today's Timetable Row Timeline ---
    const timelineContainer = document.getElementById('today-timeline-container');
    timelineContainer.innerHTML = '';
    
    if (currentDayOfWeek === 0 || currentDayOfWeek === 6) {
        timelineContainer.innerHTML = `
            <div class="no-class-today">
                <i data-lucide="sparkles"></i>
                <p>행복하고 자유로운 주말입니다! 충분히 충전하세요.</p>
            </div>
        `;
    } else {
        // Build 1st to 7th Period timeline blocks
        const periodsList = [1, 2, 3, 4, 'lunch', 5, 6, 7];
        const currentHour = today.getHours();
        const currentMin = today.getMinutes();
        const currentTimeVal = currentHour * 60 + currentMin;

        // Start times in minutes for highlighting
        const startTimes = {
            1: { start: 540, end: 590, text: "09:00" },
            2: { start: 600, end: 650, text: "10:00" },
            3: { start: 660, end: 710, text: "11:00" },
            4: { start: 720, end: 770, text: "12:00" },
            'lunch': { start: 770, end: 830, text: "점심시간" },
            5: { start: 830, end: 880, text: "13:50" },
            6: { start: 890, end: 940, text: "14:50" },
            7: { start: 950, end: 1000, text: "15:50" }
        };

        periodsList.forEach(pId => {
            const card = document.createElement('div');
            card.className = 'today-period-card';
            
            const timeInfo = startTimes[pId];
            const isActive = currentTimeVal >= timeInfo.start && currentTimeVal < timeInfo.end;
            
            if (isActive) {
                card.classList.add('active');
            }

            if (pId === 'lunch') {
                card.innerHTML = `
                    <span class="today-period-num">12:50 - 13:50</span>
                    <span class="today-period-name">🍱 점심시간</span>
                    <span class="today-period-info">운동 또는 낮잠</span>
                `;
            } else {
                const classKey = `${currentDayOfWeek}_${pId}`;
                const classObj = appState.timetable[classKey];
                
                if (classObj) {
                    card.style.borderLeft = `4px solid ${classObj.color}`;
                    card.innerHTML = `
                        <span class="today-period-num">${pId}교시 (${timeInfo.text})</span>
                        <span class="today-period-name">${classObj.subject}</span>
                        <span class="today-period-info">${classObj.room || '교실'} • ${classObj.teacher || '선생님'}</span>
                    `;
                } else {
                    card.innerHTML = `
                        <span class="today-period-num">${pId}교시 (${timeInfo.text})</span>
                        <span class="today-period-name" style="color: var(--text-muted);">자습/비어있음</span>
                        <span class="today-period-info">-</span>
                    `;
                }
            }
            timelineContainer.appendChild(card);
        });
    }

    // --- Home Component 5: Today & Tomorrow Schedules List ---
    const homeScheduleList = document.getElementById('home-schedule-list');
    homeScheduleList.innerHTML = '';
    
    const todayDateStr = today.toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowDateStr = tomorrow.toISOString().split('T')[0];

    const urgentSchedules = appState.schedules.filter(s => s.date === todayDateStr || s.date === tomorrowDateStr);
    
    if (urgentSchedules.length > 0) {
        urgentSchedules.forEach(s => {
            const item = document.createElement('div');
            item.className = 'quick-item';
            
            const isToday = s.date === todayDateStr;
            const ddayLabel = isToday ? '오늘' : '내일';
            const typeLabel = s.type === 'exam' ? '시험' : s.type === 'performance' ? '수행' : '개인';
            
            item.innerHTML = `
                <div class="quick-item-left">
                    <span class="quick-item-badge border-${s.type}" style="background-color: var(--color-primary-light); color: var(--color-primary-dark); font-weight: 700;">
                        ${typeLabel}
                    </span>
                    <span class="quick-item-title">${s.title}</span>
                </div>
                <div class="quick-item-right">
                    <span class="quick-item-dday ${isToday ? 'urgent' : ''}">${ddayLabel}</span>
                </div>
            `;
            homeScheduleList.appendChild(item);
        });
    } else {
        homeScheduleList.innerHTML = `
            <div class="empty-state">
                <i data-lucide="check-circle-2"></i>
                <p>오늘이나 내일 예정된 학사 일정이 없습니다.</p>
            </div>
        `;
    }

    // --- Home Component 6: Priority Homework Checklist (Uncompleted) ---
    const homeHomeworkList = document.getElementById('home-homework-list');
    homeHomeworkList.innerHTML = '';
    
    const urgentHomeworks = appState.homeworks
        .filter(h => !h.completed)
        .sort((a, b) => new Date(a.duedate) - new Date(b.duedate))
        .slice(0, 3); // Take top 3 closest deadlines

    if (urgentHomeworks.length > 0) {
        urgentHomeworks.forEach(h => {
            const item = document.createElement('div');
            item.className = 'quick-item';
            
            const dday = getDDay(h.duedate);
            const isUrgent = dday === 'D-Day' || dday === 'D-1';
            
            item.innerHTML = `
                <div class="quick-item-left">
                    <span class="quick-item-badge" style="background-color: #E2E8F0; color: var(--text-secondary);">
                        ${h.subject}
                    </span>
                    <span class="quick-item-title">${h.title}</span>
                </div>
                <div class="quick-item-right">
                    <span class="quick-item-dday ${isUrgent ? 'urgent' : ''}">${dday}</span>
                </div>
            `;
            homeHomeworkList.appendChild(item);
        });
    } else {
        homeHomeworkList.innerHTML = `
            <div class="empty-state">
                <i data-lucide="sparkles"></i>
                <p>완료하지 않은 긴급 과제가 없습니다. 여유롭네요!</p>
            </div>
        `;
    }
    
    lucide.replace();
}

// ==========================================================================
// RENDERING 2: TIMETABLE
// ==========================================================================

function renderTimetable() {
    const tbody = document.getElementById('timetable-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    const periodsTimes = [
        { id: 1, text: '1교시', time: '09:00-09:50' },
        { id: 2, text: '2교시', time: '10:00-10:50' },
        { id: 3, text: '3교시', time: '11:00-11:50' },
        { id: 4, text: '4교시', time: '12:00-12:50' },
        { id: 'lunch', text: '점심시간', time: '12:50-13:50' },
        { id: 5, text: '5교시', time: '13:50-14:40' },
        { id: 6, text: '6교시', time: '14:50-15:40' },
        { id: 7, text: '7교시', time: '15:50-16:40' }
    ];

    periodsTimes.forEach(p => {
        const row = document.createElement('tr');
        
        // 1. Time Indicator cell
        const headerCell = document.createElement('td');
        headerCell.className = 'time-header-cell';
        headerCell.innerHTML = `
            <div class="period-cell-info">${p.text}</div>
            <div class="period-cell-time">${p.time}</div>
        `;
        row.appendChild(headerCell);

        if (p.id === 'lunch') {
            // Lunch break spreads across all 5 days
            const lunchCell = document.createElement('td');
            lunchCell.colSpan = 5;
            lunchCell.className = 'lunch-break-row';
            lunchCell.textContent = '🍱 점심 시간 LUNCH TIME 🍱';
            row.appendChild(lunchCell);
        } else {
            // Monday (1) to Friday (5) cells
            for (let day = 1; day <= 5; day++) {
                const cell = document.createElement('td');
                const cellKey = `${day}_${p.id}`;
                
                // Active cell coordinate indexing
                cell.setAttribute('data-day', day);
                cell.setAttribute('data-period', p.id);
                
                const classData = appState.timetable[cellKey];
                
                if (classData) {
                    const card = document.createElement('div');
                    card.className = 'timetable-class-card';
                    card.style.backgroundColor = classData.color || '#5B8DEF';
                    card.innerHTML = `
                        <div class="class-title">${classData.subject}</div>
                        <div class="class-meta">${classData.room || ''} ${classData.teacher || ''}</div>
                    `;
                    cell.appendChild(card);
                } else {
                    cell.innerHTML = `
                        <span style="color: #CBD5E1; font-size: 20px;"><i data-lucide="plus" style="width:16px; height:16px;"></i></span>
                    `;
                }

                // Click to register or edit class
                cell.addEventListener('click', () => openClassRegistration(day, p.id));
                row.appendChild(cell);
            }
        }
        tbody.appendChild(row);
    });

    lucide.replace();
}

// Modal Form class registers
let activeDaySelect = null;
let activePeriodSelect = null;

function openClassRegistration(day, period) {
    activeDaySelect = day;
    activePeriodSelect = period;

    const modal = document.getElementById('modal-class-registration');
    const dayNames = ["", "월요일", "화요일", "수요일", "목요일", "금요일"];
    
    document.getElementById('modal-class-day').value = day;
    document.getElementById('modal-class-period').value = period;
    document.getElementById('class-modal-title').textContent = `${dayNames[day]} ${period}교시 수업 정보`;

    // Populate existing if there is one
    const cellKey = `${day}_${period}`;
    const existing = appState.timetable[cellKey];
    
    const deleteBtn = document.getElementById('btn-delete-class');
    
    if (existing) {
        document.getElementById('modal-class-subject').value = existing.subject;
        document.getElementById('modal-class-teacher').value = existing.teacher || '';
        document.getElementById('modal-class-room').value = existing.room || '';
        document.getElementById('modal-class-color').value = existing.color || '#5B8DEF';
        deleteBtn.style.display = 'block';
    } else {
        document.getElementById('form-class-registration').reset();
        document.getElementById('modal-class-color').value = '#5B8DEF';
        deleteBtn.style.display = 'none';
    }

    renderColorSelectors(existing ? existing.color : '#5B8DEF');
    modal.classList.add('active');
    lucide.replace();
}

function renderColorSelectors(activeColor) {
    const container = document.getElementById('color-selectors-container');
    container.innerHTML = '';

    COLOR_PRESETS.forEach(preset => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'color-swatch-btn';
        btn.style.backgroundColor = preset.value;
        
        if (preset.value.toLowerCase() === activeColor.toLowerCase()) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('modal-class-color').value = preset.value;
        });

        container.appendChild(btn);
    });
}

// ==========================================================================
// RENDERING 3: SCHEDULES (EXAMS/EVALS/EVENTS)
// ==========================================================================

function renderSchedulesList() {
    const container = document.getElementById('schedule-list-container');
    if (!container) return;

    container.innerHTML = '';
    const filter = document.getElementById('filter-schedule-type').value;

    let filtered = appState.schedules;
    if (filter !== 'all') {
        filtered = appState.schedules.filter(s => s.type === filter);
    }

    // Sort by Date Ascending
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (filtered.length > 0) {
        filtered.forEach(s => {
            const dday = getDDay(s.date);
            const isUrgent = dday === 'D-Day' || dday === 'D-1';

            const card = document.createElement('div');
            card.className = `schedule-item-row border-${s.type}`;
            card.innerHTML = `
                <div class="schedule-item-info">
                    <span class="schedule-item-title">${s.title}</span>
                    <span class="schedule-item-date">
                        <i data-lucide="calendar"></i>
                        <span>${s.date} (${dday})</span>
                    </span>
                    ${s.desc ? `<span style="font-size: 11px; color: var(--text-secondary); margin-top:2px;">${s.desc}</span>` : ''}
                </div>
                <div class="schedule-item-actions">
                    <button class="btn-delete" title="일정 삭제" onclick="deleteSchedule('${s.id}')">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    } else {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="calendar-x"></i>
                <p>해당 카테고리의 예정된 일정이 없습니다.</p>
            </div>
        `;
    }
    lucide.replace();
}

function deleteSchedule(id) {
    appState.schedules = appState.schedules.filter(s => s.id !== id);
    saveState();
    renderCalendar();
    renderSchedulesList();
    showToast('일정 삭제', '선택하신 학사 일정이 삭제되었습니다.', 'info');
}

// ==========================================================================
// RENDERING 4: HOMEWORK CHECKLIST
// ==========================================================================

let activeHomeworkTab = 'todo'; // 'todo' or 'done'

function renderHomeworkList() {
    const container = document.getElementById('homework-list-container');
    if (!container) return;

    container.innerHTML = '';
    
    const showCompleted = activeHomeworkTab === 'done';
    const filtered = appState.homeworks.filter(h => h.completed === showCompleted);
    
    // Sort by Due Date Ascending
    filtered.sort((a, b) => new Date(a.duedate) - new Date(b.duedate));

    // Update Counts on tabs
    const todoCount = appState.homeworks.filter(h => !h.completed).length;
    const doneCount = appState.homeworks.filter(h => h.completed).length;
    
    document.getElementById('count-hw-todo').textContent = todoCount;
    document.getElementById('count-hw-done').textContent = doneCount;

    if (filtered.length > 0) {
        filtered.forEach(h => {
            const dday = getDDay(h.duedate);
            const isUrgent = dday === 'D-Day' || dday === 'D-1';
            
            // Map Subject classes
            let subjClass = 'bg-etc';
            if (h.subject === '수학') subjClass = 'bg-math';
            else if (h.subject === '영어') subjClass = 'bg-english';
            else if (h.subject === '국어') subjClass = 'bg-korean';
            else if (h.subject === '과학') subjClass = 'bg-science';
            else if (h.subject === '사회') subjClass = 'bg-social';

            const item = document.createElement('div');
            item.className = `homework-item ${h.completed ? 'completed' : ''}`;
            item.innerHTML = `
                <div class="homework-item-left">
                    <label class="checkbox-container">
                        <input type="checkbox" class="checkbox-input" ${h.completed ? 'checked' : ''} onclick="toggleHomeworkStatus('${h.id}')">
                        <span class="checkbox-checkmark">
                            <i data-lucide="check"></i>
                        </span>
                    </label>
                    <div class="homework-item-details">
                        <div class="homework-item-headline">
                            <span class="subject-badge ${subjClass}">${h.subject}</span>
                            <span class="homework-title-text">${h.title}</span>
                        </div>
                        ${h.notes ? `<div class="homework-item-notes">${h.notes}</div>` : ''}
                    </div>
                </div>
                <div class="homework-item-right">
                    <div class="homework-item-due">
                        <span class="homework-due-date">기한: ${h.duedate}</span>
                        <span class="quick-item-dday ${isUrgent && !h.completed ? 'urgent' : ''}">${dday}</span>
                    </div>
                    <button class="btn-delete" title="과제 삭제" onclick="deleteHomework('${h.id}')">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            `;
            container.appendChild(item);
        });
    } else {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="sparkles"></i>
                <p>${showCompleted ? '완료한 과제가 없습니다. 힘을 내서 과제를 완성해보세요!' : '해당되는 진행 중 과제가 없습니다!'}</p>
            </div>
        `;
    }
    lucide.replace();
}

function toggleHomeworkStatus(id) {
    const hw = appState.homeworks.find(h => h.id === id);
    if (hw) {
        hw.completed = !hw.completed;
        saveState();
        renderHomeworkList();
        
        if (hw.completed) {
            showToast('과제 완료! 🎉', `"${hw.title}" 과제를 완료 처리했습니다!`, 'accent');
        } else {
            showToast('진행 중 전환', `"${hw.title}" 과제를 다시 진행 중으로 변경했습니다.`, 'info');
        }
    }
}

function deleteHomework(id) {
    appState.homeworks = appState.homeworks.filter(h => h.id !== id);
    saveState();
    renderHomeworkList();
    showToast('과제 삭제', '해당 과제 체크리스트 항목이 삭제되었습니다.', 'info');
}

// ==========================================================================
// RENDERING 5: SETTINGS & NOTIFICATIONS HISTORY LOGS
// ==========================================================================

function renderNotifLogs() {
    const container = document.getElementById('notif-log-list');
    if (!container) return;

    container.innerHTML = '';
    
    // Sort descending (newest logs first)
    const sortedLogs = [...appState.notifLog].reverse();

    // Update Nav bar Badge Count (logs count)
    const badge = document.getElementById('nav-notif-count');
    if (badge) {
        if (sortedLogs.length > 0) {
            badge.textContent = sortedLogs.length;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }

    if (sortedLogs.length > 0) {
        sortedLogs.forEach(log => {
            const item = document.createElement('div');
            item.className = 'notif-log-item alert-log-style';
            item.innerHTML = `
                <div class="toast-icon">
                    <i data-lucide="bell-ring"></i>
                </div>
                <div class="toast-content" style="gap:2px;">
                    <span class="toast-title" style="font-size:12px; font-weight:700;">${log.title}</span>
                    <span class="toast-desc" style="font-size:11px; line-height:1.4;">${log.text}</span>
                    <span class="notif-log-time">${log.timestamp}</span>
                </div>
            `;
            container.appendChild(item);
        });
    } else {
        container.innerHTML = `
            <div class="empty-state">
                <i data-lucide="check-circle-2"></i>
                <p>알림 로그 히스토리가 비어 있습니다.</p>
            </div>
        `;
    }
    lucide.replace();
}

// ==========================================================================
// CORE ALERTS AND NOTIFICATION SERVICE (TOASTS + SYSTEM PUSH)
// ==========================================================================

function showToast(title, desc, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-alerts-box');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-alert toast-${type}`;
    
    let iconName = 'info';
    if (type === 'accent') iconName = 'sparkles';
    else if (type === 'danger') iconName = 'alert-triangle';

    toast.innerHTML = `
        <div class="toast-icon">
            <i data-lucide="${iconName}"></i>
        </div>
        <div class="toast-content">
            <span class="toast-title">${title}</span>
            <span class="toast-desc">${desc}</span>
        </div>
        <button class="toast-close">
            <i data-lucide="x"></i>
        </button>
    `;

    // Click handler for closing toast manually
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    });

    container.appendChild(toast);
    lucide.replace();

    // Auto dismiss
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);
}

// Trigger real browser push notification if permissions granted
function triggerSystemPush(title, body) {
    if (!("Notification" in window)) return;
    
    if (Notification.permission === "granted") {
        new Notification(title, {
            body: body,
            icon: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=128&q=80' // Beautiful school desk icon fallback
        });
    }
}

// Alert scan engine: scans schedules and uncompleted homework
function runAlertsEngine(isManual = false) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayStr = today.toISOString().split('T')[0];

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    let alertTriggered = false;

    // A. Scan schedules due tomorrow (D-1) or today (D-Day)
    appState.schedules.forEach(s => {
        const dday = getDDay(s.date);
        const alertKey = `sch_${s.id}_${dday}_${todayStr}`;

        // Ensure we don't alert multiple times on the same page load for the same state unless manual
        const alreadyAlerted = appState.alertedToday.includes(alertKey);

        if ((dday === 'D-Day' || dday === 'D-1') && (!alreadyAlerted || isManual)) {
            const label = dday === 'D-Day' ? '바로 오늘!' : '내일 예정!';
            const typeLabel = s.type === 'exam' ? '📖 지필고사 시험' : s.type === 'performance' ? '✍️ 수행평가' : '🎉 중요 일정';
            const alertTitle = `${typeLabel} ${label}`;
            const alertText = `"${s.title}" 일정이 있습니다. 미리 준비하세요. (${s.date})`;

            // Display Toast
            showToast(alertTitle, alertText, 'accent', 6000);
            
            // Push Browser Alert
            triggerSystemPush(alertTitle, alertText);

            // Log it
            if (!alreadyAlerted) {
                appState.notifLog.push({
                    id: 'log-' + Date.now() + Math.random().toString(36).substr(2, 5),
                    title: alertTitle,
                    text: alertText,
                    timestamp: new Date().toLocaleString()
                });
                appState.alertedToday.push(alertKey);
            }
            alertTriggered = true;
        }
    });

    // B. Scan uncompleted homework due today or tomorrow
    appState.homeworks.forEach(h => {
        if (h.completed) return;

        const dday = getDDay(h.duedate);
        const alertKey = `hw_${h.id}_${dday}_${todayStr}`;
        const alreadyAlerted = appState.alertedToday.includes(alertKey);

        if ((dday === 'D-Day' || dday === 'D-1') && (!alreadyAlerted || isManual)) {
            const label = dday === 'D-Day' ? '오늘 마감! 🚨' : '내일 마감! ⏳';
            const alertTitle = `과제 제출 마감 임박 (${label})`;
            const alertText = `[${h.subject}] 과제: "${h.title}" 기한이 임박했습니다. 어서 체크하세요!`;

            showToast(alertTitle, alertText, 'danger', 6000);
            triggerSystemPush(alertTitle, alertText);

            if (!alreadyAlerted) {
                appState.notifLog.push({
                    id: 'log-' + Date.now() + Math.random().toString(36).substr(2, 5),
                    title: alertTitle,
                    text: alertText,
                    timestamp: new Date().toLocaleString()
                });
                appState.alertedToday.push(alertKey);
            }
            alertTriggered = true;
        }
    });

    if (alertTriggered) {
        saveState();
        renderNotifLogs();
    } else if (isManual) {
        showToast('알림 엔진 작동 완료', '임박한 시험 일정이나 기한이 남은 과제가 없습니다. 편안한 하루 되세요! 😊', 'info');
    }
}

// ==========================================================================
// SYSTEM EVENT LISTENERS & INITIALIZATION
// ==========================================================================

function initializeApp() {
    // 1. Load Data
    loadState();

    // 2. Render initial screen
    switchTab('panel-home');

    // 3. Run Alerts engine after brief load delay
    setTimeout(() => {
        runAlertsEngine(false);
    }, 1200);

    // --- Sidebar navigation ---
    document.querySelectorAll('.sidebar-nav .nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = btn.getAttribute('data-target');
            switchTab(target);
        });
    });

    // --- Timetable: direct direct actions ---
    document.getElementById('btn-add-class').addEventListener('click', () => {
        // Open modal for Mon 1st period by default
        openClassRegistration(1, 1);
    });

    document.getElementById('btn-close-class-modal').addEventListener('click', () => {
        document.getElementById('modal-class-registration').classList.remove('active');
    });

    document.getElementById('form-class-registration').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const day = parseInt(document.getElementById('modal-class-day').value);
        const period = parseInt(document.getElementById('modal-class-period').value);
        const subject = document.getElementById('modal-class-subject').value.trim();
        const teacher = document.getElementById('modal-class-teacher').value.trim();
        const room = document.getElementById('modal-class-room').value.trim();
        const color = document.getElementById('modal-class-color').value;

        const cellKey = `${day}_${period}`;
        
        appState.timetable[cellKey] = { subject, teacher, room, color };
        saveState();
        
        document.getElementById('modal-class-registration').classList.remove('active');
        renderTimetable();
        showToast('시간표 변경 완료', `[${subject}] 수업이 시간표에 등록되었습니다.`, 'info');
    });

    document.getElementById('btn-delete-class').addEventListener('click', () => {
        if (activeDaySelect && activePeriodSelect) {
            const cellKey = `${activeDaySelect}_${activePeriodSelect}`;
            const subject = appState.timetable[cellKey]?.subject || '';
            
            delete appState.timetable[cellKey];
            saveState();
            
            document.getElementById('modal-class-registration').classList.remove('active');
            renderTimetable();
            showToast('수업 삭제', `[${subject}] 수업을 시간표에서 삭제했습니다.`, 'info');
        }
    });

    // --- Schedules Calendar navigation ---
    document.getElementById('calendar-prev-month').addEventListener('click', () => {
        calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('calendar-next-month').addEventListener('click', () => {
        calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() + 1);
        renderCalendar();
    });

    // Filter events
    document.getElementById('filter-schedule-type').addEventListener('change', () => {
        renderSchedulesList();
    });

    // Add schedule
    document.getElementById('form-add-schedule').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('schedule-title').value.trim();
        const type = document.getElementById('schedule-type').value;
        const date = document.getElementById('schedule-date').value;
        const desc = document.getElementById('schedule-desc').value.trim();

        const newSchedule = {
            id: 'sch-' + Date.now(),
            title,
            type,
            date,
            desc
        };

        appState.schedules.push(newSchedule);
        saveState();
        
        document.getElementById('form-add-schedule').reset();
        renderCalendar();
        renderSchedulesList();
        
        showToast('일정 등록 완료', `"${title}" 학사 일정이 새로 저장되었습니다.`, 'accent');
        
        // Scan new schedules immediately
        setTimeout(() => runAlertsEngine(false), 500);
    });

    // --- Homework checklists ---
    document.getElementById('tab-hw-todo').addEventListener('click', () => {
        activeHomeworkTab = 'todo';
        document.getElementById('tab-hw-todo').classList.add('active');
        document.getElementById('tab-hw-done').classList.remove('active');
        renderHomeworkList();
    });

    document.getElementById('tab-hw-done').addEventListener('click', () => {
        activeHomeworkTab = 'done';
        document.getElementById('tab-hw-done').classList.add('active');
        document.getElementById('tab-hw-todo').classList.remove('active');
        renderHomeworkList();
    });

    // Add homework
    document.getElementById('form-add-homework').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('homework-title').value.trim();
        const subject = document.getElementById('homework-subject').value;
        const duedate = document.getElementById('homework-duedate').value;
        const notes = document.getElementById('homework-notes').value.trim();

        const newHw = {
            id: 'hw-' + Date.now(),
            title,
            subject,
            duedate,
            notes,
            completed: false
        };

        appState.homeworks.push(newHw);
        saveState();
        
        document.getElementById('form-add-homework').reset();
        renderHomeworkList();
        
        showToast('과제 등록 성공', `[${subject}] "${title}" 과제가 체크리스트에 추가되었습니다.`, 'accent');
        
        setTimeout(() => runAlertsEngine(false), 500);
    });

    // --- Notifications & Settings Panel handlers ---
    document.getElementById('btn-request-notif').addEventListener('click', () => {
        if (!("Notification" in window)) {
            showToast('알림 지원 불가', '현재 사용 중인 브라우저가 바탕화면 알림 기능을 지원하지 않습니다.', 'danger');
            return;
        }

        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                showToast('알림 설정 완료 🔔', '바탕화면 푸시 알림 권한을 성공적으로 허용하셨습니다!', 'accent');
                triggerSystemPush('권한 허용 성공', '앞으로 하루고 스마트 플래너의 D-1 알림을 이곳에서 띄워 드립니다.');
            } else {
                showToast('알림 권한 거부', '알림 권한을 차단하셨습니다. 브라우저 주소창 설정에서 권한을 다시 켜주세요.', 'info');
            }
        });
    });

    document.getElementById('btn-test-notif').addEventListener('click', () => {
        runAlertsEngine(true);
    });

    document.getElementById('btn-clear-logs').addEventListener('click', () => {
        if (confirm('모든 알림 히스토리 로그를 영구 삭제하시겠습니까?')) {
            appState.notifLog = [];
            saveState();
            renderNotifLogs();
            showToast('로그 삭제 완료', '알림 히스토리가 전부 삭제되었습니다.', 'info');
        }
    });

    // --- Quick Add Header buttons ---
    document.getElementById('btn-quick-add').addEventListener('click', () => {
        document.getElementById('modal-quick-add').classList.add('active');
    });

    document.getElementById('btn-close-quick-modal').addEventListener('click', () => {
        document.getElementById('modal-quick-add').classList.remove('active');
    });

    // Header notification bell click shortcuts
    document.getElementById('btn-header-notif').addEventListener('click', () => {
        switchTab('panel-notifications');
    });

    // Quick add options
    document.getElementById('quick-add-schedule-btn').addEventListener('click', () => {
        document.getElementById('modal-quick-add').classList.remove('active');
        switchTab('panel-schedules');
        document.getElementById('schedule-title').focus();
    });

    document.getElementById('quick-add-homework-btn').addEventListener('click', () => {
        document.getElementById('modal-quick-add').classList.remove('active');
        switchTab('panel-homework');
        document.getElementById('homework-title').focus();
    });

    // Clean initial logs badge
    renderNotifLogs();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
