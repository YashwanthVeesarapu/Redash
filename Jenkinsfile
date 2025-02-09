pipeline {
    agent any

    environment {
        GOOGLE_APPLICATION_CREDENTIALS = credentials('FIREBASE_TOKEN')
        
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out..'
                git branch: 'main', 
                    credentialsId: 'bfc88f96-eb1e-4df4-99cb-66f945cc956a', 
                    url: 'https://github.com/YashwanthVeesarapu/Redash.git' 
                }
            }
        stage('Build') {
            steps {
                script {
                    echo 'Installing..'
                    sh 'npm install'
                }
      
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo 'Installing Firebase..'
                    sh 'npm install -g firebase-tools'
                }
        
            }
            steps {
                script{
                    echo 'Login to Firebase..'
                    sh 'firebase login:ci --no-localhost'
                }
            }
        }
    }
}