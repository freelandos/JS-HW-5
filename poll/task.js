const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');
const request = new XMLHttpRequest();
const url = 'https://students.netoservices.ru/nestjs-backend/poll';

request.addEventListener('readystatechange', () => {
  if (request.readyState === request.DONE) {
    const pollData = JSON.parse(request.responseText);
    const id = pollData.id;
    const title = pollData.data.title;
    const answers = pollData.data.answers;

    pollTitle.textContent = title;

    for (const answerText of answers) {
      const pollAnswerHTML = `<button class="poll__answer">${answerText}</button>`;
      pollAnswers.insertAdjacentHTML('beforeend', pollAnswerHTML);
    }

    pollAnswers.addEventListener('click', (event) => {
      if (event.target.classList.contains('poll__answer')) {
        alert('Спасибо, ваш голос засчитан!');
        pollAnswers.innerHTML = '';
        const selectedAnswer = event.target.textContent;
        const selectedAnswerId = answers.indexOf(selectedAnswer);

        request.addEventListener('readystatechange', () => {
          if (request.readyState === request.DONE) {
            const stat = JSON.parse(request.responseText).stat;
            const totalVotes = stat.reduce((acc, item) => acc + item.votes, 0);

            for (const item of stat) {
              const answer = item.answer;
              const votes = (item.votes / totalVotes * 100).toFixed(2);

              const statHTML = `<div>${answer}: <b>${votes}%</b></div>`
              pollAnswers.insertAdjacentHTML('beforeend', statHTML);
            }
          }
        })

        request.open('POST', url);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send(`vote=${id}&answer=${selectedAnswerId}`);
      }
    })
  }
})

request.open('GET', url);
request.send();