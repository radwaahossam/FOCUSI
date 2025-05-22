// const video = document.getElementById('video'); 
// overlay = document.getElementById('questionOverlay');
// questionBox = document.getElementById('questionBox');
// introOverlay = document.querySelector('.intro-overlay');
// startWithCameraBtn = document.getElementById("start-with-camera");
// startWithoutCameraBtn = document.getElementById("start-without-camera");
// correctAnswerSpans = document.querySelectorAll('#correct-answers');
// congratsOverlay = document.querySelector('.congrats-overlay');
// congratsExit = document.getElementById("exit");
// overOverlay = document.querySelector('.over-overlay');
// tryAgainBtn = overOverlay.querySelector('button');
// exitBtn = document.getElementById('exit-btn');

// let currentQuestionIndex = 0;
// let correctAnswers = 0;
// let cameraStream = null;
// let cameraInterval = null;
// let questionAudio;

// let firstQuestionShown = false;
// let secondQuestionShown = false;
// let pausedForQuestions = false;

// function startVideo() {
//     introOverlay.classList.add('hidden');
//     video.controls = true;
//     video.play();

//     video.addEventListener('timeupdate', () => {
//         if (!pausedForQuestions && video.currentTime >= 26) {
//             pausedForQuestions = true;
//             video.pause();
//             overlay.style.display = 'flex';
//             showQuestion(currentQuestionIndex);
//         }
//     });
// }

// const questions = [
//     {
//         type: 'image-choice',
//         question: "Which shape is round like an egg?",
//         audio: {
//             questionAudio: 'audios/question1.mp3',  
//             correctAudio: 'audios/correct.mp3',   
//             wrongAudio: 'audios/wrong1.mp3'      
//         },
//         choices: [
//             { img: 'images/circle.png', isCorrect: false },
//             { img: 'images/oval.png', isCorrect: true }
//         ]
//     },
//     {
//         type: 'image-choice',
//         question: "Which shape is perfectly round?",
//         audio: {
//             questionAudio: 'audios/question2.mp3',  
//             correctAudio: 'audios/correct.mp3',   
//             wrongAudio: 'audios/wrong2.mp3'      
//         },
//         choices: [
//             { img: 'images/circle.png', isCorrect: true },
//             { img: 'images/oval.png', isCorrect: false }
//         ]
//     },
//     {
//         type: 'image-choice',
//         question: "Which shape has four equal sides?",
//         audio: {
//             questionAudio: 'audios/question3.mp3',  
//             correctAudio: 'audios/correct.mp3',   
//             wrongAudio: 'audios/wrong3.mp3'      
//         },
//         choices: [
//             { img: 'images/rectangle.png', isCorrect: false },
//             { img: 'images/square.png', isCorrect: true }
//         ]
//     },
//     {
//         type: 'image-choice',
//         question: "Which shape is lined has four sides?",
//         audio: {
//             questionAudio: 'audios/question4.mp3',  
//             correctAudio: 'audios/correct.mp3',   
//             wrongAudio: 'audios/wrong4.mp3'      
//         },
//         choices: [
//             { img: 'images/rectangle.png', isCorrect: true },
//             { img: 'images/square.png', isCorrect: false }
//         ]
//     },
//     {
//         type: 'image-choice',
//         question: "Which shape has five points?",
//         audio: {
//             questionAudio: 'audios/question5.mp3',  
//             correctAudio: 'audios/correct.mp3',   
//             wrongAudio: 'audios/wrong5.mp3'      
//         },
//         choices: [
//             { img: 'images/rectangle.png', isCorrect: false },
//             { img: 'images/star.png', isCorrect: true },
//             { img: 'images/oval.png', isCorrect: false }
//         ]
//     }
// ];

// startWithCameraBtn.addEventListener("click", async () => {
//     try {
//         cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
//         startCameraTracking();
//     } catch (err) {
//         alert("Camera access denied or not available.");
//     }
//     startVideo();
// });

// startWithoutCameraBtn.addEventListener("click", () => {
//     startVideo();
// });

// function stopCamera() {
//     if (cameraStream) {
//         cameraStream.getTracks().forEach(track => track.stop());
//         cameraStream = null;
//     }
//     if (cameraInterval) {
//         clearInterval(cameraInterval);
//         cameraInterval = null;
//     }
// }

// function startCameraTracking() {
//     const video = document.createElement("video");
//     video.style.display = "none";
//     document.body.appendChild(video);
//     video.srcObject = cameraStream;
//     video.play();

//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");

//     cameraInterval = setInterval(() => {
//         if (video.readyState === video.HAVE_ENOUGH_DATA) {
//             canvas.width = video.videoWidth;
//             canvas.height = video.videoHeight;
//             context.drawImage(video, 0, 0, canvas.width, canvas.height);
//             canvas.toBlob(blob => {
//                 if (blob) {
//                     const formData = new FormData();
//                     formData.append("image", blob, "snapshot.jpg");
//                     fetch("https://your-backend.com/api/track-player", {
//                         method: "POST",
//                         body: formData
//                     }).catch(err => {
//                         console.error("Failed to send image:", err);
//                     });
//                 }
//             }, "image/jpeg", 0.8);
//         }
//     }, 5000);
// }

// function showQuestion(index) {
//     if (document.fullscreenElement) {
//         document.exitFullscreen(); 
//     }
//     const question = questions[index];
//     const content = document.getElementById('questionContent');
//     content.innerHTML = `<h2>${question.question}</h2>`;

//     questionAudio = new Audio(question.audio.questionAudio);
//     questionAudio.play();
    
//     content.innerHTML = `<h2>${question.question}</h2>`;
//     question.choices.forEach(choice => {
//         const btn = document.createElement('button');
//         btn.innerHTML = `<img src="${choice.img}" alt="shape">`;
//         btn.onclick = () => handleAnswer(choice.isCorrect);
//         content.appendChild(btn);
//     });
// }

// function handleAnswer(isCorrect) {
//     const question = questions[currentQuestionIndex];
//     const feedbackAudio = new Audio(isCorrect ? question.audio.correctAudio : question.audio.wrongAudio);
//     if (questionAudio && !questionAudio.paused) {
//         questionAudio.pause();
//         questionAudio.currentTime = 0;
//     }
//     feedbackAudio.play();

//     if (isCorrect) correctAnswers++;

//     const delay = isCorrect ? 1000 : 3000;
//     setTimeout(() => {
//         currentQuestionIndex++;
//         if (currentQuestionIndex == 1) {
//             showQuestion(currentQuestionIndex); 
//         } else if (currentQuestionIndex == 2) {
//             overlay.style.display = 'none';
//             video.play(); 
//         } else if (currentQuestionIndex < questions.length) {
//             questionBox.style.display = 'block';
//             showQuestion(currentQuestionIndex);
//         } else {
//             overlay.style.display = 'none';
//             showFinalResult();
//         }
//     }, delay);
// }

// video.addEventListener('ended', () => {
//     if (currentQuestionIndex < questions.length) {
//         overlay.style.display = 'flex';
//         showQuestion(currentQuestionIndex);
//     }
//     videoCompleted = true;
// });

// function showFinalResult() {
//     correctAnswerSpans.forEach(span => {
//         span.textContent = correctAnswers;
//     });
//     if (correctAnswers >= 3) {
//         congratsOverlay.classList.remove('hidden');
//     } else {
//         overOverlay.classList.remove('hidden'); 
//     }
// }

// congratsExit?.addEventListener("click", handleExit);

// tryAgainBtn.addEventListener("click", () => {
//     overOverlay.classList.add('hidden');
//     resetGame();
// });

// exitBtn?.addEventListener("click", handleExit);

// function handleExit() {
//     stopCamera();
//     // sendResultsToBackend(correctAnswers);

//     // إعادة التوجيه إلى صفحة الكلاس
//     // window.location.href = '/class'; 
//     window.angularNavigateToClass && window.angularNavigateToClass();

// }



// function resetGame() {
//     correctAnswers = 0;
//     currentQuestionIndex = 0;
//     firstQuestionShown = false;
//     secondQuestionShown = false;
//     pausedForQuestions = false;
//     introOverlay.classList.remove('hidden');
//     congratsOverlay.classList.add('hidden');
//     overOverlay.classList.add('hidden');
// }

// function sendResultsToBackend(score) {
//     fetch("https://your-backend.com/api/results", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ correctAnswers: score })
//     }).then(res => res.json())
//       .then(data => console.log("Results sent:", data))
//       .catch(err => console.error("Failed to send results:", err));
// }










// const video = document.getElementById('video'); 
// const overlay = document.getElementById('questionOverlay');
// const questionBox = document.getElementById('questionBox');
// const introOverlay = document.querySelector('.intro-overlay');
// const startWithCameraBtn = document.getElementById("start-with-camera");
// const startWithoutCameraBtn = document.getElementById("start-without-camera");
// const correctAnswerSpans = document.querySelectorAll('#correct-answers');
// const congratsOverlay = document.querySelector('.congrats-overlay');
// const congratsExit = document.getElementById("exit");
// const overOverlay = document.querySelector('.over-overlay');
// const tryAgainBtn = overOverlay?.querySelector('button');
// const exitBtn = document.getElementById('exit-btn');

// let currentQuestionIndex = 0;
// let correctAnswers = 0;
// let cameraStream = null;
// let cameraInterval = null;
// let questionAudio;

// let pausedForQuestions = false;

// function startVideo() {
//     introOverlay.classList.add('hidden');
//     video.controls = true;
//     video.play();

//     video.addEventListener('timeupdate', () => {
//         if (!pausedForQuestions && video.currentTime >= 26) {
//             pausedForQuestions = true;
//             video.pause();
//             overlay.style.display = 'flex';
//             showQuestion(currentQuestionIndex);
//         }
//     });
// }

// const questions = [
//     {
//         type: 'image-choice',
//         question: "Which shape is round like an egg?",
//         audio: {
//             questionAudio: 'audios/question1.mp3',
//             correctAudio: 'audios/correct.mp3',
//             wrongAudio: 'audios/wrong1.mp3'
//         },
//         choices: [
//             { img: 'images/circle.png', isCorrect: false },
//             { img: 'images/oval.png', isCorrect: true }
//         ]
//     },
//     {
//         type: 'image-choice',
//         question: "Which shape is perfectly round?",
//         audio: {
//             questionAudio: 'audios/question2.mp3',
//             correctAudio: 'audios/correct.mp3',
//             wrongAudio: 'audios/wrong2.mp3'
//         },
//         choices: [
//             { img: 'images/circle.png', isCorrect: true },
//             { img: 'images/oval.png', isCorrect: false }
//         ]
//     },
//     {
//         type: 'image-choice',
//         question: "Which shape has four equal sides?",
//         audio: {
//             questionAudio: 'audios/question3.mp3',
//             correctAudio: 'audios/correct.mp3',
//             wrongAudio: 'audios/wrong3.mp3'
//         },
//         choices: [
//             { img: 'images/rectangle.png', isCorrect: false },
//             { img: 'images/square.png', isCorrect: true }
//         ]
//     },
//     {
//         type: 'image-choice',
//         question: "Which shape is lined has four sides?",
//         audio: {
//             questionAudio: 'audios/question4.mp3',
//             correctAudio: 'audios/correct.mp3',
//             wrongAudio: 'audios/wrong4.mp3'
//         },
//         choices: [
//             { img: 'images/rectangle.png', isCorrect: true },
//             { img: 'images/square.png', isCorrect: false }
//         ]
//     },
//     {
//         type: 'image-choice',
//         question: "Which shape has five points?",
//         audio: {
//             questionAudio: 'audios/question5.mp3',
//             correctAudio: 'audios/correct.mp3',
//             wrongAudio: 'audios/wrong5.mp3'
//         },
//         choices: [
//             { img: 'images/rectangle.png', isCorrect: false },
//             { img: 'images/star.png', isCorrect: true },
//             { img: 'images/oval.png', isCorrect: false }
//         ]
//     }
// ];

// startWithCameraBtn?.addEventListener("click", async () => {
//     try {
//         cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
//         startCameraTracking();
//     } catch (err) {
//         alert("Camera access denied or not available.");
//     }
//     startVideo();
// });

// startWithoutCameraBtn?.addEventListener("click", () => {
//     startVideo();
// });

// function stopCamera() {
//     if (cameraStream) {
//         cameraStream.getTracks().forEach(track => track.stop());
//         cameraStream = null;
//     }
//     if (cameraInterval) {
//         clearInterval(cameraInterval);
//         cameraInterval = null;
//     }
// }

// function startCameraTracking() {
//     const camVideo = document.createElement("video");
//     camVideo.style.display = "none";
//     document.body.appendChild(camVideo);
//     camVideo.srcObject = cameraStream;
//     camVideo.play();

//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");

//     cameraInterval = setInterval(() => {
//         if (camVideo.readyState === camVideo.HAVE_ENOUGH_DATA) {
//             canvas.width = camVideo.videoWidth;
//             canvas.height = camVideo.videoHeight;
//             context.drawImage(camVideo, 0, 0, canvas.width, canvas.height);
//             canvas.toBlob(blob => {
//                 if (blob) {
//                     const formData = new FormData();
//                     formData.append("image", blob, "snapshot.jpg");
//                     fetch("https://your-backend.com/api/track-player", {
//                         method: "POST",
//                         body: formData
//                     }).catch(err => {
//                         console.error("Failed to send image:", err);
//                     });
//                 }
//             }, "image/jpeg", 0.8);
//         }
//     }, 5000);
// }

// function showQuestion(index) {
//     if (document.fullscreenElement) document.exitFullscreen();

//     const question = questions[index];
//     const content = document.getElementById('questionContent');
//     content.innerHTML = `<h2>${question.question}</h2>`;

//     questionAudio = new Audio(question.audio.questionAudio);
//     questionAudio.play();

//     question.choices.forEach(choice => {
//         const btn = document.createElement('button');
//         btn.innerHTML = `<img src="${choice.img}" alt="shape">`;
//         btn.onclick = () => handleAnswer(choice.isCorrect);
//         content.appendChild(btn);
//     });
// }

// function handleAnswer(isCorrect) {
//     const question = questions[currentQuestionIndex];
//     const feedbackAudio = new Audio(isCorrect ? question.audio.correctAudio : question.audio.wrongAudio);

//     if (questionAudio && !questionAudio.paused) {
//         questionAudio.pause();
//         questionAudio.currentTime = 0;
//     }

//     feedbackAudio.play();

//     if (isCorrect) correctAnswers++;

//     const delay = isCorrect ? 1000 : 3000;

//     setTimeout(() => {
//         currentQuestionIndex++;
//         if (currentQuestionIndex === 1) {
//             showQuestion(currentQuestionIndex);
//         } else if (currentQuestionIndex === 2) {
//             overlay.style.display = 'none';
//             video.play();
//         } else if (currentQuestionIndex < questions.length) {
//             questionBox.style.display = 'block';
//             showQuestion(currentQuestionIndex);
//         } else {
//             overlay.style.display = 'none';
//             showFinalResult();
//         }
//     }, delay);
// }

// video.addEventListener('ended', () => {
//     if (currentQuestionIndex < questions.length) {
//         overlay.style.display = 'flex';
//         showQuestion(currentQuestionIndex);
//     }
// });

// function showFinalResult() {
//     correctAnswerSpans.forEach(span => {
//         span.textContent = correctAnswers;
//     });

//     if (correctAnswers >= 3) {
//         congratsOverlay.classList.remove('hidden');
//     } else {
//         overOverlay.classList.remove('hidden');
//     }
// }

// congratsExit?.addEventListener("click", handleExit);
// exitBtn?.addEventListener("click", handleExit);

// tryAgainBtn?.addEventListener("click", () => {
//     overOverlay.classList.add('hidden');
//     resetGame();
// });

// function handleExit() {
//     stopCamera();
    
//     // ✅ Navigate via Angular
//     if (typeof window.angularNavigateToClass === 'function') {
//         window.angularNavigateToClass();
//     } else {
//         console.warn("angularNavigateToClass function not found.");
//     }
// }

// function resetGame() {
//     correctAnswers = 0;
//     currentQuestionIndex = 0;
//     pausedForQuestions = false;

//     introOverlay.classList.remove('hidden');
//     congratsOverlay.classList.add('hidden');
//     overOverlay.classList.add('hidden');
// }
