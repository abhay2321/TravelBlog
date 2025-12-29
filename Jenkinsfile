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
        // Injecting the production backend URL during build
        sh 'docker build --build-arg VITE_API_PATH=http://3.224.211.62:8083 -t travelblog-frontend ./frontend'
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          # Step 3: Stop old containers
          docker rm -f tb-backend tb-frontend || true
          
          # Step 4: Start EVERYTHING (ONE COMMAND)
          # MONGO_URI is passed from Jenkins environment variables
          docker compose up -d
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
