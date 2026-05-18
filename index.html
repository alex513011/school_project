<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>하루고 - 학교생활 스마트 스케줄러</title>
    <!-- Google Fonts: Outfit & Noto Sans KR -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app-container">
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
            <div class="logo-area">
                <div class="logo-icon">
                    <i data-lucide="graduation-cap"></i>
                </div>
                <span class="logo-text">하루고<span class="logo-sub">HARUGO</span></span>
            </div>
            
            <nav class="sidebar-nav">
                <button class="nav-btn active" data-target="panel-home">
                    <i data-lucide="layout-dashboard"></i>
                    <span>홈 화면</span>
                </button>
                <button class="nav-btn" data-target="panel-timetable">
                    <i data-lucide="calendar-days"></i>
                    <span>시간표</span>
                </button>
                <button class="nav-btn" data-target="panel-schedules">
                    <i data-lucide="calendar"></i>
                    <span>일정 관리</span>
                </button>
                <button class="nav-btn" data-target="panel-homework">
                    <i data-lucide="check-square"></i>
                    <span>과제 체크</span>
                </button>
                <button class="nav-btn" data-target="panel-notifications">
                    <i data-lucide="bell"></i>
                    <span>알림 & 설정</span>
                    <span class="badge" id="nav-notif-count" style="display:none;">0</span>
                </button>
            </nav>

            <div class="sidebar-footer">
                <div class="user-profile">
                    <div class="profile-avatar">S</div>
                    <div class="profile-info">
                        <span class="profile-name">스마트 학생</span>
                        <span class="profile-school">하루고등학교 1학년</span>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content Area -->
        <main class="main-content">
            <!-- Header Bar -->
            <header class="app-header">
                <div class="header-left">
                    <h1 id="panel-title">오늘 화면</h1>
                    <p class="current-date-display" id="current-date-text">2026년 5월 18일 월요일</p>
                </div>
                <div class="header-right">
                    <button class="header-action-btn" id="btn-quick-add" title="빠른 추가">
                        <i data-lucide="plus"></i>
                        <span>빠른 추가</span>
                    </button>
                    <div class="notif-bell-container" id="btn-header-notif">
                        <i data-lucide="bell"></i>
                        <span class="bell-badge" id="header-notif-dot" style="display:none;"></span>
                    </div>
                </div>
            </header>

            <!-- PANEL 1: HOME (DASHBOARD) -->
            <section class="content-panel active" id="panel-home">
                <!-- Stats Overview Grid -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon class-bg">
                            <i data-lucide="book-open"></i>
                        </div>
                        <div class="stat-details">
                            <h3>다음 수업</h3>
                            <p class="stat-value" id="home-next-class">수학 (1교시)</p>
                            <p class="stat-desc" id="home-next-class-time">09:00 시작</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon homework-bg">
                            <i data-lucide="list-todo"></i>
                        </div>
                        <div class="stat-details">
                            <h3>남은 과제</h3>
                            <p class="stat-value" id="home-remaining-homework">0개</p>
                            <p class="stat-desc">체크리스트 확인 필요</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon schedule-bg">
                            <i data-lucide="hourglass"></i>
                        </div>
                        <div class="stat-details">
                            <h3>다가오는 일정</h3>
                            <p class="stat-value" id="home-upcoming-event">일정 없음</p>
                            <p class="stat-desc" id="home-upcoming-event-dday">-</p>
                        </div>
                    </div>
                </div>

                <!-- Today Timetable Bar -->
                <div class="dashboard-section card-box today-timetable-section">
                    <div class="section-header">
                        <h2>오늘의 시간표</h2>
                        <span class="header-badge" id="today-day-tag">월요일</span>
                    </div>
                    <div class="today-timetable-timeline" id="today-timeline-container">
                        <!-- Dynamic content loaded via JS -->
                        <div class="no-class-today">
                            <i data-lucide="calendar-x"></i>
                            <p>오늘은 등록된 시간표 수업이 없습니다.</p>
                        </div>
                    </div>
                </div>

                <div class="dashboard-grid">
                    <!-- Today's Schedules -->
                    <div class="dashboard-section card-box">
                        <div class="section-header">
                            <h2>오늘 & 내일 일정</h2>
                            <button class="text-btn" onclick="switchTab('panel-schedules')">전체 보기</button>
                        </div>
                        <div class="quick-list" id="home-schedule-list">
                            <!-- Dynamic rendering -->
                            <div class="empty-state">
                                <i data-lucide="smile"></i>
                                <p>오늘 예정된 시험이나 행사가 없습니다.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Today's Homework -->
                    <div class="dashboard-section card-box">
                        <div class="section-header">
                            <h2>우선순위 과제</h2>
                            <button class="text-btn" onclick="switchTab('panel-homework')">과제함 가기</button>
                        </div>
                        <div class="quick-list" id="home-homework-list">
                            <!-- Dynamic rendering -->
                            <div class="empty-state">
                                <i data-lucide="sparkles"></i>
                                <p>밀린 과제가 없네요! 완벽합니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- PANEL 2: TIMETABLE -->
            <section class="content-panel" id="panel-timetable">
                <div class="panel-action-bar">
                    <div class="info-bubble">
                        <i data-lucide="info"></i>
                        <span>시간표의 빈 칸을 클릭하면 수업을 등록할 수 있습니다. 이미 등록된 수업을 누르면 수정할 수 있습니다.</span>
                    </div>
                    <button class="btn btn-primary" id="btn-add-class">
                        <i data-lucide="plus"></i>
                        <span>수업 직접 추가</span>
                    </button>
                </div>

                <div class="card-box timetable-card-box">
                    <div class="timetable-responsive-container">
                        <table class="timetable-table">
                            <thead>
                                <tr>
                                    <th class="time-header">교시</th>
                                    <th>월요일</th>
                                    <th>화요일</th>
                                    <th>수요일</th>
                                    <th>목요일</th>
                                    <th>금요일</th>
                                </tr>
                            </thead>
                            <tbody id="timetable-body">
                                <!-- 1st to 7th Period will be rendered dynamically by JS -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <!-- PANEL 3: SCHEDULES -->
            <section class="content-panel" id="panel-schedules">
                <div class="schedule-layout-grid">
                    <!-- Calendar View -->
                    <div class="card-box calendar-box">
                        <div class="calendar-header-bar">
                            <button class="icon-btn" id="calendar-prev-month">
                                <i data-lucide="chevron-left"></i>
                            </button>
                            <h2 class="calendar-month-year" id="calendar-month-year-text">2026년 5월</h2>
                            <button class="icon-btn" id="calendar-next-month">
                                <i data-lucide="chevron-right"></i>
                            </button>
                        </div>
                        <div class="calendar-grid-header">
                            <div>일</div>
                            <div>월</div>
                            <div>화</div>
                            <div>수</div>
                            <div>목</div>
                            <div>금</div>
                            <div>토</div>
                        </div>
                        <div class="calendar-grid-days" id="calendar-days-container">
                            <!-- Dynamic Calendar Days -->
                        </div>
                    </div>

                    <!-- Upcoming & Adding Schedules -->
                    <div class="schedule-sidebar">
                        <div class="card-box sidebar-card">
                            <div class="sidebar-header">
                                <h2>일정 추가</h2>
                            </div>
                            <form id="form-add-schedule" class="side-form">
                                <div class="form-group">
                                    <label for="schedule-title">일정명</label>
                                    <input type="text" id="schedule-title" placeholder="수행평가, 체육대회, 중간고사 등" required autocomplete="off">
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="schedule-type">분류</label>
                                        <select id="schedule-type">
                                            <option value="exam">📖 시험 일정</option>
                                            <option value="performance">✍️ 수행평가</option>
                                            <option value="personal">🎉 개인 일정</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="schedule-date">날짜</label>
                                        <input type="date" id="schedule-date" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="schedule-desc">메모 (선택)</label>
                                    <textarea id="schedule-desc" placeholder="시험 범위나 준비물 등 간단한 메모" rows="2"></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary w-full">
                                    <i data-lucide="plus"></i>
                                    <span>일정 저장</span>
                                </button>
                            </form>
                        </div>

                        <!-- Schedule List Filtered -->
                        <div class="card-box sidebar-card list-sidebar-card">
                            <div class="sidebar-header-with-filter">
                                <h2>다가오는 학사 일정</h2>
                                <select id="filter-schedule-type" class="small-select">
                                    <option value="all">전체</option>
                                    <option value="exam">시험</option>
                                    <option value="performance">수행평가</option>
                                    <option value="personal">개인</option>
                                </select>
                            </div>
                            <div class="scroll-list" id="schedule-list-container">
                                <!-- Dynamic dynamic rendering -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- PANEL 4: HOMEWORK -->
            <section class="content-panel" id="panel-homework">
                <div class="homework-layout-grid">
                    <!-- Homework Form -->
                    <div class="card-box form-card">
                        <div class="sidebar-header">
                            <h2>새 과제 등록</h2>
                        </div>
                        <form id="form-add-homework" class="side-form">
                            <div class="form-group">
                                <label for="homework-title">과제명</label>
                                <input type="text" id="homework-title" placeholder="과제 내용 입력 (예: 수학 32p 풀기)" required autocomplete="off">
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="homework-subject">과목</label>
                                    <select id="homework-subject">
                                        <option value="수학">수학</option>
                                        <option value="영어">영어</option>
                                        <option value="국어">국어</option>
                                        <option value="과학">과학</option>
                                        <option value="사회">사회</option>
                                        <option value="기타">기타 과목</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="homework-duedate">마감일</label>
                                    <input type="date" id="homework-duedate" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="homework-notes">상세 메모</label>
                                <textarea id="homework-notes" placeholder="준비물, 주의사항 등 작성" rows="2"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary w-full">
                                <i data-lucide="plus"></i>
                                <span>과제 추가</span>
                            </button>
                        </form>
                    </div>

                    <!-- Homework Checklist -->
                    <div class="homework-board">
                        <div class="board-tabs">
                            <button class="board-tab active" id="tab-hw-todo" data-status="todo">
                                진행 중 과제
                                <span class="tab-count" id="count-hw-todo">0</span>
                            </button>
                            <button class="board-tab" id="tab-hw-done" data-status="done">
                                완료된 과제
                                <span class="tab-count" id="count-hw-done">0</span>
                            </button>
                        </div>
                        <div class="card-box board-list-container">
                            <div class="homework-list" id="homework-list-container">
                                <!-- Dynamic checklists -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- PANEL 5: SETTINGS & NOTIFICATIONS -->
            <section class="content-panel" id="panel-notifications">
                <div class="settings-grid">
                    <div class="card-box settings-card">
                        <div class="card-header-accent">
                            <i data-lucide="bell-ring"></i>
                            <h2>알림 연동 및 설정</h2>
                        </div>
                        <div class="settings-body">
                            <div class="settings-option">
                                <div class="option-info">
                                    <h3>브라우저 푸시 알림</h3>
                                    <p>브라우저 알림 기능을 사용하여 일정이 임박할 때 바탕화면 알림을 띄웁니다.</p>
                                </div>
                                <button class="btn btn-secondary" id="btn-request-notif">
                                    <i data-lucide="bell"></i>
                                    <span>알림 권한 요청</span>
                                </button>
                            </div>

                            <div class="settings-option">
                                <div class="option-info">
                                    <h3>알림 설정 규칙</h3>
                                    <p>일정 하루(D-1) 전 및 과제 마감 하루 전날 자동으로 알림을 활성화합니다.</p>
                                </div>
                                <div class="toggle-switch-container">
                                    <span class="toggle-status" id="toggle-rule-status">상시 활성화됨</span>
                                </div>
                            </div>

                            <div class="settings-option tester-box">
                                <div class="option-info">
                                    <h3>알림 즉시 테스트</h3>
                                    <p>아래 버튼을 누르면 알림 엔진을 즉시 실행하여 D-1 일정이나 마감 임박 과제 토스트를 띄웁니다.</p>
                                </div>
                                <button class="btn btn-accent" id="btn-test-notif">
                                    <i data-lucide="zap"></i>
                                    <span>알림 엔진 수동 점검</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="card-box settings-card">
                        <div class="card-header-accent">
                            <i data-lucide="clipboard-list"></i>
                            <h2>알림 로그 히스토리</h2>
                        </div>
                        <div class="settings-body">
                            <div class="notif-log-container" id="notif-log-list">
                                <!-- Logs of triggered alarms -->
                                <div class="empty-state">
                                    <i data-lucide="check-circle-2"></i>
                                    <p>현재 기록된 알림이 없습니다.</p>
                                </div>
                            </div>
                            <div class="card-footer-actions">
                                <button class="text-btn danger-color" id="btn-clear-logs">
                                    <i data-lucide="trash-2"></i>
                                    <span>로그 전체 삭제</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>

    <!-- MODAL 1: REGISTER / EDIT CLASS -->
    <div class="modal-overlay" id="modal-class-registration">
        <div class="modal-box">
            <div class="modal-header">
                <h2 id="class-modal-title">수업 정보 입력</h2>
                <button class="modal-close-btn" id="btn-close-class-modal">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <form id="form-class-registration" class="modal-form">
                <input type="hidden" id="modal-class-day">
                <input type="hidden" id="modal-class-period">
                
                <div class="form-row">
                    <div class="form-group flex-1">
                        <label for="modal-class-subject">과목명</label>
                        <input type="text" id="modal-class-subject" placeholder="예: 수학, 영어, 과학 등" required autocomplete="off">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="modal-class-teacher">교사명 (선택)</label>
                        <input type="text" id="modal-class-teacher" placeholder="예: 김선생">
                    </div>
                    <div class="form-group">
                        <label for="modal-class-room">교실 위치 (선택)</label>
                        <input type="text" id="modal-class-room" placeholder="예: 2-3교실, 본관3층">
                    </div>
                </div>

                <div class="form-group">
                    <label>대표 색상</label>
                    <div class="color-palette-selection" id="color-selectors-container">
                        <!-- Dynamically filled swatches -->
                    </div>
                    <input type="hidden" id="modal-class-color" value="#5B8DEF">
                </div>

                <div class="modal-footer-actions">
                    <button type="button" class="btn btn-secondary" id="btn-delete-class" style="display:none;">
                        <i data-lucide="trash-2"></i>
                        <span>삭제</span>
                    </button>
                    <button type="submit" class="btn btn-primary" id="btn-save-class">
                        <span>저장하기</span>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- MODAL 2: QUICK ADD OVERLAY -->
    <div class="modal-overlay" id="modal-quick-add">
        <div class="modal-box small-modal">
            <div class="modal-header">
                <h2>무엇을 추가할까요?</h2>
                <button class="modal-close-btn" id="btn-close-quick-modal">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <div class="quick-add-grid">
                <button class="quick-add-btn" id="quick-add-schedule-btn">
                    <i data-lucide="calendar"></i>
                    <span>새 학사 일정</span>
                </button>
                <button class="quick-add-btn" id="quick-add-homework-btn">
                    <i data-lucide="check-square"></i>
                    <span>새 수행/과제</span>
                </button>
            </div>
        </div>
    </div>

    <!-- TOAST NOTIFICATION CONTAINER -->
    <div class="toast-container" id="toast-alerts-box"></div>

    <script src="script.js"></script>
</body>
</html>
