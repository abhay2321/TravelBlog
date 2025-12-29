pipeline {
  agent any

  environment {
    MONGO_URI = credentials('MONGO_URI')
  }

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

    stage('Deploy Backend') {
      steps {
        sh '''
          docker rm -f tb-backend || true
          docker run -d \
            --name tb-backend \
            -p 8083:5000 \
            -e MONGO_URI=$MONGO_URI \
            travelblog-backend
        '''
      }
    }

    stage('Deploy Frontend') {
      steps {
        sh '''
          docker rm -f tb-frontend || true
          docker run -d \
            --name tb-frontend \
            -p 80:80 \
            travelblog-frontend
        '''
      }
    }

    stage('Trivy Scan Backend') {
      steps {
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
          sh 'trivy image travelblog-backend --no-progress'
        }
      }
    }

    stage('Trivy Scan Frontend') {
      steps {
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
          sh 'trivy image travelblog-frontend --no-progress'
        }
      }
    }
  }
}
