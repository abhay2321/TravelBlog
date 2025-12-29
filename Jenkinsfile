pipeline {
  agent any

  stages {

    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/abhay2321/TravelBlog.git'
      }
    }

    stage('Build Backend Image') {
      steps {
        sh 'docker build -t travelblog-backend ./backend'
      }
    }

    stage('Build Frontend Image') {
      steps {
        sh 'docker build -t travelblog-frontend ./frontend'
      }
    }

    stage('Trivy Scan Backend') {
      steps {
        sh 'trivy image travelblog-backend --no-progress'
      }
    }

    stage('Trivy Scan Frontend') {
      steps {
        sh 'trivy image travelblog-frontend --no-progress'
      }
    }

  }
}
