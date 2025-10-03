const questionItems = document.querySelectorAll('.faq-question');
const flyingCube = document.querySelector('.flying-cube');

questionItems.forEach((question) => 
{
    question.addEventListener('click', (e) => 
    {
        if (e.target === question) 
        {
            const answer = question.nextElementSibling;
            const lastAnswer = document.querySelector('.faq-answer.show-answer');
            
            if (lastAnswer && lastAnswer !== answer) 
            {
                lastAnswer.classList.remove('show-answer');
                lastAnswer.previousElementSibling.classList.remove('active-question');

                setTimeout(() => 
                {
                    toggleAnswer(answer);
                }, 500);
            } 
            else 
            {
                toggleAnswer(answer);
            }
            
            question.classList.toggle('active-question');
        }
    });

    question.addEventListener('mouseenter', (e) => 
    {
        flyingCube.classList.add('move-cube');
    });

    question.addEventListener('mouseleave', (e) => 
    {
        flyingCube.classList.remove('move-cube');
    });
});


function toggleAnswer(answer) 
{
    answer.classList.toggle('show-answer');
}