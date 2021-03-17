<template>
  <layout class="pt-20">
    <h1 class="text-2xl my-4 mx-8 md:mx-0">
      Assessment Quiz
    </h1>
    <div class="p-6 shadow">
      <div v-show="!finished">
        <p class="font-semibold text-lg py-2 text-sm">
          {{ questions[index].q }}
        </p>
        <label
          v-for="(answer, key) in questions[index].answers"
          :key="key"
          :for="key"
          class="block border-2 border-gray-100 rounded-lg px-4 p-2 my-3 break-normal"
          :class="[answerNotSelectedStyle, answerAlreadySelectedStyle, answerSelectedStyle(key),correctAnswerSelectedStyle(key)]
          "
        >
          <input
            :id="key"
            type="radio"
            class="hidden"
            :value="key"
            :disabled="answerWasSelected"
            @click="pickedAnswer(key)"
          >{{ answer }}
        </label>
        <div class="flex justify-end mt-6">
          <button
            v-show="answerWasSelected"
            class="focus:outline-none rounded-full py-2 px-4 bg-purple-700 text-purple-50 font-medium"
            @click="nextQuestion"
          >
            Next &gt;
          </button>

          <button
            v-show="lastQuestion && selectedAnswer"
            class="focus:outline-none rounded-full py-2 px-4 bg-purple-700 text-purple-50 font-medium"
            @click="showResults"
          >
            Finish
          </button>
        </div>
      </div>
      <div v-show="finished">
        <div>
          <p class="text-xl font-semibold">
            Congratulations!
          </p>
          <span>
            Your Cybercrime Assessment score is {{ percentageScore }}%
          </span>
        </div>
        <div class="flex justify-end mt-6">
          <button
            class="focus:outline-none rounded-full py-2 px-4 bg-purple-700 text-purple-50 font-medium"
            @click="takeTestAgain"
          >
            Take test again!
          </button>
        </div>
      </div>
    </div>
  </layout>
</template>
<script>
import Layout from './Layout.vue'
import Questions from '../questions'
import { reactive, computed, onMounted, toRefs, watch } from 'vue'
export default {
  name: 'AssessmentQuiz',
  components: {
    Layout,
  },
  setup() {

    const quiz = reactive({
      index: 0,
      selectedAnswer: '',
      candidateAnswers: [],
      percentageScore: 0,
      finished: false,
      questions: Questions,
      numberOfQuestions: computed(() => {
        return quiz.questions.length
      }),
      lastQuestion: computed(() => {
        return quiz.index == quiz.questions.length - 1;
      })
    })

    function pickedAnswer(value) {
      quiz.selectedAnswer = value
      // record answer
      if (quiz.selectedAnswer == quiz.questions[quiz.index].correctAnswer) {
        quiz.candidateAnswers.push({choice: value, correct: 1, wrong: 0});
      } else {
        quiz.candidateAnswers.push({choice: value, correct: 0, wrong: 1});

      }
      // add to localStorage
      addToLocalStorage()
    }

    function nextQuestion() {
      if (quiz.index < quiz.questions.length - 1) {
        quiz.index += 1
        quiz.selectedAnswer = ''

      }
    }

    function prepareResults() {
      const totalScore = quiz.candidateAnswers.reduce((acc, cur) => {
       return acc + cur.correct
      }, 0)
      const percentageScore = (totalScore / quiz.numberOfQuestions) * 100
      return percentageScore
    }

    function showResults() {
      quiz.finished = true
      localStorage.setItem('finished', quiz.finished)
      quiz.percentageScore = Math.round(prepareResults())
      localStorage.setItem('percentage_score', quiz.percentageScore)
    }

    function takeTestAgain() {
      quiz.index = 0
      quiz.selectedAnswer = ''
      quiz.candidateAnswers = []
      quiz.percentageScore = 0
      quiz.finished = false
      removeFromLocalStorage()
    }

    function addToLocalStorage() {
      localStorage.setItem('index', quiz.index)
      localStorage.setItem('finished', `${quiz.finished}`)
      localStorage.setItem('candidate_answers', JSON.stringify(quiz.candidateAnswers))
      localStorage.setItem('percentage_score', quiz.percentageScore)
    }

    function removeFromLocalStorage() {
      localStorage.clear()
    }

    const answerWasSelected = computed(() => {
      return quiz.selectedAnswer != '' && !quiz.lastQuestion
    })

    const answerWasNotSelected = computed(() => {
      return quiz.selectedAnswer == ''
    })

    // reference code
    // { 'hover:border-gray-400 cursor-pointer' : answerWasNotSelected },
    //       { 'cursor-not-allowed' : answerWasSelected },
    //       { 'border-red-400 hover:border-red-400' : selectedAnswer != '' && key == selectedAnswer },
    //       { 'border-green-400 hover:border-green-400' : selectedAnswer != '' && key == questions[index].correctAnswer }

    const answerNotSelectedStyle = computed(() => {
      return ( answerWasNotSelected.value ) ?
      'hover:border-gray-400 cursor-pointer' :
      ''

    })

    const answerAlreadySelectedStyle = computed(() => {
      return ( answerWasSelected.value ) ?
      'cursor-not-allowed' :
      ''

    })

    function answerSelectedStyle(key) {
      return (quiz.selectedAnswer != '' && key == quiz.selectedAnswer) ?
      'border-green-400 hover:border-green-400' :
      ''

    }

    function correctAnswerSelectedStyle(key) {
      return (quiz.selectedAnswer != '' && key == quiz.questions[quiz.index].correctAnswer) ?
      'border-red-400 hover:border-red-400' :
      ''

    }
    // watch(quiz.index, (value, oldValue) => {
    //   if (value !== (oldValue + 1)) {
    //     quiz.index = 0
    //     quiz.removeFromLocalStorage()
    //   }
    // })

    onMounted(() => {
      if (localStorage.getItem('index') != null &&
        localStorage.getItem('candidate_answers') != null) {
      quiz.index = parseInt(localStorage.getItem('index'), 10)
      quiz.finished = function() {
        if ( localStorage.getItem('finished') === 'false' ) return false
        if ( localStorage.getItem('finished') === 'true' ) return true
      }()
      quiz.candidateAnswers = JSON.parse(localStorage.getItem('candidate_answers'))
      quiz.percentageScore = parseInt(localStorage.getItem('percentage_score'), 10)
      quiz.selectedAnswer = (quiz.finished == false) ? quiz.candidateAnswers[quiz.index].choice : ''
      }
    })

    return {
      ...toRefs(quiz),
      pickedAnswer,
      nextQuestion,
      prepareResults,
      showResults,
      takeTestAgain,
      addToLocalStorage,
      removeFromLocalStorage,
      answerWasSelected,
      answerWasNotSelected,
      answerNotSelectedStyle,
      answerAlreadySelectedStyle,
      answerSelectedStyle,
      correctAnswerSelectedStyle
    }
  }
}
</script>
