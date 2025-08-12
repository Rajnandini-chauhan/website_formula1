  const drivers = [
            { name: "Max Verstappen", team: "Red Bull Racing", country: "Netherlands", championships: 3, age: 27, photo: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/1col/image.png" },
            { name: "Lewis Hamilton", team: "Mercedes", country: "United Kingdom", championships: 7, age: 40, photo: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/1col/image.png" },
            { name: "Charles Leclerc", team: "Ferrari", country: "Monaco", championships: 0, age: 27, photo: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/1col/image.png" },
            { name: "Lando Norris", team: "McLaren", country: "United Kingdom", championships: 0, age: 25, photo: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/1col/image.png" },
            { name: "Oscar Piastri", team: "McLaren", country: "Australia", championships: 0, age: 24, photo: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/1col/image.png" },
            { name: "Carlos Sainz", team: "Ferrari", country: "Spain", championships: 0, age: 31, photo: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/1col/image.png" },
            { name: "George Russell", team: "Mercedes", country: "United Kingdom", championships: 0, age: 27, photo: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/1col/image.png" },
            { name: "Sergio Perez", team: "Red Bull Racing", country: "Mexico", championships: 0, age: 35, photo: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/1col/image.png" },
            { name: "Fernando Alonso", team: "Aston Martin", country: "Spain", championships: 2, age: 43, photo: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/1col/image.png" },
            { name: "Lance Stroll", team: "Aston Martin", country: "Canada", championships: 0, age: 26, photo: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/1col/image.png" }
        ];

        // F1 Events data
        const events = [
            {
                name: "Monaco Grand Prix",
                date: "May 26, 2024",
                location: "Monte Carlo, Monaco",
                description: "The most prestigious race in F1, known for its glamour and challenging street circuit through the heart of Monaco.",
                type: "Race Weekend"
            },
            {
                name: "Las Vegas Grand Prix",
                date: "November 23, 2024",
                location: "Las Vegas, USA",
                description: "The newest addition to F1, featuring a spectacular night race on the Las Vegas Strip.",
                type: "Race Weekend"
            },
            {
                name: "F1 Testing",
                date: "February 2024",
                location: "Bahrain International Circuit",
                description: "Pre-season testing where teams prepare their cars and drivers for the upcoming season.",
                type: "Testing"
            },
            {
                name: "British Grand Prix",
                date: "July 7, 2024",
                location: "Silverstone, UK",
                description: "The home of British motorsport, featuring one of the fastest and most historic circuits in F1.",
                type: "Race Weekend"
            }
        ];

        // Quiz questions
        const quizQuestions = [
            {
                question: "Who holds the record for most F1 World Championships?",
                options: ["Lewis Hamilton", "Michael Schumacher", "Ayrton Senna", "Max Verstappen"],
                correct: 0
            },
            {
                question: "Which circuit is known as 'The Temple of Speed'?",
                options: ["Silverstone", "Monaco", "Monza", "Spa-Francorchamps"],
                correct: 2
            },
            {
                question: "How many points does a race winner receive?",
                options: ["20", "25", "30", "15"],
                correct: 1
            },
            {
                question: "Which team has won the most Constructors' Championships?",
                options: ["McLaren", "Williams", "Ferrari", "Mercedes"],
                correct: 2
            },
            {
                question: "What does DRS stand for?",
                options: ["Drag Reduction System", "Direct Racing System", "Dynamic Response System", "Differential Rate System"],
                correct: 0
            }
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        let selectedAnswer = -1;
        let quizScores = [];

        // Initialize the website
        function init() {
            loadDrivers();
            loadEvents();
            loadQuiz();
            loadScores();
        }

        // Navigation
        function showSection(sectionName) {
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionName).classList.add('active');
            
            // Close mobile menu after selection
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.querySelector('.hamburger');
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }

        // Toggle mobile menu
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.querySelector('.hamburger');
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

        // Load drivers
        function loadDrivers() {
            const grid = document.getElementById('driversGrid');
            grid.innerHTML = drivers.map(driver => `
                <div class="driver-card" onclick="showDriverDetails('${driver.name}')">
                    <div class="driver-photo">
                        <img src="${driver.photo}" alt="${driver.name}" onerror="this.style.display='none'; this.parentNode.innerHTML='${driver.name.split(' ').map(n => n[0]).join('')}'">
                    </div>
                    <h3>${driver.name}</h3>
                    <p>${driver.team}</p>
                </div>
            `).join('');
        }

        // Show driver details
        function showDriverDetails(driverName) {
            const driver = drivers.find(d => d.name === driverName);
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <h2>${driver.name}</h2>
                <div class="driver-photo" style="margin: 1rem auto;">
                    <img src="${driver.photo}" alt="${driver.name}" onerror="this.style.display='none'; this.parentNode.innerHTML='${driver.name.split(' ').map(n => n[0]).join('')}'">
                </div>
                <p><strong>Team:</strong> ${driver.team}</p>
                <p><strong>Country:</strong> ${driver.country}</p>
                <p><strong>Age:</strong> ${driver.age}</p>
                <p><strong>Championships:</strong> ${driver.championships}</p>
                <p><strong>Status:</strong> ${driver.championships > 0 ? 'World Champion' : 'Active Driver'}</p>
            `;
            document.getElementById('modal').style.display = 'block';
        }

        // Load events
        function loadEvents() {
            const grid = document.getElementById('eventsGrid');
            grid.innerHTML = events.map(event => `
                <div class="event-card" onclick="showEventDetails('${event.name}')">
                    <h3>${event.name}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Type:</strong> ${event.type}</p>
                </div>
            `).join('');
        }

        // Show event details
        function showEventDetails(eventName) {
            const event = events.find(e => e.name === eventName);
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <h2>${event.name}</h2>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Type:</strong> ${event.type}</p>
                <p><strong>Description:</strong> ${event.description}</p>
            `;
            document.getElementById('modal').style.display = 'block';
        }

        // Close modal
        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }

        // Load quiz
        function loadQuiz() {
            displayQuestion();
        }

        // Display current question
        function displayQuestion() {
            if (currentQuestionIndex >= quizQuestions.length) {
                endQuiz();
                return;
            }

            const question = quizQuestions[currentQuestionIndex];
            document.getElementById('question').innerHTML = `Question ${currentQuestionIndex + 1}: ${question.question}`;
            
            const optionsContainer = document.getElementById('options');
            optionsContainer.innerHTML = question.options.map((option, index) => `
                <div class="option" onclick="selectAnswer(${index})">${option}</div>
            `).join('');

            selectedAnswer = -1;
        }

        // Select answer
        function selectAnswer(index) {
            document.querySelectorAll('.option').forEach(option => option.classList.remove('selected'));
            document.querySelectorAll('.option')[index].classList.add('selected');
            selectedAnswer = index;
        }

        // Next question
        function nextQuestion() {
            if (selectedAnswer === -1) {
                alert('Please select an answer!');
                return;
            }

            if (selectedAnswer === quizQuestions[currentQuestionIndex].correct) {
                score++;
            }

            currentQuestionIndex++;
            displayQuestion();
        }

        // End quiz
        function endQuiz() {
            document.getElementById('quizContent').style.display = 'none';
            const scoreDisplay = document.getElementById('scoreDisplay');
            const restartBtn = document.getElementById('restartBtn');
            
            scoreDisplay.innerHTML = `
                <h3>Quiz Complete!</h3>
                <p>Your Score: ${score}/${quizQuestions.length}</p>
                <p>Percentage: ${Math.round((score / quizQuestions.length) * 100)}%</p>
            `;
            
            scoreDisplay.style.display = 'block';
            restartBtn.style.display = 'block';

            // Save score
            quizScores.push({
                score: score,
                total: quizQuestions.length,
                date: new Date().toLocaleDateString()
            });
            saveScores();
        }

        // Restart quiz
        function restartQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            selectedAnswer = -1;
            
            document.getElementById('quizContent').style.display = 'block';
            document.getElementById('scoreDisplay').style.display = 'none';
            document.getElementById('restartBtn').style.display = 'none';
            
            displayQuestion();
        }

        // Save scores to memory
        function saveScores() {
            // In a real application, you would save to a database
            console.log('Scores saved:', quizScores);
        }

        // Load scores from memory
        function loadScores() {
            // In a real application, you would load from a database
            console.log('Scores loaded:', quizScores);
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('modal');
            if (event.target === modal) {
                closeModal();
            }
        }

        // Initialize when page loads
        window.onload = init;
