    // 純ES5 語法，無 let/const/箭頭函數/模板字符串
    (function() {
        // 打字機效果: 動態自我介紹 (ES5風格)
        var phrases = [
            "> echo \"Coding && Anime == Life\"",
            "> npm install -g 技術宅拯救世界",
            "> 正在編譯: 新番吐槽引擎 v2.0",
            "> 摸魚時手搓GUNDAM模型...",
            "> 追番積分: 32768 / 信仰充值∞"
        ];
        var typeIdx = 0;
        var charIdx = 0;
        var currentText = "";
        var isDeleting = false;
        var typewriterElement = document.getElementById("typewriter-text");
        
        function typeEffect() {
            if (!typewriterElement) return;
            var fullText = phrases[typeIdx % phrases.length];
            if (isDeleting) {
                currentText = fullText.substring(0, charIdx - 1);
                charIdx--;
                if (charIdx === 0) {
                    isDeleting = false;
                    typeIdx++;
                    if (typeIdx >= phrases.length) typeIdx = 0;
                    setTimeout(typeEffect, 800);
                    return;
                }
            } else {
                currentText = fullText.substring(0, charIdx + 1);
                charIdx++;
                if (charIdx === fullText.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, 2000);
                    return;
                }
            }
            typewriterElement.innerText = currentText;
            var speed = isDeleting ? 40 : 100;
            setTimeout(typeEffect, speed);
        }
        
        // 動漫卡片數據 (繁體轉換)
        var animeList = [
            { name: "Steins;Gate", role: "岡部倫太郎", desc: "EL PSY CONGROO · 世界線變動率1%", score: 5, tags: ["科幻", "神作", "時間旅行"] },
            { name: "攻殼機動隊 SAC", role: "草薙素子", desc: "Ghost in the Shell · 賽博龐克哲學", score: 5, tags: ["硬核", "政治", "士郎正宗"] },
            { name: "日常", role: "博士", desc: "我們所經歷的每個日常，就是連續發生的奇蹟", score: 4.8, tags: ["搞笑", "治癒", "京都動畫"] },
            { name: "葬送的芙莉蓮", role: "芙莉蓮", desc: "壽命論 · 魔法與旅途的溫情物語", score: 4.9, tags: ["奇幻", "情感細膩", "神回"] }
        ];
        
        function renderAnimeCards() {
            var gridContainer = document.getElementById("animeGrid");
            if (!gridContainer) return;
            var htmlString = "";
            for (var i = 0; i < animeList.length; i++) {
                var ani = animeList[i];
                var starStr = "";
                var fullStars = Math.floor(ani.score);
                for (var s = 0; s < fullStars; s++) starStr += "★";
                if (ani.score % 1 !== 0) starStr += "½";
                for (var s2 = starStr.length; s2 < 5; s2++) starStr += "☆";
                var tagsHtml = "";
                for (var t = 0; t < ani.tags.length; t++) {
                    tagsHtml += '<span class="anime-tag">' + ani.tags[t] + '</span>';
                }
                htmlString += '<div class="anime-card">' +
                    '<h3><i class="fas fa-tv"></i> ' + ani.name + '</h3>' +
                    '<p style="color:#b0c4de; margin: 8px 0;"><strong>' + ani.role + '</strong> · ' + ani.desc + '</p>' +
                    '<div>' + tagsHtml + '</div>' +
                    '<div class="anime-score">' + starStr + '</div>' +
                    '</div>';
            }
            gridContainer.innerHTML = htmlString;
        }
        
        // 名言庫 (二次元/技術宅混合) 繁體轉換
        var quoteList = [
            "「一切都是命運石之門的選擇。」 — 岡部倫太郎",
            "「人類最大的錯誤，就是認為自己是正確的。」 — 草薙素子",
            "「我們所度過的每一個日常，也許就是連續發生的奇蹟。」 — 日常",
            "「不要因為害怕結束，就避免了一切開始。」 — 青春豬頭少年",
            "「沒有bug的程式，就跟沒有眼淚的動漫一樣無趣。」 — 某禿頭工程師",
            "「理解一切，就能原諒一切。」 — 空之境界",
            "「程式碼與動畫，皆可創造世界。」 — 秋葉原技師",
            "「只要有想畫的，就一定能畫出來，寫程式碼也是。」 — 白箱"
        ];
        
        function setRandomQuote() {
            var quoteDiv = document.getElementById("anime-quote");
            if (!quoteDiv) return;
            var randomIndex = Math.floor(Math.random() * quoteList.length);
            quoteDiv.innerText = "「 " + quoteList[randomIndex] + " 」";
        }
        
        // 平滑滾動 (ES5)
        function initSmoothScroll() {
            var links = document.querySelectorAll('.nav-links a');
            for (var i = 0; i < links.length; i++) {
                links[i].addEventListener('click', function(e) {
                    e.preventDefault();
                    var targetId = this.getAttribute('href');
                    if (targetId && targetId !== '#') {
                        var targetElem = document.querySelector(targetId);
                        if (targetElem) {
                            targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                });
            }
        }
        
        // 計數器與追番數量小彩蛋 (動態顯示數字)
        function addAnimeCounterEffect() {
            var animeSection = document.getElementById("anime");
            if (!animeSection) return;
            var existStat = document.querySelector('.anime-stat-custom');
            if (existStat) return;
            var statDiv = document.createElement('div');
            statDiv.className = 'anime-stat-custom';
            statDiv.style.marginTop = '1.5rem';
            statDiv.style.textAlign = 'right';
            statDiv.style.fontFamily = 'monospace';
            statDiv.style.fontSize = '0.85rem';
            statDiv.style.color = '#7ff';
            statDiv.innerHTML = '<i class="fas fa-database"></i> 全平台補番總量: <span id="totalAnimeCount">0</span> 部 · 載入中...';
            animeSection.querySelector('.container').appendChild(statDiv);
            
            var targetCount = 847;  // 體現阿宅積累
            var counterSpan = document.getElementById("totalAnimeCount");
            if (!counterSpan) return;
            var currentVal = 0;
            var interval = setInterval(function() {
                if (currentVal >= targetCount) {
                    clearInterval(interval);
                    counterSpan.innerText = targetCount;
                    return;
                }
                var step = Math.ceil((targetCount - currentVal) / 20);
                if (step < 1) step = 1;
                currentVal += step;
                if (currentVal > targetCount) currentVal = targetCount;
                counterSpan.innerText = currentVal;
            }, 35);
        }
        
        // 刷新名言按鈕事件
        function bindQuoteButton() {
            var btn = document.getElementById("refreshQuoteBtn");
            if (btn) {
                btn.addEventListener('click', function() {
                    setRandomQuote();
                });
            }
        }
        
        // 額外動態：控制台輸出友好的技術宅宣言
        function consoleGreeting() {
            console.log("%c ⚡ 秋葉原·電脳工房 | 技術者とオタクの融合体 ⚡", "color: #0ff; font-size: 14px; font-weight: bold;");
            console.log("%c 本站完全符合ES5標準 | 無const/let/箭頭函數  |  二次元濃度max", "color: #c8a2ff");
        }
        
        // 導航欄高亮當前區域 (簡單滾動監聽)
        function highlightNavOnScroll() {
            var sections = document.querySelectorAll('section');
            var navLinks = document.querySelectorAll('.nav-links a');
            function setActive() {
                var scrollPos = window.scrollY + 100;
                for (var i = 0; i < sections.length; i++) {
                    var sec = sections[i];
                    var secTop = sec.offsetTop;
                    var secBottom = secTop + sec.offsetHeight;
                    if (scrollPos >= secTop && scrollPos < secBottom) {
                        var id = sec.getAttribute('id');
                        for (var j = 0; j < navLinks.length; j++) {
                            var link = navLinks[j];
                            var href = link.getAttribute('href').substring(1);
                            if (href === id) {
                                link.style.color = '#0ff';
                                link.style.textShadow = '0 0 4px #0ff';
                            } else {
                                link.style.color = '#ccddf8';
                                link.style.textShadow = 'none';
                            }
                        }
                        break;
                    }
                }
            }
            window.addEventListener('scroll', setActive);
            setActive();
        }
        
        // 執行所有初始化
        window.addEventListener('DOMContentLoaded', function() {
            renderAnimeCards();      // 渲染動漫卡片
            setTimeout(function() {
                typeEffect();        // 打字機效果啟動
            }, 300);
            initSmoothScroll();
            setRandomQuote();
            bindQuoteButton();
            addAnimeCounterEffect();
            highlightNavOnScroll();
            consoleGreeting();
        });
    })();